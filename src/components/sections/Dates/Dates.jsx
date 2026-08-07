import { useMemo } from "react";
import "./Dates.css";
import { dates } from "../../../data/dates";

const DOW_ES = {
  Mon: "Lunes",
  Tue: "Martes",
  Wed: "Miércoles",
  Thu: "Jueves",
  Fri: "Viernes",
  Sat: "Sábado",
  Sun: "Domingo",
};

function formatDaysEs(days = []) {
  const names = days.map((d) => DOW_ES[d] || d);
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} y ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
}

function monthTitle(ym) {
  if (!ym) return "Fechas";
  const [y, m] = ym.split("-").map(Number);
  const dt = new Date(y, m - 1, 1);
  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(dt);
}

function getCurrentMonthKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

export default function Dates() {
  const groups = useMemo(() => {
    const map = new Map();

    for (const it of dates) {
      // ✅ month puede ser string o array
      const rawMonths = Array.isArray(it.month)
        ? it.month
        : [it.month || "unknown"];

      const months = rawMonths.map((m) =>
        m === "current" ? getCurrentMonthKey() : m
      );

      for (const monthKey of months) {
        if (!map.has(monthKey)) map.set(monthKey, []);
        map.get(monthKey).push({ ...it, month: monthKey }); // normalizo month a string
      }
    }

    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, []);

  return (
    <section id="fechas" className="dates" aria-label="Fechas de presentación">
      <div className="container">
        <header className="dates__head">
          <h2>Fechas</h2>
          <p className="muted">Cuándo y dónde verla.</p>
        </header>

        <div className="dates__listWrap">
          {groups.map(([monthKey, items]) => (
            <div key={monthKey} className="dates__group">
              <h3 className="dates__month">
                {monthKey === "unknown" ? "Próximamente" : monthTitle(monthKey)}
              </h3>

              <ul className="dates__list" role="list">
                {items.map((it, idx) => {
                  const daysText =
                    it.type === "weekly"
                      ? formatDaysEs(it.days)
                      : it.dateLabel || it.event || "";

                  const hasDays = Boolean(daysText);
                  const isFeatured = Boolean(it.featured);

                  const href = it.ticketUrl || it.mapUrl || "#";
                  const isClickable = Boolean(it.ticketUrl || it.mapUrl);

                  return (
                    <li
                      key={`${it.venue}-${it.time}-${idx}`}
                      className={`dates__item ${isFeatured ? "dates__item--featured" : ""}`}
                    >
                      <a
                        className={`dates__link ${isFeatured ? "dates__link--featured" : ""}`}
                        href={href}
                        target={isClickable ? "_blank" : undefined}
                        rel={isClickable ? "noreferrer" : undefined}
                        aria-label={`Ver información: ${it.venue}`}
                      >
                        {isFeatured && (
                          <div className="dates__featuredBadge">
                            <span>{it.note}</span>
                          </div>
                        )}

                        <div className="dates__mainRow">
                          <span className="dates__main">
                            {isFeatured ? (
                              <>
                                <span className="dates__featuredTitle">
                                  {it.event}
                                </span>
                                <span className="dates__featuredMeta">
                                  {it.dateLabel} · {it.time} hs.
                                </span>
                              </>
                            ) : (
                              <>
                                {hasDays && (
                                  <span className="dates__days">
                                    {daysText}
                                  </span>
                                )}
                                {hasDays && (
                                  <span
                                    className="dates__dot"
                                    aria-hidden="true"
                                  >
                                    {" "}
                                    ·{" "}
                                  </span>
                                )}
                                <span className="dates__time">{it.time}</span>
                                <span
                                  className="dates__dash"
                                  aria-hidden="true"
                                >
                                  {" "}
                                  —{" "}
                                </span>
                                <span className="dates__venue">{it.venue}</span>
                              </>
                            )}
                          </span>

                          {isClickable && (
                            <span className="dates__arrow" aria-hidden="true">
                              ↗
                            </span>
                          )}
                        </div>

                        <div className="dates__subRow">
                          <span className="dates__pin" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                              <path
                                d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z"
                                fill="currentColor"
                                opacity="0.95"
                              />
                              <circle
                                cx="12"
                                cy="10"
                                r="2.6"
                                fill="rgba(15,11,12,0.75)"
                              />
                            </svg>
                          </span>

                          <span className="dates__addr">
                            {it.addressShort || it.venue}
                          </span>
                          <span className="dates__sep" aria-hidden="true">
                            ·
                          </span>
                          <span className="dates__city">{it.city}</span>
                        </div>

                        {isFeatured && (
                          <div className="dates__featuredInfo">
                            {it.priceLabel && <span>{it.priceLabel}</span>}
                            {it.reservationPhone && (
                              <span>Reservas: {it.reservationPhone}</span>
                            )}
                            {it.paymentInfo && <span>{it.paymentInfo}</span>}
                          </div>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
