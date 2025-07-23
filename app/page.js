// Import Link component for client-side navigation
import Link from "next/link";

// Home Page Component - This is the landing page (route: /)
export default function Home() {
  return (
    // Main container with centered content and full viewport height
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      {/* Navigation link to the gallery page */}
      {/* Using Link for client-side navigation without full page reload */}
      <Link href="/gallery" className="p-4 bg-green-400 rounded-md">
        Go to gallery
      </Link>
    </main>
  );
}
