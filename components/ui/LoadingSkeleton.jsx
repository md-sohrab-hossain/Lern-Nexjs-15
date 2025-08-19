const LoadingSkeleton = ({ count = 6, className = "" }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
        <div className="bg-gray-300 h-4 rounded mb-2"></div>
        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
