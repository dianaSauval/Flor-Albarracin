import "./DiagonalSplitImages.css";

export default function DiagonalSplitImages({
  leftSrc,
  rightSrc,
  leftAlt = "",
  rightAlt = "",
  height = "62vh",
  radius = "var(--radius-lg)",
  mobile = "left", // "left" | "right"
  bias = "84%", // 80%–88%
}) {
  return (
    <section
      className="ds2"
      style={{ "--ds-h": height, "--ds-radius": radius, "--ds-bias": bias }}
    >
      <div className="container">
        <figure
          className={`ds2__frame ${
            mobile === "right" ? "ds2--mobileRight" : "ds2--mobileLeft"
          }`}
        >
          {/* hotzones PRIMERO (así el ~ funciona) */}
          <span className="ds2__zone ds2__zone--left" aria-hidden="true" />
          <span className="ds2__zone ds2__zone--right" aria-hidden="true" />

          {/* LEFT */}
          <div className="ds2__layer ds2__layer--left">
            <div className="ds2__media">
              <div className="ds2__box">
                <img src={leftSrc} alt={leftAlt} loading="lazy" />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="ds2__layer ds2__layer--right">
            <div className="ds2__media">
              <div className="ds2__box">
                <img src={rightSrc} alt={rightAlt} loading="lazy" />
              </div>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
