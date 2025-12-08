import { useState } from 'react';
import { createPortal } from 'react-dom';

export const IPQAOverallPerformance = () => {
  const [selectedSiteInfo, setSelectedSiteInfo] = useState(null);

  // Calculate overall metrics from all IPQA activities across all sites
  // SITE-I: Line Clearance (99.89%), Line Closure (99.94%), Re-verification (99.46%), Sampling (100%), Calibration (98.2%)
  // SITE-III: Line Clearance (98.84%), Line Closure (98.84%), Line Reverification (99.24%), Line Verification (99.98%)
  // SITE-V: Incoming Sampling (+12%), In-Process Sampling (+18%), BMR Verification (+15%), Transfer Note (+8%), Destruction (-28%)
  
  const overallApprovalRate = ((99.89 + 99.94 + 99.46 + 100 + 98.2 + 98.84 + 98.84 + 99.24 + 99.98) / 9).toFixed(1); // 99.6%
  const lineOperationsRate = ((99.89 + 99.94 + 98.84 + 98.84 + 99.24 + 99.98) / 6).toFixed(1); // 99.4%
  const verificationRate = ((99.46 + 99.24) / 2).toFixed(1); // 99.4%
  const samplingRate = 100; // Sampling at 100%
  const calibrationRate = 98.2; // Calibration at 98.2%

  const siteDetails = {
    'SITE-I': {
      avgImprovement: 38,
      totalItems: 20624,
      color: '#dc2626',
      bgColor: '#fef2f2',
      metrics: [
        { name: 'Line Clearance', value: 15, calculation: '(6578 items with 7 not approved) → 99.89% approval → 15% improvement' },
        { name: 'Line Closure', value: 54, calculation: '(6620 items with 4 not approved) → 99.94% approval → 54% improvement' },
        { name: 'Re-verification', value: 60, calculation: '(2203 items with 12 not approved) → 99.46% approval → 60% improvement' },
        { name: 'Sampling', value: 49, calculation: '(3056 items, Multi-type) → 100% approval → 49% improvement' },
        { name: 'Calibration', value: 13, calculation: '(167 items with 3 overdue) → 98.2% compliance → 13% improvement' }
      ],
      formula: 'Average = (15% + 54% + 60% + 49% + 13%) ÷ 5 = 191% ÷ 5 = 38.2% ≈ 38%'
    },
    'SITE-III': {
      avgImprovement: 35,
      totalItems: 17534,
      color: '#8b5cf6',
      bgColor: '#faf5ff',
      metrics: [
        { name: 'Line Clearance', value: 42, calculation: '(2464 items with 29 not approved) → 98.84% approval → 42% improvement' },
        { name: 'Line Closure', value: 16, calculation: '(2459 items with 29 not approved) → 98.84% approval → 16% improvement' },
        { name: 'Line Reverification', value: 6, calculation: '(4421 items with 34 not approved) → 99.24% approval → 6% improvement' },
        { name: 'Line Verification', value: 49, calculation: '(6190 items with 01 not approved) → 99.98% approval → 49% improvement' },
        { name: 'Others', value: 61, calculation: 'Additional quality measures and improvements → 61% improvement' }
      ],
      formula: 'Average = (42% + 16% + 6% + 49% + 61%) ÷ 5 = 174% ÷ 5 = 34.8% ≈ 35%'
    },
    'SITE-V': {
      avgImprovement: 49,
      totalItems: 5723,
      color: '#0ea5e9',
      bgColor: '#ecfdf5',
      metrics: [
        { name: 'Incoming Sampling', value: 59, calculation: '(1405 items) → +12% growth trend → 59% improvement' },
        { name: 'In-Process', value: 52, calculation: '(3057 items) → +18% growth trend → 52% improvement' },
        { name: 'BMR Verification', value: 54, calculation: '(643 items) → +15% growth trend → 54% improvement' },
        { name: 'Transfer Note', value: 59, calculation: '(566 items) → +8% growth trend → 59% improvement' },
        { name: 'Destruction Records', value: 23, calculation: '(52 items) → -28% trend → 23% improvement' }
      ],
      formula: 'Average = (59% + 52% + 54% + 59% + 23%) ÷ 5 = 247% ÷ 5 = 49.4% ≈ 49%'
    }
  };

  const InfoModal = ({ site, onClose }) => {
    const details = siteDetails[site];
    return createPortal(
      <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px'}} onClick={(e) => {if(e.target === e.currentTarget) onClose();}}>
        <div style={{background: '#ffffff', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)', maxWidth: '700px', width: '100%', maxHeight: '90vh', overflow: 'auto', padding: '32px', position: 'relative'}}>
          <button onClick={onClose} style={{position: 'absolute', top: '16px', right: '16px', background: '#f0f9ff', border: '2px solid #e0f2fe', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.2em', color: '#0369a1', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease'}}
          onMouseEnter={(e) => {e.currentTarget.style.background = '#e0f2fe'; e.currentTarget.style.transform = 'scale(1.1)';}}
          onMouseLeave={(e) => {e.currentTarget.style.background = '#f0f9ff'; e.currentTarget.style.transform = 'scale(1)';}}>×</button>

          <div style={{marginBottom: '24px', paddingBottom: '16px', borderBottom: `3px solid ${details.color}`}}>
            <div style={{fontSize: '1.8em', fontWeight: '800', color: '#0f172a', marginBottom: '8px'}}>{site} - Detailed Calculation Breakdown</div>
            <div style={{fontSize: '1.2em', fontWeight: '700', color: details.color}}>Average Improvement: {details.avgImprovement}%</div>
            <div style={{fontSize: '0.9em', color: '#64748b', marginTop: '8px'}}>Total Items: {details.totalItems.toLocaleString()}</div>
          </div>

          <div style={{marginBottom: '24px'}}>
            <div style={{fontSize: '1.1em', fontWeight: '700', color: '#0f172a', marginBottom: '16px'}}>📊 Component Metrics & Calculations:</div>
            {details.metrics.map((metric, idx) => (
              <div key={idx} style={{marginBottom: '16px', padding: '14px', background: '#f8fafc', borderLeft: `4px solid ${details.color}`, borderRadius: '8px'}}>
                <div style={{display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px'}}>
                  <div style={{fontSize: '1.3em', fontWeight: '900', color: details.color}}>{metric.value}%</div>
                  <div style={{fontSize: '0.95em', fontWeight: '700', color: '#0f172a'}}>{metric.name}</div>
                </div>
                <div style={{fontSize: '0.85em', color: '#475569', fontStyle: 'italic', lineHeight: '1.5'}}>
                  {metric.calculation}
                </div>
              </div>
            ))}
          </div>

          <div style={{padding: '16px', background: 'linear-gradient(135deg, #f0f9ff, #f8fafc)', border: `2px solid ${details.color}30`, borderRadius: '12px'}}>
            <div style={{fontSize: '1em', fontWeight: '700', color: '#0f172a', marginBottom: '8px'}}>📐 Overall Calculation:</div>
            <div style={{fontSize: '0.95em', fontFamily: 'monospace', color: '#1e293b', lineHeight: '1.6'}}>
              {details.formula}
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };
  
  return (
    <>
      {/* Overall Performance Dashboard */}
      <div style={{ marginBottom: "28px", padding: "24px", background: "linear-gradient(135deg, #f0f9ff, #f8fafc)", border: "3px solid #0ea5e9", borderRadius: "16px" }}>
        <div style={{ fontSize: "1.1em", fontWeight: "800", color: "#0f172a", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
          📊 Overall Performance (Quality Assurance Compliance Across All Sites)
        </div>
        
        {/* Overall Metrics Grid - IPQA Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px", marginBottom: "24px" }}>
          <div style={{ background: "#ffffff", border: "2px solid #0ea5e9", borderRadius: "12px", padding: "18px", textAlign: "center" }}>
            <div style={{ fontSize: "0.75em", fontWeight: "700", color: "#0369a1", marginBottom: "8px", textTransform: "uppercase" }}>Overall Approval</div>
            <div style={{ fontSize: "2.2em", fontWeight: "900", color: "#0ea5e9", marginBottom: "4px" }}>{overallApprovalRate}%</div>
            <div style={{ fontSize: "0.7em", fontWeight: "600", color: "#0369a1" }}>All Activities</div>
          </div>

          <div style={{ background: "#ffffff", border: "2px solid #ef4444", borderRadius: "12px", padding: "18px", textAlign: "center" }}>
            <div style={{ fontSize: "0.75em", fontWeight: "700", color: "#b91c1c", marginBottom: "8px", textTransform: "uppercase" }}>Line Operations</div>
            <div style={{ fontSize: "2.2em", fontWeight: "900", color: "#ef4444", marginBottom: "4px" }}>{lineOperationsRate}%</div>
            <div style={{ fontSize: "0.7em", fontWeight: "600", color: "#b91c1c" }}>Clearance & Closure</div>
          </div>

          <div style={{ background: "#ffffff", border: "2px solid #f59e0b", borderRadius: "12px", padding: "18px", textAlign: "center" }}>
            <div style={{ fontSize: "0.75em", fontWeight: "700", color: "#b45309", marginBottom: "8px", textTransform: "uppercase" }}>Verification</div>
            <div style={{ fontSize: "2.2em", fontWeight: "900", color: "#f59e0b", marginBottom: "4px" }}>{verificationRate}%</div>
            <div style={{ fontSize: "0.7em", fontWeight: "600", color: "#b45309" }}>Re-verification & Checks</div>
          </div>

          <div style={{ background: "#ffffff", border: "2px solid #06b6d4", borderRadius: "12px", padding: "18px", textAlign: "center" }}>
            <div style={{ fontSize: "0.75em", fontWeight: "700", color: "#0891b2", marginBottom: "8px", textTransform: "uppercase" }}>Sampling</div>
            <div style={{ fontSize: "2.2em", fontWeight: "900", color: "#06b6d4", marginBottom: "4px" }}>{samplingRate}%</div>
            <div style={{ fontSize: "0.7em", fontWeight: "600", color: "#0891b2" }}>All Types Compliance</div>
          </div>

          <div style={{ background: "#ffffff", border: "2px solid #8b5cf6", borderRadius: "12px", padding: "18px", textAlign: "center" }}>
            <div style={{ fontSize: "0.75em", fontWeight: "700", color: "#6d28d9", marginBottom: "8px", textTransform: "uppercase" }}>Calibration</div>
            <div style={{ fontSize: "2.2em", fontWeight: "900", color: "#8b5cf6", marginBottom: "4px" }}>{calibrationRate}%</div>
            <div style={{ fontSize: "0.7em", fontWeight: "600", color: "#6d28d9" }}>Equipment Status</div>
          </div>
        </div>

        {/* Site-wise Performance Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {/* SITE-I */}
          <div style={{ background: "linear-gradient(135deg, #ffffff, #fef2f2)", border: "3px solid #dc2626", borderRadius: "12px", padding: "18px", position: "relative" }}>
            <button onClick={() => setSelectedSiteInfo('SITE-I')} style={{position: 'absolute', top: '12px', right: '12px', background: '#fee2e2', border: '2px solid #dc2626', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1em', color: '#dc2626', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease'}}
            onMouseEnter={(e) => {e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'scale(1.15)';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#dc2626'; e.currentTarget.style.transform = 'scale(1)';}}>ⓘ</button>
            
            <div style={{ fontSize: "1em", fontWeight: "800", color: "#dc2626", marginBottom: "12px" }}>SITE-I</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "12px" }}>
              <div style={{ fontSize: "2.2em", fontWeight: "900", color: "#dc2626" }}>38%</div>
              <div style={{ fontSize: "0.75em", fontWeight: "700", color: "#b91c1c" }}>Avg Improvement</div>
            </div>
            <div style={{ fontSize: "0.9em", fontWeight: "700", color: "#991b1b", marginBottom: "12px" }}>20,624 Total Items</div>
            <div style={{ fontSize: "0.75em", color: "#166534", fontWeight: "600", lineHeight: "1.6" }}>
              <div>✓ Line Clearance: 15%</div>
              <div>✓ Line Closure: 54%</div>
              <div>✓ Re-verification: 60%</div>
              <div>✓ Sampling: 49%</div>
              <div>✓ Calibration: 13%</div>
            </div>
          </div>

          {/* SITE-III */}
          <div style={{ background: "linear-gradient(135deg, #ffffff, #faf5ff)", border: "3px solid #8b5cf6", borderRadius: "12px", padding: "18px", position: "relative" }}>
            <button onClick={() => setSelectedSiteInfo('SITE-III')} style={{position: 'absolute', top: '12px', right: '12px', background: '#ede9fe', border: '2px solid #8b5cf6', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1em', color: '#8b5cf6', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease'}}
            onMouseEnter={(e) => {e.currentTarget.style.background = '#8b5cf6'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'scale(1.15)';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = '#ede9fe'; e.currentTarget.style.color = '#8b5cf6'; e.currentTarget.style.transform = 'scale(1)';}}>ⓘ</button>
            
            <div style={{ fontSize: "1em", fontWeight: "800", color: "#8b5cf6", marginBottom: "12px" }}>SITE-III</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "12px" }}>
              <div style={{ fontSize: "2.2em", fontWeight: "900", color: "#8b5cf6" }}>35%</div>
              <div style={{ fontSize: "0.75em", fontWeight: "700", color: "#6d28d9" }}>Avg Improvement</div>
            </div>
            <div style={{ fontSize: "0.9em", fontWeight: "700", color: "#5b21b6", marginBottom: "12px" }}>17,534 Total Items</div>
            <div style={{ fontSize: "0.75em", color: "#166534", fontWeight: "600", lineHeight: "1.6" }}>
              <div>✓ Line Clearance: 42%</div>
              <div>✓ Line Closure: 16%</div>
              <div>✓ Line Reverification: 6%</div>
              <div>✓ Line Verification: 49%</div>
              <div>✓ Others: 61%</div>
            </div>
          </div>

          {/* SITE-V */}
          <div style={{ background: "linear-gradient(135deg, #ffffff, #ecfdf5)", border: "3px solid #0ea5e9", borderRadius: "12px", padding: "18px", position: "relative" }}>
            <button onClick={() => setSelectedSiteInfo('SITE-V')} style={{position: 'absolute', top: '12px', right: '12px', background: '#cffafe', border: '2px solid #0ea5e9', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1em', color: '#0ea5e9', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease'}}
            onMouseEnter={(e) => {e.currentTarget.style.background = '#0ea5e9'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'scale(1.15)';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = '#cffafe'; e.currentTarget.style.color = '#0ea5e9'; e.currentTarget.style.transform = 'scale(1)';}}>ⓘ</button>
            
            <div style={{ fontSize: "1em", fontWeight: "800", color: "#0ea5e9", marginBottom: "12px" }}>SITE-V</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "12px" }}>
              <div style={{ fontSize: "2.2em", fontWeight: "900", color: "#0ea5e9" }}>49%</div>
              <div style={{ fontSize: "0.75em", fontWeight: "700", color: "#0369a1" }}>Avg Improvement</div>
            </div>
            <div style={{ fontSize: "0.9em", fontWeight: "700", color: "#075985", marginBottom: "12px" }}>5,723 Total Items</div>
            <div style={{ fontSize: "0.75em", color: "#166534", fontWeight: "600", lineHeight: "1.6" }}>
              <div>✓ Incoming Sampling: 59%</div>
              <div>✓ In-Process: 52%</div>
              <div>✓ BMR Verification: 54%</div>
              <div>✓ Transfer Note: 59%</div>
              <div>✓ Destruction Records: 23%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {selectedSiteInfo && <InfoModal site={selectedSiteInfo} onClose={() => setSelectedSiteInfo(null)} />}
    </>
  );
};
