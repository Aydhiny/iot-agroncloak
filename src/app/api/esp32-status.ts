import { NextApiRequest, NextApiResponse } from "next";

let esp32Status = {
  isActive: false,
  cameraConnected: false,
  motionDetectionStatus: "Medium",
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(esp32Status);
  } else if (req.method === "POST") {
    const { isActive, cameraConnected, motionDetectionStatus } = req.body;
    esp32Status = { isActive, cameraConnected, motionDetectionStatus };
    res.status(200).json({ message: "Status updated!" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
