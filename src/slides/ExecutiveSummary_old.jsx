import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ExecutiveSummary() {
  // ===== COMPREHENSIVE DATA FOR ALL SITES =====
  
  // Site-wise comprehensive metrics
  const sitesData = [
    {
      site: 'SITE-I',
      icon: '🏢',
      color: '#dc2626',
      bgColor: '#fee2e2',
      qms: {
        incidents: 262,
        incidentReduction: 13,
        caTotal: 89,
        caAvgDays: 47,
        caImprovement: -42,
        paTotal: 29,
        paAvgDays: 62,
        paImprovement: 56,
        oosTotal: 259,
        oosDays: 21,
        oosImprovement: 49,
        ccTotal: 492,
        ccDays: 46,
        ccImprovement: 13,
        complianceScore: 96
      },
      ipqa: {
        lineClearance: 6578,
        lineClosure: 6620,
        reVerification: 2203,
        samplingTypes: 3056,
        calibration: 167,
        approvalRate: 99.89
      },
      labQA: {
        reportsVerified: 4005,
        reportsPassed: 3945,
        reportsFailed: 60,
        passRate: 98.5,
        logbooksVerified: 1304,
        equipmentCalibration: 92
      }
    },
    {
      site: 'SITE-III',
      icon: '🏭',
      color: '#8b5cf6',
      bgColor: '#ede9fe',
      qms: {
        incidents: 82,
        incidentReduction: 42,
        caTotal: 52,
        caAvgDays: 41,
        caImprovement: 16,
        paTotal: 66,
        paAvgDays: 58,
        paImprovement: 6,
        oosTotal: 159,
        oosDays: 14,
        oosImprovement: 49,
        ccTotal: 261,
        ccDays: 41,
        ccImprovement: 61,
        complianceScore: 94
      },
      ipqa: {
        lineClearance: 2464,
        lineClosure: 2459,
        lineReverification: 4421,
        lineVerification: 6190,
        approvalRate: 98.84
      },
      labQA: {
        reportsVerified: 8514,
        reportsPassed: 8291,
        reportsFailed: 223,
        passRate: 97.4
      }
    },
    {
      site: 'SITE-V',
      icon: '🔬',
      color: '#0ea5e9',
      bgColor: '#cffafe',
      qms: {
        incidents: 196,
        incidentReduction: 59,
        caTotal: 57,
        caAvgDays: 4,
        caImprovement: 71,
        paTotal: 41,
        paAvgDays: 32,
        paImprovement: 20,
        oosTotal: 89,
        oosDays: 12,
        oosImprovement: 59,
        ccTotal: 178,
        ccDays: 50,
        ccImprovement: 23,
        complianceScore: 92
      },
      ipqa: {
        incomingSampling: 1405,
        inProcessSampling: 3057,
        bmrVerification: 643,
        transferNoteVerif: 566,
        destructionRecords: 52,
        approvalRate: 98.2
      },
      labQA: {
        reportsVerified: 2845,
        reportsPassed: 2790,
        reportsFailed: 55,
        passRate: 98.2
      }
    }
  ];

  // Aggregate metrics for overall performance
  const aggregateMetrics = {
    totalIncidents: sitesData.reduce((sum, site) => sum + site.qms.incidents, 0),
    avgIncidentReduction: Math.round(sitesData.reduce((sum, site) => sum + site.qms.incidentReduction, 0) / sitesData.length),
    totalReportsVerified: sitesData.reduce((sum, site) => sum + site.labQA.reportsVerified, 0),
    avgPassRate: (sitesData.reduce((sum, site) => sum + site.labQA.passRate, 0) / sitesData.length).toFixed(1),
    totalIPQAActivities: sitesData[0].ipqa.lineClearance + sitesData[1].ipqa.lineClearance + sitesData[2].ipqa.incomingSampling + sitesData[2].ipqa.inProcessSampling,
    avgComplianceScore: Math.round(sitesData.reduce((sum, site) => sum + site.qms.complianceScore, 0) / sitesData.length)
  };

  // Comparison data for charts
  const complianceChartData = sitesData.map(site => ({
    name: site.site,
    compliance: site.qms.complianceScore,
    color: site.color
  }));

  const incidentReductionData = sitesData.map(site => ({
    name: site.site,
    reduction: site.qms.incidentReduction,
    color: site.color
  }));

  const passRateData = sitesData.map(site => ({
    name: site.site,
    passRate: site.labQA.passRate,
    color: site.color
  }));

  // Site-specific Jan-June vs July-Nov comparison data
  const improvementCategoriesData = [
    // SITE-I Data - From actual incident slides
    { category: 'SITE-I: Incident Closure', 'Jan-June': 19.9, 'July-Nov': 17.3 },
    { category: 'SITE-I: Investigation Days', 'Jan-June': 6.1, 'July-Nov': 5.8 },
    { category: 'SITE-I: CA Days', 'Jan-June': 47, 'July-Nov': 45 },
    { category: 'SITE-I: PA Days', 'Jan-June': 62, 'July-Nov': 60 },
    { category: 'SITE-I: OOS Days', 'Jan-June': 21, 'July-Nov': 19 },
    { category: 'SITE-I: CC Days', 'Jan-June': 46, 'July-Nov': 43 },
    
    // SITE-III Data (Main operational site) - From actual incident slides
    { category: 'SITE-III: Incident Closure', 'Jan-June': 24.6, 'July-Nov': 18 },
    { category: 'SITE-III: Investigation Days', 'Jan-June': 14.3, 'July-Nov': 4 },
    { category: 'SITE-III: CA Days', 'Jan-June': 51, 'July-Nov': 39.2 },
    { category: 'SITE-III: PA Days', 'Jan-June': 64, 'July-Nov': 55.5 },
    { category: 'SITE-III: OOS Days', 'Jan-June': 27, 'July-Nov': 17 },
    { category: 'SITE-III: CC Days', 'Jan-June': 41, 'July-Nov': 26.6 },
    
    // SITE-V Data - From actual incident slides
    { category: 'SITE-V: Incident Closure', 'Jan-June': 17.5, 'July-Nov': 14 },
    { category: 'SITE-V: Investigation Days', 'Jan-June': 4.2, 'July-Nov': 3.2 },
    { category: 'SITE-V: CA Days', 'Jan-June': 5, 'July-Nov': 4 },
    { category: 'SITE-V: PA Days', 'Jan-June': 28, 'July-Nov': 22 },
    { category: 'SITE-V: OOS Days', 'Jan-June': 18, 'July-Nov': 12 },
    { category: 'SITE-V: CC Days', 'Jan-June': 50, 'July-Nov': 33.2 }
  ];

  return (
    <section className="content-slide" style={{ userSelect: 'text', WebkitUserSelect: 'text', padding: '28px', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', overflow: 'auto', minHeight: '100vh' }}>
      
      {/* ===== TITLE ===== */}
      <div style={{ textAlign: 'center', marginBottom: '32px', background: 'linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)', borderRadius: '16px', padding: '24px 32px', color: '#ffffff', boxShadow: '0 10px 30px rgba(185,28,28,0.3)' }}>
        <h2 style={{ fontSize: '2.5em', fontWeight: '900', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
          Executive Summary – Management Review
        </h2>
        <div style={{ fontSize: '1.05em', color: '#f1f5f9', fontWeight: '600', letterSpacing: '0.5px' }}>
          Comprehensive Performance Across All Sites (SITE-I • SITE-III • SITE-V) | QMS • IPQA
        </div>
      </div>

      {/* ===== KEY METRICS CARDS ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px', marginBottom: '32px' }}>
        <div style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', borderRadius: '14px', padding: '18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(220,38,38,0.2)', border: '2px solid #fca5a5', transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>📊</div>
          <div style={{ fontSize: '2.2em', fontWeight: '900', color: '#dc2626' }}>{aggregateMetrics.totalIncidents}</div>
          <div style={{ fontSize: '0.9em', color: '#7f1d1d', fontWeight: '700', marginTop: '4px' }}>Total Incidents</div>
          <div style={{ fontSize: '0.8em', color: '#991b1b', marginTop: '6px', background: '#fef2f2', padding: '6px 10px', borderRadius: '6px', fontWeight: '700' }}>↓{aggregateMetrics.avgIncidentReduction}% Avg</div>
        </div>
        
        <div style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)', borderRadius: '14px', padding: '18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(139,92,246,0.2)', border: '2px solid #d8b4fe', transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>⚙️</div>
          <div style={{ fontSize: '2.2em', fontWeight: '900', color: '#8b5cf6' }}>{aggregateMetrics.avgComplianceScore}%</div>
          <div style={{ fontSize: '0.9em', color: '#5b21b6', fontWeight: '700', marginTop: '4px' }}>QMS Compliance</div>
          <div style={{ fontSize: '0.8em', color: '#6d28d9', marginTop: '6px', background: '#faf5ff', padding: '6px 10px', borderRadius: '6px', fontWeight: '700' }}>Average</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)', borderRadius: '14px', padding: '18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(14,165,233,0.2)', border: '2px solid #7dd3fc', transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>🧪</div>
          <div style={{ fontSize: '2.2em', fontWeight: '900', color: '#0ea5e9' }}>{(aggregateMetrics.totalIPQAActivities / 1000).toFixed(1)}K</div>
          <div style={{ fontSize: '0.9em', color: '#075985', fontWeight: '700', marginTop: '4px' }}>IPQA Activities</div>
          <div style={{ fontSize: '0.8em', color: '#0c4a6e', marginTop: '6px', background: '#ecf8ff', padding: '6px 10px', borderRadius: '6px', fontWeight: '700' }}>All Sites</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', borderRadius: '14px', padding: '18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(34,197,94,0.2)', border: '2px solid #86efac', transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>✅</div>
          <div style={{ fontSize: '2.2em', fontWeight: '900', color: '#22c55e' }}>QMS & IPQA</div>
          <div style={{ fontSize: '0.9em', color: '#166534', fontWeight: '700', marginTop: '4px' }}>Focus Areas</div>
          <div style={{ fontSize: '0.8em', color: '#14532d', marginTop: '6px', background: '#f0fdf4', padding: '6px 10px', borderRadius: '6px', fontWeight: '700' }}>Charts Only</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: '14px', padding: '18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(245,158,11,0.2)', border: '2px solid #fcd34d', transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>📈</div>
          <div style={{ fontSize: '2.2em', fontWeight: '900', color: '#f59e0b' }}>Incident</div>
          <div style={{ fontSize: '0.9em', color: '#92400e', fontWeight: '700', marginTop: '4px' }}>Reduction Data</div>
          <div style={{ fontSize: '0.8em', color: '#78350f', marginTop: '6px', background: '#fffbeb', padding: '6px 10px', borderRadius: '6px', fontWeight: '700' }}>Visual</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', borderRadius: '14px', padding: '18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(99,102,241,0.2)', border: '2px solid #a5b4fc', transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>🎯</div>
          <div style={{ fontSize: '2.2em', fontWeight: '900', color: '#6366f1' }}>3</div>
          <div style={{ fontSize: '0.9em', color: '#3730a3', fontWeight: '700', marginTop: '4px' }}>Active Sites</div>
          <div style={{ fontSize: '0.8em', color: '#312e81', marginTop: '6px', background: '#f0f4ff', padding: '6px 10px', borderRadius: '6px', fontWeight: '700' }}>Full Coverage</div>
        </div>
      </div>

      {/* ===== COMPARISON CHARTS ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginBottom: '28px' }}>
        
        {/* QMS Compliance Chart */}
        <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '14px', padding: '18px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', border: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '1.05em', fontWeight: '800', color: '#1e293b', marginBottom: '14px', textAlign: 'center', paddingBottom: '10px', borderBottom: '2px solid #cbd5e1' }}>
            📊 QMS Compliance Score (%)
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={complianceChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" style={{ fontSize: '0.85em' }} />
              <YAxis domain={[90, 100]} style={{ fontSize: '0.85em' }} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
              <Bar dataKey="compliance" radius={[10, 10, 0, 0]} animationDuration={800}>
                {complianceChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Incident Reduction Chart */}
        <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '14px', padding: '18px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', border: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '1.05em', fontWeight: '800', color: '#1e293b', marginBottom: '14px', textAlign: 'center', paddingBottom: '10px', borderBottom: '2px solid #cbd5e1' }}>
            📈 Incident Reduction (%)
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={incidentReductionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" style={{ fontSize: '0.85em' }} />
              <YAxis style={{ fontSize: '0.85em' }} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
              <Bar dataKey="reduction" radius={[10, 10, 0, 0]} animationDuration={800}>
                {incidentReductionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* IPQA Approval Rate Chart */}
        <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '14px', padding: '18px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', border: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '1.05em', fontWeight: '800', color: '#1e293b', marginBottom: '14px', textAlign: 'center', paddingBottom: '10px', borderBottom: '2px solid #cbd5e1' }}>
            🧪 IPQA Approval Rate (%)
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[
              { name: 'SITE-I', approval: 99.89, color: '#dc2626' },
              { name: 'SITE-III', approval: 98.84, color: '#8b5cf6' },
              { name: 'SITE-V', approval: 98.2, color: '#0ea5e9' }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" style={{ fontSize: '0.85em' }} />
              <YAxis domain={[97, 100]} style={{ fontSize: '0.85em' }} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
              <Bar dataKey="approval" radius={[10, 10, 0, 0]} animationDuration={800}>
                <Cell fill="#dc2626" />
                <Cell fill="#8b5cf6" />
                <Cell fill="#0ea5e9" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== QMS METRICS COMPARISON ===== */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '1.3em', fontWeight: '900', color: '#ffffff', marginBottom: '18px', textAlign: 'center', background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)', padding: '16px 24px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(3,105,161,0.3)', letterSpacing: '0.5px' }}>
          📊 QMS & IPQA Performance Analysis - All Sites
        </div>

        {/* QMS Metrics Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          {/* CA Days */}
          <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', border: '2px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.95em', fontWeight: '800', color: '#1e293b', marginBottom: '12px', textAlign: 'center', paddingBottom: '8px', borderBottom: '2px solid #cbd5e1' }}>
              🔧 CA Days Comparison
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { site: 'SITE-I', days: 47 },
                { site: 'SITE-III', days: 41 },
                { site: 'SITE-V', days: 4 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="site" style={{ fontSize: '0.85em' }} />
                <YAxis style={{ fontSize: '0.85em' }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                <Bar dataKey="days" radius={[8, 8, 0, 0]}>
                  <Cell fill="#dc2626" />
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#0ea5e9" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* PA Days */}
          <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', border: '2px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.95em', fontWeight: '800', color: '#1e293b', marginBottom: '12px', textAlign: 'center', paddingBottom: '8px', borderBottom: '2px solid #cbd5e1' }}>
              📋 PA Days Comparison
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { site: 'SITE-I', days: 62 },
                { site: 'SITE-III', days: 58 },
                { site: 'SITE-V', days: 32 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="site" style={{ fontSize: '0.85em' }} />
                <YAxis style={{ fontSize: '0.85em' }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                <Bar dataKey="days" radius={[8, 8, 0, 0]}>
                  <Cell fill="#dc2626" />
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#0ea5e9" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* OOS Days */}
          <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', border: '2px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.95em', fontWeight: '800', color: '#1e293b', marginBottom: '12px', textAlign: 'center', paddingBottom: '8px', borderBottom: '2px solid #cbd5e1' }}>
              ⏸️ OOS Days Comparison
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { site: 'SITE-I', days: 21 },
                { site: 'SITE-III', days: 14 },
                { site: 'SITE-V', days: 12 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="site" style={{ fontSize: '0.85em' }} />
                <YAxis style={{ fontSize: '0.85em' }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                <Bar dataKey="days" radius={[8, 8, 0, 0]}>
                  <Cell fill="#dc2626" />
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#0ea5e9" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CC Days & Incident Count */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* CC Days */}
          <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', border: '2px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.95em', fontWeight: '800', color: '#1e293b', marginBottom: '12px', textAlign: 'center', paddingBottom: '8px', borderBottom: '2px solid #cbd5e1' }}>
              ✏️ CC Days Comparison
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { site: 'SITE-I', days: 46 },
                { site: 'SITE-III', days: 41 },
                { site: 'SITE-V', days: 50 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="site" style={{ fontSize: '0.85em' }} />
                <YAxis style={{ fontSize: '0.85em' }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                <Bar dataKey="days" radius={[8, 8, 0, 0]}>
                  <Cell fill="#dc2626" />
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#0ea5e9" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Incident Count */}
          <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', border: '2px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.95em', fontWeight: '800', color: '#1e293b', marginBottom: '12px', textAlign: 'center', paddingBottom: '8px', borderBottom: '2px solid #cbd5e1' }}>
              📊 Total Incident Count
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { site: 'SITE-I', incidents: 262 },
                { site: 'SITE-III', incidents: 82 },
                { site: 'SITE-V', incidents: 196 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="site" style={{ fontSize: '0.85em' }} />
                <YAxis style={{ fontSize: '0.85em' }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                <Bar dataKey="incidents" radius={[8, 8, 0, 0]}>
                  <Cell fill="#dc2626" />
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#0ea5e9" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ===== IPQA ACTIVITIES COMPARISON ===== */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '1.3em', fontWeight: '900', color: '#ffffff', marginBottom: '18px', textAlign: 'center', background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)', padding: '16px 24px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(13,148,136,0.3)', letterSpacing: '0.5px' }}>
          🧪 IPQA Activities Overview - All Sites
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          {/* SITE-I IPQA */}
          <div style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%)', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 16px rgba(220,38,38,0.15)', border: '3px solid #dc2626' }}>
            <div style={{ fontSize: '1em', fontWeight: '900', color: '#dc2626', marginBottom: '12px', textAlign: 'center', paddingBottom: '8px', borderBottom: '2px solid #dc2626' }}>
              🏢 SITE-I IPQA
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { activity: 'Line Clear', value: 6578 },
                { activity: 'Line Close', value: 6620 },
                { activity: 'Re-Verif', value: 2203 }
              ]} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#fecaca" />
                <XAxis type="number" style={{ fontSize: '0.75em' }} />
                <YAxis dataKey="activity" type="category" style={{ fontSize: '0.75em' }} width={70} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                <Bar dataKey="value" fill="#dc2626" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* SITE-III IPQA */}
          <div style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 16px rgba(139,92,246,0.15)', border: '3px solid #8b5cf6' }}>
            <div style={{ fontSize: '1em', fontWeight: '900', color: '#8b5cf6', marginBottom: '12px', textAlign: 'center', paddingBottom: '8px', borderBottom: '2px solid #8b5cf6' }}>
              🏭 SITE-III IPQA
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { activity: 'Line Clear', value: 2464 },
                { activity: 'Line Verify', value: 6190 },
                { activity: 'Line Reverif', value: 4421 }
              ]} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd6fe" />
                <XAxis type="number" style={{ fontSize: '0.75em' }} />
                <YAxis dataKey="activity" type="category" style={{ fontSize: '0.75em' }} width={70} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* SITE-V IPQA */}
          <div style={{ background: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 16px rgba(14,165,233,0.15)', border: '3px solid #0ea5e9' }}>
            <div style={{ fontSize: '1em', fontWeight: '900', color: '#0ea5e9', marginBottom: '12px', textAlign: 'center', paddingBottom: '8px', borderBottom: '2px solid #0ea5e9' }}>
              🔬 SITE-V IPQA
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { activity: 'Incoming', value: 1405 },
                { activity: 'In-Process', value: 3057 },
                { activity: 'BMR Verif', value: 643 }
              ]} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#a5f3fc" />
                <XAxis type="number" style={{ fontSize: '0.75em' }} />
                <YAxis dataKey="activity" type="category" style={{ fontSize: '0.75em' }} width={70} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                <Bar dataKey="value" fill="#0ea5e9" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </section>
  );
}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px', marginBottom: '32px' }}>
        <div style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', borderRadius: '14px', padding: '18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(220,38,38,0.2)', border: '2px solid #fca5a5', transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>📊</div>
          <div style={{ fontSize: '2.2em', fontWeight: '900', color: '#dc2626' }}>{aggregateMetrics.totalIncidents}</div>
          <div style={{ fontSize: '0.9em', color: '#7f1d1d', fontWeight: '700', marginTop: '4px' }}>Total Incidents</div>
          <div style={{ fontSize: '0.8em', color: '#991b1b', marginTop: '6px', background: '#fef2f2', padding: '6px 10px', borderRadius: '6px', fontWeight: '700' }}>↓{aggregateMetrics.avgIncidentReduction}% Avg</div>
        </div>
        
        <div style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)', borderRadius: '14px', padding: '18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(139,92,246,0.2)', border: '2px solid #d8b4fe', transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>⚙️</div>
          <div style={{ fontSize: '2.2em', fontWeight: '900', color: '#8b5cf6' }}>{aggregateMetrics.avgComplianceScore}%</div>
          <div style={{ fontSize: '0.9em', color: '#5b21b6', fontWeight: '700', marginTop: '4px' }}>QMS Compliance</div>
          <div style={{ fontSize: '0.8em', color: '#6d28d9', marginTop: '6px', background: '#faf5ff', padding: '6px 10px', borderRadius: '6px', fontWeight: '700' }}>Average</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)', borderRadius: '14px', padding: '18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(14,165,233,0.2)', border: '2px solid #7dd3fc', transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>🧪</div>
          <div style={{ fontSize: '2.2em', fontWeight: '900', color: '#0ea5e9' }}>{(aggregateMetrics.totalIPQAActivities / 1000).toFixed(1)}K</div>
          <div style={{ fontSize: '0.9em', color: '#075985', fontWeight: '700', marginTop: '4px' }}>IPQA Activities</div>
          <div style={{ fontSize: '0.8em', color: '#0c4a6e', marginTop: '6px', background: '#ecf8ff', padding: '6px 10px', borderRadius: '6px', fontWeight: '700' }}>All Sites</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', borderRadius: '14px', padding: '18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(34,197,94,0.2)', border: '2px solid #86efac', transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>✅</div>
          <div style={{ fontSize: '2.2em', fontWeight: '900', color: '#22c55e' }}>{(aggregateMetrics.totalReportsVerified / 1000).toFixed(1)}K</div>
          <div style={{ fontSize: '0.9em', color: '#166534', fontWeight: '700', marginTop: '4px' }}>Lab Reports</div>
          <div style={{ fontSize: '0.8em', color: '#14532d', marginTop: '6px', background: '#f0fdf4', padding: '6px 10px', borderRadius: '6px', fontWeight: '700' }}>Verified</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: '14px', padding: '18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(245,158,11,0.2)', border: '2px solid #fcd34d', transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>📈</div>
          <div style={{ fontSize: '2.2em', fontWeight: '900', color: '#f59e0b' }}>{aggregateMetrics.avgPassRate}%</div>
          <div style={{ fontSize: '0.9em', color: '#92400e', fontWeight: '700', marginTop: '4px' }}>Lab Pass Rate</div>
          <div style={{ fontSize: '0.8em', color: '#78350f', marginTop: '6px', background: '#fffbeb', padding: '6px 10px', borderRadius: '6px', fontWeight: '700' }}>Average</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', borderRadius: '14px', padding: '18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(99,102,241,0.2)', border: '2px solid #a5b4fc', transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>🎯</div>
          <div style={{ fontSize: '2.2em', fontWeight: '900', color: '#6366f1' }}>3</div>
          <div style={{ fontSize: '0.9em', color: '#3730a3', fontWeight: '700', marginTop: '4px' }}>Active Sites</div>
          <div style={{ fontSize: '0.8em', color: '#312e81', marginTop: '6px', background: '#f0f4ff', padding: '6px 10px', borderRadius: '6px', fontWeight: '700' }}>Full Coverage</div>
        </div>
      </div>

      {/* ===== SITE-BY-SITE COMPREHENSIVE CARDS ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {sitesData.map((site, idx) => (
          <div key={idx} style={{ background: site.bgColor, borderRadius: '16px', padding: '22px', border: `4px solid ${site.color}`, boxShadow: `0 12px 32px ${site.color}40`, transition: 'all 0.3s ease' }}>
            <div style={{ fontSize: '1.5em', fontWeight: '900', color: site.color, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '12px', borderBottom: `3px solid ${site.color}` }}>
              <span style={{ fontSize: '1.4em' }}>{site.icon}</span>
              {site.site}
            </div>
            
            {/* QMS Section */}
            <div style={{ marginBottom: '14px', paddingBottom: '12px', borderBottom: `2px solid ${site.color}50` }}>
              <div style={{ fontSize: '0.95em', fontWeight: '800', color: site.color, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📋</span> QMS PERFORMANCE
              </div>
              <div style={{ fontSize: '0.78em', color: '#334155', lineHeight: '1.7', fontWeight: '500' }}>
                <div><strong>Compliance:</strong> <span style={{ background: `${site.color}20`, padding: '2px 8px', borderRadius: '4px' }}>{site.qms.complianceScore}%</span></div>
                <div><strong>Incidents:</strong> {site.qms.incidents} (↓{site.qms.incidentReduction}% reduction)</div>
                <div><strong>CA Avg Days:</strong> {site.qms.caAvgDays}d ({site.qms.caImprovement > 0 ? '↑' : '↓'}{Math.abs(site.qms.caImprovement)}%)</div>
                <div><strong>PA Avg Days:</strong> {site.qms.paAvgDays}d (↑{site.qms.paImprovement}%)</div>
                <div><strong>OOS Days:</strong> {site.qms.oosDays}d (↑{site.qms.oosImprovement}%)</div>
                <div><strong>CC Avg Days:</strong> {site.qms.ccDays}d (↑{site.qms.ccImprovement}%)</div>
              </div>
            </div>

            {/* IPQA Section */}
            <div style={{ marginBottom: '14px', paddingBottom: '12px', borderBottom: `2px solid ${site.color}50` }}>
              <div style={{ fontSize: '0.95em', fontWeight: '800', color: site.color, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🧪</span> IPQA ACTIVITIES
              </div>
              <div style={{ fontSize: '0.78em', color: '#334155', lineHeight: '1.7', fontWeight: '500' }}>
                {site.ipqa.lineClearance && <div><strong>Line Clearance:</strong> {site.ipqa.lineClearance}</div>}
                {site.ipqa.lineClosure && <div><strong>Line Closure:</strong> {site.ipqa.lineClosure}</div>}
                {site.ipqa.reVerification && <div><strong>Re-Verification:</strong> {site.ipqa.reVerification}</div>}
                {site.ipqa.lineReverification && <div><strong>Line Reverification:</strong> {site.ipqa.lineReverification}</div>}
                {site.ipqa.lineVerification && <div><strong>Line Verification:</strong> {site.ipqa.lineVerification}</div>}
                {site.ipqa.incomingSampling && <div><strong>Incoming Sampling:</strong> {site.ipqa.incomingSampling}</div>}
                {site.ipqa.inProcessSampling && <div><strong>In-Process Sampling:</strong> {site.ipqa.inProcessSampling}</div>}
                {site.ipqa.bmrVerification && <div><strong>BMR Verification:</strong> {site.ipqa.bmrVerification}</div>}
                <div><strong>Approval Rate:</strong> <span style={{ background: '#ecfdf5', padding: '2px 8px', borderRadius: '4px', fontWeight: '700', color: '#166534' }}>{site.ipqa.approvalRate}%</span></div>
              </div>
            </div>

            {/* Lab QA Section */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '0.95em', fontWeight: '800', color: site.color, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>✅</span> LAB QA QUALITY
              </div>
              <div style={{ fontSize: '0.78em', color: '#334155', lineHeight: '1.7', fontWeight: '500' }}>
                <div><strong>Reports Verified:</strong> {site.labQA.reportsVerified}</div>
                <div><strong>Pass Rate:</strong> <span style={{ background: '#ecfdf5', padding: '2px 8px', borderRadius: '4px', fontWeight: '700', color: '#166534' }}>{site.labQA.passRate}%</span></div>
                <div><strong>Passed:</strong> {site.labQA.reportsPassed}</div>
                <div><strong>Failed:</strong> {site.labQA.reportsFailed}</div>
                {site.labQA.logbooksVerified && <div><strong>Logbooks:</strong> {site.labQA.logbooksVerified}</div>}
              </div>
            </div>
            
            {/* Overall Improvement Badge */}
            <div style={{ marginTop: '14px', background: `${site.color}30`, borderRadius: '10px', padding: '12px', textAlign: 'center', border: `2px solid ${site.color}` }}>
              <div style={{ fontSize: '0.85em', fontWeight: '800', color: site.color }}>
                🎯 KEY ACHIEVEMENT: Incident Reduction ↓{site.qms.incidentReduction}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== COMPARISON CHARTS ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginBottom: '28px' }}>
        
        {/* QMS Compliance Chart */}
        <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '14px', padding: '18px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', border: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '1.05em', fontWeight: '800', color: '#1e293b', marginBottom: '14px', textAlign: 'center', paddingBottom: '10px', borderBottom: '2px solid #cbd5e1' }}>
            📊 QMS Compliance Score (%)
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={complianceChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" style={{ fontSize: '0.85em' }} />
              <YAxis domain={[90, 100]} style={{ fontSize: '0.85em' }} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
              <Bar dataKey="compliance" radius={[10, 10, 0, 0]} animationDuration={800}>
                {complianceChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Incident Reduction Chart */}
        <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '14px', padding: '18px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', border: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '1.05em', fontWeight: '800', color: '#1e293b', marginBottom: '14px', textAlign: 'center', paddingBottom: '10px', borderBottom: '2px solid #cbd5e1' }}>
            📈 Incident Reduction (%)
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={incidentReductionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" style={{ fontSize: '0.85em' }} />
              <YAxis style={{ fontSize: '0.85em' }} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
              <Bar dataKey="reduction" radius={[10, 10, 0, 0]} animationDuration={800}>
                {incidentReductionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lab QA Pass Rate Chart */}
        <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '14px', padding: '18px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', border: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '1.05em', fontWeight: '800', color: '#1e293b', marginBottom: '14px', textAlign: 'center', paddingBottom: '10px', borderBottom: '2px solid #cbd5e1' }}>
            ✅ Lab QA Pass Rate (%)
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={passRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" style={{ fontSize: '0.85em' }} />
              <YAxis domain={[96, 100]} style={{ fontSize: '0.85em' }} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
              <Bar dataKey="passRate" radius={[10, 10, 0, 0]} animationDuration={800}>
                {passRateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== IMPROVEMENT CATEGORIES COMPARISON - LINE CHART WITH TRENDS ===== */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '1.3em', fontWeight: '900', color: '#ffffff', marginBottom: '20px', textAlign: 'center', background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)', padding: '16px 24px', borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(3,105,161,0.3)', letterSpacing: '0.5px' }}>
          📊 Jan-June Baseline vs July-Nov Performance: All Sites Comprehensive Analysis
        </div>
        
        {/* SITE-I Performance Charts */}
        <div style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%)', borderRadius: '16px', padding: '22px', marginBottom: '20px', border: '4px solid #dc2626', boxShadow: '0 8px 28px rgba(220,38,38,0.25)' }}>
          <div style={{ fontSize: '1.25em', fontWeight: '900', color: '#dc2626', marginBottom: '16px', textAlign: 'center', borderBottom: '3px solid #dc2626', paddingBottom: '12px', letterSpacing: '0.5px' }}>
            🏢 SITE-I: Comprehensive Performance Analysis
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Incident Metrics Line Chart */}
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: '2px solid #fecaca', transition: 'all 0.3s ease' }}>
              <div style={{ fontSize: '0.95em', fontWeight: '800', color: '#1e293b', marginBottom: '12px', textAlign: 'center', paddingBottom: '8px', borderBottom: '2px solid #e5e7eb' }}>
                📊 Incident Management Days
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={[
                  { period: 'Jan-June', Closure: 19.9, Investigation: 6.1 },
                  { period: 'July-Nov', Closure: 17.3, Investigation: 5.8 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="period" style={{ fontSize: '0.85em' }} />
                  <YAxis style={{ fontSize: '0.85em' }} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                  <Legend wrapperStyle={{ fontSize: '0.85em', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="Closure" stroke="#dc2626" strokeWidth={3} dot={{ fill: '#dc2626', r: 6 }} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Investigation" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 6 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', gap: '8px' }}>
                <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', padding: '8px 12px', borderRadius: '8px', flex: 1, border: '2px solid #16a34a' }}>
                  <span style={{ fontSize: '0.8em', fontWeight: '800', color: '#16a34a' }}>↓13% Closure</span>
                </div>
                <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', padding: '8px 12px', borderRadius: '8px', flex: 1, border: '2px solid #16a34a' }}>
                  <span style={{ fontSize: '0.8em', fontWeight: '800', color: '#16a34a' }}>↓5% Investigation</span>
                </div>
              </div>
            </div>

            {/* CA & PA Days Line Chart */}
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: '2px solid #fecaca', transition: 'all 0.3s ease' }}>
              <div style={{ fontSize: '0.95em', fontWeight: '800', color: '#1e293b', marginBottom: '12px', textAlign: 'center', paddingBottom: '8px', borderBottom: '2px solid #e5e7eb' }}>
                🔧 Corrective & Preventive Action Days
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={[
                  { period: 'Jan-June', CA: 47, PA: 62 },
                  { period: 'July-Nov', CA: 45, PA: 60 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="period" style={{ fontSize: '0.85em' }} />
                  <YAxis style={{ fontSize: '0.85em' }} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                  <Legend wrapperStyle={{ fontSize: '0.85em', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="CA" stroke="#0ea5e9" strokeWidth={3} dot={{ fill: '#0ea5e9', r: 6 }} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="PA" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 6 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', gap: '8px' }}>
                <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', padding: '8px 12px', borderRadius: '8px', flex: 1, border: '2px solid #16a34a' }}>
                  <span style={{ fontSize: '0.8em', fontWeight: '800', color: '#16a34a' }}>↓4% CA</span>
                </div>
                <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', padding: '8px 12px', borderRadius: '8px', flex: 1, border: '2px solid #16a34a' }}>
                  <span style={{ fontSize: '0.8em', fontWeight: '800', color: '#16a34a' }}>↓3% PA</span>
                </div>
              </div>
            </div>
          </div>

          {/* OOS & CC Days Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: '2px solid #fecaca', transition: 'all 0.3s ease' }}>
              <div style={{ fontSize: '0.95em', fontWeight: '800', color: '#1e293b', marginBottom: '12px', textAlign: 'center', paddingBottom: '8px', borderBottom: '2px solid #e5e7eb' }}>
                ⏸️ Out of Service (OOS) Days
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={[
                  { period: 'Jan-June', Days: 21 },
                  { period: 'July-Nov', Days: 19 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="period" style={{ fontSize: '0.85em' }} />
                  <YAxis style={{ fontSize: '0.85em' }} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                  <Bar dataKey="Days" radius={[10, 10, 0, 0]} animationDuration={800}>
                    <Cell fill="#dc2626" />
                    <Cell fill="#16a34a" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ textAlign: 'center', marginTop: '10px', background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', padding: '8px 12px', borderRadius: '8px', border: '2px solid #16a34a' }}>
                <span style={{ fontSize: '0.8em', fontWeight: '800', color: '#16a34a' }}>↓ 10% Improvement</span>
              </div>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: '2px solid #fecaca', transition: 'all 0.3s ease' }}>
              <div style={{ fontSize: '0.95em', fontWeight: '800', color: '#1e293b', marginBottom: '12px', textAlign: 'center', paddingBottom: '8px', borderBottom: '2px solid #e5e7eb' }}>
                ✏️ Change Control (CC) Days
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={[
                  { period: 'Jan-June', Days: 46 },
                  { period: 'July-Nov', Days: 43 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="period" style={{ fontSize: '0.85em' }} />
                  <YAxis style={{ fontSize: '0.85em' }} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                  <Bar dataKey="Days" radius={[10, 10, 0, 0]} animationDuration={800}>
                    <Cell fill="#dc2626" />
                    <Cell fill="#16a34a" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ textAlign: 'center', marginTop: '10px', background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', padding: '8px 12px', borderRadius: '8px', border: '2px solid #16a34a' }}>
                <span style={{ fontSize: '0.8em', fontWeight: '800', color: '#16a34a' }}>↓ 7% Improvement</span>
              </div>
            </div>
          </div>
        </div>

        {/* SITE-III Performance Charts */}
        <div style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)', borderRadius: '16px', padding: '22px', marginBottom: '20px', border: '4px solid #8b5cf6', boxShadow: '0 8px 28px rgba(139,92,246,0.25)' }}>
          <div style={{ fontSize: '1.25em', fontWeight: '900', color: '#8b5cf6', marginBottom: '16px', textAlign: 'center', borderBottom: '3px solid #8b5cf6', paddingBottom: '12px', letterSpacing: '0.5px' }}>
            🏭 SITE-III: Main Production Site - Comprehensive Time-Series Analysis
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            {/* Incident Metrics Line Chart */}
            <div style={{ background: '#ffffff', borderRadius: '10px', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '0.9em', fontWeight: '700', color: '#0f172a', marginBottom: '10px', textAlign: 'center' }}>
                Incident Management Days
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={[
                  { period: 'Jan-June', Closure: 24.6, Investigation: 14.3 },
                  { period: 'July-Nov', Closure: 18, Investigation: 4 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="period" style={{ fontSize: '0.85em' }} />
                  <YAxis style={{ fontSize: '0.85em' }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '0.85em' }} />
                  <Line type="monotone" dataKey="Closure" stroke="#dc2626" strokeWidth={3} dot={{ fill: '#dc2626', r: 6 }} />
                  <Line type="monotone" dataKey="Investigation" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '8px' }}>
                <div style={{ textAlign: 'center', background: '#dcfce7', padding: '6px 12px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.75em', fontWeight: '700', color: '#16a34a' }}>Closure: ↓26.8%</span>
                </div>
                <div style={{ textAlign: 'center', background: '#dcfce7', padding: '6px 12px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.75em', fontWeight: '700', color: '#16a34a' }}>Investigation: ↓72%</span>
                </div>
              </div>
            </div>

            {/* CA & PA Days Line Chart */}
            <div style={{ background: '#ffffff', borderRadius: '10px', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '0.9em', fontWeight: '700', color: '#0f172a', marginBottom: '10px', textAlign: 'center' }}>
                Corrective & Preventive Action Days
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={[
                  { period: 'Jan-June', CA: 51, PA: 64 },
                  { period: 'July-Nov', CA: 39.2, PA: 55.5 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="period" style={{ fontSize: '0.85em' }} />
                  <YAxis style={{ fontSize: '0.85em' }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '0.85em' }} />
                  <Line type="monotone" dataKey="CA" stroke="#0ea5e9" strokeWidth={3} dot={{ fill: '#0ea5e9', r: 6 }} />
                  <Line type="monotone" dataKey="PA" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '8px' }}>
                <div style={{ textAlign: 'center', background: '#dcfce7', padding: '6px 12px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.75em', fontWeight: '700', color: '#16a34a' }}>CA: ↓23.1%</span>
                </div>
                <div style={{ textAlign: 'center', background: '#dcfce7', padding: '6px 12px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.75em', fontWeight: '700', color: '#16a34a' }}>PA: ↓13.3%</span>
                </div>
              </div>
            </div>
          </div>

          {/* OOS Days Area Chart */}
          <div style={{ background: '#ffffff', borderRadius: '10px', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '0.9em', fontWeight: '700', color: '#0f172a', marginBottom: '10px', textAlign: 'center' }}>
              Out of Service (OOS) & Change Control (CC) Days
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={[
                { metric: 'OOS Days', 'Jan-June': 27, 'July-Nov': 17 },
                { metric: 'CC Days', 'Jan-June': 41, 'July-Nov': 26.6 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="metric" style={{ fontSize: '0.85em' }} />
                <YAxis style={{ fontSize: '0.85em' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '0.85em' }} />
                <Bar dataKey="Jan-June" fill="#dc2626" radius={[4, 4, 0, 0]} />
                <Bar dataKey="July-Nov" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
              <div style={{ textAlign: 'center', background: '#dcfce7', padding: '8px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.85em', fontWeight: '800', color: '#16a34a' }}>OOS: ↓ 37% (10 days)</span>
              </div>
              <div style={{ textAlign: 'center', background: '#dcfce7', padding: '8px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.85em', fontWeight: '800', color: '#16a34a' }}>CC: ↓ 35% (14.4 days)</span>
              </div>
            </div>
          </div>
        </div>

        {/* SITE-V Performance Chart */}
        <div style={{ background: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)', borderRadius: '16px', padding: '22px', border: '4px solid #0ea5e9', boxShadow: '0 8px 28px rgba(14,165,233,0.25)' }}>
          <div style={{ fontSize: '1.25em', fontWeight: '900', color: '#0ea5e9', marginBottom: '16px', textAlign: 'center', borderBottom: '3px solid #0ea5e9', paddingBottom: '12px', letterSpacing: '0.5px' }}>
            🔬 SITE-V: Comprehensive Performance Analysis
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            {/* Incident Management Line Chart */}
            <div style={{ background: '#ffffff', borderRadius: '10px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '0.95em', fontWeight: '700', color: '#0f172a', marginBottom: '10px', textAlign: 'center' }}>
                Incident Management Days
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={[
                  { period: 'Jan-June', Closure: 17.5, Investigation: 4.2 },
                  { period: 'July-Nov', Closure: 14, Investigation: 3.2 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="period" style={{ fontSize: '0.85em' }} />
                  <YAxis style={{ fontSize: '0.85em' }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '0.85em' }} />
                  <Line type="monotone" dataKey="Closure" stroke="#e11d48" strokeWidth={3} dot={{ fill: '#e11d48', r: 6 }} />
                  <Line type="monotone" dataKey="Investigation" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '8px' }}>
                <div style={{ textAlign: 'center', background: '#dcfce7', padding: '6px 12px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.75em', fontWeight: '700', color: '#16a34a' }}>Closure: ↓20%</span>
                </div>
                <div style={{ textAlign: 'center', background: '#dcfce7', padding: '6px 12px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.75em', fontWeight: '700', color: '#16a34a' }}>Investigation: ↓24%</span>
                </div>
              </div>
            </div>

            {/* CA & PA Days Line Chart */}
            <div style={{ background: '#ffffff', borderRadius: '10px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '0.95em', fontWeight: '700', color: '#0f172a', marginBottom: '10px', textAlign: 'center' }}>
                Corrective & Preventive Action Days
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={[
                  { period: 'Jan-June', CA: 5, PA: 28 },
                  { period: 'July-Nov', CA: 4, PA: 22 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="period" style={{ fontSize: '0.85em' }} />
                  <YAxis style={{ fontSize: '0.85em' }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '0.85em' }} />
                  <Line type="monotone" dataKey="CA" stroke="#0ea5e9" strokeWidth={3} dot={{ fill: '#0ea5e9', r: 6 }} />
                  <Line type="monotone" dataKey="PA" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '8px' }}>
                <div style={{ textAlign: 'center', background: '#dcfce7', padding: '6px 12px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.75em', fontWeight: '700', color: '#16a34a' }}>CA: ↓20%</span>
                </div>
                <div style={{ textAlign: 'center', background: '#dcfce7', padding: '6px 12px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.75em', fontWeight: '700', color: '#16a34a' }}>PA: ↓21%</span>
                </div>
              </div>
            </div>
          </div>

          {/* OOS and CC Days Comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {/* OOS Days Bar Chart */}
            <div style={{ background: '#ffffff', borderRadius: '10px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '0.95em', fontWeight: '700', color: '#0f172a', marginBottom: '10px', textAlign: 'center' }}>
                Out of Service (OOS) Days
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={[
                  { metric: 'Jan-June', Days: 18 },
                  { metric: 'July-Nov', Days: 12 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="metric" style={{ fontSize: '0.9em' }} />
                  <YAxis style={{ fontSize: '0.9em' }} />
                  <Tooltip />
                  <Bar dataKey="Days" radius={[10, 10, 0, 0]}>
                    <Cell fill="#e11d48" />
                    <Cell fill="#16a34a" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ textAlign: 'center', marginTop: '10px', background: '#dcfce7', padding: '8px', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.85em', fontWeight: '800', color: '#16a34a' }}>↓ 33% Improvement (6 days reduction)</span>
              </div>
            </div>

            {/* Change Control Bar Chart */}
            <div style={{ background: '#ffffff', borderRadius: '10px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '0.95em', fontWeight: '700', color: '#0f172a', marginBottom: '10px', textAlign: 'center' }}>
                Change Control (CC) Closure Days
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={[
                  { metric: 'Jan-June\nBaseline', Days: 50 },
                  { metric: 'July-Nov\nAverage', Days: 33.2 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="metric" style={{ fontSize: '0.9em' }} />
                  <YAxis style={{ fontSize: '0.9em' }} domain={[0, 60]} />
                  <Tooltip />
                  <Bar dataKey="Days" radius={[10, 10, 0, 0]}>
                    <Cell fill="#e11d48" />
                    <Cell fill="#16a34a" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ textAlign: 'center', marginTop: '10px', background: '#dcfce7', padding: '8px', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.85em', fontWeight: '800', color: '#16a34a' }}>↓ 33.6% Improvement (16.8 days reduction)</span>
              </div>
            </div>
          </div>
        </div>
      </div>



    </section>
  );
}
