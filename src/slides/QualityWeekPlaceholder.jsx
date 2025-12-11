import React, { useState, useEffect, useRef } from 'react'

export default function QualityWeekPlaceholder() {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [showBadgeModal, setShowBadgeModal] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [carouselIdx, setCarouselIdx] = useState(0)
  const slideRef = useRef(null)
  const hasShownRef = useRef(false)
  const carouselTimerRef = useRef(null)

  // Show badge modal when slide becomes active
  useEffect(() => {
    const checkAndShowBadge = () => {
      if (slideRef.current?.classList.contains('present')) {
        setShowBadgeModal(true)
        setShowCelebration(false)
        
        setTimeout(() => {
          setShowBadgeModal(false)
          // Start celebration effect after badge closes
          setShowCelebration(true)
          // Stop celebration after 6 seconds
          setTimeout(() => setShowCelebration(false), 6000)
        }, 1000)
      }
    }

    // Use MutationObserver to detect when slide becomes active
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isPresentNow = slideRef.current?.classList.contains('present')
          if (isPresentNow) {
            setShowBadgeModal(true)
            setShowCelebration(false)
            
            setTimeout(() => {
              setShowBadgeModal(false)
              // Start celebration effect after badge closes
              setShowCelebration(true)
              // Stop celebration after 6 seconds
              setTimeout(() => setShowCelebration(false), 6000)
            }, 1000)
          }
        }
      })
    })

    if (slideRef.current) {
      observer.observe(slideRef.current, { attributes: true })
      // Check immediately in case already present
      checkAndShowBadge()
    }

    return () => observer.disconnect()
  }, [])

  // Carousel effect for images (change every 2 seconds)
  useEffect(() => {
    carouselTimerRef.current = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % 9)
    }, 2000)

    return () => clearInterval(carouselTimerRef.current)
  }, [])

  const events = [
    { icon: '📋', title: 'Quality Pledge' },
    { icon: '📊', title: 'Badges Distribution' },
    { icon: '🎓', title: 'Quality Awareness Sessions' },
    { icon: '🧪', title: 'Online Quiz' },
    { icon: '🎨', title: 'Poster Preparation' },
    { icon: '💡', title: 'Slogans' },
    { icon: '🌳', title: 'Quality Tree' },
    { icon: '🏆', title: 'HOD Quiz' },
    { icon: '🎁', title: 'Prize Distribution' }
  ]

  const outcomeImages = [
    { src: '/Image 2.JPG', label: 'Image 2' },
    { src: '/Image 3.JPG', label: 'Image 3' },
    { src: '/Image 4.JPG', label: 'Image 4' },
    { src: '/Image 5.jpeg', label: 'Image 5' },
    { src: '/Image 6.jpeg', label: 'Image 6' },
    { src: '/Image 7.jpeg', label: 'Image 7' },
    { src: '/Image 8.jpeg', label: 'Image 8' },
    { src: '/Image 9.jpeg', label: 'Image 9' },
    { src: '/Image 10.JPG', label: 'Image 10' }
  ]

  return (
    <section
      ref={slideRef}
      data-state="quality-week-placeholder"
      style={{
        background: '#ffffff'
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        padding: '18px 35px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        overflowY: 'hidden',
        position: 'relative'
      }}>
        {/* Quality Week Badge - Top Left Corner */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '20px',
          zIndex: 10,
          animation: 'fadeIn 0.6s ease-in-out'
        }}>
          <img 
            src="/quality-week-badge.png"
            alt="Quality Week Badge"
            style={{
              width: '150px',
              height: 'auto',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
              objectFit: 'contain',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onClick={() => setShowBadgeModal(true)}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>

        {/* Badge Full Screen Modal */}
        {showBadgeModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              cursor: 'pointer',
              animation: 'fadeIn 0.3s ease-in-out'
            }}
            onClick={() => setShowBadgeModal(false)}
          >
            <img
              src="/quality-week-badge.png"
              alt="Quality Week Badge - Full View"
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
                animation: 'fadeIn 0.4s ease-in-out'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '30px',
                color: 'white',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                opacity: 0.8,
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.8'}
            >
              ✕
            </div>
          </div>
        )}

        {/* Celebration Effect */}
        {showCelebration && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 1000,
            overflow: 'hidden'
          }}>
            {/* Advanced Fireworks - Bottom Left */}
            {[...Array(4)].map((_, fireworkIdx) => {
              const colors = ['#ff006e', '#00f5ff', '#ffbe0b', '#8338ec', '#fb5607', '#06ffa5'];
              return (
                <div key={`fw-left-${fireworkIdx}`}>
                  {[...Array(20)].map((_, particleIdx) => {
                    const angle = (particleIdx / 20) * Math.PI * 2;
                    const color = colors[fireworkIdx % colors.length];
                    const distance = 120 + Math.random() * 80;
                    return (
                      <div
                        key={`p-${particleIdx}`}
                        style={{
                          position: 'absolute',
                          bottom: '12%',
                          left: '8%',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: color,
                          boxShadow: `0 0 20px ${color}, inset 0 0 10px rgba(255,255,255,0.8)`,
                          animation: `advancedFirework 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${fireworkIdx * 0.5}s infinite`,
                          '--px-x': `${Math.cos(angle) * distance}px`,
                          '--px-y': `${Math.sin(angle) * distance}px`
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}

            {/* Advanced Fireworks - Bottom Right */}
            {[...Array(4)].map((_, fireworkIdx) => {
              const colors = ['#ff006e', '#00f5ff', '#ffbe0b', '#8338ec', '#fb5607', '#06ffa5'];
              return (
                <div key={`fw-right-${fireworkIdx}`}>
                  {[...Array(20)].map((_, particleIdx) => {
                    const angle = (particleIdx / 20) * Math.PI * 2;
                    const color = colors[(fireworkIdx + 2) % colors.length];
                    const distance = 120 + Math.random() * 80;
                    return (
                      <div
                        key={`p-${particleIdx}`}
                        style={{
                          position: 'absolute',
                          bottom: '12%',
                          right: '8%',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: color,
                          boxShadow: `0 0 20px ${color}, inset 0 0 10px rgba(255,255,255,0.8)`,
                          animation: `advancedFirework 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${fireworkIdx * 0.5 + 0.25}s infinite`,
                          '--px-x': `${Math.cos(angle) * distance}px`,
                          '--px-y': `${Math.sin(angle) * distance}px`
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}

            {/* Advanced Fireworks - Top Center */}
            {[...Array(4)].map((_, fireworkIdx) => {
              const colors = ['#ff006e', '#00f5ff', '#ffbe0b', '#8338ec', '#fb5607', '#06ffa5'];
              return (
                <div key={`fw-top-${fireworkIdx}`}>
                  {[...Array(20)].map((_, particleIdx) => {
                    const angle = (particleIdx / 20) * Math.PI * 2;
                    const color = colors[(fireworkIdx + 4) % colors.length];
                    const distance = 120 + Math.random() * 80;
                    return (
                      <div
                        key={`p-${particleIdx}`}
                        style={{
                          position: 'absolute',
                          top: '10%',
                          left: '50%',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: color,
                          boxShadow: `0 0 20px ${color}, inset 0 0 10px rgba(255,255,255,0.8)`,
                          animation: `advancedFirework 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${fireworkIdx * 0.5 + 0.15}s infinite`,
                          '--px-x': `${Math.cos(angle) * distance}px`,
                          '--px-y': `${Math.sin(angle) * distance}px`
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}

            {/* Advanced Fireworks - Center Left */}
            {[...Array(3)].map((_, fireworkIdx) => {
              const colors = ['#ff006e', '#00f5ff', '#ffbe0b', '#8338ec', '#fb5607', '#06ffa5'];
              return (
                <div key={`fw-mid-left-${fireworkIdx}`}>
                  {[...Array(18)].map((_, particleIdx) => {
                    const angle = (particleIdx / 18) * Math.PI * 2;
                    const color = colors[(fireworkIdx + 1) % colors.length];
                    const distance = 100 + Math.random() * 70;
                    return (
                      <div
                        key={`p-${particleIdx}`}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '15%',
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          backgroundColor: color,
                          boxShadow: `0 0 18px ${color}, inset 0 0 8px rgba(255,255,255,0.8)`,
                          animation: `advancedFirework 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${fireworkIdx * 0.6 + 1.2}s infinite`,
                          '--px-x': `${Math.cos(angle) * distance}px`,
                          '--px-y': `${Math.sin(angle) * distance}px`
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}

            {/* Advanced Fireworks - Center Right */}
            {[...Array(3)].map((_, fireworkIdx) => {
              const colors = ['#ff006e', '#00f5ff', '#ffbe0b', '#8338ec', '#fb5607', '#06ffa5'];
              return (
                <div key={`fw-mid-right-${fireworkIdx}`}>
                  {[...Array(18)].map((_, particleIdx) => {
                    const angle = (particleIdx / 18) * Math.PI * 2;
                    const color = colors[(fireworkIdx + 3) % colors.length];
                    const distance = 100 + Math.random() * 70;
                    return (
                      <div
                        key={`p-${particleIdx}`}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: '15%',
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          backgroundColor: color,
                          boxShadow: `0 0 18px ${color}, inset 0 0 8px rgba(255,255,255,0.8)`,
                          animation: `advancedFirework 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${fireworkIdx * 0.6 + 1.3}s infinite`,
                          '--px-x': `${Math.cos(angle) * distance}px`,
                          '--px-y': `${Math.sin(angle) * distance}px`
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}

            {/* Floating Balloons */}
            {[...Array(20)].map((_, i) => {
              const colors = ['#ff006e', '#00f5ff', '#ffbe0b', '#8338ec', '#fb5607', '#06ffa5'];
              const color = colors[i % colors.length];
              const left = Math.random() * 100;
              const delay = Math.random() * 1.5;
              const duration = 6 + Math.random() * 3;
              const swayDistance = 40 + Math.random() * 60;
              
              return (
                <div
                  key={`balloon-${i}`}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    bottom: '-80px',
                    width: '50px',
                    height: '65px',
                    animation: `balloonFloat ${duration}s ease-in-out ${delay}s forwards`,
                    '--sway-dist': `${swayDistance}px`
                  }}
                >
                  {/* Balloon body */}
                  <div style={{
                    width: '50px',
                    height: '55px',
                    borderRadius: '50% 50% 50% 0',
                    background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                    boxShadow: `
                      -10px -10px 20px rgba(255,255,255,0.3) inset,
                      10px 10px 20px rgba(0,0,0,0.2) inset,
                      0 8px 15px rgba(0,0,0,0.3),
                      0 0 30px ${color}80
                    `,
                    position: 'relative'
                  }}>
                    {/* Balloon shine */}
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '10px',
                      width: '15px',
                      height: '20px',
                      background: 'radial-gradient(circle, rgba(255,255,255,0.8), transparent)',
                      borderRadius: '50%'
                    }} />
                  </div>
                  
                  {/* String */}
                  <div style={{
                    width: '2px',
                    height: '15px',
                    background: 'linear-gradient(to bottom, #ddd, #999)',
                    margin: '0 auto'
                  }} />
                </div>
              );
            })}

            {/* Advanced Curled Streamers - Thin and Small */}
            {[...Array(50)].map((_, i) => {
              const colors = ['#ff006e', '#00f5ff', '#ffbe0b', '#8338ec', '#fb5607', '#06ffa5', '#118ab2', '#06a77d'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              const left = Math.random() * 100;
              const delay = Math.random() * 1.2;
              const duration = 5.5 + Math.random() * 2.5;
              const rotation = Math.random() * 4;
              
              return (
                <div
                  key={`streamer-${i}`}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: '-60px',
                    width: '4px',
                    height: '60px',
                    background: `linear-gradient(to bottom, ${color}, transparent)`,
                    animation: `streamerFall ${duration}s ease-in ${delay}s forwards`,
                    transformOrigin: 'top center',
                    borderRadius: '2px',
                    boxShadow: `0 0 8px ${color}80`,
                    '--rotation': `${rotation}`,
                    opacity: 0.85
                  }}
                />
              );
            })}

            {/* Falling Stars */}
            {[...Array(30)].map((_, i) => {
              const colors = ['#ffff00', '#00ffff', '#ffb3ff', '#06ffa5'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              const left = Math.random() * 100;
              const delay = Math.random() * 1;
              const duration = 6 + Math.random() * 2;
              
              return (
                <div
                  key={`star-${i}`}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: '-30px',
                    fontSize: '1.5rem',
                    animation: `starFall ${duration}s linear ${delay}s forwards`,
                    opacity: 0.9
                  }}
                >
                  ⭐
                </div>
              );
            })}

            {/* Tiny Circular Confetti */}
            {[...Array(60)].map((_, i) => {
              const colors = ['#ff006e', '#00f5ff', '#ffbe0b', '#8338ec', '#fb5607', '#06ffa5'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              const left = Math.random() * 100;
              const delay = Math.random() * 0.9;
              const duration = 5.5 + Math.random() * 2;
              const size = 3 + Math.random() * 6;
              const swayDistance = 20 + Math.random() * 40;
              
              return (
                <div
                  key={`dot-${i}`}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: '-20px',
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    borderRadius: '50%',
                    boxShadow: `0 0 ${size}px ${color}`,
                    animation: `swayingFall ${duration}s ease-in ${delay}s forwards`,
                    '--sway': `${swayDistance}px`,
                    opacity: 0.9
                  }}
                />
              );
            })}

            {/* Falling Sparkles */}
            {[...Array(40)].map((_, i) => {
              const symbols = ['✨', '💫', '⚡'];
              const symbol = symbols[Math.floor(Math.random() * symbols.length)];
              const left = Math.random() * 100;
              const delay = Math.random() * 1.1;
              const duration = 5 + Math.random() * 2.5;
              const size = 0.9 + Math.random() * 0.6;
              
              return (
                <div
                  key={`sprite-${i}`}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: '-30px',
                    fontSize: `${size}rem`,
                    animation: `spriteFall ${duration}s linear ${delay}s forwards`,
                    opacity: 0.85
                  }}
                >
                  {symbol}
                </div>
              );
            })}

            {/* Premium Confetti */}
            {[...Array(50)].map((_, i) => {
              const colors = ['#ff006e', '#00f5ff', '#ffbe0b', '#8338ec', '#fb5607', '#06ffa5', '#118ab2', '#06a77d'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              const left = Math.random() * 100;
              const delay = Math.random() * 0.8;
              const duration = 5.5 + Math.random() * 2.5;
              const size = 6 + Math.random() * 12;
              const isCircle = Math.random() > 0.5;
              
              return (
                <div
                  key={`conf-${i}`}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: '-30px',
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    borderRadius: isCircle ? '50%' : '2px',
                    boxShadow: `0 0 ${size / 2}px ${color}`,
                    animation: `premiumConfetti ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s forwards`,
                    opacity: 0.95
                  }}
                />
              );
            })}

            {/* Sparkle Particles */}
            {[...Array(35)].map((_, i) => {
              const colors = ['#ffff00', '#00ffff', '#ffb3ff', '#ffffff'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              const left = Math.random() * 100;
              const delay = Math.random() * 1;
              const size = 4 + Math.random() * 8;
              
              return (
                <div
                  key={`spark-${i}`}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: '-20px',
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    borderRadius: '50%',
                    boxShadow: `0 0 ${size * 2}px ${color}`,
                    animation: `advancedSparkle 4s ease-out ${delay}s forwards`,
                    opacity: 1
                  }}
                />
              );
            })}
          </div>
        )}
        
        <style>{`
          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-30px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes advancedFirework {
            0% {
              opacity: 1;
              transform: translate(0, 0) scale(1);
            }
            70% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translate(var(--px-x), var(--px-y)) scale(0);
            }
          }
          @keyframes balloonFloat {
            0% {
              transform: translateY(0) translateX(0) scale(0.6);
              opacity: 0;
            }
            15% {
              opacity: 1;
              transform: translateY(-50px) translateX(0) scale(1);
            }
            50% {
              transform: translateY(calc(-50vh)) translateX(var(--sway-dist));
            }
            100% {
              opacity: 0;
              transform: translateY(calc(-120vh)) translateX(0) scale(0.8);
            }
          }
          @keyframes advancedRibbonFall {
            0% {
              transform: translateY(0) rotateZ(0deg) translateX(0);
              opacity: 0.9;
            }
            50% {
              transform: translateY(calc(50vh)) rotateZ(180deg) translateX(var(--sway));
              opacity: 1;
            }
            100% {
              transform: translateY(calc(100vh + 100px)) rotateZ(360deg) translateX(0);
              opacity: 0.1;
            }
          }
          @keyframes streamerFall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0.9;
            }
            100% {
              transform: translateY(calc(100vh + 100px)) rotate(var(--rotation) * 180deg);
              opacity: 0.1;
            }
          }
          @keyframes starFall {
            0% {
              transform: translateY(0) scale(1) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(calc(100vh + 50px)) scale(0.5) rotate(360deg);
              opacity: 0.2;
            }
          }
          @keyframes swayingFall {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 1;
            }
            50% {
              transform: translateY(calc(50vh)) translateX(var(--sway));
              opacity: 1;
            }
            100% {
              transform: translateY(calc(100vh + 50px)) translateX(0);
              opacity: 0.2;
            }
          }
          @keyframes spriteFall {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(calc(100vh + 50px)) scale(0.3);
              opacity: 0;
            }
          }
          @keyframes premiumConfetti {
            0% {
              transform: translateY(0) rotateZ(0deg) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(calc(100vh + 50px)) rotateZ(720deg) scale(0.5);
              opacity: 0;
            }
          }
          @keyframes advancedSparkle {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            50% {
              transform: translateY(calc(50vh)) scale(0.8);
              opacity: 1;
            }
            100% {
              transform: translateY(calc(100vh + 50px)) scale(0);
              opacity: 0;
            }
          }
        `}</style>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          flex: '0 0 auto'
        }}>
          <div style={{
            fontSize: '3.3rem',
            fontWeight: 950,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #43e97b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '3px',
            letterSpacing: '-0.03em'
          }}>
            Quality Week 2025
          </div>
          <div style={{
            fontSize: '1.9rem',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '3px',
            letterSpacing: '0.05em'
          }}>
            ✨ Think Differently ✨
          </div>
          <div style={{
            height: '2px',
            width: '130px',
            background: 'linear-gradient(90deg, #667eea 0%, #f093fb 50%, #43e97b 100%)',
            borderRadius: '3px',
            margin: '0 auto',
            boxShadow: '0 0 15px rgba(102, 126, 234, 0.3)'
          }}></div>
        </div>

        {/* Two Column Layout */}
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '0.55fr 1.45fr',
          gap: '35px',
          alignItems: 'stretch'
        }}>
          {/* Left Column - Events */}
          <div style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderRadius: '14px',
            padding: '14px 12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '2px solid rgba(102, 126, 234, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px',
              textAlign: 'center',
              letterSpacing: '-0.02em',
              flex: '0 0 auto'
            }}>
              📅 Planned Events
            </h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              flex: 1,
              justifyContent: 'space-between',
              minHeight: 0
            }}>
              {events.map((event, idx) => (
                <div
                  key={idx}
                  style={{
                    background: hoveredIdx === idx 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : '#ffffff',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: hoveredIdx === idx 
                      ? '0 6px 20px rgba(102, 126, 234, 0.3)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    border: hoveredIdx === idx 
                      ? '2px solid rgba(255, 255, 255, 0.5)' 
                      : '2px solid rgba(102, 126, 234, 0.1)',
                    animation: `slideInLeft 0.4s ease-out ${idx * 0.05}s both`,
                    transform: hoveredIdx === idx ? 'translateX(6px) scale(1.02)' : 'translateX(0) scale(1)',
                    flex: 1
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div style={{
                    fontSize: '3rem',
                    transition: 'transform 0.3s ease',
                    transform: hoveredIdx === idx ? 'scale(1.15)' : 'scale(1)',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                    flexShrink: 0
                  }}>
                    {event.icon}
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: hoveredIdx === idx ? '#ffffff' : '#1e293b',
                    transition: 'color 0.3s ease',
                    letterSpacing: '0.01em'
                  }}>
                    {event.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Outcomes */}
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: '14px',
            padding: '20px 20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '2px solid rgba(251, 191, 36, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            position: 'relative',
            overflow: 'hidden',
            gap: '10px',
            minHeight: 0
          }}>
            {/* Decorative Background Pattern */}
            <div style={{
              position: 'absolute',
              top: '-20%',
              right: '-20%',
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-20%',
              left: '-20%',
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', height: '100%', zIndex: 1, minHeight: 0 }}>
              <h2 style={{
                fontSize: '2.3rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                textAlign: 'left',
                letterSpacing: '-0.02em',
                flex: '0 0 auto'
              }}>
                🎯 Outcomes
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minHeight: 0 }}>
                {/* Celebration Highlights - Split Layout */}
                <div style={{
                  flex: '2 1 65%',
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.92)',
                  borderRadius: '12px',
                  padding: '14px',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
                  border: '2px solid rgba(244, 114, 182, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  minHeight: 0
                }}>
                  <div style={{ 
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#9a3412',
                    letterSpacing: '-0.01em'
                  }}>
                    🎉 Celebration Highlights
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flex: 1, minHeight: 0 }}>
                    {/* LEFT SIDE - Carousel */}
                    <div style={{
                      flex: '1.7 1 63%',
                      background: '#ffffff',
                      borderRadius: '12px',
                      padding: '12px',
                      border: '2px solid rgba(244, 114, 182, 0.25)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      minHeight: 0,
                      height: '430px'
                    }}>
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        flex: 1,
                        background: '#f1f5f9',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        minHeight: '400px',
                        maxHeight: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img
                          src={outcomeImages[carouselIdx].src}
                          alt="Carousel highlight"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                            animation: 'fadeIn 0.6s ease-in-out'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          display: 'flex',
                          gap: '6px',
                          zIndex: 2
                        }}>
                          {outcomeImages.map((_, idx) => (
                            <div
                              key={idx}
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: carouselIdx === idx ? '#f59e0b' : 'rgba(255,255,255,0.5)',
                                transition: 'background 0.3s ease',
                                cursor: 'pointer',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                              }}
                              onClick={() => {
                                setCarouselIdx(idx)
                                clearInterval(carouselTimerRef.current)
                                carouselTimerRef.current = setInterval(() => {
                                  setCarouselIdx((prev) => (prev + 1) % 9)
                                }, 2000)
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE - Grid */}
                    <div style={{
                      flex: '1 1 37%',
                      background: '#ffffff',
                      borderRadius: '12px',
                      padding: '16px',
                      border: '2px solid rgba(244, 114, 182, 0.25)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '14px',
                      minHeight: 0,
                      height: '430px',
                      overflowY: 'auto',
                      paddingRight: '8px',
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(244, 114, 182, 0.4) transparent'
                    }}>
                      {outcomeImages.map((img, idx) => (
                        <div
                          key={img.src}
                          onClick={() => {
                            setCarouselIdx(idx)
                            clearInterval(carouselTimerRef.current)
                            carouselTimerRef.current = setInterval(() => {
                              setCarouselIdx((prev) => (prev + 1) % 9)
                            }, 2000)
                          }}
                          style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '1',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: carouselIdx === idx ? '3px solid #f59e0b' : '2px solid rgba(148, 163, 184, 0.3)',
                            boxShadow: carouselIdx === idx ? '0 0 14px rgba(245,158,11,0.5)' : '0 6px 14px rgba(0,0,0,0.12)',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            if (carouselIdx === idx) {
                              e.currentTarget.style.boxShadow = '0 0 12px rgba(245,158,11,0.4)';
                            } else {
                              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)';
                            }
                          }}
                        >
                          <img
                            src={img.src}
                            alt={`Grid thumbnail ${idx + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Section - QMS Understanding Metrics */}
                <div style={{
                  flex: '1 1 35%',
                  width: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 8px 18px rgba(0, 0, 0, 0.08)',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  justifyContent: 'flex-start',
                  gap: '14px',
                  minHeight: '140px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Title */}
                  <div style={{
                    fontSize: '2.3rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    letterSpacing: '-0.01em'
                  }}>
                    📊 QMS Understanding Impact
                  </div>

                  {/* Metrics Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    flex: 1
                  }}>
                    {/* Before */}
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0.05) 100%)',
                      borderRadius: '10px',
                      padding: '12px',
                      border: '2px solid rgba(249, 115, 22, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#92400e',
                        textAlign: 'center',
                        lineHeight: '1.2'
                      }}>
                        Before Sessions
                      </div>
                      <div style={{
                        fontSize: '3.6rem',
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        82%
                      </div>
                    </div>

                    {/* After */}
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                      borderRadius: '10px',
                      padding: '12px',
                      border: '2px solid rgba(34, 197, 94, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#166534',
                        textAlign: 'center',
                        lineHeight: '1.2'
                      }}>
                        After Sessions
                      </div>
                      <div style={{
                        fontSize: '3.6rem',
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        95%
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#64748b',
                    textAlign: 'center',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(148, 163, 184, 0.2)',
                    lineHeight: '1.3'
                  }}>
                    {/* 📝 Based on 150 participation feedback forms */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
