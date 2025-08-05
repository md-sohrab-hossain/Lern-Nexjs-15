import Link from "next/link";
import FallbackImage from "./FallbackImage";

const PhotoCard = ({ photo }) => {
    return (
        <Link href={`photos/${photo.id}`} className="group inline-block w-full mb-4 break-inside-avoid-column">
            <FallbackImage src={photo.url} alt={photo.title} width={700} height={700} className="w-full h-auto rounded" />

            <div className="title-container">
                <h4 className="title">{photo.title}</h4>
            </div>
        </Link>
    );
};

export default PhotoCard;
