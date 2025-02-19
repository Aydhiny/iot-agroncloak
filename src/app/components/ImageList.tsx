import React, { useEffect, useState } from 'react';
import { getImages } from '../services/imageService';

interface Image {
  id: number;
  imageData: string;
  capturedAt: string | null;  // Handle possible null value
}

const ImageList: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getImages();
        setImages(data);
      } catch (err) {
        setError('Error loading images');
      }
    };

    fetchImages();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Image Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-500">No images found.</p>
        ) : (
          images.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={image.imageData}  // Display the Base64 image
                alt={`Image ${image.id}`}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800">
                  Captured at:{' '}
                  {image.capturedAt ? new Date(image.capturedAt).toLocaleString() : 'Unknown'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageList;
