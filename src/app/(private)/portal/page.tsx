import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  CalendarDays,
  MessageSquare,
  Search,
  Check,
  Clock,
  MapPin,
  UserRound,
  FolderClosed,
  Bell,
  ChevronRight,
  Home,
  BedDouble,
  Bath,
  Maximize,
} from "lucide-react";

const stats = [
  {
    label: "Saved Properties",
    value: "6",
    description: "Your favorite homes",
    icon: Heart,
  },
  {
    label: "Upcoming Showings",
    value: "2",
    description: "Scheduled appointments",
    icon: CalendarDays,
  },
  {
    label: "Unread Messages",
    value: "1",
    description: "From your Sandstone agent",
    icon: MessageSquare,
  },
  {
    label: "Shared Documents",
    value: "3",
    description: "Your real estate documents",
    icon: FolderClosed,
  },
];

const journeySteps = [
  "Consultation",
  "Home Search",
  "Make an Offer",
  "Under Contract",
  "Closing",
];

const properties = [
  {
    id: 1,
    price: "$425,000",
    address: "123 Example Drive",
    location: "El Paso, TX",
    beds: 4,
    baths: 3,
    sqft: "2,450",
  },
  {
    id: 2,
    price: "$365,000",
    address: "456 Sample Avenue",
    location: "El Paso, TX",
    beds: 3,
    baths: 2,
    sqft: "1,980",
  },
  {
    id: 3,
    price: "$510,000",
    address: "789 Preview Lane",
    location: "El Paso, TX",
    beds: 4,
    baths: 3,
    sqft: "2,850",
  },
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
    description: "Schedule a property visit",
    icon: CalendarDays,
  },
  {
    label: "Contact Your Agent",
    description: "We're here to help",
    icon: MessageSquare,
  },
  {
    label: "View Documents",
    description: "Access your shared files",
    icon: FolderClosed,
  },
];

