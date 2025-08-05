import { getDictionary } from "./disctionaries";
import PhotoList from "@/components/PhotoList";

export default async function Home() {

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/photos`, { cache: "no-store" });
  const photos = await response.json();

  return (
    <PhotoList photos={photos} />
  );
}
