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

// Create Post Data functions

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId, published } = req.body;
    if (!title || !content || !authorId) {
      return res
        .status(400)
        .json({ error: "title, content, and authorId are required" });
    }
    const postData = await client.post.create({
      data: {
        title,
        content,
        authorId: Number(authorId),
        published: published ?? false,
      },
      include: {
        author: {
          select: { id: true, email: true, name: true },
        },
      },
    });
    return res.status(201).json(postData);
  } catch (error) {
    console.error("Error creating post:", error); // <-- show actual error
    return res.status(500).json({ error: "Failed to create post" });
  }
};
