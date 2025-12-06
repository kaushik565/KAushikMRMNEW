import { Line, Bar } from 'react-chartjs-2'

export default function SiteIChangeControls() {
  const periods = ['Jan-Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
  const avgDays = [46, 51, 44, 39, 36, 28]
  const counts = [224, 42, 44, 47, 45, 44]

  const totalRecords = counts.reduce((a, b) => a + b, 0)

  // Aggregated periods: Jan-Jun vs Jul-Nov
  const periodOneAvg = 46
  const periodTwoAvg = (51 + 44 + 39 + 36 + 28) / 5
  const periodOneVolume = 224
  const periodTwoVolume = 42 + 44 + 47 + 45 + 44

  const daysImprovement = Math.round(((periodOneAvg - periodTwoAvg) / periodOneAvg) * 100)
  const volumeReduction = Math.round(((periodOneVolume - periodTwoVolume) / periodOneVolume) * 100)
  const closed = [107, 11, 11, 12, 11, 5]
  const improvementPct = daysImprovement
  const closureRate = Math.round((closed.reduce((a, b) => a + b, 0) / totalRecords) * 100)
  const providedPct = [48, 26, 25, 26, 24, 11]

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Key Performance Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #a855f7',
          boxShadow: '0 4px 12px rgba(168, 85, 247, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#581c87', fontWeight: '600', marginBottom: '8px' }}>Total CCs</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#a855f7' }}>{totalRecords}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Jan-Nov 2024</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #ecfdf3 0%, #d1fae5 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #10b981',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#065f46', fontWeight: '600', marginBottom: '8px' }}>Avg Days to Close</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#10b981' }}>{periodOneAvg.toFixed(1)}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Jan-Jun baseline</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #6366f1',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#4338ca', fontWeight: '600', marginBottom: '8px' }}>Same-Month Closure %</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#6366f1' }}>{closureRate}%</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Closed {closed.reduce((a, b) => a + b, 0)} of {totalRecords}</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #f59e0b',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#92400e', fontWeight: '600', marginBottom: '8px' }}>Days Improvement %</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#f59e0b' }}>{daysImprovement}%</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Jul-Nov vs Jan-Jun</div>
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
            📉 Average Closure Days Trend (CC)
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

        {/* Volume and Closures */}
        <div style={{
          background: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb',
          height: '300px'
        }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
            📊 CC Volume vs Closed
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Bar
              data={{
                labels: periods,
                datasets: [
                  {
                    label: 'Total CCs',
                    data: counts,
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: '#3b82f6',
                    borderWidth: 2,
                    borderRadius: 8
                  },
                  {
                    label: 'Closed Same Month',
                    data: closed,
                    backgroundColor: 'rgba(16, 185, 129, 0.85)',
                    borderColor: '#10b981',
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
                    ticks: { font: { size: 10 }, stepSize: 50 },
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
        border: '2px solid #6366f1',
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)'
      }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#4338ca', fontWeight: '700', fontSize: '1.05em', display: 'flex', alignItems: 'center', gap: '8px' }}>
          💡 Key Insights & Improvements
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>✅</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Cycle Time Improvement</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Avg days improved {improvementPct}% from Jan-Jun (46) to Nov (28).
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>📈</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Closure Discipline Opportunity</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Same-month closure rate is {closureRate.toFixed(1)}% (67/446); target lifting toward 25-30%+ seen in Aug/Sep.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>🎯</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>High Volume Management</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Majority load in Jan-Jun (224 CCs); sustained improvements in later months keep cycle time down.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>🚩</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>November Focus</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Best avg days (28) but lowest same-month closure (5%); prioritize rapid close-out to lock gains.
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
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Count</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Closed Same Month</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Closure %</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Whole % (provided)</th>
            </tr>
          </thead>
          <tbody>
            {periods.map((p, i) => {
              const rate = ((closed[i] / counts[i]) * 100).toFixed(2)
              const striped = i % 2 === 1
              const highlight = parseFloat(rate) >= 25
              return (
                <tr key={p} style={{ backgroundColor: striped ? '#f9fafb' : '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>{p}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>{avgDays[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{counts[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{closed[i]}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <span style={{ background: highlight ? '#dcfce7' : '#fef3c7', color: highlight ? '#065f46' : '#92400e', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85em', fontWeight: '600' }}>
                      {rate}%
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '600' }}>{providedPct[i]}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
