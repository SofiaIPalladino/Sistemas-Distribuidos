"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface PokemonItemProps {
  name: string;
  url: string;
}

export default function PokemonItem({ name, url }: PokemonItemProps) {
  const [usos, setUsos] = useState<number>(0);
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        const abilities = response.data.abilities.map(
          (item: any) => item.ability.name
        );
        setHabilidades(abilities);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al cargar habilidades.");
        setCargando(false);
      });
  }, [url]);

  return (
    <button
      type="button"
      onClick={() => setUsos(usos + 1)}
      style={{
        margin: "16px 0",
        padding: "16px",
        borderRadius: "12px",
        background: "#fff",
        color: "#222",
        boxShadow: "0 2px 8px #0002",
        minWidth: "260px",
        textAlign: "left",
        border: "none",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
      }}
    >
      <div style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "8px", textTransform: "capitalize" }}>
        {name}
      </div>
      <div style={{ fontSize: "0.95em", marginBottom: "6px", color: "#555" }}>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#1976d2" }}>
          {url}
        </a>
      </div>
      <div style={{ marginBottom: "6px", fontWeight: "bold" }}>Habilidades:</div>
      {cargando ? (
        <div style={{ color: "#888", fontSize: "0.95em" }}>Cargando habilidades...</div>
      ) : error ? (
        <div style={{ color: "#d32f2f", fontSize: "0.95em" }}>{error}</div>
      ) : habilidades.length ? (
        <ul style={{ paddingLeft: "18px", marginBottom: "8px" }}>
          {habilidades.map((hab) => (
            <li key={hab} style={{ textTransform: "capitalize", fontSize: "0.98em" }}>{hab}</li>
          ))}
        </ul>
      ) : (
        <div style={{ color: "#888", fontSize: "0.95em" }}>Sin habilidades</div>
      )}
      <div style={{ fontWeight: "bold", marginTop: "10px" }}>
        Veces usado: {usos}
      </div>
    </button>
  );
}