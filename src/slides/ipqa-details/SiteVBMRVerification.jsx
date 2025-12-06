// SITE-V BMR Verification Detailed Analysis

export default function SiteVBMRVerification() {
  // Monthly BMR verification data
  const monthlyData = [
    { month: 'July', bmrs: 125, verified: 122, issues: 3, rate: 97.6, avgTime: '2.8 hrs' },
    { month: 'August', bmrs: 132, verified: 130, issues: 2, rate: 98.5, avgTime: '2.6 hrs' },
    { month: 'September', bmrs: 128, verified: 127, issues: 1, rate: 99.2, avgTime: '2.4 hrs' },
    { month: 'October', bmrs: 134, verified: 133, issues: 1, rate: 99.3, avgTime: '2.3 hrs' },
    { month: 'November', bmrs: 124, verified: 123, issues: 1, rate: 99.2, avgTime: '2.2 hrs' }
  ];

  // Issue categories breakdown
  const issueCategories = [
    { category: 'Missing Signatures', count: 3, percentage: 37.5, severity: 'Critical' },
    { category: 'Incomplete Data Entry', count: 2, percentage: 25.0, severity: 'Major' },
    { category: 'Documentation Errors', count: 2, percentage: 25.0, severity: 'Major' },
    { category: 'Calculation Mistakes', count: 1, percentage: 12.5, severity: 'Minor' }
  ];

  // Product category verification
  const productCategories = [
    { product: 'Tablets', bmrs: 245, verified: 243, rate: 99.2, batches: 156 },
    { product: 'Capsules', bmrs: 178, verified: 177, rate: 99.4, batches: 112 },
    { product: 'Injectables', bmrs: 124, verified: 122, rate: 98.4, batches: 78 },
    { product: 'Liquids', bmrs: 96, verified: 95, rate: 98.9, batches: 62 }
  ];

  // Verification checkpoints
  const checkpoints = [
    { checkpoint: 'Material Reconciliation', checks: 643, passed: 639, compliance: 99.4 },
    { checkpoint: 'Equipment Logs', checks: 643, passed: 636, compliance: 98.9 },
    { checkpoint: 'Critical Process Parameters', checks: 643, passed: 641, compliance: 99.7 },
    { checkpoint: 'Environmental Monitoring', checks: 643, passed: 638, compliance: 99.2 },
    { checkpoint: 'Deviation Recording', checks: 643, passed: 635, compliance: 98.8 }
  ];

  const maxBmrs = Math.max(...monthlyData.map(d => d.bmrs));

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
          Batch Manufacturing Record (BMR) Verification
        </h1>
        <p style={{ fontSize: '1.1em', color: '#64748b', fontWeight: '500' }}>
          Ensuring accuracy and completeness of batch documentation • Total: 643 BMRs verified
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
          { label: 'Total BMRs', value: '643', icon: '📋', color: '#0ea5e9' },
          { label: 'Verified', value: '635', icon: '✓', color: '#22c55e' },
          { label: 'Issues Found', value: '8', icon: '⚠️', color: '#ef4444' },
          { label: 'Verification Rate', value: '98.8%', icon: '🎯', color: '#8b5cf6' },
          { label: 'Avg Time', value: '2.5 hrs', icon: '⏱️', color: '#f59e0b' }
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
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Monthly Trend */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
            📈 Monthly Verification Performance
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
                    {data.bmrs} BMRs • {data.avgTime}
                  </span>
                  <span style={{
                    fontSize: '0.85em',
                    fontWeight: '700',
                    color: data.rate >= 99 ? '#22c55e' : data.rate >= 98 ? '#f59e0b' : '#ef4444',
                    backgroundColor: data.rate >= 99 ? '#dcfce7' : data.rate >= 98 ? '#fef3c7' : '#fee2e2',
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
                    width: `${(data.verified / data.bmrs) * 100}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, #22c55e, #16a34a)`,
                    borderRadius: '8px 0 0 8px'
                  }}></div>
                  {data.issues > 0 && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      width: `${(data.issues / data.bmrs) * 100}%`,
                      height: '100%',
                      backgroundColor: '#ef4444',
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
                    ✓ {data.verified}/{data.bmrs}
                  </div>
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
              📊 Trend: Average verification time improved by 21% (2.8hrs → 2.2hrs)
            </div>
          </div>
        </div>

        {/* Issue Categories */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
            🔍 Issue Categories
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {issueCategories.map((issue, idx) => (
              <div key={idx} style={{
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px'
                }}>
                  <span style={{ fontSize: '0.85em', fontWeight: '700', color: '#1e293b' }}>
                    {issue.category}
                  </span>
                  <span style={{
                    fontSize: '0.75em',
                    fontWeight: '700',
                    color: issue.severity === 'Critical' ? '#dc2626' : issue.severity === 'Major' ? '#f59e0b' : '#22c55e',
                    backgroundColor: issue.severity === 'Critical' ? '#fee2e2' : issue.severity === 'Major' ? '#fef3c7' : '#dcfce7',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    {issue.severity}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    flex: 1,
                    height: '16px',
                    backgroundColor: '#e0f2fe',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${issue.percentage}%`,
                      height: '100%',
                      backgroundColor: '#ef4444',
                      borderRadius: '8px'
                    }}></div>
                  </div>
                  <span style={{ fontSize: '0.85em', fontWeight: '700', color: '#0ea5e9', minWidth: '35px' }}>
                    {issue.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: '12px',
            fontSize: '0.75em',
            color: '#64748b',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            Total Issues: 8 across 643 BMRs (1.2% error rate)
          </div>
        </div>
      </div>

      {/* Product Categories and Checkpoints Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Product Categories */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
            💊 Product Category Verification
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.8em', fontWeight: '700', color: '#475569' }}>
                  Product
                </th>
                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.8em', fontWeight: '700', color: '#475569' }}>
                  BMRs
                </th>
                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.8em', fontWeight: '700', color: '#475569' }}>
                  Verified
                </th>
                <th style={{ padding: '10px', textAlign: 'center', fontSize: '0.8em', fontWeight: '700', color: '#475569' }}>
                  Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {productCategories.map((prod, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                  <td style={{ padding: '12px', fontSize: '0.85em', fontWeight: '600', color: '#1e293b' }}>
                    {prod.product}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: '0.85em', fontWeight: '700', color: '#0ea5e9' }}>
                    {prod.bmrs}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: '0.85em', fontWeight: '600', color: '#64748b' }}>
                    {prod.verified}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '0.8em',
                      fontWeight: '700',
                      color: prod.rate >= 99 ? '#22c55e' : '#f59e0b',
                      backgroundColor: prod.rate >= 99 ? '#dcfce7' : '#fef3c7',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      {prod.rate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Verification Checkpoints */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
            ✓ Critical Verification Checkpoints
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {checkpoints.map((cp, idx) => (
              <div key={idx} style={{
                padding: '10px',
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
                    {cp.checkpoint}
                  </span>
                  <span style={{
                    fontSize: '0.8em',
                    fontWeight: '700',
                    color: cp.compliance >= 99 ? '#22c55e' : '#f59e0b',
                    backgroundColor: cp.compliance >= 99 ? '#dcfce7' : '#fef3c7',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    {cp.compliance}%
                  </span>
                </div>
                <div style={{
                  height: '12px',
                  backgroundColor: '#e0f2fe',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${cp.compliance}%`,
                    height: '100%',
                    backgroundColor: '#22c55e',
                    borderRadius: '6px'
                  }}></div>
                </div>
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
          ✨ Key Insights & Improvements
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#15803d', fontWeight: '600' }}>
          <li>98.8% verification rate demonstrates excellent documentation quality</li>
          <li>Verification turnaround time improved 21% (2.8hrs → 2.2hrs)</li>
          <li>Critical Process Parameters checkpoint maintains highest compliance at 99.7%</li>
          <li>Missing signatures reduced from 3 to 0 cases in recent months</li>
          <li>Tablets category leads with 245 BMRs verified (38% of total volume)</li>
        </ul>
      </div>
    </section>
  );
}
