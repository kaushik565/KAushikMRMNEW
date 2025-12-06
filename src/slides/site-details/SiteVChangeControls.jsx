import { Line, Bar } from 'react-chartjs-2'

export default function SiteVChangeControls() {
  const ccData = [
    {
      period: 'JAN-JUNE',
      days: 50,
      count: 232,
      closedSameMonth: 19,
      percentage: 8.1,
    },
    {
      period: 'JULY',
      days: 46,
      count: 34,
      closedSameMonth: 6,
      percentage: 17.6,
    },
    {
      period: 'AUGUST',
      days: 40,
      count: 30,
      closedSameMonth: 2,
      percentage: 6.6,
    },
    {
      period: 'SEPTEMBER',
      days: 38,
      count: 23,
      closedSameMonth: 3,
      percentage: 13,
    },
    {
      period: 'OCTOBER',
      days: 12,
      count: 34,
      closedSameMonth: 5,
      percentage: 14.7,
    },
    {
      period: 'NOVEMBER',
      days: 30,
      count: 23,
      closedSameMonth: 0,
      percentage: 0,
    },
  ];

  // Calculate weighted averages and totals
  const totalDays = (ccData.reduce((sum, row) => sum + row.days * row.count, 0) / ccData.reduce((sum, row) => sum + row.count, 0)).toFixed(1);
  const totalCount = ccData.reduce((sum, row) => sum + row.count, 0);
  const totalClosed = ccData.reduce((sum, row) => sum + row.closedSameMonth, 0);
  const avgClosurePercentage = (ccData.reduce((sum, row) => sum + row.percentage, 0) / ccData.length).toFixed(1);

  // KPI Improvements - Comparing Nov vs Jan-Jun (first vs last)
  const junDays = ccData[0].days         // Jan-Jun: 50
  const novDays = ccData[5].days         // Nov: 30
  const daysImprovement = Math.round(((junDays - novDays) / junDays) * 100)
  const junCount = ccData[0].count       // Jan-Jun: 232
  const novCount = ccData[5].count       // Nov: 23
  const countReduction = Math.round(((junCount - novCount) / junCount) * 100)
  const junSameMonthPct = ccData[0].percentage // 8.1
  const novSameMonthPct = ccData[5].percentage // 0
  const pctChange = Math.round(((novSameMonthPct - junSameMonthPct) / junSameMonthPct) * 100)

  // Metrics data
  const metrics = [
    {
      label: 'Avg Days to Close',
      value: totalDays,
      change: `${daysImprovement}%`,
      trend: 'down',
    },
    {
      label: 'Total CC Count',
      value: totalCount,
      change: `${countReduction}%`,
      trend: 'down',
    },
    {
      label: 'Same-Month Closure %',
      value: `${avgClosurePercentage}%`,
      change: 'avg',
      trend: 'neutral',
    },
    {
      label: 'Best Month (Days)',
      value: '12',
      change: 'OCTOBER',
      trend: 'down',
    },
  ];

  // Data for dual charts
  const chartDataCC = [
    {
      period: 'JAN-JUNE',
      'Avg Days': 50,
      'CC Count': 232,
      'Closure %': 8.1,
    },
    {
      period: 'JULY',
      'Avg Days': 46,
      'CC Count': 34,
      'Closure %': 17.6,
    },
    {
      period: 'AUGUST',
      'Avg Days': 40,
      'CC Count': 30,
      'Closure %': 6.6,
    },
    {
      period: 'SEPTEMBER',
      'Avg Days': 38,
      'CC Count': 23,
      'Closure %': 13,
    },
    {
      period: 'OCTOBER',
      'Avg Days': 12,
      'CC Count': 34,
      'Closure %': 14.7,
    },
    {
      period: 'NOVEMBER',
      'Avg Days': 30,
      'CC Count': 23,
      'Closure %': 0,
    },
  ];

  // Chart data for avg days trend
  const daysChartData = {
    labels: chartDataCC.map(d => d.period),
    datasets: [
      {
        label: 'Avg Days',
        data: chartDataCC.map(d => d['Avg Days']),
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
    ],
  };

  // Chart data for count & closure rate
  const countClosureChartData = {
    labels: chartDataCC.map(d => d.period),
    datasets: [
      {
        label: 'CC Count',
        data: chartDataCC.map(d => d['CC Count']),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        borderRadius: 8,
        yAxisID: 'left',
      },
      {
        label: 'Closure %',
        data: chartDataCC.map(d => d['Closure %']),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: '#10b981',
        borderWidth: 2,
        borderRadius: 8,
        yAxisID: 'right',
      },
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
      left: {
        beginAtZero: true,
        position: 'left',
        ticks: { font: { size: 10 } },
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      },
      right: {
        beginAtZero: true,
        position: 'right',
        max: 30,
        ticks: { font: { size: 10 } },
        grid: { display: false }
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
        {/* Card 1: Total CC Count - Purple */}
        <div style={{
          background: 'linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #8b5cf6',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#7c3aed', fontWeight: '600', marginBottom: '8px' }}>Total CC Count</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#7c3aed' }}>{totalCount}</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>Jan-Nov 2024</div>
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
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#059669' }}>{totalDays}</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>Weighted average</div>
        </div>

        {/* Card 3: Same-Month Closure % - Blue */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #3b82f6',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#2563eb', fontWeight: '600', marginBottom: '8px' }}>Same-Month Closure %</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#2563eb' }}>{avgClosurePercentage}%</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>Average across periods</div>
        </div>

        {/* Card 4: Best Month (Days) - Yellow */}
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid #f59e0b',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
        }}>
          <div style={{ fontSize: '0.85em', color: '#d97706', fontWeight: '600', marginBottom: '8px' }}>Best Month (Days)</div>
          <div style={{ fontSize: '2em', fontWeight: '800', color: '#d97706' }}>12</div>
          <div style={{ fontSize: '0.75em', color: '#6b7280', marginTop: '4px' }}>October (76% improvement)</div>
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
            📉 Average Days Trend (CC)
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Line data={daysChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* CC Count & Closure Rate */}
        <div style={{
          background: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb',
          height: '300px'
        }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#0f172a', fontWeight: '700', fontSize: '1em' }}>
            📊 CC Count & Closure Rate
          </h4>
          <div style={{ height: '240px', width: '100%' }}>
            <Bar data={countClosureChartData} options={barChartOptions} />
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
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>Dramatic Cycle Time Reduction</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              Closure time dropped 40% (50→30 days) from start to end
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
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>Volume Decrease</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              CC count reduced 90% (232→23), better change management
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
              October achieved 12 days (76% improvement vs baseline)
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
            <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>⚡</div>
            <div style={{ fontWeight: '700', color: '#7c3aed', fontSize: '0.9em', marginBottom: '4px' }}>Same-Month Closure</div>
            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
              Avg {avgClosurePercentage}%, peak 17.6% in July
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
            <tr style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', fontSize: '0.9em' }}>Period</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Avg Days</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Count</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Closed Same Month</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700', fontSize: '0.9em' }}>Closure %</th>
            </tr>
          </thead>
          <tbody>
            {ccData.map((row, idx) => {
              const striped = idx % 2 === 1
              return (
                <tr key={idx} style={{ backgroundColor: striped ? '#f9fafb' : '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: '600' }}>{row.period}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>{row.days}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{row.count}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a' }}>{row.closedSameMonth}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>{row.percentage}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
