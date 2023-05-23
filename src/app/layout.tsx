import "@/styles/globals.css";
import "@/styles/colors.css";
import { Metadata } from "next";
import { TrackingHeadScript } from "@phntms/react-gtm";

import Footer from "@/components/Footer";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

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
        url: "/banner.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Into Gizz",
    creator: "@gloyens",
    images: ["/banner.png"],
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
      <head>
        <TrackingHeadScript id={GTM_ID} />
        <title>Get Into Gizz</title>
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
