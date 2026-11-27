
import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function registerAccount(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  interest: string;
  callbackUrl: string;
}) {
  const supabase = await createClient();

  return supabase.auth.signUp({
    email: input.email.trim().toLowerCase(),
    password: input.password,
    options: {
      emailRedirectTo: input.callbackUrl,
      data: {
        first_name: input.firstName.trim(),
        last_name: input.lastName.trim(),
        interest: input.interest,
      },
    },
  });
}

export async function loginAccount(
  email: string,
  password: string
) {
  const supabase = await createClient();

  return supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
}

export async function logoutAccount() {
  const supabase = await createClient();

  return supabase.auth.signOut({
    scope: "local",
  });
}

export async function getAuthenticatedUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || user.is_anonymous) {
    return null;
  }

  return user;
}
