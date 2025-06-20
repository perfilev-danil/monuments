import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Монументальное искусство Енисейской Сибири",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`$antialiased font-nunito`}
        //style={{ fontFamily: "var(--font-nunito)" }}
      >
        {children}
      </body>
    </html>
  );
}
