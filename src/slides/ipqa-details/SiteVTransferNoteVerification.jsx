// SITE-V Transfer Note Verification Detailed Analysis

export default function SiteVTransferNoteVerification() {
  // Monthly data
  const monthlyData = [
    { month: 'July', notes: 109, verified: 107, issues: 2, rate: 98.2, avgTime: '1.8 hrs' },
    { month: 'August', notes: 118, verified: 117, issues: 1, rate: 99.2, avgTime: '1.6 hrs' },
    { month: 'September', notes: 112, verified: 111, issues: 1, rate: 99.1, avgTime: '1.5 hrs' },
    { month: 'October', notes: 115, verified: 114, issues: 1, rate: 99.1, avgTime: '1.4 hrs' },
    { month: 'November', notes: 112, verified: 112, issues: 0, rate: 100.0, avgTime: '1.3 hrs' }
  ];

  // Transfer types
  const transferTypes = [
    { type: 'Raw Material to Production', count: 198, verified: 197, percentage: 35.0, avgTime: '1.2 hrs' },
    { type: 'In-Process to Next Stage', count: 165, verified: 164, percentage: 29.2, avgTime: '1.4 hrs' },
    { type: 'Finished Goods to Warehouse', count: 123, verified: 123, percentage: 21.7, avgTime: '1.6 hrs' },
    { type: 'Between Production Areas', count: 80, verified: 79, percentage: 14.1, avgTime: '1.8 hrs' }
  ];

  // Verification checkpoints
  const checkpoints = [
    { point: 'Material Identification', checks: 566, passed: 565, compliance: 99.8, issues: 1 },
    { point: 'Quantity Verification', checks: 566, passed: 564, compliance: 99.6, issues: 2 },
    { point: 'Container Integrity', checks: 566, passed: 566, compliance: 100.0, issues: 0 },
    { point: 'Authorization Signatures', checks: 566, passed: 563, compliance: 99.5, issues: 3 },
    { point: 'Chain of Custody', checks: 566, passed: 565, compliance: 99.8, issues: 1 }
  ];

  // Issue breakdown
  const issues = [
    { issue: 'Missing Signatures', count: 3, resolved: 3, avgResolutionTime: '2.4 hrs' },
    { issue: 'Quantity Discrepancy', count: 2, resolved: 2, avgResolutionTime: '4.1 hrs' },
    { issue: 'Incomplete Documentation', count: 1, resolved: 1, avgResolutionTime: '1.8 hrs' },
    { issue: 'Labeling Error', count: 1, resolved: 1, avgResolutionTime: '2.2 hrs' }
  ];

  const maxNotes = Math.max(...monthlyData.map(d => d.notes));

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
          Transfer Note Verification Analysis
        </h1>
        <p style={{ fontSize: '1.1em', color: '#64748b', fontWeight: '500' }}>
          Ensuring accurate material transfers and chain of custody • Total: 566 transfer notes verified
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
          { label: 'Total Notes', value: '566', icon: '📄', color: '#0ea5e9' },
          { label: 'Verified', value: '561', icon: '✓', color: '#22c55e' },
          { label: 'Issues', value: '7', icon: '⚠️', color: '#ef4444' },
          { label: 'Compliance', value: '99.1%', icon: '🎯', color: '#8b5cf6' },
          { label: 'Avg Time', value: '1.5 hrs', icon: '⏱️', color: '#f59e0b' }
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
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '20px', marginBottom: '20px' }}>
        
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
                    {data.notes} notes • {data.avgTime}
                  </span>
                  <span style={{
                    fontSize: '0.85em',
                    fontWeight: '700',
                    color: data.rate === 100 ? '#22c55e' : data.rate >= 99 ? '#f59e0b' : '#ef4444',
                    backgroundColor: data.rate === 100 ? '#dcfce7' : data.rate >= 99 ? '#fef3c7' : '#fee2e2',
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
                    width: `${(data.verified / data.notes) * 100}%`,
                    height: '100%',
                    background: data.issues === 0 ? 'linear-gradient(90deg, #22c55e, #16a34a)' : 'linear-gradient(90deg, #f59e0b, #ea580c)',
                    borderRadius: data.issues === 0 ? '8px' : '8px 0 0 8px'
                  }}></div>
                  {data.issues > 0 && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      width: `${(data.issues / data.notes) * 100}%`,
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
                    {data.verified}/{data.notes}
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
              🎉 Achievement: November recorded 100% verification rate with zero issues!
            </div>
          </div>
        </div>

        {/* Issue Details */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
            🔍 Issues & Resolution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {issues.map((issue, idx) => (
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
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '0.85em', fontWeight: '700', color: '#1e293b' }}>
                    {issue.issue}
                  </span>
                  <span style={{
                    fontSize: '0.75em',
                    fontWeight: '700',
                    color: '#22c55e',
                    backgroundColor: '#dcfce7',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    {issue.count} cases
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75em',
                  color: '#64748b',
                  fontWeight: '600'
                }}>
                  <span>✓ {issue.resolved} resolved</span>
                  <span>⏱️ {issue.avgResolutionTime}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: '12px',
            padding: '10px',
            backgroundColor: '#dcfce7',
            borderRadius: '8px',
            fontSize: '0.8em',
            fontWeight: '700',
            color: '#166534',
            textAlign: 'center'
          }}>
            100% Issue Resolution Rate
          </div>
        </div>
      </div>

      {/* Transfer Types and Checkpoints Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Transfer Types */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
            🔄 Transfer Type Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {transferTypes.map((transfer, idx) => (
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
                    {transfer.type}
                  </span>
                  <span style={{
                    fontSize: '0.8em',
                    fontWeight: '700',
                    color: '#0ea5e9',
                    backgroundColor: '#e0f2fe',
                    padding: '3px 10px',
                    borderRadius: '6px'
                  }}>
                    {transfer.count}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '6px'
                }}>
                  <div style={{
                    flex: 1,
                    height: '18px',
                    backgroundColor: '#e0f2fe',
                    borderRadius: '9px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${transfer.percentage}%`,
                      height: '100%',
                      backgroundColor: '#0ea5e9',
                      borderRadius: '9px'
                    }}></div>
                  </div>
                  <span style={{ fontSize: '0.85em', fontWeight: '700', color: '#475569', minWidth: '45px' }}>
                    {transfer.percentage}%
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75em',
                  color: '#64748b',
                  fontWeight: '600'
                }}>
                  <span>✓ {transfer.verified} verified</span>
                  <span>⏱️ Avg: {transfer.avgTime}</span>
                </div>
              </div>
            ))}
          </div>
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
            ✓ Critical Checkpoints
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                    color: cp.compliance === 100 ? '#22c55e' : '#f59e0b',
                    backgroundColor: cp.compliance === 100 ? '#dcfce7' : '#fef3c7',
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
                  overflow: 'hidden',
                  marginBottom: '4px'
                }}>
                  <div style={{
                    width: `${cp.compliance}%`,
                    height: '100%',
                    backgroundColor: cp.compliance === 100 ? '#22c55e' : '#f59e0b',
                    borderRadius: '6px'
                  }}></div>
                </div>
                <div style={{ fontSize: '0.7em', color: '#64748b', fontWeight: '600', textAlign: 'right' }}>
                  {cp.passed}/{cp.checks} passed • {cp.issues} issues
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
          ✨ Key Performance Highlights
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#15803d', fontWeight: '600' }}>
          <li>99.1% overall verification compliance demonstrates excellent material control</li>
          <li>November achieved perfect 100% verification rate with zero issues</li>
          <li>Container Integrity maintained 100% compliance across all 566 transfers</li>
          <li>Average verification time improved 28% (1.8hrs → 1.3hrs)</li>
          <li>Raw Material to Production represents 35% of all transfer activities</li>
          <li>100% issue resolution rate with average resolution time of 2.6 hours</li>
        </ul>
      </div>
    </section>
  );
}
