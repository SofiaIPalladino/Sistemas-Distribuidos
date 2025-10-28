import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import ReactQueryProvider from "./QueryProvider";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Pokémon",
  description: "Listado y detalle de Pokémon",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ReactQueryProvider>
          {/* Header integrado directamente en el layout (no componente aparte) */}
           <header className="header">
          <div className="container">
            <h1 className="title">Poke·dex</h1>
          </div>
        </header>

          <main>{children}</main>

          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}