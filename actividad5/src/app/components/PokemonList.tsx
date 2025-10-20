"use client";

import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

type Item = { name: string; url: string };

export default function PokemonList() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("https://pokeapi.co/api/v2/pokemon?limit=30&offset=0")
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;
        setItems(data.results || []);
      })
      .catch(() => {
        if (!mounted) return;
        setError("No se pudo obtener la lista.");
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  if (!items) {
    return (
      <div className="pokemon-grid" aria-busy="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="pokemon-card" key={i}>
            <div className="skeleton skel-img" />
            <div className="skeleton skel-text" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="pokemon-grid" aria-live="polite">
      {items.map((p) => (
        <PokemonCard key={p.name} name={p.name} url={p.url} />
      ))}
    </section>
  );
}