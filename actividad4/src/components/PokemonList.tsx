"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonItem from "./PokemonItem";

interface Pokemon {
  name: string;
  url: string;
}

export default function PokemonList() {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => {
        setPokemones(response.data.results);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al cargar los pokemones.");
        setCargando(false);
      });
  }, []);

  if (cargando) return <p style={{ color: "#fff" }}>Cargando pokemones...</p>;
  if (error) return <p style={{ color: "#d32f2f" }}>{error}</p>;

  return (
    <div>
      <h2 style={{ color: "#fff", marginBottom: "24px" }}>Listado de Pokemones</h2>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        {pokemones.map((p) => (
          <PokemonItem key={p.name} name={p.name} url={p.url} />
        ))}
      </div>
    </div>
  );
}