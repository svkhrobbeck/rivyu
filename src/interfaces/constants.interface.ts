export interface ILinks {
  link?: string;
  imgPath: string;
  alt: string;
}

export interface ISidebarLinks {
  name: string;
  route: string;
  image: string;
}

export interface ITabs {
  text: string;
  type: "news" | "reviews" | "trailers";
}
