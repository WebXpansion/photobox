import { useState } from 'react'
import BlurText from '../components/BlurText'
import FeatureOverlay from '../components/FeatureOverlay'
import './Features.css'
const PlusIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.5989 1.74846e-06L21.5989 14.7194L17.9195 14.7194L17.9195 1.58762e-06L21.5989 1.74846e-06Z" fill="white"/>
    <path d="M22.08 25.2773L22.08 39.9968L18.4006 39.9968L18.4006 25.2773L22.08 25.2773Z" fill="white"/>
    <path d="M40.0001 18.3965L40.0001 22.0759L25.2806 22.0759L25.2806 18.3965L40.0001 18.3965Z" fill="white"/>
    <path d="M14.7194 17.918L14.7194 21.5974L1.17011e-06 21.5974L1.33094e-06 17.918L14.7194 17.918Z" fill="white"/>
  </svg>
)

interface CardData {
  id: string
  title: string
  desc: string
  media: 'image' | 'video'
  src: string
  poster?: string
}

const overlayCards = [
  {
    id: 'card-1',
    title: 'Rendu ultra-premium',
    desc: 'Chaque image est capturée avec une précision extrême afin de restituer les volumes, les textures, les matières et les détails avec un rendu professionnel. Cette qualité de capture permet de produire des visuels nets, cohérents et premium, adaptés aux exigences des marques, des campagnes digitales, des supports éditoriaux et des expériences web haut de gamme.',
    image: '1.webp',
  },
  {
    id: 'card-2',
    title: '400 appareils photo 4K',
    desc: 'Une infrastructure de capture unique, pensée pour réaliser des prises de vue parfaitement synchronisées sous tous les angles. Chaque appareil travaille en simultané pour capter le sujet dans son intégralité, avec une cohérence visuelle optimale et une précision adaptée aux productions les plus exigeantes.',
    image: '2.webp',
  },
  {
    id: 'card-4',
    title: 'Valoriser chaque détail',
    desc: 'La technologie se met au service de votre identité visuelle pour sublimer vos produits, vos talents et vos univers de marque. Chaque capture devient une base créative capable de produire des contenus cohérents, impactants et adaptés à vos campagnes, vos supports digitaux et vos expériences immersives.',
    image: '3.webp',
  },
  {
    id: 'card-3',
    title: "Créer l'expérience",
    desc: 'Des contenus immersifs conçus pour capter l’attention, prolonger l’engagement et transformer l’expérience utilisateur en levier de conversion. En intégrant du mouvement, de l’interaction et une narration visuelle plus forte, chaque support devient plus mémorable, plus engageant et plus performant pour vos campagnes, vos sites internet et vos lancements de produits.',
    image: 'Video.mp4',
  },
]

function FeatureCard({
  card,
  onOpenOverlay,
}: {
  card: CardData
  onOpenOverlay: () => void
}) {
  return (
    <article className="feat-card" onClick={onOpenOverlay}>
      <div className="feat-card__media">
        {card.media === 'video' ? (
          <video
            src={card.src}
            poster={card.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="feat-card__video"
          />
        ) : (
          <img
            src={card.src}
            alt=""
            className="feat-card__img"
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="feat-card__overlay" aria-hidden="true" />
      </div>
      <div className="feat-card__content">
        <div className="feat-card__text">
          <h3 className="feat-card__title">{card.title}</h3>
          <p className="feat-card__desc">{card.desc}</p>
        </div>
        <button
          className="feat-card__plus"
          aria-label={`En savoir plus sur ${card.title}`}
        >
          <PlusIcon />
        </button>
      </div>
    </article>
  )
}

export default function Features() {
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null)

  const getOverlayIndex = (id: string) =>
    overlayCards.findIndex((c) => c.id === id)

  return (
    <section className="features" id="features" aria-labelledby="features-heading">
      <div className="features__inner">

        <div className="features__heading">
          <BlurText as="h2" className="features__h2" wordDelay={0.06} threshold={0.1}>
            {`Une seule capture\nUn maximum d'impact.`}
          </BlurText>
        </div>

        {/* ---- LIGNE 1 : étroit gauche | large droite ---- */}
        <div className="features__row features__row--top">
          <div className="features__col features__col--narrow">
            <FeatureCard
              card={{ id: 'card-1', title: 'Rendu ultra-premium', desc: '', media: 'image', src: '1.webp' }}
              onOpenOverlay={() => setOverlayIndex(getOverlayIndex('card-1'))}
            />
          </div>
          <div className="features__col features__col--wide">
            <FeatureCard
              card={{ id: 'card-2', title: '400 appareils photo 4K', desc: '', media: 'image', src: '2.webp' }}
              onOpenOverlay={() => setOverlayIndex(getOverlayIndex('card-2'))}
            />
          </div>
        </div>

        {/* ---- LIGNE 2 : large gauche | étroit droite ---- */}
        <div className="features__row features__row--bottom">
          <div className="features__col features__col--wide">
            <FeatureCard
              card={{ id: 'card-4', title: 'Valoriser\nchaque détail', desc: '', media: 'image', src: '3.webp', poster: '3.webp' }}
              onOpenOverlay={() => setOverlayIndex(getOverlayIndex('card-4'))}
            />
          </div>
          <div className="features__col features__col--narrow">
            <FeatureCard
              card={{ id: 'card-3', title: "Créer l'expérience", desc: '', media: 'video', src: 'Video.mp4' }}
              onOpenOverlay={() => setOverlayIndex(getOverlayIndex('card-3'))}
            />
          </div>
        </div>

      </div>

      {/* Overlay */}
      {overlayIndex !== null && (
        <FeatureOverlay
          cards={overlayCards}
          activeIndex={overlayIndex}
          onClose={() => setOverlayIndex(null)}
          onPrev={() => setOverlayIndex((overlayIndex - 1 + overlayCards.length) % overlayCards.length)}
          onNext={() => setOverlayIndex((overlayIndex + 1) % overlayCards.length)}
        />
      )}

    </section>
  )
}