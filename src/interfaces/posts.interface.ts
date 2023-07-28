export interface IPost {
  createdAt: number;
  lastEdited: number;
  id: string;
  title: string;
  description: string;
  shortDesc: string;
  tags: string[];
  type: string;
  image: string;
  videoId: string;
}
