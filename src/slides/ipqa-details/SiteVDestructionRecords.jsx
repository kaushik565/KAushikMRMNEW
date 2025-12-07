// SITE-V Destruction Records Detailed Analysis

export default function SiteVDestructionRecords() {
  // Monthly data
  const monthlyData = [
    { month: 'July', records: 14, closed: 13, pending: 1, rate: 92.9, avgTime: '8.2 days' },
    { month: 'August', records: 11, closed: 10, pending: 1, rate: 90.9, avgTime: '7.8 days' },
    { month: 'September', records: 9, closed: 9, pending: 0, rate: 100.0, avgTime: '6.5 days' },
    { month: 'October', records: 10, closed: 10, pending: 0, rate: 100.0, avgTime: '5.8 days' },
    { month: 'November', records: 8, closed: 8, pending: 0, rate: 100.0, avgTime: '5.2 days' }
  ];

  // Material categories for destruction
  const materialCategories = [
    { category: 'Expired Raw Materials', count: 18, weight: '245 kg', percentage: 34.6, avgCost: '$2,450' },
    { category: 'Rejected Packaging', count: 14, weight: '89 kg', percentage: 26.9, avgCost: '$890' },
    { category: 'Failed QC Samples', count: 11, weight: '52 kg', percentage: 21.2, avgCost: '$1,240' },
    { category: 'Obsolete Products', count: 9, weight: '178 kg', percentage: 17.3, avgCost: '$3,560' }
  ];

  // Destruction methods
  const destructionMethods = [
    { method: 'Incineration', count: 24, percentage: 46.2, compliance: 100, vendor: 'EnviroSafe Inc.' },
    { method: 'Chemical Treatment', count: 15, percentage: 28.8, compliance: 100, vendor: 'ChemDestruct Ltd.' },
    { method: 'Physical Destruction', count: 8, percentage: 15.4, compliance: 100, vendor: 'SecureShred Co.' },
    { method: 'Landfill (Approved)', count: 5, percentage: 9.6, compliance: 100, vendor: 'EcoDispose LLC' }
  ];

  // Documentation checkpoints
  const checkpoints = [
    { point: 'Material Identification', completion: 100, issues: 0 },
    { point: 'Approval Signatures', completion: 100, issues: 0 },
    { point: 'Witness Documentation', completion: 98.1, issues: 1 },
    { point: 'Certificate of Destruction', completion: 100, issues: 0 },
    { point: 'Inventory Adjustment', completion: 96.2, issues: 2 }
  ];

  // Environmental compliance metrics
  const envCompliance = [
    { metric: 'EPA Compliance', status: 'Full', score: 100, lastAudit: 'Aug 2025' },
    { metric: 'Waste Manifest Accuracy', status: 'Excellent', score: 98.1, lastAudit: 'Sep 2025' },
    { metric: 'Vendor Certifications', status: 'Current', score: 100, lastAudit: 'Oct 2025' },
    { metric: 'Documentation Complete', status: 'Excellent', score: 98.1, lastAudit: 'Nov 2025' }
  ];

  return (
    <section style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      minHeight: '100vh',
      padding: '40px',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'inline-block',
          backgroundColor: '#0ea5e9',
          color: 'white',
          padding: '8px 20px',
          borderRadius: '20px',
          fontSize: '0.9em',
          fontWeight: '700',
          marginBottom: '12px'
        }}>
          SITE-V IPQA
        </div>
        <h1 style={{
          fontSize: '2.5em',
          fontWeight: '900',
          color: '#0369a1',
          marginBottom: '8px'
        }}>
          Destruction Records Analysis
        </h1>
        <p style={{ fontSize: '1.1em', color: '#64748b', fontWeight: '500' }}>
          Controlled material disposal with full regulatory compliance • Total: 52 destruction records
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '14px',
        marginBottom: '30px'
      }}>
        {[
          { label: 'Total Records', value: '52', icon: '🗑️', color: '#0ea5e9' },
          { label: 'Closed', value: '50', icon: '✓', color: '#22c55e' },
          { label: 'Pending', value: '2', icon: '⏳', color: '#f59e0b' },
          { label: 'Completion Rate', value: '96.2%', icon: '🎯', color: '#8b5cf6' },
          { label: 'Avg Processing', value: '6.7 days', icon: '⏱️', color: '#ef4444' }
        ].map((metric, idx) => (
          <div key={idx} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            border: `2px solid ${metric.color}30`,
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              backgroundColor: metric.color
            }}></div>
            <div style={{ fontSize: '1.8em', marginBottom: '6px' }}>{metric.icon}</div>
            <div style={{ fontSize: '0.8em', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>
              {metric.label}
            </div>
            <div style={{ fontSize: '1.5em', fontWeight: '800', color: metric.color }}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Monthly Trend */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
            📈 Monthly Processing Performance
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {monthlyData.map((data, idx) => (
              <div key={idx}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px'
                }}>
                  <span style={{ fontSize: '0.9em', fontWeight: '700', color: '#334155', minWidth: '100px' }}>
                    {data.month}
                  </span>
                  <span style={{ fontSize: '0.85em', fontWeight: '600', color: '#64748b' }}>
                    {data.records} records • {data.avgTime}
                  </span>
                  <span style={{
                    fontSize: '0.85em',
                    fontWeight: '700',
                    color: data.rate === 100 ? '#22c55e' : data.rate >= 95 ? '#f59e0b' : '#ef4444',
                    backgroundColor: data.rate === 100 ? '#dcfce7' : data.rate >= 95 ? '#fef3c7' : '#fee2e2',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}>
                    {data.rate}%
                  </span>
                </div>
                <div style={{
                  height: '24px',
                  backgroundColor: '#e0f2fe',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    width: `${(data.closed / data.records) * 100}%`,
                    height: '100%',
                    background: data.rate === 100 ? 'linear-gradient(90deg, #22c55e, #16a34a)' : 'linear-gradient(90deg, #f59e0b, #ea580c)',
                    borderRadius: data.pending === 0 ? '8px' : '8px 0 0 8px'
                  }}></div>
                  {data.pending > 0 && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      width: `${(data.pending / data.records) * 100}%`,
                      height: '100%',
                      backgroundColor: '#f59e0b',
                      borderRadius: '0 8px 8px 0'
                    }}></div>
                  )}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '8px',
                    transform: 'translateY(-50%)',
                    fontSize: '0.75em',
                    fontWeight: '700',
                    color: 'white'
                  }}>
                    ✓ {data.closed}
                  </div>
                  {data.pending > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      right: '8px',
                      transform: 'translateY(-50%)',
                      fontSize: '0.75em',
                      fontWeight: '700',
                      color: 'white'
                    }}>
                      ⏳ {data.pending}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#dcfce7',
            borderRadius: '8px',
            border: '1px solid #22c55e'
          }}>
            <div style={{ fontSize: '0.85em', fontWeight: '700', color: '#166534' }}>
              📊 Improvement: Processing time reduced 37% (8.2 → 5.2 days)
            </div>
          </div>
        </div>

        {/* Material Categories */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
            📦 Material Category Breakdown
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {materialCategories.map((cat, idx) => (
              <div key={idx} style={{
                padding: '14px',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '0.9em', fontWeight: '700', color: '#1e293b' }}>
                    {cat.category}
                  </span>
                  <span style={{
                    fontSize: '0.8em',
                    fontWeight: '700',
                    color: '#0ea5e9',
                    backgroundColor: '#e0f2fe',
                    padding: '3px 10px',
                    borderRadius: '6px'
                  }}>
                    {cat.count} items
                  </span>
                </div>
                <div style={{
                  height: '18px',
                  backgroundColor: '#e0f2fe',
                  borderRadius: '9px',
                  overflow: 'hidden',
                  marginBottom: '6px'
                }}>
                  <div style={{
                    width: `${cat.percentage}%`,
                    height: '100%',
                    backgroundColor: '#0ea5e9',
                    borderRadius: '9px'
                  }}></div>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75em',
                  color: '#64748b',
                  fontWeight: '600'
                }}>
                  <span>⚖️ {cat.weight}</span>
                  <span style={{ color: '#ef4444' }}>💰 {cat.avgCost}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: '12px',
            padding: '10px',
            backgroundColor: '#fef3c7',
            borderRadius: '8px',
            fontSize: '0.8em',
            fontWeight: '700',
            color: '#92400e',
            textAlign: 'center'
          }}>
            Total Material Weight: 564 kg
          </div>
        </div>
      </div>

      {/* Destruction Methods and Checkpoints Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Destruction Methods */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
            🔥 Destruction Methods & Vendors
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.8em', fontWeight: '700', color: '#475569' }}>
                  Method
                </th>
                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.8em', fontWeight: '700', color: '#475569' }}>
                  Count
                </th>
                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.8em', fontWeight: '700', color: '#475569' }}>
                  %
                </th>
                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.8em', fontWeight: '700', color: '#475569' }}>
                  Compliance
                </th>
              </tr>
            </thead>
            <tbody>
              {destructionMethods.map((method, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontSize: '0.85em', fontWeight: '700', color: '#1e293b' }}>
                      {method.method}
                    </div>
                    <div style={{ fontSize: '0.7em', color: '#64748b', fontWeight: '600' }}>
                      {method.vendor}
                    </div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: '0.9em', fontWeight: '700', color: '#0ea5e9' }}>
                    {method.count}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: '0.85em', fontWeight: '600', color: '#64748b' }}>
                    {method.percentage}%
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '0.8em',
                      fontWeight: '700',
                      color: '#22c55e',
                      backgroundColor: '#dcfce7',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      {method.compliance}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Documentation Checkpoints */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
            ✓ Documentation Checkpoints
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            {checkpoints.map((cp, idx) => (
              <div key={idx} style={{
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px'
                }}>
                  <span style={{ fontSize: '0.85em', fontWeight: '700', color: '#1e293b' }}>
                    {cp.point}
                  </span>
                  <span style={{
                    fontSize: '0.8em',
                    fontWeight: '700',
                    color: cp.completion === 100 ? '#22c55e' : '#f59e0b',
                    backgroundColor: cp.completion === 100 ? '#dcfce7' : '#fef3c7',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    {cp.completion}%
                  </span>
                </div>
                <div style={{
                  height: '12px',
                  backgroundColor: '#e0f2fe',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${cp.completion}%`,
                    height: '100%',
                    backgroundColor: cp.completion === 100 ? '#22c55e' : '#f59e0b',
                    borderRadius: '6px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '12px',
            backgroundColor: '#e0f2fe',
            borderRadius: '8px',
            border: '2px solid #0ea5e9'
          }}>
            <h4 style={{ fontSize: '0.9em', fontWeight: '800', color: '#0369a1', marginBottom: '8px' }}>
              🌍 Environmental Compliance
            </h4>
            {envCompliance.map((env, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75em',
                color: '#0c4a6e',
                fontWeight: '600',
                marginBottom: '4px'
              }}>
                <span>{env.metric}</span>
                <span style={{ color: '#22c55e' }}>{env.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights Footer */}
      <div style={{
        padding: '20px',
        backgroundColor: '#dcfce7',
        borderRadius: '12px',
        border: '2px solid #22c55e'
      }}>
        <h4 style={{ fontSize: '1.1em', fontWeight: '800', color: '#166534', marginBottom: '10px' }}>
          ✨ Key Performance Highlights
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#15803d', fontWeight: '600' }}>
          <li>96.2% completion rate with only 2 pending records demonstrates efficient processing</li>
          <li>Processing time improved 37% from 8.2 to 5.2 days average</li>
          <li>100% environmental compliance maintained across all destruction methods</li>
          <li>Last 3 months achieved 100% record closure rate (September-November)</li>
          <li>Incineration method handles 46.2% of all destruction activities</li>
          <li>Total material destroyed: 564 kg with proper documentation and tracking</li>
        </ul>
      </div>
    </section>
  );
}
