import { useState, useEffect } from "react";

interface StatusCardProps {
  icon: React.ReactNode;
  label: string;
  status: string;
  color: string;
}

const StatusCard = ({ icon, label, status, color }: StatusCardProps) => {
  return (
    <div className={`p-4 rounded-lg border-l-4 border-${color}-500 bg-zinc-50 flex items-center gap-4`}>
      <div className={`text-${color}-500`}>{icon}</div>
      <div>
        <p className="font-semibold text-gray-800">{label}</p>
        <p className={`text-${color}-500 font-bold`}>{status}</p>
      </div>
    </div>
  );
};

export default StatusCard;
