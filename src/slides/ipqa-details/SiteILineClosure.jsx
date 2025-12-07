import { useMemo, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function SiteILineClosure() {
  const [showObservations, setShowObservations] = useState(false);

  const observations = [
    {
      id: 1,
      date: 'Aug 2025',
      finding: 'The final reconciliation is not matching with document because of that more than three cut signs occurs. Incident for the same has raised',
      severity: 'Major',
      status: 'Resolved',
      action: 'Incident raised and document reconciliation corrected with proper authorization'
    },
    {
      id: 2,
      date: 'Sep 2025',
      finding: 'While line closure of UIC420 it was observed that Page no 5 of FM/IC/I/020 got teared, incident raised for the same',
      severity: 'Major',
      status: 'Resolved',
      action: 'Incident raised and document replaced with fresh copy'
    },
    {
      id: 3,
      date: 'Sep 2025',
      finding: 'Sampling has not given yet and thus document is incomplete so closure kept on hold (Lot no. MAL156)',
      severity: 'Critical',
      status: 'Resolved',
      action: 'Closure resumed after sampling completed and documents finalized'
    },
    {
      id: 4,
      date: 'Oct 2025',
      finding: 'During line closure of ARC267 reworked turnat chip arrangement on page no. 05 of FM/MC/103-01, cabinet ID: M/EQID/I-00430 was not written and of cabinet ID: M/EQID/I-00415 tray no. is written as 169-248 instead of 169-210, Incident is raised for the same',
      severity: 'Critical',
      status: 'Resolved',
      action: 'Incident raised, documentation corrected with proper cabinet IDs and tray numbers'
    }
  ];

  const lineClosureData = useMemo(() => ({
    activity: 'Line-closure',
    responsibility: 'Vaishnavi',
    monthly: [
      { month: 'Jun', approved: 782, notApproved: 1, total: 783 },
      { month: 'Jul', approved: 1428, notApproved: 0, total: 1428 },
      { month: 'Aug', approved: 1248, notApproved: 0, total: 1248 },
      { month: 'Sep', approved: 1198, notApproved: 1, total: 1199 },
      { month: 'Oct', approved: 1204, notApproved: 1, total: 1205 },
      { month: 'Nov', approved: 1120, notApproved: 1, total: 1121 }
    ],
    summary: {
      totalApproved: 6980,
      totalNotApproved: 4,
      approvalRate: '99.9%',
      avgPerMonth: 1164
    }
  }), []);

  const chartColors = {
    approved: '#06b6d4',
    notApproved: '#ec4899',
    total: '#14b8a6'
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
          }}>{lineClosureData.activity}</h2>
          <p style={{
            fontSize: '0.85em',
            color: '#6b7280',
            margin: '0'
          }}>Responsibility: <strong>{lineClosureData.responsibility}</strong></p>
        </div>

        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderLeft: '3px solid #0ea5e9', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>{lineClosureData.summary.totalApproved}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '600', color: '#4b5563', marginBottom: '2px' }}>Total Approved</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>Jun - Nov 2025</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderLeft: '3px solid #f59e0b', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>{lineClosureData.summary.totalNotApproved}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '600', color: '#4b5563', marginBottom: '2px' }}>Not Approved</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>Exceptions</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', borderLeft: '3px solid #10b981', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>{lineClosureData.summary.approvalRate}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '600', color: '#4b5563', marginBottom: '2px' }}>Approval Rate</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>Excellent</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)', borderLeft: '3px solid #8b5cf6', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>{lineClosureData.summary.avgPerMonth}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '600', color: '#4b5563', marginBottom: '2px' }}>Avg/Month</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>Monthly Average</div>
          </div>
        </div>

        {/* Charts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '12px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ fontSize: '0.9em', margin: '0 0 10px 0', color: '#111827', fontWeight: '600' }}>
              Monthly Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={lineClosureData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: '0.65em' }} />
                <YAxis style={{ fontSize: '0.65em' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '0.75em' }} />
                <Bar dataKey="approved" fill={chartColors.approved} name="Approved" />
                <Bar dataKey="notApproved" fill={chartColors.notApproved} name="Not Approved" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '12px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ fontSize: '0.9em', margin: '0 0 10px 0', color: '#111827', fontWeight: '600' }}>
              Total Activity Trend
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={lineClosureData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: '0.65em' }} />
                <YAxis style={{ fontSize: '0.65em' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '0.75em' }} />
                <Line type="monotone" dataKey="total" stroke={chartColors.total} strokeWidth={2} name="Total Activities" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div style={{
          overflowX: 'auto',
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
          marginBottom: '10px'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'white',
            fontSize: '0.8em'
          }}>
            <thead>
              <tr style={{
                background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)'
              }}>
                <th style={{ color: 'white', padding: '8px', textAlign: 'left', fontWeight: '600', fontSize: '0.85em' }}>Month</th>
                <th style={{ color: 'white', padding: '8px', textAlign: 'left', fontWeight: '600', fontSize: '0.85em' }}>Approved</th>
                <th style={{ color: 'white', padding: '8px', textAlign: 'left', fontWeight: '600', fontSize: '0.85em' }}>Not Approved</th>
                <th style={{ color: 'white', padding: '8px', textAlign: 'left', fontWeight: '600', fontSize: '0.85em' }}>Total</th>
                <th style={{ color: 'white', padding: '8px', textAlign: 'left', fontWeight: '600', fontSize: '0.85em' }}>Approval %</th>
              </tr>
            </thead>
            <tbody>
              {lineClosureData.monthly.map((row, idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px' }}>{row.month}</td>
                  <td style={{ padding: '8px', color: '#10b981', fontWeight: '600' }}>{row.approved}</td>
                  <td style={{ padding: '8px', color: '#ef4444', fontWeight: '600' }}>{row.notApproved}</td>
                  <td style={{ padding: '8px', color: '#0ea5e9', fontWeight: '600' }}>{row.total}</td>
                  <td style={{ padding: '8px', color: '#4b5563', fontWeight: '500' }}>{((row.approved / row.total) * 100).toFixed(1)}%</td>
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
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1em',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(6, 182, 212, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.3)';
            }}
          >
            {showObservations ? '▼' : '▶'} View Detailed Observations ({observations.length})
          </button>

          {showObservations && (
            <div style={{
              marginTop: '20px',
              background: 'white',
              border: '3px solid #06b6d4',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 8px 24px rgba(6, 182, 212, 0.2)',
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
                  📋 Line Closure - Detailed Observations
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
                      e.currentTarget.style.borderColor = '#06b6d4';
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.15)';
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
