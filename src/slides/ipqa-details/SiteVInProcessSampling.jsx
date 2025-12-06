// SITE-V In-Process Sampling Detailed Analysis

export default function SiteVInProcessSampling() {
  // Monthly data
  const monthlyData = [
    { month: 'July', samples: 598, conforming: 587, nonConforming: 11, rate: 98.2 },
    { month: 'August', samples: 612, conforming: 603, nonConforming: 9, rate: 98.5 },
    { month: 'September', samples: 634, conforming: 626, nonConforming: 8, rate: 98.7 },
    { month: 'October', samples: 589, conforming: 582, nonConforming: 7, rate: 98.8 },
    { month: 'November', samples: 624, conforming: 618, nonConforming: 6, rate: 99.0 }
  ];

  // Process stage breakdown
  const processStages = [
    { stage: 'Weighing & Dispensing', samples: 842, percentage: 27.5, avgTime: '1.2 hrs', issues: 8 },
    { stage: 'Mixing & Granulation', samples: 678, percentage: 22.2, avgTime: '2.1 hrs', issues: 12 },
    { stage: 'Compression/Encapsulation', samples: 589, percentage: 19.3, avgTime: '1.8 hrs', issues: 6 },
    { stage: 'Coating & Drying', samples: 512, percentage: 16.7, avgTime: '2.4 hrs', issues: 9 },
    { stage: 'Packaging & Labeling', samples: 436, percentage: 14.3, avgTime: '1.5 hrs', issues: 4 }
  ];

  // Critical parameters monitored
  const criticalParams = [
    { parameter: 'Blend Uniformity', tests: 428, outOfSpec: 3, compliance: 99.3, trend: '+2.1%' },
    { parameter: 'Tablet Weight', tests: 892, outOfSpec: 8, compliance: 99.1, trend: '+1.8%' },
    { parameter: 'Hardness', tests: 756, outOfSpec: 12, compliance: 98.4, trend: '+0.9%' },
    { parameter: 'Dissolution', tests: 524, outOfSpec: 6, compliance: 98.9, trend: '+1.5%' },
    { parameter: 'Content Uniformity', tests: 457, outOfSpec: 4, compliance: 99.1, trend: '+2.3%' }
  ];

  const maxSamples = Math.max(...monthlyData.map(d => d.samples));
  const maxStageCount = Math.max(...processStages.map(s => s.samples));

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
          In-Process Sampling Analysis
        </h1>
        <p style={{ fontSize: '1.1em', color: '#64748b', fontWeight: '500' }}>
          Comprehensive monitoring of manufacturing process controls • Total: 3,057 samples
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
          { label: 'Total Samples', value: '3,057', icon: '📊', color: '#0ea5e9' },
          { label: 'Conforming', value: '3,016', icon: '✓', color: '#22c55e' },
          { label: 'Non-Conforming', value: '41', icon: '⚠️', color: '#ef4444' },
          { label: 'Conformance Rate', value: '98.7%', icon: '🎯', color: '#8b5cf6' },
          { label: 'Growth vs Prev', value: '+18%', icon: '📈', color: '#f59e0b' }
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
            📈 Monthly Sampling Volume & Quality
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
                    {data.samples} tests
                  </span>
                  <span style={{
                    fontSize: '0.85em',
                    fontWeight: '700',
                    color: data.rate >= 98.5 ? '#22c55e' : '#f59e0b',
                    backgroundColor: data.rate >= 98.5 ? '#dcfce7' : '#fef3c7',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}>
                    {data.rate}% pass
                  </span>
                </div>
                <div style={{
                  height: '26px',
                  backgroundColor: '#e0f2fe',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    width: `${(data.conforming / data.samples) * 100}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, #22c55e, #16a34a)`,
                    borderRadius: '8px 0 0 8px'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: `${(data.nonConforming / data.samples) * 100}%`,
                    height: '100%',
                    backgroundColor: '#ef4444',
                    borderRadius: '0 8px 8px 0'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '8px',
                    transform: 'translateY(-50%)',
                    fontSize: '0.75em',
                    fontWeight: '700',
                    color: 'white'
                  }}>
                    ✓ {data.conforming}
                  </div>
                  {data.nonConforming > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      right: '8px',
                      transform: 'translateY(-50%)',
                      fontSize: '0.75em',
                      fontWeight: '700',
                      color: 'white'
                    }}>
                      ✗ {data.nonConforming}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Stage Distribution */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
            ⚙️ Process Stage Breakdown
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {processStages.map((stage, idx) => (
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
                    {stage.stage}
                  </span>
                  <span style={{
                    fontSize: '0.8em',
                    fontWeight: '700',
                    color: '#0ea5e9',
                    backgroundColor: '#e0f2fe',
                    padding: '3px 10px',
                    borderRadius: '6px'
                  }}>
                    {stage.samples} samples
                  </span>
                </div>
                <div style={{
                  height: '20px',
                  backgroundColor: '#e0f2fe',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '6px'
                }}>
                  <div style={{
                    width: `${(stage.samples / maxStageCount) * 100}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, #0ea5e9, #0284c7)`,
                    borderRadius: '10px',
                    transition: 'width 1s ease'
                  }}></div>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75em',
                  color: '#64748b',
                  fontWeight: '600'
                }}>
                  <span>Avg Time: {stage.avgTime}</span>
                  <span style={{
                    color: stage.issues < 5 ? '#22c55e' : stage.issues < 10 ? '#f59e0b' : '#ef4444'
                  }}>
                    {stage.issues} issues
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Parameters Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '2px solid #e2e8f0',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
          🔬 Critical Quality Parameters Monitoring
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.85em', fontWeight: '700', color: '#475569' }}>
                Parameter
              </th>
              <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.85em', fontWeight: '700', color: '#475569' }}>
                Tests Conducted
              </th>
              <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.85em', fontWeight: '700', color: '#475569' }}>
                Out of Spec
              </th>
              <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.85em', fontWeight: '700', color: '#475569' }}>
                Compliance %
              </th>
              <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.85em', fontWeight: '700', color: '#475569' }}>
                Trend
              </th>
              <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.85em', fontWeight: '700', color: '#475569' }}>
                Quality Bar
              </th>
            </tr>
          </thead>
          <tbody>
            {criticalParams.map((param, idx) => (
              <tr key={idx} style={{
                borderBottom: '1px solid #e2e8f0',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                <td style={{ padding: '14px', fontSize: '0.9em', fontWeight: '600', color: '#1e293b' }}>
                  {param.parameter}
                </td>
                <td style={{ padding: '14px', textAlign: 'center', fontSize: '0.9em', fontWeight: '700', color: '#0ea5e9' }}>
                  {param.tests}
                </td>
                <td style={{ padding: '14px', textAlign: 'center' }}>
                  <span style={{
                    fontSize: '0.85em',
                    fontWeight: '700',
                    color: param.outOfSpec < 5 ? '#22c55e' : '#ef4444',
                    backgroundColor: param.outOfSpec < 5 ? '#dcfce7' : '#fee2e2',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}>
                    {param.outOfSpec}
                  </span>
                </td>
                <td style={{ padding: '14px', textAlign: 'center', fontSize: '0.95em', fontWeight: '700', color: '#22c55e' }}>
                  {param.compliance}%
                </td>
                <td style={{ padding: '14px', textAlign: 'center' }}>
                  <span style={{
                    fontSize: '0.85em',
                    fontWeight: '700',
                    color: '#22c55e',
                    backgroundColor: '#dcfce7',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}>
                    {param.trend}
                  </span>
                </td>
                <td style={{ padding: '14px' }}>
                  <div style={{
                    height: '16px',
                    backgroundColor: '#fee2e2',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    width: '100px',
                    margin: '0 auto'
                  }}>
                    <div style={{
                      width: `${param.compliance}%`,
                      height: '100%',
                      backgroundColor: '#22c55e',
                      borderRadius: '8px',
                      transition: 'width 1s ease'
                    }}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Insights Footer */}
      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#dcfce7',
        borderRadius: '12px',
        border: '2px solid #22c55e'
      }}>
        <h4 style={{ fontSize: '1.1em', fontWeight: '800', color: '#166534', marginBottom: '10px' }}>
          ✨ Key Performance Highlights
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#15803d', fontWeight: '600' }}>
          <li>98.7% conformance rate exceeds industry benchmark of 97%</li>
          <li>18% increase in sampling frequency ensures tighter process control</li>
          <li>Weighing & Dispensing stage accounts for 27.5% of all samples</li>
          <li>Blend Uniformity maintains highest compliance at 99.3%</li>
          <li>Non-conforming events reduced from 11 to 6 over 5-month period</li>
        </ul>
      </div>
    </section>
  );
}
