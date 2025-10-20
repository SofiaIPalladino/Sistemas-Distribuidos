import React from "react";
import Link from "next/link";
import { getPokemonByName, type PokemonDetail, type PokemonAbility, type PokemonStat } from "../../services/pokemon";
import { notFound } from "next/navigation";

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
  const name = String(params.name).toLowerCase();

  try {
    const pokemon = await getPokemonByName(name) as PokemonDetail;
    const sprite = pokemon.sprites?.front_default ?? null;
    const types: string[] = (pokemon.types ?? []).map((t) => t.type.name);

    const heightMeters = (pokemon.height ?? 0) / 10;
    const weightKg = (pokemon.weight ?? 0) / 10;

    const BAR_MAX = 255;

    return (
      <main style={{ padding: 20 }}>
        <Link href="/" className="back-link">← Volver</Link>

        <section style={{ display: "flex", gap: 18, alignItems: "flex-start", marginTop: 12 }}>
          <div>
            {sprite ? (
              <img src={sprite} alt={pokemon.name} width={160} height={160} />
            ) : (
              <div style={{ width: 160, height: 160, background: "#f3f4f6" }} />
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
                    <span key={`${t}-${i}`} style={{ marginRight: 8, textTransform: "capitalize", padding: "2px 8px", borderRadius: 12, background: "#eee" }}>
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
                    <li key={`${a.ability.name}-${a.is_hidden ? "hidden" : "visible"}`} style={{ textTransform: "capitalize" }}>
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

          {(!pokemon.stats || pokemon.stats.length === 0) && <p>No hay stats disponibles.</p>}

          <ul style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: 680 }}>
            {(pokemon.stats ?? []).map((s: PokemonStat) => {
              const nameLabel = prettyStatName(s.stat.name);
              const value = s.base_stat;
              const pct = Math.min(100, Math.round((value / BAR_MAX) * 100));

              return (
                <li key={s.stat.name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 110, fontWeight: 600, textTransform: "capitalize" }}>{nameLabel}</div>

                  <div style={{ flex: 1 }}>
                    <div style={{ background: "#e6e7ea", height: 12, borderRadius: 8, overflow: "hidden" }} aria-hidden>
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          background: "linear-gradient(90deg,#26a69a,#00695c)",
                          transition: "width .6s ease",
                        }}
                        role="progressbar"
                        aria-valuenow={value}
                        aria-valuemin={0}
                        aria-valuemax={BAR_MAX}
                        aria-label={`${nameLabel} ${value}`}
                      />
                    </div>
                  </div>

                  <div style={{ width: 48, textAlign: "right", fontWeight: 700 }}>{value}</div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    );
  } catch (err: any) {
    const status = err?.status ?? err?.response?.status;
    if (status === 404) notFound();
    return (
      <section>
        <Link href="/" className="back-link">← Volver</Link>
        <h2>No se encontró el Pokémon: {name}</h2>
        <p>HTTP: {status ?? "desconocido"}</p>
      </section>
    );
  }
}