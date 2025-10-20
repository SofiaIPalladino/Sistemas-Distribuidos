import "./globals.css";
import QueryProvider from "./QueryProvider";

export const metadata = {
  title: "Pokedex - Simple",
  description: "Listado simple de Pokémon",
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

        <QueryProvider>
          <main className="container">{children}</main>
        </QueryProvider>

        <footer className="footer">
          <div className="container">Texto de ejemplo para aprovechar y decir que el mejor pokemon es el Esmeralda</div>
        </footer>
      </body>
    </html>
  );
}