import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Shop Ease",
  description: "Store checkout system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
