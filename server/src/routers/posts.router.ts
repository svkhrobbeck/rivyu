import { Router } from "express";
import { createNewPost, getAllPosts } from "../controllers/posts.controller";

const router: Router = Router();

router.route("/").get(getAllPosts).post(createNewPost);

export default router;
