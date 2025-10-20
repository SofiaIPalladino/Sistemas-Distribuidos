"use client";

import Link from "next/link";
import React from "react";

function extractId(url: string): string | null {
  const m = url.match(/\/pokemon\/(\d+)\/?$/);
  return m ? m[1] : null;
}

export default function PokemonCard({ name, url }: { name: string; url: string }) {
  const id = extractId(url);
  const img = id
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    : "/no-image.png";

  return (
    <Link className="pokemon-card" href={`/pokemon/${name.toLowerCase()}`}>
      <img className="pokemon-img" src={img} alt={name} />
      <div style={{ marginTop: 6, textTransform: "capitalize", fontWeight: 600 }}>{name}</div>
    </Link>
  );
}