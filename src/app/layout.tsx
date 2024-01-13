import "../styles/globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "holomem randomizer",
  description: "Randomly select a hololive member",
  icons: {
    icon: "https://fmj.asrvd.me/🎲",
  },
  keywords: ["hololive", "random", "member", "picker", "vtuber"],
  openGraph: {
    title: "holomem randomizer",
    description: "Randomly select a hololive member",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#1498C7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className="bg-slate-800 text-white">{children}</body>
    </html>
  );
}
