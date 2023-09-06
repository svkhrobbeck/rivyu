import { ILinks, ISidebarLinks, ITabs } from "@interfaces/constants.interface";

export const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL;
export const limit = 9;
export const imageNotShown = "https://via.placeholder.com/1280x720?text=Rasm+yuklanmadi";
export const iframeEmbedLink = "https://www.youtube.com/embed/";
export const youtubeVideoBaseUrl = "https://youtu.be/";

export const videoIdRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|)([^"&?\/\s]{11})/gi;

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
