import axios from "./ApiService";

const PostsService = {
  async getPosts(category: string) {
    const { data } = await axios.get("api/posts", {
      params: { category },
    });
    return data;
  },
  async getPost(slug: string) {
    const { data } = await axios.get(`api/posts/${slug}`);
    return data;
  },
};

export default PostsService;
