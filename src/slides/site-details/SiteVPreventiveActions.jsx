import { Line, Bar } from 'react-chartjs-2'

export default function SiteVPreventiveActions() {
  const periods = ['Jan-Jun', 'Jul-Nov']
  const avgDays = [63, 29]
  const counts = [10, 27]

  const totalCount = counts.reduce((a, b) => a + b, 0)
  const weightedAvgDays = counts.reduce((acc, c, i) => acc + c * avgDays[i], 0) / totalCount
  const bestAvgDays = Math.min(...avgDays)
  const improvementPct = Math.round(((avgDays[0] - bestAvgDays) / avgDays[0]) * 100)
  const closureImprovementPct = Math.round(((avgDays[0] - avgDays[1]) / avgDays[0]) * 100)
  const volumeIncreasePct = Math.round(((counts[1] - counts[0]) / counts[0]) * 100)

  // KPI Improvements - Month over Month
  const closureTimeDegradation = Math.round(((avgDays[1] - avgDays[0]) / avgDays[0]) * 100)
  const volumeIncreasePercentage = Math.round(((counts[1] - counts[0]) / counts[0]) * 100)
  const closureStatus = closureTimeDegradation > 0 ? '⚠️ Increased' : '✅ Improved'
  const volumeStatus = volumeIncreasePercentage > 0 ? '📈 Increased (Proactive)' : '📉 Decreased'

  // Chart data
  const paData = [
    { period: 'JAN-JUNE', 'Avg Days': 63, 'PA Count': 10 },
    { period: 'JULY-NOV', 'Avg Days': 29, 'PA Count': 27 }
  ]

  // Metrics data
  const metrics = [
    {
      label: 'Avg Days to Close',
      value: weightedAvgDays.toFixed(2),
      change: `${closureImprovementPct}%`,
      trend: 'up',
    },
    {
      label: 'Total PA Count',
      value: totalCount,
      change: `${volumeIncreasePct}%`,
      trend: 'up',
    },
    {
      label: 'JAN-JUNE Avg',
      value: '63',
      change: 'baseline',
      trend: 'neutral',
    },
    {
      label: 'JULY-NOV Avg',
      value: '29',
      change: `${closureImprovementPct}% faster`,
      trend: 'up',
    },
  ]

  // Data for charts
  const daysChartData = {
    labels: paData.map(d => d.period),
    datasets: [
      {
        label: 'Avg Days',
        data: paData.map(d => d['Avg Days']),
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
    ],
  }

  // Chart data for count volume
  const countChartData = {
    labels: paData.map(d => d.period),
    datasets: [
      {
        label: 'PA Count',
        data: paData.map(d => d['PA Count']),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: '#10b981',
        borderWidth: 2,
        borderRadius: 8
      }
    ],
  }

  const chartOptions = {
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
        ticks: { font: { size: 10 } },
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      },
      x: {
        ticks: { font: { size: 10 } },
        grid: { display: false }
      }
    }
  }

  return (
    <div style={{ width: '100%' }}>

      {/* Key Performance Metrics - 4 Varied Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {/* Card 1: Total PA Records - Purple */}
        <div style={{
          background: 'linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #8b5cf6',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#7c3aed', fontWeight: '600', marginBottom: '8px' }}>Total PA Records</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#7c3aed' }}>{totalCount}</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>Jan-Nov 2025</div>
        </div>

        {/* Card 2: Weighted Avg Days - Green */}
        <div style={{
          background: 'linear-gradient(135deg, #ecfdf3 0%, #d1fae5 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #10b981',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#059669', fontWeight: '600', marginBottom: '8px' }}>Weighted Avg Days</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#059669' }}>{weightedAvgDays.toFixed(1)}</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>Across all PA</div>
        </div>

        {/* Card 3: Volume Increase - Blue */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #3b82f6',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#2563eb', fontWeight: '600', marginBottom: '8px' }}>Volume Increase</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#2563eb' }}>{volumeIncreasePct}%</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>Jul-Nov vs Jan-Jun</div>
        </div>

        {/* Card 4: Best Avg Days - Yellow */}
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #f59e0b',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#d97706', fontWeight: '600', marginBottom: '8px' }}>Best Avg Days</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#d97706' }}>{bestAvgDays}</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>
            {improvementPct > 0 ? `Baseline performance` : 'Current baseline'}
          </div>
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
            <Line data={daysChartData} options={chartOptions} />
          </div>
        </div>

        {/* PA Volume */}
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
            <Bar data={countChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Key Insights & Improvements - 2x2 Grid with Emojis */}
      <div style={{
        background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
        border: '2px solid #8b5cf6',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)'
      }}>
        <h4 style={{ margin: '0 0 20px 0', color: '#7c3aed', fontWeight: '700', fontSize: '1.1em' }}>
          💡 Key Insights & Improvements
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Insight 1 */}
          <div style={{
            background: '#ffffff',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #e9d5ff',
            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.08)'
          }}>
            <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>📈</div>
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>Volume Surge</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              PA count increased 170% (10→27), showing proactive quality initiatives
            </div>
          </div>

          {/* Insight 2 */}
          <div style={{
            background: '#ffffff',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #e9d5ff',
            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.08)'
          }}>
            <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>⏱️</div>
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>Closure Time Improvement</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              Avg days improved from 63 to 29 (54% faster) while volume grew
            </div>
          </div>

          {/* Insight 3 */}
          <div style={{
            background: '#ffffff',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #e9d5ff',
            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.08)'
          }}>
            <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>✅</div>
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>Efficient Execution</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              Overall weighted avg {weightedAvgDays.toFixed(1)} days with improved throughput
            </div>
          </div>

          {/* Insight 4 */}
          <div style={{
            background: '#ffffff',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #e9d5ff',
            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.08)'
          }}>
            <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>🎯</div>
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>Best Performance</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              Best avg: {bestAvgDays} days (Jul-Nov)
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
            <tr style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', fontSize: '0.9em' }}>Period</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Avg Days</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>PA Count</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>Jan-Jun</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>63</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>10</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>Jul-Nov</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>29</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>27</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
