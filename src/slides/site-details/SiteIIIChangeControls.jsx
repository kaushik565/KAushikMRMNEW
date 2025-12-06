import { Line, Bar } from 'react-chartjs-2'

export default function SiteIIIChangeControls() {
  const periods = ['Jan-Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
  const avgDays = [41, 39, 32, 27, 19, 16]
  const totalCounts = [119, 22, 27, 24, 28, 15]
  const closedSameMonth = [20, 6, 3, 7, 8, 5]
  const closurePercent = [17, 27, 11, 29, 29, 33]

  const totalCC = totalCounts.reduce((a, b) => a + b, 0)
  const totalClosed = closedSameMonth.reduce((a, b) => a + b, 0)
  const weightedAvg = totalCounts.reduce((acc, c, i) => acc + c * avgDays[i], 0) / totalCC
  const bestAvg = Math.min(...avgDays)
  const improvementPct = Math.round(((avgDays[0] - bestAvg) / avgDays[0]) * 100)
  const avgClosureRate = Math.round(totalClosed / totalCC * 100)
  const bestClosureRate = Math.max(...closurePercent)

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Key Performance Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #3b82f6',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#1e40af', fontWeight: '600', marginBottom: '8px' }}>Total CC Raised</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#1d4ed8' }}>{totalCC}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Jan-Nov 2024</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #6366f1',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#4338ca', fontWeight: '600', marginBottom: '8px' }}>Weighted Avg Days</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#4338ca' }}>{weightedAvg.toFixed(1)}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Cycle time</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #f59e0b',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#92400e', fontWeight: '600', marginBottom: '8px' }}>Best Avg Days</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#f59e0b' }}>{bestAvg}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>{improvementPct}% improvement</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #10b981',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#065f46', fontWeight: '600', marginBottom: '8px' }}>Same-Month Closure Rate</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#10b981' }}>{avgClosureRate}%</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>{totalClosed} of {totalCC} closed</div>
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
            📉 Average Days Trend (CC)
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Line
              data={{
                labels: periods,
                datasets: [
                  {
                    label: 'Avg Days',
                    data: avgDays,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.12)',
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: '#3b82f6',
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
                    ticks: { font: { size: 10 }, stepSize: 5 },
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

        {/* Volume & Closure Rate */}
        <div style={{
          background: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb',
          height: '300px'
        }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
            📊 CC Volume & Same-Month Closure Rate
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Bar
              data={{
                labels: periods,
                datasets: [
                  {
                    label: 'CC Count',
                    data: totalCounts,
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: '#3b82f6',
                    borderWidth: 2,
                    borderRadius: 8,
                    yAxisID: 'y'
                  },
                  {
                    type: 'line',
                    label: 'Same-Month Closure %',
                    data: closurePercent,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    borderWidth: 3,
                    tension: 0.3,
                    pointRadius: 6,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    yAxisID: 'y1'
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
                      label: (context) => {
                        if (context.dataset.yAxisID === 'y1') {
                          return `${context.dataset.label}: ${context.parsed.y}%`
                        }
                        return `${context.dataset.label}: ${context.parsed.y}`
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    position: 'left',
                    ticks: { font: { size: 10 }, stepSize: 20 },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' }
                  },
                  y1: {
                    beginAtZero: true,
                    position: 'right',
                    min: 0,
                    max: 100,
                    ticks: { font: { size: 10 }, stepSize: 20, callback: (v) => `${v}%` },
                    grid: { display: false }
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
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Cycle Time Improvement</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Avg days reduced {improvementPct}% (41 → 16) from Jan-Jun to Nov, indicating process optimization.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>📈</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Closure Rate Trend</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Same-month closure increased from 17% (Jan-Jun) to 33% (Nov), showing faster turnaround.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>🎯</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Best Same-Month Closure</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                November achieved {bestClosureRate}% same-month closure with best avg days (16).
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>⚖️</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Overall Closure Efficiency</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                {avgClosureRate}% average same-month closure across period; workload carries forward to future months.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
          📋 Change Controls Summary
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
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Total Count</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Closed Same Month</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Closure Rate</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {periods.map((p, i) => {
              const striped = i % 2 === 1
              const isBest = avgDays[i] === bestAvg
              const isBestClosure = closurePercent[i] === bestClosureRate
              return (
                <tr key={p} style={{ backgroundColor: striped ? '#f9fafb' : '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>{p}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: isBest ? '#10b981' : '#0f172a', fontWeight: isBest ? '700' : '600' }}>{avgDays[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{totalCounts[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{closedSameMonth[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: isBestClosure ? '#10b981' : '#0f172a', fontWeight: isBestClosure ? '700' : '600' }}>{closurePercent[i]}%</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <span style={{ background: isBest ? '#dcfce7' : '#e2e8f0', color: isBest ? '#065f46' : '#475569', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85em', fontWeight: '600' }}>
                      {isBest ? '↓ Best' : i === 0 ? 'Baseline' : '↓ '}
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
