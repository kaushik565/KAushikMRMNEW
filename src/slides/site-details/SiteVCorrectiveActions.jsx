import { Line, Bar } from 'react-chartjs-2'

export default function SiteVCorrectiveActions() {
  const periods = ['Jan-Jun', 'Jul-Nov']
  const avgDaysMNC = [3, 6]
  const avgDaysNC = [7, 2]
  const mncCounts = [30, 20]
  const ncCounts = [4, 3]
  const totals = [34, 23]

  const totalCA = totals.reduce((a, b) => a + b, 0)
  const weightedAvgMNC = totals.reduce((acc, t, i) => acc + t * avgDaysMNC[i], 0) / totalCA
  const weightedAvgNC = totals.reduce((acc, t, i) => acc + t * avgDaysNC[i], 0) / totalCA
  const bestMNC = Math.min(...avgDaysMNC)
  const bestNC = Math.min(...avgDaysNC)
  const improvementPctMNC = Math.round(((avgDaysMNC[0] - bestMNC) / avgDaysMNC[0]) * 100)
  const improvementPctNC = Math.round(((avgDaysNC[0] - bestNC) / avgDaysNC[0]) * 100)

  // KPI Improvements - Month over Month
  const ncImprovement = Math.round(((avgDaysNC[0] - avgDaysNC[1]) / avgDaysNC[0]) * 100)
  const mncDegradation = Math.round(((avgDaysMNC[1] - avgDaysMNC[0]) / avgDaysMNC[0]) * 100)
  const volumeReductionMNC = Math.round(((mncCounts[0] - mncCounts[1]) / mncCounts[0]) * 100)
  const volumeReductionNC = Math.round(((ncCounts[0] - ncCounts[1]) / ncCounts[0]) * 100)
  const ncImprovedStatus = ncImprovement > 0 ? '✅ Improved' : '⚠️ Worsened'
  const mncStatus = mncDegradation > 0 ? '⚠️ Increased' : '✅ Improved'

  // Data for dual charts
  const caDataChart = [
    {
      period: 'JAN-JUNE',
      'MNC Days': 3,
      'NC Days': 7,
      'MNC Count': 30,
      'NC Count': 4,
    },
    {
      period: 'JULY-NOV',
      'MNC Days': 6,
      'NC Days': 2,
      'MNC Count': 20,
      'NC Count': 3,
    },
  ];

  // Chart data for MNC/NC days trend
  const daysChartData = {
    labels: caDataChart.map(d => d.period),
    datasets: [
      {
        label: 'Avg Days (MNC)',
        data: caDataChart.map(d => d['MNC Days']),
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
        data: caDataChart.map(d => d['NC Days']),
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
    ],
  };

  // Chart data for count volume
  const countChartData = {
    labels: caDataChart.map(d => d.period),
    datasets: [
      {
        label: 'MNC Count',
        data: caDataChart.map(d => d['MNC Count']),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: '#8b5cf6',
        borderWidth: 2,
        borderRadius: 8
      },
      {
        label: 'NC Count',
        data: caDataChart.map(d => d['NC Count']),
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: '#f59e0b',
        borderWidth: 2,
        borderRadius: 8
      }
    ],
  };

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
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Key Performance Metrics - 4 Varied Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {/* Card 1: Total CA Records - Purple */}
        <div style={{
          background: 'linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #8b5cf6',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#7c3aed', fontWeight: '600', marginBottom: '8px' }}>Total CA Records</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#7c3aed' }}>{totalCA}</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>Jan-Nov 2024</div>
        </div>

        {/* Card 2: Weighted Avg Days (MNC) - Green */}
        <div style={{
          background: 'linear-gradient(135deg, #ecfdf3 0%, #d1fae5 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #10b981',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#059669', fontWeight: '600', marginBottom: '8px' }}>Weighted Avg Days (MNC)</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#059669' }}>{weightedAvgMNC.toFixed(1)}</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>Across all MNC</div>
        </div>

        {/* Card 3: Weighted Avg Days (NC) - Blue */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #3b82f6',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#2563eb', fontWeight: '600', marginBottom: '8px' }}>Weighted Avg Days (NC)</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#2563eb' }}>{weightedAvgNC.toFixed(1)}</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>Across all NC</div>
        </div>

        {/* Card 4: Best Avg Days (MNC) - Yellow */}
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #f59e0b',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#d97706', fontWeight: '600', marginBottom: '8px' }}>Best Avg Days (MNC)</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#d97706' }}>{bestMNC}</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>
            {improvementPctMNC > 0 ? `${improvementPctMNC}% improvement vs baseline` : 'Current baseline'}
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
            📉 Average Days Trend (CA)
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Line data={daysChartData} options={chartOptions} />
          </div>
        </div>

        {/* CA Volume */}
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
            <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>✅</div>
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>NC Cycle Time Improvement</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              NC closure reduced from 7 to 2 days (71% improvement)
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
            <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>📈</div>
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>Volume Reduction</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              MNC count decreased 33% (30→20), NC count down 25% (4→3)
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
            <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>⚠️</div>
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>MNC Cycle Time Watch</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              MNC closure doubled from 3 to 6 days - requires attention
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
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>Best Avg Days (MNC)</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              Best performance: {bestMNC} days ({improvementPctMNC}% vs initial)
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
            <tr style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>Jan-Jun</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '600' }}>3</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>30</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>7</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>4</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>34</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>Jul-Nov</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '600' }}>6</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>20</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>2</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>3</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>23</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
