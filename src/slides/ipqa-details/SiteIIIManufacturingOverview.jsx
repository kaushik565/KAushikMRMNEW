// SITE-III Manufacturing Device & Cartridge Assembly - Comprehensive Overview

export default function SiteIIIManufacturingOverview() {
  // Manufacturing Device Categories with Process Data
  const deviceCategories = [
    {
      categoryName: 'Assembly of Rapid Cell Lysis System',
      color: '#3b82f6',
      processes: [
        { name: 'Door mechanism assembly', clearance: '4:08', closure: '3:16', reverif: '4:05', trend: 'Stable' },
        { name: 'Final assembly and labeling', clearance: '3:12', closure: '4:03', reverif: '4:12', trend: 'Stable' },
        { name: 'Integration testing', clearance: '3:56', closure: '2:08', reverif: '3:51', trend: 'Improving' }
      ]
    },
    {
      categoryName: 'Assembly of Two Bay PCR Machine',
      color: '#8b5cf6',
      processes: [
        { name: 'Final assembly and labelling', clearance: '5:13', closure: '7:22', reverif: '3:42', trend: 'Stable' },
        { name: 'Bottom cover and top cover', clearance: '5:02', closure: '10:03', reverif: '3:06', trend: 'Stable' },
        { name: 'AFC TESTING', clearance: '8:05', closure: '8:53', reverif: '9:32', trend: 'Stable' },
        { name: 'Packing', clearance: '6:03', closure: '4:14', reverif: '2:32', trend: 'Improving' },
        { name: 'Case closing and labelling', clearance: '4:23', closure: '8:42', reverif: '3:20', trend: 'Stable' },
        { name: 'Dye Testing Duo rework line', clearance: '2:56', closure: '5:03', reverif: '4:32', trend: 'Good' },
        { name: 'Mechanism with Optics Assembly', clearance: '3:23', closure: '4:35', reverif: '2:12', trend: 'Stable' },
        { name: 'Optics sub assembly', clearance: '6:02', closure: '3:19', reverif: '5:26', trend: 'Stable' },
        { name: 'Top and bottom cover assembly', clearance: '8:01', closure: '4:24', reverif: '1:58', trend: 'Improving' }
      ]
    },
    {
      categoryName: 'Assembly of Sixteen Bay PCR Machine',
      color: '#ec4899',
      processes: [
        { name: '4x4 packing', clearance: '3:09', closure: '4:11', reverif: 'N/A', trend: 'N/A' },
        { name: '4x4 top and bottom cover assembly', clearance: '4:08', closure: '6:11', reverif: '2:04', trend: 'Stable' },
        { name: 'AFC Testing 4x4', clearance: '3:08', closure: '5:13', reverif: '3:16', trend: 'Stable' }
      ]
    },
    {
      categoryName: 'Assembly of Extraction Device',
      color: '#f59e0b',
      processes: [
        { name: 'Top cover Assembly', clearance: '4:23', closure: '5:54', reverif: 'N/A', trend: 'Stable' },
        { name: 'Mechanism assembly', clearance: '4:11', closure: '4:33', reverif: '3:02', trend: 'Stable' },
        { name: 'Wiring - Main Assembly area', clearance: '7:02', closure: '8:01', reverif: 'N/A', trend: 'Stable' },
        { name: 'Bottom cover', clearance: '6:44', closure: '7:05', reverif: 'N/A', trend: 'Stable' },
        { name: 'Testing', clearance: '4:27', closure: '5:01', reverif: 'N/A', trend: 'Stable' },
        { name: 'Packing room 1', clearance: '3:01', closure: '3:26', reverif: 'N/A', trend: 'Good' },
        { name: 'Eject Motor Sub Assembly', clearance: '4:22', closure: '3:03', reverif: 'N/A', trend: 'Stable' },
        { name: 'Valve Rotating Sub Assembly', clearance: '5:34', closure: '4:58', reverif: 'N/A', trend: 'Stable' },
        { name: 'Fluid Nozzle Sub Assembly', clearance: '5:53', closure: '6:14', reverif: 'N/A', trend: 'Stable' },
        { name: 'CAM Sub Assembly', clearance: '5:12', closure: '5:30', reverif: 'N/A', trend: 'Improving' },
        { name: 'Sliding Block Sub Assembly', clearance: '3:42', closure: '5:11', reverif: 'N/A', trend: 'Stable' },
        { name: 'POKA-YOKA Plate SUB ASSEMBLY', clearance: '4:53', closure: '4:22', reverif: 'N/A', trend: 'Stable' },
        { name: 'Fixed Plate Sub Assembly', clearance: '6:41', closure: '4:53', reverif: 'N/A', trend: 'Stable' },
        { name: 'Locking Block Sub Assembly', clearance: '4:20', closure: '3:42', reverif: 'N/A', trend: 'Improving' },
        { name: 'Valve Motor -1 Sub Assembly', clearance: '3:20', closure: '5:39', reverif: 'N/A', trend: 'Stable' },
        { name: 'Peristaltic pump sub assembly', clearance: '3:32', closure: '3:46', reverif: 'N/A', trend: 'Good' },
        { name: 'Filter sub assembly', clearance: '3:43', closure: '4:00', reverif: 'N/A', trend: 'Stable' },
        { name: 'Mechanism assembly', clearance: '6:50', closure: '2:09', reverif: '3:26', trend: 'Improving' },
        { name: 'Bottom cover assembly', clearance: '4:46', closure: '4:03', reverif: 'N/A', trend: 'Stable' },
        { name: 'Wiring Assembly', clearance: '6:30', closure: '4:54', reverif: 'N/A', trend: 'Stable' },
        { name: 'Heater testing', clearance: '8:31', closure: '3:45', reverif: '3:37', trend: 'Good' },
        { name: 'Testing', clearance: '9:46', closure: '5:03', reverif: 'N/A', trend: 'Stable' },
        { name: 'Vacuum nozzle sub assembly', clearance: '4:02', closure: '6:51', reverif: 'N/A', trend: 'Stable' }
      ]
    }
  ];

  // Overall metrics
  const overallMetrics = [
    { icon: '✓', label: 'Line Clearance - Approved', value: '2,464', notApproved: 29, approval: '98.84%', trend: 'Excellent' },
    { icon: '✓', label: 'Line Closure - Approved', value: '2,459', notApproved: 29, approval: '98.84%', trend: 'Excellent' },
    { icon: '✓', label: 'Re-Verification - Approved', value: '4,421', notApproved: 34, approval: '99.24%', trend: 'Excellent' },
    { icon: '✓', label: 'Line Verification - Approved', value: '6,190', notApproved: 1, approval: '99.98%', trend: 'Excellent' }
  ];

  // Process improvements
  const improvements = [
    { icon: '📋', title: 'Monthly Meeting with MG & MN', desc: 'Reduced in-process rejections from 4% to 2.5% in cartridge and rework for metal enclosures' },
    { icon: '👁️', title: 'Observation Meetings Every 15 Days', desc: 'Reduction of repetitive NCs by 50% through regular floor observations' },
    { icon: '📖', title: 'Work Instructions on Production Floor', desc: 'Better and easy understanding of workflow by workers' },
    { icon: '🔄', title: 'Re-Work Area Implemented (Line-Wise)', desc: 'Mix-up of cartridges avoided with dedicated rework zones' },
    { icon: '🧪', title: 'Particle Count Testing Implementation', desc: 'Proactive measure to avoid dust contamination - IQC modification' },
    { icon: '🏷️', title: 'QR Pasting Segregation', desc: 'Segregation of tables prevents cartridge mix-up and mitigates repetitive incidents' },
    { icon: '📊', title: 'Pictorial Representation', desc: 'Implementation for awareness of repetitive defects' },
    { icon: '📝', title: 'Change Control Tracking Sheet', desc: 'Clear understanding of activities and planning' }
  ];

  const timeToMinutes = (timeStr) => {
    if (timeStr === 'N/A' || !timeStr) return 0;
    const [mins, secs] = timeStr.split(':').map(Number);
    return mins + (secs / 60);
  };

  return (
    <section style={{
      background: 'linear-gradient(135deg, #f5f3ff 0%, #faf8f0 100%)',
      minHeight: '100vh',
      padding: '40px',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'inline-block',
          backgroundColor: '#8b5cf6',
          color: 'white',
          padding: '8px 20px',
          borderRadius: '20px',
          fontSize: '0.9em',
          fontWeight: '700',
          marginBottom: '12px'
        }}>
          SITE-III IPQA
        </div>
        <h1 style={{
          fontSize: '2.5em',
          fontWeight: '900',
          color: '#6d28d9',
          marginBottom: '8px'
        }}>
          Manufacturing Device & Cartridge Assembly
        </h1>
        <p style={{ fontSize: '1.1em', color: '#64748b', fontWeight: '500' }}>
          Comprehensive line clearance, closure & verification analysis • 4 device categories • 38+ processes
        </p>
      </div>

      {/* Overall Performance Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '30px'
      }}>
        {overallMetrics.map((metric, idx) => (
          <div key={idx} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '2px solid #ddd6fe',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              backgroundColor: '#8b5cf6'
            }}></div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px'
            }}>
              <div>
                <div style={{
                  fontSize: '0.7em',
                  fontWeight: '700',
                  color: '#64748b',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Approved
                </div>
                <div style={{
                  fontSize: '1.8em',
                  fontWeight: '900',
                  color: '#22c55e',
                  marginBottom: '4px'
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: '0.75em',
                  fontWeight: '700',
                  color: '#22c55e',
                  backgroundColor: '#dcfce7',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  display: 'inline-block'
                }}>
                  {metric.approval}
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '0.7em',
                  fontWeight: '700',
                  color: '#64748b',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Not Approved
                </div>
                <div style={{
                  fontSize: '1.8em',
                  fontWeight: '900',
                  color: '#ef4444',
                  marginBottom: '4px'
                }}>
                  {metric.notApproved}
                </div>
                <div style={{
                  fontSize: '0.75em',
                  fontWeight: '700',
                  color: '#991b1b',
                  backgroundColor: '#fee2e2',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  display: 'inline-block'
                }}>
                  Very Low
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Device Categories */}
      {deviceCategories.map((category, catIdx) => (
        <div key={catIdx} style={{
          marginBottom: '30px',
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          {/* Category Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: `3px solid ${category.color}`
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: category.color,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4em',
              fontWeight: '900',
              color: 'white'
            }}>
              {catIdx + 1}
            </div>
            <div>
              <h3 style={{
                fontSize: '1.3em',
                fontWeight: '800',
                color: category.color,
                margin: 0,
                marginBottom: '4px'
              }}>
                {category.categoryName}
              </h3>
              <p style={{
                fontSize: '0.85em',
                color: '#64748b',
                margin: 0,
                fontWeight: '500'
              }}>
                {category.processes.length} processes
              </p>
            </div>
          </div>

          {/* Process Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '14px'
          }}>
            {category.processes.map((proc, pIdx) => {
              const clearMin = timeToMinutes(proc.clearance);
              const closeMin = timeToMinutes(proc.closure);
              const reverifMin = timeToMinutes(proc.reverif);

              return (
                <div key={pIdx} style={{
                  backgroundColor: `${category.color}05`,
                  border: `1.5px solid ${category.color}30`,
                  borderRadius: '12px',
                  padding: '16px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${category.color}10`;
                  e.currentTarget.style.borderColor = category.color;
                  e.currentTarget.style.boxShadow = `0 8px 16px ${category.color}20`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${category.color}05`;
                  e.currentTarget.style.borderColor = `${category.color}30`;
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <div style={{
                    fontSize: '0.9em',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '12px',
                    lineHeight: '1.3'
                  }}>
                    {proc.name}
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    {/* Clearance */}
                    <div style={{
                      backgroundColor: '#eff6ff',
                      padding: '10px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      border: '1px solid #dbeafe'
                    }}>
                      <div style={{
                        fontSize: '0.7em',
                        color: '#0369a1',
                        fontWeight: '700',
                        marginBottom: '4px'
                      }}>
                        Clearance
                      </div>
                      <div style={{
                        fontSize: '1.1em',
                        fontWeight: '800',
                        color: '#3b82f6'
                      }}>
                        {proc.clearance}
                      </div>
                    </div>

                    {/* Closure */}
                    <div style={{
                      backgroundColor: '#f0f9ff',
                      padding: '10px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      border: '1px solid #e0f2fe'
                    }}>
                      <div style={{
                        fontSize: '0.7em',
                        color: '#0369a1',
                        fontWeight: '700',
                        marginBottom: '4px'
                      }}>
                        Closure
                      </div>
                      <div style={{
                        fontSize: '1.1em',
                        fontWeight: '800',
                        color: '#0284c7'
                      }}>
                        {proc.closure}
                      </div>
                    </div>

                    {/* Re-verification */}
                    <div style={{
                      backgroundColor: proc.reverif === 'N/A' ? '#f5f5f5' : '#fffbeb',
                      padding: '10px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      border: proc.reverif === 'N/A' ? '1px solid #e5e7eb' : '1px solid #fde68a'
                    }}>
                      <div style={{
                        fontSize: '0.7em',
                        color: proc.reverif === 'N/A' ? '#94a3b8' : '#b45309',
                        fontWeight: '700',
                        marginBottom: '4px'
                      }}>
                        Re-verif
                      </div>
                      <div style={{
                        fontSize: '1.1em',
                        fontWeight: '800',
                        color: proc.reverif === 'N/A' ? '#94a3b8' : '#b45309'
                      }}>
                        {proc.reverif}
                      </div>
                    </div>
                  </div>

                  {/* Trend Badge */}
                  <div style={{
                    fontSize: '0.75em',
                    fontWeight: '700',
                    color: proc.trend === 'N/A' ? '#94a3b8' : (proc.trend.includes('Improving') ? '#22c55e' : '#3b82f6'),
                    backgroundColor: proc.trend === 'N/A' ? '#f1f5f9' : (proc.trend.includes('Improving') ? '#dcfce7' : '#dbeafe'),
                    padding: '4px 10px',
                    borderRadius: '6px',
                    display: 'inline-block'
                  }}>
                    {proc.trend === 'N/A' ? 'Limited Data' : '📈 ' + proc.trend}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Process Improvements */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '2px solid #e2e8f0',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '1.3em',
          fontWeight: '800',
          color: '#6d28d9',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '2px solid #e2e8f0'
        }}>
          ✨ Process Improvements & Initiatives
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {improvements.map((imp, idx) => (
            <div key={idx} style={{
              backgroundColor: '#f8fafc',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f9ff';
              e.currentTarget.style.borderColor = '#8b5cf6';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(139, 92, 246, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '1.6em', marginBottom: '8px' }}>{imp.icon}</div>
              <div style={{
                fontSize: '0.95em',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '6px'
              }}>
                {imp.title}
              </div>
              <div style={{
                fontSize: '0.85em',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                {imp.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Performance Summary */}
      <div style={{
        background: 'linear-gradient(135deg, #ede9fe 0%, #f3f0ff 100%)',
        borderRadius: '16px',
        padding: '24px',
        border: '2px solid #ddd6fe'
      }}>
        <h4 style={{
          fontSize: '1.1em',
          fontWeight: '800',
          color: '#6d28d9',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>📊</span> Key Performance Indicators
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          fontSize: '0.9em',
          color: '#4c1d95',
          fontWeight: '600',
          lineHeight: '1.8'
        }}>
          <div>✓ <strong>98.84%</strong> clearance approval rate</div>
          <div>✓ <strong>98.84%</strong> closure approval rate</div>
          <div>✓ <strong>99.24%</strong> re-verification rate</div>
          <div>✓ <strong>99.98%</strong> line verification accuracy</div>
          <div>✓ <strong>50%</strong> reduction in repetitive NCs</div>
          <div>✓ <strong>2.5%</strong> cartridge rejection (down from 4%)</div>
          <div>✓ <strong>38+ processes</strong> across 4 device categories</div>
          <div>✓ <strong>Trending</strong> with monthly data collection</div>
        </div>
      </div>
    </section>
  );
}
