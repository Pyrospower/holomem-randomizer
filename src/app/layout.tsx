// import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "holomem randomizer",
  description: "Randomly select a hololive member",
  openGraph: {
    title: "holomem randomizer",
    description: "Randomly select a hololive member",
    type: "website",
    locale: "en_US",
  },
  keywords: ["hololive", "random", "member", "picker", "vtuber"],
  icons: {
    icon: "https://favmoji.asheeshh.ga/🎲",
  },
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
