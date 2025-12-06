import { Line, Bar } from 'react-chartjs-2'

export default function SiteIIIOutOfSpecifications() {
  const periods = ['Apr-Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
  const avgDays = [27, 47, 12, 9, 11, 6]
  const iqc = [22, 1, 4, 1, 0, 2]
  const ipqc = [0, 0, 0, 0, 0, 0]
  const fqc = [10, 2, 1, 2, 10, 12]
  const totalsRaised = [32, 3, 5, 3, 10, 14]
  const closed = [27, 4, 6, 6, 5, 19]

  const totalRaised = totalsRaised.reduce((a, b) => a + b, 0)
  const totalClosed = closed.reduce((a, b) => a + b, 0)
  const weightedAvg = closed.reduce((acc, c, i) => acc + c * avgDays[i], 0) / totalClosed
  const bestAvg = Math.min(...avgDays)
  const improvementPct = Math.round(((avgDays[0] - bestAvg) / avgDays[0]) * 100)
  const closureRate = Math.round((totalClosed / totalRaised) * 100)
  const peakVolume = Math.max(...totalsRaised)

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Key Performance Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #3b82f6',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#1e40af', fontWeight: '600', marginBottom: '8px' }}>Total OOS Raised</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#1d4ed8' }}>{totalRaised}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Across Apr-Nov</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #10b981',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#065f46', fontWeight: '600', marginBottom: '8px' }}>Total OOS Closed</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#059669' }}>{totalClosed}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Closure rate {closureRate}%</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #6366f1',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#4338ca', fontWeight: '600', marginBottom: '8px' }}>Weighted Avg Closure Days</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#4338ca' }}>{weightedAvg.toFixed(1)}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Across closed items</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #f59e0b',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#92400e', fontWeight: '600', marginBottom: '8px' }}>Best Avg Closure</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#f59e0b' }}>{bestAvg}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>{improvementPct}% faster vs baseline</div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Average Days Trend */}
        <div style={{
          background: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb',
          height: '300px'
        }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
            📉 Average Closure Days Trend
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Line
              data={{
                labels: periods,
                datasets: [
                  {
                    label: 'Avg Closure Days',
                    data: avgDays,
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.12)',
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: '#f97316',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    fill: true
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 12,
                      font: { size: 10, weight: '600' },
                      usePointStyle: true,
                      pointStyle: 'circle'
                    }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 10,
                    titleFont: { size: 12, weight: '600' },
                    bodyFont: { size: 11 },
                    cornerRadius: 8
                  }
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    ticks: { font: { size: 10 } },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' }
                  },
                  x: {
                    ticks: { font: { size: 10 } },
                    grid: { display: false }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Volume & Closure Chart */}
        <div style={{
          background: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb',
          height: '300px'
        }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
            📊 OOS Volume & Closure
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Bar
              data={{
                labels: periods,
                datasets: [
                  {
                    label: 'IQC',
                    data: iqc,
                    backgroundColor: 'rgba(59, 130, 246, 0.85)',
                    borderColor: '#3b82f6',
                    borderWidth: 1,
                    borderRadius: 6,
                    stack: 'raised'
                  },
                  {
                    label: 'IPQC',
                    data: ipqc,
                    backgroundColor: 'rgba(16, 185, 129, 0.85)',
                    borderColor: '#10b981',
                    borderWidth: 1,
                    borderRadius: 6,
                    stack: 'raised'
                  },
                  {
                    label: 'FQC',
                    data: fqc,
                    backgroundColor: 'rgba(234, 179, 8, 0.85)',
                    borderColor: '#eab308',
                    borderWidth: 1,
                    borderRadius: 6,
                    stack: 'raised'
                  },
                  {
                    type: 'line',
                    label: 'Closed',
                    data: closed,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    borderWidth: 3,
                    tension: 0.3,
                    pointRadius: 6,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    yAxisID: 'y'
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 12,
                      font: { size: 10, weight: '600' },
                      usePointStyle: true,
                      pointStyle: 'circle'
                    }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 10,
                    titleFont: { size: 12, weight: '600' },
                    bodyFont: { size: 11 },
                    cornerRadius: 8,
                    callbacks: {
                      label: (context) => `${context.dataset.label}: ${context.parsed.y}`
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    stacked: true,
                    ticks: { font: { size: 10 }, stepSize: 5 },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' }
                  },
                  x: {
                    stacked: true,
                    ticks: { font: { size: 10 } },
                    grid: { display: false }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px',
        border: '2px solid #3b82f6',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)'
      }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#1e40af', fontWeight: '700', fontSize: '1.05em', display: 'flex', alignItems: 'center', gap: '8px' }}>
          💡 Key Insights & Improvements
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>✅</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Closure Rate Achieved</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                {closureRate}% closure (67/67) with weighted cycle time at {weightedAvg.toFixed(1)} days.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>📉</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Cycle Time Improvement</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Avg closure improved {improvementPct}% (27 → 6) from baseline to best period.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>📈</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>High Volume Cleared Early</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Peak volume of {peakVolume} (Apr-Jun) drove workload; later months show controlled volumes with faster closure.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>🎯</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Best Performance</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                November delivered best avg closure (6 days) with highest closures (19), indicating process stability.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
          📋 Out of Specifications Summary
        </h4>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', fontSize: '0.9em' }}>Period</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Avg Days</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>IQC</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>IPQC</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>FQC</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Total Raised</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Closed</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Closure Rate</th>
            </tr>
          </thead>
          <tbody>
            {periods.map((p, i) => {
              const striped = i % 2 === 1
              const isBest = avgDays[i] === bestAvg
              const periodClosureRate = totalsRaised[i] === 0 ? 0 : Math.round((closed[i] / totalsRaised[i]) * 100)
              return (
                <tr key={p} style={{ backgroundColor: striped ? '#f9fafb' : '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>{p}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: isBest ? '#10b981' : '#0f172a', fontWeight: isBest ? '700' : '600' }}>{avgDays[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>{iqc[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>{ipqc[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>{fqc[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{totalsRaised[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{closed[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <span style={{ background: '#e0f2fe', color: '#075985', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85em', fontWeight: '600' }}>
                      {periodClosureRate}%
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
