import PokemonList from "../components/PokemonList";

export default function Page() {
  return (
    <main style={{ background: "#111", minHeight: "100vh", padding: "32px" }}>
      <h1 style={{ color: "#fff", marginBottom: "16px" }}>
        Actividad 4 - Pokemones con Hooks y ciclo de vida
      </h1>
      <PokemonList />
    </main>
  );
}