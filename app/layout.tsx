import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Innovation Strategies LLC | Practical Digital Systems",
  description:
    "Innovation Strategies LLC helps small businesses improve workflows, organize information, and adopt useful automation and AI-assisted tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
