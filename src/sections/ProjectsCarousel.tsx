import { useEffect, useRef, useState } from 'react'
import BlurText from '../components/BlurText'
import './ProjectsCarousel.css'

const CONFIG = {
  SPEED: 1.9,
  GAP: 30,
  ROTATE_Y: -20,
  ROTATE_X: -3,
  PERSPECTIVE: 2000,
  PERSPECTIVE_ORIGIN_Y: 0,
  CARD_WIDTH_MIN: 200,
  CARD_WIDTH_VW: 22,
  CARD_WIDTH_MAX: 400,
}

const PROJECTS = [
  { id: 1, src: '4.webp', alt: 'Projet 1' },
  { id: 2, src: '5.webp', alt: 'Projet 2' },
  { id: 3, src: '6.webp', alt: 'Projet 3' },
  { id: 4, src: 'carte-1.webp', alt: 'Projet 4' },
  { id: 5, src: 'carte-2.webp', alt: 'Projet 5' },
  { id: 6, src: 'carte-3.webp', alt: 'Projet 6' },
  { id: 7, src: '7.webp', alt: 'Projet 7' },
  { id: 8, src: '8.webp', alt: 'Projet 8' },
]

export default function ProjectsCarousel() {
    const isDraggingRef   = useRef(false)
    const dragStartXRef   = useRef(0)
    const dragStartPosRef = useRef(0)
  const trackRef    = useRef<HTMLDivElement>(null)
  const rafRef      = useRef<number>(0)
  const posRef      = useRef(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
  
    const isMobile = window.innerWidth <= 768
    const speed = isMobile ? 1.5 : CONFIG.SPEED
  
    const totalWidth = track.scrollWidth / 2
  
    const animate = () => {
      posRef.current += speed
      if (posRef.current >= totalWidth) posRef.current = 0
      track.style.transform = `translateX(-${posRef.current}px)`
      rafRef.current = requestAnimationFrame(animate)
    }
  
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])
  
  const pause = () => cancelAnimationFrame(rafRef.current)
  
  const resume = () => {
    const track = trackRef.current
    if (!track) return
    const isMobile = window.innerWidth <= 768
    const speed = isMobile ? 1.5 : CONFIG.SPEED
    const totalWidth = track.scrollWidth / 2
    const animate = () => {
      posRef.current += speed
      if (posRef.current >= totalWidth) posRef.current = 0
      track.style.transform = `translateX(-${posRef.current}px)`
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
  }

  // ---- Drag / Swipe ----
const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current   = true
    dragStartXRef.current   = e.clientX
    dragStartPosRef.current = posRef.current
    pause()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    const delta = Math.abs(dragStartXRef.current - e.clientX)
    
    // Si on a bougé de plus de 5px c'est un swipe — reset le hover
    if (delta > 5) {
      setHoveredIndex(null)
    }
  
    const track = trackRef.current
    if (!track) return
    const totalWidth = track.scrollWidth / 2
    let next = dragStartPosRef.current + (dragStartXRef.current - e.clientX)
    if (next < 0) next += totalWidth
    if (next >= totalWidth) next -= totalWidth
    posRef.current = next
    track.style.transform = `translateX(-${next}px)`
  }
  
  const onPointerUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setHoveredIndex(null)   // ← reset blur au release
    resume()
  }

  const items = [...PROJECTS, ...PROJECTS]

  return (
    <section className="projects" id="projects" aria-label="Projets">
      <div className="projects__header">
        <div className="projects__header-inner">
          <div className="projects__heading">
            <BlurText as="h2" className="projects__h2-line1" wordDelay={0.05} threshold={0.1}>
              Découvrez ce que Photobox
            </BlurText>
            <BlurText as="h2" className="projects__h2-line2" wordDelay={0.05} threshold={0.1}>
              permet de produire
            </BlurText>
          </div>
          <a href="#contact" className="projects__cta">Contact us</a>
        </div>
      </div>

      <div
        className="projects__carousel"
        onMouseLeave={() => { resume(); setHoveredIndex(null) }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
            perspective: `${CONFIG.PERSPECTIVE}px`,
            perspectiveOrigin: `50% ${CONFIG.PERSPECTIVE_ORIGIN_Y}%`,
            cursor: 'grab',
            touchAction: 'none',   // ← empêche le scroll natif du navigateur
        }}
        >
        <div
          className="projects__track"
          ref={trackRef}
          style={{ gap: '0px' }}
        >
          {items.map((p, i) => {
            const isHovered  = hoveredIndex === i
            const isDefocused = hoveredIndex !== null && hoveredIndex !== i

            return (
              <div
                className="projects__card"
                key={`${p.id}-${i}`}
                onMouseEnter={() => { pause(); setHoveredIndex(i) }}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  width: `clamp(${CONFIG.CARD_WIDTH_MIN}px, ${CONFIG.CARD_WIDTH_VW}vw, ${CONFIG.CARD_WIDTH_MAX}px)`,
                  marginInline: `${CONFIG.GAP}px`,
                  transform: isHovered
                    ? `rotateY(0deg) rotateX(0deg) scale(1.03)`
                    : `rotateY(${CONFIG.ROTATE_Y}deg) rotateX(${CONFIG.ROTATE_X}deg) scale(1)`,
                  filter: isDefocused ? 'blur(3px) brightness(0.5)' : 'blur(0px) brightness(1)',
                  transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease',
                  zIndex: isHovered ? 10 : 1,
                }}
              >
                <div className="projects__card-inner">
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                  />
                  <div className="projects__card-border" aria-hidden="true" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}