import { Link } from "@tanstack/react-router";
import { Home, Search, Heart, User } from "lucide-react";

type Tab = "home" | "search" | "favorites" | "profile";

export function BottomNav({ active }: { active: Tab }) {
  return (
    <nav className="sticky bottom-0 border-t border-foreground/5 bg-background/85 px-8 pb-8 pt-3 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <NavItem to="/" icon={Home} label="Головна" active={active === "home"} />
        <NavItem to="/search" icon={Search} label="Пошук" active={active === "search"} />
        <NavItem to="/favorites" icon={Heart} label="Улюблене" active={active === "favorites"} />
        <NavItem to="/profile" icon={User} label="Профіль" active={active === "profile"} />
      </div>
    </nav>
  );
}

function NavItem({
  to,
  icon: Icon,
  label,
  active,
}: {
  to: string;
  icon: typeof Home;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={
        "flex flex-col items-center gap-1 " +
        (active ? "text-primary" : "text-muted-foreground/60 hover:text-muted-foreground")
      }
    >
      <Icon className="size-5" strokeWidth={1.75} />
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
