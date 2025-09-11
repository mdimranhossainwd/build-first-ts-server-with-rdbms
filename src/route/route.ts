import { Router } from "express";
import { getUserByEmail } from "../seed";
const router = Router();

router.get("/all-users", getUserByEmail);
export default router;
