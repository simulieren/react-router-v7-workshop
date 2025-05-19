import { Link, useParams } from "react-router";
import { images } from "./image-gallery";

export default function ImageDetailRoute() {
  const { id } = useParams();
  const imageIndex = Number(id);
  const image = images[imageIndex];

  if (!image) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Image not found</h1>
        <Link 
          to="/image-gallery" 
          viewTransition
          className="text-blue-500 hover:text-blue-700"
        >
          Back to gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link 
        to="/image-gallery" 
        viewTransition
        className="inline-block mb-8 text-blue-500 hover:text-blue-700"
      >
        ← Back to gallery
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <h1 
          className="text-3xl font-bold mb-6"
          style={{
            viewTransitionName: `title-${imageIndex}`
          }}
        >
          Image {imageIndex + 1}
        </h1>
        
        <div className="rounded-lg overflow-hidden shadow-xl">
          <img
            src={image}
            alt={`Image ${imageIndex + 1}`}
            className="w-full"
            style={{
              viewTransitionName: `image-${imageIndex}`
            }}
          />
        </div>
      </div>
    </div>
  );
} 