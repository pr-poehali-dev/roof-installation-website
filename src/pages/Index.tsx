import { useState } from "react";
import Icon from "@/components/ui/icon";

const SEND_LEAD_URL = "https://functions.poehali.dev/1e25db00-91c6-42f9-b22a-788ddbc06989";

// ─── LEAD FORM MODAL ─────────────────────────────────────────────────────────

function LeadForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(61,32,8,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden animate-fade-up"
        style={{ background: "var(--warm-white)", boxShadow: "0 32px 80px rgba(61,32,8,0.4)" }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6" style={{ background: "linear-gradient(135deg, var(--brown-dark), var(--brown-mid))" }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.1)", color: "rgba(253,246,237,0.7)" }}
          >
            <Icon name="X" size={16} />
          </button>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(245,164,97,0.2)" }}>
            <Icon name="Phone" size={22} style={{ color: "#f5a461" }} />
          </div>
          <h3 className="font-display text-2xl font-bold text-white mb-1">Оставить заявку</h3>
          <p className="font-body text-sm" style={{ color: "rgba(253,246,237,0.7)" }}>
            Перезвоним в течение 30 минут в рабочее время
          </p>
        </div>

        <div className="px-8 py-7">
          {status === "success" ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(196,90,26,0.1)" }}>
                <Icon name="CheckCircle" size={32} style={{ color: "var(--orange-main)" }} />
              </div>
              <h4 className="font-display text-xl font-bold mb-2" style={{ color: "var(--brown-dark)" }}>Заявка отправлена!</h4>
              <p className="font-body text-sm mb-6" style={{ color: "#7a5c45" }}>
                Мы получили ваши контакты и скоро перезвоним.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-display font-semibold text-sm"
                style={{ background: "var(--orange-main)", color: "white" }}
              >
                Закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-body text-sm font-medium block mb-1.5" style={{ color: "var(--brown-dark)" }}>
                  Ваше имя <span style={{ color: "var(--orange-main)" }}>*</span>
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none transition-all"
                  style={{ background: "rgba(196,90,26,0.06)", border: "1.5px solid rgba(196,90,26,0.15)", color: "var(--brown-dark)" }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--orange-main)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(196,90,26,0.15)"; }}
                />
              </div>
              <div>
                <label className="font-body text-sm font-medium block mb-1.5" style={{ color: "var(--brown-dark)" }}>
                  Телефон <span style={{ color: "var(--orange-main)" }}>*</span>
                </label>
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 000-00-00"
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none transition-all"
                  style={{ background: "rgba(196,90,26,0.06)", border: "1.5px solid rgba(196,90,26,0.15)", color: "var(--brown-dark)" }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--orange-main)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(196,90,26,0.15)"; }}
                />
              </div>
              <div>
                <label className="font-body text-sm font-medium block mb-1.5" style={{ color: "var(--brown-dark)" }}>
                  Комментарий <span style={{ color: "#b09080" }}>(необязательно)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Площадь дома, тип кровли, вопросы..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none transition-all resize-none"
                  style={{ background: "rgba(196,90,26,0.06)", border: "1.5px solid rgba(196,90,26,0.15)", color: "var(--brown-dark)" }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--orange-main)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(196,90,26,0.15)"; }}
                />
              </div>
              {status === "error" && (
                <p className="font-body text-sm text-red-500">Ошибка отправки. Попробуйте ещё раз или позвоните нам.</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 rounded-xl font-display font-bold text-base transition-all hover:scale-[1.02] disabled:opacity-60"
                style={{ background: "var(--orange-main)", color: "white", boxShadow: "0 6px 20px rgba(196,90,26,0.35)" }}
              >
                {status === "loading" ? "Отправляем..." : "Отправить заявку"}
              </button>
              <p className="font-body text-xs text-center" style={{ color: "#b09080" }}>
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const HERO_IMG = "https://cdn.poehali.dev/projects/5dda9653-ee6b-4f38-8c2f-eebc2ff4c56f/files/d88db3d6-b028-46b4-a297-165c38ad20df.jpg";

// ─── DATA ────────────────────────────────────────────────────────────────────

const WORKS = [
  { id: 1, title: "Двускатная кровля из металлочерепицы", area: "280 м²", city: "Архангельск", color: "#c45a1a" },
  { id: 2, title: "Мансардная кровля с окнами", area: "150 м²", city: "Северодвинск", color: "#7a3e14" },
  { id: 3, title: "Вальмовая кровля из мягкой черепицы", area: "320 м²", city: "Архангельская обл.", color: "#e8813a" },
  { id: 4, title: "Плоская кровля с гидроизоляцией", area: "95 м²", city: "Котлас", color: "#3d2008" },
  { id: 5, title: "Полувальмовая крыша коттеджа", area: "410 м²", city: "Архангельская обл.", color: "#c45a1a" },
  { id: 6, title: "Многоуровневая кровля загородного дома", area: "540 м²", city: "Онега", color: "#7a3e14" },
];

const REVIEWS = [
  {
    name: "Андрей Семёнов",
    city: "Архангельск",
    rating: 5,
    text: "Делали кровлю из металлочерепицы. Команда приехала точно в срок, работали аккуратно, убрали после себя. Результат превзошёл ожидания — крыша выглядит идеально, протечек нет уже второй год.",
    date: "Март 2024",
  },
  {
    name: "Елена Волкова",
    city: "Северодвинск",
    rating: 5,
    text: "Обращались по рекомендации соседей. Сделали замер, предложили несколько вариантов материалов с разными ценами. Выбрали мягкую черепицу — очень довольны и ценой, и качеством исполнения.",
    date: "Январь 2024",
  },
  {
    name: "Игорь Петров",
    city: "Тверь",
    rating: 5,
    text: "Менял старую шиферную кровлю. Всё сделали быстро — за 4 дня на доме 200 квадратов. Мастера вежливые, профессиональные. Отдельное спасибо за честную смету — итоговая цена совпала с расчётом.",
    date: "Октябрь 2023",
  },
  {
    name: "Марина Козлова",
    city: "Новгородская обл.",
    rating: 5,
    text: "Заказывали монтаж мансардной кровли с установкой окон. Проект нестандартный, но ребята справились отлично. Особенно понравилась аккуратность в деталях — примыкания, водостоки всё сделано на совесть.",
    date: "Август 2023",
  },
];

const MATERIALS = [
  {
    name: "Металлочерепица",
    icon: "Layers",
    price: "от 850 ₽/м²",
    life: "50 лет",
    desc: "Самый популярный выбор для частных домов. Лёгкий монтаж, широкая палитра цветов, долговечность.",
    pros: ["Лёгкий вес", "Большой выбор цветов", "Простой монтаж", "Доступная цена"],
    color: "#c45a1a",
  },
  {
    name: "Мягкая черепица",
    icon: "Square",
    price: "от 1 200 ₽/м²",
    life: "30–50 лет",
    desc: "Гибкий битумный материал идеален для сложных форм кровли. Отличная шумоизоляция и герметичность.",
    pros: ["Любая форма крыши", "Тихая в дождь", "Высокая герметичность", "Эстетичный вид"],
    color: "#7a3e14",
  },
  {
    name: "Керамическая черепица",
    icon: "Home",
    price: "от 2 500 ₽/м²",
    life: "100+ лет",
    desc: "Премиальный материал с вековой историей. Натуральный вид, исключительная долговечность.",
    pros: ["Срок 100+ лет", "Натуральный материал", "Не выгорает", "Элитный вид"],
    color: "#3d2008",
  },
  {
    name: "Профнастил",
    icon: "AlignJustify",
    price: "от 480 ₽/м²",
    life: "25–40 лет",
    desc: "Экономичное и надёжное решение. Подходит для хозяйственных построек и жилых домов в бюджетном сегменте.",
    pros: ["Низкая цена", "Быстрый монтаж", "Прочность", "Лёгкий вес"],
    color: "#e8813a",
  },
  {
    name: "Ондулин",
    icon: "Waves",
    price: "от 320 ₽/м²",
    life: "15–20 лет",
    desc: "Лёгкое и гибкое кровельное покрытие на основе целлюлозы и битума. Хорошая шумоизоляция.",
    pros: ["Самая низкая цена", "Лёгкий", "Гибкий", "Прост в монтаже"],
    color: "#c45a1a",
  },
  {
    name: "Фальцевая кровля",
    icon: "ChevronsRight",
    price: "от 1 800 ₽/м²",
    life: "50–70 лет",
    desc: "Современный стиль из стальных листов без болтов. Минималистичный вид, полная герметичность.",
    pros: ["Нет крепежа", "Строгий дизайн", "Полная герметичность", "Долговечна"],
    color: "#7a3e14",
  },
];

// ─── CALCULATOR DATA ──────────────────────────────────────────────────────────

const ROOF_TYPES = [
  { id: "dvuskat", label: "Двускатная", coef: 1.0 },
  { id: "valmovaya", label: "Вальмовая", coef: 1.1 },
  { id: "mansardnaya", label: "Мансардная", coef: 1.25 },
  { id: "ploskaya", label: "Плоская", coef: 0.85 },
];

const MATERIAL_PRICES: Record<string, number> = {
  "Металлочерепица": 850,
  "Мягкая черепица": 1200,
  "Керамическая черепица": 2500,
  "Профнастил": 480,
  "Ондулин": 320,
  "Фальцевая кровля": 1800,
};

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < count ? "#e8813a" : "#d4c4b0" }} className="text-lg">★</span>
      ))}
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function SectionHome({ setTab, onOpenForm }: { setTab: (t: string) => void; onOpenForm: () => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: "var(--brown-dark)" }}>
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Монтаж кровли" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(61,32,8,0.85) 0%, rgba(122,62,20,0.5) 50%, rgba(232,129,58,0.2) 100%)" }} />
        </div>
        <div className="absolute inset-0 hero-texture" />
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="animate-fade-up-delay-1">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-body font-medium mb-6" style={{ background: "rgba(232,129,58,0.2)", border: "1px solid rgba(232,129,58,0.4)", color: "#f5a461" }}>
                Монтаж кровли с 2008 года
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-up-delay-2">
              Надёжная кровля<br />
              <span style={{ color: "#f5a461" }}>для вашего дома</span>
            </h1>
            <p className="font-body text-lg md:text-xl mb-10 animate-fade-up-delay-3" style={{ color: "rgba(253,246,237,0.85)" }}>
              Профессиональный монтаж, демонтаж и ремонт кровли. Работаем по всей Архангельской области. Гарантия 10 лет на все виды работ.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up-delay-4">
              <button
                onClick={() => setTab("calc")}
                className="px-8 py-4 rounded-xl font-display font-semibold text-lg transition-all hover:scale-105 active:scale-95"
                style={{ background: "var(--orange-main)", color: "white", boxShadow: "0 8px 24px rgba(196,90,26,0.4)" }}
              >
                Рассчитать стоимость
              </button>
              <button
                onClick={() => setTab("works")}
                className="px-8 py-4 rounded-xl font-display font-semibold text-lg transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "white" }}
              >
                Наши работы
              </button>
            </div>
          </div>
        </div>
        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 py-6" style={{ background: "rgba(61,32,8,0.8)", backdropFilter: "blur(10px)", borderTop: "1px solid rgba(232,129,58,0.2)" }}>
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[["15+", "лет опыта"], ["500+", "объектов"], ["10 лет", "гарантия"], ["24ч", "выезд на замер"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-2xl md:text-3xl font-bold" style={{ color: "#f5a461" }}>{num}</div>
                  <div className="font-body text-sm" style={{ color: "rgba(253,246,237,0.7)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6" style={{ background: "var(--cream)" }}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4" style={{ color: "var(--brown-dark)" }}>Наши услуги</h2>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "#6b4c34" }}>Полный спектр кровельных работ — от замера до финальной уборки</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "HardHat", title: "Монтаж кровли", desc: "Устройство новой кровли под ключ. Работаем со всеми видами материалов и формами крыш.", price: "от 380 ₽/м²" },
              { icon: "Wrench", title: "Ремонт кровли", desc: "Устранение протечек, замена повреждённых элементов, частичный или полный ремонт.", price: "от 200 ₽/м²" },
              { icon: "ArrowUp", title: "Демонтаж", desc: "Аккуратный демонтаж старого покрытия с вывозом мусора. Подготовка под новую кровлю.", price: "от 150 ₽/м²" },
              { icon: "Thermometer", title: "Утепление", desc: "Монтаж теплоизоляции кровли и чердачного перекрытия. Экономия на отоплении до 30%.", price: "от 250 ₽/м²" },
              { icon: "Droplets", title: "Водостоки", desc: "Установка водосточных систем. Металлические и пластиковые системы любых конфигураций.", price: "от 450 ₽/п.м." },
              { icon: "Shield", title: "Гидроизоляция", desc: "Устройство надёжной гидроизоляции кровли. Используем материалы ведущих производителей.", price: "от 180 ₽/м²" },
            ].map(({ icon, title, desc, price }) => (
              <div key={title} className="rounded-2xl p-8 card-hover" style={{ background: "white", border: "1px solid rgba(196,90,26,0.1)", boxShadow: "0 4px 16px rgba(122,62,20,0.06)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(196,90,26,0.1)" }}>
                  <Icon name={icon} size={22} style={{ color: "var(--orange-main)" }} />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3" style={{ color: "var(--brown-dark)" }}>{title}</h3>
                <p className="font-body text-sm mb-4 leading-relaxed" style={{ color: "#7a5c45" }}>{desc}</p>
                <span className="font-display font-semibold text-sm px-3 py-1 rounded-lg" style={{ background: "rgba(196,90,26,0.08)", color: "var(--orange-main)" }}>{price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "var(--brown-mid)" }}>
        <div className="container mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Готовы начать?</h2>
          <p className="font-body text-lg mb-8 max-w-xl mx-auto" style={{ color: "rgba(253,246,237,0.8)" }}>
            Оставьте заявку — приедем на замер в течение 24 часов, бесплатно
          </p>
          <button
            onClick={onOpenForm}
            className="px-10 py-4 rounded-xl font-display font-bold text-lg transition-all hover:scale-105"
            style={{ background: "#f5a461", color: "var(--brown-dark)" }}
          >
            Оставить заявку на замер
          </button>
        </div>
      </section>
    </div>
  );
}

function SectionAbout() {
  return (
    <div className="py-16 px-6" style={{ background: "var(--cream)" }}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="font-display text-5xl font-bold mb-4" style={{ color: "var(--brown-dark)" }}>О компании</h2>
          <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "#7a5c45" }}>
            Профессиональная кровельная компания с 15-летним опытом работы
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="w-full h-72 rounded-2xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #3d2008, #7a3e14)" }}>
              <div className="absolute inset-0 tile-pattern opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display text-7xl font-bold" style={{ color: "#f5a461" }}>2008</div>
                  <div className="font-body text-xl text-white mt-2">год основания</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-display text-3xl font-bold mb-5" style={{ color: "var(--brown-dark)" }}>Кровля Севера — ваш надёжный партнёр</h3>
            <p className="font-body leading-relaxed mb-4" style={{ color: "#6b4c34" }}>
              Мы специализируемся на монтаже кровель для частных домов и коттеджей. За 15 лет работы мы выполнили более 500 проектов в Архангельске, Северодвинске и по всей Архангельской области.
            </p>
            <p className="font-body leading-relaxed" style={{ color: "#6b4c34" }}>
              Наша команда — это сертифицированные кровельщики с многолетним опытом. Мы используем только проверенные материалы ведущих российских и европейских производителей.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: "Award", title: "Гарантия 10 лет", desc: "Мы уверены в качестве наших работ и предоставляем официальную гарантию на каждый выполненный объект." },
            { icon: "Clock", title: "Точно в срок", desc: "Фиксируем сроки в договоре и неукоснительно их соблюдаем. Штрафные санкции за задержку." },
            { icon: "FileCheck", title: "Честные сметы", desc: "Детальная смета до начала работ. Итоговая цена не превышает согласованную без вашего ведома." },
            { icon: "Users", title: "Своя бригада", desc: "Работаем только своими сотрудниками. Никаких случайных субподрядчиков — контроль качества на каждом этапе." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-5 p-6 rounded-2xl" style={{ background: "white", border: "1px solid rgba(196,90,26,0.1)" }}>
              <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(196,90,26,0.1)" }}>
                <Icon name={icon} size={20} style={{ color: "var(--orange-main)" }} />
              </div>
              <div>
                <h4 className="font-display text-lg font-semibold mb-1" style={{ color: "var(--brown-dark)" }}>{title}</h4>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#7a5c45" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div>
          <h3 className="font-display text-3xl font-bold text-center mb-10" style={{ color: "var(--brown-dark)" }}>Наша команда</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Сергей Алексеев", role: "Генеральный директор", exp: "20 лет" },
              { name: "Михаил Громов", role: "Главный инженер", exp: "15 лет" },
              { name: "Алексей Соколов", role: "Бригадир", exp: "12 лет" },
              { name: "Дмитрий Фёдоров", role: "Сметчик", exp: "10 лет" },
            ].map(({ name, role, exp }) => (
              <div key={name} className="text-center p-5 rounded-2xl card-hover" style={{ background: "white", border: "1px solid rgba(196,90,26,0.1)" }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center font-display text-2xl font-bold" style={{ background: "linear-gradient(135deg, var(--orange-main), var(--orange-light))", color: "white" }}>
                  {name[0]}
                </div>
                <div className="font-display text-base font-semibold mb-1" style={{ color: "var(--brown-dark)" }}>{name}</div>
                <div className="font-body text-xs mb-2" style={{ color: "#7a5c45" }}>{role}</div>
                <span className="font-body text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(196,90,26,0.08)", color: "var(--orange-main)" }}>Опыт {exp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionWorks() {
  return (
    <div className="py-16 px-6" style={{ background: "var(--cream)" }}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl font-bold mb-4" style={{ color: "var(--brown-dark)" }}>Наши работы</h2>
          <p className="font-body text-lg" style={{ color: "#7a5c45" }}>Выполненные объекты за последние 3 года</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WORKS.map((w) => (
            <div key={w.id} className="rounded-2xl overflow-hidden card-hover" style={{ background: "white", border: "1px solid rgba(196,90,26,0.1)", boxShadow: "0 4px 16px rgba(122,62,20,0.06)" }}>
              <div className="h-44 flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${w.color}dd, ${w.color}88)` }}>
                <div className="absolute inset-0 tile-pattern" />
                <div className="relative text-center">
                  <Icon name="Home" size={48} style={{ color: "rgba(255,255,255,0.9)" }} />
                  <div className="font-display text-2xl font-bold text-white mt-2">{w.area}</div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: "var(--brown-dark)" }}>{w.title}</h3>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={14} style={{ color: "var(--orange-main)" }} />
                  <span className="font-body text-sm" style={{ color: "#7a5c45" }}>{w.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Materials catalog */}
        <div>
          <div className="text-center mb-10">
            <h3 className="font-display text-3xl font-bold mb-3" style={{ color: "var(--brown-dark)" }}>Каталог материалов</h3>
            <p className="font-body" style={{ color: "#7a5c45" }}>Используемые материалы с описанием и ценами</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {MATERIALS.map((m) => (
              <div key={m.name} className="rounded-2xl p-7 card-hover" style={{ background: "white", border: "1px solid rgba(196,90,26,0.1)", boxShadow: "0 4px 16px rgba(122,62,20,0.06)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${m.color}18` }}>
                      <Icon name={m.icon} size={20} style={{ color: m.color }} />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-bold" style={{ color: "var(--brown-dark)" }}>{m.name}</h4>
                      <span className="font-body text-xs" style={{ color: "#9a7a62" }}>Срок службы: {m.life}</span>
                    </div>
                  </div>
                  <span className="font-display font-bold text-base whitespace-nowrap" style={{ color: m.color }}>{m.price}</span>
                </div>
                <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "#7a5c45" }}>{m.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {m.pros.map((p) => (
                    <span key={p} className="font-body text-xs px-2.5 py-1 rounded-full" style={{ background: `${m.color}12`, color: m.color, border: `1px solid ${m.color}30` }}>{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionReviews({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <div className="py-16 px-6" style={{ background: "var(--cream)" }}>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl font-bold mb-4" style={{ color: "var(--brown-dark)" }}>Отзывы клиентов</h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <StarRating count={5} />
            <span className="font-display text-2xl font-bold" style={{ color: "var(--orange-main)" }}>5.0</span>
          </div>
          <p className="font-body" style={{ color: "#7a5c45" }}>На основе 127 отзывов</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="p-7 rounded-2xl card-hover" style={{ background: "white", border: "1px solid rgba(196,90,26,0.1)", boxShadow: "0 4px 16px rgba(122,62,20,0.06)" }}>
              <StarRating count={r.rating} />
              <p className="font-body text-sm leading-relaxed my-4" style={{ color: "#5a3e2b" }}>"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-white" style={{ background: "var(--orange-main)" }}>{r.name[0]}</div>
                  <div>
                    <div className="font-display text-sm font-semibold" style={{ color: "var(--brown-dark)" }}>{r.name}</div>
                    <div className="font-body text-xs" style={{ color: "#9a7a62" }}>{r.city}</div>
                  </div>
                </div>
                <span className="font-body text-xs" style={{ color: "#b09080" }}>{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-2xl text-center" style={{ background: "linear-gradient(135deg, var(--brown-dark), var(--brown-mid))" }}>
          <div className="font-display text-2xl font-bold text-white mb-2">Доверяют более 500 семей</div>
          <p className="font-body mb-6" style={{ color: "rgba(253,246,237,0.8)" }}>Станьте следующим довольным клиентом — оставьте заявку на бесплатный замер</p>
          <button onClick={onOpenForm} className="px-8 py-3 rounded-xl font-display font-semibold hover:scale-105 transition-transform" style={{ background: "#f5a461", color: "var(--brown-dark)" }}>
            Оставить заявку
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionCalc({ onOpenForm }: { onOpenForm: () => void }) {
  const [area, setArea] = useState(100);
  const [roofType, setRoofType] = useState("dvuskat");
  const [material, setMaterial] = useState("Металлочерепица");
  const [withInsulation, setWithInsulation] = useState(false);
  const [withGutter, setWithGutter] = useState(false);

  const roofCoef = ROOF_TYPES.find((r) => r.id === roofType)?.coef ?? 1;
  const matPrice = MATERIAL_PRICES[material] ?? 850;
  const roofArea = Math.round(area * roofCoef);
  const matCost = roofArea * matPrice;
  const workCost = roofArea * 380;
  const insulationCost = withInsulation ? roofArea * 250 : 0;
  const gutterPerim = Math.round(Math.sqrt(area) * 4);
  const gutterCost = withGutter ? gutterPerim * 450 : 0;
  const total = matCost + workCost + insulationCost + gutterCost;

  return (
    <div className="py-16 px-6" style={{ background: "var(--cream)" }}>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl font-bold mb-4" style={{ color: "var(--brown-dark)" }}>Калькулятор стоимости</h2>
          <p className="font-body text-lg" style={{ color: "#7a5c45" }}>Примерный расчёт — точную смету предоставим после замера</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            {/* Area */}
            <div className="p-6 rounded-2xl" style={{ background: "white", border: "1px solid rgba(196,90,26,0.1)" }}>
              <label className="font-display font-semibold text-base block mb-4" style={{ color: "var(--brown-dark)" }}>
                Площадь дома: <span style={{ color: "var(--orange-main)" }}>{area} м²</span>
              </label>
              <input
                type="range" min={40} max={600} step={10} value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 rounded-full outline-none appearance-none cursor-pointer"
                style={{ accentColor: "var(--orange-main)" }}
              />
              <div className="flex justify-between mt-2">
                <span className="font-body text-xs" style={{ color: "#9a7a62" }}>40 м²</span>
                <span className="font-body text-xs" style={{ color: "#9a7a62" }}>600 м²</span>
              </div>
            </div>

            {/* Roof type */}
            <div className="p-6 rounded-2xl" style={{ background: "white", border: "1px solid rgba(196,90,26,0.1)" }}>
              <div className="font-display font-semibold text-base mb-4" style={{ color: "var(--brown-dark)" }}>Тип кровли</div>
              <div className="grid grid-cols-2 gap-3">
                {ROOF_TYPES.map((rt) => (
                  <button
                    key={rt.id}
                    onClick={() => setRoofType(rt.id)}
                    className="py-2.5 px-3 rounded-xl font-body text-sm font-medium transition-all"
                    style={roofType === rt.id
                      ? { background: "var(--orange-main)", color: "white", boxShadow: "0 4px 12px rgba(196,90,26,0.3)" }
                      : { background: "rgba(196,90,26,0.06)", color: "#6b4c34", border: "1px solid rgba(196,90,26,0.15)" }
                    }
                  >
                    {rt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div className="p-6 rounded-2xl" style={{ background: "white", border: "1px solid rgba(196,90,26,0.1)" }}>
              <div className="font-display font-semibold text-base mb-4" style={{ color: "var(--brown-dark)" }}>Материал кровли</div>
              <div className="space-y-2">
                {Object.keys(MATERIAL_PRICES).map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setMaterial(mat)}
                    className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl font-body text-sm transition-all"
                    style={material === mat
                      ? { background: "var(--orange-main)", color: "white" }
                      : { background: "rgba(196,90,26,0.04)", color: "#6b4c34", border: "1px solid rgba(196,90,26,0.1)" }
                    }
                  >
                    <span>{mat}</span>
                    <span className="font-medium">от {MATERIAL_PRICES[mat].toLocaleString()} ₽/м²</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="p-6 rounded-2xl" style={{ background: "white", border: "1px solid rgba(196,90,26,0.1)" }}>
              <div className="font-display font-semibold text-base mb-4" style={{ color: "var(--brown-dark)" }}>Дополнительно</div>
              <div className="space-y-3">
                {[
                  { label: "Утепление кровли (+250 ₽/м²)", val: withInsulation, set: setWithInsulation },
                  { label: "Водосточная система (+450 ₽/п.м.)", val: withGutter, set: setWithGutter },
                ].map(({ label, val, set }) => (
                  <label key={label} className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => set(!val)}
                      className="w-5 h-5 rounded flex items-center justify-center transition-colors flex-shrink-0"
                      style={{ background: val ? "var(--orange-main)" : "rgba(196,90,26,0.1)", border: val ? "none" : "1px solid rgba(196,90,26,0.3)" }}
                    >
                      {val && <Icon name="Check" size={12} style={{ color: "white" }} />}
                    </div>
                    <span className="font-body text-sm" style={{ color: "#6b4c34" }}>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div>
            <div className="rounded-2xl p-7 sticky top-6" style={{ background: "linear-gradient(145deg, var(--brown-dark) 0%, var(--brown-mid) 100%)", boxShadow: "0 20px 50px rgba(61,32,8,0.3)" }}>
              <h3 className="font-display text-xl font-bold text-white mb-6">Предварительный расчёт</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <span className="font-body text-sm" style={{ color: "rgba(253,246,237,0.7)" }}>Площадь крыши (расчётная)</span>
                  <span className="font-display font-semibold text-white">{roofArea} м²</span>
                </div>
                <div className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <span className="font-body text-sm" style={{ color: "rgba(253,246,237,0.7)" }}>Материалы ({material})</span>
                  <span className="font-display font-semibold text-white">{matCost.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <span className="font-body text-sm" style={{ color: "rgba(253,246,237,0.7)" }}>Монтажные работы</span>
                  <span className="font-display font-semibold text-white">{workCost.toLocaleString()} ₽</span>
                </div>
                {withInsulation && (
                  <div className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <span className="font-body text-sm" style={{ color: "rgba(253,246,237,0.7)" }}>Утепление</span>
                    <span className="font-display font-semibold text-white">{insulationCost.toLocaleString()} ₽</span>
                  </div>
                )}
                {withGutter && (
                  <div className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <span className="font-body text-sm" style={{ color: "rgba(253,246,237,0.7)" }}>Водостоки ({gutterPerim} п.м.)</span>
                    <span className="font-display font-semibold text-white">{gutterCost.toLocaleString()} ₽</span>
                  </div>
                )}
              </div>

              <div className="rounded-xl p-5 mb-6" style={{ background: "rgba(245,164,97,0.15)", border: "1px solid rgba(245,164,97,0.3)" }}>
                <div className="font-body text-sm mb-1" style={{ color: "rgba(253,246,237,0.7)" }}>Итоговая стоимость</div>
                <div className="font-display text-4xl font-bold" style={{ color: "#f5a461" }}>
                  {total.toLocaleString()} ₽
                </div>
              </div>

              <p className="font-body text-xs mb-5" style={{ color: "rgba(253,246,237,0.5)" }}>
                * Расчёт приблизительный. Точная стоимость определяется после выезда специалиста и осмотра объекта.
              </p>

              <button onClick={onOpenForm} className="w-full py-4 rounded-xl font-display font-bold text-lg transition-all hover:scale-105" style={{ background: "#f5a461", color: "var(--brown-dark)" }}>
                Заказать точный расчёт
              </button>
              <div className="text-center mt-3">
                <span className="font-body text-xs" style={{ color: "rgba(253,246,237,0.5)" }}>Выезд на замер — бесплатно</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О компании" },
  { id: "works", label: "Наши работы" },
  { id: "reviews", label: "Отзывы" },
  { id: "calc", label: "Калькулятор" },
];

function CookieConsent() {
  const [visible, setVisible] = useState(() => !localStorage.getItem("pd_consent"));

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] px-4 pb-4"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="container mx-auto max-w-3xl rounded-2xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-4"
        style={{
          background: "var(--brown-dark)",
          boxShadow: "0 -4px 40px rgba(61,32,8,0.35)",
          border: "1px solid rgba(232,129,58,0.2)",
          pointerEvents: "all",
        }}
      >
        <div className="flex-1">
          <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(253,246,237,0.85)" }}>
            Нажимая «Принять», вы соглашаетесь на обработку персональных данных в соответствии с{" "}
            <span style={{ color: "#f5a461", textDecoration: "underline", cursor: "pointer" }}>
              политикой конфиденциальности
            </span>
            . Мы используем данные только для связи с вами по вашему запросу.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={() => { localStorage.setItem("pd_consent", "1"); setVisible(false); }}
            className="px-5 py-2.5 rounded-xl font-display font-semibold text-sm transition-all hover:scale-105"
            style={{ background: "var(--orange-main)", color: "white" }}
          >
            Принять
          </button>
          <button
            onClick={() => setVisible(false)}
            className="px-5 py-2.5 rounded-xl font-display font-semibold text-sm transition-all hover:opacity-70"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(253,246,237,0.7)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [tab, setTab] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      {showForm && <LeadForm onClose={() => setShowForm(false)} />}
      <CookieConsent />
      {/* NAV */}
      <nav className="sticky top-0 z-50" style={{ background: "rgba(253,246,237,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(196,90,26,0.12)" }}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => setTab("home")} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--orange-main)" }}>
              <Icon name="Home" size={18} style={{ color: "white" }} />
            </div>
            <span className="font-display text-xl font-bold" style={{ color: "var(--brown-dark)" }}>Кровля Севера</span>
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`nav-link font-body font-medium text-sm pb-0.5 ${tab === t.id ? "active" : ""}`}
                style={{ color: tab === t.id ? "var(--orange-main)" : "var(--brown-dark)" }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button onClick={() => setShowForm(true)} className="px-5 py-2.5 rounded-xl font-display font-semibold text-sm hover:scale-105 transition-transform" style={{ background: "var(--orange-main)", color: "white" }}>
              Оставить заявку
            </button>
          </div>

          {/* Mobile */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} style={{ color: "var(--brown-dark)" }} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2" style={{ borderTop: "1px solid rgba(196,90,26,0.1)" }}>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setMobileOpen(false); }}
                className="w-full text-left py-3 px-4 rounded-xl font-body font-medium"
                style={{ background: tab === t.id ? "rgba(196,90,26,0.1)" : "transparent", color: tab === t.id ? "var(--orange-main)" : "var(--brown-dark)" }}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* CONTENT */}
      <main>
        {tab === "home" && <SectionHome setTab={setTab} onOpenForm={() => setShowForm(true)} />}
        {tab === "about" && <SectionAbout />}
        {tab === "works" && <SectionWorks />}
        {tab === "reviews" && <SectionReviews onOpenForm={() => setShowForm(true)} />}
        {tab === "calc" && <SectionCalc onOpenForm={() => setShowForm(true)} />}
      </main>

      {/* FOOTER */}
      <footer className="py-12 px-6" style={{ background: "var(--brown-dark)" }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--orange-main)" }}>
                  <Icon name="Home" size={18} style={{ color: "white" }} />
                </div>
                <span className="font-display text-xl font-bold text-white">Кровля Севера</span>
              </div>
              <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(253,246,237,0.6)" }}>
                Профессиональный монтаж кровли для частных домов. Работаем с 2008 года.
              </p>
            </div>
            <div>
              <div className="font-display font-semibold mb-4" style={{ color: "#f5a461" }}>Контакты</div>
              <div className="space-y-2 font-body text-sm" style={{ color: "rgba(253,246,237,0.7)" }}>
                <div className="flex items-center gap-2"><Icon name="Phone" size={14} style={{ color: "#f5a461" }} /> +7 (960) 007-99-05</div>
                <div className="flex items-center gap-2"><Icon name="Mail" size={14} style={{ color: "#f5a461" }} /> krovlya.severa@gmail.com</div>
                <div className="flex items-center gap-2"><Icon name="MapPin" size={14} style={{ color: "#f5a461" }} /> Архангельск и Архангельская область</div>
              </div>
            </div>
            <div>
              <div className="font-display font-semibold mb-4" style={{ color: "#f5a461" }}>Режим работы</div>
              <div className="font-body text-sm space-y-1" style={{ color: "rgba(253,246,237,0.7)" }}>
                <div>Пн–Пт: 8:00 — 20:00</div>
                <div>Сб: 9:00 — 18:00</div>
                <div>Вс: по договорённости</div>
              </div>
            </div>
          </div>
          <div className="pt-6 text-center font-body text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(253,246,237,0.35)" }}>
            © 2024 Кровля Севера. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}