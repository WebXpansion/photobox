import './Inside360Title.css'

export default function Inside360Title() {
  return (
    <section className="inside-title" id="studio" aria-label="Inside the 360° Capture System">
      <div className="inside-title__inner">
        <div className="inside-title__badge">
          <span className="inside-title__bracket inside-title__bracket--tl" aria-hidden="true" />
          <span className="inside-title__bracket inside-title__bracket--br" aria-hidden="true" />
          DISCOVER
        </div>
        <h2 className="inside-title__h2">
          <span className="inside-title__line--bright">Inside the 360°</span>
          <span className="inside-title__line--dim">Capture System</span>
        </h2>
      </div>
    </section>
  )
}