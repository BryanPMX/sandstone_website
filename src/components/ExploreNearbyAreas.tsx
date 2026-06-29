import Link from "next/link";

const nearbyCards = [
  {
    title: "Upper Valley",
    description:
      "Luxury homes, mature trees, scenic views, and some of El Paso's most desirable neighborhoods.",
    href: "/areas/upper-valley",
  },
  {
    title: "West El Paso",
    description:
      "Beautiful mountain views, shopping, restaurants, and top-rated communities.",
    href: "/areas/west-el-paso",
  },
  {
    title: "Northeast El Paso",
    description:
      "Affordable homes, Fort Bliss access, and convenient commuting.",
    href: "/areas/northeast-el-paso",
  },
  {
    title: "Horizon City",
    description:
      "One of the fastest-growing communities with new construction and family-friendly neighborhoods.",
    href: "/areas/horizon-city",
  },
  {
    title: "Fort Bliss PCS",
    description:
      "Everything military families need to know before relocating to El Paso.",
    href: "/pcs",
  },
  {
    title: "All Communities",
    description:
      "Browse every neighborhood Sandstone Real Estate serves throughout the El Paso area.",
    href: "/areas",
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
            Discover the neighborhoods that make El Paso unique. Learn about
            local communities, schools, amenities, and available homes.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {nearbyCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1d3b7a] hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-[#1d3b7a]">
                {card.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {card.description}
              </p>

              <span className="mt-6 inline-flex font-semibold text-[#1d3b7a]">
                Explore Area →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}