"use client"; // This component needs to be client-side because it uses browser APIs
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export default function Modal({ children }) {
  // Refs for the modal overlay and wrapper elements
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  // When modal is dismissed, navigate back to the gallery
  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  // Handle clicks outside the modal content
  const onClick = useCallback(
    (e) => {
      // Only dismiss if clicking the overlay or wrapper (not the content)
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  // Handle ESC key press to dismiss modal
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  // Add and remove keyboard event listener
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    // Semi-transparent overlay that covers the entire screen
    <div
      ref={overlay}
      className="fixed top-0 bottom-0 left-0 right-0 z-10 p-10 mx-auto bg-black/60"
      onClick={onClick}
    >
      {/* Modal content container - centered on screen */}
      <div
        ref={wrapper}
        className="absolute p-6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5"
      >
        {children}
      </div>
    </div>
  );
}
