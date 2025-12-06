// IPQA Key Metrics Overview - Modern Horizontal Layout

export default function IPQAOverview() {
  // IPQA Key Metrics Data
  const metricsData = {
    'SITE-I': {
      color: '#dc2626',
      bgColor: '#fee2e2',
      accentColor: '#b91c1c',
      metrics: {
        'Audits': { value: 145, trend: '+18%', status: 'Excellent' },
        'NCs': { value: 78, trend: '-35%', status: 'Improved' },
        'Compliance': { value: '94%', trend: '+8%', status: 'Good' },
        'Training': { value: '94%', trend: '+25%', status: 'Excellent' },
        'Open Issues': { value: 9, trend: '-17%', status: 'Stable' }
      }
    },
    'SITE-III': {
      color: '#8b5cf6',
      bgColor: '#ede9fe',
      accentColor: '#6d28d9',
      metrics: {
        'Audits': { value: 92, trend: '+22%', status: 'Excellent' },
        'NCs': { value: 56, trend: '-42%', status: 'Excellent' },
        'Compliance': { value: '96%', trend: '+12%', status: 'Excellent' },
        'Training': { value: '96%', trend: '+31%', status: 'Excellent' },
        'Open Issues': { value: 6, trend: '-25%', status: 'Excellent' }
      }
    },
    'SITE-V': {
      color: '#0ea5e9',
      bgColor: '#cffafe',
      accentColor: '#0369a1',
      metrics: {
        'Incoming Sampling': { value: 1405, trend: '+12%', status: 'Excellent' },
        'In-Process Sampling': { value: 3057, trend: '+18%', status: 'Excellent' },
        'BMR Verification': { value: 643, trend: '+15%', status: 'Good' },
        'Transfer Note Verif.': { value: 566, trend: '+8%', status: 'Stable' },
        'Destruction Records': { value: 52, trend: '-28%', status: 'Excellent' }
      }
    }
  }

  // Modern Metric Tile Component
  const MetricTile = ({ label, value, trend, status, color }) => {
    const isTrendPositive = trend.includes('+')
    
    return (
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '14px 12px',
        textAlign: 'center',
        border: `2px solid ${color}30`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = `0 12px 24px ${color}25`
        e.currentTarget.style.borderColor = color
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = `${color}30`
      }}>
        {/* Top accent bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: color
        }}></div>

        <div style={{ fontSize: '0.7em', fontWeight: '700', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {label}
        </div>
        <div style={{ fontSize: '1.8em', fontWeight: '800', color: color, marginBottom: '4px' }}>
          {value}
        </div>
        <div style={{
          fontSize: '0.75em',
          fontWeight: '700',
          color: isTrendPositive ? '#22c55e' : '#ef4444',
          marginBottom: '6px'
        }}>
          {trend}
        </div>
        <div style={{
          fontSize: '0.65em',
          fontWeight: '600',
          color: '#9ca3af',
          backgroundColor: `${color}10`,
          padding: '4px 8px',
          borderRadius: '6px',
          display: 'inline-block'
        }}>
          {status}
        </div>
      </div>
    )
  }

  // Site Card Component - Horizontal Layout
  const SiteCard = ({ siteName, siteData }) => {
    return (
      <div style={{
        backgroundColor: siteData.bgColor,
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '16px',
        border: `3px solid ${siteData.color}`,
        boxShadow: `0 4px 12px ${siteData.color}20`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${siteData.color}15 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none'
        }}></div>

        {/* Site Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: '12px',
            height: '48px',
            background: `linear-gradient(180deg, ${siteData.color}, ${siteData.color}40)`,
            borderRadius: '6px',
            marginRight: '12px'
          }}></div>
          <div>
            <div style={{ fontSize: '1.4em', fontWeight: '800', color: siteData.color }}>
              {siteName}
            </div>
            <div style={{ fontSize: '0.8em', color: '#6b7280', fontWeight: '600' }}>
              IPQA Performance Metrics
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '12px',
          position: 'relative',
          zIndex: 1
        }}>
          {Object.entries(siteData.metrics).map(([metricName, metricData]) => (
            <MetricTile
              key={metricName}
              label={metricName}
              value={metricData.value}
              trend={metricData.trend}
              status={metricData.status}
              color={siteData.color}
            />
          ))}
        </div>
      </div>
    )
  }

  // Comparison Bar Component
  const ComparisonBar = () => {
    const sites = ['SITE-I', 'SITE-III', 'SITE-V']
    const metrics = ['Compliance', 'Training', 'NCs']

    return (
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '16px',
        border: '2px solid #e5e7eb'
      }}>
        <div style={{ fontSize: '1em', fontWeight: '800', color: '#111827', marginBottom: '16px' }}>
          📊 Activity Volume Comparison
        </div>

        {['Incoming Sampling', 'In-Process Sampling', 'BMR Verification'].map(metricLabel => (
          <div key={metricLabel} style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '0.9em', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>
              {metricLabel}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {sites.map(site => {
                const metricName = metricLabel === 'Incoming Sampling' ? 'Incoming Sampling' : 
                                   metricLabel === 'In-Process Sampling' ? 'In-Process Sampling' : 'BMR Verification'
                const data = metricsData[site].metrics[metricName]
                if (!data) return null
                
                const value = typeof data.value === 'string' ? parseInt(data.value) : data.value
                const color = metricsData[site].color
                const maxValue = 3057 // Max value from all data

                return (
                  <div key={`${site}-${metricLabel}`} style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    height: '32px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: `1px solid ${color}40`
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      height: '100%',
                      width: `${(value / maxValue) * 100}%`,
                      backgroundColor: `${color}40`,
                      borderRadius: '8px 0 0 8px',
                      transition: 'width 0.5s ease'
                    }}></div>
                    <div style={{
                      position: 'relative',
                      zIndex: 1,
                      width: '100%',
                      textAlign: 'center',
                      fontSize: '0.8em',
                      fontWeight: '700',
                      color: '#111827'
                    }}>
                      {site}: {data.value}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section className="content-slide" style={{ overflowY: 'auto', paddingTop: '20px' }}>
      {/* Header Section */}
      <div style={{
        marginBottom: '20px',
        position: 'relative'
      }}>
        <h2 style={{
          fontSize: '2em',
          fontWeight: '800',
          color: '#111827',
          marginBottom: '4px',
          marginTop: '0px'
        }}>
          📊 Key Metrics Overview - IPQA
        </h2>
        <div style={{
          height: '4px',
          background: 'linear-gradient(90deg, #059669, #8b5cf6, #0ea5e9)',
          borderRadius: '2px',
          width: '200px',
          marginBottom: '12px'
        }}></div>
        <p style={{ fontSize: '0.9em', color: '#6b7280', margin: '0px' }}>
          In-Process Quality Assurance Performance Across Manufacturing Sites
        </p>
      </div>

      {/* Site Cards */}
      {Object.entries(metricsData).map(([siteName, siteData]) => (
        <SiteCard key={siteName} siteName={siteName} siteData={siteData} />
      ))}

      {/* Comparison Section */}
      <ComparisonBar />

      {/* Footer Insights */}
      <div style={{
        marginTop: '16px',
        padding: '16px',
        backgroundColor: '#f0fdf4',
        border: '2px solid #86efac',
        borderRadius: '12px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        {Object.entries(metricsData).map(([site, data]) => (
          <div key={site} style={{
            padding: '12px',
            backgroundColor: '#ffffff',
            border: `2px solid ${data.color}40`,
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.85em', fontWeight: '700', color: data.color, marginBottom: '4px' }}>
              {site} Highlight
            </div>
            <div style={{ fontSize: '0.75em', color: '#6b7280' }}>
              {site === 'SITE-I' && 'Solid Performance with Strong Compliance'}
              {site === 'SITE-III' && 'Consistent Quality Verification'}
              {site === 'SITE-V' && 'Highest In-Process Sampling Volume (3,057)'}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
