import { NextFunction, Request, Response } from "express";
import * as errs from "../errors/custom.errors";
import { tokenUtil } from "../utils";

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new errs.UnauthenticatedError("invalid authentication");
  }

  const [access, token] = (authorization || "").split(" ");

  if ((access !== "Token" && access !== "Bearer") || !token) {
    throw new errs.UnauthenticatedError("invalid authentication");
  }

  try {
    const { userId, role } = tokenUtil.verify(token);
    req.user = { userId, role };
    next();
  } catch (err) {
    throw new errs.UnauthenticatedError("invalid authentication");
  }
};

const checkIsAdmin = (req: Request, res: Response, next: NextFunction) => {
  const isAdmin = req.user.role === "admin";

  if (!isAdmin) {
    throw new errs.UnauthorizedError("not authorized to access this route");
  }
};

export default { authCheck, checkIsAdmin };
