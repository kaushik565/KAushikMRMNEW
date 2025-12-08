import { useState } from 'react';
import { ComposedChart, Bar, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LabQAOverview() {
  const [selectedSite, setSelectedSite] = useState(null);

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
        { label: 'Reports Verified', value: 4005 },
        { label: 'Logbooks Verified', value: 1304 },
        { label: 'Equipment Calibration', value: 92 }
      ],
      monthlyData: [
        { month: 'Jul', reports: 1054, logbooks: 190, calibration: 7 },
        { month: 'Aug', reports: 809, logbooks: 268, calibration: 22 },
        { month: 'Sep', reports: 672, logbooks: 268, calibration: 18 },
        { month: 'Oct', reports: 658, logbooks: 289, calibration: 26 },
        { month: 'Nov', reports: 812, logbooks: 289, calibration: 19 }
      ],
      series: [
        { key: 'reports', name: 'Reports Verified', color: COLORS[0], type: 'bar' },
        { key: 'logbooks', name: 'Logbooks Verified', color: COLORS[1], type: 'bar' },
        { key: 'calibration', name: 'Equipment Calibration', color: COLORS[2], type: 'bar' }
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
        { label: 'Approved', value: 7374 },
        { label: 'Out of Specification (OOS)', value: 144 },
        { label: 'Approval Rate', value: '98.1%' }
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
        { key: 'approvedTotal', name: 'Approved', color: COLORS[3], type: 'line' },
        { key: 'oosTotal', name: 'OOS', color: '#ef4444', type: 'line' }
      ],
      testTypes: [
        { name: 'Incoming Materials', value: 2826, percentage: 37.6 },
        { name: 'Stability', value: 1054, percentage: 14.0 },
        { name: 'Raw Materials', value: 1356, percentage: 18.0 },
        { name: 'Truenat®', value: 1672, percentage: 22.2 },
        { name: 'Trueprep®', value: 466, percentage: 6.2 },
        { name: 'Out of Spec', value: 144, percentage: 1.9 }
      ]
    }
  ];

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
                    gridColumn: (site.name === 'SITE-I' && mIdx === 2) ? 'span 2' : 'auto'
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
