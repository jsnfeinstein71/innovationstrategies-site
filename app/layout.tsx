import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Innovation Strategies LLC | Governed SI Systems",
  description:
    "Innovation Strategies LLC builds governed Super Intelligence (SI) systems for private documents, business workflows, citations, audit logs, structured outputs, and human approval boundaries.",
  metadataBase: new URL("https://innovationstrategies.pro"),
  openGraph: {
    title: "Innovation Strategies LLC | Governed SI Systems",
    description:
      "Private SI assistants and workflow systems with citations, audit logs, role boundaries, structured outputs, and human approval controls.",
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
