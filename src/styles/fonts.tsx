import { Noto_Sans } from "next/font/google";
import { Dela_Gothic_One } from "next/font/google";

export const NOTO_SANS = Noto_Sans({
  variable: "--noto-sans",
  weight: ["400", "600"],
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

export const DELA = Dela_Gothic_One({
  variable: "--dela",
  weight: ["400"],
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

export const fontClasses = [NOTO_SANS.variable, DELA.variable].join(" ");

// Now import fontClasses into the layout, and add the class to the body
// (```<body className={fontClasses}>{children}</body>```).

// This will allow you to use ```var(--font-name)``` in CSS files.
