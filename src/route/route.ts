import { Router } from "express";
import {
  assignCategoryToPost,
  createCategory,
  createComment,
  createPost,
  deleteCategory,
  deleteComment,
  deletePost,
  deletePostCategory,
  deleteUser,
  getAllCategory,
  getAllPostcategories,
  getAllPosts,
  getAllUser,
  getUserByEmail,
  getUserComment,
  updateComment,
  updatePost,
  updateUser,
} from "../seed";
const router = Router();

router.get("/all-users", getUserByEmail);
router.post("/posts", createPost);
router.get("/all-posts", getAllPosts);
router.post("/create-comments", createComment);
router.get("/get-own-comments", getUserComment);
router.post("/create-category", createCategory);
router.post("/post-category", assignCategoryToPost);

// ALL GET ENDPOINTS

router.get("/all-category", getAllCategory);
router.get("/all-users-data", getAllUser);
router.get("/all-postcategory", getAllPostcategories);

// ALL DELETE ENDPOINTS

router.delete("/delete-user/:id", deleteUser);
router.delete("/delete-post/:id", deletePost);
router.delete("/delete-comments/:id", deleteComment);
router.delete("/delete-category/:id", deleteCategory);
router.delete("/post-category/:postId/:categoryId", deletePostCategory);

// ALL UPDATE ENDPOINTS
router.put("/update-user-info/:id", updateUser);
router.put("/update-comments/:id", updateComment);
router.put("/update-post-info/:id", updatePost);

export default router;
