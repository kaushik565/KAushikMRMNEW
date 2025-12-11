import React, { useState, useEffect, useRef } from 'react'

export default function QualityWeekPlaceholder() {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [showBadgeModal, setShowBadgeModal] = useState(false)
  const slideRef = useRef(null)
  const hasShownRef = useRef(false)

  // Show badge modal when slide becomes active
  useEffect(() => {
    const checkAndShowBadge = () => {
      if (slideRef.current?.classList.contains('present')) {
        setShowBadgeModal(true)
        setTimeout(() => setShowBadgeModal(false), 1000)
      }
    }

    // Use MutationObserver to detect when slide becomes active
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isPresentNow = slideRef.current?.classList.contains('present')
          if (isPresentNow) {
            setShowBadgeModal(true)
            setTimeout(() => setShowBadgeModal(false), 1000)
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
        
        <style>{`
          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-30px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
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
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
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

            <h2 style={{
              fontSize: '2.3rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '14px',
              textAlign: 'center',
              letterSpacing: '-0.02em',
              zIndex: 1,
              flex: '0 0 auto'
            }}>
              🎯 Outcomes
            </h2>

            {/* Under Development Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              zIndex: 1,
              flex: 1,
              justifyContent: 'center',
              minHeight: 0
            }}>
              <div style={{
                fontSize: '6.5rem',
                animation: 'fadeIn 1s ease-in-out infinite alternate'
              }}>
                🚧
              </div>
              
              <div style={{
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2.3rem',
                  fontWeight: 800,
                  color: '#92400e',
                  marginBottom: '6px',
                  letterSpacing: '-0.01em'
                }}>
                  Under Development
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#b45309',
                  lineHeight: '1.4'
                }}>
                  Outcomes and metrics will be<br />
                  displayed after completion
                </div>
              </div>

              {/* Progress Indicator */}
              <div style={{
                width: '250px',
                height: '5px',
                background: 'rgba(180, 83, 9, 0.2)',
                borderRadius: '10px',
                overflow: 'hidden',
                marginTop: '8px'
              }}>
                <div style={{
                  width: '40%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
                  borderRadius: '10px',
                  animation: 'fadeIn 1.5s ease-in-out infinite alternate'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
