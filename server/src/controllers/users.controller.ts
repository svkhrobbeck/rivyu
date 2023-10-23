import { Request, Response } from "express";
import { User } from "../models";
import { StatusCodes } from "http-status-codes";
import { passwordUtil, tokenUtil } from "../utils";

export const register = async (req: Request, res: Response) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  const hashedPassword = await passwordUtil.hash(req.body.password);
  req.body.password = hashedPassword;

  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  const payload = { userId: user?._id, role: user?.role };

  const access_token = tokenUtil.generate(payload);
  res.status(StatusCodes.OK).json({ access_token });
};
