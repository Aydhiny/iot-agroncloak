"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/logo-visual.svg";
import Link from "next/link";
import ImageList from "./ImageList";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-300 w-full text-gray-900 transition-colors duration-500">
      <header className="flex justify-between items-center py-4 px-6 bg-white border-b border-gray-300">
        <Link href="/" className="text-indigo-500 hover:text-indigo-700 font-bold">
          ⬅ Back to Home
        </Link>
        <h1 className="text-3xl text-slate-600">Welcome to Dashboard - user</h1>
        <Image src={Logo} alt="Logo" width={50} height={50} className="cursor-pointer" />
      </header>
      <div className="p-8">
      <ImageList />
      </div>
    </div>
  );
};

export default Dashboard;