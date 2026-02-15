import { useMemo } from "react";
import "./Press.css";
import { pressItems } from "../../../data/press";
import CUTOUT from "../../../assets/accordion-artist.png";
import imgAccordeon from "../../../assets/parallax-image2.jpg";
import PrettyImage from "../../image-components/PrettyImage/PrettyImage";

function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

function getFavicon(url) {
  const domain = getDomain(url);
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : "";
}

/** Detecta links tipo: https://www.yumpu.com/en/document/read/<id>/<slug>/<page> */
function getYumpuMeta(url) {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("yumpu.com")) return null;

    const parts = u.pathname.split("/").filter(Boolean);
    // ["en","document","read","67160034","billboard-ar-agosto-2022","78"]
    const page = parts[parts.length - 1];
    const slug = parts[parts.length - 2] || "";
    const isPageNumber = /^\d+$/.test(page);

    const prettySlug = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
      page: isPageNumber ? page : "",
      title: prettySlug || "Documento",
      chip: isPageNumber ? `PDF · p. ${page}` : "PDF",
    };
  } catch {
    return null;
  }
}

export default function Press() {
  // ✅ featured primero, luego por fecha
  const items = useMemo(() => {
    return [...pressItems].sort((a, b) => {
      if (!!b.featured !== !!a.featured) return b.featured ? -1 : 1; // ✅ FIX
      return String(b.date).localeCompare(String(a.date));
    });
  }, []);

  return (
    <section id="prensa" className="press">
      <div className="container">
        <div className="press__head">
          <h2>Prensa</h2>
          <p className="muted">Notas, entrevistas y menciones.</p>
        </div>

        <ul className="press__list">
          {items.map((p) => {
            const domain = getDomain(p.url);
            const favicon = getFavicon(p.url);
            const yumpu = getYumpuMeta(p.url);

            const chipLabel = p.kind === "pdf" ? "PDF" : yumpu?.chip || "Press";

            // Si es yumpu y no te pasaron title/outlet lindo, lo mejoramos:
            const title = p.title || yumpu?.title || "Nota de prensa";
            const outlet = p.outlet || (yumpu ? "Yumpu" : domain || "Sitio web");

            return (
              <li
                key={`${title}-${p.url}`}
                className={`pressCard card ${
                  p.featured ? "pressCard--featured" : ""
                }`}
              >
                <div className="pressCard__content">
                  <div className="pressCard__top">
                    <div className="pressCard__titleWrap">
                      <h4 className="pressCard__title">{title}</h4>

                      <div className="pressCard__meta muted">
                        {outlet}
                        {p.date ? ` · ${p.date}` : ""}
                        {yumpu?.page ? ` · pág. ${yumpu.page}` : ""}
                      </div>
                    </div>

                    <a
                      className="btn btn-secondary pressCard__btn"
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver
                    </a>
                  </div>

                  {/* ✅ Layout nuevo: preview + (si featured) columna del cutout */}
                  <div
                    className={`pressCard__layout ${
                      p.featured ? "pressCard__layout--featured" : ""
                    }`}
                  >
                    {/* Preview */}
                    <div className="pressCard__preview" aria-hidden="true">
                      <div className="pressCard__site">
                        {favicon && (
                          <img
                            className="pressCard__favicon"
                            src={favicon}
                            alt=""
                          />
                        )}

                        <div className="pressCard__domain">
                          {domain || "sitio web"}
                        </div>

                        <span
                          className={`pressCard__chip ${
                            chipLabel === "PDF" || chipLabel.startsWith("PDF")
                              ? "pressCard__chip--pdf"
                              : ""
                          }`}
                        >
                          {chipLabel}
                        </span>
                      </div>

                      {/* thumb / embed */}
                      <div className="pressCard__thumb">
                        {p.kind === "embed" && p.embedUrl ? (
                          <div className="pressCard__iframeWrap">
                            <iframe
                              className="pressCard__iframe"
                              src={
                                p.page ? `${p.embedUrl}#page=${p.page}` : p.embedUrl
                              }
                              title={title}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              allowFullScreen
                            />

                            {/* ✅ overlay clickeable + CTA */}
                            <a
                              className="pressCard__iframeOverlay"
                              href={p.url}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Abrir ${title} en una nueva pestaña`}
                            >
                              <span className="pressCard__overlayBtn">
                                Abrir en Yumpu
                              </span>
                            </a>
                          </div>
                        ) : (
                          <div className="pressCard__thumbGradient" />
                        )}
                      </div>
                    </div>

                    {/* ✅ Cutout SOLO si featured, ahora en columna separada (no tapa) */}
                    {p.featured && (
                      <div className="pressCard__cutoutCol" aria-hidden="true">
                        <img src={CUTOUT} alt="" />
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* ✅ Evitamos section dentro de section */}
       <div className="press__imageBlock">

          <PrettyImage
            src={imgAccordeon}
            alt="Flor tocando el acordeón"
            height="72vh"
            fit="contain"
            radius="24px"
            overlay={false}
            animate={true}
          />
        </div>
      </div>
    </section>
  );
}
