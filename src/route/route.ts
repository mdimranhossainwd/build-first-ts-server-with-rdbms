import { Router } from "express";
import {
  createComment,
  createPost,
  getAllPosts,
  getUserByEmail,
  getUserComment,
} from "../seed";
const router = Router();

router.get("/all-users", getUserByEmail);
router.post("/posts", createPost);
router.get("/all-posts", getAllPosts);
router.post("/create-comments", createComment);
router.get("/get-own-comments", getUserComment);
export default router;
