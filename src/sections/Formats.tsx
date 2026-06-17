import { useEffect, useRef } from 'react'
import BlurText from '../components/BlurText'
import './Formats.css'

const cards = [
    {
        id: 'card-1',
        title: 'Images éditoriales',
        image: 'carte-1.webp',
        desc1: "Des visuels fixes haute qualité, pensés pour valoriser chaque détail d’une personne, d’un produit ou d’une collection.",
        desc2: "Ils peuvent être utilisés sur vos campagnes, lookbooks, réseaux sociaux, pages produit, supports éditoriaux ou communications de marque, avec un rendu cohérent et premium sur tous les points de contact.",
        stats: [
          { value: '84 %', label: 'Décision d’achat' },
          { value: '93 %', label: 'ROI marketing' },
        ],
      },
  {
    id: 'card-2',
    title: 'Contenus vidéo dynamiques',
    image: 'carte-2.webp',
    desc1: "Des vidéos conçues pour donner du mouvement et de la profondeur à une personne, un produit ou une collection.",
    desc2: "Elles permettent de créer un contenu plus vivant, plus immersif et plus engageant, idéal pour présenter une silhouette, révéler les détails d’un objet, accompagner un lancement ou renforcer l’impact d’une campagne digitale avec un rendu premium et cinématique.",
    stats: [
      { value: '93 %', label: 'Performance vidéo' },
      { value: '76 %', label: 'Impact visuel' },
    ],
  },
  {
    id: 'card-3',
    title: 'Expériences interactives au scroll',
    image: 'carte-3.webp',
    desc1: "Une séquence d'images PNG intégrée directement sur un site internet pour créer une animation fluide et maîtrisée au scroll.",
    desc2: "Ce format permet de faire tourner un produit, révéler progressivement une silhouette, accompagner un storytelling de marque ou créer une interaction immersive entre l'utilisateur et le contenu. Chaque mouvement devient contrôlé, précis et premium, idéal pour transformer une page classique en expérience digitale mémorable.",
    stats: [
      { value: '95 %', label: 'Performance' },
      { value: '74 %', label: 'Impact visuel' },
    ],
  },
]

function FormatCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
  
    // Carte 1 toujours visible
    if (index === 0) {
      el.classList.add('format-card--visible')
      return
    }
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('format-card--visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }   // se déclenche quand 30% de la carte est visible
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      className="format-card"
      ref={cardRef}
    >
      {/* Background texture top-right */}
      <div className="format-card__bg" aria-hidden="true" />

      {/* Left — image */}
      <div className="format-card__image-wrap">
        <img
          src={card.image}
          alt=""
          className="format-card__image"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Right — content */}
      <div className="format-card__content">
        <div className="format-card__top">
          <BlurText as="h3" className="format-card__title" wordDelay={0.05} threshold={0.1}>
            {card.title}
          </BlurText>

          {'desc1' in card && (
            <>
              <p className="format-card__desc">{card.desc1}</p>
              <p className="format-card__desc">{card.desc2}</p>
              <a href="#contact" className="format-card__cta">Nous contacter</a>
            </>
          )}
        </div>

        {'stats' in card && card.stats && (
          <div className="format-card__stats">
            <div className="format-card__stats-divider" />
            <div className="format-card__stats-row">
              {card.stats.map((stat) => (
                <div key={stat.label} className="format-card__stat">
                  <span className="format-card__stat-value">{stat.value}</span>
                  <span className="format-card__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Formats() {
  return (
    <section className="formats" id="formats" aria-labelledby="formats-heading">
      <div className="formats__inner">

        {/* Heading */}
        <div className="formats__heading">
          <BlurText as="h2" className="formats__h2-line1" wordDelay={0.06} threshold={0.1}>
            Trois formats pour créer
          </BlurText>
          <BlurText as="h2" className="formats__h2-line2" wordDelay={0.06} threshold={0.1}>
            plus d'impact
          </BlurText>
        </div>

        {/* Stacking cards */}
        <div className="formats__stack">
          {cards.map((card, i) => (
            <FormatCard key={card.id} card={card} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}