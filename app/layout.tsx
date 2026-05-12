import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Innovation Strategies LLC | Custom Software and AI Systems",
  description:
    "Innovation Strategies LLC designs and builds custom software, automation workflows, AI-assisted tools, and digital infrastructure for real-world operations.",
  metadataBase: new URL("https://innovationstrategies.pro"),
  openGraph: {
    title: "Innovation Strategies LLC | Custom Software and AI Systems",
    description:
      "Custom software, automation workflows, AI-assisted tools, and digital infrastructure for real-world operations.",
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
