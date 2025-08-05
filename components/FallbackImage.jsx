"use client";

import Image from "next/image";
import { useState } from "react";

const FallbackImage = ({ src, alt, fallback = "/next.svg", ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      unoptimized
    />
  );
};

export default FallbackImage;
