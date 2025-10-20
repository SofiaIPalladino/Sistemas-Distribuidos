import "./globals.css";
import Footer from "./components/Footer";

export const metadata = {
  title: "Pokedex - Simple",
  description: "Listado de Pokémon",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="header">
          <div className="container">
            <h1 className="title">Poke·dex</h1>
          </div>
        </header>

        <main className="container">{children}</main>

        <Footer />
      </body>
    </html>
  );
}