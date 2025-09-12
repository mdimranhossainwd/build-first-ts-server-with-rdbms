import { Router } from "express";
import {
  assignCategoryToPost,
  createCategory,
  createComment,
  createPost,
  getAllCategory,
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
router.post("/create-category", createCategory);
router.post("/post-category", assignCategoryToPost);
router.get("/all-category", getAllCategory);
export default router;
