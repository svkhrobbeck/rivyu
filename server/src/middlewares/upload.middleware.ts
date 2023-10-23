import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { v2 as cloudinary } from "cloudinary";
import { extname } from "path";
import { Post } from "../models";

const storage = multer.diskStorage({
  destination: "../../public/uploads",
  filename: (req, file, cb) => cb(null, file.originalname),
});

const checkImageTypes = (file: Express.Multer.File, cb: FileFilterCallback) => {
  const fileTypes = /jpg|jpeg|gif|webp|png/;

  const fileExtname = fileTypes.test(extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (fileExtname && mimetype) {
    cb(null, true);
  } else {
    const err = { message: "you can upload only image files" } as Error;
    cb(err);
  }
};

const postImage = (fileSize: number) => {
  const upload = multer({
    storage,
    limits: { fileSize },
    fileFilter: (req, file, cb) => checkImageTypes(file, cb),
  });

  return [
    upload.single("image"),
    async (req: Request, res: Response, next: NextFunction) => {
      const post = await Post.findOne({ slug: req.body.slug });

      if (req.file && post?.imagePublicId) {
        await cloudinary.uploader.destroy(post.imagePublicId);
      }

      if (req.file) {
        const response = await cloudinary.uploader.upload(req.file?.path);
        req.body.image = response.secure_url;
        req.body.imagePublicId = response.public_id;
      }

      next();
    },
  ];
};

export default { postImage };
