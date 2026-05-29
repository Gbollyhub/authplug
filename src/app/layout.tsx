import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AuthPlug",
  description: "Secure multi-tenant authentication and authorization platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo2.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-exo2)]`}>
        {children}
      </body>
    </html>
  );
}
