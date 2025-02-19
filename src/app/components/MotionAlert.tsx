"use client";
import { useState, useEffect } from "react";

const MotionAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource("/api/motion-event");

    eventSource.onmessage = () => {
      setShowAlert(true);
      playSound();
      setTimeout(() => setShowAlert(false), 3000);
    };

    return () => eventSource.close();
  }, []);

  const playSound = () => {
    const audio = new Audio("/alert-sound.mp3"); 
    audio.play();
  };

  return showAlert ? (
    <div className="fixed top-5 right-5 bg-red-500 text-white p-4 rounded-lg shadow-lg">
      🚨 Motion Detected!
    </div>
  ) : null;
};

export default MotionAlert;
