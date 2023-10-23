import { Router } from "express";
// initial
const router: Router = Router();
const fileSize = 1.2 * Math.pow(1024, 2);
// controllers
import { postsController } from "../controllers";
// middlewares
import { uploadMiddleware, validation } from "../middlewares";
// destructured
const { createNewPost, getAllPosts, getSinglePost } = postsController;
const { getPost, createPost } = validation;
const { postImage } = uploadMiddleware;
// routes
router.get("/", getAllPosts);
router.post("/", postImage(fileSize), createPost, createNewPost);
router.get("/:slug", getPost, getSinglePost);

export default router;
