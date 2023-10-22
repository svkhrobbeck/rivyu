export interface IPost {
  createdAt: string;
  lastEdited: string;
  _id: string;
  title: string;
  desc: string;
  slug: string;
  tags: string[];
  category: string;
  image: string;
  videoId: string;
}

export interface IParams {
  category: string;
  page: number;
  limit: number;
}
