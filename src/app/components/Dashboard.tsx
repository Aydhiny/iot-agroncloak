"use client";
import { useState, useEffect } from "react";
import { getFirestore, collection, query, onSnapshot } from "firebase/firestore";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import Image from "next/image";
import Logo from "../../../public/logo-visual.svg";
import Link from "next/link";
import { Wifi, Camera, Bell, Activity, BarChart2, MapPin, Clock } from "lucide-react";

interface MotionEvent {
  id: string;
  timestamp: string;
  motionLevel: number;
  location: string;
}

const Dashboard = () => {
  const [motionData, setMotionData] = useState<MotionEvent[]>([]);

  const chartData = {
    labels: motionData.map((entry) => new Date(entry.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Motion Events",
        data: motionData.map((entry) => entry.motionLevel || 0),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        borderWidth: 2,
        pointBackgroundColor: "#4F46E5",
      },
    ],
  };

  const barChartData = {
    labels: motionData.map((entry) => entry.location),
    datasets: [
      {
        label: "Motion Events by Location",
        data: motionData.map((entry) => entry.motionLevel || 0),
        backgroundColor: "#4F46E5",
        borderColor: "#4338CA",
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

      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-300 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><BarChart2 size={20} /> Motion Detection Activity</h2>
          <Line data={chartData} />
        </div>

        <div className="bg-white border border-gray-300 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center gap-2"><MapPin size={20} /> Events by Location</h2>
          <Bar data={barChartData} />
        </div>

        <div className="bg-white border border-gray-300 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center gap-2"><Clock size={20} /> Recent Events</h2>
          <ul className="divide-y divide-gray-300">
            {motionData.slice(0, 5).map((event) => (
              <li key={event.id} className="py-2">
                <p><strong>Time:</strong> {new Date(event.timestamp).toLocaleString()}</p>
                <p><strong>Level:</strong> {event.motionLevel}</p>
                <p><strong>Location:</strong> {event.location}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-gray-300 col-span-1 md:col-span-3 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center gap-2"><Activity size={20} /> System Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatusCard icon={<Activity />} label="ESP32" status="Active" color="green" />
            <StatusCard icon={<Bell />} label="Buzzer" status="Operational" color="green" />
            <StatusCard icon={<Camera />} label="Camera" status="Connected" color="green" />
            <StatusCard icon={<Wifi />} label="Detection" status="Medium" color="yellow" />
          </div>
        </div>
      </main>
    </div>
  );
};

const StatusCard = ({ icon, label, status, color }: { icon: React.ReactNode; label: string; status: string; color: string }) => (
  <div className={`p-4 rounded-lg border-l-4 border-${color}-500 bg-zinc-50 flex items-center gap-4`}>
    <div className={`text-${color}-500`}>{icon}</div>
    <div>
      <p className="font-semibold text-gray-800">{label}</p>
      <p className={`text-${color}-500 font-bold`}>{status}</p>
    </div>
  </div>
);

export default Dashboard;