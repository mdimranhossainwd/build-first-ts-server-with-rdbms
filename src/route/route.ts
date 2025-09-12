import { Router } from "express";
import { createPost, getUserByEmail } from "../seed";
const router = Router();

router.get("/all-users", getUserByEmail);
router.post("/posts", createPost);
export default router;
