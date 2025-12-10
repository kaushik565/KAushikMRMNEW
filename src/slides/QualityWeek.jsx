import React from 'react'

export default function QualityWeek() {
  const activities = [
    { icon: '📋', title: 'Quality Pledge', date: 'NOV 10', desc: 'Employees share commitment to quality via mail & take pledge in departments', color: '#e0e7ff', textColor: '#1e293b' },
    { icon: '📊', title: 'Badges Distribution', date: 'NOV 10', desc: 'Special Quality Week badges symbolizing dedication to excellence', color: '#fef08a', textColor: '#1e293b' },
    { icon: '✓', title: 'Quality Pledge', date: 'NOV 10', desc: 'Shared commitment captures pride & dedication in every task we do', color: '#e0e7ff', textColor: '#1e293b' },
    { icon: '🎓', title: 'Quality Awareness Session I', date: 'NOV 10', desc: 'Topic: Quality Principles, Policy & Objectives | Time: 14:45–15:45', color: '#a5f3fc', textColor: '#0c4a6e' },
    { icon: '🧪', title: 'Online Quiz (Day I)', date: 'NOV 10', desc: 'Test your knowledge on quality topics | 16:00–16:30 hrs', color: '#fef3c7', textColor: '#1e293b' },
    { icon: '🎨', title: 'Poster Preparation', date: 'NOV 11', desc: 'Nominate 2–3 employees per department on "THINK DIFFERENTLY-QUALITY"', color: '#fbcfe8', textColor: '#8b1538' },
    { icon: '💡', title: 'Slogans', date: 'NOV 11', desc: 'Submit slogans on "THINK DIFFERENTLY-QUALITY" theme', color: '#bfdbfe', textColor: '#0c2d6b' },
    { icon: '🌳', title: 'Quality Tree', date: 'NOV 11', desc: 'Beautify the QUALITY TREE with thoughts on sticky notes', color: '#bbf7d0', textColor: '#065f46' },
    { icon: '🎓', title: 'Quality Awareness Session II', date: 'NOV 11', desc: 'Topic: MDR 2017 & ISO 13485 Awareness', color: '#a5f3fc', textColor: '#0c4a6e' },
    { icon: '🎓', title: 'Quality Awareness Session III', date: 'NOV 12', desc: 'Topic: Significance of Quality Events', color: '#a5f3fc', textColor: '#0c4a6e' },
    { icon: '🎓', title: 'Quality Awareness Session IV', date: 'NOV 13', desc: 'Topic: Importance of QC', color: '#fbbf24', textColor: '#1e293b' },
    { icon: '🏆', title: 'HOD Quiz', date: 'NOV 14', desc: 'Quiz on QMS for HODs | Register 2 team members by 12:00 Noon NOV 13', color: '#86efac', textColor: '#14532d' },
    { icon: '🎁', title: 'Prize Distribution', date: 'NOV 14', desc: 'Celebrate excellence and reward achievements | 15:00 Hrs', color: '#d8b4fe', textColor: '#4c1d95' }
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
        {/* EVENTS Banner */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            fontSize: '2.2rem',
            fontWeight: 900,
            letterSpacing: '8px',
            color: '#0f172a',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '12px'
          }}>
            <div style={{ display: 'inline-flex', gap: '4px' }}>
              {['E', 'V', 'E', 'N', 'T', 'S'].map((letter, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '50px',
                    height: '50px',
                    background: ['#c41e3a', '#003478', '#f59e0b', '#c41e3a', '#0ea5e9', '#7f8c0e'][idx],
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '1.8rem',
                    transform: 'skewX(-10deg)',
                    border: '2px solid rgba(0,0,0,0.1)'
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: '4px', width: '100%', background: '#c41e3a', borderRadius: '2px', margin: '16px auto' }}></div>
        </div>

        {/* Theme & Dates */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>
            Quality Week 2025
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#475569', marginBottom: '12px' }}>
            10 — 14 November
          </div>
          <div style={{
            fontSize: '1.8rem',
            fontWeight: 900,
            color: '#c41e3a',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '12px 20px',
            background: 'rgba(196, 30, 58, 0.08)',
            borderRadius: '12px',
            display: 'inline-block',
            border: '2px solid #c41e3a'
          }}>
            ✓ THINK DIFFERENTLY - QUALITY
          </div>
        </div>

        {/* Activities Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '14px',
          marginBottom: '28px'
        }}>
          {activities.map((activity, idx) => (
            <div
              key={idx}
              style={{
                background: activity.color,
                borderRadius: '18px',
                padding: '20px',
                boxShadow: '0 8px 18px rgba(15, 23, 42, 0.08)',
                border: '2px solid rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(15, 23, 42, 0.14)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 18px rgba(15, 23, 42, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ fontSize: '2rem', minWidth: '48px' }}>{activity.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '4px'
                  }}>
                    {activity.date}
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: activity.textColor,
                    marginBottom: '8px'
                  }}>
                    {activity.title}
                  </div>
                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: activity.textColor,
                    lineHeight: 1.5,
                    opacity: 0.9
                  }}>
                    {activity.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div style={{
          textAlign: 'center',
          padding: '28px 32px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '18px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)'
        }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            🎉 Let's Celebrate Our Commitment to Quality
          </div>
          <div style={{
            fontSize: '1.15rem',
            fontWeight: 600,
            color: '#475569',
            lineHeight: 1.7,
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            Join us in this special week to reaffirm our collective commitment to quality, compliance, and continuous improvement. Together, we ensure safety, reliability, and excellence in every aspect of our operations — for better patient outcomes.
          </div>
        </div>
      </div>
    </section>
  )
}
