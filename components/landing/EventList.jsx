import { Suspense } from "react";
import EventCard from "./EventCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import { eventsApi } from "@/lib/api";

const EventListContent = async ({ query }) => {
  try {
    let response;
    
    if (query && query.trim()) {
      // Use search API when there's a query
      response = await eventsApi.search(query, { cache: "no-store" });
    } else {
      // Use getAll API when no query
      response = await eventsApi.getAll({ cache: "force-cache" });
    }
    
    const allEvents = response.success ? response.data : [];

    if (!allEvents || allEvents.length === 0) {
      const title = query && query.trim() 
        ? `No events found for "${query}"` 
        : "No events found at the moment";
      const subtitle = query && query.trim() 
        ? "Try searching with different keywords" 
        : "Check back later for exciting events!";
      
      return (
        <EmptyState
          title={title}
          subtitle={subtitle}
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
const EventList = ({ query }) => {
  return (
    <Suspense fallback={<LoadingSkeleton count={6} />}>
      <EventListContent query={query} />
    </Suspense>
  );
};

export default EventList;
