import { Router } from "express";
import {
  createComment,
  createPost,
  getAllPosts,
  getUserByEmail,
} from "../seed";
const router = Router();

router.get("/all-users", getUserByEmail);
router.post("/posts", createPost);
router.get("/all-posts", getAllPosts);
router.post("/create-comments", createComment);
export default router;
