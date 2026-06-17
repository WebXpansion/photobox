import './styles/globals.css'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import LogoMarquee from './sections/LogoMarquee' 
import Features from './sections/Features'
import ScrollSequence from './sections/ScrollSequence'
import ScrollSequence2 from './sections/ScrollSequence2'
import Inside360Title from './sections/Inside360Title'
import Formats from './sections/Formats'
import ProjectsCarousel from './sections/ProjectsCarousel'





export default function App() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />   
        <Features />
        <Inside360Title />
        <ScrollSequence />
        <ScrollSequence2 />
        <Formats />
        <ProjectsCarousel />
      </main>
    </div>
  )
}