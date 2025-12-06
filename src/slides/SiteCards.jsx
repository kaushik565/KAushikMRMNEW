import { useState } from 'react'

const sites = [
  {
    id: 'SITE-I',
    title: '🏭 SITE-I',
    gradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    border: '#2563eb',
    accent: '#1d4ed8'
  },
  {
    id: 'SITE-III',
    title: '🏭 SITE-III',
    gradient: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
    border: '#e11d48',
    accent: '#be123c'
  },
  {
    id: 'SITE-V',
    title: '🏭 SITE-V',
    gradient: 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)',
    border: '#7c3aed',
    accent: '#6d28d9'
  }
]

const categories = [
  'Incidents',
  'Corrective Actions',
  'Preventive Actions',
  'Out of Specifications',
  'Change Controls'
]

export default function SiteCards() {
  const [activeSite, setActiveSite] = useState(null)

  return (
    <section className="slide" data-transition="fade">
      <div className="slide-content" style={{ padding: '32px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '16px' }}>
          <div>
            <p style={{ color: '#475569', margin: 0, fontSize: '0.9em', fontWeight: 600 }}>Site Navigator</p>
            <h2 style={{ margin: '4px 0 6px', color: '#0f172a', fontWeight: 800, letterSpacing: '-0.02em' }}>Pick a site, then a category</h2>
            <p style={{ margin: 0, color: '#64748b', maxWidth: '720px', fontSize: '0.95em' }}>
              Each card opens a quick window for that site so you can jump into the category you need.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          {sites.map(site => (
            <div
              key={site.id}
              onClick={() => setActiveSite(site)}
              style={{
                background: site.gradient,
                borderLeft: `6px solid ${site.border}`,
                borderRadius: '12px',
                padding: '18px 16px',
                boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 26px rgba(15, 23, 42, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 23, 42, 0.06)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, color: site.accent, fontWeight: 800, fontSize: '1.05em' }}>{site.title}</h3>
                <span style={{ fontSize: '0.8em', color: '#0f172a', fontWeight: 600 }}>{site.id}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {categories.map(cat => (
                  <span
                    key={`${site.id}-${cat}`}
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: '#0f172a',
                      borderRadius: '999px',
                      padding: '8px 12px',
                      fontSize: '0.82em',
                      fontWeight: 700,
                      border: '1px solid rgba(15, 23, 42, 0.06)'
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeSite && (
        <div className="modal-overlay" onClick={() => setActiveSite(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '860px', width: '92%', borderRadius: '14px', padding: '20px 22px' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '12px' }}>
              <div>
                <p style={{ margin: 0, color: '#475569', fontWeight: 600, fontSize: '0.9em' }}>Site Window</p>
                <h3 style={{ margin: '4px 0 6px', color: '#0f172a', fontWeight: 800 }}>{activeSite.title}</h3>
                <p style={{ margin: 0, color: '#64748b', maxWidth: '600px' }}>
                  Choose a category below to continue. (Hook this to navigation or data views as needed.)
                </p>
              </div>
              <button className="modal-close" onClick={() => setActiveSite(null)} aria-label="Close site window" style={{ fontSize: '1.2em' }}>×</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {categories.map(cat => (
                <button
                  key={`${activeSite.id}-${cat}`}
                  style={{
                    padding: '14px 12px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    color: '#0f172a',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)',
                    textAlign: 'left'
                  }}
                  onClick={() => setActiveSite({ ...activeSite, selectedCategory: cat })}
                >
                  <div style={{ fontSize: '0.78em', color: '#475569', marginBottom: '4px' }}>Category</div>
                  <div style={{ fontSize: '1em' }}>{cat}</div>
                  <div style={{ fontSize: '0.78em', color: '#64748b', marginTop: '6px' }}>Tap to proceed</div>
                </button>
              ))}
            </div>

            {activeSite.selectedCategory && (
              <div style={{ marginTop: '16px', padding: '12px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.9em', color: '#0f172a', fontWeight: 700 }}>
                  {activeSite.title} · {activeSite.selectedCategory}
                </div>
                <div style={{ fontSize: '0.85em', color: '#475569', marginTop: '4px' }}>
                  Placeholder action – wire this button to your navigation or data view.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
