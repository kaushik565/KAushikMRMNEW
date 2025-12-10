import React, { useState } from 'react'

export default function QualityWeekPlaceholder() {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  const activities = [
    { icon: '📋', title: 'Quality Pledge', color: '#667eea', bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { icon: '📊', title: 'Badges Distribution', color: '#764ba2', bgGradient: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)' },
    { icon: '🎓', title: 'Quality Awareness I', color: '#f093fb', bgGradient: 'linear-gradient(135deg, #f093fb 0%, #4facfe 100%)' },
    { icon: '🧪', title: 'Online Quiz (Day I)', color: '#4facfe', bgGradient: 'linear-gradient(135deg, #4facfe 0%, #43e97b 100%)' },
    { icon: '🎨', title: 'Poster Preparation', color: '#43e97b', bgGradient: 'linear-gradient(135deg, #43e97b 0%, #fa709a 100%)' },
    { icon: '💡', title: 'Slogans', color: '#fa709a', bgGradient: 'linear-gradient(135deg, #fa709a 0%, #30cfd0 100%)' },
    { icon: '🌳', title: 'Quality Tree', color: '#30cfd0', bgGradient: 'linear-gradient(135deg, #30cfd0 0%, #a8edea 100%)' },
    { icon: '🎓', title: 'Quality Awareness II', color: '#a8edea', bgGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { icon: '🎓', title: 'Quality Awareness III', color: '#fed6e3', bgGradient: 'linear-gradient(135deg, #fed6e3 0%, #ffa502 100%)' },
    { icon: '🎓', title: 'Quality Awareness IV', color: '#ffa502', bgGradient: 'linear-gradient(135deg, #ffa502 0%, #09ffd0 100%)' },
    { icon: '🏆', title: 'HOD Quiz', color: '#09ffd0', bgGradient: 'linear-gradient(135deg, #09ffd0 0%, #feca57 100%)' },
    { icon: '🎁', title: 'Prize Distribution', color: '#feca57', bgGradient: 'linear-gradient(135deg, #feca57 0%, #667eea 100%)' }
  ]

  return (
    <section
      data-state="quality-week-placeholder"
      style={{
        background: '#ffffff'
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        padding: '30px 50px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
      <style>{`
        @keyframes scalePopIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <div style={{
          fontSize: '3rem',
          fontWeight: 950,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #43e97b 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
          letterSpacing: '-0.03em'
        }}>
          Quality Week 2025
        </div>
        <div style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          color: '#0f172a',
          marginBottom: '8px',
          letterSpacing: '0.05em'
        }}>
          ✨ Celebrate Excellence • Think Differently ✨
        </div>
        <div style={{
          height: '3px',
          width: '160px',
          background: 'linear-gradient(90deg, #667eea 0%, #f093fb 50%, #43e97b 100%)',
          borderRadius: '3px',
          margin: '0 auto',
          boxShadow: '0 0 15px rgba(102, 126, 234, 0.3)'
        }}></div>
      </div>

      {/* Grid */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '14px',
          width: '100%',
          maxWidth: '1500px'
        }}>
          {activities.map((activity, idx) => (
            <div
              key={idx}
              style={{
                background: activity.bgGradient,
                borderRadius: '14px',
                padding: '24px 16px',
                boxShadow: hoveredIdx === idx ? '0 12px 30px rgba(0, 0, 0, 0.15)' : '0 6px 18px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '150px',
                animation: `scalePopIn 0.5s ease-out ${idx * 0.06}s both`,
                transform: hoveredIdx === idx ? 'translateY(-6px) scale(1.04)' : 'translateY(0) scale(1)'
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Shine Effect on Hover */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                animation: hoveredIdx === idx ? 'none' : 'none',
                pointerEvents: 'none'
              }}></div>

              {/* Icon */}
              <div
                style={{
                  fontSize: '3rem',
                  marginBottom: '12px',
                  transition: 'all 0.4s ease',
                  transform: hoveredIdx === idx ? 'scale(1.2) rotate(8deg)' : 'scale(1) rotate(0deg)',
                  filter: hoveredIdx === idx ? 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2))' : 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1))'
                }}
              >
                {activity.icon}
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  zIndex: 1,
                  lineHeight: '1.3',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                  letterSpacing: '0.02em'
                }}
              >
                {activity.title}
              </div>

              {/* Bottom Accent Line */}
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.7)',
                transform: hoveredIdx === idx ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 0.4s ease',
                transformOrigin: 'center'
              }}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - Bottom Section */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        background: '#f8fafc',
        borderTop: '2px solid rgba(102, 126, 234, 0.15)',
        borderRadius: '12px',
        flex: '0 0 auto',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#0f172a',
            letterSpacing: '0.05em'
          }}>
            🎯 Let's Make Quality Our Priority
          </div>
          <div style={{
            width: '2px',
            height: '20px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(15,23,42, 0.3) 50%, transparent 100%)'
          }}></div>
          <div style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#475569',
            letterSpacing: '0.03em'
          }}>
            Participate • Engage • Excel
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
