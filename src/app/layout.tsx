import "../styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://holomem-randomizer.vercel.app"),
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
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
