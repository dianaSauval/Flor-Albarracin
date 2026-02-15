import "./MediaCard.css";

export default function MediaCard({
  kind = "youtube",
  title,
  subtitle,
  embedUrl,
  href,
  showCutout = false,
  cutoutSrc,
  cutoutAlt = "",
}) {
  const isYoutube = kind === "youtube";

  return (
    <article className={`mmCard mmCard--${kind} ${showCutout ? "mmCard--featured" : ""}`}>
      {/* Frame mantiene bordes */}
      <div className="mmCard__frame card">
        <header className="mmCard__top">
          <div>
            <h4 className="mmCard__title">{title}</h4>
            <p className="mmCard__subtitle">{subtitle}</p>
          </div>

          {href ? (
            <a
              className="btn btn-secondary"
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              Abrir
            </a>
          ) : (
            <button className="btn btn-secondary" disabled>
              Abrir
            </button>
          )}
        </header>

        <div className="mmCard__body">
          {embedUrl ? (
            <div
              className={`embed mmCard__embed ${kind === "spotify" ? "mmCard__embed--spotify" : ""}`}
            >
              <iframe
                src={embedUrl}
                title={title}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </div>
          ) : (
            <div className="mmCard__placeholder">
              Falta pegar el link de {isYoutube ? "YouTube" : "Spotify"}.
            </div>
          )}
        </div>
      </div>

      {/* Ella sale del frame */}
      {showCutout && cutoutSrc && (
        <div className="mmCard__cutout" aria-hidden="true">
          <img src={cutoutSrc} alt={cutoutAlt} />
        </div>
      )}
    </article>
  );
}
