import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Heart } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { FavoriteButton } from "@/components/favorite-button";
import { useFavorites } from "@/lib/favorites";
import { DISHES } from "@/lib/dishes";

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
  head: () => ({
    meta: [
      { title: "Улюблене — збережені страви" },
      { name: "description", content: "Ваші улюблені страви та рецепти в одному місці." },
    ],
  }),
});

function FavoritesPage() {
  const { favs } = useFavorites();
  const list = DISHES.filter((d) => favs.has(d.id));

  return (
    <div className="min-h-screen bg-secondary/40 text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[420px] flex-col bg-background shadow-2xl shadow-foreground/10 relative">
        <header className="sticky top-0 z-20 bg-background/90 px-6 pt-12 pb-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="grid size-10 place-items-center rounded-full bg-secondary ring-1 ring-foreground/5"
              aria-label="Назад"
            >
              <ArrowLeft className="size-5" strokeWidth={1.75} />
            </Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Колекція
              </p>
              <h1 className="text-xl font-semibold tracking-tight">Улюблене</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 pb-32 pt-4">
          {list.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-secondary/60 p-8 text-center ring-1 ring-foreground/5">
              <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-background ring-1 ring-foreground/5">
                <Heart className="size-5 text-primary" strokeWidth={1.75} />
              </div>
              <p className="font-medium">Тут поки що порожньо</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Натискайте сердечко на фото страви, щоб зберегти її сюди
              </p>
              <Link
                to="/search"
                className="mt-5 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                Перейти до пошуку
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {list.map((d) => (
                <Link
                  key={d.id}
                  to="/dish/$id"
                  params={{ id: d.id }}
                  className="block overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/5 transition active:scale-[0.99]"
                >
                  <div className="relative aspect-[16/10]">
                    <img
                      src={d.img}
                      alt={d.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <FavoriteButton id={d.id} className="absolute right-3 top-3" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold tracking-tight">{d.title}</h4>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" strokeWidth={2} />
                      {d.time} · {d.difficulty}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

        <BottomNav active="favorites" />
      </div>
    </div>
  );
}
