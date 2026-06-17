import { useEffect, useRef, useState } from 'react'
import BlurText from '../components/BlurText'
import './ScrollSequence.css'

const TOTAL_FRAMES = 47
const TEXT_APPEAR_FROM_FRAME = 10

function preloadFrames(): HTMLImageElement[] {
  const imgs: HTMLImageElement[] = []
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image()
    img.src = `/frames/frame_${String(i).padStart(3, '0')}.jpg`
    imgs.push(img)
  }
  return imgs
}

export default function ScrollSequence() {
  const sectionRef    = useRef<HTMLElement>(null)
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const framesRef     = useRef<HTMLImageElement[]>([])
  const frameIndexRef = useRef(0)
  const [textVisible, setTextVisible] = useState(false)
  const [loaded, setLoaded]           = useState(false)

  useEffect(() => {
    const imgs = preloadFrames()
    framesRef.current = imgs
    let count = 0
    imgs.forEach((img) => {
      const onLoad = () => { count++; if (count === TOTAL_FRAMES) setLoaded(true) }
      if (img.complete) onLoad()
      else img.onload = onLoad
    })
  }, [])

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current
    const img    = framesRef.current[index]
    if (!canvas || !img?.complete) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr  = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width  = rect.width  * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    const cw = rect.width
    const ch = rect.height
    const iw = img.naturalWidth
    const ih = img.naturalHeight
    const scale = Math.max(cw / iw, ch / ih)
    const sw = iw * scale
    const sh = ih * scale
    const ox = (cw - sw) / 2
    const oy = (ch - sh) / 2
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, ox, oy, sw, sh)
  }

  useEffect(() => {
    if (!loaded) return
    drawFrame(0)

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const section = sectionRef.current
        if (!section) { ticking = false; return }
        const rect      = section.getBoundingClientRect()
        const sectionH  = section.offsetHeight
        const viewH     = window.innerHeight
        const scrolled  = -rect.top
        const scrollable = sectionH - viewH
        const progress  = Math.min(Math.max(scrolled / scrollable, 0), 1)
        const frameIndex = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1)
        if (frameIndex !== frameIndexRef.current) {
          frameIndexRef.current = frameIndex
          drawFrame(frameIndex)
          setTextVisible(frameIndex >= TEXT_APPEAR_FROM_FRAME)
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [loaded])

  return (
    <section className="scroll-seq" ref={sectionRef} aria-label="Séquence 360°">
      <div className="scroll-seq__sticky">

        <canvas ref={canvasRef} className="scroll-seq__canvas" aria-hidden="true" />

        <div className={`scroll-seq__bottom ${textVisible ? 'scroll-seq__bottom--visible' : ''}`}>
            <div className="scroll-seq__bottom-left">

            <h3 className="scroll-seq2__sub-title">
              <BlurText as="span" className="scroll-seq2__sub-title-line" wordDelay={0.07} triggered={textVisible}>
              Vision complète 
              </BlurText>
              <BlurText as="span" className="scroll-seq2__sub-title-line" wordDelay={0.07} triggered={textVisible}>
              à 360°
              </BlurText>
            </h3>
            </div>
            <div className="scroll-seq__bottom-right">
                <BlurText
                as="p"
                className="scroll-seq__desc"
                wordDelay={0.03}
                triggered={textVisible}
                >
                Chaque prise est réalisée en qualité photo 4K, pour conserver un niveau de détail élevé, des textures nettes et une matière visuelle exploitable sur des supports exigeants.
                </BlurText>
            </div>
            </div>

      </div>
    </section>
  )
}