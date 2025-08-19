import { Suspense } from "react";
import EventCard from "./EventCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import { eventsApi } from "@/lib/api";

const EventListContent = async () => {
  try {
    const response = await eventsApi.getAll({ cache: 'force-cache' });
    const allEvents = response.success ? response.data : [];

    if (!allEvents || allEvents.length === 0) {
      return (
        <EmptyState
          title="No events found at the moment"
          subtitle="Check back later for exciting events!"
        />
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {allEvents.map((event) => (
          <EventCard key={event?.id} event={event} />
        ))}
      </div>
    );
  } catch (error) {
    return <ErrorState message={error.message || "Failed to load events"} />;
  }
};

// Main EventList component with Suspense
const EventList = () => {
  return (
    <Suspense fallback={<LoadingSkeleton count={6} />}>
      <EventListContent />
    </Suspense>
  );
};

export default EventList;
