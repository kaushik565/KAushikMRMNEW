import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Text } from 'recharts';

export default function ExecutiveSummary() {
  
  // QMS CLOSURE DAYS DATA - Before (Jan-Jun) vs After (Jul-Nov)
  const qmsClosureDaysData = {
    'SITE-I': {
      incidents: { before: 20, after: 17, improvement: 13 },
      ca: { before: 2, after: 4, improvement: -100 },
      pa: { before: 25, after: 11, improvement: 56 },
      oos: { before: 21, after: 17, improvement: 19 },
      cc: { before: 46, after: 40, improvement: 13 }
    },
    'SITE-III': {
      incidents: { before: 24, after: 14, improvement: 42 },
      ca: { before: 56, after: 47, improvement: 16 },
      pa: { before: 36, after: 34, improvement: 6 },
      oos: { before: 14, after: 9, improvement: 36 },
      cc: { before: 41, after: 16, improvement: 61 }
    },
    'SITE-V': {
      incidents: { before: 17, after: 7, improvement: 59 },
      ca: { before: 5, after: 4, improvement: 20 },
      pa: { before: 40, after: 32, improvement: 20 },
      oos: { before: 12, after: 7, improvement: 42 },
      cc: { before: 50, after: 39, improvement: 22 }
    }
  };

  // IPQA DATA - Activities and Performance
  const ipqaData = {
    'SITE-I': {
      lineClearance: { total: 6578, approved: 6571, rate: 99.89 },
      lineClosure: { total: 6620, approved: 6616, rate: 99.94 },
      reVerification: { total: 2203, approved: 2191, rate: 99.46 },
      avgTimeReduction: 18
    },
    'SITE-III': {
      lineClearance: { total: 2464, approved: 2435, rate: 98.84 },
      lineClosure: { total: 2459, approved: 2430, rate: 98.84 },
      lineReverification: { total: 4421, approved: 4387, rate: 99.24 },
      lineVerification: { total: 6190, approved: 6189, rate: 99.98 },
      avgTimeReduction: 22
    },
    'SITE-V': {
      incomingSampling: { total: 1405, trend: 12 },
      inProcessSampling: { total: 3057, trend: 18 },
      bmrVerification: { total: 643, trend: 15 },
      avgTimeReduction: 25
    }
  };

  const totalIncidents = 262 + 82 + 196;
  const avgIncidentReduction = Math.round((15 + 42 + 59) / 3);
  const totalIPQAActivities = 6578 + 6620 + 2203 + 2464 + 2459 + 4421 + 6190 + 1405 + 3057 + 643;
  const avgQMSCompliance = 94;
  const avgIPQAApproval = 99;

  const closureDaysComparisonData = [
    {
      category: 'Incidents',
      'SITE-I Before': 20, 'SITE-I After': 17,
      'SITE-III Before': 24, 'SITE-III After': 14,
      'SITE-V Before': 17, 'SITE-V After': 7
    },
    {
      category: 'CA',
      'SITE-I Before': 2, 'SITE-I After': 4,
      'SITE-III Before': 56, 'SITE-III After': 47,
      'SITE-V Before': 5, 'SITE-V After': 4
    },
    {
      category: 'PA',
      'SITE-I Before': 25, 'SITE-I After': 11,
      'SITE-III Before': 36, 'SITE-III After': 34,
      'SITE-V Before': 40, 'SITE-V After': 32
    },
    {
      category: 'OOS',
      'SITE-I Before': 21, 'SITE-I After': 17,
      'SITE-III Before': 14, 'SITE-III After': 9,
      'SITE-V Before': 12, 'SITE-V After': 7
    },
    {
      category: 'CC',
      'SITE-I Before': 46, 'SITE-I After': 40,
      'SITE-III Before': 41, 'SITE-III After': 16,
      'SITE-V Before': 50, 'SITE-V After': 39
    }
  ];

  const improvementByCategory = [
    { category: 'Incidents', 'SITE-I': 13, 'SITE-III': 42, 'SITE-V': 59 },
    { category: 'CA', 'SITE-I': -100, 'SITE-III': 16, 'SITE-V': 20 },
    { category: 'PA', 'SITE-I': 56, 'SITE-III': 6, 'SITE-V': 20 },
    { category: 'OOS', 'SITE-I': 19, 'SITE-III': 36, 'SITE-V': 42 },
    { category: 'CC', 'SITE-I': 13, 'SITE-III': 61, 'SITE-V': 22 }
  ];

  const trendData = [
    { month: 'Jan', incidents: 85, ca: 151, pa: 180 },
    { month: 'Feb', incidents: 82, ca: 148, pa: 175 },
    { month: 'Mar', incidents: 79, ca: 145, pa: 172 },
    { month: 'Apr', incidents: 75, ca: 140, pa: 168 },
    { month: 'May', incidents: 71, ca: 135, pa: 165 },
    { month: 'Jun', incidents: 68, ca: 130, pa: 162 },
    { month: 'Jul', incidents: 58, ca: 115, pa: 155 },
    { month: 'Aug', incidents: 52, ca: 105, pa: 152 },
    { month: 'Sep', incidents: 45, ca: 95, pa: 150 },
    { month: 'Oct', incidents: 41, ca: 90, pa: 148 },
    { month: 'Nov', incidents: 38, ca: 88, pa: 145 }
  ];

  const ipqaPerformanceData = [
    { site: 'SITE-I', 'Approval Rate': 99.76, activities: 15401 },
    { site: 'SITE-III', 'Approval Rate': 99.23, activities: 15534 },
    { site: 'SITE-V', 'Approval Rate': 98.50, activities: 5105 }
  ];

  // Custom tick component for multi-line radar chart labels
  const CustomTick = ({ payload, x, y, textAnchor, stroke, radius }) => {
    const lines = payload.value.split('\n');
    const lineHeight = 15;
    const startY = y - ((lines.length - 1) * lineHeight) / 2;

    return (
      <g className="recharts-layer recharts-polar-angle-axis-tick">
        <text
          x={x}
          y={startY}
          textAnchor={textAnchor}
          fill={stroke}
          fontSize="11px"
          fontWeight="500"
        >
          {lines.map((line, index) => (
            <tspan x={x} dy={index === 0 ? 0 : lineHeight} key={index}>
              {line}
            </tspan>
          ))}
        </text>
      </g>
    );
  };

  // Radar Chart Data - Overall Performance Metrics (Combined QMS + IPQA Insights)
  // Focus on meaningful improvements and key performance indicators
  
  const radarDataSiteI = [
    { metric: 'QMS Overall\nPerformance', value: 88, fullMark: 100 },
    { metric: 'IPQA\nApproval Rate', value: 99.76, fullMark: 100 },
    { metric: 'Compliance\nScore', value: 94, fullMark: 100 },
    { metric: 'Closure Time\nReduction', value: 78, fullMark: 100 },
    { metric: 'Quality\nIndex', value: 92, fullMark: 100 },
    { metric: 'Process\nEfficiency', value: 85, fullMark: 100 }
  ];

  const radarDataSiteIII = [
    { metric: 'QMS Overall\nPerformance', value: 93, fullMark: 100 },
    { metric: 'IPQA\nApproval Rate', value: 99.23, fullMark: 100 },
    { metric: 'Compliance\nScore', value: 98, fullMark: 100 },
    { metric: 'Rejection Rate\nReduction', value: 97.5, fullMark: 100 },
    { metric: 'Quality\nIndex', value: 96, fullMark: 100 },
    { metric: 'Process\nEfficiency', value: 91, fullMark: 100 }
  ];

  const radarDataSiteV = [
    { metric: 'QMS Overall\nPerformance', value: 95, fullMark: 100 },
    { metric: 'IPQA\nApproval Rate', value: 98.50, fullMark: 100 },
    { metric: 'Compliance\nScore', value: 96, fullMark: 100 },
    { metric: 'Incident\nReduction', value: 94, fullMark: 100 },
    { metric: 'Quality\nIndex', value: 97, fullMark: 100 },
    { metric: 'Process\nEfficiency', value: 89, fullMark: 100 }
  ];

  const siteColors = {
    'SITE-I': '#dc2626',
    'SITE-III': '#8b5cf6',
    'SITE-V': '#0ea5e9'
  };

  return (
    <section className="content-slide" style={{ 
      padding: '32px 40px', 
      background: '#ffffff',
      minHeight: '100vh',
      color: '#1e293b'
    }}>
      
      {/* HEADER */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '28px',
        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        padding: '22px 32px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(220,38,38,0.15)',
        border: '2px solid #dc2626'
      }}>
        <h2 style={{ 
          fontSize: '2.2em', 
          fontWeight: '900', 
          margin: '0 0 8px 0',
          color: '#ffffff',
          letterSpacing: '-0.5px'
        }}>
          🎯 Executive Summary - Management Review
        </h2>
        <div style={{ 
          fontSize: '0.95em', 
          fontWeight: '600',
          color: '#fef2f2',
          letterSpacing: '0.3px'
        }}>
          QMS & IPQA Performance Analysis | Before (Jan-Jun) vs After (Jul-Nov) | All Sites Improvement
        </div>
      </div>

      {/* MAIN COMPARISON SECTION */}
      
      {/* Before vs After Closure Days - FULL WIDTH */}
      <div style={{ 
        background: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '2px solid #e2e8f0',
        marginBottom: '22px'
      }}>
          <div style={{ 
            fontSize: '1.2em', 
            fontWeight: '800', 
            color: '#1e293b',
            marginBottom: '14px',
            textAlign: 'center',
            paddingBottom: '10px',
            borderBottom: '3px solid #dc2626'
          }}>
            📊 QMS Closure Days - Before vs After Comparison
          </div>
          <div style={{ 
            fontSize: '0.82em', 
            color: '#64748b',
            textAlign: 'center',
            marginBottom: '14px',
            fontWeight: '600'
          }}>
            Before: Jan-Jun 2025 | After: Jul-Nov 2025
          </div>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={closureDaysComparisonData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="category" stroke="#64748b" style={{ fontSize: '0.85em', fontWeight: '600' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '0.85em' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '0.75em', fontWeight: '600' }} />
              <Bar dataKey="SITE-I Before" fill="#fca5a5" />
              <Bar dataKey="SITE-I After" fill="#dc2626" />
              <Bar dataKey="SITE-III Before" fill="#d8b4fe" />
              <Bar dataKey="SITE-III After" fill="#8b5cf6" />
              <Bar dataKey="SITE-V Before" fill="#7dd3fc" />
              <Bar dataKey="SITE-V After" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      {/* Improvement % by Category - FULL WIDTH */}
      <div style={{ 
        background: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '2px solid #e2e8f0',
        marginBottom: '22px'
      }}>
          <div style={{ 
            fontSize: '1.2em', 
            fontWeight: '800', 
            color: '#1e293b',
            marginBottom: '14px',
            textAlign: 'center',
            paddingBottom: '10px',
            borderBottom: '3px solid #22c55e'
          }}>
            📈 Improvement % by QMS Category
          </div>
          <div style={{ 
            fontSize: '0.82em', 
            color: '#64748b',
            textAlign: 'center',
            marginBottom: '14px',
            fontWeight: '600'
          }}>
            Percentage Reduction in Closure Days
          </div>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={improvementByCategory} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="category" stroke="#64748b" style={{ fontSize: '0.85em', fontWeight: '600' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '0.85em' }} label={{ value: 'Improvement %', angle: -90, position: 'insideLeft', fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '0.75em', fontWeight: '600' }} />
              <Bar dataKey="SITE-I" fill="#dc2626" />
              <Bar dataKey="SITE-III" fill="#8b5cf6" />
              <Bar dataKey="SITE-V" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      {/* TREND ANALYSIS */}
      <div style={{ 
        background: '#ffffff',
        padding: '22px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '2px solid #e2e8f0',
        marginBottom: '22px'
      }}>
        <div style={{ 
          fontSize: '1.2em', 
          fontWeight: '800', 
          color: '#1e293b',
          marginBottom: '14px',
          textAlign: 'center',
          paddingBottom: '10px',
          borderBottom: '3px solid #3b82f6'
        }}>
          📉 Monthly Trend Analysis - Closure Days Reduction (All Sites Combined)
        </div>
        <div style={{ 
          fontSize: '0.82em', 
          color: '#64748b',
          textAlign: 'center',
          marginBottom: '14px',
          fontWeight: '600'
        }}>
          Continuous improvement trend from Jan to Nov 2025
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '0.85em', fontWeight: '600' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '0.85em' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '0.8em', fontWeight: '600' }} />
            <Area type="monotone" dataKey="incidents" fill="#fecaca" stroke="#dc2626" strokeWidth={2} name="Incidents (days)" />
            <Line type="monotone" dataKey="ca" stroke="#8b5cf6" strokeWidth={3} name="CA (days)" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="pa" stroke="#0ea5e9" strokeWidth={3} name="PA (days)" dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* RADAR CHART - PERFORMANCE OVERVIEW */}
      <div style={{ 
        background: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '2px solid #e2e8f0',
        marginBottom: '22px'
      }}>
        <div style={{ 
          fontSize: '1.3em', 
          fontWeight: '800', 
          color: '#1e293b',
          marginBottom: '18px',
          textAlign: 'center',
          paddingBottom: '12px',
          borderBottom: '3px solid #f59e0b'
        }}>
          🎯 Overall Performance Excellence - Key Improvement Indicators
        </div>
        <div style={{ 
          fontSize: '0.85em', 
          color: '#64748b',
          textAlign: 'center',
          marginBottom: '20px',
          fontWeight: '600'
        }}>
          Comprehensive View: QMS Overall + IPQA Quality + Compliance + Efficiency Metrics
        </div>

        {/* Three Radar Charts Side by Side */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '20px',
          marginTop: '16px'
        }}>
          
          {/* SITE-I Radar */}
          <div style={{ 
            background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
            padding: '18px',
            borderRadius: '10px',
            border: '3px solid #dc2626',
            boxShadow: '0 4px 10px rgba(220,38,38,0.2)'
          }}>
            <div style={{ 
              fontSize: '1.15em', 
              fontWeight: '900', 
              color: '#dc2626',
              marginBottom: '20px',
              textAlign: 'center',
              borderBottom: '2px solid #fecaca',
              paddingBottom: '8px'
            }}>
              SITE-I Excellence Profile
            </div>
            <ResponsiveContainer width="100%" height={450}>
              <RadarChart data={radarDataSiteI} margin={{ top: 50, right: 65, bottom: 40, left: 65 }}>
                <PolarGrid stroke="#fecaca" strokeWidth={1.5} />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={<CustomTick stroke="#7f1d1d" />}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#991b1b', fontSize: '0.5em' }}
                  tickCount={5}
                />
                <Radar 
                  name="SITE-I" 
                  dataKey="value" 
                  stroke="#dc2626" 
                  fill="#dc2626" 
                  fillOpacity={0.5}
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#dc2626', strokeWidth: 2, stroke: '#ffffff' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '2px solid #dc2626',
                    borderRadius: '8px',
                    fontSize: '0.8em',
                    fontWeight: '700'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ 
              fontSize: '0.7em', 
              color: '#7f1d1d',
              textAlign: 'center',
              marginTop: '8px',
              fontWeight: '700',
              background: '#fee2e2',
              padding: '8px',
              borderRadius: '6px'
            }}>
              <div>🏆 <strong>Top Metric:</strong> IPQA Approval (99.76%)</div>
              <div style={{ marginTop: '4px' }}>📊 <strong>Strength:</strong> Compliance Score (94%)</div>
            </div>
          </div>

          {/* SITE-III Radar */}
          <div style={{ 
            background: 'linear-gradient(135deg, #faf5ff 0%, #ffffff 100%)',
            padding: '18px',
            borderRadius: '10px',
            border: '3px solid #8b5cf6',
            boxShadow: '0 4px 10px rgba(139,92,246,0.2)'
          }}>
            <div style={{ 
              fontSize: '1.15em', 
              fontWeight: '900', 
              color: '#8b5cf6',
              marginBottom: '20px',
              textAlign: 'center',
              borderBottom: '2px solid #ddd6fe',
              paddingBottom: '8px'
            }}>
              SITE-III Excellence Profile
            </div>
            <ResponsiveContainer width="100%" height={450}>
              <RadarChart data={radarDataSiteIII} margin={{ top: 50, right: 65, bottom: 40, left: 65 }}>
                <PolarGrid stroke="#c7d2fe" strokeWidth={1.5} />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={<CustomTick stroke="#3730a3" />}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#6b21a8', fontSize: '0.5em' }}
                  tickCount={5}
                />
                <Radar 
                  name="SITE-III" 
                  dataKey="value" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.5}
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#8b5cf6', strokeWidth: 2, stroke: '#ffffff' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '2px solid #8b5cf6',
                    borderRadius: '8px',
                    fontSize: '0.8em',
                    fontWeight: '700'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ 
              fontSize: '0.7em', 
              color: '#5b21b6',
              textAlign: 'center',
              marginTop: '8px',
              fontWeight: '700',
              background: '#ede9fe',
              padding: '8px',
              borderRadius: '6px'
            }}>
              <div>🌟 <strong>Outstanding:</strong> Rejections Reduced to 2.5%</div>
              <div style={{ marginTop: '4px' }}>💎 <strong>Leader:</strong> Compliance Score (98%)</div>
            </div>
          </div>

          {/* SITE-V Radar */}
          <div style={{ 
            background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
            padding: '18px',
            borderRadius: '10px',
            border: '3px solid #0ea5e9',
            boxShadow: '0 4px 10px rgba(14,165,233,0.2)'
          }}>
            <div style={{ 
              fontSize: '1.15em', 
              fontWeight: '900', 
              color: '#0284c7',
              marginBottom: '20px',
              textAlign: 'center',
              borderBottom: '2px solid #bfdbfe',
              paddingBottom: '8px'
            }}>
              SITE-V Excellence Profile
            </div>
            <ResponsiveContainer width="100%" height={450}>
              <RadarChart data={radarDataSiteV} margin={{ top: 50, right: 65, bottom: 40, left: 65 }}>
                <PolarGrid stroke="#bae6fd" strokeWidth={1.5} />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={<CustomTick stroke="#075985" />}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#0369a1', fontSize: '0.5em' }}
                  tickCount={5}
                />
                <Radar 
                  name="SITE-V" 
                  dataKey="value" 
                  stroke="#0ea5e9" 
                  fill="#0ea5e9" 
                  fillOpacity={0.5}
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#0ea5e9', strokeWidth: 2, stroke: '#ffffff' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '2px solid #0ea5e9',
                    borderRadius: '8px',
                    fontSize: '0.8em',
                    fontWeight: '700'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ 
              fontSize: '0.7em', 
              color: '#075985',
              textAlign: 'center',
              marginTop: '8px',
              fontWeight: '700',
              background: '#cffafe',
              padding: '8px',
              borderRadius: '6px'
            }}>
              <div>⚡ <strong>Best-in-Class:</strong> QMS Performance (95%)</div>
              <div style={{ marginTop: '4px' }}>🎯 <strong>Excellence:</strong> Incident Reduction (94%)</div>
            </div>
          </div>

        </div>

      </div>

      {/* SITE-WISE DETAILED COMPARISON */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '16px',
        marginBottom: '22px'
      }}>
        {Object.entries(qmsClosureDaysData).map(([site, data]) => (
          <div key={site} style={{ 
            background: '#ffffff',
            padding: '18px',
            borderRadius: '12px',
            border: `3px solid ${siteColors[site]}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ 
              fontSize: '1.2em', 
              fontWeight: '900', 
              color: siteColors[site],
              marginBottom: '14px',
              textAlign: 'center',
              paddingBottom: '8px',
              borderBottom: `2px solid ${siteColors[site]}`
            }}>
              {site}
            </div>
            
            {Object.entries(data).map(([category, values]) => (
              <div key={category} style={{ 
                background: '#f8fafc',
                padding: '10px 14px',
                borderRadius: '8px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #e2e8f0'
              }}>
                <div>
                  <div style={{ fontSize: '0.85em', fontWeight: '700', color: '#1e293b', textTransform: 'uppercase' }}>
                    {category}
                  </div>
                  <div style={{ fontSize: '0.75em', color: '#64748b', marginTop: '2px' }}>
                    {values.before} → {values.after} days
                  </div>
                </div>
                <div style={{ 
                  background: values.improvement > 0 ? '#22c55e' : '#94a3b8',
                  color: '#ffffff',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '0.9em',
                  fontWeight: '900',
                  minWidth: '50px',
                  textAlign: 'center'
                }}>
                  {values.improvement > 0 ? '↓' : ''}{values.improvement}%
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* IPQA PERFORMANCE */}
      <div style={{ 
        background: '#ffffff',
        padding: '22px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '2px solid #e2e8f0'
      }}>
        <div style={{ 
          fontSize: '1.2em', 
          fontWeight: '800', 
          color: '#1e293b',
          marginBottom: '14px',
          textAlign: 'center',
          paddingBottom: '10px',
          borderBottom: '3px solid #14b8a6'
        }}>
          🧪 IPQA Performance - Approval Rates & Activity Volume
        </div>
        <div style={{ 
          fontSize: '0.82em', 
          color: '#64748b',
          textAlign: 'center',
          marginBottom: '14px',
          fontWeight: '600'
        }}>
          High approval rates maintained across all sites with significant activity volume
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={ipqaPerformanceData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="site" stroke="#64748b" style={{ fontSize: '0.9em', fontWeight: '600' }} />
            <YAxis yAxisId="left" stroke="#64748b" style={{ fontSize: '0.85em' }} domain={[97, 100]} label={{ value: 'Approval %', angle: -90, position: 'insideLeft', fill: '#64748b' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#64748b" style={{ fontSize: '0.85em' }} label={{ value: 'Activities', angle: 90, position: 'insideRight', fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '0.8em', fontWeight: '600' }} />
            <Bar yAxisId="right" dataKey="activities" fill="#14b8a6" name="Total Activities">
              <Cell fill="#dc2626" />
              <Cell fill="#8b5cf6" />
              <Cell fill="#0ea5e9" />
            </Bar>
            <Line yAxisId="left" type="monotone" dataKey="Approval Rate" stroke="#22c55e" strokeWidth={4} name="Approval Rate %" dot={{ r: 6, fill: '#22c55e' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

    </section>
  );
}
