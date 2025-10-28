export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonType = { type: { name: string } };
export type PokemonAbility = { ability: { name: string }; is_hidden: boolean };
export type PokemonSprites = { front_default?: string | null };

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: { name: string };
};

export type PokemonDetail = {
  name: string;
  height: number; // decimeters
  weight: number; // hectograms
  sprites?: PokemonSprites;
  types?: PokemonType[];
  abilities?: PokemonAbility[];
  stats?: PokemonStat[];
};

type ApiError = Error & { status?: number };

export async function getPokemonList(limit = 30, offset = 0): Promise<PokemonListItem[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) {
    const e: ApiError = new Error(`Failed to fetch list (${res.status})`);
    e.status = res.status;
    throw e;
  }
  const data = await res.json();
  return (data.results ?? []) as PokemonListItem[];
}

/* Si quieres usar axios aquí, lo puedes hacer; con fetch también funciona. */
import axios from "axios";

export async function getPokemonByName(name: string): Promise<PokemonDetail> {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`);
    return res.data as PokemonDetail;
  } catch (err: any) {
    const status = err?.response?.status;
    const e: ApiError = new Error(`Failed to fetch pokemon "${name}"${status ? ` (${status})` : ""}`);
    e.status = status;
    throw e;
  }
}