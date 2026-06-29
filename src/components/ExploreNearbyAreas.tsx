import Link from "next/link";

const nearbyCards = [
  {
    title: "Upper Valley",
    description:
      "Luxury homes, mature trees, larger lots, and peaceful living.",
    href: "/upper-valley-homes-for-sale",
  },
  {
    title: "West El Paso",
    description:
      "Shopping, dining, mountain views, and excellent schools.",
    href: "/west-el-paso-homes-for-sale",
  },
  {
    title: "Northeast El Paso",
    description:
      "Close to Fort Bliss with affordable homes and short commutes.",
    href: "/northeast-el-paso-homes-for-sale",
  },
  {
    title: "PCS to Fort Bliss",
    description:
      "Military relocation resources and VA home buying guides.",
    href: "/pcs",
  },
  {
    title: "Read More Articles",
    description:
      "Local market updates, neighborhood guides, and buying tips.",
    href: "/blog",
  },
  {
    title: "Browse All Listings",
    description:
      "View every available home across the El Paso area.",
    href: "/listings",
  },
];

export default function ExploreNearbyAreas() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-[#1d3b7a]">
            Explore Nearby Areas
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Looking beyond Horizon City? Compare nearby neighborhoods, browse
            homes for sale, and learn more about the communities throughout the
            El Paso area.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {nearbyCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1d3b7a] hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#1d3b7a]">
                {card.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {card.description}
              </p>

              <span className="mt-6 inline-block font-semibold text-[#1d3b7a]">
                Learn More →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}