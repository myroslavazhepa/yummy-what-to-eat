import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowLeft, Clock, Sparkles, Shuffle } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { FavoriteButton } from "@/components/favorite-button";
import { DISHES } from "@/lib/dishes";
import { useProfile, getDishViolations } from "@/lib/profile";

export const Route = createFileRoute("/surprise")({
  component: SurprisePage,
  head: () => ({
    meta: [
      { title: "Здивуй мене — каталог популярних страв світу" },
      {
        name: "description",
        content: "Велика добірка популярних страв з рецептами. Натисни — і застосунок підкаже, що приготувати сьогодні.",
      },
    ],
  }),
});

function SurprisePage() {
  const { profile } = useProfile();

  const list = useMemo(() => {
    // Stable shuffle — keep dishes that don't conflict with profile first
    const arr = [...DISHES];
    arr.sort((a, b) => a.title.localeCompare(b.title, "uk"));
    return arr.map((d) => ({
      dish: d,
      conflicts: getDishViolations(d.ingredients, profile).length,
    }));
  }, [profile]);

  const safe = list.filter((x) => x.conflicts === 0);
  const flagged = list.filter((x) => x.conflicts > 0);

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
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Здивуй мене
              </p>
              <h1 className="text-xl font-semibold tracking-tight">Популярні у світі</h1>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
              <Sparkles className="size-3" strokeWidth={2} />
              {list.length}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 pb-32 pt-4">
          <Link
            to="/dish/$id"
            params={{ id: safe[Math.floor(Date.now() / 1000) % Math.max(1, safe.length)]?.dish.id ?? list[0].dish.id }}
            className="mb-5 flex items-center justify-between gap-3 rounded-2xl bg-foreground p-4 text-background"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">
                Випадково
              </p>
              <p className="text-base font-semibold">Здивуй мене зараз</p>
            </div>
            <span className="grid size-10 place-items-center rounded-full bg-background/15">
              <Shuffle className="size-5" strokeWidth={1.75} />
            </span>
          </Link>

          <Section title="Підходить вам" items={safe} />
          {flagged.length > 0 && (
            <Section title="Потребує заміни інгредієнтів" items={flagged} muted />
          )}
        </main>

        <BottomNav active="home" />
      </div>
    </div>
  );
}

function Section({
  title,
  items,
  muted,
}: {
  title: string;
  items: { dish: import("@/lib/dishes").Dish; conflicts: number }[];
  muted?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mb-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title} · {items.length}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {items.map(({ dish, conflicts }) => (
          <Link
            key={dish.id}
            to="/dish/$id"
            params={{ id: dish.id }}
            className={
              "overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/5 transition active:scale-[0.98] " +
              (muted ? "opacity-80" : "")
            }
          >
            <div className="relative aspect-square">
              <img src={dish.img} alt={dish.title} loading="lazy" className="h-full w-full object-cover" />
              <FavoriteButton id={dish.id} className="absolute right-2 top-2 size-7" />
              {conflicts > 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-destructive/90 px-2 py-0.5 text-[10px] font-semibold text-destructive-foreground">
                  {conflicts} замінник{conflicts === 1 ? "" : "и"}
                </span>
              )}
            </div>
            <div className="p-3">
              <h4 className="line-clamp-2 text-sm font-semibold leading-tight">{dish.title}</h4>
              <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="size-3" strokeWidth={2} />
                {dish.time}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
