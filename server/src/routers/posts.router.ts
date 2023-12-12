import { Router } from "express";
// initial

import { postsController } from "../controllers";
const { createNewPost, getAllPosts, getSinglePost, editPost, deletePost } =
  postsController;
import { auth, uploadMiddleware, validation } from "../middlewares";
const { postImage } = uploadMiddleware;

const router: Router = Router();
const fileSize = 1.2 * Math.pow(1024, 2);

router.get("/", getAllPosts);
router.post(
  "/",
  auth.authCheck,
  auth.checkIsAdmin,
  validation.createPost,
  postImage(fileSize),
  createNewPost
);
router
  .route("/:slug")
  .get(validation.valSlug, getSinglePost)
  .patch(
    auth.authCheck,
    auth.checkIsAdmin,
    validation.updatePost,
    validation.valSlug,
    editPost
  )
  .delete(auth.authCheck, auth.checkIsAdmin, validation.valSlug, deletePost);

export default router;
