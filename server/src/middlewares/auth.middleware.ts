import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../errors/custom.errors";
import { tokenUtil } from "../utils";
import * as global from "../types";

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new UnauthenticatedError("invalid authentication");

  const [access, token] = (authorization || "").split(" ");

  if ((access !== "Token" && access !== "Bearer") || !token) {
    throw new UnauthenticatedError("invalid authentication");
  }

  try {
    const { userId, role } = tokenUtil.verify(token);
    req.user = { userId, role };
    next();
  } catch (err) {
    throw new UnauthenticatedError("invalid authentication");
  }
};
