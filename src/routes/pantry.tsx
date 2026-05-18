import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, X, Sparkles, Check, ChevronRight, Clock, TrendingUp } from "lucide-react";
import mealPumpkin from "@/assets/meal-pumpkin.jpg";
import mealSalmon from "@/assets/meal-salmon.jpg";
import mealToast from "@/assets/meal-toast.jpg";
import featuredPasta from "@/assets/featured-pasta.jpg";

export const Route = createFileRoute("/pantry")({
  component: PantryPage,
  head: () => ({
    meta: [
      { title: "З того що є — підбір страв за продуктами" },
      {
        name: "description",
        content:
          "Виберіть продукти, які є вдома, а застосунок підкаже, що з них приготувати.",
      },
    ],
  }),
});

type Ingredient = { id: string; name: string; emoji: string; category: string };

const ALL_INGREDIENTS: Ingredient[] = [
  // Базове
  { id: "egg", name: "Яйця", emoji: "🥚", category: "Базове" },
  { id: "bread", name: "Хліб", emoji: "🍞", category: "Базове" },
  { id: "butter", name: "Масло", emoji: "🧈", category: "Базове" },
  { id: "milk", name: "Молоко", emoji: "🥛", category: "Базове" },
  { id: "cheese", name: "Сир", emoji: "🧀", category: "Базове" },
  { id: "oil", name: "Олія", emoji: "🫒", category: "Базове" },
  { id: "salt", name: "Сіль", emoji: "🧂", category: "Базове" },
  { id: "sugar", name: "Цукор", emoji: "🍬", category: "Базове" },
  { id: "flour", name: "Борошно", emoji: "🌾", category: "Базове" },
  { id: "honey", name: "Мед", emoji: "🍯", category: "Базове" },
  { id: "vinegar", name: "Оцет", emoji: "🍶", category: "Базове" },
  { id: "soy", name: "Соєвий соус", emoji: "🥢", category: "Базове" },
  { id: "mayo", name: "Майонез", emoji: "🥣", category: "Базове" },
  { id: "ketchup", name: "Кетчуп", emoji: "🍅", category: "Базове" },
  { id: "mustard", name: "Гірчиця", emoji: "🟡", category: "Базове" },
  { id: "yeast", name: "Дріжджі", emoji: "🫧", category: "Базове" },
  // Молочне
  { id: "yogurt", name: "Йогурт", emoji: "🥛", category: "Молочне" },
  { id: "sourcream", name: "Сметана", emoji: "🥄", category: "Молочне" },
  { id: "cream", name: "Вершки", emoji: "🥛", category: "Молочне" },
  { id: "cottage", name: "Сир кисломолочний", emoji: "🧀", category: "Молочне" },
  { id: "feta", name: "Фета", emoji: "🧀", category: "Молочне" },
  { id: "mozzarella", name: "Моцарела", emoji: "🧀", category: "Молочне" },
  { id: "parmesan", name: "Пармезан", emoji: "🧀", category: "Молочне" },
  // Крупи / макарони
  { id: "pasta", name: "Паста", emoji: "🍝", category: "Крупи" },
  { id: "rice", name: "Рис", emoji: "🍚", category: "Крупи" },
  { id: "buckwheat", name: "Гречка", emoji: "🌰", category: "Крупи" },
  { id: "oats", name: "Вівсянка", emoji: "🥣", category: "Крупи" },
  { id: "quinoa", name: "Кіноа", emoji: "🌾", category: "Крупи" },
  { id: "couscous", name: "Кускус", emoji: "🌾", category: "Крупи" },
  { id: "bulgur", name: "Булгур", emoji: "🌾", category: "Крупи" },
  { id: "noodles", name: "Локшина", emoji: "🍜", category: "Крупи" },
  // Бобові
  { id: "lentils", name: "Сочевиця", emoji: "🫘", category: "Бобові" },
  { id: "beans", name: "Квасоля", emoji: "🫘", category: "Бобові" },
  { id: "chickpeas", name: "Нут", emoji: "🫛", category: "Бобові" },
  { id: "peas", name: "Горошок", emoji: "🟢", category: "Бобові" },
  // Овочі
  { id: "potato", name: "Картопля", emoji: "🥔", category: "Овочі" },
  { id: "tomato", name: "Помідори", emoji: "🍅", category: "Овочі" },
  { id: "onion", name: "Цибуля", emoji: "🧅", category: "Овочі" },
  { id: "garlic", name: "Часник", emoji: "🧄", category: "Овочі" },
  { id: "carrot", name: "Морква", emoji: "🥕", category: "Овочі" },
  { id: "pumpkin", name: "Гарбуз", emoji: "🎃", category: "Овочі" },
  { id: "avocado", name: "Авокадо", emoji: "🥑", category: "Овочі" },
  { id: "broccoli", name: "Броколі", emoji: "🥦", category: "Овочі" },
  { id: "cauliflower", name: "Цвітна капуста", emoji: "🥦", category: "Овочі" },
  { id: "cabbage", name: "Капуста", emoji: "🥬", category: "Овочі" },
  { id: "cucumber", name: "Огірки", emoji: "🥒", category: "Овочі" },
  { id: "bellpepper", name: "Перець солодкий", emoji: "🫑", category: "Овочі" },
  { id: "chili", name: "Перець чилі", emoji: "🌶️", category: "Овочі" },
  { id: "eggplant", name: "Баклажан", emoji: "🍆", category: "Овочі" },
  { id: "zucchini", name: "Кабачок", emoji: "🥒", category: "Овочі" },
  { id: "corn", name: "Кукурудза", emoji: "🌽", category: "Овочі" },
  { id: "mushroom", name: "Печериці", emoji: "🍄", category: "Овочі" },
  { id: "beet", name: "Буряк", emoji: "🫜", category: "Овочі" },
  { id: "radish", name: "Редиска", emoji: "🥕", category: "Овочі" },
  { id: "spinach", name: "Шпинат", emoji: "🥬", category: "Овочі" },
  { id: "lettuce", name: "Салат", emoji: "🥬", category: "Овочі" },
  { id: "celery", name: "Селера", emoji: "🌿", category: "Овочі" },
  { id: "ginger", name: "Імбир", emoji: "🫚", category: "Овочі" },
  { id: "olives", name: "Оливки", emoji: "🫒", category: "Овочі" },
  // М’ясо
  { id: "chicken", name: "Курка", emoji: "🍗", category: "М’ясо" },
  { id: "beef", name: "Яловичина", emoji: "🥩", category: "М’ясо" },
  { id: "pork", name: "Свинина", emoji: "🥓", category: "М’ясо" },
  { id: "lamb", name: "Баранина", emoji: "🍖", category: "М’ясо" },
  { id: "turkey", name: "Індичка", emoji: "🦃", category: "М’ясо" },
  { id: "bacon", name: "Бекон", emoji: "🥓", category: "М’ясо" },
  { id: "sausage", name: "Ковбаса", emoji: "🌭", category: "М’ясо" },
  { id: "ham", name: "Шинка", emoji: "🍖", category: "М’ясо" },
  { id: "mince", name: "Фарш", emoji: "🥩", category: "М’ясо" },
  // Риба / морепродукти
  { id: "salmon", name: "Лосось", emoji: "🐟", category: "Риба" },
  { id: "tuna", name: "Тунець", emoji: "🐟", category: "Риба" },
  { id: "cod", name: "Тріска", emoji: "🐟", category: "Риба" },
  { id: "shrimp", name: "Креветки", emoji: "🦐", category: "Риба" },
  { id: "squid", name: "Кальмари", emoji: "🦑", category: "Риба" },
  { id: "mussels", name: "Мідії", emoji: "🦪", category: "Риба" },
  { id: "anchovy", name: "Анчоуси", emoji: "🐟", category: "Риба" },
  // Фрукти / ягоди
  { id: "lemon", name: "Лимон", emoji: "🍋", category: "Фрукти" },
  { id: "lime", name: "Лайм", emoji: "🍈", category: "Фрукти" },
  { id: "orange", name: "Апельсин", emoji: "🍊", category: "Фрукти" },
  { id: "apple", name: "Яблуко", emoji: "🍎", category: "Фрукти" },
  { id: "pear", name: "Груша", emoji: "🍐", category: "Фрукти" },
  { id: "banana", name: "Банан", emoji: "🍌", category: "Фрукти" },
  { id: "grape", name: "Виноград", emoji: "🍇", category: "Фрукти" },
  { id: "strawberry", name: "Полуниця", emoji: "🍓", category: "Фрукти" },
  { id: "blueberry", name: "Чорниця", emoji: "🫐", category: "Фрукти" },
  { id: "raspberry", name: "Малина", emoji: "🍒", category: "Фрукти" },
  { id: "peach", name: "Персик", emoji: "🍑", category: "Фрукти" },
  { id: "pineapple", name: "Ананас", emoji: "🍍", category: "Фрукти" },
  { id: "mango", name: "Манго", emoji: "🥭", category: "Фрукти" },
  { id: "watermelon", name: "Кавун", emoji: "🍉", category: "Фрукти" },
  // Зелень / спеції
  { id: "basil", name: "Базилік", emoji: "🌿", category: "Зелень" },
  { id: "parsley", name: "Петрушка", emoji: "🌿", category: "Зелень" },
  { id: "dill", name: "Кріп", emoji: "🌿", category: "Зелень" },
  { id: "cilantro", name: "Кінза", emoji: "🌿", category: "Зелень" },
  { id: "mint", name: "М’ята", emoji: "🌱", category: "Зелень" },
  { id: "rosemary", name: "Розмарин", emoji: "🌿", category: "Зелень" },
  { id: "thyme", name: "Чебрець", emoji: "🌿", category: "Зелень" },
  { id: "oregano", name: "Орегано", emoji: "🌿", category: "Зелень" },
  { id: "pepper", name: "Чорний перець", emoji: "⚫", category: "Спеції" },
  { id: "paprika", name: "Паприка", emoji: "🌶️", category: "Спеції" },
  { id: "cumin", name: "Кмин", emoji: "🟤", category: "Спеції" },
  { id: "curry", name: "Каррі", emoji: "🟡", category: "Спеції" },
  { id: "cinnamon", name: "Кориця", emoji: "🟫", category: "Спеції" },
  { id: "vanilla", name: "Ваніль", emoji: "🌼", category: "Спеції" },
  // Горіхи
  { id: "walnut", name: "Волоські горіхи", emoji: "🌰", category: "Горіхи" },
  { id: "almond", name: "Мигдаль", emoji: "🌰", category: "Горіхи" },
  { id: "cashew", name: "Кеш’ю", emoji: "🌰", category: "Горіхи" },
  { id: "peanut", name: "Арахіс", emoji: "🥜", category: "Горіхи" },
  { id: "pistachio", name: "Фісташки", emoji: "🥜", category: "Горіхи" },
  // Інше
  { id: "chocolate", name: "Шоколад", emoji: "🍫", category: "Інше" },
  { id: "cocoa", name: "Какао", emoji: "🟤", category: "Інше" },
  { id: "coffee", name: "Кава", emoji: "☕", category: "Інше" },
  { id: "tea", name: "Чай", emoji: "🍵", category: "Інше" },
  { id: "tofu", name: "Тофу", emoji: "⬜", category: "Інше" },
  { id: "tahini", name: "Тахіні", emoji: "🥣", category: "Інше" },
];

