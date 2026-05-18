import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Search as SearchIcon, X, Clock } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { FavoriteButton } from "@/components/favorite-button";
import { DISHES, SECTIONS, dishesBySection, type SectionId } from "@/lib/dishes";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";

const searchSchema = z.object({
  section: fallback(z.string().optional(), undefined),
});

export const Route = createFileRoute("/search")({
  component: SearchPage,
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Пошук страв — категорії та рецепти" },
      {
        name: "description",
        content: "Перегляньте популярні страви за категоріями: супи, салати, основні страви та десерти.",
      },
    ],
  }),
});

function SearchPage() {
  const { section } = Route.useSearch();
  const [query, setQuery] = useState("");

  const sectionData = section
    ? SECTIONS.find((s) => s.id === (section as SectionId))
    : undefined;

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = sectionData ? dishesBySection(sectionData.id) : DISHES;
    if (!q) return base;
    return base.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.ingredients.some((i) => i.toLowerCase().includes(q))
    );
  }, [query, sectionData]);

  return (
    <div className="min-h-screen bg-secondary/40 text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[420px] flex-col bg-background shadow-2xl shadow-foreground/10 relative">
        <header className="sticky top-0 z-20 bg-background/90 px-6 pt-12 pb-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            {sectionData ? (
              <Link
                to="/search"
                className="grid size-10 place-items-center rounded-full bg-secondary ring-1 ring-foreground/5"
                aria-label="Назад до категорій"
              >
                <ArrowLeft className="size-5" strokeWidth={1.75} />
              </Link>
            ) : (
              <Link
                to="/"
                className="grid size-10 place-items-center rounded-full bg-secondary ring-1 ring-foreground/5"
                aria-label="Назад"
              >
                <ArrowLeft className="size-5" strokeWidth={1.75} />
              </Link>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {sectionData ? sectionData.label : "Пошук"}
              </p>
              <h1 className="text-xl font-semibold tracking-tight">
                {sectionData ? `${sectionData.emoji} ${sectionData.label}` : "Що приготувати?"}
              </h1>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3 ring-1 ring-foreground/5 focus-within:ring-primary/40">
            <SearchIcon className="size-4 text-muted-foreground" strokeWidth={1.75} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={sectionData ? `Шукати в ${sectionData.label.toLowerCase()}...` : "Шукати страву або інгредієнт..."}
              className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Очистити">
                <X className="size-4 text-muted-foreground" strokeWidth={1.75} />
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-32">
          {!sectionData && !query ? (
            <section className="px-6 pt-4">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Категорії
              </p>
              <div className="grid grid-cols-2 gap-3">
                {SECTIONS.map((s) => {
                  const count = dishesBySection(s.id).length;
                  return (
                    <Link
                      key={s.id}
                      to="/search"
                      search={{ section: s.id }}
                      className="flex flex-col gap-2 rounded-2xl bg-secondary/60 p-4 ring-1 ring-foreground/5 transition active:scale-[0.98]"
                    >
                      <span className="text-3xl">{s.emoji}</span>
                      <div>
                        <h3 className="font-semibold tracking-tight">{s.label}</h3>
                        <p className="text-xs text-muted-foreground">{count} страв</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ) : (
            <section className="px-6 pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {list.length} {list.length === 1 ? "страва" : "страв"}
              </p>
              {list.length === 0 ? (
                <div className="rounded-2xl bg-secondary/60 p-6 text-center text-sm text-muted-foreground ring-1 ring-foreground/5">
                  Нічого не знайдено
                </div>
              ) : (
                <div className="space-y-3">
                  {list.map((d) => (
                    <article
                      key={d.id}
                      className="overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/5"
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
                        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                          {d.ingredients.join(" · ")}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>

        <BottomNav active="search" />
      </div>
    </div>
  );
}
