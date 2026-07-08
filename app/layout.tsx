import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Innovation Strategies LLC | Governed AI Systems",
  description:
    "Innovation Strategies LLC builds governed AI systems for private documents, business workflows, citations, audit logs, structured outputs, and human approval boundaries.",
  metadataBase: new URL("https://innovationstrategies.pro"),
  openGraph: {
    title: "Innovation Strategies LLC | Governed AI Systems",
    description:
      "Private AI assistants and workflow systems with citations, audit logs, role boundaries, structured outputs, and human approval controls.",
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
