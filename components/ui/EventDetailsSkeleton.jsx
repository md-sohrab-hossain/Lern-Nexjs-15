const EventDetailsSkeleton = () => (
  <div className="animate-pulse">
    {/* Hero section skeleton */}
    <div className="h-80 bg-gray-600 rounded-lg mb-8"></div>
    
    {/* Content skeleton */}
    <section className="container px-4 mx-auto">
      <div className="grid grid-cols-1 gap-12 my-12 lg:grid-cols-5">
        {/* Event details skeleton */}
        <div className="lg:col-span-3 space-y-4">
          <div className="h-8 bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-600 rounded w-5/6"></div>
          <div className="h-4 bg-gray-600 rounded w-4/5"></div>
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          
          {/* Action buttons skeleton */}
          <div className="flex gap-4 mt-8">
            <div className="h-10 bg-blue-600/50 rounded w-32"></div>
            <div className="h-10 bg-green-600/50 rounded w-24"></div>
          </div>
          
          {/* Swags section skeleton */}
          <div className="mt-8 space-y-3">
            <div className="h-6 bg-gray-600 rounded w-1/3"></div>
            <div className="h-4 bg-gray-600 rounded w-2/3"></div>
            <div className="h-4 bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
        
        {/* Event venue skeleton */}
        <div className="lg:col-span-2 space-y-4">
          <div className="h-6 bg-gray-600 rounded w-1/2"></div>
          <div className="h-4 bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          <div className="h-40 bg-gray-600 rounded mt-4"></div>
        </div>
      </div>
    </section>
  </div>
);

export default EventDetailsSkeleton;
