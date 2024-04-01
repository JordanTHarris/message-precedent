import { Inter, Open_Sans } from "next/font/google";
import localFont from "next/font/local";

export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontOpenSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontGG = localFont({
  src: "./gg sans Medium.ttf",
  variable: "--font-sans",
});
