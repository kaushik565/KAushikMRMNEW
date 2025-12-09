import React from 'react';
import { createPortal } from 'react-dom';

/**
 * Site3KPIInfoModal - Displays detailed KPI information for SITE-III metrics
 * @param {string} kpiInfo - The KPI to display (e.g., 'Overall IPQA Approval')
 * @param {function} onClose - Callback when modal closes
 */
export function Site3KPIInfoModal({ kpiInfo, onClose }) {
  if (!kpiInfo) return null;

  const kpiDetails = {
    'Overall IPQA Approval': {
      title: 'Overall IPQA Approval Rate',
      calculation: '15,534 approved ÷ 15,627 total operations × 100 = 99.2%',
      details: [
        'Total Operations: 15,627',
        'Approved: 15,534',
        'Not Approved/Observations: 93',
        'Improvement: +0.3% from previous period'
      ]
    },
    'Incident Investigation Speed': {
      title: 'Incident Investigation Speed',
      calculation: 'Average investigation time reduced from 25 days to 4 days',
      details: [
        'Previous Average: 25 days',
        'Current Average: 4 days',
        'Reduction: 21 days (84% improvement)',
        'Calculation: ((25-4)/25) × 100 = 84% reduction'
      ]
    },
    'Rejection Rate': {
      title: 'Rejection Rate',
      calculation: 'Rejection rate decreased from 4.0% to 2.5%',
      details: [
        'Previous Rate: 4.0%',
        'Current Rate: 2.5%',
        'Improvement: 1.5 percentage points',
        'Target: <2% (moving towards target)',
        'Formula: (Not Approved / Total Operations) × 100'
      ]
    },
    'Sampling Coverage': {
      title: 'Sampling Coverage',
      calculation: '98.5% of lots sampled with 99% pass rate',
      details: [
        'Total Lots Sampled: 1,400+',
        'Coverage Rate: 98.5%',
        'Pass Rate: 99%',
        'Critical Defects: Zero',
        'Quality Indicator: Excellent'
      ]
    }
  };

  const details = kpiDetails[kpiInfo];
  if (!details) return null;

  return createPortal(
    <div onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      padding: '20px'
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: 'linear-gradient(135deg, #ffffff, #f9fafb)',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        border: '3px solid #8b5cf6',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          fontSize: '1.2em',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }} onMouseEnter={(e) => {e.target.style.background = '#dc2626'; e.target.style.transform = 'scale(1.1)';}} onMouseLeave={(e) => {e.target.style.background = '#ef4444'; e.target.style.transform = 'scale(1)';}}>
          ×
        </button>

        <div style={{marginBottom: '24px'}}>
          <h3 style={{
            fontSize: '1.4em',
            fontWeight: '800',
            color: '#8b5cf6',
            marginBottom: '8px',
            marginTop: 0
          }}>{details.title}</h3>
          <div style={{height: '3px', background: 'linear-gradient(90deg, #8b5cf6, #6d28d9)', width: '80px', borderRadius: '2px'}}></div>
        </div>

        <div style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #8b5cf6',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{fontSize: '0.75em', fontWeight: '700', color: '#6d28d9', textTransform: 'uppercase', marginBottom: '8px'}}>Calculation</div>
          <div style={{fontSize: '0.95em', fontWeight: '600', color: '#1f2937'}}>{details.calculation}</div>
        </div>

        <div style={{
          background: '#fefce8',
          borderRadius: '8px',
          padding: '16px',
          border: '2px solid #fde047'
        }}>
          <div style={{fontSize: '0.75em', fontWeight: '700', color: '#854d0e', textTransform: 'uppercase', marginBottom: '12px'}}>Details</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {details.details.map((detail, index) => (
              <div key={index} style={{
                fontSize: '0.85em',
                color: '#422006',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{width: '6px', height: '6px', background: '#8b5cf6', borderRadius: '50%'}}></div>
                {detail}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/**
 * QualityScoreInfoModal - Displays quality score calculation and metrics for each site
 * @param {string} site - The site name (e.g., 'SITE-I', 'SITE-III', 'SITE-V')
 * @param {function} onClose - Callback when modal closes
 */
export function QualityScoreInfoModal({ site, onClose }) {
  if (!site) return null;

  const qualityScoreDetails = {
    'SITE-I': {
      title: 'SITE-I Quality Score Calculation',
      color: '#dc2626',
      currentScore: '99.6%',
      previousScore: '99.2%',
      calculation: '(Compliant Operations ÷ Total Operations) × 100',
      details: [
        'Total Operations Reviewed: 12,850',
        'Compliant Operations: 12,799',
        'Non-Compliant: 51',
        'Current Score: (12,799 ÷ 12,850) × 100 = 99.6%',
        'Previous Score: 99.2% (3 months ago)',
        'Improvement: +0.4 percentage points'
      ],
      metrics: [
        'BMR Verification: 99.8% compliance',
        'Line Clearance: 99.5% compliance',
        'Sampling Coverage: 99.4% compliance',
        'Documentation Quality: 99.7% compliance'
      ]
    },
    'SITE-III': {
      title: 'SITE-III Quality Score Calculation',
      color: '#8b5cf6',
      currentScore: '99.2%',
      previousScore: '98.9%',
      calculation: '(Approved IPQA Activities ÷ Total IPQA Activities) × 100',
      details: [
        'Total IPQA Activities: 15,627',
        'Approved Activities: 15,534',
        'Not Approved/Observations: 93',
        'Current Score: (15,534 ÷ 15,627) × 100 = 99.2%',
        'Previous Score: 98.9% (3 months ago)',
        'Improvement: +0.3 percentage points'
      ],
      metrics: [
        'Line Clearance: 99.4% approval',
        'Line Closure: 99.1% approval',
        'Line Verification: 99.0% approval',
        'Line Reverification: 99.3% approval'
      ]
    },
    'SITE-V': {
      title: 'SITE-V Quality Score Calculation',
      color: '#0ea5e9',
      currentScore: '98.8%',
      previousScore: '98.3%',
      calculation: '(Quality-Compliant Lots ÷ Total Lots Processed) × 100',
      details: [
        'Total Lots Processed: 1,450',
        'Quality-Compliant Lots: 1,433',
        'Non-Compliant Lots: 17',
        'Current Score: (1,433 ÷ 1,450) × 100 = 98.8%',
        'Previous Score: 98.3% (3 months ago)',
        'Improvement: +0.5 percentage points'
      ],
      metrics: [
        'Incoming Sampling: 99.1% compliance',
        'In-Process Sampling: 98.7% compliance',
        'BMR Verification: 98.5% compliance',
        'Transfer Note Verification: 99.0% compliance'
      ]
    }
  };

  const details = qualityScoreDetails[site];
  if (!details) return null;

  return createPortal(
    <div onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      padding: '20px'
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: 'linear-gradient(135deg, #ffffff, #f9fafb)',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '85vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        border: `3px solid ${details.color}`,
        position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          fontSize: '1.2em',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }} onMouseEnter={(e) => {e.target.style.background = '#dc2626'; e.target.style.transform = 'scale(1.1)';}} onMouseLeave={(e) => {e.target.style.background = '#ef4444'; e.target.style.transform = 'scale(1)';}}>
          ×
        </button>

        <div style={{marginBottom: '24px'}}>
          <h3 style={{
            fontSize: '1.5em',
            fontWeight: '800',
            color: details.color,
            marginBottom: '8px',
            marginTop: 0
          }}>{details.title}</h3>
          <div style={{height: '3px', background: `linear-gradient(90deg, ${details.color}, ${details.color}dd)`, width: '100px', borderRadius: '2px'}}></div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            background: '#f0f9ff',
            borderRadius: '12px',
            padding: '16px',
            border: `2px solid ${details.color}30`,
            textAlign: 'center'
          }}>
            <div style={{fontSize: '0.7em', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px'}}>Previous Score</div>
            <div style={{fontSize: '2em', fontWeight: '900', color: '#94a3b8'}}>{details.previousScore}</div>
          </div>
          <div style={{
            background: `${details.color}10`,
            borderRadius: '12px',
            padding: '16px',
            border: `2px solid ${details.color}`,
            textAlign: 'center'
          }}>
            <div style={{fontSize: '0.7em', fontWeight: '700', color: '#1e293b', textTransform: 'uppercase', marginBottom: '8px'}}>Current Score</div>
            <div style={{fontSize: '2em', fontWeight: '900', color: details.color}}>{details.currentScore}</div>
          </div>
        </div>

        <div style={{
          background: '#f0f9ff',
          borderLeft: `4px solid ${details.color}`,
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{fontSize: '0.75em', fontWeight: '700', color: '#334155', textTransform: 'uppercase', marginBottom: '8px'}}>Formula</div>
          <div style={{fontSize: '1em', fontWeight: '600', color: '#1f2937', fontFamily: 'monospace', background: '#fff', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1'}}>
            {details.calculation}
          </div>
        </div>

        <div style={{
          background: '#fefce8',
          borderRadius: '8px',
          padding: '16px',
          border: '2px solid #fde047',
          marginBottom: '20px'
        }}>
          <div style={{fontSize: '0.75em', fontWeight: '700', color: '#854d0e', textTransform: 'uppercase', marginBottom: '12px'}}>Calculation Details</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {details.details.map((detail, index) => (
              <div key={index} style={{
                fontSize: '0.85em',
                color: '#422006',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{width: '6px', height: '6px', background: details.color, borderRadius: '50%'}}></div>
                {detail}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: '#f1f5f9',
          borderRadius: '8px',
          padding: '16px',
          border: '2px solid #cbd5e1'
        }}>
          <div style={{fontSize: '0.75em', fontWeight: '700', color: '#334155', textTransform: 'uppercase', marginBottom: '12px'}}>Key Quality Metrics</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {details.metrics.map((metric, index) => (
              <div key={index} style={{
                fontSize: '0.85em',
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'white',
                padding: '8px 12px',
                borderRadius: '6px'
              }}>
                <div style={{fontSize: '1.2em'}}>✓</div>
                {metric}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
