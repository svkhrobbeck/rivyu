import { ILinks, ISidebarLinks, ITabs } from "@interfaces/constants.interface";

export const imageNotShown = "https://via.placeholder.com/320x180?text=Rasm+yuklanmadi";
export const youtubeThumb = "https://www.youtube-nocookie.com/embed/";
export const firebaseLink = "https://firebasestorage.googleapis.com/v0/b/kino-blog.appspot.com";
export const imageKitLink = "https://ik.imagekit.io/fj0u394lay/images-kinoblog";

export const links: ILinks[] = [
  { link: "https://tme.to/svkhrobbeck", imgPath: "/images/icon-telegram.svg", alt: "telegram" },
  { link: "https://www.facebook.com/svkhrobbeck", imgPath: "/images/icon-facebook.svg", alt: "facebook" },
  { link: "https://instagram.com/svkhrobbeck", imgPath: "/images/icon-instagram.svg", alt: "instagram" },
];

export const sidebarLinks: ISidebarLinks[] = [
  { name: "Bosh Sahifa", route: "/", image: "/images/icon-home.svg" },
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
