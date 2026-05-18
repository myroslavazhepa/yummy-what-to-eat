import { useEffect, useState, useCallback } from "react";

const KEY = "favorites:v1";

function read(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

function write(set: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(Array.from(set)));
  window.dispatchEvent(new CustomEvent("favorites:changed"));
}

export function useFavorites() {
  const [favs, setFavs] = useState<Set<string>>(() => read());

  useEffect(() => {
    const sync = () => setFavs(read());
    window.addEventListener("favorites:changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("favorites:changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const next = new Set(read());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    write(next);
    setFavs(next);
  }, []);

  const has = useCallback((id: string) => favs.has(id), [favs]);

  return { favs, toggle, has };
}