export default function PortalPage() {
  return (
    <div className="space-y-7">
      {/* PREVIEW NOTICE */}
      <div className="flex items-center gap-3 rounded-xl border border-sandstone-gold/30 bg-[#f3ebe2] px-4 py-3">
        <span className="h-2 w-2 shrink-0 rounded-full bg-sandstone-bronze" />

        <p className="text-xs leading-relaxed text-sandstone-bronze">
          Development preview — all client information, appointments, and
          properties shown are fictional.
        </p>
      </div>

      {/* WELCOME BANNER */}
      <section className="relative overflow-hidden rounded-2xl bg-sandstone-navy p-7 text-white sm:p-10">
        <Image
          src="/hero-home.webp"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#1d2858] via-[#253471]/95 to-[#253471]/65" />

        <div className="relative z-10 max-w-2xl">
          <div className="mb-5 h-1 w-12 bg-sandstone-sand-gold" />

          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-sandstone-sand-gold">
            Your real estate journey
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
            Welcome back, Jordan.
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            Your next chapter starts here. Discover properties, manage your
            appointments, and stay connected with your Sandstone agent.
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
        {stats.map(({ label, value, description, icon: Icon }) => (
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

            <p className="mt-3 text-4xl font-bold text-sandstone-navy">
              {value}
            </p>

            <p className="mt-2 text-xs text-gray-500">{description}</p>
          </div>
        ))}
      </section>

      {/* JOURNEY AND AGENT */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* BUYING JOURNEY */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-sandstone-navy">
                Your Buying Journey
              </h2>

              <p className="mt-2 text-xs text-gray-500">
                Follow your progress toward your new home.
              </p>
            </div>

            <span className="rounded-full bg-[#f3ebe2] px-3 py-1.5 text-xs font-semibold text-sandstone-bronze">
              Home Search
            </span>
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-7">
            <div className="mb-2 flex justify-between text-xs">
              <span className="font-medium text-gray-500">
                Overall progress
              </span>

              <span className="font-bold text-sandstone-navy">40%</span>
            </div>

            <div
              role="progressbar"
              aria-label="Buying journey progress"
              aria-valuenow={40}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-2.5 overflow-hidden rounded-full bg-gray-100"
            >
              <div className="h-full w-[40%] rounded-full bg-sandstone-gold" />
            </div>
          </div>

          {/* JOURNEY STEPS */}
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {journeySteps.map((step, index) => (
              <div
                key={step}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                    index === 0
                      ? "bg-sandstone-navy text-white"
                      : index === 1
                        ? "bg-sandstone-gold text-[#1d2858]"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {index === 0 ? <Check className="h-5 w-5" /> : index + 1}
                </div>

                <span
                  className={`text-[11px] font-medium ${
                    index <= 1 ? "text-sandstone-navy" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-7 border-t border-gray-100 pt-5">
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center gap-2 text-xs font-semibold text-gray-400"
            >
              View full journey
              <ArrowRight className="h-4 w-4" />
            </button>
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
              Assigned Agent
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Sandstone Real Estate Group
            </p>

            <span className="mt-3 text-xs text-sandstone-bronze">
              Preview agent profile
            </span>
          </div>

          <button
            type="button"
            disabled
            className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-sandstone-navy px-4 py-3 text-sm font-semibold text-white opacity-70"
          >
            <MessageSquare className="h-4 w-4" />
            Send a Message
          </button>
        </section>
      </div>

      {/* UPCOMING SHOWINGS */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-sandstone-navy">
              Upcoming Showings
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              Keep track of your scheduled property visits.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="flex cursor-not-allowed items-center gap-2 text-xs font-semibold text-gray-400"
          >
            View all
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          {[
            {
              month: "DEC",
              day: "02",
              title: "Private Property Showing",
              address: "123 Example Drive, El Paso, TX",
              time: "10:00 AM",
              status: "Confirmed",
            },
            {
              month: "DEC",
              day: "05",
              title: "Residential Property Tour",
              address: "456 Sample Avenue, El Paso, TX",
              time: "2:30 PM",
              status: "Pending",
            },
          ].map((showing) => (
            <div
              key={showing.address}
              className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/60 p-4"
            >
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-[#f3ebe2]">
                <span className="text-[10px] font-bold tracking-widest text-sandstone-bronze">
                  {showing.month}
                </span>

                <span className="text-2xl font-bold text-sandstone-navy">
                  {showing.day}
                </span>
              </div>

              <div className="min-w-[180px] flex-1">
                <h3 className="text-sm font-bold text-sandstone-navy">
                  {showing.title}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {showing.address}
                </div>

                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3.5 w-3.5" />
                  {showing.time}
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                  showing.status === "Confirmed"
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {showing.status}
              </span>
            </div>
          ))}
        </div>
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <article
              key={property.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/hero-home.webp"
                  alt="Illustrative residential property"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />

                <span className="absolute left-3 top-3 rounded-lg bg-white px-3 py-1.5 text-[10px] font-semibold text-sandstone-navy">
                  Sample Property
                </span>

                <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow">
                  <Heart className="h-4 w-4 fill-sandstone-gold text-sandstone-gold" />
                </div>
              </div>

              <div className="p-5">
                <p className="text-xl font-bold text-sandstone-navy">
                  {property.price}
                </p>

                <h3 className="mt-2 text-sm font-semibold text-sandstone-charcoal">
                  {property.address}
                </h3>

                <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {property.location}
                </p>

                <div className="mt-5 flex flex-wrap gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="h-4 w-4" />
                    {property.beds} Beds
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4" />
                    {property.baths} Baths
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Maximize className="h-4 w-4" />
                    {property.sqft} sqft
                  </span>
                </div>
              </div>
            </article>
          ))}
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

        <div className="mt-5 divide-y divide-gray-100">
          {[
            {
              icon: Bell,
              title: "New property recommendation",
              description: "A property matches your preferences.",
              time: "Today",
            },
            {
              icon: CalendarDays,
              title: "Showing confirmed",
              description: "Your upcoming property visit is confirmed.",
              time: "Yesterday",
            },
            {
              icon: Home,
              title: "Property saved",
              description: "A home was added to your favorites.",
              time: "2 days ago",
            },
          ].map(({ icon: Icon, title, description, time }) => (
            <div key={title} className="flex items-center gap-4 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3ebe2]">
                <Icon className="h-5 w-5 text-sandstone-bronze" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-sandstone-navy">
                  {title}
                </p>

                <p className="mt-1 text-xs text-gray-500">{description}</p>
              </div>

              <span className="text-[10px] text-gray-400">{time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
