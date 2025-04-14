import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";


const kanit = Barlow({
  variable: "--font-kanit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Secure Auth",
  description: "A Next.js app with secure authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
