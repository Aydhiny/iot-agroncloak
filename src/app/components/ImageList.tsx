import React, { useEffect, useState } from 'react';
import { getImages } from '../services/imageService';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import ImageCard from './ImageCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface Image {
  id: number;
  imageData: string;
  capturedAt: string | null;
}

const ImageList: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [imageDetections, setImageDetections] = useState<{ [key: number]: any[] }>({});
  const [filter, setFilter] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [stats, setStats] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getImages();
        setImages(data.reverse());
      } catch (err) {
        setError('Error loading images');
      }
    };

    const loadModel = async () => {
      await tf.ready();
      const cocoModel = await cocoSsd.load();
      setModel(cocoModel);
    };

    fetchImages();
    loadModel();
  }, []);

  useEffect(() => {
    if (model && images.length > 0) {
      detectObjectsForAllImages();
    }
  }, [model, images]);

  const detectObjectsForAllImages = async () => {
    let objectStats: { [key: string]: number } = {};
    const detections: { [key: number]: any[] } = {};

    for (const image of images) {
      const detectedObjects = await detectObjects(image.imageData);
      detections[image.id] = detectedObjects;
      detectedObjects.forEach((obj) => {
        objectStats[obj.class] = (objectStats[obj.class] || 0) + 1;
      });
    }

    setImageDetections(detections);
    setStats(objectStats);
    setCategories(Object.keys(objectStats));
  };

  const detectObjects = async (imageData: string) => {
    if (!model) return [];

    const imgElement = document.createElement('img');
    imgElement.src = imageData;
    await new Promise((resolve) => (imgElement.onload = resolve));

    const imageTensor = tf.browser.fromPixels(imgElement);
    const predictions = await model.detect(imageTensor);
    return predictions;
  };

  const categoryData = Object.keys(stats).map((key) => ({
    name: key,
    count: stats[key],
  }));

const imageTimeData = Object.entries(
  images.reduce((acc, image) => {
    const date = new Date(image.capturedAt || '').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number })
).map(([date, count]) => ({ date, count }));


  const totalDetections = Object.values(stats).reduce((a, b) => a + b, 0);
  const isCropHealthy = totalDetections < 5 ? 'Healthy' : 'Not OK';

  return (
    <div className="max-w-7xl mx-auto py-6 bg-gradient-to-r border border-gray-300 from-gray-50 to-gray-200 shadow-xl">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Image Gallery</h1>
      
      <div className="flex bg-gray-400 border-y border-black border-opacity-15 p-4 justify-between items-center mb-6">
        <span className="text-lg font-semibold">Total Images: {images.length}</span>
        <span className={`px-4 py-2 rounded-full text-white ${isCropHealthy === 'Healthy' ? 'bg-lime-400' : 'bg-lime-900'}`}>Crop Health: {isCropHealthy}</span>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-lime-600 text-white rounded-full">Refresh</button>
      </div>

      <div className="mb-6 flex justify-center space-x-4">
        <button onClick={() => setFilter('all')} className="px-4 py-2 rounded-full border border-black border-opacity-15 font-bold bg-gray-300">All</button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full border border-black border-opacity-15 ${filter === category ? 'bg-lime-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {category}
          </button>
        ))}
      </div>
{/* crna zuta crvena */}
      <div className="mt-10 p-4 flex justify-center gap-10">
        <div className="w-full md:w-1/2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-1/2 h-80">
         <ResponsiveContainer width="100%" height="100%">
  <LineChart data={imageTimeData}>
    <XAxis dataKey="date" />
    <YAxis allowDecimals={false} />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="count" stroke="#82ca9d" />
  </LineChart>
</ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 gap-6 mt-6">
        {images.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-500">No images found.</p>
        ) : (
          images.map((image) => 
            (filter === 'all' || imageDetections[image.id]?.some((detection) => detection.class === filter)) && (
              <ImageCard key={image.id} image={image} detections={imageDetections[image.id]} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default ImageList;