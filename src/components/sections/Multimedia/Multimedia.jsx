import "./Multimedia.css";
import MediaCard from "./MediaCard";

// ✅ 1) Import del video local
import liveVideo from "../../../assets/media/video-en-vivo.mp4";
// (opcional) import posterLive from "../../../assets/media/poster-en-vivo.jpg";

const youtubeItems = [
   {
    title: "CORAZÓN DE GUERRERA",
    subtitle: "videoclip",
    embedUrl: "https://www.youtube.com/embed/e29u3aCaa44",
    href: "https://www.youtube.com/watch?v=e29u3aCaa44",
    featured: true,
  },
  {
    title: "TIGRESA",
    subtitle: "videoclip",
    embedUrl: "https://www.youtube.com/embed/LqrzomrjK9k",
    href: "https://www.youtube.com/watch?v=LqrzomrjK9k",
    featured: false,
  },
  {
    title: "FLORES SIN PRISA",
    subtitle: "videoclip",
    embedUrl: "https://www.youtube.com/embed/myZsWzhIu2M",
    href: "https://www.youtube.com/watch?v=myZsWzhIu2M",
    featured: false,
  },
];

const spotifyItems = [
  {
    title: "Spotify",
    subtitle: "Escuchá la música",
    embedUrl: "https://open.spotify.com/embed/artist/13Et5J3XoXHnJRgWaBdSbJ",
    href: "https://open.spotify.com/artist/13Et5J3XoXHnJRgWaBdSbJ",
  },
];

export default function Multimedia() {
  return (
    <section id="multimedia" className="mm">
      <div className="container">
        <div className="mm__head">
          <h2>Multimedia</h2>
          <p className="muted">Videos y música para entrar en el clima.</p>
        </div>

        {/* Grid YouTube / Spotify */}
        <div className="mm__grid">
          {/* YouTube */}
          <div className="mm__col">
            <div className="mm__label">
              <span className="mm__dot" />
              <h3>YouTube</h3>
            </div>

            <div className="mm__cards mm__cards--youtube">
              {youtubeItems.map((item, idx) => (
                <MediaCard
                  key={`yt-${idx}`}
                  kind="youtube"
                  {...item}
                  showCutout={false}
                />
              ))}
            </div>
          </div>

          {/* Spotify */}
          <div className="mm__col">
            <div className="mm__label">
              <span className="mm__dot mm__dot--gold" />
              <h3>Spotify</h3>
            </div>

            {spotifyItems.map((item, idx) => (
              <MediaCard
                key={`sp-${idx}`}
                kind="spotify"
                {...item}
                showCutout={false}
              />
            ))}
          </div>
        </div>

        {/* ✅ NUEVA SECCIÓN: En vivo (video vertical) */}
        <div className="mm__live">
          <div className="mm__label mm__label--live">
            <span className="mm__dot mm__dot--live" />
            <h3>En vivo</h3>
          </div>

          <div className="mm__liveCard card">
            <div className="mm__liveTop">
              <div>
                <h4 className="mm__liveTitle">Video en vivo</h4>
                <p className="mm__liveSubtitle muted">
                  Un fragmento con público.
                </p>
              </div>

              {/* opcional: botón para descargar o abrir en nueva pestaña si lo ponés en public */}
              {/* <a className="btn btn-secondary mm__liveBtn" href={liveVideo} target="_blank" rel="noreferrer">Abrir</a> */}
            </div>

            <div className="mm__liveFrame embed">
              <video
                className="mm__liveVideo"
                controls
                playsInline
                preload="metadata"
                // poster={posterLive}
              >
                <source src={liveVideo} type="video/mp4" />
                Tu navegador no soporta video HTML5.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}