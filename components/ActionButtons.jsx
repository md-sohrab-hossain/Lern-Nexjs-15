'use client';

import Link from "next/link";

const ActionButtons = ({ fromDetails }) => {
  const handleInterestedClick = () => {
    // Add your interested logic here
    console.log('Interested clicked');
  };

  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button 
        onClick={handleInterestedClick}
        className="w-full bg-indigo-600 hover:bg-indigo-800 py-2 px-2 rounded-md text-white transition-colors"
      >
        Interested
      </button>
      <Link
        href="/payment"
        className="text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1 text-white"
      >
        Going
      </Link>
    </div>
  );
};

export default ActionButtons;
