import featuredPasta from "@/assets/featured-pasta.jpg";
import mealPumpkin from "@/assets/meal-pumpkin.jpg";
import mealSalmon from "@/assets/meal-salmon.jpg";
import mealToast from "@/assets/meal-toast.jpg";

export type Dish = {
  id: string;
  title: string;
  time: string;
  difficulty: string;
  img: string;
  section: SectionId;
  ingredients: string[];
  steps: string[];
};

export type SectionId =
  | "soups"
  | "salads"
  | "mains"
  | "breakfasts"
  | "desserts"
  | "snacks"
  | "drinks";

export const SECTIONS: { id: SectionId; label: string; emoji: string }[] = [
  { id: "soups", label: "Супи", emoji: "🍲" },
  { id: "salads", label: "Салати", emoji: "🥗" },
  { id: "mains", label: "Основні страви", emoji: "🍝" },
  { id: "breakfasts", label: "Сніданки", emoji: "🍳" },
  { id: "desserts", label: "Десерти", emoji: "🍰" },
  { id: "snacks", label: "Перекуси", emoji: "🥪" },
  { id: "drinks", label: "Напої", emoji: "🥤" },
];

export const DISHES: Dish[] = [
  // Soups
  {
    id: "pumpkin-soup",
    title: "Гарбузовий крем-суп",
    time: "35 хв",
    difficulty: "Середньо",
    img: mealPumpkin,
    section: "soups",
    ingredients: ["Гарбуз", "Цибуля", "Морква", "Часник", "Масло", "Молоко"],
    steps: [
      "Овочі обсмажити на маслі 5 хв",
      "Додати воду, варити 20 хв",
      "Збити блендером, додати молоко",
    ],
  },
  {
    id: "borsch",
    title: "Український борщ",
    time: "90 хв",
    difficulty: "Середньо",
    img: mealPumpkin,
    section: "soups",
    ingredients: ["Буряк", "Капуста", "Картопля", "Морква", "Цибуля", "Томат"],
    steps: ["Зварити бульйон", "Додати овочі", "Заправити сметаною"],
  },
  {
    id: "chicken-noodle",
    title: "Курячий суп з локшиною",
    time: "45 хв",
    difficulty: "Легко",
    img: mealPumpkin,
    section: "soups",
    ingredients: ["Курка", "Локшина", "Морква", "Цибуля", "Зелень"],
    steps: ["Зварити бульйон", "Додати локшину та овочі"],
  },
  {
    id: "mushroom-cream",
    title: "Крем-суп з печериць",
    time: "30 хв",
    difficulty: "Легко",
    img: mealPumpkin,
    section: "soups",
    ingredients: ["Печериці", "Цибуля", "Вершки", "Часник", "Масло"],
    steps: ["Обсмажити гриби", "Додати вершки", "Збити блендером"],
  },

  // Salads
  {
    id: "caesar",
    title: "Цезар з куркою",
    time: "20 хв",
    difficulty: "Легко",
    img: featuredPasta,
    section: "salads",
    ingredients: ["Курка", "Салат", "Сухарики", "Пармезан", "Соус Цезар"],
    steps: ["Обсмажити курку", "Зібрати салат", "Заправити соусом"],
  },
  {
    id: "greek",
    title: "Грецький салат",
    time: "10 хв",
    difficulty: "Легко",
    img: featuredPasta,
    section: "salads",
    ingredients: ["Помідори", "Огірки", "Фета", "Оливки", "Цибуля", "Олія"],
    steps: ["Нарізати овочі", "Додати фету та оливки", "Заправити олією"],
  },
  {
    id: "caprese",
    title: "Капрезе",
    time: "10 хв",
    difficulty: "Легко",
    img: featuredPasta,
    section: "salads",
    ingredients: ["Помідори", "Моцарела", "Базилік", "Олія"],
    steps: ["Нарізати помідори та сир", "Прикрасити базиліком"],
  },
  {
    id: "quinoa-bowl",
    title: "Боул з кіноа та авокадо",
    time: "25 хв",
    difficulty: "Легко",
    img: featuredPasta,
    section: "salads",
    ingredients: ["Кіноа", "Авокадо", "Помідори", "Огірки", "Лимон"],
    steps: ["Зварити кіноа", "Нарізати овочі", "Заправити лимоном"],
  },
  {
    id: "olivie",
    title: "Олів’є",
    time: "40 хв",
    difficulty: "Легко",
    img: featuredPasta,
    section: "salads",
    ingredients: ["Картопля", "Морква", "Яйця", "Горошок", "Майонез"],
    steps: ["Зварити овочі", "Нарізати", "Заправити майонезом"],
  },

  // Mains
  {
    id: "pasta-tomato",
    title: "Паста з томатами та базиліком",
    time: "20 хв",
    difficulty: "Легко",
    img: featuredPasta,
    section: "mains",
    ingredients: ["Паста", "Помідори", "Часник", "Базилік", "Олія", "Сир"],
    steps: ["Зварити пасту", "Зробити соус", "Поєднати та посипати сиром"],
  },
  {
    id: "salmon-veg",
    title: "Лосось з овочами",
    time: "25 хв",
    difficulty: "Легко",
    img: mealSalmon,
    section: "mains",
    ingredients: ["Лосось", "Броколі", "Лимон", "Олія", "Часник"],
    steps: ["Обсмажити лосось", "Приготувати овочі", "Полити лимоном"],
  },
  {
    id: "chicken-rice",
    title: "Курка з рисом",
    time: "30 хв",
    difficulty: "Середньо",
    img: mealSalmon,
    section: "mains",
    ingredients: ["Курка", "Рис", "Морква", "Цибуля", "Олія"],
    steps: ["Обсмажити курку", "Додати рис та воду", "Тушкувати 20 хв"],
  },
  {
    id: "lasagna",
    title: "Лазанья болоньєзе",
    time: "75 хв",
    difficulty: "Складно",
    img: featuredPasta,
    section: "mains",
    ingredients: ["Фарш", "Листи лазаньї", "Бешамель", "Сир", "Томат"],
    steps: ["Зробити соус болоньєзе", "Скласти шарами", "Запікати 40 хв"],
  },

  // Breakfasts
  {
    id: "avocado-toast",
    title: "Авокадо тост з яйцем",
    time: "10 хв",
    difficulty: "Легко",
    img: mealToast,
    section: "breakfasts",
    ingredients: ["Хліб", "Авокадо", "Яйце", "Лимон", "Олія"],
    steps: ["Підсмажити хліб", "Розім’яти авокадо", "Додати яйце"],
  },
  {
    id: "omlet",
    title: "Омлет з сиром",
    time: "10 хв",
    difficulty: "Легко",
    img: mealToast,
    section: "breakfasts",
    ingredients: ["Яйця", "Молоко", "Сир", "Масло"],
    steps: ["Збити яйця з молоком", "Вилити на сковороду", "Посипати сиром"],
  },
  {
    id: "oatmeal",
    title: "Вівсянка з ягодами",
    time: "10 хв",
    difficulty: "Легко",
    img: mealToast,
    section: "breakfasts",
    ingredients: ["Вівсянка", "Молоко", "Ягоди", "Мед"],
    steps: ["Зварити вівсянку", "Додати ягоди та мед"],
  },
  {
    id: "pancakes",
    title: "Млинці з медом",
    time: "25 хв",
    difficulty: "Легко",
    img: mealToast,
    section: "breakfasts",
    ingredients: ["Борошно", "Молоко", "Яйця", "Цукор", "Мед"],
    steps: ["Замісити тісто", "Підсмажити млинці", "Подати з медом"],
  },

  // Desserts
  {
    id: "tiramisu",
    title: "Тірамісу",
    time: "240 хв",
    difficulty: "Середньо",
    img: mealToast,
    section: "desserts",
    ingredients: ["Маскарпоне", "Савоярді", "Кава", "Какао", "Яйця"],
    steps: ["Збити крем", "Замочити савоярді", "Зібрати та охолодити"],
  },
  {
    id: "cheesecake",
    title: "Чізкейк",
    time: "180 хв",
    difficulty: "Середньо",
    img: mealToast,
    section: "desserts",
    ingredients: ["Печиво", "Масло", "Сир-крем", "Цукор", "Яйця"],
    steps: ["Зробити основу", "Залити начинкою", "Запекти 60 хв"],
  },
  {
    id: "brownie",
    title: "Шоколадний брауні",
    time: "45 хв",
    difficulty: "Легко",
    img: mealToast,
    section: "desserts",
    ingredients: ["Шоколад", "Масло", "Яйця", "Цукор", "Борошно"],
    steps: ["Розтопити шоколад", "Замісити тісто", "Запекти 25 хв"],
  },

  // Snacks
  {
    id: "bruschetta",
    title: "Брускета з томатами",
    time: "15 хв",
    difficulty: "Легко",
    img: mealToast,
    section: "snacks",
    ingredients: ["Багет", "Помідори", "Часник", "Базилік", "Олія"],
    steps: ["Підсмажити багет", "Натерти часником", "Додати томати"],
  },
  {
    id: "hummus",
    title: "Хумус з овочами",
    time: "15 хв",
    difficulty: "Легко",
    img: mealToast,
    section: "snacks",
    ingredients: ["Нут", "Тахіні", "Лимон", "Часник", "Олія"],
    steps: ["Збити інгредієнти", "Подати з овочами"],
  },

  // Drinks
  {
    id: "smoothie",
    title: "Зелений смузі",
    time: "5 хв",
    difficulty: "Легко",
    img: mealToast,
    section: "drinks",
    ingredients: ["Шпинат", "Банан", "Яблуко", "Лимон", "Вода"],
    steps: ["Скласти все в блендер", "Збити до однорідності"],
  },
  {
    id: "lemonade",
    title: "Домашній лимонад",
    time: "10 хв",
    difficulty: "Легко",
    img: mealToast,
    section: "drinks",
    ingredients: ["Лимон", "Цукор", "М’ята", "Вода"],
    steps: ["Вичавити сік", "Додати воду та м’яту"],
  },
];

export function dishesBySection(section: SectionId) {
  return DISHES.filter((d) => d.section === section);
}

export function dishById(id: string) {
  return DISHES.find((d) => d.id === id);
}
