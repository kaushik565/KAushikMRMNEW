import React from 'react'

export default function QualityWeek() {
  const activities = [
    { icon: '📋', title: 'Quality Pledge', desc: 'Employees share commitment to quality via mail & take pledge in departments', color: '#e0e7ff', textColor: '#1e293b' },
    { icon: '📊', title: 'Badges Distribution', desc: 'Special Quality Week badges symbolizing dedication to excellence', color: '#fef08a', textColor: '#1e293b' },
    { icon: '🎓', title: 'Quality Awareness Session I', desc: 'Topic: Quality Principles, Policy & Objectives', color: '#a5f3fc', textColor: '#0c4a6e' },
    { icon: '🧪', title: 'Online Quiz (Day I)', desc: 'Test your knowledge on quality topics', color: '#fef3c7', textColor: '#1e293b' },
    { icon: '🎨', title: 'Poster Preparation', desc: 'Nominate 2–3 employees per department on "THINK DIFFERENTLY-QUALITY"', color: '#fbcfe8', textColor: '#8b1538' },
    { icon: '💡', title: 'Slogans', desc: 'Submit slogans on "THINK DIFFERENTLY-QUALITY" theme', color: '#bfdbfe', textColor: '#0c2d6b' },
    { icon: '🌳', title: 'Quality Tree', desc: 'Beautify the QUALITY TREE with thoughts on sticky notes', color: '#bbf7d0', textColor: '#065f46' },
    { icon: '🎓', title: 'Quality Awareness Session II', desc: 'Topic: MDR 2017 & ISO 13485 Awareness', color: '#a5f3fc', textColor: '#0c4a6e' },
    { icon: '🎓', title: 'Quality Awareness Session III', desc: 'Topic: Significance of Quality Events', color: '#a5f3fc', textColor: '#0c4a6e' },
    { icon: '🎓', title: 'Quality Awareness Session IV', desc: 'Topic: Importance of QC', color: '#fbbf24', textColor: '#1e293b' },
    { icon: '🏆', title: 'HOD Quiz', desc: 'Quiz on QMS for HODs | Register 2 team members by Noon NOV 13', color: '#86efac', textColor: '#14532d' },
    { icon: '🎁', title: 'Prize Distribution', desc: 'Celebrate excellence and reward achievements', color: '#d8b4fe', textColor: '#4c1d95' }
  ]

  return (
    <section
      data-state="quality-week"
      style={{
        minHeight: '100vh',
        padding: '40px 32px',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #fef3c7 50%, #e0f2fe 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Background Elements */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', fontSize: '300px', opacity: 0.03 }}>🎯</div>
      <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', fontSize: '280px', opacity: 0.03 }}>🌟</div>

      <div style={{ maxWidth: '1800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            color: '#0f172a',
            marginBottom: '12px',
            letterSpacing: '-0.02em'
          }}>
            Quality Week 2025
          </div>
          <div style={{ height: '4px', width: '100%', background: 'linear-gradient(90deg, #c41e3a 0%, #0ea5e9 50%, #f59e0b 100%)', borderRadius: '2px', margin: '0 auto' }}></div>
        </div>

        {/* Two-Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '0.6fr 1.4fr', gap: '32px', marginBottom: '28px' }}>
          {/* Left Column - Activities in vertical style */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              color: '#0f172a',
              marginBottom: '6px',
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '10px',
              textAlign: 'center',
              border: '2px solid #e2e8f0'
            }}>
              📋 Planned Activities
            </div>
            {activities.map((activity, idx) => (
              <div
                key={idx}
                style={{
                  background: activity.color,
                  borderRadius: '12px',
                  padding: '10px 14px',
                  boxShadow: '0 4px 10px rgba(15, 23, 42, 0.08)',
                  border: '2px solid rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(6px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 23, 42, 0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.boxShadow = '0 6px 14px rgba(15, 23, 42, 0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '1.8rem', minWidth: '40px' }}>{activity.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: activity.textColor
                    }}>
                      {activity.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Outcomes (placeholder) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              color: '#0f172a',
              marginBottom: '6px',
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '10px',
              textAlign: 'center',
              border: '2px solid #e2e8f0'
            }}>
              🎯 Outcomes & Achievements
            </div>
            <div style={{
              flex: 1,
              background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
              borderRadius: '14px',
              padding: '30px',
              border: '2px dashed #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '16px', opacity: 0.3 }}>📊</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#64748b', marginBottom: '8px' }}>
                  Outcomes Coming Soon
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#94a3b8' }}>
                  Event results and achievements will be added here
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}
