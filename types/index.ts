import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Meme = {
  id: number;
  title: string;
  imageUrl: string;
  likes: number;
  link: string;
};
