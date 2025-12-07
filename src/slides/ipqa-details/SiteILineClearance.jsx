import { useMemo, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

export default function SiteILineClearance() {
  const [showObservations, setShowObservations] = useState(false);

  const observations = [
    {
      id: 1,
      date: 'Jul 2025',
      finding: 'While giving clearance it was observed that cabinets of lot no HLGW520 were present along with the ARC308. Also the HLGW520 cabinets are not chain locked so kept hold.',
      severity: 'Critical',
      status: 'Resolved',
      action: 'Cabinets properly separated and chain locked before proceeding with clearance'
    },
    {
      id: 2,
      date: 'Aug 2025',
      finding: 'Activity status board and logbooks were not updated (Lot no. IC349)',
      severity: 'Major',
      status: 'Resolved',
      action: 'Status board and logbooks updated immediately. SOP adherence reinforced'
    },
    {
      id: 3,
      date: 'Aug 2025',
      finding: 'Page no 5 of FM/IC/I/020 got teared, incident raised for the same',
      severity: 'Major',
      status: 'Resolved',
      action: 'Incident raised and document replaced with fresh copy'
    },
    {
      id: 4,
      date: 'Sep 2025',
      finding: 'Approved label is not there on material and taken for line clearance (Lot no.MAL155)',
      severity: 'Critical',
      status: 'Resolved',
      action: 'Clearance kept on hold until approved label affixed'
    },
    {
      id: 5,
      date: 'Sep 2025',
      finding: 'Bungs(8SWOB184) washing is ongoing in same area so kept on HOLD',
      severity: 'Major',
      status: 'Resolved',
      action: 'Clearance resumed after washing activity completed and area cleaned'
    },
    {
      id: 6,
      date: 'Oct 2025',
      finding: 'Checked by sign is pending on logbooks (Lot no. IC346)',
      severity: 'Minor',
      status: 'Resolved',
      action: 'Signatures obtained and logbooks completed'
    },
    {
      id: 7,
      date: 'Nov 2025',
      finding: 'NTC Testing of TA-40-103 was not carried out during IC345 Preparation',
      severity: 'Critical',
      status: 'Resolved',
      action: 'NTC testing completed before proceeding with batch processing'
    }
  ];

  const lineClearanceData = useMemo(() => ({
    activity: 'Line Clearance',
    responsibility: 'Siddhi',
    monthly: [
      { month: 'Jun', approved: 784, notApproved: 0, total: 784 },
      { month: 'Jul', approved: 1512, notApproved: 0, total: 1512 },
      { month: 'Aug', approved: 1075, notApproved: 0, total: 1075 },
      { month: 'Sep', approved: 1145, notApproved: 5, total: 1150 },
      { month: 'Oct', approved: 1034, notApproved: 2, total: 1036 },
      { month: 'Nov', approved: 1021, notApproved: 0, total: 1021 }
    ],
    summary: {
      totalApproved: 6571,
      totalNotApproved: 7,
      approvalRate: '99.9%',
      avgPerMonth: 1037
    }
  }), []);

  const chartColors = {
    approved: '#10b981',
    notApproved: '#ef4444',
    total: '#3b82f6'
  };

  return (
    <section style={{
      marginBottom: '20px',
      paddingBottom: '20px',
      borderBottom: '2px solid #e5e7eb'
    }}>
      <div style={{ padding: '0' }}>
        <div style={{
          marginBottom: '25px',
          paddingBottom: '15px',
          borderBottom: '2px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '1.8em',
            margin: '0 0 8px 0',
            color: '#b91c1c'
          }}>{lineClearanceData.activity}</h2>
          <p style={{
            fontSize: '0.95em',
            color: '#6b7280',
            margin: '0'
          }}>Responsibility: <strong>{lineClearanceData.responsibility}</strong></p>
        </div>

        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '15px',
          marginBottom: '25px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            borderLeft: '4px solid #0ea5e9',
            borderRadius: '8px',
            padding: '15px'
          }}>
            <div style={{ fontSize: '1.8em', fontWeight: '700', color: '#111827', marginBottom: '6px' }}>
              {lineClearanceData.summary.totalApproved}
            </div>
            <div style={{ fontSize: '0.85em', fontWeight: '600', color: '#4b5563', marginBottom: '4px' }}>
              Total Approved
            </div>
            <div style={{ fontSize: '0.75em', color: '#6b7280' }}>Jun - Nov 2025</div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderLeft: '4px solid #f59e0b',
            borderRadius: '8px',
            padding: '15px'
          }}>
            <div style={{ fontSize: '1.8em', fontWeight: '700', color: '#111827', marginBottom: '6px' }}>
              {lineClearanceData.summary.totalNotApproved}
            </div>
            <div style={{ fontSize: '0.85em', fontWeight: '600', color: '#4b5563', marginBottom: '4px' }}>
              Not Approved
            </div>
            <div style={{ fontSize: '0.75em', color: '#6b7280' }}>Exceptions</div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
            borderLeft: '4px solid #10b981',
            borderRadius: '8px',
            padding: '15px'
          }}>
            <div style={{ fontSize: '1.8em', fontWeight: '700', color: '#111827', marginBottom: '6px' }}>
              {lineClearanceData.summary.approvalRate}
            </div>
            <div style={{ fontSize: '0.85em', fontWeight: '600', color: '#4b5563', marginBottom: '4px' }}>
              Approval Rate
            </div>
            <div style={{ fontSize: '0.75em', color: '#6b7280' }}>Excellent</div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)',
            borderLeft: '4px solid #8b5cf6',
            borderRadius: '8px',
            padding: '15px'
          }}>
            <div style={{ fontSize: '1.8em', fontWeight: '700', color: '#111827', marginBottom: '6px' }}>
              {lineClearanceData.summary.avgPerMonth}
            </div>
            <div style={{ fontSize: '0.85em', fontWeight: '600', color: '#4b5563', marginBottom: '4px' }}>
              Avg/Month
            </div>
            <div style={{ fontSize: '0.75em', color: '#6b7280' }}>Monthly Average</div>
          </div>
        </div>

        {/* Charts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
          marginBottom: '25px'
        }}>
          {/* Stacked Bar Chart */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '15px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ fontSize: '1em', margin: '0 0 15px 0', color: '#111827', fontWeight: '600' }}>
              Monthly Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={lineClearanceData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: '0.65em' }} />
                <YAxis style={{ fontSize: '0.65em' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" fill={chartColors.approved} name="Approved" />
                <Bar dataKey="notApproved" fill={chartColors.notApproved} name="Not Approved" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Total Trend Line */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '15px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ fontSize: '1em', margin: '0 0 15px 0', color: '#111827', fontWeight: '600' }}>
              Total Activity Trend
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={lineClearanceData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: '0.65em' }} />
                <YAxis style={{ fontSize: '0.65em' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke={chartColors.total} strokeWidth={3} name="Total Activities" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div style={{
          overflowX: 'auto',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'white'
          }}>
            <thead>
              <tr style={{
                background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)'
              }}>
                <th style={{
                  color: 'white',
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: '600',
                  fontSize: '0.85em',
                  textTransform: 'uppercase'
                }}>Month</th>
                <th style={{
                  color: 'white',
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: '600',
                  fontSize: '0.85em',
                  textTransform: 'uppercase'
                }}>Approved</th>
                <th style={{
                  color: 'white',
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: '600',
                  fontSize: '0.85em',
                  textTransform: 'uppercase'
                }}>Not Approved</th>
                <th style={{
                  color: 'white',
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: '600',
                  fontSize: '0.85em',
                  textTransform: 'uppercase'
                }}>Total</th>
                <th style={{
                  color: 'white',
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: '600',
                  fontSize: '0.85em',
                  textTransform: 'uppercase'
                }}>Approval %</th>
              </tr>
            </thead>
            <tbody>
              {lineClearanceData.monthly.map((row, idx) => (
                <tr key={idx} style={{
                  background: idx % 2 === 0 ? '#ffffff' : '#f9fafb',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <td style={{ padding: '10px 12px', fontSize: '0.85em' }}>{row.month}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.85em', color: '#10b981', fontWeight: '600' }}>
                    {row.approved}
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: '0.85em', color: '#ef4444', fontWeight: '600' }}>
                    {row.notApproved}
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: '0.85em', color: '#0ea5e9', fontWeight: '600' }}>
                    {row.total}
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: '0.85em', color: '#4b5563', fontWeight: '500' }}>
                    {((row.approved / row.total) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Observations Section */}
        <div style={{ marginTop: '30px' }}>
          <button
            onClick={() => setShowObservations(!showObservations)}
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1em',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
            }}
          >
            {showObservations ? '▼' : '▶'} View Detailed Observations ({observations.length})
          </button>

          {showObservations && (
            <div style={{
              marginTop: '20px',
              background: 'white',
              border: '3px solid #dc2626',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 8px 24px rgba(220, 38, 38, 0.2)',
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
                  📋 Line Clearance - Detailed Observations
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
                      e.currentTarget.style.borderColor = '#dc2626';
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.15)';
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
                          background: obs.severity === 'Critical' ? '#fee2e2' : obs.severity === 'Major' ? '#fef3c7' : '#dbeafe',
                          color: obs.severity === 'Critical' ? '#dc2626' : obs.severity === 'Major' ? '#d97706' : '#2563eb',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.7em',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {obs.severity}
                        </span>
                        <span style={{
                          background: obs.status === 'Resolved' ? '#dcfce7' : '#fef3c7',
                          color: obs.status === 'Resolved' ? '#166534' : '#d97706',
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
                    <div style={{ marginBottom: '10px', padding: '8px', background: 'white', borderRadius: '6px', borderLeft: '3px solid #f59e0b' }}>
                      <span style={{ fontSize: '0.8em', fontWeight: '700', color: '#d97706' }}>Finding: </span>
                      <span style={{ fontSize: '0.8em', color: '#111827' }}>{obs.finding}</span>
                    </div>
                    <div style={{
                      background: 'white',
                      padding: '10px',
                      borderRadius: '6px',
                      borderLeft: '3px solid #10b981'
                    }}>
                      <span style={{ fontSize: '0.75em', fontWeight: '700', color: '#10b981' }}>✓ Action Taken: </span>
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
