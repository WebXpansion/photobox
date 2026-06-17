import './LogoMarquee.css'

// Remplace chaque item par ton vrai SVG — importe-les ou colle le JSX inline
const logos = [
  { id: 'mcm-1',   label: 'MCM',   svg: <span className="logo-placeholder">MCM</span> },
  { id: 'pucci-1', label: 'Pucci', svg: <span className="logo-placeholder">PUCCI</span> },
  { id: 'mcm-2',   label: 'MCM',   svg: <span className="logo-placeholder">MCM</span> },
  { id: 'pucci-2', label: 'Pucci', svg: <span className="logo-placeholder">PUCCI</span> },
  { id: 'mcm-3',   label: 'MCM',   svg: <span className="logo-placeholder">MCM</span> },
  { id: 'pucci-3', label: 'Pucci', svg: <span className="logo-placeholder">PUCCI</span> },
]

export default function LogoMarquee() {
  return (
    <section className="marquee-section" aria-label="Clients — Trusted by">

      {/* Label */}
      <p className="marquee-section__label">Trusted by</p>

      {/* Track wrapper — clips overflow + fade gradients */}
      <div className="marquee-section__track-wrap">

        {/* Corner brackets */}
        <span className="marquee-section__bracket marquee-section__bracket--tl" aria-hidden="true" />
        <span className="marquee-section__bracket marquee-section__bracket--bl" aria-hidden="true" />
        <span className="marquee-section__bracket marquee-section__bracket--tr" aria-hidden="true" />
        <span className="marquee-section__bracket marquee-section__bracket--br" aria-hidden="true" />

        {/* Fade gradients */}
        <div className="marquee-section__fade marquee-section__fade--left"  aria-hidden="true" />
        <div className="marquee-section__fade marquee-section__fade--right" aria-hidden="true" />

        {/* Scrolling track — duplicated for seamless loop */}
        <div className="marquee-track" aria-hidden="true">
          <ul className="marquee-track__list">
            {logos.map((logo) => (
              <li key={logo.id} className="marquee-track__item">
                {logo.svg}
              </li>
            ))}
          </ul>
          {/* Duplicate for seamless loop */}
          <ul className="marquee-track__list" aria-hidden="true">
            {logos.map((logo) => (
              <li key={`${logo.id}-dup`} className="marquee-track__item">
                {logo.svg}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}