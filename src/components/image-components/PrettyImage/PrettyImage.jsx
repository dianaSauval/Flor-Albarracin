import { useEffect, useRef, useState } from "react";
import "./PrettyImage.css";

export default function PrettyImage({
  src,
  alt = "",
  height = "70vh",
  fit = "contain",
  position = "center",
  radius = "22px",
  bleed = false,
  overlay = false,
  animate = true,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(!animate);

  useEffect(() => {
    if (!animate) return;

    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ✅ En pantallas chicas: no te la juegues a que el IO falle → mostrala
    const isSmall =
      window.matchMedia && window.matchMedia("(max-width: 768px)").matches;

    if (prefersReduced || isSmall) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      {
        threshold: 0.01,
        rootMargin: "200px 0px", // ✅ dispara antes (mejor para lazy/anim)
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <section className={`pi ${bleed ? "pi--bleed" : ""}`}>
      <div className={`pi__inner ${bleed ? "" : "container"}`}>
        <div
          ref={ref}
          className={`pi__wrap ${visible ? "is-visible" : ""} ${
            animate ? "is-animated" : ""
          }`}
          style={{
            "--pi-h": height,
            "--pi-radius": radius,
            "--pi-pos": position,
          }}
        >
          <img
            className={`pi__img ${fit === "cover" ? "is-cover" : "is-contain"}`}
            src={src}
            alt={alt}
            // ✅ cuando hay animación, evitá lazy (sobre todo en mobile)
            loading={animate ? "eager" : "lazy"}
            decoding="async"
            style={{ objectPosition: position }}
          />

          {overlay && <div className="pi__overlay" aria-hidden="true" />}
        </div>
      </div>
    </section>
  );
}
