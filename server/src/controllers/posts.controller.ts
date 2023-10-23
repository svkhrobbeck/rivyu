import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Post } from "../models";

const getAllPosts = async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.status(StatusCodes.OK).json({ posts });
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

export default { getAllPosts, createNewPost, getSinglePost };
