import { Request, Response } from "express";
import { User } from "../models";
import { StatusCodes } from "http-status-codes";
import { tokenUtil } from "../utils";

export const register = async (req: Request, res: Response) => {
  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  const access_token = tokenUtil.generate({ userId: user?._id, role: user?.role });

  res.status(StatusCodes.OK).json({ access_token });
};
