// SITE-III Line Verification Detail View
export default function SiteIIILineVerification() {
  const monthlyData = [
    { month: 'July', approved: 1023, notApproved: 0, total: 1023, approvalRate: '100.00%' },
    { month: 'August', approved: 1201, notApproved: 0, total: 1201, approvalRate: '100.00%' },
    { month: 'September', approved: 1256, notApproved: 0, total: 1256, approvalRate: '100.00%' },
    { month: 'October', approved: 1318, notApproved: 0, total: 1318, approvalRate: '100.00%' },
    { month: 'November', approved: 1392, notApproved: 1, total: 1393, approvalRate: '99.93%' }
  ];

  const totalApproved = 6190;
  const totalNotApproved = 1;
  const totalQty = 6191;
  const overallApprovalRate = '99.98%';

  const maxValue = Math.max(...monthlyData.map(d => d.total));

  return (
    <div style={{ padding: '40px', background: '#f8fafc', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '2.2em',
          fontWeight: '800',
          color: '#8b5cf6',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span>✅</span> Line Verification - SITE-III
        </h2>
        <p style={{ fontSize: '1em', color: '#64748b', margin: 0 }}>
          Monthly Trend Analysis (July - November 2025)
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {[
          { value: totalApproved, label: 'Total Approved', color: '#16a34a', bg: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '#86efac', icon: '✓' },
          { value: totalNotApproved, label: 'Total Not Approved', color: '#dc2626', bg: 'linear-gradient(135deg, #fef2f2, #fee2e2)', border: '#fca5a5', icon: '✗' },
          { value: totalQty, label: 'Total Quantity', color: '#8b5cf6', bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', border: '#c4b5fd', icon: '📊' },
          { value: overallApprovalRate, label: 'Approval Rate', color: '#d97706', bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '#fcd34d', icon: '📈' }
        ].map((card, idx) => (
          <div key={idx} style={{
            background: card.bg,
            border: `2px solid ${card.border}`,
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = `0 12px 24px ${card.color}40`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              fontSize: '4em',
              opacity: '0.1'
            }}>{card.icon}</div>
            <div style={{ fontSize: '2.8em', fontWeight: '900', color: card.color, marginBottom: '8px', position: 'relative', zIndex: 1 }}>
              {card.value}
            </div>
            <div style={{ fontSize: '0.95em', fontWeight: '700', color: card.color, opacity: '0.8', position: 'relative', zIndex: 1 }}>
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '28px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
      }}>
        <h3 style={{
          fontSize: '1.4em',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '24px'
        }}>
          📊 Monthly Verification Trend
        </h3>

        <div style={{ position: 'relative', height: '360px', paddingTop: '20px' }}>
          {monthlyData.map((data, idx) => {
            const chartHeight = 280;
            const approvedHeight = (data.approved / maxValue) * chartHeight;
            const notApprovedHeight = (data.notApproved / maxValue) * chartHeight;

            return (
              <div key={idx} style={{
                display: 'inline-block',
                width: '18%',
                marginRight: idx < monthlyData.length - 1 ? '2.5%' : '0',
                verticalAlign: 'bottom',
                height: '100%',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '50px',
                  left: 0,
                  right: 0,
                  height: `${approvedHeight}px`,
                  background: 'linear-gradient(180deg, #7c3aed, #a78bfa)',
                  borderRadius: '8px 8px 0 0',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingTop: '8px',
                  fontWeight: '700',
                  fontSize: '0.85em',
                  color: '#ffffff',
                  minHeight: '30px'
                }}>
                  {data.approved}
                </div>

                {data.notApproved > 0 && (
                  <div style={{
                    position: 'absolute',
                    bottom: `${approvedHeight + 50}px`,
                    left: 0,
                    right: 0,
                    height: `${notApprovedHeight}px`,
                    background: 'linear-gradient(180deg, #dc2626, #ef4444)',
                    borderRadius: '8px 8px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.8em',
                    color: '#ffffff',
                    minHeight: '25px'
                  }}>
                    {data.notApproved}
                  </div>
                )}

                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  fontSize: '0.9em',
                  fontWeight: '700',
                  color: '#475569'
                }}>
                  {data.month.substring(0, 3)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '2px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
              borderRadius: '4px'
            }}></div>
            <span style={{ fontSize: '0.9em', fontWeight: '600', color: '#475569' }}>Approved</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              background: 'linear-gradient(135deg, #dc2626, #ef4444)',
              borderRadius: '4px'
            }}></div>
            <span style={{ fontSize: '0.9em', fontWeight: '600', color: '#475569' }}>Not Approved</span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
      }}>
        <h3 style={{
          fontSize: '1.4em',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '20px'
        }}>
          📋 Monthly Data Table
        </h3>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.95em'
        }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{
                padding: '14px',
                textAlign: 'left',
                fontWeight: '700',
                color: '#1e293b',
                borderBottom: '2px solid #cbd5e1'
              }}>Month</th>
              <th style={{
                padding: '14px',
                textAlign: 'center',
                fontWeight: '700',
                color: '#8b5cf6',
                borderBottom: '2px solid #cbd5e1'
              }}>Approved</th>
              <th style={{
                padding: '14px',
                textAlign: 'center',
                fontWeight: '700',
                color: '#dc2626',
                borderBottom: '2px solid #cbd5e1'
              }}>Not Approved</th>
              <th style={{
                padding: '14px',
                textAlign: 'center',
                fontWeight: '700',
                color: '#8b5cf6',
                borderBottom: '2px solid #cbd5e1'
              }}>Total</th>
              <th style={{
                padding: '14px',
                textAlign: 'center',
                fontWeight: '700',
                color: '#d97706',
                borderBottom: '2px solid #cbd5e1'
              }}>Approval Rate</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((data, idx) => (
              <tr key={idx} style={{
                background: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#ede9fe'}
              onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? '#ffffff' : '#f8fafc'}>
                <td style={{
                  padding: '14px',
                  fontWeight: '600',
                  color: '#475569',
                  borderBottom: '1px solid #e2e8f0'
                }}>{data.month}</td>
                <td style={{
                  padding: '14px',
                  textAlign: 'center',
                  fontWeight: '700',
                  color: '#8b5cf6',
                  borderBottom: '1px solid #e2e8f0'
                }}>{data.approved}</td>
                <td style={{
                  padding: '14px',
                  textAlign: 'center',
                  fontWeight: '700',
                  color: '#dc2626',
                  borderBottom: '1px solid #e2e8f0'
                }}>{data.notApproved}</td>
                <td style={{
                  padding: '14px',
                  textAlign: 'center',
                  fontWeight: '700',
                  color: '#8b5cf6',
                  borderBottom: '1px solid #e2e8f0'
                }}>{data.total}</td>
                <td style={{
                  padding: '14px',
                  textAlign: 'center',
                  fontWeight: '700',
                  color: '#d97706',
                  borderBottom: '1px solid #e2e8f0'
                }}>{data.approvalRate}</td>
              </tr>
            ))}
            <tr style={{
              background: '#f1f5f9',
              fontWeight: '800'
            }}>
              <td style={{
                padding: '16px',
                fontWeight: '800',
                color: '#1e293b',
                borderTop: '3px solid #8b5cf6'
              }}>TOTAL</td>
              <td style={{
                padding: '16px',
                textAlign: 'center',
                fontWeight: '800',
                color: '#8b5cf6',
                borderTop: '3px solid #8b5cf6'
              }}>{totalApproved}</td>
              <td style={{
                padding: '16px',
                textAlign: 'center',
                fontWeight: '800',
                color: '#dc2626',
                borderTop: '3px solid #8b5cf6'
              }}>{totalNotApproved}</td>
              <td style={{
                padding: '16px',
                textAlign: 'center',
                fontWeight: '800',
                color: '#8b5cf6',
                borderTop: '3px solid #8b5cf6'
              }}>{totalQty}</td>
              <td style={{
                padding: '16px',
                textAlign: 'center',
                fontWeight: '800',
                color: '#d97706',
                borderTop: '3px solid #8b5cf6'
              }}>{overallApprovalRate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
