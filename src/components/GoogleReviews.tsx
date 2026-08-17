import { getGooglePlacesApiKey, getGooglePlaceId } from "@/config";
import { GoogleReviewsCarousel } from "./GoogleReviewsCarousel";

type GoogleReview = {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
};

type GooglePlacesResponse = {
  result?: {
    reviews?: GoogleReview[];
    rating?: number;
    user_ratings_total?: number;
  };
  status: string;
  error_message?: string;
};

const nowInSeconds = Math.floor(Date.now() / 1000);

const PLACEHOLDER_REVIEWS: GoogleReview[] = [
  {
    author_name: "Jane Smith",
    author_url: "#",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "Alejandro and his team were absolutely incredible to work with. They made selling our home a breeze and were highly professional throughout the entire process.",
    time: nowInSeconds - 5_184_000,
  },
  {
    author_name: "Michael Johnson",
    author_url: "#",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "1 week ago",
    text: "Sandstone Real Estate went above and beyond for our military relocation. They understood our tight timeline and found us the perfect home in El Paso.",
    time: nowInSeconds - 604_800,
  },
  {
    author_name: "Sarah Davis",
    author_url: "#",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "3 months ago",
    text: "The level of communication and dedication from this team is unmatched. Highly recommend to anyone looking for a luxury home or a seamless selling experience.",
    time: nowInSeconds - 7_776_000,
  },
  {
    author_name: "David Martinez",
    author_url: "#",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "4 months ago",
    text: "The Sandstone team made our home-buying experience simple and stress-free. They answered every question and guided us through each step.",
    time: nowInSeconds - 10_368_000,
  },
  {
    author_name: "Emily Rodriguez",
    author_url: "#",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "5 months ago",
    text: "Professional, knowledgeable, and always responsive. We felt supported throughout the entire process and would gladly work with Sandstone again.",
    time: nowInSeconds - 12_960_000,
  },
];

async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  const apiKey = getGooglePlacesApiKey();
  const placeId = getGooglePlaceId();

  if (!apiKey || !placeId) {
    return [...PLACEHOLDER_REVIEWS].sort((a, b) => b.time - a.time);
  }

  const params = new URLSearchParams({
    place_id: placeId,
    fields: "name,rating,reviews,user_ratings_total",
    reviews_sort: "newest",
    key: apiKey,
  });

  const url = `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`;

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch Google reviews:",
        response.status,
        response.statusText
      );

      return [...PLACEHOLDER_REVIEWS].sort((a, b) => b.time - a.time);
    }

    const data = (await response.json()) as GooglePlacesResponse;

    if (data.status !== "OK") {
      console.error(
        "Google Places API error:",
        data.status,
        data.error_message ?? "No error message provided"
      );

      return [...PLACEHOLDER_REVIEWS].sort((a, b) => b.time - a.time);
    }

    const reviews = data.result?.reviews ?? [];

    if (reviews.length === 0) {
      return [...PLACEHOLDER_REVIEWS].sort((a, b) => b.time - a.time);
    }

    return [...reviews].sort((a, b) => b.time - a.time);
  } catch (error) {
    console.error("Error fetching Google reviews:", error);

    return [...PLACEHOLDER_REVIEWS].sort((a, b) => b.time - a.time);
  }
}

export async function GoogleReviews() {
  const apiKey = getGooglePlacesApiKey();
  const placeId = getGooglePlaceId();

  const reviews = await fetchGoogleReviews();
  const isUsingPlaceholders = !apiKey || !placeId;

  return (
    <section className="border-t border-[var(--sandstone-charcoal)]/10 bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--sandstone-sand-gold)] sm:text-sm">
            Client Testimonials
          </p>

          <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--sandstone-navy)] sm:text-4xl">
            See what families are saying about Sandstone
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-[var(--sandstone-charcoal)]/80 sm:text-base">
            We take pride in delivering exceptional real estate experiences.
            Don&apos;t just take our word for it—read the stories of those who
            have successfully bought and sold with us.
          </p>
        </div>

        <GoogleReviewsCarousel reviews={reviews} />

        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://www.google.com/search?q=Sandstone+Real+Estate+Team+by+Alejandro+Gamboa+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] px-8 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-white transition-opacity duration-300 hover:opacity-90"
          >
            View All Google Reviews
          </a>

          <a
            href="https://www.google.com/search?q=Sandstone+Real+Estate+Team+by+Alejandro+Gamboa+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 border-[var(--sandstone-sand-gold)] bg-transparent px-8 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--sandstone-sand-gold)] transition-colors duration-300 hover:bg-[var(--sandstone-sand-gold)] hover:text-white"
          >
            Leave a Google Review
          </a>
        </div>

        {isUsingPlaceholders && (
          <p className="mt-4 text-center text-xs text-red-500">
            Currently displaying placeholder reviews. Add
            GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID to your environment
            variables to display real reviews.
          </p>
        )}
      </div>
    </section>
  );
}