// SITE-V Incoming Sampling Detailed Analysis

export default function SiteVIncomingSampling() {
  // Monthly data for incoming sampling
  const monthlyData = [
    { month: 'July', samples: 278, passed: 271, failed: 7, passRate: 97.5 },
    { month: 'August', samples: 285, passed: 279, failed: 6, passRate: 97.9 },
    { month: 'September', samples: 292, passed: 287, failed: 5, passRate: 98.3 },
    { month: 'October', samples: 268, passed: 264, failed: 4, passRate: 98.5 },
    { month: 'November', samples: 282, passed: 278, failed: 4, passRate: 98.6 }
  ];

  // Material category breakdown
  const categoryData = [
    { category: 'Raw Materials', samples: 523, percentage: 37.2, status: 'Excellent' },
    { category: 'Packaging Materials', samples: 421, percentage: 30.0, status: 'Good' },
    { category: 'Excipients', samples: 315, percentage: 22.4, status: 'Excellent' },
    { category: 'Components', samples: 146, percentage: 10.4, status: 'Stable' }
  ];

  // Test type distribution
  const testTypes = [
    { test: 'Identity Testing', count: 385, avgTime: '2.4 hrs', compliance: '99.2%' },
    { test: 'Physical Testing', count: 342, avgTime: '1.8 hrs', compliance: '98.8%' },
    { test: 'Chemical Testing', count: 298, avgTime: '4.2 hrs', compliance: '97.6%' },
    { test: 'Microbiological', count: 245, avgTime: '5.6 hrs', compliance: '98.1%' },
    { test: 'Visual Inspection', count: 135, avgTime: '0.5 hrs', compliance: '99.6%' }
  ];

  const maxSamples = Math.max(...monthlyData.map(d => d.samples));

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
          Incoming Sampling Analysis
        </h1>
        <p style={{ fontSize: '1.1em', color: '#64748b', fontWeight: '500' }}>
          Detailed breakdown of incoming material sampling activities • Total: 1,405 samples
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '30px'
      }}>
        {[
          { label: 'Total Samples', value: '1,405', icon: '📊', color: '#0ea5e9' },
          { label: 'Pass Rate', value: '98.2%', icon: '✓', color: '#22c55e' },
          { label: 'Avg Turnaround', value: '3.1 hrs', icon: '⏱️', color: '#f59e0b' },
          { label: 'Rejection Rate', value: '1.8%', icon: '⚠️', color: '#ef4444' }
        ].map((metric, idx) => (
          <div key={idx} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: `2px solid ${metric.color}30`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              backgroundColor: metric.color
            }}></div>
            <div style={{ fontSize: '2em', marginBottom: '8px' }}>{metric.icon}</div>
            <div style={{ fontSize: '0.85em', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>
              {metric.label}
            </div>
            <div style={{ fontSize: '1.8em', fontWeight: '800', color: metric.color }}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Monthly Trend Chart */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
            📈 Monthly Sampling Trend
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                    {data.samples} samples
                  </span>
                  <span style={{
                    fontSize: '0.85em',
                    fontWeight: '700',
                    color: data.passRate >= 98 ? '#22c55e' : '#f59e0b',
                    backgroundColor: data.passRate >= 98 ? '#dcfce7' : '#fef3c7',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}>
                    {data.passRate}% pass
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
                    width: `${(data.samples / maxSamples) * 100}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, #0ea5e9, #0284c7)`,
                    borderRadius: '8px',
                    transition: 'width 1s ease'
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
                    {data.passed}/{data.samples}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Material Category Breakdown */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
            📦 Material Category Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {categoryData.map((cat, idx) => (
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
                  <span style={{ fontSize: '0.95em', fontWeight: '700', color: '#1e293b' }}>
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
                    {cat.samples} samples
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{
                    flex: 1,
                    height: '20px',
                    backgroundColor: '#e0f2fe',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${cat.percentage}%`,
                      height: '100%',
                      backgroundColor: '#0ea5e9',
                      borderRadius: '10px',
                      transition: 'width 1s ease'
                    }}></div>
                  </div>
                  <span style={{ fontSize: '0.9em', fontWeight: '700', color: '#475569', minWidth: '50px' }}>
                    {cat.percentage}%
                  </span>
                </div>
                <div style={{
                  marginTop: '6px',
                  fontSize: '0.75em',
                  fontWeight: '600',
                  color: cat.status === 'Excellent' ? '#22c55e' : '#64748b',
                  textAlign: 'right'
                }}>
                  Status: {cat.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Test Type Distribution Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '2px solid #e2e8f0',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0369a1', marginBottom: '20px' }}>
          🔬 Test Type Analysis
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.85em', fontWeight: '700', color: '#475569' }}>
                Test Type
              </th>
              <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.85em', fontWeight: '700', color: '#475569' }}>
                Sample Count
              </th>
              <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.85em', fontWeight: '700', color: '#475569' }}>
                Avg Turnaround
              </th>
              <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.85em', fontWeight: '700', color: '#475569' }}>
                Compliance Rate
              </th>
              <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.85em', fontWeight: '700', color: '#475569' }}>
                Volume Bar
              </th>
            </tr>
          </thead>
          <tbody>
            {testTypes.map((test, idx) => (
              <tr key={idx} style={{
                borderBottom: '1px solid #e2e8f0',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                <td style={{ padding: '14px', fontSize: '0.9em', fontWeight: '600', color: '#1e293b' }}>
                  {test.test}
                </td>
                <td style={{ padding: '14px', textAlign: 'center', fontSize: '0.95em', fontWeight: '700', color: '#0ea5e9' }}>
                  {test.count}
                </td>
                <td style={{ padding: '14px', textAlign: 'center', fontSize: '0.9em', fontWeight: '600', color: '#64748b' }}>
                  {test.avgTime}
                </td>
                <td style={{ padding: '14px', textAlign: 'center' }}>
                  <span style={{
                    fontSize: '0.85em',
                    fontWeight: '700',
                    color: parseFloat(test.compliance) >= 98 ? '#22c55e' : '#f59e0b',
                    backgroundColor: parseFloat(test.compliance) >= 98 ? '#dcfce7' : '#fef3c7',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}>
                    {test.compliance}
                  </span>
                </td>
                <td style={{ padding: '14px' }}>
                  <div style={{
                    height: '16px',
                    backgroundColor: '#e0f2fe',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    width: '100px',
                    margin: '0 auto'
                  }}>
                    <div style={{
                      width: `${(test.count / testTypes[0].count) * 100}%`,
                      height: '100%',
                      backgroundColor: '#0ea5e9',
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
          ✨ Key Insights
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#15803d', fontWeight: '600' }}>
          <li>98.2% overall pass rate demonstrates excellent supplier quality</li>
          <li>12% increase in sampling volume compared to previous period</li>
          <li>Raw materials represent 37.2% of total sampling activities</li>
          <li>Identity testing maintains highest compliance at 99.2%</li>
          <li>Average turnaround time of 3.1 hours meets target SLA</li>
        </ul>
      </div>
    </section>
  );
}
