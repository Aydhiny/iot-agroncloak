import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const buffer = Buffer.concat(chunks);
      const timestamp = Date.now();
      const filePath = path.join(process.cwd(), "public", "captures", `capture_${timestamp}.jpg`);

      fs.writeFileSync(filePath, buffer);
      res.status(200).json({ message: "Image saved!", imageUrl: `/captures/capture_${timestamp}.jpg` });
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
