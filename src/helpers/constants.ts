import { ILinks, ISidebarLinks, ITabs } from "@interfaces/constants.interface";

export const baseApiUrl = "http://localhost:5000";
export const limit = 6;

export const imageNotShown = "https://via.placeholder.com/320x180?text=Rasm+yuklanmadi";
export const youtubeThumb = "https://www.youtube-nocookie.com/embed/";

export const links: ILinks[] = [
  { link: "https://tme.to/svkhrobbeck", imgPath: "/images/icon-telegram.svg", alt: "telegram" },
  { link: "https://www.facebook.com/svkhrobbeck", imgPath: "/images/icon-facebook.svg", alt: "facebook" },
  { link: "https://instagram.com/svkhrobbeck", imgPath: "/images/icon-instagram.svg", alt: "instagram" },
];

export const sidebarLinks: ISidebarLinks[] = [
  { name: "Bosh Sahifa", route: "/", image: "/images/icon-home.svg" },
  { name: "Admin", route: "/admin", image: "/images/icon-admin.svg" },
];

export const tabs: ITabs[] = [
  { text: "Maqolalar", category: "reviews" },
  { text: "Yangiliklar", category: "news" },
  { text: "Treylerlar", category: "trailers" },
];
