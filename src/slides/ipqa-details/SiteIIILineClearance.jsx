// SITE-III Line Clearance Detail View
export default function SiteIIILineClearance() {
  const monthlyData = [
    { month: 'July', approved: 670, notApproved: 0, total: 670, approvalRate: '100.00%' },
    { month: 'August', approved: 690, notApproved: 11, total: 701, approvalRate: '98.43%' },
    { month: 'September', approved: 338, notApproved: 6, total: 344, approvalRate: '98.26%' },
    { month: 'October', approved: 249, notApproved: 4, total: 253, approvalRate: '98.42%' },
    { month: 'November', approved: 517, notApproved: 8, total: 525, approvalRate: '98.48%' }
  ];

  const totalApproved = 2464;
  const totalNotApproved = 29;
  const totalQty = 2493;
  const overallApprovalRate = '98.84%';

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
          <span>📋</span> Line Clearance - SITE-III
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
          <span style={{ WebkitTextFillColor: '#8b5cf6' }}>📊</span> Monthly Clearance Trend
        </h3>

        <div style={{ position: 'relative', height: '380px', paddingTop: '20px' }}>
          {monthlyData.map((data, idx) => {
            const chartHeight = 300;
            const approvedHeight = (data.approved / maxValue) * chartHeight;
            const notApprovedHeight = (data.notApproved / maxValue) * chartHeight;
            const approvalPercent = ((data.approved / data.total) * 100).toFixed(1);

            return (
              <div key={idx} style={{
                display: 'inline-block',
                width: '18%',
                marginRight: idx < monthlyData.length - 1 ? '2.5%' : '0',
                verticalAlign: 'bottom',
                height: '100%',
                position: 'relative'
              }}>
                {/* Approved Bar */}
                <div style={{
                  position: 'absolute',
                  bottom: '60px',
                  left: 0,
                  right: 0,
                  height: `${approvedHeight}px`,
                  background: 'linear-gradient(180deg, #10b981, #059669)',
                  borderRadius: '12px 12px 0 0',
                  transition: 'all 0.4s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingTop: '10px',
                  fontWeight: '800',
                  fontSize: '0.9em',
                  color: '#ffffff',
                  minHeight: '40px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  animation: `growUp${idx} 1s ease-out`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scaleY(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scaleY(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                }}>
                  <div style={{ fontSize: '1.1em' }}>{data.approved}</div>
                  <div style={{ fontSize: '0.7em', opacity: '0.9', marginTop: '4px' }}>{approvalPercent}%</div>
                </div>

                {/* Not Approved Bar */}
                {data.notApproved > 0 && (
                  <div style={{
                    position: 'absolute',
                    bottom: `${approvedHeight + 60}px`,
                    left: 0,
                    right: 0,
                    height: `${notApprovedHeight}px`,
                    background: 'linear-gradient(180deg, #ef4444, #dc2626)',
                    borderRadius: '12px 12px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.85em',
                    color: '#ffffff',
                    minHeight: '30px',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                    animation: `growUp${idx} 1s ease-out ${idx * 0.1}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scaleY(1.1)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scaleY(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
                  }}>
                    {data.notApproved}
                  </div>
                )}

                {/* Month Label */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  fontSize: '0.95em',
                  fontWeight: '800',
                  color: '#475569',
                  background: '#f1f5f9',
                  padding: '8px 4px',
                  borderRadius: '8px',
                  border: '2px solid #e2e8f0'
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
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '3px solid #ede9fe'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
            }}></div>
            <span style={{ fontSize: '0.95em', fontWeight: '700', color: '#475569' }}>Approved</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
            }}></div>
            <span style={{ fontSize: '0.95em', fontWeight: '700', color: '#475569' }}>Not Approved</span>
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

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.95em'
          }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)' }}>
                <th style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontWeight: '800',
                  color: '#1e293b',
                  borderBottom: '3px solid #8b5cf6',
                  fontSize: '1em'
                }}>Month</th>
                <th style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontWeight: '800',
                  color: '#10b981',
                  borderBottom: '3px solid #8b5cf6',
                  fontSize: '1em'
                }}>✓ Approved</th>
                <th style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontWeight: '800',
                  color: '#ef4444',
                  borderBottom: '3px solid #8b5cf6',
                  fontSize: '1em'
                }}>✗ Not Approved</th>
                <th style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontWeight: '800',
                  color: '#8b5cf6',
                  borderBottom: '3px solid #8b5cf6',
                  fontSize: '1em'
                }}>📊 Total</th>
                <th style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontWeight: '800',
                  color: '#d97706',
                  borderBottom: '3px solid #8b5cf6',
                  fontSize: '1em'
                }}>📈 Rate</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, idx) => (
                <tr key={idx} style={{
                  background: idx % 2 === 0 ? '#ffffff' : '#faf5ff',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #ede9fe, #f5f3ff)';
                  e.currentTarget.style.transform = 'scale(1.01)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = idx % 2 === 0 ? '#ffffff' : '#faf5ff';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <td style={{
                    padding: '16px',
                    fontWeight: '700',
                    color: '#475569',
                    borderBottom: '2px solid #f1f5f9'
                  }}>{data.month}</td>
                  <td style={{
                    padding: '16px',
                    textAlign: 'center',
                    fontWeight: '800',
                    color: '#10b981',
                    borderBottom: '2px solid #f1f5f9',
                    fontSize: '1.05em'
                  }}>{data.approved}</td>
                  <td style={{
                    padding: '16px',
                    textAlign: 'center',
                    fontWeight: '800',
                    color: '#ef4444',
                    borderBottom: '2px solid #f1f5f9',
                    fontSize: '1.05em'
                  }}>{data.notApproved}</td>
                  <td style={{
                    padding: '16px',
                    textAlign: 'center',
                    fontWeight: '800',
                    color: '#8b5cf6',
                    borderBottom: '2px solid #f1f5f9',
                    fontSize: '1.05em'
                  }}>{data.total}</td>
                  <td style={{
                    padding: '16px',
                    textAlign: 'center',
                    fontWeight: '800',
                    color: '#d97706',
                    borderBottom: '2px solid #f1f5f9',
                    fontSize: '1.05em'
                  }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '2px solid #fcd34d'
                    }}>{data.approvalRate}</span>
                  </td>
                </tr>
              ))}
              <tr style={{
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                fontWeight: '900',
                color: '#ffffff'
              }}>
                <td style={{
                  padding: '18px',
                  fontWeight: '900',
                  borderTop: '4px solid #6d28d9',
                  fontSize: '1.1em'
                }}>TOTAL</td>
                <td style={{
                  padding: '18px',
                  textAlign: 'center',
                  fontWeight: '900',
                  borderTop: '4px solid #6d28d9',
                  fontSize: '1.2em'
                }}>{totalApproved}</td>
                <td style={{
                  padding: '18px',
                  textAlign: 'center',
                  fontWeight: '900',
                  borderTop: '4px solid #6d28d9',
                  fontSize: '1.2em'
                }}>{totalNotApproved}</td>
                <td style={{
                  padding: '18px',
                  textAlign: 'center',
                  fontWeight: '900',
                  borderTop: '4px solid #6d28d9',
                  fontSize: '1.2em'
                }}>{totalQty}</td>
                <td style={{
                  padding: '18px',
                  textAlign: 'center',
                  fontWeight: '900',
                  borderTop: '4px solid #6d28d9',
                  fontSize: '1.2em'
                }}>
                  <span style={{
                    background: '#fde68a',
                    color: '#92400e',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: '2px solid #fcd34d'
                  }}>{overallApprovalRate}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
