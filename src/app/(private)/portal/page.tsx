import Image from "next/image";
import Link from "next/link";
import { getPortalProfile } from "@/lib/supabase/profile";
import {
  ArrowRight,
  Heart,
  CalendarDays,
  MessageSquare,
  Search,
  UserRound,
  FolderClosed,
  Bell,
  AlertCircle,
} from "lucide-react";

const stats = [
  {
    label: "Saved Properties",
    description: "Property saving coming soon",
    icon: Heart,
  },
  {
    label: "Upcoming Showings",
    description: "Showing management coming soon",
    icon: CalendarDays,
  },
  {
    label: "Unread Messages",
    description: "Messaging coming soon",
    icon: MessageSquare,
  },
  {
    label: "Shared Documents",
    description: "Document sharing coming soon",
    icon: FolderClosed,
  },
];

const buyingSteps = [
  "Consultation",
  "Home Search",
  "Make an Offer",
  "Under Contract",
  "Closing",
];

const sellingSteps = [
  "Consultation",
  "Prepare Home",
  "List Property",
  "Under Contract",
  "Closing",
];

const quickActions = [
  {
    label: "Browse Properties",
    description: "Find your next home",
    icon: Search,
    href: "/listings",
  },
  {
    label: "Request a Showing",
    description: "Coming soon",
    icon: CalendarDays,
  },
  {
    label: "Contact Your Agent",
    description: "Coming soon",
    icon: MessageSquare,
  },
  {
    label: "View Documents",
    description: "Coming soon",
    icon: FolderClosed,
  },
];

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Heart;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 px-6 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3ebe2]">
        <Icon aria-hidden="true" className="h-7 w-7 text-sandstone-bronze" />
      </div>

      <h3 className="mt-4 text-sm font-bold text-sandstone-navy">{title}</h3>

      <p className="mt-2 max-w-sm text-xs leading-relaxed text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default async function PortalPage() {
  const profile = await getPortalProfile();

  const selling = profile.interest === "selling";

  const journeySteps = selling ? sellingSteps : buyingSteps;

  const journeyTitle = selling
    ? "Your Selling Journey"
    : profile.interest === "buying"
      ? "Your Buying Journey"
      : "Your Real Estate Journey";

  const welcomeMessage = profile.firstName
    ? `Welcome back, ${profile.firstName}.`
    : "Welcome back.";

  return (
    <div className="space-y-7">
      {/* PROFILE AVAILABILITY */}
      {!profile.profileAvailable && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"
        >
          <AlertCircle
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-amber-700"
          />

          <p className="text-xs leading-relaxed text-amber-800">
            Your account is authenticated, but your profile details are
            temporarily unavailable. Please refresh the page or try again later.
          </p>
        </div>
      )}

      {/* DEVELOPMENT NOTICE */}
      <div className="flex items-center gap-3 rounded-xl border border-sandstone-gold/30 bg-[#f3ebe2] px-4 py-3">
        <span className="h-2 w-2 shrink-0 rounded-full bg-sandstone-bronze" />

        <p className="text-xs leading-relaxed text-sandstone-bronze">
          Your account is active. Additional client portal features are
          currently under development.
        </p>
      </div>

      {/* WELCOME BANNER */}
      <section className="relative overflow-hidden rounded-2xl bg-sandstone-navy p-7 text-white sm:p-10">
        <Image
          src="/hero-home.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#1d2858] via-[#253471]/95 to-[#253471]/65" />

        <div className="relative z-10 max-w-2xl">
          <div className="mb-5 h-1 w-12 bg-sandstone-sand-gold" />

          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-sandstone-sand-gold">
            Your real estate journey
          </p>

          <h2 className="break-words text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
            {welcomeMessage}
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            Your next chapter starts here. Explore properties and prepare for
            your personalized Sandstone real estate experience.
          </p>

          <Link
            href="/listings"
            className="mt-7 inline-flex items-center gap-3 rounded-xl bg-sandstone-gold px-6 py-3.5 text-sm font-semibold text-[#1d2858] transition hover:bg-[#c8ab90]"
          >
            Explore Properties
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ACCOUNT STATISTICS */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, description, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-semibold text-gray-500">{label}</p>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3ebe2]">
                <Icon className="h-5 w-5 text-sandstone-bronze" />
              </div>
            </div>

            <p
              aria-label="Not available yet"
              className="mt-3 text-4xl font-bold text-sandstone-navy"
            >
              &mdash;
            </p>

            <p className="mt-2 text-xs text-gray-500">{description}</p>
          </div>
        ))}
      </section>

      {/* JOURNEY AND AGENT */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* REAL ESTATE JOURNEY */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-sandstone-navy">
                {journeyTitle}
              </h2>

              <p className="mt-2 text-xs text-gray-500">
                Follow the steps of your real estate experience.
              </p>
            </div>

            <span className="rounded-full bg-[#f3ebe2] px-3 py-1.5 text-xs font-semibold text-sandstone-bronze">
              Coming soon
            </span>
          </div>

          {/* JOURNEY STATUS */}
          <div className="mt-7">
            <div className="mb-2 flex justify-between text-xs">
              <span className="font-medium text-gray-500">
                Overall progress
              </span>

              <span className="font-semibold text-gray-500">
                Not available yet
              </span>
            </div>

            <div
              aria-hidden="true"
              className="h-2.5 rounded-full bg-gray-100"
            />
          </div>

          {/* JOURNEY STEPS */}
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {journeySteps.map((step, index) => (
              <div
                key={step}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-400">
                  {index + 1}
                </div>

                <span className="text-[11px] font-medium text-gray-500">
                  {step}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-7 border-t border-gray-100 pt-5">
            <p className="text-xs leading-relaxed text-gray-500">
              Personalized journey tracking will become available in a future
              update.
            </p>
          </div>
        </section>

        {/* ASSIGNED AGENT */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-sandstone-navy">
            Your Sandstone Agent
          </h2>

          <p className="mt-2 text-xs text-gray-500">
            Your dedicated real estate professional.
          </p>

          <div className="my-7 flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#f3ebe2] bg-[#eee4d9]">
              <UserRound className="h-9 w-9 text-sandstone-bronze" />
            </div>

            <h3 className="mt-4 text-base font-bold text-sandstone-navy">
              Agent assignment coming soon
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-gray-500">
              Your assigned agent&apos;s information will appear here when this
              feature becomes available.
            </p>
          </div>

          <button
            type="button"
            disabled
            title="Messaging coming soon"
            className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-sandstone-navy px-4 py-3 text-sm font-semibold text-white opacity-60"
          >
            <MessageSquare className="h-4 w-4" />
            Send a Message
          </button>
        </section>
      </div>

      {/* UPCOMING SHOWINGS */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-sandstone-navy">
            Upcoming Showings
          </h2>

          <p className="mt-2 text-xs text-gray-500">
            Keep track of your scheduled property visits.
          </p>
        </div>

        <EmptyState
          icon={CalendarDays}
          title="Showing management coming soon"
          description="Your scheduled property visits will appear here once showing management is available."
        />
      </section>

      {/* SAVED PROPERTIES */}
      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-sandstone-navy">
              Your Saved Properties
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              Revisit the homes you love.
            </p>
          </div>

          <Link
            href="/listings"
            className="flex items-center gap-2 text-xs font-semibold text-sandstone-navy hover:underline"
          >
            Browse listings
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <EmptyState
            icon={Heart}
            title="Property saving coming soon"
            description="Your favorite properties will appear here once property saving becomes available."
          />

          <div className="mt-5 flex justify-center">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 rounded-xl bg-sandstone-navy px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Explore Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-sandstone-navy">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map(({ label, description, icon: Icon, href }) => {
            const content = (
              <>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3ebe2]">
                  <Icon className="h-5 w-5 text-sandstone-bronze" />
                </div>

                <p className="text-sm font-bold text-sandstone-navy">{label}</p>

                <p className="mt-2 text-xs text-gray-500">{description}</p>
              </>
            );

            return href ? (
              <Link
                key={label}
                href={href}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-sandstone-gold hover:shadow-md"
              >
                {content}
              </Link>
            ) : (
              <button
                key={label}
                type="button"
                disabled
                title="Coming soon"
                className="cursor-not-allowed rounded-2xl border border-gray-200 bg-white p-5 text-left opacity-70"
              >
                {content}
              </button>
            );
          })}
        </div>
      </section>

      {/* RECENT ACTIVITY */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-sandstone-navy">
          Recent Activity
        </h2>

        <p className="mt-2 text-xs text-gray-500">
          Stay updated throughout your real estate journey.
        </p>

        <div className="mt-5">
          <EmptyState
            icon={Bell}
            title="Activity tracking coming soon"
            description="Updates about your properties, appointments, and real estate journey will appear here in a future update."
          />
        </div>
      </section>
    </div>
  );
}
