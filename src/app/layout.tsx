import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Монументальное искусство Енисейской Сибири",
  description:
    "Проект нацелен на создание цифровой инфраструктуры для систематизации знаний о памятниках монументального искусства Енисейской Сибири",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`$antialiased font-nunito`}>{children}</body>
    </html>
  );
}
