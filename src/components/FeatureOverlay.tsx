import { useEffect, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import './FeatureOverlay.css'

interface OverlayCard {
  id: string
  title: string
  desc: string
  image: string
}

interface FeatureOverlayProps {
  cards: OverlayCard[]
  activeIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function FeatureOverlay({
  cards,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: FeatureOverlayProps) {
  const card  = cards[activeIndex]
  const total = cards.length
  const num   = String(activeIndex + 1).padStart(2, '0')
  const tot   = String(total).padStart(2, '0')

  const [closing, setClosing] = useState(false)

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => onClose(), 550)
  }, [onClose])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape')     handleClose()
    if (e.key === 'ArrowRight') onNext()
    if (e.key === 'ArrowLeft')  onPrev()
  }, [handleClose, onNext, onPrev])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  const isVideo = (src: string) =>
    src.endsWith('.mp4') || src.endsWith('.mov') || src.endsWith('.webm')

  return createPortal(
    <div
      className={`feat-overlay ${closing ? 'feat-overlay--closing' : ''}`}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <button
        className="feat-overlay__backdrop"
        onClick={handleClose}
        aria-label="Fermer l'overlay"
      />

      {/* Panel */}
      <div className="feat-overlay__panel">

        {/* Left */}
        <div className="feat-overlay__left">
          <div className="feat-overlay__top">
            <span className="feat-overlay__counter">{num} — {tot}</span>
            <h2 className="feat-overlay__title">{card.title}</h2>
            <p className="feat-overlay__desc">{card.desc}</p>
          </div>

          <div className="feat-overlay__nav">
            <button className="feat-overlay__arrow" onClick={onPrev} aria-label="Carte précédente">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="feat-overlay__arrow" onClick={onNext} aria-label="Carte suivante">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="feat-overlay__right">
          <button className="feat-overlay__close" onClick={handleClose} aria-label="Fermer">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {isVideo(card.image) ? (
            <video
              src={card.image}
              className="feat-overlay__image"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={card.image}
              alt={card.title}
              className="feat-overlay__image"
            />
          )}
        </div>

      </div>
    </div>,
    document.body
  )
}