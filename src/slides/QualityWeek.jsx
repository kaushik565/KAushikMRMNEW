import React, { useState } from 'react'

export default function QualityWeek() {
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
      data-state="quality-week"
      style={{
        width: '100vw',
        height: '100vh',
        padding: '0',
        background: 'linear-gradient(145deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
    >
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
        top: '-200px',
        left: '-100px',
        pointerEvents: 'none',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(240, 147, 251, 0.15) 0%, transparent 70%)',
        bottom: '-150px',
        right: '-100px',
        pointerEvents: 'none',
        animation: 'float 10s ease-in-out infinite 1s'
      }}></div>
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79, 172, 254, 0.15) 0%, transparent 70%)',
        top: '50%',
        right: '-150px',
        pointerEvents: 'none',
        animation: 'float 12s ease-in-out infinite 2s'
      }}></div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scalePopIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Header - Top Section */}
      <div style={{
        width: '100%',
        padding: '30px 40px 20px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        animation: 'slideInDown 0.8s ease-out'
      }}>
        <div style={{
          fontSize: '4rem',
          fontWeight: 950,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #43e97b 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px',
          letterSpacing: '-0.03em'
        }}>
          Quality Week 2025
        </div>
        <div style={{
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'rgba(255, 255, 255, 0.85)',
          marginBottom: '8px',
          letterSpacing: '0.05em'
        }}>
          ✨ Celebrate Excellence • Think Differently ✨
        </div>
        <div style={{
          height: '5px',
          width: '200px',
          background: 'linear-gradient(90deg, #667eea 0%, #f093fb 50%, #43e97b 100%)',
          borderRadius: '3px',
          margin: '0 auto',
          boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)'
        }}></div>
      </div>

      {/* Main Content - Activities Grid (Full Screen Use) */}
      <div style={{
        flex: 1,
        width: '100%',
        padding: '20px 40px 30px',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* 3x4 Grid Layout - Perfect for 12 items */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '18px',
          height: '100%',
          alignItems: 'stretch',
          justifyItems: 'stretch'
        }}>
          {activities.map((activity, idx) => (
            <div
              key={idx}
              style={{
                background: activity.bgGradient,
                borderRadius: '20px',
                padding: '24px 20px',
                boxShadow: hoveredIdx === idx ? '0 20px 50px rgba(0, 0, 0, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                animation: `scalePopIn 0.5s ease-out ${idx * 0.06}s both`,
                transform: hoveredIdx === idx ? 'translateY(-12px) scale(1.08)' : 'translateY(0) scale(1)',
                backdropFilter: 'blur(10px)'
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
                  fontSize: '3.5rem',
                  marginBottom: '12px',
                  transition: 'all 0.4s ease',
                  transform: hoveredIdx === idx ? 'scale(1.25) rotate(10deg)' : 'scale(1) rotate(0deg)',
                  filter: hoveredIdx === idx ? 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))' : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
                }}
              >
                {activity.icon}
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  zIndex: 1,
                  lineHeight: '1.3',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
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
                background: 'rgba(255, 255, 255, 0.6)',
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
        width: '100%',
        padding: '20px 40px',
        background: 'rgba(15, 12, 41, 0.8)',
        backdropFilter: 'blur(10px)',
        borderTop: '2px solid rgba(102, 126, 234, 0.3)',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.05em'
          }}>
            🎯 Let's Make Quality Our Priority
          </div>
          <div style={{
            width: '2px',
            height: '24px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)'
          }}></div>
          <div style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.8)',
            letterSpacing: '0.03em'
          }}>
            Participate • Engage • Excel
          </div>
        </div>
      </div>
    </section>
  )
}
