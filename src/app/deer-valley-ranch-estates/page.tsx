import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function DeerValleyPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[var(--sandstone-off-white)]">

        {/* HERO */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">

          <Image
            src="/deer-valley-hero.webp"
            alt="Deer Valley Ranch Estates"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="px-6 text-center text-white">

              <h1 className="text-5xl font-bold md:text-6xl">
                Deer Valley Ranch Estates
              </h1>

              <p className="mt-4 text-lg md:text-xl">
                Discover luxury living in Horizon City, Texas.
              </p>

              <button className="mt-8 rounded-full bg-[var(--sandstone-navy)] px-8 py-4 font-semibold text-white hover:opacity-90">
                Schedule a Tour
              </button>

            </div>
          </div>

        </section>

        {/* DISCOVER */}
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-6">

                <div className="text-center">
                    <h2 className="text-4xl font-bold text-[var(--sandstone-navy)]">
                        Discover the Maribel
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Explore luxury living designed for comfort,
                        convenience, and modern lifestyles.
                    </p>
                </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">

                <div>
                    <Image
                        src="/house2.webp"
                        alt="Maribel Home"
                        width={800}
                        height={500}
                        className="rounded-2xl shadow-lg"
                    />
                </div>

                <div className="flex flex-col justify-center">

                    <h3 className="text-2xl font-semibold">
                        Modern Design
                    </h3>

                    <p className="mt-4 text-gray-600">
                        Spacious layouts, elegant finishes,
                        and thoughtful architecture make the
                        Maribel a standout choice for families.
                    </p>

                    <ul className="mt-6 space-y-3">
                        <li>✓ Open concept floor plans</li>
                        <li>✓ Energy-efficient construction</li>
                        <li>✓ Premium finishes</li>
                        <li>✓ Family-friendly community</li>
                    </ul>

                </div>

            </div>

        </div>
    </section>

        {/* SCHOOLS */}
<section className="bg-[var(--sandstone-off-white)] py-20">
  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">
      <h2 className="text-5xl font-bold text-[var(--sandstone-navy)]">
        Schools Near Deer Valley Ranch Estates
      </h2>

      <p className="mx-auto mt-6 max-w-4xl text-lg text-gray-600">
        Deer Valley Ranch Estates is served by Greenwood Independent School District
        (Greenwood ISD). Known for its strong community involvement, smaller class
        sizes, and academic excellence, Greenwood ISD is one of the most sought-after
        school districts in Midland County.
      </p>
    </div>

    <div className="mt-14 grid gap-8 lg:grid-cols-2">

      {/* LEFT COLUMN */}
      <div>

        <Image
          src="/house1.webp"
          alt="Greenwood High School"
          width={900}
          height={600}
          className="w-full rounded-3xl shadow-lg"
        />

        <div className="mt-6 grid grid-cols-2 gap-4">

          <Image
            src="/house2.webp"
            alt="Greenwood Elementary School"
            width={400}
            height={250}
            className="rounded-2xl shadow-md"
          />

          <Image
            src="/deer-valley-hero.webp"
            alt="Greenwood ISD"
            width={400}
            height={250}
            className="rounded-2xl shadow-md"
          />

        </div>

        <div className="mt-6 w-full rounded-3xl bg-white p-6 shadow">

          <h3 className="text-xl font-semibold text-[var(--sandstone-navy)]">
            Why Families Choose Greenwood ISD
          </h3>

          <p className="mt-3 text-gray-600">
            Families relocating to Deer Valley Ranch Estates consistently cite
            Greenwood ISD's strong academics, community involvement, and smaller
            school environment as key reasons for choosing the area.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            School zoning may change. Buyers should verify attendance boundaries
            directly with Greenwood ISD.
          </p>

        </div>

      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-6">

        <div className="rounded-3xl bg-white p-6 shadow">
          <h3 className="text-2xl font-semibold text-[var(--sandstone-navy)]">
            Elementary Schools
          </h3>

          <div className="mt-6 space-y-4">

            <div className="flex justify-between border-b pb-3">
              <span>Greenwood Elementary School</span>
              <span className="text-gray-500">79706</span>
            </div>

            <div className="flex justify-between">
              <span>Greenwood Intermediate School</span>
              <span className="text-gray-500">79706</span>
            </div>

          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h3 className="text-2xl font-semibold text-[var(--sandstone-navy)]">
            Middle Schools
          </h3>

          <div className="mt-6">
            <div className="flex justify-between">
              <span>James R. Brooks Middle School</span>
              <span className="text-gray-500">79706</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h3 className="text-2xl font-semibold text-[var(--sandstone-navy)]">
            High Schools
          </h3>

          <div className="mt-6">
            <div className="flex justify-between">
              <span>Greenwood High School</span>
              <span className="text-gray-500">79706</span>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</section>

        {/* CONVENIENCE */}
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">
                    <h2 className="text-5xl font-bold text-[var(--sandstone-navy)]">
                        Convenience at Your Doorstep
                    </h2>

                    <p className="mt-4 text-gray-600">
                       Everything you need is just minutes away from Deer Valley Ranch Estates.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-3xl bg-[var(--sandstone-off-white)] p-6 shadow">
                        <h3 className="text-xl font-semibold text-[var(--sandstone-navy)]">
                            Healthcare
                        </h3>
                        <p className="mt-3 text-gray-600">
                            Hospitals, urgent care, and family medicine nearby.
                        </p>
                    </div>

                <div className="rounded-3xl bg-[var(--sandstone-off-white)] p-6 shadow">
                    <h3 className="text-xl font-semibold text-[var(--sandstone-navy)]">
                        Grocery Stores
                    </h3>
                    <p className="mt-3 text-gray-600">
                        Convenient access to major grocery chains.
                    </p>
                </div>

                <div className="rounded-3xl bg-[var(--sandstone-off-white)] p-6 shadow">
                    <h3 className="text-xl font-semibold text-[var(--sandstone-navy)]">
                        Shopping & Dining
                    </h3>
                    <p className="mt-3 text-gray-600">
                        Restaurants, coffee shops, and retail destinations.
                    </p>
                </div>

                <div className="rounded-3xl bg-[var(--sandstone-off-white)] p-6 shadow">
                    <h3 className="text-xl font-semibold text-[var(--sandstone-navy)]">
                        Fitness
                    </h3>
                    <p className="mt-3 text-gray-600">
                        Gyms, trails, and wellness options nearby.
                    </p>
                </div>

                <div className="rounded-3xl bg-[var(--sandstone-off-white)] p-6 shadow">
                    <h3 className="text-xl font-semibold text-[var(--sandstone-navy)]">
                        Banking
                    </h3>
                    <p className="mt-3 text-gray-600">
                        Access to major banks and financial services.
                    </p>
                </div>

                <div className="rounded-3xl bg-[var(--sandstone-off-white)] p-6 shadow">
                    <h3 className="text-xl font-semibold text-[var(--sandstone-navy)]">
                        Entertainment
                    </h3>
                    <p className="mt-3 text-gray-600">
                        Parks, recreation, and local attractions.
                    </p>
                </div>

            </div>

        </div>
    </section>

        {/* BUYERS */}
        <section className="bg-[var(--sandston-off-white)] py-12">
            <div className="mx-auto max-w-7x1 px-6">

                <div className="text-center">
                    <h2 className="text-5x1 font-bold text-[var(--sandstone-navy)]">
                        Why Buyers Choose Deer Valley Ranch Estates
                    </h2>

                    <p className="mt-4 text-gray-600">
                        A community designed for comfort, convenience, and long-term value.
                    </p>
                </div>
                
                <div className="mt-14 grid gap-10 lg:grid-cols-2">

                    {/* LEFT SIDE */}
                    < div className="space-y-8">
                        <div>
                            <h3 className="text-2x1 font-semibold text-[var(--sandstone-navy)]">
                                The Perfect Balance of Space & Convenience
                            </h3>
                            
                            <p className="mt-3 text-gray-600">
                                Residents enjoy spacious homes, modern amenities, 
                                and easy access to schools, shopping, and healthcare.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2x1 font-semibold text-[var(--sandstone-navy)]">
                                Strong Home Values
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Deer Valley Ranch Estates continues to attract buyers
                                seeking quality homes in a desirable location.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2x1 font-semibold text-[var(--sandstone-navy)]">
                                A Great Location for Daily Life
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Whether communting, shopping, or spending time outdoors,
                                everything is within reach.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">
                        
                        <div className="overflow-hidden rounded-3xl bg-white shadow">
                            <Image
                                src="/house1.webp"
                                alt="Community Feature"
                                width={800}
                                height={400}
                                className="w-full"
                            />

                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[var(--sandstone-navy)]">
                                    Beautiful Community Setting
                                </h3>

                                <p className="mt-2 text-gray-600">
                                    Attractive homes and scenic surroundings make this
                                    one of the area's most desirable communities.
                                </p>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-3xl bg-white shadow">
                            <Image
                                src="/house2.webp"
                                alt="Community Lifestyle"
                                width={800}
                                height={400}
                                className="w-full"
                            />

                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[var(--sandstone-navy)]">
                                    Modern Lifestyle
                                </h3>

                                <p className="mt-2 text-gray-600">
                                    Enjoy modern floorplans, nearby amenities,
                                    and a growing community atmosphere.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>

        {/* UTILITIES */}
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">
                    <h2 className="text-5xl font-bold text-[var(--sandstone-navy)]">
                        Utilities & Local Services
                    </h2>

                    <p className="mt-4 text-gray-600">
                         Essential services available to Deer Valley Ranch Estates residents.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-3xl bg-[var(--sandstone-off-white)] p-6 shadow">
                        <h3 className="text-xl font-semibold">⚡ Electricity</h3>
                            <p className="mt-3 text-gray-600">
                                Regional electric provider serving the community.
                            </p>
                    </div>

                    <div className="rounded-3xl bg-[var(--sandstone-off-white)] p-6 shadow">
                        <h3 className="text-xl font-semibold">💧 Water</h3>
                            <p className="mt-3 text-gray-600">
                                Community water and utility services.
                            </p>
                    </div>

                    <div className="rounded-3xl bg-[var(--sandstone-off-white)] p-6 shadow">
                        <h3 className="text-xl font-semibold">🔥 Natural Gas</h3>
                            <p className="mt-3 text-gray-600">
                                Natural gas service for residential properties.
                            </p>
                    </div>

                    <div className="rounded-3xl bg-[var(--sandstone-off-white)] p-6 shadow">
                        <h3 className="text-xl font-semibold">🌐 Internet</h3>
                            <p className="mt-3 text-gray-600">
                                High-speed fiber and cable internet available.
                            </p>
                    </div>

                </div>

            </div>
        </section>

        {/* FAQ */}
        <section className="bg-[var(--sandstone-off-white)] py-20">
            <div className="mx-auto max-w-4xl px-6">

                <h2 className="text-center text-5xl font-bold text-[var(--sandstone-navy)]">
                    Frequently Asked Questions
                </h2>

                <div className="mt-12 space-y-4">

                    <div className="rounded-2xl bg-white p-6 shadow">
                        <h3 className="font-semibold">
                            What schools serve Deer Valley Ranch Estates?
                        </h3>

                        <p className="mt-2 text-gray-600">
                        Greenwood ISD serves the community.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow">
                        <h3 className="font-semibold">
                            Are new construction homes available?
                        </h3>

                        <p className="mt-2 text-gray-600">
                            Availability varies by builder and phase of development.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow">
                        <h3 className="font-semibold">
                            Is the community family friendly?
                        </h3>

                        <p className="mt-2 text-gray-600">
                            Yes. Schools, parks, shopping, and healthcare are all nearby.
                        </p>
                    </div>

                </div>

            </div>
        </section>

        {/* CONTACT */}
        <section className="bg-white py-20">
            <div className="mx-auto max-w-5xl px-6">

                <div className="text-center">
                    <h2 className="text-5xl font-bold text-[var(--sandstone-navy)]">
                        Ready to Buy in Horizon City?
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Contact the Sandstone Real Estate Team to learn more about Deer Valley Ranch Estates.
                    </p>
                </div>

                <div className="mt-12 rounded-3xl bg-[var(--sandstone-off-white)] p-10 shadow">

                    <div className="grid gap-6 md:grid-cols-2">

                        <input
                            type="text"
                            placeholder="First Name"
                            className="rounded-xl border p-4"
                        />

                        <input
                            type="text"
                            placeholder="Last Name"
                            className="rounded-xl border p-4"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="rounded-xl border p-4"
                        />

                        <input
                            type="tel"
                            placeholder="Phone"
                            className="rounded-xl border p-4"
                        />

                    </div>

                <textarea
                    placeholder="Tell us about your home search..."
                    className="mt-6 h-32 w-full rounded-xl border p-4"
                />

                <button className="mt-6 rounded-full bg-[var(--sandstone-navy)] px-10 py-4 font-semibold text-white">
                    Contact Us
                </button>

            </div>

        </div>
    </section>

      </main>

      <SiteFooter />
    </>
  );
}