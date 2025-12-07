import { useMemo, useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';

export default function SiteIEquipmentCalibration() {
  const [showObservations, setShowObservations] = useState(false);

  const observations = [
    {
      id: 1,
      date: 'Jun-Nov 2025',
      finding: 'No observations recorded during this period',
      severity: 'Minor',
      status: 'Resolved',
      action: 'All equipment calibrations completed as per schedule without any deviations'
    }
  ];

  const calibrationData = useMemo(() => ({
    activity: 'Equipment Calibration Data',
    responsibility: 'Vinay',
    monthly: [
      { month: 'Jun', calibrations: 258, avg: 258 },
      { month: 'Jul', calibrations: 132, avg: 195 },
      { month: 'Aug', calibrations: 134, avg: 175 },
      { month: 'Sep', calibrations: 249, avg: 193 },
      { month: 'Oct', calibrations: 230, avg: 201 },
      { month: 'Nov', calibrations: 150, avg: 194 }
    ],
    summary: {
      totalCalibrations: 1153,
      avgPerMonth: 192,
      highestMonth: 'June',
      highestValue: 258,
      lowestMonth: 'November',
      lowestValue: 150
    }
  }), []);

  const chartColors = {
    primary: '#ec4899',
    secondary: '#f59e0b',
    accent: '#8b5cf6'
  };

  return (
    <section style={{
      marginBottom: '20px',
      paddingBottom: '20px',
      borderBottom: '2px solid #e5e7eb'
    }}>
      <div style={{ padding: '0' }}>
        <div style={{
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '2px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '1.5em',
            margin: '0 0 6px 0',
            color: '#b91c1c'
          }}>{calibrationData.activity}</h2>
          <p style={{
            fontSize: '0.85em',
            color: '#6b7280',
            margin: '0'
          }}>Responsibility: <strong>{calibrationData.responsibility}</strong></p>
        </div>

        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderLeft: '3px solid #0ea5e9', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>{calibrationData.summary.totalCalibrations}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '600', color: '#4b5563', marginBottom: '2px' }}>Total Calibrations</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>Jun - Nov 2025</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)', borderLeft: '3px solid #8b5cf6', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>{calibrationData.summary.avgPerMonth}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '600', color: '#4b5563', marginBottom: '2px' }}>Avg/Month</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>Monthly Average</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', borderLeft: '3px solid #10b981', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>{calibrationData.summary.highestValue}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '600', color: '#4b5563', marginBottom: '2px' }}>Peak Activity</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>{calibrationData.summary.highestMonth}</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', borderLeft: '3px solid #ef4444', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>{calibrationData.summary.lowestValue}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '600', color: '#4b5563', marginBottom: '2px' }}>Lowest Activity</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>{calibrationData.summary.lowestMonth}</div>
          </div>
        </div>

        {/* Charts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          marginBottom: '20px'
        }}>
          {/* Area Chart */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
            <h3 style={{ fontSize: '0.95em', margin: '0 0 12px 0', color: '#111827', fontWeight: '600' }}>Calibration Trend (Area)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={calibrationData.monthly} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="calibrations" stroke={chartColors.primary} fillOpacity={1} fill="url(#colorCal)" name="Calibrations" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
            <h3 style={{ fontSize: '0.95em', margin: '0 0 12px 0', color: '#111827', fontWeight: '600' }}>Monthly Calibration Distribution</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={calibrationData.monthly} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="calibrations" fill={chartColors.secondary} name="Calibrations" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '25px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', fontSize: '0.85em' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)' }}>
                <th style={{ color: 'white', padding: '10px', textAlign: 'left', fontWeight: '600' }}>Month</th>
                <th style={{ color: 'white', padding: '10px', textAlign: 'center', fontWeight: '600' }}>Calibrations</th>
                <th style={{ color: 'white', padding: '10px', textAlign: 'center', fontWeight: '600' }}>Running Average</th>
                <th style={{ color: 'white', padding: '10px', textAlign: 'center', fontWeight: '600' }}>Trend</th>
              </tr>
            </thead>
            <tbody>
              {calibrationData.monthly.map((row, idx) => {
                const trend = idx === 0 ? '-' : row.calibrations > calibrationData.monthly[idx - 1].calibrations ? '↑' : row.calibrations < calibrationData.monthly[idx - 1].calibrations ? '↓' : '→';
                const trendColor = trend === '↑' ? '#10b981' : trend === '↓' ? '#ef4444' : '#f59e0b';
                return (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '8px 10px' }}>{row.month}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', color: '#ec4899', fontWeight: '600' }}>{row.calibrations}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', color: '#8b5cf6', fontWeight: '600' }}>{row.avg.toFixed(0)}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', color: trendColor, fontWeight: '700', fontSize: '1.2em' }}>{trend}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Key Insights */}
        <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '1.1em', margin: '0 0 15px 0', color: '#111827', fontWeight: '600' }}>Key Insights</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', borderLeft: '4px solid #10b981', borderRadius: '6px', padding: '12px' }}>
              <div style={{ fontSize: '0.9em', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>📊 Peak Performance</div>
              <div style={{ fontSize: '0.85em', color: '#4b5563' }}>June recorded the highest calibrations at 258 activities, indicating strong operational capacity.</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', borderLeft: '4px solid #ef4444', borderRadius: '6px', padding: '12px' }}>
              <div style={{ fontSize: '0.9em', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>📉 Resource Optimization</div>
              <div style={{ fontSize: '0.85em', color: '#4b5563' }}>November showed a reduction to 150 calibrations, suggesting optimized scheduling or reduced demand.</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderLeft: '4px solid #f59e0b', borderRadius: '6px', padding: '12px' }}>
              <div style={{ fontSize: '0.9em', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>⚡ Consistency</div>
              <div style={{ fontSize: '0.85em', color: '#4b5563' }}>Average of 192 calibrations per month demonstrates stable operational rhythm with manageable fluctuations.</div>
            </div>
          </div>
        </div>

        {/* Observations Section */}
        <div style={{ marginTop: '30px' }}>
          <button
            onClick={() => setShowObservations(!showObservations)}
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1em',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(236, 72, 153, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(236, 72, 153, 0.3)';
            }}
          >
            {showObservations ? '▼' : '▶'} View Detailed Observations ({observations.length})
          </button>

          {showObservations && (
            <div style={{
              marginTop: '20px',
              background: 'white',
              border: '3px solid #ec4899',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 8px 24px rgba(236, 72, 153, 0.2)',
              animation: 'slideIn 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '2px solid #e5e7eb'
              }}>
                <h4 style={{
                  fontSize: '1.3em',
                  margin: 0,
                  color: '#1f2937',
                  fontWeight: '700'
                }}>
                  📋 Equipment Calibration - Detailed Observations
                </h4>
                <button
                  onClick={() => setShowObservations(false)}
                  style={{
                    background: '#ef4444',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    color: 'white',
                    fontSize: '0.9em',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#dc2626';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ef4444';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  ✕ Close
                </button>
              </div>

              <div style={{
                display: 'grid',
                gap: '12px',
                maxHeight: '500px',
                overflowY: 'auto',
                paddingRight: '10px'
              }}>
                {observations.map((obs) => (
                  <div
                    key={obs.id}
                    style={{
                      background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      padding: '16px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#ec4899';
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(236, 72, 153, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          background: '#dcfce7',
                          color: '#166534',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.7em',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          No Issues
                        </span>
                        <span style={{
                          background: '#dcfce7',
                          color: '#166534',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.7em',
                          fontWeight: '700'
                        }}>
                          ✓ {obs.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75em', color: '#6b7280', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        📅 {obs.date}
                      </div>
                    </div>
                    <div style={{ marginBottom: '10px', padding: '8px', background: 'white', borderRadius: '6px', borderLeft: '3px solid #10b981' }}>
                      <span style={{ fontSize: '0.8em', fontWeight: '700', color: '#10b981' }}>Status: </span>
                      <span style={{ fontSize: '0.8em', color: '#111827' }}>{obs.finding}</span>
                    </div>
                    <div style={{
                      background: 'white',
                      padding: '10px',
                      borderRadius: '6px',
                      borderLeft: '3px solid #10b981'
                    }}>
                      <span style={{ fontSize: '0.75em', fontWeight: '700', color: '#10b981' }}>✓ Summary: </span>
                      <span style={{ fontSize: '0.75em', color: '#4b5563', lineHeight: '1.5' }}>{obs.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
