import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfólio — Windows 2000 Edition",
  description: "Meu portfólio pessoal com projetos, conquistas e experiência profissional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" style={{ height: "100%" }}>
      <body style={{ height: "100%", margin: 0 }}>{children}</body>
    </html>
  );
}
