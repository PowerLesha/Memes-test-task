import { Meme } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { fakeMemes } from "../data";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Meme[]>
) {
  res.status(200).json(fakeMemes);
}
