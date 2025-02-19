import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const capturesDir = path.join(process.cwd(), "public", "captures");
  if (!fs.existsSync(capturesDir)) {
    return res.status(200).json({ images: [] });
  }

  const files = fs.readdirSync(capturesDir);
  const imageUrls = files.map((file) => `/captures/${file}`);

  res.status(200).json({ images: imageUrls });
}
