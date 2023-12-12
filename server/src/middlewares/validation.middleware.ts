import { Request, Response, NextFunction } from "express";
import {
  body,
  param,
  ValidationChain,
  validationResult,
} from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/custom.errors";
import { Post, User } from "../models";

const withValidationErrors = (validateValues: ValidationChain[]) => {
  return [
    ...validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages: string[] = errors.array().map(err => err.msg);

        if (errorMessages[0].includes("not found")) {
          throw new NotFoundError(errorMessages.join(","));
        }
        throw new BadRequestError(errorMessages.join(","));
      }
      next();
    },
  ];
};

const register = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
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
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async email => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("email doesn't exist");
    }),
  body("password").trim().notEmpty().withMessage("password is required"),
]);

const createPost = withValidationErrors([
  body("title").trim().notEmpty().withMessage("title is required"),
  body("description").trim().notEmpty().withMessage("description is required"),
  body("slug")
    .trim()
    .notEmpty()
    .withMessage("slug is required")
    .custom(async slug => {
      const post = await Post.findOne({ slug });
      if (post) throw new Error("slug already exists");
    }),
]);

const updatePost = withValidationErrors([
  body("slug")
    .optional()
    .custom(async slug => {
      const post = await Post.findOne({ slug });
      if (post) throw new Error("slug already exists");
    }),
]);

const valSlug = withValidationErrors([
  param("slug")
    .isSlug()
    .withMessage("invalid slug")
    .custom(async slug => {
      const post = await Post.findOne({ slug });
      if (!post) throw new Error("post not found");
    }),
]);

export default { register, login, createPost, updatePost, valSlug };
