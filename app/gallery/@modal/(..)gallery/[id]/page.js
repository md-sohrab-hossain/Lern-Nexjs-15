// This is the intercepting route that shows the photo in a modal
// The (..) in the path means "go up one segment" - intercepting /gallery/[id]
import Modal from "@/app/components/Modal";
import photos from "@/app/gallery/images";
import Image from "next/image";

export default function PhotoPage({ params }) {
  const { id } = params; // Get the photo ID from the URL
  const photo = photos.find((p) => p.id === id); // Find the photo data

  return (
    // Wrap the photo in our Modal component
    <Modal>
      {/* Container for the photo with responsive width */}
      <div className="w-1/2 mx-auto">
        <div>
          <h1 className="my-4 text-3xl font-bold text-center">{photo.name}</h1>
        </div>
        {/* Display the photo using Next.js Image component */}
        <Image
          alt={photo.name}
          src={photo.src}
          className="object-cover w-full aspect-square"
        />
      </div>
    </Modal>
  );
}
