import { Righteous, Fira_Code } from "next/font/google";

export const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
});

export const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fira",
});