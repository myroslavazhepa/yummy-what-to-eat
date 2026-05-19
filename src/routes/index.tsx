import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Sparkles, LayoutGrid, Carrot, ChevronRight } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { FavoriteButton } from "@/components/favorite-button";
import { DISHES, dishById } from "@/lib/dishes";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Що ми їмо сьогодні — затишний помічник для смачних рішень" },
      {
        name: "description",
        content:
          "Сучасний мобільний застосунок, який підказує що приготувати сьогодні: ідея дня, рецепти за наявними продуктами та улюблені страви.",
      },
    ],
  }),
});

// Популярні страви світу для щоденної ротації "Ідея дня"
const WORLD_POPULAR_IDS = [
  "pasta-tomato",
  "caesar",
  "salmon-veg",
  "lasagna",
  "tiramisu",
  "greek",
  "pumpkin-soup",
  "borsch",
  "avocado-toast",
  "chicken-rice",
  "caprese",
  "mushroom-cream",
  "brownie",
  "pancakes",
];

const categories = [
  { label: "Сніданок", active: true },
  { label: "Обід", active: false },
  { label: "Вечеря", active: false },
  { label: "Перекус", active: false },
  { label: "Десерт", active: false },
];

function getDailyIdea() {
  const dayIndex = Math.floor(Date.now() / 86_400_000);
  const id = WORLD_POPULAR_IDS[dayIndex % WORLD_POPULAR_IDS.length];
  return dishById(id) ?? DISHES[0];
}

function Index() {
  const idea = getDailyIdea();
  const popular = DISHES.filter((d) => WORLD_POPULAR_IDS.includes(d.id) && d.id !== idea.id).slice(0, 3);
  const dateLabel = new Date().toLocaleDateString("uk-UA", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="min-h-screen bg-secondary/40 text-foreground selection:bg-primary/15">
      <div className="mx-auto flex min-h-screen max-w-[420px] flex-col bg-background shadow-2xl shadow-foreground/10 relative">
        {/* Header */}
        <header className="px-6 pt-12 pb-6">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {dateLabel}
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-balance">
                Що ми їмо сьогодні?
              </h1>
            </div>
            <Link
              to="/profile"
              className="grid size-11 place-items-center rounded-full bg-secondary ring-1 ring-foreground/5"
              aria-label="Профіль"
            >
              <User className="size-5 text-muted-foreground" strokeWidth={1.75} />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-32">
          {/* Featured suggestion — Idea of the Day */}
          <section className="px-6 mb-8">
            <Link
              to="/dish/$id"
              params={{ id: idea.id }}
              className="group relative block rounded-3xl bg-secondary p-1 ring-1 ring-foreground/5"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
                <img
                  src={idea.img}
                  alt={idea.title}
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition group-active:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <FavoriteButton id={idea.id} className="absolute right-3 top-3" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="mb-3 inline-block rounded-md bg-background/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground backdrop-blur-sm">
                    Ідея дня
                  </span>
                  <h2 className="text-xl font-semibold leading-tight text-background text-balance">
                    {idea.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-background/85">
                    {idea.time} · {idea.difficulty}
                  </p>
                </div>
              </div>
            </Link>
          </section>

          {/* Quick actions */}
          <section className="mb-8 grid grid-cols-3 gap-3 px-6">
            <Link
              to="/surprise"
              className="flex flex-col items-center gap-2 rounded-2xl bg-primary p-4 text-primary-foreground ring-1 ring-primary transition active:scale-95"
            >
              <Sparkles className="size-5" strokeWidth={1.75} />
              <span className="text-[11px] font-medium">Здивуй</span>
            </Link>
            <Link
              to="/search"
              className="flex flex-col items-center gap-2 rounded-2xl bg-background p-4 text-muted-foreground ring-1 ring-foreground/5 transition hover:bg-secondary active:scale-95"
            >
              <LayoutGrid className="size-5" strokeWidth={1.75} />
              <span className="text-[11px] font-medium">Каталог</span>
            </Link>
            <Link
              to="/pantry"
              className="flex flex-col items-center gap-2 rounded-2xl bg-background p-4 text-muted-foreground ring-1 ring-foreground/5 transition hover:bg-secondary active:scale-95"
            >
              <Carrot className="size-5" strokeWidth={1.75} />
              <span className="text-[11px] font-medium">З того що є</span>
            </Link>
          </section>

          {/* Categories */}
          <section className="mb-8">
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-6">
              {categories.map((c) => (
                <button
                  key={c.label}
                  className={
                    c.active
                      ? "shrink-0 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
                      : "shrink-0 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground ring-1 ring-foreground/5"
                  }
                >
                  {c.label}
                </button>
              ))}
            </div>
          </section>

          {/* Ideas list */}
          <section className="px-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight">Популярне зараз</h3>
              <Link to="/surprise" className="text-sm font-medium text-primary">Всі</Link>
            </div>
            <div className="space-y-3">
              {popular.map((m) => (
                <Link
                  key={m.id}
                  to="/dish/$id"
                  params={{ id: m.id }}
                  className="flex w-full items-center gap-4 rounded-2xl bg-background p-3 text-left ring-1 ring-foreground/5"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={m.img}
                      alt={m.title}
                      loading="lazy"
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                    <FavoriteButton id={m.id} className="absolute right-1 top-1 size-7" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{m.title}</h4>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {m.time} · {m.difficulty}
                    </p>
                  </div>
                  <ChevronRight className="size-5 text-muted-foreground" strokeWidth={1.75} />
                </Link>
              ))}
            </div>
          </section>
        </main>

        <BottomNav active="home" />
      </div>
    </div>
  );
}
