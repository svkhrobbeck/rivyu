import { Request, Response } from "express";
import { User } from "../models";
import { StatusCodes } from "http-status-codes";
import { passwordUtil, tokenUtil } from "../utils";
import { UnauthenticatedError } from "../errors/custom.errors";

const register = async (req: Request, res: Response) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  const hashedPassword = await passwordUtil.hash(req.body.password);
  req.body.password = hashedPassword;

  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  const payload = { userId: user?._id, role: user?.role };

  const isValidUser =
    user && (await passwordUtil.compare(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const access_token = tokenUtil.generate(payload);
  res.status(StatusCodes.OK).json({ access_token });
};

export default { register, login };
