import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Falk Pro sh.p.k | Produzione calzature conto terzi",
  description:
    "Falk Pro: montaggio e orlatura di calzature conto terzi a Krujë, Albania, per marchi europei.",
  metadataBase: new URL("https://falk-pro-site.vercel.app"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