type Recipe = {
  id: string;
  title: string;
  time: string;
  difficulty: string;
  img: string;
  needs: string[];
};

const RECIPES: Recipe[] = [
  {
    id: "pasta",
    title: "Паста з томатами та базиліком",
    time: "20 хв",
    difficulty: "Легко",
    img: featuredPasta,
    needs: ["pasta", "tomato", "garlic", "oil", "basil", "cheese"],
  },
  {
    id: "toast",
    title: "Авокадо-тост з яйцем",
    time: "10 хв",
    difficulty: "Легко",
    img: mealToast,
    needs: ["bread", "avocado", "egg", "lemon", "oil"],
  },
  {
    id: "soup",
    title: "Гарбузовий крем-суп",
    time: "35 хв",
    difficulty: "Середньо",
    img: mealPumpkin,
    needs: ["pumpkin", "onion", "carrot", "garlic", "butter", "milk"],
  },
  {
    id: "salmon",
    title: "Лосось з овочами на пательні",
    time: "25 хв",
    difficulty: "Легко",
    img: mealSalmon,
    needs: ["salmon", "broccoli", "lemon", "oil", "garlic"],
  },
  {
    id: "omlet",
    title: "Омлет з сиром",
    time: "10 хв",
    difficulty: "Легко",
    img: mealToast,
    needs: ["egg", "milk", "cheese", "butter"],
  },
  {
    id: "rice",
    title: "Курка з рисом і морквою",
    time: "30 хв",
    difficulty: "Середньо",
    img: mealSalmon,
    needs: ["chicken", "rice", "carrot", "onion", "oil", "garlic"],
  },
];

