import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { BadRequestError } from "../errors/custom.errors";
import { User } from "../models";

const withValidationErrors = (validateValues: ValidationChain[]) => {
  return [
    ...validateValues,
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

const register = withValidationErrors([
  body("email")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async email => {
      const user = await User.findOne({ email });
      if (user) throw new Error("email already exists");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be least 8 characters long"),
  body("firstName").notEmpty().withMessage("first name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
]);

const login = withValidationErrors([
  body("email")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async email => {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) throw new Error("email doesn't exist");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .custom(async password => {}),
]);

export default { register, login };
