import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

type ErrorType = Error & { statusCode: number };

const errorHandler = (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const messages = err.message.split(",") || [
    "something went wrong! try again later",
  ];
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({ messages });
  next();
};

const notFoundRouter = (req: Request, res: Response) =>
  res.status(401).json({ messages: ["invalid endpoint"] });

export default { errorHandler, notFoundRouter };
