import { Line, Bar } from 'react-chartjs-2'

export default function SiteIIICorrectiveActions() {
  const periods = ['Jan-Jun', 'Jul-Nov']
  const avgDaysMNC = [56, 47]
  const avgDaysNC = [36, 57]
  const mncCounts = [10, 34]
  const ncCounts = [3, 5]
  const totals = [13, 39]

  const totalCA = totals.reduce((a, b) => a + b, 0)
  const weightedAvgMNC = totals.reduce((acc, t, i) => acc + t * avgDaysMNC[i], 0) / totalCA
  const weightedAvgNC = totals.reduce((acc, t, i) => acc + t * avgDaysNC[i], 0) / totalCA
  const bestMNC = Math.min(...avgDaysMNC)
  const improvementPct = Math.round(((avgDaysMNC[0] - bestMNC) / avgDaysMNC[0]) * 100)

  // KPI Improvements - Month over Month
  const mncImprovement = Math.round(((avgDaysMNC[0] - avgDaysMNC[1]) / avgDaysMNC[0]) * 100)
  const ncDegradation = Math.round(((avgDaysNC[1] - avgDaysNC[0]) / avgDaysNC[0]) * 100)
  const volumeIncreaseMNC = Math.round(((mncCounts[1] - mncCounts[0]) / mncCounts[0]) * 100)
  const volumeIncreaseNC = Math.round(((ncCounts[1] - ncCounts[0]) / ncCounts[0]) * 100)
  const mncStatus = mncImprovement > 0 ? '✅ Improved' : '⚠️ Increased'
  const ncStatus = ncDegradation > 0 ? '⚠️ Increased' : '✅ Improved'

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Key Performance Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #8b5cf6',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#6d28d9', fontWeight: '600', marginBottom: '8px' }}>Total CA Records</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#6d28d9' }}>{totalCA}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Jan-Nov 2024</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #ecfdf3 0%, #d1fae5 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #10b981',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#065f46', fontWeight: '600', marginBottom: '8px' }}>Weighted Avg Days (MNC)</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#10b981' }}>{weightedAvgMNC.toFixed(1)}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Across all MNC</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #3b82f6',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#1e40af', fontWeight: '600', marginBottom: '8px' }}>Weighted Avg Days (NC)</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#3b82f6' }}>{weightedAvgNC.toFixed(1)}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Across all NC</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #f59e0b',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#92400e', fontWeight: '600', marginBottom: '8px' }}>Best Avg Days (MNC)</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#f59e0b' }}>{bestMNC}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>{improvementPct}% improvement vs baseline</div>
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
            📉 Average Days Trend (CA)
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Line
              data={{
                labels: periods,
                datasets: [
                  {
                    label: 'Avg Days (MNC)',
                    data: avgDaysMNC,
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.12)',
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: '#8b5cf6',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    fill: true
                  },
                  {
                    label: 'Avg Days (NC)',
                    data: avgDaysNC,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.12)',
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: '#f59e0b',
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

        {/* Volume Chart */}
        <div style={{
          background: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb',
          height: '300px'
        }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
            📊 CA Volume by Period
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Bar
              data={{
                labels: periods,
                datasets: [
                  {
                    label: 'MNC Count',
                    data: mncCounts,
                    backgroundColor: 'rgba(139, 92, 246, 0.8)',
                    borderColor: '#8b5cf6',
                    borderWidth: 2,
                    borderRadius: 8
                  },
                  {
                    label: 'NC Count',
                    data: ncCounts,
                    backgroundColor: 'rgba(245, 158, 11, 0.8)',
                    borderColor: '#f59e0b',
                    borderWidth: 2,
                    borderRadius: 8
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
                    ticks: { font: { size: 10 }, stepSize: 10 },
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
      </div>

      {/* Key Insights */}
      <div style={{
        background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px',
        border: '2px solid #8b5cf6',
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)'
      }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#5b21b6', fontWeight: '700', fontSize: '1.05em', display: 'flex', alignItems: 'center', gap: '8px' }}>
          💡 Key Insights & Improvements
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>✅</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Cycle Time Improvement</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                MNC avg days improved {improvementPct}% (56 → 47) while volume tripled (13 → 39).
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>📈</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Throughput Increase</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Total CA volume jumped from 13 to 39 in Jul-Nov with managed cycle time.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>⚠️</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>NC Cycle Time Watch</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                NC avg days rose to 57 in Jul-Nov; address NC bottlenecks while keeping MNC gains.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>🎯</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Best Avg Days (MNC)</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Jul-Nov delivered best MNC avg (47) alongside highest volume (39 total).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
          📋 Corrective Actions Summary
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
            <tr style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', fontSize: '0.9em' }}>Period</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Avg Days (MNC)</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>MNC Count</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Avg Days (NC)</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>NC Count</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {periods.map((p, i) => {
              const striped = i % 2 === 1
              const highlight = i === 1
              return (
                <tr key={p} style={{ backgroundColor: striped ? '#f9fafb' : '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>{p}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: highlight ? '#10b981' : '#0f172a', fontWeight: highlight ? '700' : '600' }}>{avgDaysMNC[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{mncCounts[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>{avgDaysNC[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{ncCounts[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{totals[i]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
