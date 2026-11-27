import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type PortalProfile = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  initials: string;
  interest: string | null;
  profileAvailable: boolean;
};

export const getPortalProfile = cache(async (): Promise<PortalProfile> => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user || user.is_anonymous || !user.email_confirmed_at) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("first_name, last_name, interest")
    .eq("id", user.id)
    .maybeSingle();

  const profileAvailable = !profileError && Boolean(profile);

  const firstName = profileAvailable ? profile?.first_name?.trim() || "" : "";

  const lastName = profileAvailable ? profile?.last_name?.trim() || "" : "";

  const fullName =
    [firstName, lastName].filter(Boolean).join(" ") || "Sandstone Client";

  const initials =
    [firstName, lastName]
      .filter(Boolean)
      .map((name) => Array.from(name)[0])
      .join("")
      .toUpperCase() || "SC";

  return {
    firstName,
    lastName,
    fullName,
    email: user.email || "",
    initials,
    interest: profileAvailable ? (profile?.interest ?? null) : null,
    profileAvailable,
  };
});
