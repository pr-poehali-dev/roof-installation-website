import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SEND_LEAD_URL } from "./data";

export default function LeadForm({ onClose }: { onClose: () => void }) {
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
