import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Aeviti — Steady Health Intelligence",
  description:
    "Know your health. Not just your data. Aeviti turns core biomarker categories into a clear, steady plan you can actually act on.",
  openGraph: {
    title: "Aeviti — Steady Health Intelligence",
    description: "Know your health. Not just your data.",
    siteName: "Aeviti",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ivory antialiased">{children}</body>
    </html>
  );
}
