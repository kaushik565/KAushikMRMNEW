import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { incidentData, incidentsList } from '../data'
import FullScreenChartModal from '../../components/FullScreenChartModal'

Chart.register(...registerables)

export default function IncidentTrend() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const [isCriticalExpanded, setIsCriticalExpanded] = useState(false)
  const [chartImage, setChartImage] = useState('')
  const [expandedChart, setExpandedChart] = useState('')

  const sum = (arr) => arr.reduce((a, b) => a + b, 0)
  const totalMinor = sum(incidentData.minor)
  const totalMajor = sum(incidentData.major)
  const totalCritical = sum(incidentData.critical)
  const totalIncidents = totalMinor + totalMajor + totalCritical
  const latestMonthIndex = incidentData.labels.length - 1
  const latestMonthLabel = incidentData.labels[latestMonthIndex]
  const latestMonthTotal = incidentData.minor[latestMonthIndex] + incidentData.major[latestMonthIndex] + incidentData.critical[latestMonthIndex]
  const latestMinor = incidentData.minor[latestMonthIndex]
  const latestMajor = incidentData.major[latestMonthIndex]
  const latestCritical = incidentData.critical[latestMonthIndex]
  const monthlyTotals = incidentData.labels.map((_, idx) => incidentData.minor[idx] + incidentData.major[idx] + incidentData.critical[idx])
  const meanTotal = monthlyTotals.reduce((a, b) => a + b, 0) / monthlyTotals.length
  const stdTotal = Math.sqrt(monthlyTotals.reduce((acc, val) => acc + Math.pow(val - meanTotal, 2), 0) / monthlyTotals.length)
  const ucl = +(meanTotal + 3 * stdTotal).toFixed(2)
  const lcl = Math.max(0, +(meanTotal - 3 * stdTotal).toFixed(2))
  const controlLine = Array(incidentData.labels.length).fill(+meanTotal.toFixed(2))
  const uclLine = Array(incidentData.labels.length).fill(ucl)
  const lclLine = Array(incidentData.labels.length).fill(lcl)
  const aboveUclMonths = incidentData.labels.filter((_, idx) => monthlyTotals[idx] > ucl)

  const criticalIncidents = incidentsList.filter(incident => incident.severity === 'Critical')

  useEffect(() => {
    // Combined incident control chart with severity breakdown
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: incidentData.labels,
          datasets: [
            {
              label: 'Minor',
              data: incidentData.minor,
              borderColor: '#fbbf24',
              backgroundColor: 'rgba(251, 191, 36, 0.2)',
              tension: 0.25,
              fill: true,
              pointRadius: 4,
              pointBackgroundColor: '#f59e0b',
              stack: 'severity'
            },
            {
              label: 'Major',
              data: incidentData.major,
              borderColor: '#f97316',
              backgroundColor: 'rgba(249, 115, 22, 0.2)',
              tension: 0.25,
              fill: true,
              pointRadius: 4,
              pointBackgroundColor: '#ea580c',
              stack: 'severity'
            },
            {
              label: 'Critical',
              data: incidentData.critical,
              borderColor: '#dc2626',
              backgroundColor: 'rgba(220, 38, 38, 0.2)',
              tension: 0.25,
              fill: true,
              pointRadius: 5,
              pointBackgroundColor: '#dc2626',
              stack: 'severity'
            },
            {
              label: 'Total',
              data: monthlyTotals,
              borderColor: '#2563eb',
              backgroundColor: 'transparent',
              borderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointBackgroundColor: monthlyTotals.map(val => val > ucl ? '#dc2626' : '#2563eb'),
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              tension: 0.25,
              fill: false
            },
            {
              label: 'Center Line',
              data: controlLine,
              borderColor: '#0ea5e9',
              borderDash: [6, 6],
              pointRadius: 0,
              borderWidth: 2,
              fill: false
            },
            {
              label: 'UCL',
              data: uclLine,
              borderColor: '#dc2626',
              borderDash: [4, 6],
              pointRadius: 0,
              borderWidth: 2,
              fill: false
            },
            {
              label: 'LCL',
              data: lclLine,
              borderColor: '#16a34a',
              borderDash: [4, 6],
              pointRadius: 0,
              borderWidth: 2,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: { size: 11 },
                boxWidth: 12,
                padding: 10
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(context) {
                  if (context.dataset.label === 'Center Line' || context.dataset.label === 'UCL' || context.dataset.label === 'LCL') {
                    return context.dataset.label + ': ' + context.parsed.y.toFixed(2)
                  }
                  return context.dataset.label + ': ' + context.parsed.y
                },
                footer: function(tooltipItems) {
                  const dataItem = tooltipItems.find(item => item.dataset.label === 'Total');
                  if (dataItem) {
                    return 'Total: ' + dataItem.parsed.y;
                  }
                  return '';
                }
              }
            }
          },
          layout: { padding: 8 },
          scales: {
            y: {
              stacked: false,
              beginAtZero: true,
              grid: { drawBorder: false, color: '#e5e7eb' },
              ticks: { color: '#475569', font: { size: 11 } }
            },
            x: {
              grid: { drawBorder: false },
              ticks: { color: '#475569', font: { size: 11 } }
            }
          }
        }
      })

      setChartImage(chartInstance.current.toBase64Image())
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [totalMinor, totalMajor, totalCritical])

  const closeCriticalExpanded = () => setIsCriticalExpanded(false)

  return (
    <section className="content-slide">
      <h2>Incident data from Jan-2025 To Nov-2025</h2>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          borderLeft: '5px solid #0f172a',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
          transition: 'transform 0.2s ease'
        }}>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>{totalIncidents}</div>
          <div style={{ fontSize: '0.88em', color: '#64748b', fontWeight: '500', letterSpacing: '0.02em' }}>Total Incidents</div>
        </div>

        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%)',
          borderLeft: '5px solid #b91c1c',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(185, 28, 28, 0.08)',
          transition: 'transform 0.2s ease'
        }}>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#b91c1c', marginBottom: '4px' }}>{totalCritical}</div>
          <div style={{ fontSize: '0.88em', color: '#991b1b', fontWeight: '500', letterSpacing: '0.02em' }}>Critical</div>
        </div>

        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #fff7ed 0%, #fffbf0 100%)',
          borderLeft: '5px solid #ea580c',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(234, 88, 12, 0.08)',
          transition: 'transform 0.2s ease'
        }}>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#ea580c', marginBottom: '4px' }}>{totalMajor}</div>
          <div style={{ fontSize: '0.88em', color: '#c2410c', fontWeight: '500', letterSpacing: '0.02em' }}>Major</div>
        </div>

        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #f6fef9 100%)',
          borderLeft: '5px solid #16a34a',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(22, 163, 74, 0.08)',
          transition: 'transform 0.2s ease'
        }}>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#16a34a', marginBottom: '4px' }}>{totalMinor}</div>
          <div style={{ fontSize: '0.88em', color: '#15803d', fontWeight: '500', letterSpacing: '0.02em' }}>Minor</div>
        </div>
      </div>

      {/* Combined Incident Control Chart */}
      <div style={{ marginBottom: '32px' }}>
        <div
          style={{ 
            background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 70%)', 
            borderRadius: '14px', 
            padding: '24px 26px', 
            cursor: 'zoom-in', 
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)', 
            border: '1px solid #e5e8ed',
            transition: 'box-shadow 0.3s ease, transform 0.2s ease'
          }}
          onClick={() => setExpandedChart('combined')}
          title="Click to expand"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 14px 32px rgba(15, 23, 42, 0.1), 0 6px 14px rgba(15, 23, 42, 0.06)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <h4 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '1.05em', 
            fontWeight: '700', 
            color: '#0f172a', 
            letterSpacing: '0.005em',
            borderBottom: '2px solid #e5e8ed',
            paddingBottom: '10px'
          }}>Incident Trend with Control Limits</h4>
          <div style={{ height: '360px' }}>
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Insights removed per request */}

      {/* Critical Incidents Modal */}
      {isCriticalExpanded && (
        <div className="modal-overlay" onClick={closeCriticalExpanded}>
          <div className="modal-content large" onClick={e => e.stopPropagation()}>
            <h3 className="expanded-table-title">
              Critical Incidents (YTD)
              <button className="modal-close" onClick={closeCriticalExpanded}>×</button>
            </h3>
            <div className="expanded-incident-container">
              {criticalIncidents.length > 0 ? (
                criticalIncidents.map((incident, idx) => (
                  <div key={idx} style={{ marginBottom: '16px', padding: '12px', background: '#fef2f2', borderRadius: '6px', borderLeft: '3px solid #b91c1c' }}>
                    <div style={{ fontSize: '0.9em', fontWeight: '600', color: '#b91c1c', marginBottom: '6px' }}>
                      IR#{incident.irNumber} - {incident.date}
                    </div>
                    <div style={{ fontSize: '0.85em', color: '#374151', lineHeight: '1.5' }}>
                      {incident.description}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: '#6b7280', fontSize: '0.9em' }}>No critical incidents to display.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <FullScreenChartModal
        open={expandedChart === 'combined'}
        onClose={() => setExpandedChart('')}
        image={chartImage}
        title="Incident Trend with Control Limits"
      />
    </section>
  )
}
