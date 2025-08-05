import PhotoCard from "./PhotoCard"

const PhotoList = ({photos}) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {
            photos.map(photo => (
                <PhotoCard key={photo.id} photo={photo} />
            ))
        }
    </div>
  )
}

export default PhotoList