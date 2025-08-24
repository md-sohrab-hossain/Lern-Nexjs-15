import Header from "@/components/landing/Header";
import EventList from "@/components/landing/EventList";

export const metadata = {
  title: "Eventry - Discover Amazing Events",
  description: "Find and join exciting events in your area. From tech conferences to workshops, discover events that match your interests.",
  keywords: "events, conferences, workshops, tech events, networking, learning",
  openGraph: {
    title: "Eventry - Discover Amazing Events",
    description: "Find and join exciting events in your area. From tech conferences to workshops, discover events that match your interests.",
    type: "website",
    url: "https://eventry.com",
    images: [
      {
        url: "/google-io-2023-1.png",
        width: 1200,
        height: 630,
        alt: "Eventry - Event Discovery Platform",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventry - Discover Amazing Events",
    description: "Find and join exciting events in your area. From tech conferences to workshops, discover events that match your interests.",
    images: ["/google-io-2023-1.png"],
  },
};

export default function Home() {
  return (
    <section className="container">
      <Header />
      <EventList />
    </section>
  );
}
