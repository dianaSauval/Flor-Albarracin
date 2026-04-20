import "./Footer.css";
import { socials } from "../../../data/socials"; // ajustá el path si hace falta
import { FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";

function getHandle(label, url) {
  try {
    const u = new URL(url);

    if (label.toLowerCase() === "instagram") {
      // /soyfloralbarracin/
      const parts = u.pathname.split("/").filter(Boolean);
      const user = parts[0] || "instagram";
      return `@${user}`;
    }

    if (label.toLowerCase() === "youtube") {
      // /@floralbarracin8577  ó  /channel/...
      const parts = u.pathname.split("/").filter(Boolean);
      const first = parts[0] || "";
      if (first.startsWith("@")) return first; // ya viene @handle
      if (first === "channel" && parts[1]) return "YouTube Channel";
      if (first) return first.replace("@", "");
      return "YouTube";
    }

    if (label.toLowerCase() === "spotify") {
      return "Flor Albarracín";
    }

    return label;
  } catch {
    return label;
  }
}

function getIcon(label) {
  const key = label.toLowerCase();
  if (key === "instagram") return FaInstagram;
  if (key === "youtube") return FaYoutube;
  if (key === "spotify") return FaSpotify;
  return FaInstagram;
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__glow" aria-hidden="true" />
      <div className="footer__topline" aria-hidden="true" />

      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__name">Flor Albarracín</div>
          <div className="footer__tag muted">Escena · movimiento · presencia</div>
        </div>

        <nav className="footer__nav" aria-label="Redes sociales">
          <ul className="footer__socials">
            {socials.map((s) => {
              const Icon = getIcon(s.label);
              const handle = getHandle(s.label, s.url);

              return (
                <li key={s.label}>
                  <a
                    className="footer__social"
                    data-net={s.label.toLowerCase()}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="footer__icon" aria-hidden="true">
                      <Icon />
                      <span className="footer__ring" aria-hidden="true" />
                    </span>

                    <span className="footer__socialText">
                      <span className="footer__platform">{s.label}</span>
                      <span className="footer__handle">{handle}</span>
                    </span>

                    <span className="footer__spark" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="footer__meta">
          <small className="footer__copy">
            Flor Albarracín · Todos los derechos reservados
          </small>

          <small className="footer__dev">
            © {year} · Sitio web desarrollado por{" "}
            <a
              className="footer__devLink"
              href="https://dianasauvaldigital.com.ar/"
              target="_blank"
              rel="noreferrer"
            >
              Diana Sauval
            </a>
          </small>
        </div>
      </div>
    </footer>
  );
}
