import { Schema, model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

const reqString = { type: String, required: true };

const UserSchema = new Schema<IUser>({
  firstName: reqString,
  lastName: reqString,
  email: { ...reqString, unique: true },
  password: reqString,
  role: {
    type: String,
    default: "user",
  },
});

export default model<IUser>("User", UserSchema);
