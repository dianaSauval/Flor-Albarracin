import { useEffect } from "react";
import "./Contact.css";
import contactBg from "../../../assets/contact-flor.jpg";
import { socials, manager, contactEmail } from "../../../data/socials";

import {
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const iconByLabel = {
  Instagram: FaInstagram,
  Spotify: FaSpotify,
  YouTube: FaYoutube,
};

export default function Contact() {
  useEffect(() => {
    const section = document.getElementById("contacto");
    if (!section) return;

    let rafId = null;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      const progress = (vh - rect.top) / (vh + rect.height);
      const p = Math.min(1, Math.max(0, progress));

      const y = (p - 0.5) * 80;
      section.style.setProperty("--bg-y", `${y}px`);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        update();
        rafId = null;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className="fa-contact"
      id="contacto"
      aria-label="Contacto"
      style={{ "--contact-bg": `url(${contactBg})` }}
    >
      <div className="container fa-contact__content">
        <header className="fa-contact__header">
          <h2 className="fa-contact__title">Contacto</h2>
          <p className="fa-contact__subtitle">
            Shows, prensa y colaboraciones. Escribinos y armamos algo a medida.
          </p>
        </header>

        <div className="fa-contact__grid">
          {/* Redes + Email */}
          <article className="fa-contact__card">
            <div className="fa-contact__cardHead">
              <h3 className="fa-contact__cardTitle">Redes</h3>
              <span className="fa-contact__hint">seguí el pulso</span>
            </div>

            <div className="fa-contact__socialRow">
              {socials.map((s) => {
                const Icon = iconByLabel[s.label] || FaInstagram;
                return (
                  <a
                    key={s.label}
                    className="fa-contact__social"
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <span className="fa-contact__socialGlow" aria-hidden="true" />
                    <Icon className="fa-contact__socialIcon" aria-hidden="true" />
                    <span className="fa-contact__socialLabel">{s.label}</span>
                  </a>
                );
              })}
            </div>

            {/* ✅ EMAIL debajo de redes */}
            <div className="fa-contact__emailUnderSocials">
              <a className="fa-contact__chip" href={`mailto:${contactEmail}`}>
                <FaEnvelope aria-hidden="true" />
                <span>{contactEmail}</span>
              </a>
            </div>
          </article>

          {/* Manager (solo tel) */}
          <article className="fa-contact__card">
            <div className="fa-contact__cardHead">
              <h3 className="fa-contact__cardTitle">Manager</h3>
              <span className="fa-contact__hint">booking</span>
            </div>

            <p className="fa-contact__managerName">
              <strong>{manager.name}</strong>
            </p>

            <div className="fa-contact__actions">
              <a
                className="fa-contact__chip fa-contact__chip--ghost"
                href={`tel:${manager.phone.replace(/\s/g, "")}`}
              >
                <FaPhoneAlt aria-hidden="true" />
                <span>{manager.phone}</span>
              </a>
            </div>

            <p className="fa-contact__fine">
              Eventos · Teatros · Festivales · Producciones
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
