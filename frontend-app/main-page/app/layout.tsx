import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahith | Software Engineer",
  description:
    "A bold personal portfolio for software engineering, AI/ML, agentic systems, computer vision, and fullstack products."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
