import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { BadRequestError } from "../errors/custom.errors";
import { User } from "../models";

const withValidationErrors = (validateValues: ValidationChain[]) => {
  return [
    validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        throw new BadRequestError(errorMessages.join(","));
      }
      next();
    },
  ];
};
