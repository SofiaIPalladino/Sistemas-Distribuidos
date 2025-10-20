import { notFound } from "next/navigation";
import Link from "next/link";

type Params = { name: string };

type PokemonType = {
  type: { name: string };
};

type PokemonAbility = {
  ability: { name: string };
  is_hidden: boolean;
};

type PokemonSprites = {
  front_default?: string | null;
};

type PokemonDetail = {
  name: string;
  height: number;
  weight: number;
  sprites?: PokemonSprites;
  types?: PokemonType[];
  abilities?: PokemonAbility[];
};

async function fetchPokemon(name: string): Promise<PokemonDetail> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`);
  if (!res.ok) {
    const err: any = new Error("Fetch error");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export default async function Page({ params }: { params: Params }) {
  const name = String(params.name).toLowerCase();

  try {
    const pokemon = await fetchPokemon(name);
    const sprite = pokemon.sprites?.front_default ?? null;
    const types: string[] = (pokemon.types ?? []).map((t) => t.type.name);

    return (
      <section>
        <Link href="/" style={{ display: "inline-block", marginBottom: 12 }}>
          ← Volver
        </Link>

        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <div>
            {sprite ? (
              <img src={sprite} alt={pokemon.name} width={160} height={160} />
            ) : (
              <div style={{ width: 160, height: 160, background: "#f3f4f6" }} />
            )}
          </div>

          <div>
            <h1 style={{ textTransform: "capitalize" }}>{pokemon.name}</h1>
            <p>
              Altura: {pokemon.height} — Peso: {pokemon.weight}
            </p>
            <p>
              Tipos:{" "}
              {types.length > 0
                ? types.map((t, i) => (
                    <span key={`${t}-${i}`} style={{ marginRight: 8, textTransform: "capitalize" }}>
                      {t}
                    </span>
                  ))
                : "—"}
            </p>

            {pokemon.abilities && pokemon.abilities.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <strong>Habilidades:</strong>
                <ul>
                  {pokemon.abilities.map((a) => (
                    <li key={a.ability.name} style={{ textTransform: "capitalize" }}>
                      {a.ability.name} {a.is_hidden ? "(oculta)" : ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  } catch (err: any) {
    const status = err?.status ?? err?.response?.status;
    if (status === 404) notFound();

    return (
      <section>
        <Link href="/" style={{ display: "inline-block", marginBottom: 12 }}>
          ← Volver
        </Link>
        <h2>No se encontró el Pokémon: {name}</h2>
        <p>HTTP: {status ?? "desconocido"}</p>
      </section>
    );
  }
}