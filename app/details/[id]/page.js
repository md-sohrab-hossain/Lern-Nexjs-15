import HeroSection from "@/components/details/HeroSection";
import EventDetails from "@/components/details/EventDetails";
import EventVenue from "@/components/details/EventVenue";
import { eventsApi } from "@/lib/api";

export async function generateMetadata({ params: { id } }) {
  try {
    const response = await eventsApi.getById(id, { cache: "force-cache" });
    const eventInfo = response.success ? response.data : null;

    if (!eventInfo) {
      return {
        title: "Eventry - Event Not Found",
        description: "The requested event could not be found.",
      };
    }

    return {
      title: `Eventry - ${eventInfo.name}`,
      description: eventInfo.details,
      openGraph: {
        title: `Eventry - ${eventInfo.name}`,
        description: eventInfo.details,
        images: [eventInfo.imageUrl],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `Eventry - ${eventInfo.name}`,
        description: eventInfo.details,
        images: [eventInfo.imageUrl],
      },
    };
  } catch (error) {
    return {
      title: "Eventry - Event Not Found", 
      description: "The requested event could not be found.",
    };
  }
}

const EventDetailsPage = async ({ params: { id } }) => {
  let eventInfo = null;

  try {
    const response = await eventsApi.getById(id, { cache: "force-cache" });
    eventInfo = response.success ? response.data : null;
  } catch (error) {
    // Error handled silently
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-500">
            Event Not Found
          </h1>
          <p className="text-gray-600">{`The event you're looking for doesn't exist or has been removed.`}</p>
          <a
            href="/"
            className="inline-block px-6 py-2 mt-4 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-500">
            Event Not Found
          </h1>
          <p className="text-gray-600">{`The event you're looking for doesn't exist.`}</p>
          <a
            href="/"
            className="inline-block px-6 py-2 mt-4 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection eventInfo={eventInfo} />
      <section className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-12 my-12 lg:grid-cols-5">
          <EventDetails
            details={eventInfo?.details}
            swags={eventInfo?.swgs || eventInfo?.swags}
          />
          <EventVenue location={eventInfo?.location} />
        </div>
      </section>
    </>
  );
};

export default EventDetailsPage;
