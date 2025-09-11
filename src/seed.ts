import { Request, Response } from "express";
import { client } from "./prisma";

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await client.user.findMany({
      select: {
        email: true,
        name: true,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    throw new Error("Invalid Useremail");
  }
};
