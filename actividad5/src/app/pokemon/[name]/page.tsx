import React from "react";
import Link from "next/link";
import { getPokemonByName, type PokemonDetail, type PokemonAbility, type PokemonStat } from "../../services/pokemon";
import { notFound } from "next/navigation";
import PokemonStats from "../../components/PokemonStats";

type Params = { name: string };

function prettyStatName(statName: string) {
  switch (statName) {
    case "hp": return "HP";
    case "attack": return "Attack";
    case "defense": return "Defense";
    case "special-attack": return "Sp. Atk";
    case "special-defense": return "Sp. Def";
    case "speed": return "Speed";
    default: return statName;
  }
}

export default async function Page({ params }: { params: Params }) {
  const name = String(params.name ?? "").toLowerCase();

  try {
    const pokemon = (await getPokemonByName(name)) as PokemonDetail;
    const sprite = pokemon.sprites?.front_default ?? null;
    const types: string[] = (pokemon.types ?? []).map((t) => t.type.name);

    const heightMeters = (pokemon.height ?? 0) / 10;
    const weightKg = (pokemon.weight ?? 0) / 10;

    return (
      <main style={{ padding: 20 }}>
        <Link href="/" className="back-link">← Volver</Link>

        <section style={{ display: "flex", gap: 18, alignItems: "flex-start", marginTop: 12 }}>
          <div>
            {sprite ? (
              <img src={sprite} alt={pokemon.name} width={160} height={160} />
            ) : (
              <div style={{ width: 160, height: 160, background: "#f3f4f6", borderRadius: 8 }} />
            )}
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ textTransform: "capitalize", marginBottom: 6 }}>{pokemon.name}</h1>

            <p style={{ margin: "4px 0", color: "#444" }}>
              Altura: {heightMeters.toFixed(1)} m · Peso: {weightKg.toFixed(1)} kg
            </p>

            <p style={{ margin: "8px 0" }}>
              <strong>Tipos:</strong>{" "}
              {types.length > 0
                ? types.map((t, i) => (
                    <span
                      key={`${t}-${i}`}
                      style={{
                        marginRight: 8,
                        textTransform: "capitalize",
                        padding: "2px 8px",
                        borderRadius: 12,
                        background: "#eee",
                      }}
                    >
                      {t}
                    </span>
                  ))
                : "—"}
            </p>

            {(pokemon.abilities && pokemon.abilities.length > 0) && (
              <div style={{ marginTop: 8 }}>
                <strong>Habilidades:</strong>
                <ul>
                  {(pokemon.abilities ?? []).map((a: PokemonAbility) => (
                    <li
                      key={`${a.ability.name}-${a.is_hidden ? "hidden" : "visible"}`}
                      style={{ textTransform: "capitalize" }}
                    >
                      {a.ability.name} {a.is_hidden ? "(oculta)" : ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <section style={{ marginTop: 20 }}> 
          <h2 style={{ marginBottom: 8 }}>Stats</h2>
          <PokemonStats stats={(pokemon.stats ?? []) as PokemonStat[]} />
        </section>
      </main>
    );
  } catch (err: any) {
    const status = err?.status ?? err?.response?.status;
    if (status === 404) notFound();
    return (
      <main style={{ padding: 20 }}>
        <Link href="/" className="back-link">← Volver</Link>
        <h2>No se encontró el Pokémon: {name}</h2>
        <p>HTTP: {status ?? "desconocido"}</p>
      </main>
    );
  }
}
