import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Post } from "../models";

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.status(StatusCodes.OK).json({ posts });
};

export const createNewPost = async (req: Request, res: Response) => {
  req.body.author = req.user.userId;
  const newPost = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({ post: newPost });
};
