// pages/api/read.ts
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// Define a type for the response data
type Data = {
  events: any[]; // You can replace `any` with a more specific type if needed
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Ensure we are using GET method
  if (req.method === "GET") {
    try {
      // Path to your JSON file
      const filePath = path.join(process.cwd(), "../data/data.json");
      // Read the file
      const jsonString = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(jsonString);

      // Send the data in response
      res.status(200).json(data);
    } catch (error) {
      // Handle errors like file not found or bad JSON
      res.status(500).json({ events: [] });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
