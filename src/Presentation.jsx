import { useEffect } from 'react'
import Reveal from 'reveal.js'
import TitleSlide from './slides/TitleSlide'
import ExecutiveSummary from './slides/ExecutiveSummary'
import QMSOverview from './slides/QMSOverview'
import SiteOverview from './slides/SiteOverview'
import IPQAOverview from './slides/IPQAOverview'
import LabQAOverview from './slides/LabQAOverview'
import ClosingSlide from './slides/ClosingSlide'
const primaryLogo = 'https://raw.githubusercontent.com/kaushik565/KAushikMRMNEW/master/logo.png'
const fallbackLogo = 'https://raw.githubusercontent.com/kaushik565/KAushikMRMNEW/master/logo.png'

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
          transition: 'fade',
          transitionSpeed: 'fast',
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
          viewDistance: 2,
          mobileViewDistance: 1,
          pdfMaxPagesPerSlide: 1, // Ensure one slide per PDF page
          pdfPageHeightOffset: 0,
        })

        deck.initialize()

        const handleSlideState = () => {
          const current = deck?.getCurrentSlide()
          const isTitle = current?.dataset?.state === 'title-slide'
          const isClosing = current?.classList?.contains('closing-slide')
          document.body.classList.toggle('hide-corner-logo', !!(isTitle || isClosing))
        }

        deck.on('ready', handleSlideState)
        deck.on('slidechanged', handleSlideState)

        // Custom keyboard controls for arrow keys (left/right only to avoid auto-scrolling)
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') {
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
      document.body.classList.remove('hide-corner-logo')
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
      {/* React mounts into #root inside the Reveal structure defined in index.html */}
      <TitleSlide />
      <SiteOverview />
      <QMSOverview />
      <IPQAOverview />
      <LabQAOverview />
      <ExecutiveSummary />
      <ClosingSlide />
    </>
  )
}
