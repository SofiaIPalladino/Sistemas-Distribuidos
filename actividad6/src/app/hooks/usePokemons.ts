"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemonList, type PokemonListItem } from "../services/pokemon";

export function usePokemons(limit: number, offset = 0) {
  return useQuery<PokemonListItem[], Error>({
    queryKey: ["pokemons", limit, offset],
    queryFn: () => getPokemonList(limit, offset),
    staleTime: 1000 * 60,
  });
}