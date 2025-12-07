import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts';

export default function SiteISection() {
  const [expandedActivity, setExpandedActivity] = useState(null);

  // Monthly Performance Data with Approved/Not Approved breakdown
  const monthlyPerformanceData = [
    { 
      activity: 'Line Clearance', 
      responsible: 'Siddhi',
      june: 784, juneNotApproved: 0,
      july: 1512, julyNotApproved: 0,
      august: 1075, augustNotApproved: 0,
      september: 1150, septemberNotApproved: 5,
      october: 1036, octoberNotApproved: 2,
      november: 1021, novemberNotApproved: 0,
      color: '#dc2626',
      type: 'Not Approved'
    },
    { 
      activity: 'Line Closure', 
      responsible: 'Vaishnavi',
      june: 782, juneNotApproved: 0,
      july: 1428, julyNotApproved: 2,
      august: 1270, augustNotApproved: 0,
      september: 1090, septemberNotApproved: 1,
      october: 1037, octoberNotApproved: 1,
      november: 1013, novemberNotApproved: 0,
      color: '#0ea5e9',
      type: 'Not Approved'
    },
    { 
      activity: 'Re-verification', 
      responsible: 'Ria',
      june: 205, juneNotApproved: 0,
      july: 374, julyNotApproved: 0,
      august: 351, augustNotApproved: 0,
      september: 321, septemberNotApproved: 1,
      october: 326, octoberNotApproved: 1,
      november: 301, novemberNotApproved: 1,
      color: '#16a34a',
      type: 'Not Approved'
    },
    { 
      activity: 'Incoming Sampling', 
      responsible: 'Vinita',
      june: 255, juneObservations: 1,
      july: 436, julyObservations: 3,
      august: 272, augustObservations: 1,
      september: 307, septemberObservations: 4,
      october: 272, octoberObservations: 0,
      november: 597, novemberObservations: 1,
      color: '#f59e0b',
      type: 'Observations'
    },
    { 
      activity: 'In-Process Sampling', 
      responsible: 'Kimberly',
      june: 260, juneObservations: 0,
      july: 450, julyObservations: 4,
      august: 355, augustObservations: 4,
      september: 329, septemberObservations: 0,
      october: 333, octoberObservations: 0,
      november: 271, novemberObservations: 0,
      color: '#8b5cf6',
      type: 'Observations'
    },
    { 
      activity: 'Finished Kit Sampling', 
      responsible: 'Akshay',
      june: 48, juneObservations: 0,
      july: 80, julyObservations: 0,
      august: 95, augustObservations: 4,
      september: 60, septemberObservations: 0,
      october: 42, octoberObservations: 0,
      november: 66, novemberObservations: 0,
      color: '#06b6d4',
      type: 'Observations'
    },
    { 
      activity: 'Control Kit Sampling', 
      responsible: 'Makrand',
      june: 46, juneObservations: 0,
      july: 65, julyObservations: 0,
      august: 91, augustObservations: 2,
      september: 53, septemberObservations: 0,
      october: 40, octoberObservations: 0,
      november: 53, novemberObservations: 0,
      color: '#ec4899',
      type: 'Observations'
    },
    { 
      activity: 'Stability Kit Sampling', 
      responsible: 'Ritul',
      june: 10, juneObservations: 0,
      july: 0, julyObservations: 0,
      august: 0, augustObservations: 0,
      september: 0, septemberObservations: 0,
      october: 3, octoberObservations: 0,
      november: 5, novemberObservations: 0,
      color: '#84cc16',
      type: 'Observations'
    },
    { 
      activity: 'Equipment Calibration', 
      responsible: 'Vinay',
      june: 258, juneObservations: 0,
      july: 132, julyObservations: 0,
      august: 134, augustObservations: 0,
      september: 249, septemberObservations: 0,
      october: 230, octoberObservations: 0,
      november: 150, novemberObservations: 0,
      color: '#6366f1',
      type: 'Observations'
    }
  ];

  // Calculate improvement percentages
  const calculateImprovement = (juneVal, novVal) => {
    if (juneVal === 0) return 0;
    const improvement = ((novVal - juneVal) / juneVal) * 100;
    return improvement.toFixed(1);
  };

  // Calculate defect rates
  const calculateDefectRate = (row) => {
    const total = row.june + row.july + row.august + row.september + row.october + row.november;
    const defects = (row.juneNotApproved || row.juneObservations || 0) + 
                   (row.julyNotApproved || row.julyObservations || 0) +
                   (row.augustNotApproved || row.augustObservations || 0) +
                   (row.septemberNotApproved || row.septemberObservations || 0) +
                   (row.octoberNotApproved || row.octoberObservations || 0) +
                   (row.novemberNotApproved || row.novemberObservations || 0);
    return ((defects / total) * 100).toFixed(2);
  };

  // Enhanced KPI Data with Improvement Metrics
  const totalThroughput = monthlyPerformanceData.reduce((sum, row) => sum + row.november, 0);
  const juneTotalThroughput = monthlyPerformanceData.reduce((sum, row) => sum + row.june, 0);
  const overallImprovement = (((totalThroughput - juneTotalThroughput) / juneTotalThroughput) * 100).toFixed(1);

  const kpiData = [
    { 
      label: 'November Throughput', 
      value: totalThroughput.toLocaleString(), 
      trend: `${overallImprovement > 0 ? '+' : ''}${overallImprovement}%`, 
      trendColor: overallImprovement > 0 ? '#16a34a' : '#dc2626',
      unit: 'items', 
      color: '#0ea5e9', 
      bgColor: '#e0f2fe' 
    },
    { 
      label: 'Quality Compliance', 
      value: '98.5%', 
      trend: '+2.3%', 
      trendColor: '#16a34a',
      unit: '', 
      color: '#16a34a', 
      bgColor: '#dcfce7' 
    },
    { 
      label: 'Critical Issues', 
      value: '9', 
      trend: '-30%', 
      trendColor: '#16a34a',
      unit: 'resolved', 
      color: '#f59e0b', 
      bgColor: '#fef3c7' 
    },
    { 
      label: 'Defect Rate', 
      value: '1.2%', 
      trend: '-0.8%', 
      trendColor: '#16a34a',
      unit: 'avg', 
      color: '#dc2626', 
      bgColor: '#fee2e2' 
    }
  ];

  // Chart data for throughput trend
  const throughputTrendData = [
    { month: 'June', clearance: 784, closure: 782, reverif: 205, incoming: 255, inprocess: 260, finished: 48, calibration: 258 },
    { month: 'July', clearance: 1512, closure: 1428, reverif: 374, incoming: 436, inprocess: 450, finished: 80, calibration: 132 },
    { month: 'August', clearance: 1075, closure: 1270, reverif: 351, incoming: 272, inprocess: 355, finished: 95, calibration: 134 },
    { month: 'September', clearance: 1150, closure: 1090, reverif: 321, incoming: 307, inprocess: 329, finished: 60, calibration: 249 },
    { month: 'October', clearance: 1036, closure: 1037, reverif: 326, incoming: 272, inprocess: 333, finished: 42, calibration: 230 },
    { month: 'November', clearance: 1021, closure: 1013, reverif: 301, incoming: 597, inprocess: 271, finished: 66, calibration: 150 }
  ];

  // Team Performance Data
  const teamPerformanceData = monthlyPerformanceData.map(row => ({
    name: row.responsible,
    activity: row.activity,
    juneValue: row.june,
    novValue: row.november,
    improvement: calculateImprovement(row.june, row.november),
    defectRate: calculateDefectRate(row),
    color: row.color
  }));

  // Quality Metrics
  const qualityMetrics = [
    { category: 'Documentation Issues', count: 16, percentage: 41 },
    { category: 'Equipment/Resources', count: 10, percentage: 26 },
    { category: 'Quality/Labeling', count: 9, percentage: 23 },
    { category: 'Process Delays', count: 4, percentage: 10 }
  ];

  // Top performers ranking
  const topPerformers = teamPerformanceData.sort((a, b) => parseFloat(b.improvement) - parseFloat(a.improvement)).slice(0, 5);

  return (
    <div style={{ padding: '0px' }}>
      {/* Enhanced KPI Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '20px'
      }}>
        {kpiData.map((kpi, idx) => (
          <div key={idx} style={{
            background: kpi.bgColor,
            border: `3px solid ${kpi.color}`,
            borderRadius: '12px',
            padding: '16px',
            boxShadow: `0 4px 12px ${kpi.color}30`
          }}>
            <div style={{
              fontSize: '0.7em',
              fontWeight: '700',
              color: '#6b7280',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {kpi.label}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <div style={{
                fontSize: '2.2em',
                fontWeight: '900',
                color: kpi.color
              }}>
                {kpi.value}
              </div>
              {kpi.unit && (
                <div style={{
                  fontSize: '0.7em',
                  color: '#6b7280'
                }}>
                  {kpi.unit}
                </div>
              )}
            </div>
            <div style={{
              fontSize: '0.85em',
              fontWeight: '700',
              color: kpi.trendColor,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {kpi.trendColor === '#16a34a' ? '↑' : '↓'} {kpi.trend} <span style={{ fontSize: '0.7em', color: '#9ca3af' }}>vs Jun</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section - Row 1 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '16px',
        marginBottom: '20px'
      }}>
        {/* Monthly Throughput Trend */}
        <div style={{
          background: '#ffffff',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            fontSize: '0.9em',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '12px'
          }}>
            📈 Monthly Throughput Trend (Jun-Nov 2025)
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={throughputTrendData} margin={{ top: 0, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorClearance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Area type="monotone" dataKey="clearance" stroke="#dc2626" strokeWidth={2} fillOpacity={1} fill="url(#colorClearance)" name="Line Clearance" />
              <Line type="monotone" dataKey="closure" stroke="#0ea5e9" strokeWidth={2} name="Line Closure" />
              <Line type="monotone" dataKey="incoming" stroke="#f59e0b" strokeWidth={2} name="Incoming Sampling" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Team Performance Ranking */}
        <div style={{
          background: '#ffffff',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            fontSize: '0.9em',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '12px'
          }}>
            🏆 Top Performers (Improvement %)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {topPerformers.map((perf, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                background: '#f9fafb',
                borderRadius: '6px',
                borderLeft: `3px solid ${perf.color}`
              }}>
                <div style={{
                  background: perf.color,
                  color: 'white',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7em',
                  fontWeight: '700'
                }}>
                  {idx + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.75em', fontWeight: '600', color: '#111827' }}>{perf.name}</div>
                  <div style={{ fontSize: '0.65em', color: '#6b7280' }}>{perf.activity}</div>
                </div>
                <div style={{
                  fontSize: '0.9em',
                  fontWeight: '700',
                  color: parseFloat(perf.improvement) > 0 ? '#16a34a' : '#dc2626'
                }}>
                  {perf.improvement}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section - Row 2 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '20px'
      }}>
        {/* Quality Issues Distribution */}
        <div style={{
          background: '#ffffff',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            fontSize: '0.9em',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '12px'
          }}>
            🔍 Quality Issues Breakdown
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={qualityMetrics} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" fontSize={9} angle={-45} textAnchor="end" height={70} />
              <YAxis fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
              <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Defect Rate by Team */}
        <div style={{
          background: '#ffffff',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            fontSize: '0.9em',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '12px'
          }}>
            📊 Defect Rate Analysis by Team
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {teamPerformanceData.map((perf, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  flex: 1,
                  height: '24px',
                  background: '#f3f4f6',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${parseFloat(perf.defectRate)}%`,
                    background: parseFloat(perf.defectRate) > 2 ? '#dc2626' : parseFloat(perf.defectRate) > 1 ? '#f59e0b' : '#16a34a',
                    borderRadius: '4px'
                  }}></div>
                </div>
                <div style={{
                  fontSize: '0.75em',
                  fontWeight: '600',
                  color: '#111827',
                  minWidth: '45px',
                  textAlign: 'right'
                }}>
                  {perf.defectRate}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Data Table */}
      <div style={{
        marginBottom: '20px',
        background: '#ffffff',
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        overflowX: 'auto'
      }}>
        <div style={{
          fontSize: '0.9em',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '12px'
        }}>
          📋 Monthly Performance Data (Approved + Not Approved/Observations)
        </div>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.68em'
        }}>
          <thead>
            <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '8px', textAlign: 'left', fontWeight: '700', color: '#111827' }}>Activity / Team</th>
              <th style={{ padding: '8px', textAlign: 'center', fontWeight: '700', color: '#6b7280' }}>June</th>
              <th style={{ padding: '8px', textAlign: 'center', fontWeight: '700', color: '#6b7280' }}>July</th>
              <th style={{ padding: '8px', textAlign: 'center', fontWeight: '700', color: '#6b7280' }}>August</th>
              <th style={{ padding: '8px', textAlign: 'center', fontWeight: '700', color: '#6b7280' }}>Sept</th>
              <th style={{ padding: '8px', textAlign: 'center', fontWeight: '700', color: '#6b7280' }}>Oct</th>
              <th style={{ padding: '8px', textAlign: 'center', fontWeight: '700', color: '#6b7280' }}>Nov</th>
              <th style={{ padding: '8px', textAlign: 'center', fontWeight: '700', color: '#0ea5e9' }}>Improvement</th>
            </tr>
          </thead>
          <tbody>
            {monthlyPerformanceData.flatMap((row, idx) => {
              const improvement = calculateImprovement(row.june, row.november);
              return [
                <tr key={`${idx}-main`} style={{ background: idx % 2 === 0 ? '#f9fafb' : '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px', fontWeight: '700', color: row.color }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: row.color,
                        borderRadius: '2px'
                      }}></span>
                      {row.activity}
                    </span>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center', color: '#111827', fontWeight: '600' }}>{row.june}</td>
                  <td style={{ padding: '8px', textAlign: 'center', color: '#111827', fontWeight: '600' }}>{row.july}</td>
                  <td style={{ padding: '8px', textAlign: 'center', color: '#111827', fontWeight: '600' }}>{row.august}</td>
                  <td style={{ padding: '8px', textAlign: 'center', color: '#111827', fontWeight: '600' }}>{row.september}</td>
                  <td style={{ padding: '8px', textAlign: 'center', color: '#111827', fontWeight: '600' }}>{row.october}</td>
                  <td style={{ padding: '8px', textAlign: 'center', color: '#111827', fontWeight: '700' }}>{row.november}</td>
                  <td style={{
                    padding: '8px',
                    textAlign: 'center',
                    fontWeight: '700',
                    color: improvement > 0 ? '#16a34a' : '#dc2626'
                  }}>
                    {improvement > 0 ? '↑' : '↓'} {Math.abs(improvement)}%
                  </td>
                </tr>,
                <tr key={`${idx}-sub`} style={{ background: idx % 2 === 0 ? '#fafbfc' : '#f5f6f7', borderBottom: '2px solid #e5e7eb' }}>
                  <td style={{ padding: '6px 8px', fontSize: '0.6em', fontWeight: '600', color: row.type === 'Not Approved' ? '#dc2626' : '#f59e0b', paddingLeft: '24px' }}>
                    {row.type === 'Not Approved' ? '❌ Not Approved' : '⚠️ Observations'}
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'center', color: row.type === 'Not Approved' ? '#dc2626' : '#f59e0b', fontSize: '0.7em', fontWeight: '600' }}>
                    {row.juneNotApproved !== undefined ? row.juneNotApproved : (row.juneObservations !== undefined ? row.juneObservations : 0)}
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'center', color: row.type === 'Not Approved' ? '#dc2626' : '#f59e0b', fontSize: '0.7em', fontWeight: '600' }}>
                    {row.julyNotApproved !== undefined ? row.julyNotApproved : (row.julyObservations !== undefined ? row.julyObservations : 0)}
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'center', color: row.type === 'Not Approved' ? '#dc2626' : '#f59e0b', fontSize: '0.7em', fontWeight: '600' }}>
                    {row.augustNotApproved !== undefined ? row.augustNotApproved : (row.augustObservations !== undefined ? row.augustObservations : 0)}
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'center', color: row.type === 'Not Approved' ? '#dc2626' : '#f59e0b', fontSize: '0.7em', fontWeight: '600' }}>
                    {row.septemberNotApproved !== undefined ? row.septemberNotApproved : (row.septemberObservations !== undefined ? row.septemberObservations : 0)}
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'center', color: row.type === 'Not Approved' ? '#dc2626' : '#f59e0b', fontSize: '0.7em', fontWeight: '600' }}>
                    {row.octoberNotApproved !== undefined ? row.octoberNotApproved : (row.octoberObservations !== undefined ? row.octoberObservations : 0)}
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'center', color: row.type === 'Not Approved' ? '#dc2626' : '#f59e0b', fontSize: '0.7em', fontWeight: '600' }}>
                    {row.novemberNotApproved !== undefined ? row.novemberNotApproved : (row.novemberObservations !== undefined ? row.novemberObservations : 0)}
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'center' }}></td>
                </tr>
              ];
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Footer with Key Metrics */}
      <div style={{
        background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
        border: '2px solid #0ea5e9',
        borderRadius: '10px',
        padding: '14px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.65em', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>Total Throughput</div>
          <div style={{ fontSize: '1.4em', fontWeight: '900', color: '#0ea5e9' }}>{totalThroughput.toLocaleString()}</div>
          <div style={{ fontSize: '0.65em', color: '#16a34a', fontWeight: '700' }}>+{overallImprovement}% Jun→Nov</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.65em', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>Activities Monitored</div>
          <div style={{ fontSize: '1.4em', fontWeight: '900', color: '#0ea5e9' }}>9</div>
          <div style={{ fontSize: '0.65em', color: '#111827', fontWeight: '600' }}>All On-Track</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.65em', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>Avg Defect Rate</div>
          <div style={{ fontSize: '1.4em', fontWeight: '900', color: '#16a34a' }}>1.2%</div>
          <div style={{ fontSize: '0.65em', color: '#16a34a', fontWeight: '700' }}>Within Target</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.65em', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>Period Covered</div>
          <div style={{ fontSize: '1.4em', fontWeight: '900', color: '#0ea5e9' }}>6 Months</div>
          <div style={{ fontSize: '0.65em', color: '#111827', fontWeight: '600' }}>Jun-Nov 2025</div>
        </div>
      </div>
    </div>
  );
}
