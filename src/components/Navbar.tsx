import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Accueil',  href: '#hero' },
  { label: 'Services', href: '#features' },
  { label: 'Studio',   href: '#studio' },
  { label: 'Formats',  href: '#formats' },
  { label: 'Projets',  href: '#projects' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}
      role="banner"
    >
      <div className="navbar__inner">
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
        >
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>

        <a href="/" className="navbar__logo" aria-label="JMA — Accueil">
          <img src="/logo-4.png" alt="JMA" height="28" />
        </a>

        <a href="#contact" className="navbar__cta">Contact us</a>
      </div>

      <nav
        id="nav-links"
        className={`navbar__subnav ${menuOpen ? 'navbar__subnav--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="navbar__subnav-list">
          {NAV_LINKS.map((link) => (
        <li key={link.href}>
        <a
          href={link.href}
          className={`navbar__subnav-link ${activeLink === link.href ? 'navbar__subnav-link--active' : ''}`}
          onClick={() => {
            setActiveLink(link.href)
            setMenuOpen(false)
          }}
        >
          {activeLink === link.href && (
            <span className="navbar__subnav-dot" aria-hidden="true" />
          )}
          {link.label}
        </a>
        </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}