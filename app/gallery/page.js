import Image from "next/image";
import Link from "next/link";
import photos from "./images";

export default function Gallery() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold my-4">
        Photos of a lost guy
      </h1>
      {/* Grid layout for photos - responsive 1 column on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {photos.map(({ id, src, name }) => (
          // Each photo is wrapped in a Link that navigates to /gallery/[id]
          // This navigation will be intercepted by the modal route
          <Link key={id} href={`/gallery/${id}`}>
            <Image
              alt={name}
              src={src}
              className="w-full object-cover aspect-square"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
