import React from "react";

interface ImageCardProps {
  image: {
    id: number;
    imageData: string;
    capturedAt: string | null;
  };
  detections: any[];
}

const ImageCard: React.FC<ImageCardProps> = ({ image, detections }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-200 hover:scale-105">
      <img
        src={image.imageData}
        alt={`Image ${image.id}`}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-800">
          Captured at:{" "}
          {image.capturedAt
            ? new Date(image.capturedAt).toLocaleString()
            : "Unknown"}
        </p>
        <p className="text-xl font-bold">
          Randomized value for image: {Math.floor(Math.random() * 1000)}
        </p>

        {/* Show detection results */}
        {detections && detections.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Detected Objects
            </h3>
            {detections.map((detection, idx) => (
              <div key={idx} className="text-gray-600 mt-2">
                <p className="font-semibold">{detection.class}:</p>
                <p className="text-sm">
                  Confidence: {Math.round(detection.score * 100)}%
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
