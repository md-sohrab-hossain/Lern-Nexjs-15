const EmptyState = ({ 
  title = "No items found", 
  subtitle = "Check back later!",
  icon: Icon 
}) => {
  const DefaultIcon = () => (
    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        {Icon ? <Icon className="mx-auto h-12 w-12" /> : <DefaultIcon />}
      </div>
      <p className="text-gray-500 text-lg">{title}</p>
      <p className="text-sm text-gray-400 mt-2">{subtitle}</p>
    </div>
  );
};

export default EmptyState;
