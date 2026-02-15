import "./Multimedia.css";
import MediaCard from "./MediaCard";

const youtubeItems = [
  {
    title: "TIGRESA",
    subtitle: "videoclip",
    embedUrl: "https://www.youtube.com/embed/LqrzomrjK9k",
    href: "https://www.youtube.com/watch?v=LqrzomrjK9k",
    featured: true,
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
      </div>
    </section>
  );
}
