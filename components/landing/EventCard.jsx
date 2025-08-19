"use client";

import Image from "next/image";
import Link from "next/link";
import ActionButtons from "../ActionButtons";

const EventCard = ({ event }) => {
  if (!event) {
    return null;
  }

  const {
    id,
    name = "Event Name",
    location = "Location",
    imageUrl = "/google-io-2023-1.png",
    interested_ids = [],
    going_ids = [],
  } = event;

  return (
    <div className="overflow-hidden rounded-md bg-[#242526]">
      <div className="relative w-full h-48 bg-gray-700">
        <Image
          src={imageUrl || "/google-io-2023-1.png"}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyatik+la40+lPHFe2ggknnrSn8IdBl7ixNIuJpd2Dlm25XDEA58p0g8FQl8JlQr5/GU9aeMQROGvr6/EPQAR7h4rqjQAL/2Q=="
        />
      </div>

      <div className="p-3">
        <Link
          href={`/details/${id}`}
          className="font-bold text-lg text-white hover:text-indigo-400 transition-colors"
        >
          {name}
        </Link>
        <p className="text-[#9C9C9C] text-sm mt-1">{location}</p>
        <div className="text-[#737373] text-sm mt-1">
          <span>{interested_ids?.length || 0} Interested</span>
          <span className="mx-2">|</span>
          <span>{going_ids?.length || 0} Going</span>
        </div>
        <ActionButtons />
      </div>
    </div>
  );
};

export default EventCard;
