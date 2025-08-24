"use client";

import { useState, useTransition, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addInterestedEvent } from "@/actions";

const ActionButtons = ({
  eventId,
  interestedUserIds,
  goingUserIds,
  fromDetails,
}) => {
  // Get auth state from Redux store (existing pattern)
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();
  
  // Hydration check to prevent server-client mismatch
  const [isHydrated, setIsHydrated] = useState(false);

  // Check if current user is interested or going from props
  // Robust ID comparison for MongoDB ObjectIds - only if user is loaded
  const isInterestedFromProps = user?.id ? interestedUserIds?.find((id) => 
    id === user?.id || id?.toString() === user?.id?.toString()
  ) : false;
  
  const isGoingFromProps = user?.id ? goingUserIds?.find((id) => 
    id === user?.id || id?.toString() === user?.id?.toString()
  ) : false;
  
  // Maintain local state for UI consistency
  const [interested, setInterested] = useState(isInterestedFromProps);
  const [isGoing, setIsGoing] = useState(isGoingFromProps);
  const [isPending, startTransition] = useTransition();

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Update state when props change (after revalidation)
  useEffect(() => {
    setInterested(isInterestedFromProps);
  }, [isInterestedFromProps]);
  
  // Update going state from props - critical for refresh persistence  
  useEffect(() => {
    if (user?.id) { // Only update if user is loaded
      setIsGoing(isGoingFromProps);
    }
  }, [isGoingFromProps, user?.id]); // Removed isGoing from deps to prevent infinite loop

  const toggleInterest = async () => {
    if (isAuthenticated && user) {
      startTransition(async () => {
        try {
          await addInterestedEvent(eventId, user.id);
          setInterested(!interested);
        } catch (error) {
          // Handle error silently
        }
      });
    } else {
      router.push("/login");
    }
  };

  const markGoing = () => {
    if (isAuthenticated && user) {
      router.push(`/payment/${eventId}`);
    } else {
      router.push("/login");
    }
  };

  // Use hydrated state to prevent server-client mismatch
  const showInterested = isHydrated ? interested : false;
  const showGoing = isHydrated ? isGoing : false;

  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        onClick={toggleInterest}
        disabled={isPending}
        className={`w-full py-2 px-2 rounded-md text-white transition-colors disabled:opacity-50 ${
          showInterested
            ? "bg-indigo-600 hover:bg-indigo-800"
            : "bg-gray-600 hover:bg-gray-700"
        }`}
      >
        {isPending ? "Loading..." : "Interested"}
      </button>
      <button
        disabled={isAuthenticated && !!showGoing}
        onClick={markGoing}
        className={`text-center w-full py-2 px-2 rounded-md border shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          !!showGoing
            ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
            : "bg-[#464849] hover:bg-[#3C3D3D] text-white border-[#5F5F5F]/50"
        }`}
      >
        {!!showGoing ? "Going ✓" : "Going"}
      </button>
    </div>
  );
};

export default ActionButtons;
