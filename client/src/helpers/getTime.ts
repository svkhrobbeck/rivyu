import getZero from "./getZero";

const getTime = (time: number | string): string => {
  const date = new Date(time);

  return `${getZero(date.getDate())}.${getZero(date.getMonth() + 1)}.${date.getFullYear()} / ${getZero(
    date.getHours()
  )}:${getZero(date.getMinutes())}`;
};

export default getTime;
