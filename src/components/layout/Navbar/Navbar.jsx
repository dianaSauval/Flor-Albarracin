import { useEffect, useId, useState } from "react";
import "./Navbar.css";

const links = [
  { id: "inicio", label: "Inicio" },
  { id: "bio", label: "Biografía" },
  { id: "multimedia", label: "Multimedia" },
  { id: "prensa", label: "Prensa" },
  { id: "fechas", label: "Fechas" },
  { id: "contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const handleScroll = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  // Cerrar con ESC + bloquear scroll cuando está abierto
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="fa-nav" aria-label="Navegación principal">
      <a
        className="fa-nav__brand"
        href="#inicio"
        onClick={handleScroll("inicio")}
        aria-label="Ir al inicio"
      >
        <span className="fa-nav__brandTitle">Flor</span>
        <span className="fa-nav__brandTitle fa-nav__brandTitle--accent">
          Albarracín
        </span>
      </a>

      {/* Links desktop */}
      <ul className="fa-nav__links" aria-label="Secciones">
        {links.map((l) => (
          <li key={l.id}>
            <a className="fa-nav__link" href={`#${l.id}`} onClick={handleScroll(l.id)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="fa-nav__actions">
        <a
          className="btn btn-secondary fa-nav__booking"
          href="#contacto"
          onClick={handleScroll("contacto")}
        >
          Booking
        </a>

        {/* Hamburguesa (mobile/tablet) */}
        <button
          type="button"
          className={`fa-nav__burger ${open ? "is-open" : ""}`}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="fa-nav__burgerLines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {/* Overlay + Panel móvil */}
      <div
        className={`fa-nav__overlay ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <div
        id={panelId}
        className={`fa-nav__panel ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
      >
        <div className="fa-nav__panelHeader">
          <div className="fa-nav__panelTitle">Menú</div>
          <button
            type="button"
            className="fa-nav__panelClose"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        <ul className="fa-nav__panelLinks">
          {links.map((l) => (
            <li key={l.id}>
              <a className="fa-nav__panelLink" href={`#${l.id}`} onClick={handleScroll(l.id)}>
                <span>{l.label}</span>
                <span className="fa-nav__chev" aria-hidden="true">›</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="fa-nav__panelFooter">
          <a className="btn btn-secondary fa-nav__panelBtn" href="#contacto" onClick={handleScroll("contacto")}>
            Booking
          </a>
        </div>
      </div>
    </nav>
  );
}
