import { Router } from "express";
import {
  createNewPost,
  getAllPosts,
  getSinglePost,
} from "../controllers/posts.controller";

const router: Router = Router();

router.route("/").get(getAllPosts).post(createNewPost);
router.route("/:slug").get(getSinglePost);

export default router;
