import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Instituto Mário Alves",
  description: "Biblioteca IMA",
  keywords: ['Reservar', 'Renovar', 'Cadastro', 'Login']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
