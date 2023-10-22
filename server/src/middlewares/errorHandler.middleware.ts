import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

type ErrorType = Error & { statusCode: number };

const errorHandler = (err: ErrorType, req: Request, res: Response, next: NextFunction) => {
  const messages = err.message.split(",") || ["something went wrong! try again later"];
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({ messages });
  next();
};

export default errorHandler;
