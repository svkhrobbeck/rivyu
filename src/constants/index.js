// imports
import getZero from "../utils/getZero";

// variables
export const imageNotShown = "https://via.placeholder.com/320x180?text=Rasm+yuklanmadi";

export const youtubeThumb = "https://www.youtube-nocookie.com/embed/";

export const links = [
  { link: "https://tme.to/svkhrobbeck", imgPath: "/images/icon-telegram.svg", alt: "icon telegram" },
  { link: "https://www.facebook.com/svkhrobbeck", imgPath: "/images/icon-facebook.svg", alt: "icon facebook" },
  { link: "https://instagram.com/svkhrobbeck", imgPath: "/images/icon-instagram.svg", alt: "icon instagram" },
];

export const sidebarLinks = [
  { name: "Bosh Sahifa", route: "/", image: "/images/icon-home.svg" },
  { name: "Maqolalar", route: "/reviews", image: "/images/icon-pencil.svg" },
  { name: "Yangiliklar", route: "/news", image: "/images/icon-news.svg" },
  { name: "Treylerlar", route: "/trailers", image: "/images/icon-videplay.svg" },
  { name: "Dastur haqida", route: "/about", image: "/images/icon-faq.svg" },
  { name: "Admin", route: "/admin", image: "/images/icon-admin.svg" },
];

export const aboutIcons = [
  { imgPath: "/react.svg", alt: "logo react" },
  { imgPath: "/vite.svg", alt: "logo vite" },
  { imgPath: "/firebase.svg", alt: "logo firebase" },
];

export const date = new Date();

export const createdAt = `${getZero(date.getDate())}.${getZero(date.getMonth() + 1)}.${date.getFullYear()} / ${getZero(
  date.getHours()
)}:${getZero(date.getMinutes())}`;

export const lastEdited = `${getZero(date.getDate())}.${getZero(date.getMonth() + 1)}.${date.getFullYear()} / ${getZero(
  date.getHours()
)}:${getZero(date.getMinutes())}`;

export const firebaseLink = "https://firebasestorage.googleapis.com/v0/b/kino-blog.appspot.com";

export const imageKitLink = "https://ik.imagekit.io/fj0u394lay/images-kinoblog";
