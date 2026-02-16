import { useEffect, useRef } from "react";
import "./ParallaxImage.css";

export default function ParallaxImage({
  image,
  fit = "cover",
  height = "70vh",
  minHeight = "420px",
  position = "center 30%",
  radius = "22px",
  saturation = 1.22,
  contrast = 1.08,
  brightness = 1.03,
  boostOpacity = 0.95,
  className = "",
  mobileStrength = 1, // 1 = “como fixed”; bajá a 0.8 si querés más suave
  children,
}) {
  const ref = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    // Solo lo activamos en mobile/tablet (donde fixed suele fallar)
    const mq = window.matchMedia("(max-width: 820px)");
    if (!mq.matches) return;

    let elTop = 0;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      elTop = rect.top + window.scrollY;
    };

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const update = () => {
      raf.current = null;

      const rect = el.getBoundingClientRect();
      const h = rect.height || 1;

      const scrolledPast = window.scrollY - elTop;
      const raw = scrolledPast * mobileStrength;

      // Limitamos para que no se vean bordes (porque el bg tiene inset negativo)
      const maxShift = h * 0.28;
      const y = clamp(raw, -maxShift, maxShift);

      el.style.setProperty("--pi-y", `${y.toFixed(2)}px`);
    };

    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(update);
    };

    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      measure();
      onScroll();
    };
    window.addEventListener("resize", onResize);

    // ✅ Recalcular también si el bloque cambia de tamaño (rotación, fuentes, etc.)
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(el);

    // Por si el breakpoint cambia mientras estás en la página
    const onMqChange = () => {
      if (!mq.matches) {
        el.style.removeProperty("--pi-y");
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        ro.disconnect();
      } else {
        measure();
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        ro.observe(el);
      }
    };

    mq.addEventListener?.("change", onMqChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener?.("change", onMqChange);
      ro.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, [mobileStrength]);

  return (
    <section
      ref={ref}
      className={`fa-parallaxImg ${className}`}
      aria-label="Imagen con efecto parallax"
      style={{
        "--pi-bg": `url(${image})`,
        "--pi-fit": fit,
        "--pi-h": height,
        "--pi-minh": minHeight,
        "--pi-pos": position,
        "--pi-radius": radius,
        "--pi-sat": saturation,
        "--pi-con": contrast,
        "--pi-bri": brightness,
        "--pi-boost": boostOpacity,
      }}
    >
      {/* ✅ Capa que usamos SOLO en mobile/tablet para simular el fixed */}
      <div className="fa-parallaxImg__bg" aria-hidden="true" />

      {children ? (
        <div className="fa-parallaxImg__content">{children}</div>
      ) : null}
    </section>
  );
}
