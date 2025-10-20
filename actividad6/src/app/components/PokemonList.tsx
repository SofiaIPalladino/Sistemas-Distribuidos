"use client";

import React, { useState } from "react";
import { usePokemons } from "../hooks/usePokemons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PokemonCard from "./PokemonCard";

export default function PokemonList() {
  const [limit, setLimit] = useState<number>(12);
  const offset = 0;
  const { data: items, isLoading, isFetching, isError } = usePokemons(limit, offset);

  if (isError) return <p style={{ color: "crimson" }}>Error al obtener la lista.</p>;

  const itemsList = items ?? [];

  return (
    <section>
      {isLoading ? (
        <div className="pokemon-grid" aria-busy="true">
          {Array.from({ length: limit }).map((_, i) => (
            <div className="pokemon-card" key={i}>
              <div style={{ width: 96, height: 96, margin: "0 auto 8px" }}>
                <Skeleton width={96} height={96} />
              </div>
              <div style={{ width: "70%", margin: "0 auto" }}>
                <Skeleton height={12} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="pokemon-grid" aria-live="polite">
            {itemsList.map((p) => (
              <PokemonCard key={p.name} name={p.name} url={p.url} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 18 }}>
            <button
              onClick={() => setLimit((l) => l + 12)}
              style={{
                padding: "8px 14px",
                borderRadius: 6,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Cargar más
            </button>
          </div>

          {isFetching && <p style={{ textAlign: "center", marginTop: 8 }}>Cargando...</p>}
        </>
      )}
    </section>
  );
}