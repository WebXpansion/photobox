import { useEffect, useRef, ReactNode } from 'react'
import './BlurText.css'

interface BlurTextProps {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  children: ReactNode
  className?: string
  wordDelay?: number
  threshold?: number
  /** Force le déclenchement depuis l'extérieur (sans IntersectionObserver) */
  triggered?: boolean
}

export default function BlurText({
  as: Tag = 'h1',
  children,
  className = '',
  wordDelay = 0.05,
  threshold = 0.1,
  triggered,
}: BlurTextProps) {
  const containerRef = useRef<HTMLElement>(null)

  const text  = typeof children === 'string' ? children : ''
  const words = text.split(' ').filter(Boolean)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Mode piloté depuis l'extérieur
    if (triggered !== undefined) {
      if (triggered) el.classList.add('blur-text--revealed')
      else el.classList.remove('blur-text--revealed')
      return
    }

    // Mode IntersectionObserver par défaut
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('blur-text--revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, triggered])

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={`blur-text ${className}`}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="blur-text__word"
          style={{ transitionDelay: `${i * wordDelay}s` }}
          aria-hidden="true"
        >
          {word}
        </span>
      ))}
    </Tag>
  )
}