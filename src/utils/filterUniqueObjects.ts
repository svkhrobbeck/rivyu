import { IPost } from "../interfaces/posts.interface";

export const filterUniqueObjects = (arr: IPost[], key: keyof IPost) => {
  let seen = new Set();
  return arr.filter(obj => {
    let value = obj[key];
    if (!seen.has(value)) {
      seen.add(value);
      return true;
    }
    return false;
  });
};

export default filterUniqueObjects;
