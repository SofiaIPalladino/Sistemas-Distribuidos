"use client";

import React, { useEffect, useState } from "react";
import type { PokemonStat } from "../services/pokemon";

type Props = { stats?: PokemonStat[] | null };

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

export default function PokemonStats({ stats }: Props) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // anima tras hidratación
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (!stats || stats.length === 0) {
    return <p>No hay stats disponibles.</p>;
  }

  const BAR_MAX = 255;

  return (
    <div className="pokemon-block">
      <h2 className="pokemon-block-title">Stats</h2>

      <div className="pokemon-stats" aria-live="polite">
        {stats.map((s) => {
          const nameLabel = prettyStatName(s.stat.name);
          const value = s.base_stat;
          const pct = Math.min(100, Math.round((value / BAR_MAX) * 100));

          return (
            <div className="pokemon-stat" key={s.stat.name}>
              <div className="pokemon-stat-name">{nameLabel}</div>

              <div className="pokemon-bar-wrap" aria-hidden>
                <div
                  className="pokemon-bar"
                  role="progressbar"
                  aria-valuenow={value}
                  aria-valuemin={0}
                  aria-valuemax={BAR_MAX}
                  aria-label={`${nameLabel} ${value}`}
                  style={{ width: animate ? `${pct}%` : "6px" }}
                />
              </div>

              <div className="pokemon-stat-val">{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}