// SITE-III Line Reverification Detail View
export default function SiteIIILineReverification() {
  const monthlyData = [
    { month: 'July', approved: 515, notApproved: 0, total: 515, approvalRate: '100.00%' },
    { month: 'August', approved: 993, notApproved: 12, total: 1005, approvalRate: '98.81%' },
    { month: 'September', approved: 975, notApproved: 6, total: 981, approvalRate: '99.39%' },
    { month: 'October', approved: 883, notApproved: 7, total: 890, approvalRate: '99.21%' },
    { month: 'November', approved: 1055, notApproved: 9, total: 1064, approvalRate: '99.15%' }
  ];

  const totalApproved = 4421;
  const totalNotApproved = 34;
  const totalQty = 4455;
  const overallApprovalRate = '99.24%';

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
          <span>🔄</span> Line Reverification - SITE-III
        </h2>
        <p style={{ fontSize: '1em', color: '#64748b', margin: 0 }}>
          Monthly Trend Analysis (July - November 2024)
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
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 8px 24px rgba(139, 92, 246, 0.12)',
        border: '2px solid #ede9fe'
      }}>
        <h3 style={{
          fontSize: '1.5em',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ WebkitTextFillColor: '#8b5cf6' }}>📊</span> Monthly Reverification Trend
        </h3>
  <div style={{ position: 'relative', height: '300px', paddingTop: '20px' }}>
          {monthlyData.map((data, idx) => {
            const chartHeight = 300;
            const approvalPercent = ((data.approved / data.total) * 100).toFixed(1);
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
                  bottom: '60px',
                  left: 0,
                  right: 0,
                  height: `${approvedHeight}px`,
                  background: 'linear-gradient(180deg, #f97316, #ea580c)',
                  borderRadius: '12px 12px 0 0',
                                    flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: '8px',
                  fontWeight: '700',
                  fontSize: '0.9em',
                  color: '#ffffff',
                  minHeight: '40px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scaleY(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(249, 115, 22, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scaleY(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.3)';
                }}>
                  <div style={{ fontSize: '1.1em', marginBottom: '4px' }}>{data.approved}</div>
                  <div style={{ fontSize: '0.8em', opacity: '0.9' }}>{approvalPercent}%</div>
                </div>

                {data.notApproved > 0 && (
                  <div style={{
                    position: 'absolute',
                    bottom: `${approvedHeight + 60}px`,
                    left: 0,
                    right: 0,
                    height: `${notApprovedHeight}px`,
                    background: 'linear-gradient(180deg, #dc2626, #ef4444)',
                    borderRadius: '12px 12px 0 0',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.8em',
                    color: '#ffffff',
                    minHeight: '25px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scaleY(1.1)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scaleY(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
                  }}>
                    {data.notApproved}
                  </div>
                )}

                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  fontSize: '0.85em',
                  fontWeight: '800',
                  color: '#64748b',
                  background: '#f8fafc',
                  padding: '6px 4px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  margin: '0 4px'
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
          gap: '32px',
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '2px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(249, 115, 22, 0.3)'
            }}></div>
            <span style={{ fontSize: '0.9em', fontWeight: '600', color: '#475569' }}>Approved</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              background: 'linear-gradient(135deg, #dc2626, #ef4444)',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
            }}></div>
            <span style={{ fontSize: '0.9em', fontWeight: '600', color: '#475569' }}>Not Approved</span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 8px 24px rgba(139, 92, 246, 0.12)',
        border: '2px solid #ede9fe'
      }}>
        <h3 style={{
          fontSize: '1.5em',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ WebkitTextFillColor: '#8b5cf6' }}>📋</span> Monthly Data Table
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
                color: '#b45309',
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
                  color: '#b45309',
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
                color: '#b45309',
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
