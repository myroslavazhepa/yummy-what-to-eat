import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Camera, Plus, X, User as UserIcon } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { useProfile } from "@/lib/profile";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: "Профіль — ваші вподобання та список покупок" },
      {
        name: "description",
        content: "Збережіть алергії, заборонені продукти, улюблену їжу та що потрібно докупити.",
      },
    ],
  }),
});

function ProfilePage() {
  const { profile, update } = useProfile();
  const nameMissing = profile.name.trim().length === 0;

  const onAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      update((p) => ({ ...p, avatar: typeof reader.result === "string" ? reader.result : null }));
    };
    reader.readAsDataURL(file);
  };

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
                Ваші вподобання
              </p>
              <h1 className="text-xl font-semibold tracking-tight">Профіль</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 pb-32 pt-4">
          {/* Avatar + name */}
          <section className="flex flex-col items-center gap-3 pb-6">
            <label className="relative cursor-pointer">
              <div className="grid size-24 place-items-center overflow-hidden rounded-full bg-secondary ring-1 ring-foreground/10">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Аватар" className="h-full w-full object-cover" />
                ) : (
                  <UserIcon className="size-10 text-muted-foreground" strokeWidth={1.5} />
                )}
              </div>
              <span className="absolute -bottom-1 right-0 grid size-8 place-items-center rounded-full bg-primary text-primary-foreground ring-4 ring-background">
                <Camera className="size-4" strokeWidth={2} />
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={onAvatar} />
            </label>

            <div className="w-full max-w-[280px]">
              <label className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span>Ім’я <span className="text-destructive">*</span></span>
                {nameMissing && <span className="text-destructive">обов’язкове</span>}
              </label>
              <input
                value={profile.name}
                onChange={(e) => update((p) => ({ ...p, name: e.target.value }))}
                placeholder="Як до вас звертатися?"
                required
                className={
                  "w-full rounded-xl bg-secondary px-4 py-2.5 text-center text-base font-semibold tracking-tight ring-1 focus:outline-none " +
                  (nameMissing
                    ? "ring-destructive/40 focus:ring-destructive/60"
                    : "ring-foreground/5 focus:ring-primary/40")
                }
              />
            </div>
            <textarea
              value={profile.bio}
              onChange={(e) => update((p) => ({ ...p, bio: e.target.value }))}
              placeholder="Коротко про вас, ваші смаки..."
              rows={2}
              className="w-full max-w-[280px] resize-none rounded-xl bg-secondary px-4 py-2.5 text-center text-sm text-muted-foreground ring-1 ring-foreground/5 focus:outline-none focus:ring-primary/40"
            />
          </section>

          <ChipSection
            title="Заборонені продукти"
            hint="Сховаємо страви з цими продуктами або запропонуємо заміну"
            tone="destructive"
            items={profile.forbidden}
            placeholder="напр. свинина"
            onChange={(items) => update((p) => ({ ...p, forbidden: items }))}
          />

          <ChipSection
            title="Алергії"
            hint="Покажемо альтернативи у рецепті"
            tone="warning"
            items={profile.allergies}
            placeholder="напр. горіхи"
            onChange={(items) => update((p) => ({ ...p, allergies: items }))}
          />

          <ChipSection
            title="Найулюбленіша їжа"
            hint="Покажемо подібне частіше"
            tone="primary"
            items={profile.favorites}
            placeholder="напр. паста карбонара"
            onChange={(items) => update((p) => ({ ...p, favorites: items }))}
          />

          <ChipSection
            title="Список покупок"
            hint="Що потрібно докупити"
            tone="neutral"
            items={profile.shopping}
            placeholder="напр. молоко"
            onChange={(items) => update((p) => ({ ...p, shopping: items }))}
          />
        </main>

        <BottomNav active="profile" />
      </div>
    </div>
  );
}

function ChipSection({
  title,
  hint,
  items,
  placeholder,
  tone,
  onChange,
}: {
  title: string;
  hint: string;
  items: string[];
  placeholder: string;
  tone: "destructive" | "warning" | "primary" | "neutral";
  onChange: (items: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    if (items.includes(v)) {
      setDraft("");
      return;
    }
    onChange([...items, v]);
    setDraft("");
  };

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  const chipClasses =
    tone === "destructive"
      ? "bg-destructive/10 text-destructive"
      : tone === "warning"
        ? "bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-200"
        : tone === "primary"
          ? "bg-primary/10 text-primary"
          : "bg-secondary text-foreground ring-1 ring-foreground/5";

  return (
    <section className="mb-6">
      <div className="mb-2 flex items-end justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      </div>

      {items.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className={"inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium " + chipClasses}
            >
              {item}
              <button onClick={() => remove(i)} aria-label="Видалити">
                <X className="size-3.5" strokeWidth={2.5} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-2.5 ring-1 ring-foreground/5 focus-within:ring-primary/40">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
        />
        <button
          onClick={add}
          className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground transition active:scale-90"
          aria-label="Додати"
        >
          <Plus className="size-4" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}
