import { useEffect, useRef, useState } from "react";
import "./PrettyImage.css";

export default function PrettyImage({
  src,
  alt = "",
  height = "70vh",
  fit = "contain",          // "contain" o "cover"
  position = "center",      // ej: "center 30%"
  radius = "22px",
  bleed = false,            // full width si true
  overlay = false,          // por defecto lo apago (queda más “flotante”)
  animate = true,           // float + reveal
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(!animate);

  useEffect(() => {
    if (!animate) return;

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 }
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
            loading="lazy"
            style={{ objectPosition: position }}
          />

          {overlay && <div className="pi__overlay" aria-hidden="true" />}
        </div>
      </div>
    </section>
  );
}
