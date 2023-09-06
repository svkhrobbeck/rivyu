import { IParams } from "@interfaces/posts.interface";
import axios from "./ApiService";

const PostsService = {
  async getPosts(params: IParams) {
    const { data } = await axios.get("api/posts", { params });
    return data;
  },
  async getPost(slug: string) {
    const { data } = await axios.get(`api/posts/${slug}`);
    return data;
  },
  async getLatestPost() {
    const { data } = await axios.get("api/posts/latest");
    return data;
  },
  async createPost(payload: FormData) {
    const { data } = await axios.post("api/posts", payload);
  },
};

export default PostsService;
