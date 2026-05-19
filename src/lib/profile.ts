import { useEffect, useState, useCallback } from "react";

export type Profile = {
  name: string;
  bio: string;
  avatar: string | null;
  forbidden: string[];
  allergies: string[];
  favorites: string[];
  shopping: string[];
};

export const PROFILE_KEY = "profile:v1";

export const emptyProfile: Profile = {
  name: "",
  bio: "",
  avatar: null,
  forbidden: [],
  allergies: [],
  favorites: [],
  shopping: [],
};

export function readProfile(): Profile {
  if (typeof window === "undefined") return emptyProfile;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return emptyProfile;
    return { ...emptyProfile, ...JSON.parse(raw) };
  } catch {
    return emptyProfile;
  }
}

export function writeProfile(p: Profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  window.dispatchEvent(new CustomEvent("profile:changed"));
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfile(readProfile());
    setLoaded(true);
    const sync = () => setProfile(readProfile());
    window.addEventListener("profile:changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("profile:changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((next: Profile | ((p: Profile) => Profile)) => {
    setProfile((prev) => {
      const value = typeof next === "function" ? (next as (p: Profile) => Profile)(prev) : next;
      writeProfile(value);
      return value;
    });
  }, []);

  return { profile, update, loaded };
}

/**
 * Returns the list of ingredients in a dish that conflict with the profile's
 * forbidden or allergy lists. Matching is case-insensitive substring matching
 * in both directions.
 */
export function getDishViolations(
  ingredients: string[],
  profile: Pick<Profile, "forbidden" | "allergies">
): { ingredient: string; reason: "forbidden" | "allergy" }[] {
  const out: { ingredient: string; reason: "forbidden" | "allergy" }[] = [];
  const norm = (s: string) => s.trim().toLowerCase();
  for (const ing of ingredients) {
    const a = norm(ing);
    const forbiddenHit = profile.forbidden.some((f) => {
      const b = norm(f);
      return b.length > 0 && (a.includes(b) || b.includes(a));
    });
    if (forbiddenHit) {
      out.push({ ingredient: ing, reason: "forbidden" });
      continue;
    }
    const allergyHit = profile.allergies.some((f) => {
      const b = norm(f);
      return b.length > 0 && (a.includes(b) || b.includes(a));
    });
    if (allergyHit) out.push({ ingredient: ing, reason: "allergy" });
  }
  return out;
}
