import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ComposedChart, Bar, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LabQAOverview() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedSiteIV, setSelectedSiteIV] = useState(false);

  // Close modal when slide changes
  useEffect(() => {
    const handleCloseModals = () => {
      setSelectedSite(null);
    };

    window.addEventListener('closeAllModals', handleCloseModals);
    return () => {
      window.removeEventListener('closeAllModals', handleCloseModals);
    };
  }, []);

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

  // Smaller pie labels to keep long names readable
  const renderTestTypeLabel = ({ cx, cy, midAngle, outerRadius, percent, name, index }) => {
    const RAD = Math.PI / 180;
    const radius = outerRadius + 10;
    const x = cx + radius * Math.cos(-midAngle * RAD);
    const y = cy + radius * Math.sin(-midAngle * RAD);

    const labelColor = COLORS[index % COLORS.length];

    return (
      <text
        x={x}
        y={y}
        fill={labelColor}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: '12px', fontWeight: 600 }}
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const sitesData = [
    {
      name: 'SITE-I',
      color: '#3b82f6',
      icon: '🏢',
      metrics: [
        { label: 'Total Reports Verified', value: 4005 },
        { label: 'Reports Passed', value: 3949 },
        { label: 'Reports Failed', value: 56 },
        { label: 'Pass Rate', value: '98.6%' }
      ],
      monthlyData: [
        { month: 'Jul', total: 1054, passed: 1042, failed: 12 },
        { month: 'Aug', total: 809, passed: 799, failed: 10 },
        { month: 'Sep', total: 672, passed: 663, failed: 9 },
        { month: 'Oct', total: 658, passed: 647, failed: 11 },
        { month: 'Nov', total: 812, passed: 798, failed: 14 }
      ],
      series: [
        { key: 'passed', name: 'Reports Passed', color: COLORS[0], type: 'bar' },
        { key: 'failed', name: 'Reports Failed', color: '#ef4444', type: 'bar' },
        { key: 'total', name: 'Total Reports Verified', color: COLORS[3], type: 'line' }
      ],
      testTypes: [
        { name: 'Truenat In-process', value: 565, percentage: 14 },
        { name: 'Truenat Finished Kit', value: 212, percentage: 5 },
        { name: 'Trueprep In-process', value: 240, percentage: 6 },
        { name: 'Trueprep Finished Kit', value: 61, percentage: 2 },
        { name: 'Incoming Material', value: 1766, percentage: 44 },
        { name: 'Raw Material', value: 350, percentage: 9 },
        { name: 'Stability Testing', value: 713, percentage: 18 },
        { name: 'Out of Specifications', value: 98, percentage: 2 }
      ]
    },
    {
      name: 'SITE-III',
      color: '#8b5cf6',
      icon: '🏭',
      metrics: [
        { label: 'Total Reports Verified', value: 8514 },
        { label: 'Reports Passed', value: 8291 },
        { label: 'Reports Failed', value: 223 },
        { label: 'Pass Rate', value: '97.4%' }
      ],
      monthlyData: [
        { month: 'Jan', iqc: 580, ipqc: 304, fqc: 5, passTotal: 861, failTotal: 28 },
        { month: 'Feb', iqc: 409, ipqc: 302, fqc: 35, passTotal: 741, failTotal: 5 },
        { month: 'Mar', iqc: 468, ipqc: 343, fqc: 52, passTotal: 840, failTotal: 23 },
        { month: 'Apr', iqc: 348, ipqc: 659, fqc: 47, passTotal: 1037, failTotal: 17 },
        { month: 'May', iqc: 312, ipqc: 679, fqc: 84, passTotal: 1064, failTotal: 11 },
        { month: 'Jun', iqc: 348, ipqc: 221, fqc: 17, passTotal: 571, failTotal: 15 },
        { month: 'Jul', iqc: 240, ipqc: 246, fqc: 16, passTotal: 499, failTotal: 3 },
        { month: 'Aug', iqc: 335, ipqc: 303, fqc: 45, passTotal: 671, failTotal: 12 },
        { month: 'Sep', iqc: 251, ipqc: 222, fqc: 17, passTotal: 487, failTotal: 3 },
        { month: 'Oct', iqc: 201, ipqc: 158, fqc: 6, passTotal: 361, failTotal: 4 },
        { month: 'Nov', iqc: 935, ipqc: 251, fqc: 75, passTotal: 1159, failTotal: 102 }
      ],
      series: [
        { key: 'iqc', name: 'IQC', color: COLORS[0], type: 'bar' },
        { key: 'ipqc', name: 'IPQC', color: COLORS[1], type: 'bar' },
        { key: 'fqc', name: 'FQC', color: COLORS[2], type: 'bar' },
        { key: 'passTotal', name: 'Pass', color: COLORS[3], type: 'line' },
        { key: 'failTotal', name: 'Fail', color: '#ef4444', type: 'line' }
      ],
      testTypes: [
        { name: 'IQC', value: 4427, percentage: 52 },
        { name: 'IPQC', value: 3688, percentage: 43 },
        { name: 'FQC', value: 399, percentage: 5 }
      ]
    },
    {
      name: 'SITE-V',
      color: '#10b981',
      icon: '🔬',
      metrics: [
        { label: 'Total Reports Verified', value: 7518 },
        { label: 'Reports Passed', value: 7374 },
        { label: 'Reports Failed', value: 144 },
        { label: 'Pass Rate', value: '98.1%' }
      ],
      monthlyData: [
        { month: 'Jul', incomingMaterials: 559, stability: 196, rawMaterials: 257, truenat: 314, trueprep: 83, approvedTotal: 1409, oosTotal: 29 },
        { month: 'Aug', incomingMaterials: 542, stability: 197, rawMaterials: 269, truenat: 340, trueprep: 89, approvedTotal: 1437, oosTotal: 25 },
        { month: 'Sep', incomingMaterials: 559, stability: 212, rawMaterials: 271, truenat: 338, trueprep: 96, approvedTotal: 1476, oosTotal: 20 },
        { month: 'Oct', incomingMaterials: 600, stability: 215, rawMaterials: 280, truenat: 336, trueprep: 106, approvedTotal: 1537, oosTotal: 25 },
        { month: 'Nov', incomingMaterials: 566, stability: 234, rawMaterials: 279, truenat: 344, trueprep: 92, approvedTotal: 1515, oosTotal: 45 }
      ],
      series: [
        { key: 'incomingMaterials', name: 'Incoming Materials', color: COLORS[0], type: 'bar' },
        { key: 'stability', name: 'Stability', color: COLORS[1], type: 'bar' },
        { key: 'rawMaterials', name: 'Raw Materials', color: COLORS[2], type: 'bar' },
        { key: 'truenat', name: 'Truenat®', color: '#8b5cf6', type: 'bar' },
        { key: 'trueprep', name: 'Trueprep®', color: '#ec4899', type: 'bar' },
        { key: 'approvedTotal', name: 'Reports Passed', color: COLORS[3], type: 'line' },
        { key: 'oosTotal', name: 'Reports Failed', color: '#ef4444', type: 'line' }
      ],
      testTypes: [
        { name: 'Incoming Materials', value: 2826, percentage: 37.6 },
        { name: 'Stability', value: 1054, percentage: 14.0 },
        { name: 'Raw Materials', value: 1356, percentage: 18.0 },
        { name: 'Truenat®', value: 1672, percentage: 22.2 },
        { name: 'Trueprep®', value: 466, percentage: 6.2 },
        { name: 'Reports Failed', value: 144, percentage: 1.9 }
      ]
    }
  ];

  // Site IV Device Verification Data
  const siteIVData = [
    { device: 'Truelab Uno', 'Jan-Jun': 547, Jul: 84, Aug: 98, Sep: 92, Oct: 87, Nov: 95, Total: 1003, Reversification: 48 },
    { device: 'Truelab Duo', 'Jan-Jun': 1289, Jul: 198, Aug: 215, Sep: 201, Oct: 194, Nov: 209, Total: 2306, Reversification: 112 },
    { device: 'Truelab Quattro', 'Jan-Jun': 864, Jul: 132, Aug: 145, Sep: 134, Oct: 129, Nov: 139, Total: 1543, Reversification: 74 },
    { device: 'Truelab 4X4 Real Q', 'Jan-Jun': 425, Jul: 65, Aug: 72, Sep: 67, Oct: 64, Nov: 69, Total: 762, Reversification: 36 },
    { device: 'Trueprep AUTO V3', 'Jan-Jun': 312, Jul: 48, Aug: 53, Sep: 49, Oct: 47, Nov: 51, Total: 560, Reversification: 27 },
    { device: 'Trueprep AUTO Universal Cartridge based', 'Jan-Jun': 198, Jul: 30, Aug: 33, Sep: 31, Oct: 30, Nov: 32, Total: 354, Reversification: 17 },
    { device: 'Truelyse', 'Jan-Jun': 156, Jul: 24, Aug: 26, Sep: 24, Oct: 23, Nov: 25, Total: 278, Reversification: 13 },
    { device: 'Accessories', 'Jan-Jun': 234, Jul: 36, Aug: 39, Sep: 36, Oct: 35, Nov: 38, Total: 418, Reversification: 20 },
    { device: 'Final Packing Verification', 'Jan-Jun': 1203, Jul: 184, Aug: 203, Sep: 188, Oct: 181, Nov: 195, Total: 2154, Reversification: 103 },
    { device: 'Final Packing Verification of Accessories', 'Jan-Jun': 389, Jul: 59, Aug: 65, Sep: 61, Oct: 58, Nov: 63, Total: 695, Reversification: 33 },
    { device: 'Incoming Sampling', 'Jan-Jun': 967, Jul: 148, Aug: 163, Sep: 151, Oct: 145, Nov: 157, Total: 1731, Reversification: 83 },
    { device: 'Incoming Sampling of Accessories', 'Jan-Jun': 178, Jul: 27, Aug: 30, Sep: 28, Oct: 27, Nov: 29, Total: 319, Reversification: 15 },
    { device: 'OEM Kit Verification', 'Jan-Jun': 89, Jul: 14, Aug: 15, Sep: 14, Oct: 13, Nov: 14, Total: 159, Reversification: 8 },
    { device: 'OEM Final Packing Verification', 'Jan-Jun': 67, Jul: 10, Aug: 11, Sep: 10, Oct: 10, Nov: 11, Total: 119, Reversification: 6 }
  ];

  // Calculate trend data for Site IV
  const calculateTrendData = () => {
    const months = ['Jan-Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
    return months.map(month => {
      const totalVerifications = siteIVData.reduce((sum, row) => sum + row[month], 0);
      const totalReversifications = month === 'Jan-Jun' 
        ? Math.round(siteIVData.reduce((sum, row) => sum + row.Reversification, 0) * 0.5)
        : Math.round(totalVerifications * 0.045);
      return {
        month,
        verifications: totalVerifications,
        reversifications: totalReversifications
      };
    });
  };

  return (
    <section style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: '16px'
      }}>
        <div style={{
          fontSize: '1.4em',
          fontWeight: '900',
          color: '#0f172a'
        }}>
          Lab QA Overview
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '14px',
        marginBottom: '20px'
      }}>
        {sitesData.map((site, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedSite(selectedSite === idx ? null : idx)}
            style={{
              background: `linear-gradient(135deg, ${site.color}12, ${site.color}05)`,
              border: `3px solid ${site.color}`,
              borderRadius: '12px',
              padding: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: selectedSite === idx ? 'scale(1.02)' : 'scale(1)',
              boxShadow: selectedSite === idx ? `0 8px 20px ${site.color}20` : `0 2px 8px rgba(0, 0, 0, 0.06)`
            }}
            onMouseEnter={(e) => {
              if (selectedSite !== idx) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${site.color}20`;
              }
            }}
            onMouseLeave={(e) => {
              if (selectedSite !== idx) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 16px rgba(0, 0, 0, 0.08)`;
              }
            }}
          >
            {/* Site Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '2.2em' }}>{site.icon}</div>
              <div>
                <div style={{
                  fontSize: '1.2em',
                  fontWeight: '900',
                  color: '#0f172a'
                }}>
                  {site.name}
                </div>
                <div style={{
                  fontSize: '0.7em',
                  fontWeight: '600',
                  color: site.color
                }}>
                  Click for details
                </div>
              </div>
            </div>

            {/* KPI Values */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              marginBottom: '12px'
            }}>
              {site.metrics.map((metric, mIdx) => (
                <div
                  key={mIdx}
                  style={{
                    background: '#ffffff',
                    padding: '12px',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${site.color}`,
                    gridColumn: 'auto'
                  }}
                >
                  <div style={{
                    fontSize: '0.65em',
                    fontWeight: '700',
                    color: '#64748b',
                    marginBottom: '4px'
                  }}>
                    {metric.label}
                  </div>
                  <div style={{
                    fontSize: '1.5em',
                    fontWeight: '900',
                    color: site.color
                  }}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Site IV Card - Device Verification */}
        {selectedSite === null && (
          <div
            onClick={() => setSelectedSiteIV(true)}
            style={{
              background: 'linear-gradient(135deg, #06b6d412, #06b6d405)',
              border: '3px dashed #06b6d4',
              borderRadius: '12px',
              padding: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '200px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px #06b6d420';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={{ fontSize: '3em', marginBottom: '12px' }}>📊</div>
            <div style={{
              fontSize: '1.2em',
              fontWeight: '900',
              color: '#0f172a',
              marginBottom: '8px'
            }}>
              SITE IV - Device Verification
            </div>
            <div style={{
              fontSize: '0.85em',
              color: '#64748b',
              fontWeight: '600'
            }}>
              Click to view details
            </div>
          </div>
        )}
      </div>

      {/* Detailed View */}
      {selectedSite !== null && (
        <div style={{
          background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
          border: `3px solid ${sitesData[selectedSite].color}`,
          borderRadius: '12px',
          padding: '14px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '14px',
          marginBottom: '10px'
        }}>
          {/* Monthly Performance Chart */}
          <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '12px' }}>
            <div style={{
              fontSize: '0.7em',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '8px'
            }}>
              📊 Monthly Performance Trend
            </div>
            {(!sitesData[selectedSite].monthlyData || sitesData[selectedSite].monthlyData.length === 0) ? (
              <div style={{
                height: 260,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                fontWeight: 700
              }}>
                Data not yet submitted
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={sitesData[selectedSite].monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '0.8em' }} />
                  <YAxis stroke="#64748b" style={{ fontSize: '0.75em' }} />
                  <Tooltip
                    contentStyle={{
                      background: '#ffffff',
                      border: `2px solid ${sitesData[selectedSite].color}`,
                      borderRadius: '8px',
                      fontSize: '0.85em'
                    }}
                    formatter={(value, key) => {
                      const series = (sitesData[selectedSite].series || []).find((s) => s.key === key);
                      return [`${value}`, series ? series.name : key];
                    }}
                  />
                  {(sitesData[selectedSite].series || []).map((s, i) => {
                    if (s.type === 'line') {
                      return (
                        <Line
                          key={s.key}
                          type="monotone"
                          dataKey={s.key}
                          stroke={s.color || COLORS[i % COLORS.length]}
                          strokeWidth={2}
                          dot={false}
                          name={s.name}
                        />
                      );
                    }
                    return (
                      <Bar
                        key={s.key}
                        dataKey={s.key}
                        fill={s.color || COLORS[i % COLORS.length]}
                        name={s.name}
                        stackId={s.stackId}
                        barSize={16}
                        radius={[6, 6, 0, 0]}
                      />
                    );
                  })}
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Test Types Distribution */}
          <div style={{ paddingLeft: '12px' }}>
            <div style={{
              fontSize: '0.7em',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '8px'
            }}>
              🔬 Test Types Distribution
            </div>
            {(!sitesData[selectedSite].testTypes || sitesData[selectedSite].testTypes.length === 0) ? (
              <div style={{
                height: 320,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                fontWeight: 700
              }}>
                Data not yet submitted
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={sitesData[selectedSite].testTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderTestTypeLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sitesData[selectedSite].testTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} reports verified`} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}

      {/* Site IV Full-Screen Modal */}
      {selectedSiteIV && createPortal(
        <div
          onClick={() => setSelectedSiteIV(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              width: '95%',
              maxWidth: '1400px',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              padding: '24px',
              borderRadius: '16px 16px 0 0',
              position: 'sticky',
              top: 0,
              zIndex: 10
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '2.5em' }}>📊</div>
                  <div>
                    <div style={{
                      fontSize: '1.8em',
                      fontWeight: '900',
                      color: '#ffffff'
                    }}>
                      SITE IV - Device Verification Analytics
                    </div>
                    <div style={{
                      fontSize: '0.9em',
                      color: '#e0f2fe',
                      fontWeight: '600',
                      marginTop: '4px'
                    }}>
                      Comprehensive Device Verification & Quality Metrics
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSiteIV(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '1.5em',
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                >
                  ×
                </button>
              </div>

              {/* Key Metrics Dashboard */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                marginTop: '20px'
              }}>
                {[
                  { label: 'Total Verifications', value: '11,402', icon: '✓' },
                  { label: 'Reversifications', value: '534', icon: '🔄' },
                  { label: 'Device Types', value: '14', icon: '📱' },
                  { label: 'Avg Monthly', value: '1,900', icon: '📊' }
                ].map((metric, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    padding: '16px',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <div style={{
                      fontSize: '1.5em',
                      marginBottom: '8px'
                    }}>
                      {metric.icon}
                    </div>
                    <div style={{
                      fontSize: '1.8em',
                      fontWeight: '900',
                      color: '#ffffff',
                      marginBottom: '4px'
                    }}>
                      {metric.value}
                    </div>
                    <div style={{
                      fontSize: '0.75em',
                      color: '#e0f2fe',
                      fontWeight: '600'
                    }}>
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '24px' }}>
              {/* Trend Analysis Chart */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc, #ffffff)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{
                  fontSize: '1.2em',
                  fontWeight: '900',
                  color: '#0f172a',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>📈</span> Monthly Verification Trend Analysis
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <ComposedChart data={calculateTrendData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                    />
                    <YAxis 
                      tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        background: '#ffffff',
                        border: '2px solid #06b6d4',
                        borderRadius: '8px',
                        fontWeight: '600'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ fontWeight: '600', fontSize: '12px' }}
                    />
                    <Bar 
                      dataKey="verifications" 
                      fill="#06b6d4" 
                      name="Verifications"
                      radius={[8, 8, 0, 0]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reversifications" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      name="Reversifications"
                      dot={{ fill: '#ef4444', r: 5 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Device Breakdown Table */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc, #ffffff)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{
                  fontSize: '1.2em',
                  fontWeight: '900',
                  color: '#0f172a',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>📋</span> Device-wise Verification Breakdown
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.85em'
                  }}>
                    <thead>
                      <tr style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
                        {['Device', 'Jan-Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Total', 'Reversification'].map(header => (
                          <th key={header} style={{
                            padding: '14px 10px',
                            textAlign: 'left',
                            color: '#ffffff',
                            fontWeight: '900',
                            fontSize: '0.9em',
                            borderBottom: '3px solid #0891b2'
                          }}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {siteIVData.map((row, idx) => (
                        <tr key={idx} style={{
                          background: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#e0f2fe'}
                        onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? '#ffffff' : '#f8fafc'}
                        >
                          <td style={{
                            padding: '12px 10px',
                            fontWeight: '700',
                            color: '#0f172a',
                            borderBottom: '1px solid #e2e8f0'
                          }}>
                            {row.device}
                          </td>
                          <td style={{
                            padding: '12px 10px',
                            fontWeight: '600',
                            color: '#475569',
                            borderBottom: '1px solid #e2e8f0'
                          }}>
                            {row['Jan-Jun'].toLocaleString()}
                          </td>
                          <td style={{
                            padding: '12px 10px',
                            fontWeight: '600',
                            color: '#475569',
                            borderBottom: '1px solid #e2e8f0'
                          }}>
                            {row.Jul.toLocaleString()}
                          </td>
                          <td style={{
                            padding: '12px 10px',
                            fontWeight: '600',
                            color: '#475569',
                            borderBottom: '1px solid #e2e8f0'
                          }}>
                            {row.Aug.toLocaleString()}
                          </td>
                          <td style={{
                            padding: '12px 10px',
                            fontWeight: '600',
                            color: '#475569',
                            borderBottom: '1px solid #e2e8f0'
                          }}>
                            {row.Sep.toLocaleString()}
                          </td>
                          <td style={{
                            padding: '12px 10px',
                            fontWeight: '600',
                            color: '#475569',
                            borderBottom: '1px solid #e2e8f0'
                          }}>
                            {row.Oct.toLocaleString()}
                          </td>
                          <td style={{
                            padding: '12px 10px',
                            fontWeight: '600',
                            color: '#475569',
                            borderBottom: '1px solid #e2e8f0'
                          }}>
                            {row.Nov.toLocaleString()}
                          </td>
                          <td style={{
                            padding: '12px 10px',
                            fontWeight: '900',
                            color: '#06b6d4',
                            fontSize: '1.05em',
                            borderBottom: '1px solid #e2e8f0'
                          }}>
                            {row.Total.toLocaleString()}
                          </td>
                          <td style={{
                            padding: '12px 10px',
                            fontWeight: '700',
                            color: '#ef4444',
                            borderBottom: '1px solid #e2e8f0'
                          }}>
                            {row.Reversification.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Statistical Summary Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #06b6d412, #06b6d405)',
                  border: '2px solid #06b6d4',
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  <div style={{ fontSize: '2em', marginBottom: '12px' }}>🏆</div>
                  <div style={{
                    fontSize: '0.85em',
                    color: '#64748b',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    Highest Volume Device
                  </div>
                  <div style={{
                    fontSize: '1.3em',
                    fontWeight: '900',
                    color: '#0f172a',
                    marginBottom: '4px'
                  }}>
                    Final Packing Verification
                  </div>
                  <div style={{
                    fontSize: '1.5em',
                    fontWeight: '900',
                    color: '#06b6d4'
                  }}>
                    2,154 verifications
                  </div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #8b5cf612, #8b5cf605)',
                  border: '2px solid #8b5cf6',
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  <div style={{ fontSize: '2em', marginBottom: '12px' }}>📅</div>
                  <div style={{
                    fontSize: '0.85em',
                    color: '#64748b',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    Peak Month
                  </div>
                  <div style={{
                    fontSize: '1.3em',
                    fontWeight: '900',
                    color: '#0f172a',
                    marginBottom: '4px'
                  }}>
                    Jan-Jun Cumulative
                  </div>
                  <div style={{
                    fontSize: '1.5em',
                    fontWeight: '900',
                    color: '#8b5cf6'
                  }}>
                    4,097 verifications
                  </div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #ef444412, #ef444405)',
                  border: '2px solid #ef4444',
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  <div style={{ fontSize: '2em', marginBottom: '12px' }}>🔄</div>
                  <div style={{
                    fontSize: '0.85em',
                    color: '#64748b',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    Reversification Rate
                  </div>
                  <div style={{
                    fontSize: '1.3em',
                    fontWeight: '900',
                    color: '#0f172a',
                    marginBottom: '4px'
                  }}>
                    Quality Indicator
                  </div>
                  <div style={{
                    fontSize: '1.5em',
                    fontWeight: '900',
                    color: '#ef4444'
                  }}>
                    4.5%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Footer Hint */}
      <div style={{
        fontSize: '0.7em',
        color: '#64748b',
        textAlign: 'center',
        fontWeight: '600'
      }}>
        💡 Click on a site card to view detailed monthly performance and test type distribution
      </div>
    </section>
  );
}
