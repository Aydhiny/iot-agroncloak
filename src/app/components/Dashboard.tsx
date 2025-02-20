"use client";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import Image from "next/image";
import Logo from "../../../public/logo-visual.svg";
import Link from "next/link";
import { Camera, BarChart2, Clock } from "lucide-react";
import { getImages } from "../services/imageService";
import ImageList from "./ImageList";

interface ImageData {
  id: number;
  imageUrl: string;
  capturedAt: string;
  pestPercentage: number;
}

const Dashboard = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [latestImage, setLatestImage] = useState<ImageData | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getImages();
        const imagesWithPests = data.map((image: any) => ({
          ...image,
          pestPercentage: Math.floor(Math.random() * 100), 
        }));
        setImages(imagesWithPests);
        setLatestImage(
          imagesWithPests.length ? imagesWithPests.reduce((a: any, b: any) => (new Date(a.capturedAt) > new Date(b.capturedAt) ? a : b)) : null
        );
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  const chartData = {
    labels: images.map((image) => new Date(image.capturedAt).toLocaleTimeString()),
    datasets: [
      {
        label: "Images Captured Over Time",
        data: images.map((_, index) => index + 1),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: images.map((image) => new Date(image.capturedAt).toLocaleTimeString()),
    datasets: [
      {
        label: "Pest Detection Percentage",
        data: images.map((image) => image.pestPercentage),
        backgroundColor: "#E53E3E",
        borderColor: "#C53030",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-gray-900 transition-colors duration-500">
      <header className="flex justify-between items-center py-4 px-6 bg-white border-b border-gray-300">
        <Link href="/" className="text-indigo-500 hover:text-indigo-700 font-bold">⬅ Back to Home</Link>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Image src={Logo} alt="Logo" width={50} height={50} className="cursor-pointer" />
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-300 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><BarChart2 size={20} /> Images Captured Over Time</h2>
          <Line data={chartData} />
        </div>

        <div className="bg-white border border-gray-300 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2"><Camera size={20} /> Pest Detection Percentage</h2>
          <Bar data={barChartData} />
        </div>

        {latestImage && (
          <div className="bg-white border border-gray-300 rounded-xl p-6 col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Clock size={20} /> Latest Captured Image</h2>
            <div className="flex flex-col items-center">
              <p className="mt-2 font-semibold">Captured At: {new Date(latestImage.capturedAt).toLocaleString()}</p>
              <p className="mt-1 text-red-600 font-bold">Pest Detection: {latestImage.pestPercentage}%</p>
            </div>
          </div>
        )}
      </main>
      <ImageList/>
    </div>
  );
};

export default Dashboard;
