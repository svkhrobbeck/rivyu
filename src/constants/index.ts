import { ILinks, ISidebarLinks, ITabs } from "../interfaces/constants.interface";

export const imageNotShown: string = "https://via.placeholder.com/320x180?text=Rasm+yuklanmadi";
export const youtubeThumb: string = "https://www.youtube-nocookie.com/embed/";
export const firebaseLink: string = "https://firebasestorage.googleapis.com/v0/b/kino-blog.appspot.com";
export const imageKitLink: string = "https://ik.imagekit.io/fj0u394lay/images-kinoblog";

export const links: ILinks[] = [
  { link: "https://tme.to/svkhrobbeck", imgPath: "/images/icon-telegram.svg", alt: "icon telegram" },
  { link: "https://www.facebook.com/svkhrobbeck", imgPath: "/images/icon-facebook.svg", alt: "icon facebook" },
  { link: "https://instagram.com/svkhrobbeck", imgPath: "/images/icon-instagram.svg", alt: "icon instagram" },
];

export const sidebarLinks: ISidebarLinks[] = [
  { name: "Bosh Sahifa", route: "/", image: "/images/icon-home.svg" },
  { name: "Maqolalar", route: "/reviews", image: "/images/icon-pencil.svg" },
  { name: "Yangiliklar", route: "/news", image: "/images/icon-news.svg" },
  { name: "Treylerlar", route: "/trailers", image: "/images/icon-videplay.svg" },
  { name: "Dastur haqida", route: "/about", image: "/images/icon-faq.svg" },
  { name: "Admin", route: "/admin", image: "/images/icon-admin.svg" },
];

export const aboutIcons: ILinks[] = [
  { imgPath: "/rivyu.svg", alt: "logo rivyu" },
  { imgPath: "/react.svg", alt: "logo react" },
  { imgPath: "/firebase.svg", alt: "logo firebase" },
];

export const tabs: ITabs[] = [
  { text: "Maqolalar", type: "reviews" },
  { text: "Yangiliklar", type: "news" },
  { text: "Treylerlar", type: "trailers" },
];
