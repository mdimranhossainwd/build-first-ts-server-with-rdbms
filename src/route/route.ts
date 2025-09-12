import { Router } from "express";
import { createPost, getAllPosts, getUserByEmail } from "../seed";
const router = Router();

router.get("/all-users", getUserByEmail);
router.post("/posts", createPost);
router.get("/all-posts", getAllPosts);
export default router;
