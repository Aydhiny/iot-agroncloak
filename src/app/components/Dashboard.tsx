"use client";
import { useState, useEffect } from "react";
import { getFirestore, collection, query, onSnapshot, DocumentData } from "firebase/firestore";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import Image from "next/image";
import Logo from "../../../public/logo-visual.svg";

// Define types for the motion data
interface MotionEvent {
  id: string;
  timestamp: string;
  motionLevel: number;
  location: string;
}

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false); // Set to false for light mode
  const [motionData, setMotionData] = useState<MotionEvent[]>([]);

  // Sample Firebase Data Fetch (Uncomment and use in real scenario)
  /*
  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "motionEvents"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMotionData(data);
    });

    return () => unsubscribe();
  }, []);
  */

  // Chart Data and Options
  const chartData = {
    labels: motionData.map((entry) => new Date(entry.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Motion Events",
        data: motionData.map((entry) => entry.motionLevel || 0),
        borderColor: darkMode ? "#6366F1" : "#4F46E5",
        backgroundColor: darkMode ? "rgba(99, 102, 241, 0.2)" : "rgba(79, 70, 229, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: darkMode ? "#6366F1" : "#4F46E5",
      },
    ],
  };

  const barChartData = {
    labels: motionData.map((entry) => entry.location),
    datasets: [
      {
        label: "Motion Events by Location",
        data: motionData.map((entry) => entry.motionLevel || 0), // Add data for the bars
        backgroundColor: "#4F46E5",
        borderColor: "#4F46E5",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-white to-zinc-100 text-gray-900" style={{ overflow: "hidden" }}>
      <header className="flex justify-between items-center py-2 px-4 from-zinc-800 to-zinc-700 bg-gradient-to-tr border-b-2 border-gray-200">
        <h1 className="text-zinc-300 p-4 border border-zinc-600 bg-zinc-700 text-2xl">Welcome to the Dashboard</h1>
        <Image alt="logo" className="p-4 cursor-pointer" src={Logo} width={100} height={100} />
      </header>

      <main className="p-6 h-full text-center justify-start items-start flex overflow-auto">
        <div className="bg-white h-fit w-full mr-4  rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Motion Detection Activity</h2>
          <Line data={chartData} />
        </div>

        <div className="bg-white mr-4  h-96 w-96 rounded-lg p-6 border border-gray-200 mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Motion Events by Location</h2>
          <Bar data={barChartData} />
        </div>

        <div className="flex flex-col w-96 h-96">
          <div className="bg-white mr-4  w-96 mb-4 rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Events</h2>
            <ul className="divide-y divide-gray-200">
              {motionData.slice(0, 5).map((event) => (
                <li key={event.id} className="py-4">
                  <p className="font-medium">
                    <span className="font-semibold">Time:</span> {new Date(event.timestamp).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Motion Level:</span> {event.motionLevel}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span> {event.location}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white  h-screen rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">System Status</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-gray-900">ESP32 Status:</p>
                <p className="text-green-500">Active</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Buzzer Status:</p>
                <p className="text-green-500">Operational</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Camera Status:</p>
                <p className="text-green-500">Connected</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Detection Threshold:</p>
                <p className="text-yellow-400">Medium</p>
              </div>

            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Dashboard;
