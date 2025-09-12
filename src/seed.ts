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
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Failed to create post" });
  }
};

// Get all posts functions

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const data = await client.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error Fetching Get", error);
    return res.status(500).json({ error: "Failed to create post" });
  }
};

// Create Comments Data function
export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, postId, authorId } = req.body;

    // Basic validation
    if (!content || !postId || !authorId) {
      return res
        .status(400)
        .json({ error: "content, postId, and authorId are required" });
    }

    const comment = await client.comments.create({
      data: {
        content,
        postId: Number(postId),
        authorId: Number(authorId),
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    return res.status(201).json(comment);
  } catch (error) {
    console.log("Error Posting for Comments", error);
    res.status(500).json("Server Invaild");
  }
};

// Get by commnts only user for his own comments find by email

export const getUserComment = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    if (!email) {
      return res
        .status(400)
        .json({ error: "Email query parameter is required" });
    }

    const comments = await client.comments.findMany({
      where: {
        author: {
          email: {
            equals: email, // case-insensitive match
          },
        },
      },
      include: {
        author: { select: { id: true, email: true, name: true } },
        post: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    if (comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this user" });
    }

    return res.status(200).json(comments);
  } catch (error) {
    console.log("Error Fetching Get", error);
    return res.status(500).json({ error: "Failed to create post" });
  }
};

// Create Category function
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const category = await client.category.create({
      data: {
        name,
        description: description || null,
      },
    });

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error: any) {
    console.error("Error creating category:", error);

    if (error.code === "P2002") {
      // Prisma unique constraint error
      return res.status(400).json({ error: "Category name already exists" });
    }

    return res.status(500).json({ error: "Failed to create category" });
  }
};

// Assign category to a post
export const assignCategoryToPost = async (req: Request, res: Response) => {
  try {
    const { postId, categoryId } = req.body;

    // Validation
    if (!postId || !categoryId) {
      return res
        .status(400)
        .json({ error: "postId and categoryId are required" });
    }

    const postCategory = await client.postCategory.create({
      data: {
        postId: Number(postId),
        categoryId: Number(categoryId),
      },
      include: {
        post: { select: { id: true, title: true } },
        category: { select: { id: true, name: true } },
      },
    });

    return res.status(201).json({
      message: "Category assigned to post successfully",
      postCategory,
    });
  } catch (error: any) {
    console.error("Error assigning category:", error);

    if (error.code === "P2002") {
      // Prisma unique constraint violation (duplicate postId + categoryId)
      return res
        .status(400)
        .json({ error: "This post already has this category" });
    }

    return res.status(500).json({ error: "Failed to assign category to post" });
  }
};

// // ===============================

// GET ALL ENDPOINTS FUNCTION

// // ===============================

// Get all category function

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const result = await client.category.findMany();
    res.status(200).json(result);
  } catch (error) {
    console.log("Error Fetching Category Data", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};
