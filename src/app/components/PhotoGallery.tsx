"use client";
import { useState, useEffect } from "react";

const PhotoGallery = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/list-images")
      .then((res) => res.json())
      .then((data) => setImages(data.images));
  }, []);

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">📸 Captured Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Capture ${index}`} className="rounded-lg shadow-lg" />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
