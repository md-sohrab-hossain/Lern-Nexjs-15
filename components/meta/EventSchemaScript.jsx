const EventSchemaScript = ({ event }) => {
  const eventName = encodeURIComponent(event?.name);

  // Extract creation date from MongoDB ObjectId to prevent hydration mismatch
  // This gives consistent dates based on when the event was created
  const getDateFromObjectId = (objectId) => {
    try {
      const timestamp = parseInt(objectId?.substring(0, 8), 16) * 1000;
      return new Date(timestamp);
    } catch {
      return new Date('2025-01-01T09:00:00.000Z'); // Fallback
    }
  };

  const eventCreationDate = getDateFromObjectId(event?.id);
  const staticStartDate = eventCreationDate;
  const staticEndDate = new Date(eventCreationDate.getTime() + 8 * 60 * 60 * 1000); // +8 hours

  const formattedData = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: eventName,
    startDate: staticStartDate.toISOString(),
    endDate: staticEndDate.toISOString(),
    description: event?.details,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event?.location,
    },
    image: [event?.imageUrl],
    organizer: {
      "@type": "Organization",
      name: "LWS",
      url: "https://javascript-guidebook-sohrab.vercel.app/",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(formattedData),
        }}
      />
    </>
  );
};

export default EventSchemaScript;
