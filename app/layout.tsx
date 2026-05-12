import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Innovation Strategies LLC | Practical Digital Systems",
  description:
    "Innovation Strategies LLC develops practical digital systems, automation workflows, and AI-assisted business tools for small business operations.",
  metadataBase: new URL("https://innovationstrategies.pro"),
  openGraph: {
    title: "Innovation Strategies LLC | Practical Digital Systems",
    description:
      "Practical digital systems, automation workflows, and AI-assisted business tools for small business operations.",
    url: "https://innovationstrategies.pro",
    siteName: "Innovation Strategies LLC",
    type: "website",
  },
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
