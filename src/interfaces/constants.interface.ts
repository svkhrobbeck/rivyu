export interface ISidebarLinks {
  name: string;
  route: string;
  image: string;
}

export interface ITabs {
  text: string;
  category: "news" | "reviews" | "trailers";
}
