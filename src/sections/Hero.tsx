import BlurText from '../components/BlurText'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Hero — The New Face Capture Engine">
      {/* ---- Background Video ---- */}
      <div className="hero__video-wrap" aria-hidden="true">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          /*
           * Remplace "src" par le chemin de ta vidéo une fois
           * qu'elle est dans /public, ex: src="/hero-bg.mp4"
           */
          src="/hero.mov"
          poster="/hero-poster.jpg"
        />
        {/* Gradient bottom overlay */}
        <div className="hero__gradient" aria-hidden="true" />
      </div>

      {/* ---- Content ---- */}
      <div className="hero__content">
        {/* Left column */}
        <div className="hero__left">
          {/* Badge */}
          <div className="hero__badge" aria-label="We automate +100 camera">
            <span className="hero__badge-bracket hero__badge-bracket--tl" aria-hidden="true" />
            <span className="hero__badge-bracket hero__badge-bracket--br" aria-hidden="true" />
            NEXT-GEN CAPTURE STUDIO
          </div>

          <h1 className="hero__h1">
          <BlurText
            as="span"
            className="hero__h1-line"
            wordDelay={0.07}
            threshold={0.05}
          >
            The New Face
          </BlurText>

          <BlurText
            as="span"
            className="hero__h1-line"
            wordDelay={0.07}
            threshold={0.05}
          >
            Capture Engine
          </BlurText>
        </h1>
        </div>

        {/* Right column */}
        <div className="hero__right">
          <p className="hero__desc">
            Un studio de capture nouvelle génération pour transformer personnes et
            produits en contenus digitaux premium.
          </p>
          <div className="hero__actions">
            <a href="#services" className="hero__btn hero__btn--primary">
              Découvrir
            </a>
            <a href="#contact" className="hero__btn hero__btn--outline">
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
