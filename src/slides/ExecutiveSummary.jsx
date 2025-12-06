import { 
  incidentData, incidentDuration, correctiveActionData, preventiveActionData, 
  outOfServiceData, changeControlData, lineApprovalRates, calibrationData 
} from '../data'

export default function ExecutiveSummary() {
  // 3 Sites Data
  const sitesData = {
    'SITE-I': {
      Incidents: { total: 262, improvement: 13, from: 20, to: 17 },
      CA: { total: 89, improvement: -42, from: 2, to: 4 },
      PA: { total: 29, improvement: 56, from: 25, to: 11 },
      OOS: { total: 259, improvement: 49, avg: 21, latest: 17 },
      CC: { total: 492, improvement: 13, from: 46, to: 40 }
    },
    'SITE-III': {
      Incidents: { total: 82, improvement: 42, from: 24, to: 14 },
      CA: { total: 52, improvement: 16, from: 56, to: 47 },
      PA: { total: 66, improvement: 6, from: 36, to: 34 },
      OOS: { total: 159, improvement: 49, avg: 14, latest: 9 },
      CC: { total: 261, improvement: 61, from: 41, to: 16 }
    },
    'SITE-V': {
      Incidents: { total: 196, improvement: 59, from: 17, to: 7 },
      CA: { total: 57, improvement: 71, from: 5, to: 4 },
      PA: { total: 41, improvement: 20, from: 40, to: 32 },
      OOS: { total: 89, improvement: 59, avg: 12, latest: 7 },
      CC: { total: 178, improvement: 23, from: 50, to: 39 }
    }
  }

  const categoryColors = {
    Incidents: '#ef4444',
    CA: '#8b5cf6',
    PA: '#f59e0b',
    OOS: '#f97316',
    CC: '#3b82f6'
  }

  const siteColors = {
    'SITE-I': '#dc2626',
    'SITE-III': '#8b5cf6',
    'SITE-V': '#0ea5e9'
  }

  // Comparison chart component
  const ComparisonChart = ({ site, data }) => {
    return (
      <div style={{ marginBottom: '12px' }}>
        <h3 style={{ fontSize: '0.9em', fontWeight: '700', color: siteColors[site], marginBottom: '10px', marginTop: '0px' }}>
          {site}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
          {Object.entries(data).map(([category, metrics]) => {
            const isNegative = metrics.improvement < 0
            const barHeight = Math.abs(metrics.improvement)
            return (
              <div key={category} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                padding: '10px',
                borderRadius: '6px',
                border: `2px solid ${categoryColors[category]}30`
              }}>
                <div style={{
                  width: '100%',
                  height: '80px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '70%',
                    height: `${Math.min(barHeight, 80)}px`,
                    backgroundColor: isNegative ? '#ef4444' : categoryColors[category],
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '0.85em',
                    position: 'relative'
                  }}>
                    {Math.abs(metrics.improvement)}%
                  </div>
                </div>
                <div style={{ fontSize: '0.75em', fontWeight: '700', color: '#111827', marginBottom: '2px', textAlign: 'center' }}>
                  {category}
                </div>
                <div style={{ fontSize: '0.7em', color: '#6b7280', textAlign: 'center', marginBottom: '2px' }}>
                  {metrics.from || metrics.avg} → {metrics.to || metrics.latest}
                </div>
                <div style={{ fontSize: '0.65em', color: '#9ca3af' }}>
                  {metrics.total} items
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Overall comparison bar
  const OverallComparison = () => {
    const categories = ['Incidents', 'CA', 'PA', 'OOS', 'CC']
    const improvements = categories.map(cat => {
      let sum = 0, count = 0
      Object.values(sitesData).forEach(site => {
        if (site[cat]) {
          sum += site[cat].improvement
          count++
        }
      })
      return Math.round(sum / count)
    })

    return (
      <div style={{
        padding: '14px',
        backgroundColor: '#f0f9ff',
        border: '2px solid #0ea5e9',
        borderRadius: '8px',
        marginBottom: '14px'
      }}>
        <h3 style={{ fontSize: '0.95em', fontWeight: '700', color: '#0ea5e9', marginBottom: '12px', marginTop: '0px' }}>
          📊 Overall Performance (Average Improvement Across All Sites)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {categories.map((cat, idx) => (
            <div key={cat} style={{ textAlign: 'center' }}>
              <div style={{
                width: '100%',
                height: '100px',
                backgroundColor: '#e0f2fe',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginBottom: '8px',
                position: 'relative'
              }}>
                <div style={{
                  width: '60%',
                  height: `${Math.min(Math.abs(improvements[idx]), 100)}px`,
                  backgroundColor: improvements[idx] < 0 ? '#ef4444' : categoryColors[cat],
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '1em'
                }}>
                  {Math.abs(improvements[idx])}%
                </div>
              </div>
              <div style={{ fontSize: '0.8em', fontWeight: '700', color: '#111827' }}>
                {cat}
              </div>
              <div style={{ fontSize: '0.7em', color: '#6b7280', marginTop: '4px' }}>
                Avg Improvement
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Site comparison grid
  const SiteComparisonGrid = () => {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '14px'
      }}>
        {Object.entries(sitesData).map(([site, data]) => {
          const totalItems = Object.values(data).reduce((sum, m) => sum + m.total, 0)
          const avgImprovement = Math.round(
            Object.values(data).reduce((sum, m) => sum + m.improvement, 0) / Object.values(data).length
          )

          return (
            <div key={site} style={{
              padding: '14px',
              backgroundColor: siteColors[site] + '10',
              border: `3px solid ${siteColors[site]}`,
              borderRadius: '8px'
            }}>
              <div style={{
                fontSize: '1em',
                fontWeight: '800',
                color: siteColors[site],
                marginBottom: '8px'
              }}>
                {site}
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '10px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1.8em',
                    fontWeight: '800',
                    color: siteColors[site]
                  }}>
                    {avgImprovement}%
                  </div>
                  <div style={{ fontSize: '0.7em', color: '#6b7280' }}>
                    Avg Improvement
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1.8em',
                    fontWeight: '800',
                    color: '#111827'
                  }}>
                    {totalItems}
                  </div>
                  <div style={{ fontSize: '0.7em', color: '#6b7280' }}>
                    Total Items
                  </div>
                </div>
              </div>
              <div style={{
                fontSize: '0.75em',
                color: '#6b7280',
                lineHeight: '1.4',
                paddingTop: '8px',
                borderTop: `1px solid ${siteColors[site]}30`
              }}>
                <div>✓ Incidents: {data.Incidents.improvement}%</div>
                <div>✓ PA: {data.PA.improvement}%</div>
                <div>✓ OOS: {data.OOS.improvement}%</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <section className="content-slide" style={{ overflowY: 'auto', maxHeight: '100%' }}>
      <h2 style={{ borderBottom: '4px solid #b91c1c', paddingBottom: '8px', marginBottom: '14px', color: '#b91c1c' }}>
        📊 Executive Summary – QMS Performance Across 3 Sites
      </h2>

      {/* Overall Performance Chart */}
      <OverallComparison />

      {/* Site Comparison Grid */}
      <SiteComparisonGrid />

      {/* Detailed Charts for Each Site */}
      <div style={{
        padding: '12px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        {Object.entries(sitesData).map(([site, data]) => (
          <ComparisonChart key={site} site={site} data={data} />
        ))}
      </div>

      {/* Key Highlights */}
      <div style={{
        marginTop: '12px',
        padding: '12px',
        backgroundColor: '#fef3c7',
        borderLeft: '5px solid #f59e0b',
        borderRadius: '6px',
        fontSize: '0.8em'
      }}>
        <strong style={{ color: '#92400e' }}>🎯 Top Achievements:</strong>
        <div style={{ color: '#92400e', marginTop: '4px', lineHeight: '1.4' }}>
          ⭐ SITE-V CA: +71% improvement | ⭐ SITE-III CC: +61% improvement | ⭐ SITE-V Incidents: +59% improvement
        </div>
      </div>
    </section>
  )
}
