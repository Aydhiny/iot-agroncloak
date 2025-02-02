"use client";
import Image from "next/image";
import Agron from "../images/agron.svg";
import { motion } from "framer-motion";
import Link from "next/link";
import { Bug, Activity, ShieldCheck } from "lucide-react";

const backgroundImage = new URL("../images/background.png", import.meta.url);

export default function Header() {
  return (
    <div
      className="w-full h-screen cursor-default relative bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center flex-col z-20 px-4 sm:px-8">
        <motion.div
          className="text-center flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Catchy Slogan */}
          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-lg"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            Smart Pest Detection with <span className="text-lime-400">Agron-Cloak</span>
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            className="mt-4 h-1 w-2/3 sm:w-1/3 mx-auto bg-lime-400 rounded-full"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "66%" }}
            transition={{ delay: 0.7, duration: 1 }}
          />

          {/* Logo */}
          <motion.div
            className="flex justify-center m-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            <Image
              alt="agron"
              src={Agron}
              className="hover:animate-none transition-all duration-150 p-4"
              height={500}
              width={500}
            />
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            className="flex space-x-6 justify-center text-white text-lg font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            <div className="flex items-center space-x-2">
              <Bug className="text-lime-400 animate-bounce" />
              <span>Real-Time Detection</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="text-red-400 animate-pulse" />
              <span>Active Monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="text-blue-400 animate-spin-slow" />
              <span>Secure & Reliable</span>
            </div>
          </motion.div>

          {/* Button */}
          <Link
            className="bg-lime-400 hover:bg-lime-950 hover:text-white transition-all duration-200 text-center font-bold text-gray-700 text-2xl rounded-full mx-auto border border-green-300 px-6 py-4 mt-6"
            href="/dashboard"
          >
            Enter Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
