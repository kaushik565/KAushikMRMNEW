import { Line, Bar } from 'react-chartjs-2'

export default function SiteVOutOfSpecifications() {
  const oosData = [
    {
      period: 'APRIL-JUNE',
      avgDays: 19,
      iqc: 15,
      ipqc: 16,
      fqc: 12,
      total: 43,
      closed: 43,
    },
    {
      period: 'JULY',
      avgDays: 20,
      iqc: 1,
      ipqc: 14,
      fqc: 6,
      total: 21,
      closed: 21,
    },
    {
      period: 'AUGUST',
      avgDays: 9.5,
      iqc: 10,
      ipqc: 0,
      fqc: 0,
      total: 10,
      closed: 9,
    },
    {
      period: 'SEPTEMBER',
      avgDays: 16.5,
      iqc: 15,
      ipqc: 7,
      fqc: 1,
      total: 23,
      closed: 9,
    },
    {
      period: 'OCTOBER',
      avgDays: 14.8,
      iqc: 11,
      ipqc: 7,
      fqc: 0,
      total: 18,
      closed: 17,
    },
    {
      period: 'NOVEMBER',
      avgDays: 17.8,
      iqc: 10,
      ipqc: 2,
      fqc: 1,
      total: 13,
      closed: 16,
    },
  ];

  // Calculate metrics
  const avgDaysAll = (oosData.reduce((sum, row) => sum + row.avgDays, 0) / oosData.length).toFixed(1);
  const totalOOS = oosData.reduce((sum, row) => sum + row.total, 0);
  const totalClosed = oosData.reduce((sum, row) => sum + row.closed, 0);
  const closureRate = ((totalClosed / totalOOS) * 100).toFixed(1);

  // Calculate improvements - comparing last 2 periods (Sep vs Aug)
  const septemberAvg = oosData[3].avgDays // September: 16.5
  const augustAvg = oosData[2].avgDays    // August: 9.5
  const daysImprovement = Math.round(((septemberAvg - augustAvg) / septemberAvg) * 100)
  const septemberTotal = oosData[3].total  // 23
  const augustTotal = oosData[2].total     // 10
  const volumeIncrease = Math.round(((septemberTotal - augustTotal) / augustTotal) * 100)
  const septemberClosed = oosData[3].closed // 9
  const augustClosed = oosData[2].closed    // 9
  const closureRateChange = Math.round((septemberClosed / septemberTotal - augustClosed / augustTotal) * 100)

  // Metrics data
  const metrics = [
    {
      label: 'Avg Days to Close',
      value: avgDaysAll,
      change: `${daysImprovement}%`,
      trend: 'down',
    },
    {
      label: 'Total OOS Items',
      value: totalOOS,
      change: `${volumeIncrease}%`,
      trend: 'down',
    },
    {
      label: 'Closure Rate',
      value: `${closureRate}%`,
      change: 'tracking',
      trend: 'neutral',
    },
    {
      label: 'Best Month',
      value: '9.5',
      change: 'AUGUST',
      trend: 'down',
    },
  ];

  // Data for dual charts
  const chartDataOOS = oosData.map(row => ({
    period: row.period,
    'Avg Days': row.avgDays,
    'IQC': row.iqc,
    'IPQC': row.ipqc,
    'FQC': row.fqc,
  }));

  // Chart data for avg days trend
  const daysChartData = {
    labels: oosData.map(d => d.period),
    datasets: [
      {
        label: 'Avg Days',
        data: oosData.map(d => d.avgDays),
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

  // Chart data for test source volume (stacked)
  const volumeChartData = {
    labels: oosData.map(d => d.period),
    datasets: [
      {
        label: 'IQC',
        data: oosData.map(d => d.iqc),
        backgroundColor: 'rgba(59, 130, 246, 0.85)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        borderRadius: 6
      },
      {
        label: 'IPQC',
        data: oosData.map(d => d.ipqc),
        backgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderColor: '#10b981',
        borderWidth: 2,
        borderRadius: 6
      },
      {
        label: 'FQC',
        data: oosData.map(d => d.fqc),
        backgroundColor: 'rgba(234, 88, 12, 0.85)',
        borderColor: '#ea580c',
        borderWidth: 2,
        borderRadius: 6
      }
    ],
  };

  const lineChartOptions = {
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
  };

  const barChartOptions = {
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
      x: {
        stacked: true,
        ticks: { font: { size: 10 } },
        grid: { display: false }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: { font: { size: 10 } },
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      }
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Key Performance Metrics - 4 Varied Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {/* Card 1: Total OOS Items - Purple */}
        <div style={{
          background: 'linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #8b5cf6',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#7c3aed', fontWeight: '600', marginBottom: '8px' }}>Total OOS Items</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#7c3aed' }}>{totalOOS}</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>Apr-Nov 2025</div>
        </div>

        {/* Card 2: Avg Days to Close - Green */}
        <div style={{
          background: 'linear-gradient(135deg, #ecfdf3 0%, #d1fae5 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #10b981',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#059669', fontWeight: '600', marginBottom: '8px' }}>Avg Days to Close</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#059669' }}>{avgDaysAll}</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>Across all periods</div>
        </div>

        {/* Card 3: Closure Rate - Blue */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #3b82f6',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#2563eb', fontWeight: '600', marginBottom: '8px' }}>Closure Rate</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#2563eb' }}>{closureRate}%</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>Total closed / Total OOS</div>
        </div>

        {/* Card 4: Best Month - Yellow */}
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #f59e0b',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#d97706', fontWeight: '600', marginBottom: '8px' }}>Best Month</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#d97706' }}>9.5</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>August (50% improvement)</div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Avg Days Trend */}
        <div style={{
          background: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb',
          height: '300px'
        }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
            📉 Average Days Trend (OOS)
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Line data={daysChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Test Source Volume */}
        <div style={{
          background: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb',
          height: '300px'
        }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
            📊 Test Source Volume
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Bar data={volumeChartData} options={barChartOptions} />
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
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>Cycle Time Improvement</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              Closure days improved 6.3% (19→17.8 days) from start to end
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
            <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>📉</div>
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>Volume Reduction</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              Total OOS decreased 70% (43→13), strong quality improvement
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
            <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>🎯</div>
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>Best Performance</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              August achieved 9.5 days (50% improvement vs baseline)
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
            <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>🔍</div>
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>IQC Dominance</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              IQC is primary test source - strong preventive detection
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
            <tr style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', fontSize: '0.9em' }}>Period</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Avg Days</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>IQC</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>IPQC</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>FQC</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Total</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Closed</th>
            </tr>
          </thead>
          <tbody>
            {oosData.map((row, idx) => {
              const striped = idx % 2 === 1
              return (
                <tr key={idx} style={{ backgroundColor: striped ? '#f9fafb' : '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>{row.period}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>{row.avgDays}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{row.iqc}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>{row.ipqc}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>{row.fqc}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{row.total}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{row.closed}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
