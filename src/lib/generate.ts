import { times, aperture, split, join } from "ramda";
import decode from "./decode";

export const NBSP = decode("&nbsp;");

export const generate = (text: string, width: number) => {
  if (text.length < width) {
    console.error(`Max 'width' is ${text.length}`);
    width = text.length;
    console.log(`Set 'width' to: ${text.length}`);
  }

  const padding = times(() => NBSP, width - 1).join("");
  const x = `${padding}${text}${padding}`;
  const xs = aperture(width, split("", x)).map(join(""));

  return xs;
};

generate.step = <T>(xs: T[]) => {
  xs.push(xs.shift());
  return xs;
};
