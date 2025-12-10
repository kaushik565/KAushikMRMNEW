import { useEffect, useRef } from 'react'
import Reveal from 'reveal.js'
import ErrorBoundary from './ErrorBoundary'
import TitleSlide from './slides/TitleSlide'
import QMSOverview from './slides/QMSOverview'
import SiteOverview from './slides/SiteOverview'
import IPQAOverview from './slides/IPQAOverview'
import LabQAOverview from './slides/LabQAOverview'
import QualityObjectivesV2 from './slides/QualityObjectives_v2'
import ClosingSlide from './slides/ClosingSlide'
const primaryLogo = 'https://raw.githubusercontent.com/kaushik565/KAushikMRMNEW/master/logo.png'
const fallbackLogo = 'https://raw.githubusercontent.com/kaushik565/KAushikMRMNEW/master/logo.png'

export default function Presentation() {
  const deckRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const handleSlideState = () => {
      const deck = deckRef.current
      const current = deck?.getCurrentSlide()
      const isTitle = current?.dataset?.state === 'title-slide'
      const isClosing = current?.classList?.contains('closing-slide')
      document.body.classList.toggle('hide-corner-logo', !!(isTitle || isClosing))

      // Dispatch custom event to close all modals
      window.dispatchEvent(new CustomEvent('closeAllModals'))

      // Scroll to top when slide changes - reset all scrollable elements
      if (current) {
        current.scrollTop = 0

        const scrollableElements = current.querySelectorAll('div[style*="overflow"], div[style*="scroll"]')
        scrollableElements.forEach(el => { el.scrollTop = 0 })

        const contentWrappers = current.querySelectorAll('.slide-content, section, [class*="container"]')
        contentWrappers.forEach(el => { el.scrollTop = 0 })
      }
    }

    const handleKeydown = (e) => {
      const deck = deckRef.current
      if (!deck) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        deck.right()
        // Force layout recalculation after navigation
        setTimeout(() => deck.layout?.(), 50)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        deck.left()
        // Force layout recalculation after navigation
        setTimeout(() => deck.layout?.(), 50)
      }
    }

    // Small delay to ensure all sections are rendered
    timerRef.current = setTimeout(() => {
      const revealElement = document.querySelector('.reveal')

      if (revealElement) {
        const deck = new Reveal(revealElement, {
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
          viewDistance: 3,
          mobileViewDistance: 2,
          pdfMaxPagesPerSlide: 1, // Ensure one slide per PDF page
          pdfPageHeightOffset: 0,
        })

        deckRef.current = deck

        deck.initialize()
        deck.on('ready', handleSlideState)
        deck.on('slidechanged', handleSlideState)

        document.addEventListener('keydown', handleKeydown)

        deck.on('destroy', () => {
          document.removeEventListener('keydown', handleKeydown)
        })
      }
    }, 150)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      document.body.classList.remove('hide-corner-logo')
      document.removeEventListener('keydown', handleKeydown)

      const deck = deckRef.current
      if (deck) {
        deck.off('ready', handleSlideState)
        deck.off('slidechanged', handleSlideState)
        deck.destroy()
        deckRef.current = null
      }
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
      <ErrorBoundary><TitleSlide /></ErrorBoundary>
      <ErrorBoundary><SiteOverview /></ErrorBoundary>
      <ErrorBoundary><IPQAOverview /></ErrorBoundary>
      <ErrorBoundary><LabQAOverview /></ErrorBoundary>
      <ErrorBoundary><QualityObjectivesV2 /></ErrorBoundary>
      <ErrorBoundary><ClosingSlide /></ErrorBoundary>
    </>
  )
}
