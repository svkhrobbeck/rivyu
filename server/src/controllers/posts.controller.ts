import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Post } from "../models";

const getAllPosts = async (req: Request, res: Response) => {
  const limit = +(req.query?.limit || 20);
  const page = +(req.query?.page || 1);

  const skip = (page - 1) * limit;
  const posts = await Post.find().skip(skip).limit(limit);

  const total_posts = await Post.countDocuments();
  const total_pages = Math.ceil(total_posts / limit);

  res.status(StatusCodes.OK).json({ posts, total_posts, page, total_pages });
};

const createNewPost = async (req: Request, res: Response) => {
  req.body.author = req.user.userId;
  const newPost = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({ post: newPost });
};

const getSinglePost = async (req: Request, res: Response) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.status(StatusCodes.OK).json({ post });
};

const editPost = async (req: Request, res: Response) => {
  const updatedPost = await Post.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true }
  );
  res.status(StatusCodes.OK).json({ post: updatedPost });
};

const deletePost = async (req: Request, res: Response) => {
  const deletedPost = await Post.findOneAndDelete({ slug: req.params.slug });
  res.status(StatusCodes.OK).json({ post: deletedPost });
};

export default {
  getAllPosts,
  createNewPost,
  getSinglePost,
  editPost,
  deletePost,
};
