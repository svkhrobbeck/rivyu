import { Schema, Types, model } from "mongoose";
import { CATEGORY_TYPE } from "../utils/constants";

export interface IPost {
  title: string;
  description: string;
  image: string;
  slug: string;
  category: string;
  author: typeof Types.ObjectId;
}

const reqString = { type: String, required: true };

const PostSchema = new Schema<IPost>({
  title: reqString,
  description: reqString,
  author: Types.ObjectId,
  slug: { ...reqString, unique: true },
  category: {
    type: String,
    enum: Object.values(CATEGORY_TYPE),
    default: CATEGORY_TYPE.REVIEW,
  },
});

export default model("Post", PostSchema);
