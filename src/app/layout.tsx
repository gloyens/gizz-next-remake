import "@/styles/globals.css";
import "@/styles/colors.css";
import { Metadata } from "next";

import Footer from "@/components/Footer";

// TODO: metadata
export const metadata: Metadata = {
  title: {
    default: "Get Into Gizz",
    template: "%s | Get Into Gizz",
  },
  description: "Your guide to King Gizzard and the Lizard Wizard.",
  keywords: ["css", "component", "utility"],
  openGraph: {
    title: {
      default: "Get Into Gizz",
      template: "%s | Get Into Gizz",
    },
    description: "Your guide to King Gizzard and the Lizard Wizard.",
    url: "https://get-into-gizz.com",
    images: [
      {
        url: "/im-in-your-mind-fuzz.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Into Gizz",
    creator: "@gloyens",
    images: ["/im-in-your-mind-fuzz.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
