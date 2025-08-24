"use client";

import { useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addInterestedEvent } from "@/actions";

const ActionButtons = ({ eventId, interestedUserIds, fromDetails }) => {
  // Get auth state from Redux store (existing pattern)
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();

  // Check if current user is interested
  const isInterested = interestedUserIds?.find((id) => id === user?.id);

  const [interested, setInterested] = useState(isInterested);
  const [isPending, startTransition] = useTransition();

  const toggleInterest = async () => {
    if (isAuthenticated && user) {
      startTransition(async () => {
        try {
          await addInterestedEvent(eventId, user.id);
          setInterested(!interested);
        } catch (error) {
          console.error("Interest toggle error:", error);
        }
      });
    } else {
      router.push("/login");
    }
  };

  const markGoing = () => {
    if (isAuthenticated && user) {
      router.push("/payment");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        onClick={toggleInterest}
        disabled={isPending}
        className={`w-full py-2 px-2 rounded-md text-white transition-colors disabled:opacity-50 ${
          interested
            ? "bg-indigo-600 hover:bg-indigo-800"
            : "bg-gray-600 hover:bg-gray-700"
        }`}
      >
        {isPending ? "Loading..." : "Interested"}
      </button>
      <button
        onClick={markGoing}
        className="text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1 text-white"
      >
        Going
      </button>
    </div>
  );
};

export default ActionButtons;
