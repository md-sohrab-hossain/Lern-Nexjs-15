const PaymentFormSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {/* Name field */}
    <div>
      <div className="h-4 bg-gray-600 rounded w-16 mb-2"></div>
      <div className="h-10 bg-gray-600 rounded"></div>
    </div>
    
    {/* Email field */}
    <div>
      <div className="h-4 bg-gray-600 rounded w-16 mb-2"></div>
      <div className="h-10 bg-gray-600 rounded"></div>
    </div>
    
    {/* Card number field */}
    <div>
      <div className="h-4 bg-gray-600 rounded w-24 mb-2"></div>
      <div className="h-10 bg-gray-600 rounded"></div>
    </div>
    
    {/* Expiry date field */}
    <div>
      <div className="h-4 bg-gray-600 rounded w-20 mb-2"></div>
      <div className="h-10 bg-gray-600 rounded"></div>
    </div>
    
    {/* CVV field */}
    <div>
      <div className="h-4 bg-gray-600 rounded w-12 mb-2"></div>
      <div className="h-10 bg-gray-600 rounded"></div>
    </div>
    
    {/* Submit button */}
    <div className="h-10 bg-indigo-600/50 rounded mt-8"></div>
  </div>
);

export default PaymentFormSkeleton;
