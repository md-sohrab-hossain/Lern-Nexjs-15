import HeroSection from "@/components/details/HeroSection";
import EventDetails from "@/components/details/EventDetails";
import EventVenue from "@/components/details/EventVenue";
import { eventsApi } from "@/lib/api";

const EventDetailsPage = async ({ params: { id } }) => {
  let eventInfo = null;

  try {
    const response = await eventsApi.getById(id, { cache: "force-cache" });
    eventInfo = response.success ? response.data : null;
  } catch (error) {
    console.error("Error loading event:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Event Not Found
          </h1>
          <p className="text-gray-600">{`The event you're looking for doesn't exist or has been removed.`}</p>
          <a
            href="/"
            className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-500 mb-4">
            Event Not Found
          </h1>
          <p className="text-gray-600">{`The event you're looking for doesn't exist.`}</p>
          <a
            href="/"
            className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
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
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 my-12">
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
