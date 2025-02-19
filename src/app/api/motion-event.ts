import { NextApiRequest, NextApiResponse } from "next";

let clients: NextApiResponse[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    clients.push(res);
    req.on("close", () => {
      clients = clients.filter((client) => client !== res);
    });
  } else if (req.method === "POST") {
    clients.forEach((client) => client.write("data: motion detected\n\n"));
    res.status(200).end();
  }
}
