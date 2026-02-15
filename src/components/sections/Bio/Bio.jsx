import { useEffect, useRef, useState } from "react";
import "./Bio.css";
import Image from "../../../assets/parallax-image.jpg";
import bioImg from "../../../assets/bio-flor.jpg";
import ParallaxImage from "../../image-components/ParallaxImage/ParallaxImage";

export default function Bio() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);

  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const [isVisible, setIsVisible] = useState(false);

  // Reveal al scrollear
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.22 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Micro-parallax (solo desktop con mouse/pointer)
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finePointer =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (prefersReduced || !finePointer) return;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const animate = () => {
      // easing suave
      currentRef.current.x +=
        (targetRef.current.x - currentRef.current.x) * 0.08;
      currentRef.current.y +=
        (targetRef.current.y - currentRef.current.y) * 0.08;

      // set CSS vars
      frame.style.setProperty("--px", currentRef.current.x.toFixed(2));
      frame.style.setProperty("--py", currentRef.current.y.toFixed(2));

      rafRef.current = requestAnimationFrame(animate);
    };

    const onMove = (e) => {
      const rect = frame.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width; // 0..1
      const relY = (e.clientY - rect.top) / rect.height; // 0..1

      // Convertimos a -1..1
      const nx = (relX - 0.5) * 2;
      const ny = (relY - 0.5) * 2;

      // Intensidad (micro!)
      const ix = clamp(nx, -1, 1) * 8; // px
      const iy = clamp(ny, -1, 1) * 8; // px

      targetRef.current = { x: ix, y: iy };
      if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
    };

    const onLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };

    frame.addEventListener("mousemove", onMove);
    frame.addEventListener("mouseleave", onLeave);

    return () => {
      frame.removeEventListener("mousemove", onMove);
      frame.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  return (
    <>
      <section id="biografia">
        <div className="container">
          <div
            ref={sectionRef}
            className={`fa-bio ${isVisible ? "is-visible" : ""}`}
          >
            {/* Media */}
            <div className="fa-bio__media">
              <div ref={frameRef} className="fa-bio__frame">
                <img
                  className="fa-bio__img"
                  src={bioImg}
                  alt="Flor Albarracín en escena"
                  loading="lazy"
                />
                <div className="fa-bio__shine" aria-hidden="true" />
              </div>

              <div className="fa-bio__caption muted">
                Foto: <span className="fa-bio__credit">@tutedelacroix</span>
              </div>
            </div>

            {/* Content */}
            <div className="fa-bio__content">
              <h3>Biografía</h3>

              <h2 className="fa-bio__title">Una artista entre lo íntimo y lo escénico</h2>

              <p>
                Flor Albarracín es una cantautora, actriz y multiinstrumentista
                nacida en Buenos Aires. Escribe y produce sus canciones y a lo
                largo de su carrera se desempeñó como artista en diversos
                proyectos musicales. También compone música para cine, teatro y
                actuó en varias producciones teatrales.
              </p>

              <p>
                Su primer disco solista, <em>Mujer Jardín</em>, tuvo un cálido
                recibimiento del público y de la prensa, y fue presentado a sala
                llena en el teatro Hasta Trilce.
              </p>

              <p>
                Actualmente se encuentra terminando su segundo álbum,{" "}
                <em>Corazón de Guerrera</em>. Un viaje musical con canciones
                sensibles y un sonido potente que encara una búsqueda interior
                que se transforma en fuerza para alzar la voz.
              </p>

              <div className="fa-bio__actions">
                <a className="btn btn-secondary" href="#prensa">
                  Ver prensa
                </a>
                <a className="btn btn-primary" href="#contacto">
                  Booking / Contacto
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <ParallaxImage
          className="fa-parallax--piano"
          image={Image}
          height="560px"
          position="center 25%"
          saturation={1.3}
          contrast={1.12}
          brightness={1.05}
          boostOpacity={0.9}
          radius="26px"
        />
      </div>
    </>
  );
}
