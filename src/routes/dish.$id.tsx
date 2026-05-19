import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, AlertTriangle, ShieldAlert, Sparkles, Plus } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { FavoriteButton } from "@/components/favorite-button";
import { dishById } from "@/lib/dishes";
import { useProfile, getDishViolations } from "@/lib/profile";
import { findSubstitutes } from "@/lib/substitutes";

export const Route = createFileRoute("/dish/$id")({
  component: DishPage,
  head: ({ params }) => ({
    meta: [
      { title: `Рецепт — ${params.id}` },
      { name: "description", content: "Покроковий рецепт з адаптацією під ваші алергії та смаки." },
    ],
  }),
});

function DishPage() {
  const { id } = Route.useParams();
  const dish = dishById(id);
  const { profile, update } = useProfile();

  if (!dish) {
    return (
      <div className="min-h-screen bg-secondary/40 text-foreground">
        <div className="mx-auto flex min-h-screen max-w-[420px] flex-col bg-background p-6">
          <Link to="/search" className="text-sm text-primary">← До каталогу</Link>
          <p className="mt-10 text-center text-muted-foreground">Страву не знайдено</p>
        </div>
      </div>
    );
  }

  const violations = getDishViolations(dish.ingredients, profile);
  const addToShopping = (item: string) => {
    if (profile.shopping.includes(item)) return;
    update((p) => ({ ...p, shopping: [...p.shopping, item] }));
  };

  return (
    <div className="min-h-screen bg-secondary/40 text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[420px] flex-col bg-background shadow-2xl shadow-foreground/10 relative">
        <div className="relative">
          <img src={dish.img} alt={dish.title} className="aspect-[4/3] w-full object-cover" />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <Link
              to="/"
              className="grid size-10 place-items-center rounded-full bg-background/90 ring-1 ring-foreground/5 backdrop-blur"
              aria-label="Назад"
            >
              <ArrowLeft className="size-5" strokeWidth={1.75} />
            </Link>
            <FavoriteButton id={dish.id} />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto px-6 pb-32 pt-5">
          <h1 className="text-2xl font-semibold tracking-tight text-balance">{dish.title}</h1>
          <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="size-3.5" strokeWidth={2} />
            {dish.time} · {dish.difficulty}
          </p>

          {violations.length > 0 && (
            <section className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-center gap-2 text-destructive">
                <ShieldAlert className="size-4" strokeWidth={2} />
                <h3 className="text-sm font-semibold">Увага — є несумісні продукти</h3>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Ми знайшли альтернативи, якими можна замінити.
              </p>
              <ul className="mt-3 space-y-2">
                {violations.map((v) => {
                  const alts = findSubstitutes(v.ingredient);
                  return (
                    <li key={v.ingredient} className="rounded-xl bg-background p-3 ring-1 ring-foreground/5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium">{v.ingredient}</span>
                        <span
                          className={
                            "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider " +
                            (v.reason === "forbidden"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-200")
                          }
                        >
                          {v.reason === "forbidden" ? "заборонено" : "алергія"}
                        </span>
                      </div>
                      {alts.length > 0 ? (
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          Замінити на: <span className="text-foreground">{alts.join(", ")}</span>
                        </p>
                      ) : (
                        <p className="mt-1.5 text-xs text-muted-foreground">Краще пропустити цей рецепт</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Інгредієнти
            </h2>
            <ul className="mt-3 space-y-2">
              {dish.ingredients.map((ing) => {
                const flagged = violations.find((v) => v.ingredient === ing);
                return (
                  <li
                    key={ing}
                    className="flex items-center justify-between gap-3 rounded-xl bg-secondary/60 px-3 py-2 ring-1 ring-foreground/5"
                  >
                    <span className="flex items-center gap-2 text-sm">
                      {ing}
                      {flagged && (
                        <AlertTriangle className="size-3.5 text-destructive" strokeWidth={2} />
                      )}
                    </span>
                    <button
                      onClick={() => addToShopping(ing)}
                      className="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground ring-1 ring-foreground/5 transition active:scale-95"
                    >
                      <Plus className="size-3" strokeWidth={2.5} />
                      У список
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Приготування
            </h2>
            <ol className="mt-3 space-y-3">
              {dish.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed">{s}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" strokeWidth={2} />
            Готово — смачного!
          </div>
        </main>

        <BottomNav active="search" />
      </div>
    </div>
  );
}
