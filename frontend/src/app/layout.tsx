import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VELORA | An Extraordinary Dining Experience",
  description:
    "Discover a world where culinary artistry meets timeless elegance. Reserve your table at VELORA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#111111] text-[#F4EFE5] font-sans antialiased selection:bg-[#C6A66B] selection:text-[#111111] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}