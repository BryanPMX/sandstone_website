import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const expectedOrigin = "https://vzseehrvtrtzeqsmglfk.supabase.co";

if (
  !url ||
  !key ||
  new URL(url).origin !== expectedOrigin ||
  !key.startsWith("sb_publishable_")
) {
  console.error("Invalid development Supabase configuration.");
  process.exit(1);
}

const credentials = {
  a: {
    email: process.env.TEST_EMAIL_A,
    password: process.env.TEST_PASSWORD_A,
  },
  b: {
    email: process.env.TEST_EMAIL_B,
    password: process.env.TEST_PASSWORD_B,
  },
};

if (
  !credentials.a.email ||
  !credentials.a.password ||
  !credentials.b.email ||
  !credentials.b.password
) {
  console.error("Missing test account credentials.");
  process.exit(1);
}

function newClient() {
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

const accountA = newClient();
const accountB = newClient();
const anonymous = newClient();

let passed = 0;
let failed = 0;

function check(label, condition) {
  if (condition) {
    passed++;
    console.log(`PASS: ${label}`);
  } else {
    failed++;
    console.log(`FAIL: ${label}`);
  }
}

function blocked(result) {
  return (
    result.error?.code === "42501" ||
    (!result.error && Array.isArray(result.data) && result.data.length === 0)
  );
}

async function verifyAccount(client, ownId, otherId, label) {
  const ownProfile = await client
    .from("profiles")
    .select("id, first_name")
    .eq("id", ownId)
    .single();

  check(
    `${label}: Own profile readable`,
    !ownProfile.error && ownProfile.data?.id === ownId,
  );

  const otherProfile = await client
    .from("profiles")
    .select("id")
    .eq("id", otherId);

  check(`${label}: Other profile protected`, blocked(otherProfile));

  const allProfiles = await client.from("profiles").select("id");

  check(
    `${label}: Only own profile visible`,
    !allProfiles.error &&
      allProfiles.data?.length === 1 &&
      allProfiles.data[0].id === ownId,
  );

  const ownRole = await client
    .from("user_roles")
    .select("user_id, role")
    .eq("user_id", ownId)
    .single();

  check(
    `${label}: Own client role readable`,
    !ownRole.error &&
      ownRole.data?.user_id === ownId &&
      ownRole.data?.role === "client",
  );

  const otherRole = await client
    .from("user_roles")
    .select("user_id, role")
    .eq("user_id", otherId);

  check(`${label}: Other role protected`, blocked(otherRole));

  const allRoles = await client.from("user_roles").select("user_id");

  check(
    `${label}: Only own role visible`,
    !allRoles.error &&
      allRoles.data?.length === 1 &&
      allRoles.data[0].user_id === ownId,
  );

  if (!ownProfile.error && ownProfile.data) {
    const ownUpdate = await client
      .from("profiles")
      .update({
        first_name: ownProfile.data.first_name,
      })
      .eq("id", ownId)
      .select("id");

    check(
      `${label}: Own profile update allowed`,
      !ownUpdate.error &&
        ownUpdate.data?.length === 1 &&
        ownUpdate.data[0].id === ownId,
    );
  } else {
    check(`${label}: Own profile update allowed`, false);
  }

  // Use a nonexistent ID to check protected column permissions
  // without changing an existing account identifier.
  const protectedId = await client
    .from("profiles")
    .update({ id: randomUUID() })
    .eq("id", randomUUID())
    .select("id");

  check(
    `${label}: Profile ID update denied`,
    protectedId.error?.code === "42501",
  );

  const protectedRole = await client
    .from("user_roles")
    .update({ role: "admin" })
    .eq("user_id", randomUUID())
    .select("user_id");

  check(
    `${label}: Role update permission denied`,
    protectedRole.error?.code === "42501",
  );
}

async function main() {
  console.log("\n===== SEC.7 LIVE API SECURITY =====\n");

  const loginA = await accountA.auth.signInWithPassword(credentials.a);

  const loginB = await accountB.auth.signInWithPassword(credentials.b);

  const idA = loginA.data?.user?.id;
  const idB = loginB.data?.user?.id;

  check("Account A authenticated", !loginA.error && Boolean(idA));

  check("Account B authenticated", !loginB.error && Boolean(idB));

  if (!idA || !idB || idA === idB) {
    throw new Error("Two distinct accounts required.");
  }

  check("Accounts have distinct identities", true);

  await verifyAccount(accountA, idA, idB, "Account A");
  await verifyAccount(accountB, idB, idA, "Account B");

  const anonymousProfiles = await anonymous.from("profiles").select("id");

  check("Anonymous profile access blocked", blocked(anonymousProfiles));

  const anonymousRoles = await anonymous.from("user_roles").select("user_id");

  check("Anonymous role access blocked", blocked(anonymousRoles));
}

try {
  await main();
} catch {
  failed++;
  console.error("FAIL: Security test could not complete.");
} finally {
  const results = await Promise.allSettled([
    accountA.auth.signOut({ scope: "local" }),
    accountB.auth.signOut({ scope: "local" }),
  ]);

  check(
    "Temporary test sessions signed out",
    results.every(
      (result) => result.status === "fulfilled" && !result.value.error,
    ),
  );

  console.log("\n===== FINAL RESULTS =====");
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  process.exitCode = failed > 0 ? 1 : 0;
}
