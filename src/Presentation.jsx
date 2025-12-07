import { useEffect } from 'react'
import Reveal from 'reveal.js'
import TitleSlide from './slides/TitleSlide'
import SiteOverview from './slides/SiteOverview'
import ExecutiveSummary from './slides/ExecutiveSummary'
import IPQAOverview from './slides/IPQAOverview'
import ValidationReports from './slides/ValidationReports'
import ClosingSlide from './slides/ClosingSlide'
const primaryLogo = 'https://ci3.googleusercontent.com/meips/ADKq_NYoWiyCxIBqXhvayEyoxq9RdqOFqxTu5zYVWWPmrNV2i6HjGtBI5ZIGmLgb8GS-P9z___3MejWcSMXcOtakV5I2Jx_qBa-jgUgiWCxeHnZMfcTzixwuqAXJ=s0-d-e1-ft#https://new.molbiodiagnostics.com/mailSignature/png/Molbio_Logo.png'
const fallbackLogo = 'https://raw.githubusercontent.com/kaushik565/KAushikMRMNEW/master/image.png'

export default function Presentation() {
  useEffect(() => {
    let deck = null
    let timer = null

    // Small delay to ensure all sections are rendered
    timer = setTimeout(() => {
      const revealElement = document.querySelector('.reveal')
      
      if (revealElement) {
        deck = new Reveal(revealElement, {
          embedded: false,
          progress: true,
          history: true,
          center: false,
          transition: 'slide',
          transitionSpeed: 'default',
          slideNumber: 'c/t',
          keyboard: false,
          overview: true,
          touch: true,
          loop: false,
          rtl: false,
          navigationMode: 'default',
          shuffle: false,
          fragments: true,
          fragmentInURL: true,
          help: true,
          showNotes: false,
          autoPlayMedia: null,
          preloadIframes: null,
          autoSlide: 0,
          autoSlideStoppable: true,
          mouseWheel: false,
          hideInactiveCursor: true,
          hideCursorTime: 5000,
          disableLayout: false,
          width: 1920,
          height: 1080,
          margin: 0.04,
          minScale: 0.2,
          maxScale: 2.0,
        })

        deck.initialize()

        // Custom keyboard controls for arrow keys
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            const currentSlide = document.querySelector('.reveal .present')
            if (currentSlide) {
              currentSlide.parentElement.scrollBy({ top: 150, behavior: 'smooth' })
            }
            window.scrollBy({ top: 150, behavior: 'smooth' })
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            const currentSlide = document.querySelector('.reveal .present')
            if (currentSlide) {
              currentSlide.parentElement.scrollBy({ top: -150, behavior: 'smooth' })
            }
            window.scrollBy({ top: -150, behavior: 'smooth' })
          } else if (e.key === 'ArrowRight') {
            e.preventDefault()
            deck.right()
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            deck.left()
          }
        })
      }
    }, 150)

    return () => {
      if (timer) clearTimeout(timer)
      if (deck) deck.destroy()
    }
  }, [])

  return (
    <>
      <div className="corner-logo" aria-hidden="true">
        <img
          src={primaryLogo}
          alt="Molbio Diagnostics Limited"
          onError={(e) => { e.currentTarget.src = fallbackLogo }}
        />
      </div>
      <TitleSlide />
      <SiteOverview />
      <ExecutiveSummary />
      <IPQAOverview />
      <ValidationReports />
      <ClosingSlide />
    </>
  )
}
