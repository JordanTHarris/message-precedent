import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
