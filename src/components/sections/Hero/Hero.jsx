import "./Hero.css";
import heroImg from "../../../assets/hero-flor.jpg";

export default function Hero() {
  const handleScroll = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fa-hero">
      <div
        className="fa-hero__bg"
        style={{ backgroundImage: `url(${heroImg})` }}
        aria-hidden="true"
      />

      <div className="container fa-hero__content">
        <div className="fa-hero__text">
          <h1 className="fa-hero__title">
            Flor <span>Albarracín</span>
          </h1>

          <p className="fa-hero__subtitle">Rompe la oscuridad</p>

          <p className="fa-hero__role">
            Cantautora, actriz y multiinstrumentista de Buenos Aires, Argentina
          </p>

          <div className="fa-hero__ctas">
            <a
              className="btn btn-primary"
              href="#fechas"
              onClick={handleScroll("fechas")}
            >
              Ver fechas
            </a>
            <a
              className="btn btn-secondary"
              href="#contacto"
              onClick={handleScroll("contacto")}
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
