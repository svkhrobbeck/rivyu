import { Request, Response } from "express";
import { User } from "../models";
import { StatusCodes } from "http-status-codes";
import { tokenUtil } from "../utils";

export const register = async (req: Request, res: Response) => {
  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};
