import { Link } from "react-router";

export const images = [
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200",
  "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1200",
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1200", 
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200",
  "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=1200",
  "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=1200",
];

export default function ImageGalleryRoute() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Image Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((src, idx) => (
          <Link
            key={src}
            to={`/image/${idx}`}
            viewTransition
            className="group block"
          >
            <div className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
              <img
                className="w-full h-48 object-cover"
                src={src}
                alt={`Image ${idx + 1}`}
                style={{
                  viewTransitionName: `image-${idx}`
                }}
              />
              <p 
                className="p-4 bg-white dark:bg-gray-800 text-center font-medium"
                style={{
                  viewTransitionName: `title-${idx}`
                }}
              >
                Image {idx + 1}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 