export const getImages = async () => {
  const response = await fetch('http://localhost:5055/api/images');

  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = await response.json();

  // Ensure each image has valid `capturedAt` and Base64 format
  return data.map((image: any) => ({
    id: image.id,
    imageData: `data:image/jpeg;base64,${image.imageData}`, // Ensure proper format for the image
    capturedAt: image.capturedAt ? new Date(image.capturedAt).toISOString() : null, // Handle missing or null dates
  }));
};
