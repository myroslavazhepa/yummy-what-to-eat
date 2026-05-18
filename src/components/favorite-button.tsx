import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/favorites";

export function FavoriteButton({ id, className }: { id: string; className?: string }) {
  const { has, toggle } = useFavorites();
  const active = has(id);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-label={active ? "Прибрати з улюбленого" : "Додати в улюблене"}
      className={
        "grid size-9 place-items-center rounded-full bg-background/90 ring-1 ring-foreground/5 backdrop-blur transition active:scale-90 " +
        (className ?? "")
      }
    >
      <Heart
        className={
          "size-4 transition " +
          (active ? "fill-primary text-primary" : "text-foreground")
        }
        strokeWidth={1.75}
      />
    </button>
  );
}
