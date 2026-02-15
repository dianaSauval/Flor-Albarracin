import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./KeyholeImageLocal.css";

gsap.registerPlugin(ScrollTrigger);

export default function KeyholeImageLocal({
  src,
  alt = "",
  height = "80vh",
  scrub = true,
  overlayColor = "var(--accent)",
  overlayOpacity = 1,
  radius = "var(--radius-lg)",
  holeFrom = "22%", // tamaño inicial del agujero (más chico)
  holeTo = "44%",   // tamaño final del agujero (más grande)
}) {
  const wrapRef = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const wrap = wrapRef.current;
    const overlay = overlayRef.current;
    if (!wrap || !overlay) return;

    // agujero centrado (rectangular)
    const poly = (p) =>
      `polygon(0% 0%, 0% 100%, ${50 - p}% 100%, ${50 - p}% ${50 - p}%, ${50 + p}% ${50 - p}%, ${50 + p}% ${50 + p}%, ${50 - p}% ${50 + p}%, ${50 - p}% 100%, 100% 100%, 100% 0%)`;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlay,
        { clipPath: poly(parseFloat(holeFrom)) },
        {
          clipPath: poly(parseFloat(holeTo)),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 85%",
            end: "bottom 15%",
            scrub,
          },
        }
      );
    }, wrap);

    return () => ctx.revert();
  }, [scrub, holeFrom, holeTo]);

  return (
    <div
      ref={wrapRef}
      className="khl"
      style={{
        "--khl-h": height,
        "--khl-radius": radius,
        "--khl-overlay": overlayColor,
        "--khl-overlay-opacity": overlayOpacity,
      }}
    >
      <img className="khl__img" src={src} alt={alt} loading="lazy" />
      <span ref={overlayRef} className="khl__overlay" aria-hidden="true" />
    </div>
  );
}