const SUGGESTED_IDS = ["egg", "bread", "tomato", "onion", "garlic", "pasta", "cheese", "oil"];

const popularityMap = new Map<string, number>();
for (const r of RECIPES) {
  for (const n of r.needs) {
    popularityMap.set(n, (popularityMap.get(n) ?? 0) + 1);
  }
}

const POPULAR_IDS = Array.from(popularityMap.entries())
  .sort((a, b) => b[1] - a[1])
  .map(([id]) => id);

function PantryPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? ALL_INGREDIENTS.filter((i) => i.name.toLowerCase().includes(q))
      : ALL_INGREDIENTS.filter((i) => !selected.has(i.id));
    return base
      .sort((a, b) => (popularityMap.get(b.id) ?? 0) - (popularityMap.get(a.id) ?? 0))
      .slice(0, 8);
  }, [query, selected]);

  const suggestedChips = ALL_INGREDIENTS.filter((i) => POPULAR_IDS.includes(i.id)).sort(
    (a, b) => POPULAR_IDS.indexOf(a.id) - POPULAR_IDS.indexOf(b.id)
  );
  const selectedList = ALL_INGREDIENTS.filter((i) => selected.has(i.id));

  const ranked = useMemo(() => {
    if (selected.size === 0) return [];
    return RECIPES.map((r) => {
      const have = r.needs.filter((n) => selected.has(n));
      const missing = r.needs.filter((n) => !selected.has(n));
      return { ...r, match: have.length / r.needs.length, have, missing };
    })
      .filter((r) => r.have.length >= Math.max(2, Math.ceil(r.needs.length / 2)))
      .sort((a, b) => b.match - a.match)
      .slice(0, 6);
  }, [selected]);

  return (
    <div className="min-h-screen bg-secondary/40 text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[420px] flex-col bg-background shadow-2xl shadow-foreground/10 relative">
        {/* Header */}
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
                З того що є
              </p>
              <h1 className="text-xl font-semibold tracking-tight">Що у вас вдома?</h1>
            </div>
          </div>

          {/* Search */}
          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3 ring-1 ring-foreground/5 focus-within:ring-primary/40">
            <Search className="size-4 text-muted-foreground" strokeWidth={1.75} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Шукати продукт..."
              className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Очистити">
                <X className="size-4 text-muted-foreground" strokeWidth={1.75} />
              </button>
            )}
          </div>

          {/* Search results */}
          {filtered.length > 0 && (
            <div className="mt-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {query.trim() ? "Результати пошуку" : "Популярні продукти"}
              </p>
              <div className="overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/10">
                {filtered.map((i) => {
                  const isOn = selected.has(i.id);
                  return (
                    <button
                      key={i.id}
                      onClick={() => toggle(i.id)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-secondary"
                    >
                      <span className="text-lg">{i.emoji}</span>
                      <span className="flex-1 text-sm font-medium">{i.name}</span>
                      <span className="text-xs text-muted-foreground">{i.category}</span>
                      {isOn ? (
                        <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="size-5 rounded-full ring-1 ring-foreground/15" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto pb-40">
          {/* Selected chips */}
          {selectedList.length > 0 && (
            <section className="px-6 pt-2 pb-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Обрано · {selectedList.length}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedList.map((i) => (
                  <button
                    key={i.id}
                    onClick={() => toggle(i.id)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                  >
                    <span>{i.emoji}</span>
                    <span>{i.name}</span>
                    <X className="size-3.5" strokeWidth={2.5} />
                  </button>
                ))}
                <button
                  onClick={() => setSelected(new Set())}
                  className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
                >
                  Очистити
                </button>
              </div>
            </section>
          )}

          {/* Suggested ingredients */}
          <section className="px-6 pb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Популярні
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedChips.map((i) => {
                const isOn = selected.has(i.id);
                return (
                  <button
                    key={i.id}
                    onClick={() => toggle(i.id)}
                    className={
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition active:scale-95 " +
                      (isOn
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground ring-1 ring-foreground/5 hover:bg-secondary/70")
                    }
                  >
                    <span>{i.emoji}</span>
                    <span>{i.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Results */}
          <section className="px-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight">
                {ranked.length > 0 ? "Можна приготувати" : "Що приготувати"}
              </h3>
              {ranked.length > 0 && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                  <Sparkles className="size-3.5" strokeWidth={2} />
                  {ranked.length} ідей
                </span>
              )}
            </div>

            {ranked.length === 0 ? (
              <div className="rounded-2xl bg-secondary/60 p-6 text-center ring-1 ring-foreground/5">
                <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-background ring-1 ring-foreground/5">
                  <Sparkles className="size-5 text-primary" strokeWidth={1.75} />
                </div>
                <p className="text-sm font-medium">Додайте кілька продуктів</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Чим більше виберете — тим точніші ідеї
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {ranked.map((r) => (
                  <button
                    key={r.id}
                    className="flex w-full items-center gap-4 rounded-2xl bg-background p-3 text-left ring-1 ring-foreground/5 transition active:scale-[0.99]"
                  >
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={r.img}
                        alt={r.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute left-1 top-1 rounded-md bg-background/90 px-1.5 py-0.5 text-[10px] font-semibold tracking-tight text-foreground backdrop-blur-sm">
                        {Math.round(r.match * 100)}%
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate font-medium">{r.title}</h4>
                      <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" strokeWidth={2} />
                        {r.time} · {r.difficulty}
                      </p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {r.missing.length === 0
                          ? "Все є ✨"
                          : `Не вистачає: ${r.missing
                              .map((m) => ALL_INGREDIENTS.find((i) => i.id === m)?.name)
                              .filter(Boolean)
                              .join(", ")}`}
                      </p>
                    </div>
                    <ChevronRight
                      className="size-5 text-muted-foreground"
                      strokeWidth={1.75}
                    />
                  </button>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* Sticky CTA */}
        {selected.size > 0 && (
          <div className="sticky bottom-0 border-t border-foreground/5 bg-background/90 px-6 pb-8 pt-4 backdrop-blur-xl">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground transition active:scale-[0.99]">
              <Sparkles className="size-4" strokeWidth={2} />
              Підібрати страву ({ranked.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
