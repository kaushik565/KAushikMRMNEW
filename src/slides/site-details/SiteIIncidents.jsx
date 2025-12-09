import { Line, Bar } from 'react-chartjs-2'

export default function SiteIIncidents() {
  const periods = ['Jan-Jun', 'Jul-Nov']
  const avgClosureDays = [19.9, 17.3]
  const avgInvestigationDays = [6.1, 5.8]
  const irCounts = [181, 81]

  // Jan-Aug vs Sep-Nov comparison
  const janMayAvgClosure = 19.9
  const junNovAvgClosure = 15.6
  const janAugAvgInvestigation = 5.65
  const sepNovAvgInvestigation = 6.1
  const janMayIRCount = 130
  const junNovIRCount = 81

  // Calculate improvement percentages (based on Jan-Aug vs Sep-Nov for investigation)
  const closureImprovement = 15
  const investigationImprovement = Math.round(((janAugAvgInvestigation - sepNovAvgInvestigation) / janAugAvgInvestigation) * 100)

  const totalIRs = irCounts.reduce((a, b) => a + b, 0)

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Key Performance Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #dc2626',
          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#991b1b', fontWeight: '600', marginBottom: '8px' }}>Total IRs Initiated</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#dc2626' }}>262</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>Jan - Nov 2025</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #10b981',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#065f46', fontWeight: '600', marginBottom: '8px' }}>Closure Time Improvement</div>
          <div style={{ fontSize: '1.8em', fontWeight: '800', color: '#10b981' }}>{closureImprovement}% ↓</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>20 → 17 days</div>
          <div style={{ fontSize: '0.7em', color: '#64748b', marginTop: '2px', paddingTop: '6px', borderTop: '1px solid #d1fae5' }}>
            Jan-May: 20 | Jun-Nov: 17
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #3b82f6',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#1e40af', fontWeight: '600', marginBottom: '8px' }}>Investigation Time Improvement</div>
          <div style={{ fontSize: '1.8em', fontWeight: '800', color: '#3b82f6' }}>{investigationImprovement}% ↓</div>
          <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '4px' }}>{janAugAvgInvestigation} → {sepNovAvgInvestigation} days</div>
          <div style={{ fontSize: '0.7em', color: '#64748b', marginTop: '2px', paddingTop: '6px', borderTop: '1px solid #dbeafe' }}>
            Jan-Aug: {janAugAvgInvestigation} | Sep-Nov: {sepNovAvgInvestigation}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Closure Days Trend Chart */}
        <div style={{ 
          background: '#ffffff', 
          padding: '24px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb',
          height: '300px'
        }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
            📉 Closure Days Trend Analysis
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Line
              data={{
                labels: ['Jan-May', 'Jun-Aug', 'Sep', 'Oct', 'Nov'],
                datasets: [
                  {
                    label: 'Avg Closure Days',
                    data: [19.9, 19.5, 16.28, 20.1, 15.6],
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: '#dc2626',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    fill: true
                  },
                  {
                    label: 'Avg Investigation Days',
                    data: [6.1, 5.2, 6.6, 6, 5.7],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
                    ticks: { 
                      font: { size: 10 },
                      callback: (value) => value + ' days'
                    },
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

        {/* IR Volume Chart */}
        <div style={{ 
          background: '#ffffff', 
          padding: '24px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb',
          height: '300px'
        }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
            📊 IR Volume Distribution
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Bar
              data={{
                labels: ['Jan-May', 'Jun-Aug', 'Sep', 'Oct', 'Nov'],
                datasets: [
                  {
                    label: 'No. of IRs',
                    data: [130, 51, 25, 32, 24],
                    backgroundColor: [
                      'rgba(220, 38, 38, 0.8)',
                      'rgba(245, 158, 11, 0.8)',
                      'rgba(59, 130, 246, 0.8)',
                      'rgba(139, 92, 246, 0.8)',
                      'rgba(16, 185, 129, 0.8)'
                    ],
                    borderColor: [
                      '#dc2626',
                      '#f59e0b',
                      '#3b82f6',
                      '#8b5cf6',
                      '#10b981'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 10,
                    titleFont: { size: 12, weight: '600' },
                    bodyFont: { size: 11 },
                    cornerRadius: 8,
                    callbacks: {
                      label: (context) => `IRs: ${context.parsed.y}`
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { 
                      font: { size: 10 },
                      stepSize: 25
                    },
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
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Significant Closure Time Reduction</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Achieved <strong>21.6% improvement</strong> in average closure days from Jan-May (19.9 days) to November (15.6 days)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>📈</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Stabilized IR Volume</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                IR volume decreased from <strong>130 (Jan-May)</strong> to consistent <strong>~25 per month</strong> in Q4
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>🎯</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Investigation Efficiency</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                Investigation time increased from <strong>5.65 to 6.1 days</strong> (Sep-Nov vs Jan-Aug), indicating need for process review
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ fontSize: '1.5em' }}>🏆</div>
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9em', marginBottom: '4px' }}>Best Performance in November</div>
              <div style={{ fontSize: '0.85em', color: '#475569', lineHeight: '1.5' }}>
                November achieved the <strong>lowest closure time (15.6 days)</strong> and investigation time (5.7 days)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
          📋 Detailed Monthly Data
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
            <tr style={{ backgroundColor: '#dc2626', color: '#ffffff' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', fontSize: '0.9em' }}>Period</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Avg Closure Days</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Avg Investigation Days</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>No. of IRs</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>Jan - May</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>19.9</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>6.1</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '600' }}>130</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                <span style={{ background: '#fee2e2', color: '#991b1b', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85em', fontWeight: '600' }}>
                  Baseline
                </span>
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>Jun-Aug</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>19.5</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>5.2</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '600' }}>51</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85em', fontWeight: '600' }}>
                  ↓ 2% Closure
                </span>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>September</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>16.28</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>6.6</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '600' }}>25</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85em', fontWeight: '600' }}>
                  ↓ 18% Closure
                </span>
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>October</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>20.1</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>6</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '600' }}>32</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85em', fontWeight: '600' }}>
                  ↑ Spike
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>November</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#10b981', fontWeight: '700' }}>15.6</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#10b981', fontWeight: '700' }}>5.7</td>
              <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '600' }}>24</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85em', fontWeight: '600' }}>
                  ✨ Best
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
