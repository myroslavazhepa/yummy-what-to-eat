import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Search, Heart, User, Sparkles, LayoutGrid, Carrot, ChevronRight } from "lucide-react";
import featuredPasta from "@/assets/featured-pasta.jpg";
import mealPumpkin from "@/assets/meal-pumpkin.jpg";
import mealSalmon from "@/assets/meal-salmon.jpg";
import mealToast from "@/assets/meal-toast.jpg";

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

const categories = [
  { label: "Сніданок", active: true },
  { label: "Обід", active: false },
  { label: "Вечеря", active: false },
  { label: "Перекус", active: false },
  { label: "Десерт", active: false },
];

const ideas = [
  { title: "Гарбузовий крем-суп", meta: "35 хв · Середньо", img: mealPumpkin },
  { title: "Лосось з овочами", meta: "25 хв · Легко", img: mealSalmon },
  { title: "Авокадо тост з яйцем", meta: "10 хв · Легко", img: mealToast },
];

function Index() {
  return (
    <div className="min-h-screen bg-secondary/40 text-foreground selection:bg-primary/15">
      <div className="mx-auto flex min-h-screen max-w-[420px] flex-col bg-background shadow-2xl shadow-foreground/10 relative">
        {/* Header */}
        <header className="px-6 pt-12 pb-6">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Середа, 24 травня
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-balance">
                Привіт, Олено
              </h1>
            </div>
            <div className="grid size-11 place-items-center rounded-full bg-secondary ring-1 ring-foreground/5">
              <User className="size-5 text-muted-foreground" strokeWidth={1.75} />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-32">
          {/* Featured suggestion */}
          <section className="px-6 mb-8">
            <div className="group relative rounded-3xl bg-secondary p-1 ring-1 ring-foreground/5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
                <img
                  src={featuredPasta}
                  alt="Середземноморський салат з пастою"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="mb-3 inline-block rounded-md bg-background/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground backdrop-blur-sm">
                    Ідея дня
                  </span>
                  <h2 className="text-xl font-semibold leading-tight text-background text-balance">
                    Середземноморський салат з пастою
                  </h2>
                  <p className="mt-1 text-sm font-medium text-background/85">
                    20 хв · Легко · 4 порції
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick actions */}
          <section className="mb-8 grid grid-cols-3 gap-3 px-6">
            <button className="flex flex-col items-center gap-2 rounded-2xl bg-primary p-4 text-primary-foreground ring-1 ring-primary transition active:scale-95">
              <Sparkles className="size-5" strokeWidth={1.75} />
              <span className="text-[11px] font-medium">Здивуй</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-2xl bg-background p-4 text-muted-foreground ring-1 ring-foreground/5 transition hover:bg-secondary active:scale-95">
              <LayoutGrid className="size-5" strokeWidth={1.75} />
              <span className="text-[11px] font-medium">Каталог</span>
            </button>
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
              <button className="text-sm font-medium text-primary">Всі</button>
            </div>
            <div className="space-y-3">
              {ideas.map((m) => (
                <button
                  key={m.title}
                  className="flex w-full items-center gap-4 rounded-2xl bg-background p-3 text-left ring-1 ring-foreground/5 transition active:scale-[0.99]"
                >
                  <div className="size-20 shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={m.img}
                      alt={m.title}
                      loading="lazy"
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{m.title}</h4>
                    <p className="mt-0.5 text-sm text-muted-foreground">{m.meta}</p>
                  </div>
                  <ChevronRight className="size-5 text-muted-foreground" strokeWidth={1.75} />
                </button>
              ))}
            </div>
          </section>
        </main>

        {/* Bottom nav */}
        <nav className="sticky bottom-0 border-t border-foreground/5 bg-background/85 px-8 pb-8 pt-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <NavItem icon={Home} label="Головна" active />
            <NavItem icon={Search} label="Пошук" />
            <NavItem icon={Heart} label="Улюблене" />
            <NavItem icon={User} label="Профіль" />
          </div>
        </nav>
      </div>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: typeof Home;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={
        "flex flex-col items-center gap-1 " +
        (active ? "text-primary" : "text-muted-foreground/60 hover:text-muted-foreground")
      }
    >
      <Icon className="size-5" strokeWidth={1.75} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
