import { Line, Bar } from 'react-chartjs-2'

export default function SiteIPreventiveActions() {
  const periods = ['Jan-Jun', 'Jul-Nov']
  const avgDays = [25, 11]
  const counts = [5, 24]
  const totalPA = counts.reduce((a, b) => a + b, 0)
  const weightedAvg = ((avgDays[0] * counts[0]) + (avgDays[1] * counts[1])) / totalPA

  const closureTimeImprovement = Math.round(((avgDays[0] - avgDays[1]) / avgDays[0]) * 100)
  const volumeIncreasePercentage = Math.round(((counts[1] - counts[0]) / counts[0]) * 100)
  const improvementPct = closureTimeImprovement

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
          <div style={{ fontSize: '0.85em', color: '#581c87', fontWeight: '600', marginBottom: '8px' }}>Total PAs</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#a855f7' }}>{totalPA}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Jan-Nov 2024</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #ecfdf3 0%, #d1fae5 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #10b981',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#065f46', fontWeight: '600', marginBottom: '8px' }}>Weighted Avg Days</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#10b981' }}>{weightedAvg.toFixed(2)}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Cycle time</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #6366f1',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#4338ca', fontWeight: '600', marginBottom: '8px' }}>Best Avg Days</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#6366f1' }}>{Math.min(...avgDays)}</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Improved {improvementPct}% vs baseline</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #f59e0b',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#92400e', fontWeight: '600', marginBottom: '8px' }}>Volume Increase %</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#f59e0b' }}>+{volumeIncreasePercentage}%</div>
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
            📉 Average Days Trend (PA)
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Line
              data={{
                labels: periods,
                datasets: [
                  {
                    label: 'Avg Days',
                    data: avgDays,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: '#10b981',
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
                    beginAtZero: true,
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
            📊 PA Volume by Period
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Bar
              data={{
                labels: periods,
                datasets: [
                  {
                    label: 'PA Count',
                    data: counts,
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
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
      </div>

      {/* Key Insights */}
      <div style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px',
        border: '2px solid #10b981',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
      }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#065f46', fontWeight: '700', fontSize: '1.05em', display: 'flex', alignItems: 'center', gap: '8px' }}>
          💡 Key Insights & Improvements
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>✅</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Cycle Time Improvement</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Avg days dropped from 25 to 11 ({improvementPct}% improvement) between periods.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>📈</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Volume Surge Handled</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                PA volume grew from 5 to 24 while cycle time improved.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>🎯</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Sustained Efficiency</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Weighted avg cycle time is 13.4 days across 29 actions.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>🏆</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Best Period</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Jul-Nov delivered best avg days (11) with the highest throughput.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
          📋 Preventive Actions Summary
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
            <tr style={{ backgroundColor: '#10b981', color: '#ffffff' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', fontSize: '0.9em' }}>Period</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Avg Days</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Count</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>Jan-Jun</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>25</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>5</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                <span style={{ background: '#fee2e2', color: '#9f1239', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85em', fontWeight: '600' }}>
                  Baseline
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>Jul-Nov</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>11</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>24</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                <span style={{ background: '#dcfce7', color: '#047857', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85em', fontWeight: '600' }}>
                  ↓ {improvementPct}% Days
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
