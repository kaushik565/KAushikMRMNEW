// IPQA Key Metrics Overview - Modern Horizontal Layout
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SiteVIncomingSampling from './ipqa-details/SiteVIncomingSampling';
import SiteVInProcessSampling from './ipqa-details/SiteVInProcessSampling';
import SiteVBMRVerification from './ipqa-details/SiteVBMRVerification';
import SiteVTransferNoteVerification from './ipqa-details/SiteVTransferNoteVerification';
import SiteVDestructionRecords from './ipqa-details/SiteVDestructionRecords';
import SiteIIILineClearance from './ipqa-details/SiteIIILineClearance';
import SiteIIILineClosure from './ipqa-details/SiteIIILineClosure';
import SiteIIILineReverification from './ipqa-details/SiteIIILineReverification';
import SiteIIILineVerification from './ipqa-details/SiteIIILineVerification';
import SiteISection from './ipqa-details/SiteISection';
import { IPQAOverallPerformance } from '../components/IPQAOverallPerformance';

export default function IPQAOverview() {
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [expandedActivity, setExpandedActivity] = useState(null);
  const [selectedDeptChart, setSelectedDeptChart] = useState(null);
  const [selectedCartridgeChart, setSelectedCartridgeChart] = useState(null);
  const [selectedManufacturingChart, setSelectedManufacturingChart] = useState(null);
  const [selectedSite3Chart, setSelectedSite3Chart] = useState(null);
  const [selectedSiteIChart, setSelectedSiteIChart] = useState(null);
  const [selectedSite3KPIInfo, setSelectedSite3KPIInfo] = useState(null);
  const [selectedQualityScoreInfo, setSelectedQualityScoreInfo] = useState(null);
  const [showSite3Improvements, setShowSite3Improvements] = useState(false);
  const [showSiteVImprovements, setShowSiteVImprovements] = useState(false);

  // Lock background scroll while any overlay/modal is open to avoid slide jump
  const hasOverlayOpen = selectedDetail || selectedDeptChart || selectedCartridgeChart || selectedManufacturingChart || selectedSite3Chart || selectedSiteIChart;

  // Close all modals when slide changes
  useEffect(() => {
    const handleCloseModals = () => {
      setSelectedDetail(null);
      setExpandedActivity(null);
      setSelectedDeptChart(null);
      setSelectedCartridgeChart(null);
      setSelectedManufacturingChart(null);
      setSelectedSite3Chart(null);
      setSelectedSiteIChart(null);
      setSelectedSite3KPIInfo(null);
      setSelectedQualityScoreInfo(null);
      setShowSite3Improvements(false);
      setShowSiteVImprovements(false);
    };

    window.addEventListener('closeAllModals', handleCloseModals);
    return () => {
      window.removeEventListener('closeAllModals', handleCloseModals);
    };
  }, []);

  useEffect(() => {
    if (hasOverlayOpen) {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      document.body.dataset.scrollLock = 'true';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.removeAttribute('data-scroll-lock');
        window.scrollTo(0, scrollY);
      };
    }

    if (document.body.dataset.scrollLock) {
      const top = document.body.style.top || '0px';
      const offset = parseInt(top.replace('px', ''), 10) || 0;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.removeAttribute('data-scroll-lock');
      window.scrollTo(0, -offset);
    }
  }, [hasOverlayOpen]);

  // IPQA Key Metrics Data
  const metricsData = {
    'SITE-I': {
      color: '#dc2626',
      bgColor: '#fee2e2',
      accentColor: '#b91c1c',
      metrics: {
        'Line Clearance': { value: 6578, subtitle: '7 Not Approved', trend: '99.89%', status: 'Excellent' },
        'Line Closure': { value: 6620, subtitle: '4 Not Approved', trend: '99.94%', status: 'Excellent' },
        'Re-verification': { value: 2203, subtitle: '12 Not Approved', trend: '99.46%', status: 'Excellent' },
        'Sampling Types': { value: 3056, subtitle: 'Multi-type', trend: '100%', status: 'Excellent' },
        'Equipment Calibration': { value: 167, subtitle: 'All Current', trend: '100%', status: 'Excellent' }
      }
    },
    'SITE-III': {
      color: '#8b5cf6',
      bgColor: '#ede9fe',
      accentColor: '#6d28d9',
      metrics: {
        'Line Clearance': { value: '2464', subtitle: '29 Not Approved', trend: '98.84%', status: 'Excellent' },
        'Line Closure': { value: '2459', subtitle: '29 Not Approved', trend: '98.84%', status: 'Excellent' },
        'Line Reverification': { value: '4421', subtitle: '34 Not Approved', trend: '99.24%', status: 'Excellent' },
        'Line Verification': { value: '6190', subtitle: '01 Not Approved', trend: '99.98%', status: 'Excellent' }
      }
    },
    'SITE-V': {
      color: '#0ea5e9',
      bgColor: '#cffafe',
      accentColor: '#0369a1',
      metrics: {
        'Incoming Sampling': { value: 1405, trend: '+12%', status: 'Excellent' },
        'In-Process Sampling': { value: 3057, trend: '+18%', status: 'Excellent' },
        'BMR Verification': { value: 643, trend: '+15%', status: 'Good' },
        'Transfer Note Verif.': { value: 566, trend: '+8%', status: 'Stable' },
        'Destruction Records': { value: 52, trend: '-28%', status: 'Excellent' }
      }
    }
  }

  const siteVImprovements = [
    {
      icon: '🧪',
      title: 'QA-controlled primer probe sampling',
      detail: 'Sampling moved fully under QA oversight to tighten control.'
    },
    {
      icon: '🛡️',
      title: 'Stronger incoming gate',
      detail: 'Stringent incoming sampling now catches non-conformance at chip entry.'
    },
    {
      icon: '⚡',
      title: 'Flashwriting device learnings',
      detail: 'Repeated incidents surfaced weak pogo pins; verification now flags them early.'
    },
    {
      icon: '📦',
      title: 'Pouching mix-up prevention',
      detail: 'Tighter IPQA verification reduced pouch/chip mixups during pouching.'
    },
    {
      icon: '🏷️',
      title: 'Label verification at sleeves',
      detail: 'Checks added at chip insertion to stop misprints and mixed labels from user dept.'
    },
    {
      icon: '🛡️',
      title: 'Foil protection on trays',
      detail: 'Aluminium foil now shields trays from activated filter tip contamination.'
    },
    {
      icon: '✅',
      title: 'Broader in-process checks',
      detail: 'Covers arrangement, washing, volume checks (BSA/secondary coat), tube sorting, and MM filling.'
    }
  ]

  // Curated timing highlights distilled from raw Site V operational data (Jul–Nov)
  const siteVTimingHighlights = [
    { label: 'Chip arrangement – line clearance', avg: '≈6.4 min', best: '5.3 min' },
    { label: 'Chip arrangement – closure', avg: '≈6.9 min', best: '5.8–6.2 min' },
    { label: 'Line reverification – chip arrangement', avg: '≈4.6 min', best: '4.3 min' },
    { label: 'Chip washing – line clearance', avg: '≈8.2 min', best: '6.7–7.0 min' },
    { label: 'Chip washing – closure', avg: '≈9.6 min', best: '8.5–9.0 min' },
    { label: 'Line reverification – chip washing', avg: '≈5.1 min', best: '4.2–4.3 min' },
    { label: 'Bungs washing – line clearance', avg: '≈6.4 min', best: '5.5–5.6 min' },
    { label: 'Bungs washing – closure', avg: '≈6.6 min', best: '6.0–6.3 min' },
    { label: 'Flashwriting – line clearance', avg: '≈6.9 min', best: '6.3–6.5 min' },
    { label: 'Packing – line clearance', avg: '≈5.7 min', best: '5.1 min' },
    { label: 'Packing – line closure', avg: '≈5.6 min', best: '5.05–5.1 min' }
  ]

  // SITE-III KPI Info Modal Component
  const Site3KPIInfoModal = ({ kpiInfo, onClose }) => {
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
  };

  // Quality Score Info Modal Component
  const QualityScoreInfoModal = ({ site, onClose }) => {
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
  };

  // Modern Metric Tile Component
  const MetricTile = ({ label, value, subtitle, trend, status, color, siteName, onClick }) => {
    const isTrendPositive = trend.includes('+')
    const isClickable = !!onClick
    
    return (
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '14px 12px',
        textAlign: 'center',
        border: `2px solid ${color}30`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: isClickable ? 'pointer' : 'default',
        userSelect: 'none'
      }}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          e.stopPropagation();
          if (import.meta.env?.DEV) console.log('MetricTile clicked:', label);
          onClick();
        }
      }}
      onMouseEnter={(e) => {
        if (isClickable) {
          e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'
          e.currentTarget.style.boxShadow = `0 16px 32px ${color}35`
        } else {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = `0 12px 24px ${color}25`
        }
        e.currentTarget.style.borderColor = color
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = `${color}30`
      }}>
        {/* Top accent bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: color
        }}></div>

        {isClickable && (
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '20px',
            height: '20px',
            backgroundColor: color,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7em',
            color: 'white',
            fontWeight: '900'
          }}>
            👁️
          </div>
        )}

        <div style={{ fontSize: '0.7em', fontWeight: '700', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {label}
        </div>
        
        {subtitle ? (
          // Layout for cards with approved/not approved data
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
              padding: '8px 10px',
              background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
              borderRadius: '8px',
              border: '1px solid #86efac'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ fontSize: '1.2em' }}>✓</div>
                <div style={{ fontSize: '0.7em', fontWeight: '600', color: '#15803d' }}>Approved</div>
              </div>
              <div style={{ fontSize: '1.4em', fontWeight: '900', color: '#16a34a' }}>
                {value}
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
              padding: '8px 10px',
              background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
              borderRadius: '8px',
              border: '1px solid #fca5a5'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ fontSize: '1.2em' }}>✗</div>
                <div style={{ fontSize: '0.7em', fontWeight: '600', color: '#991b1b' }}>Not Approved</div>
              </div>
              <div style={{ fontSize: '1.4em', fontWeight: '900', color: '#dc2626' }}>
                {subtitle.replace(' Not Approved', '')}
              </div>
            </div>
          </div>
        ) : (
          // Original layout for cards without subtitle
          <div style={{ fontSize: '1.8em', fontWeight: '800', color: color, marginBottom: '4px' }}>
            {value}
          </div>
        )}
        
        <div style={{
          fontSize: '0.75em',
          fontWeight: '700',
          color: subtitle ? '#22c55e' : (isTrendPositive ? '#22c55e' : '#ef4444'),
          marginBottom: '6px'
        }}>
          {subtitle ? `Approval: ${trend}` : trend}
        </div>
        <div style={{
          fontSize: '0.65em',
          fontWeight: '600',
          color: '#9ca3af',
          backgroundColor: `${color}10`,
          padding: '4px 8px',
          borderRadius: '6px',
          display: 'inline-block'
        }}>
          {status}
        </div>
        {isClickable && (
          <div style={{
            fontSize: '0.55em',
            fontWeight: '700',
            color: color,
            marginTop: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            📊 Click for details
          </div>
        )}
      </div>
    )
  }

  // Site Card Component - Horizontal Layout
  const SiteCard = ({ siteName, siteData }) => {
    
    const handleMetricClick = (metricName) => {
      if (import.meta.env?.DEV) console.log('Card clicked:', siteName, metricName);
      
      // Only SITE-V and SITE-III have modal detailed views
      if (siteName !== 'SITE-V' && siteName !== 'SITE-III') {
        alert(`Detailed view for ${siteName} - ${metricName} is coming soon!`);
        return;
      }

      if (import.meta.env?.DEV) console.log('Setting selected detail:', { site: siteName, metric: metricName });
      setSelectedDetail({ site: siteName, metric: metricName });
    };

    return (
      <div style={{
        backgroundColor: siteData.bgColor,
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '16px',
        border: `3px solid ${siteData.color}`,
        boxShadow: `0 4px 12px ${siteData.color}20`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${siteData.color}15 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none'
        }}></div>

        {/* Site Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: '12px',
            height: '48px',
            background: `linear-gradient(180deg, ${siteData.color}, ${siteData.color}40)`,
            borderRadius: '6px',
            marginRight: '12px'
          }}></div>
          <div>
            <div style={{ fontSize: '1.4em', fontWeight: '800', color: siteData.color }}>
              {siteName}
            </div>
            <div style={{ fontSize: '0.8em', color: '#6b7280', fontWeight: '600' }}>
              IPQA Performance Metrics
            </div>
          </div>
        </div>

        {/* Metrics Grid - Hide for SITE-I, SITE-III, and SITE-V */}
        {siteName !== 'SITE-III' && siteName !== 'SITE-I' && siteName !== 'SITE-V' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Object.keys(siteData.metrics).length}, 1fr)`,
            gap: '12px',
            position: 'relative',
            zIndex: 1
          }}>
            {Object.entries(siteData.metrics).map(([metricName, metricData]) => (
              <MetricTile
                key={metricName}
                label={metricName}
                value={metricData.value}
                subtitle={metricData.subtitle}
                trend={metricData.trend}
                status={metricData.status}
                color={siteData.color}
                siteName={siteName}
                onClick={(siteName === 'SITE-V' || siteName === 'SITE-III') ? () => handleMetricClick(metricName) : null}
              />
            ))}
          </div>
        )}

        {/* SITE-I Clean Redesigned Section */}
        {siteName === 'SITE-I' && (
          <div style={{ marginTop: '20px' }}>
            <SiteISection />
          </div>
        )}

        {/* SITE-III Enhanced Visual Performance Dashboard */}
        {siteName === 'SITE-III' && (
          <div style={{
            marginTop: '28px',
            paddingTop: '24px',
            borderTop: `3px solid ${siteData.color}40`,
            position: 'relative',
            zIndex: 1
          }}>
            {/* SITE-III Overview Snapshot & Quick Stats */}
            <div style={{background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', border: `2px solid ${siteData.color}30`, borderRadius: '14px', padding: '24px', marginBottom: '28px', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.1)'}}>
              
              {/* Enhanced KPI Cards with Trend Analysis */}
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px'}}>
                {/* Overall IPQA Approval Card */}
                <div style={{background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '2px solid #86efac', borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', top: '-20px', right: '-20px', fontSize: '5em', opacity: '0.1'}}>✓</div>
                  <button onClick={(e) => {e.stopPropagation(); setSelectedSite3KPIInfo('Overall IPQA Approval');}} style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    fontSize: '0.85em',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    zIndex: 10
                  }} onMouseEnter={(e) => {e.target.style.background = '#059669'; e.target.style.transform = 'scale(1.1)';}} onMouseLeave={(e) => {e.target.style.background = '#10b981'; e.target.style.transform = 'scale(1)';}}>
                    ⓘ
                  </button>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#166534', marginBottom: '8px', textTransform: 'uppercase'}}>Overall IPQA Approval</div>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px'}}>
                    <div style={{fontSize: '2.5em', fontWeight: '900', color: '#16a34a'}}>99.2%</div>
                    <div style={{fontSize: '0.85em', fontWeight: '700', color: '#16a34a', background: '#dcfce7', padding: '4px 8px', borderRadius: '6px'}}>↑ 0.3%</div>
                  </div>
                  <div style={{fontSize: '0.7em', color: '#166534', marginBottom: '10px'}}>15,534 approved out of 15,627 operations</div>
                  <div style={{height: '10px', background: '#f0fdf4', borderRadius: '999px', overflow: 'hidden'}}>
                    <div style={{width: '99.2%', height: '100%', background: 'linear-gradient(90deg, #16a34a, #22c55e)', borderRadius: '999px'}}></div>
                  </div>
                </div>

                {/* Incident Investigation Improvement Card */}
                <div style={{background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '2px solid #93c5fd', borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', top: '-20px', right: '-20px', fontSize: '5em', opacity: '0.1'}}>⚡</div>
                  <button onClick={(e) => {e.stopPropagation(); setSelectedSite3KPIInfo('Incident Investigation Speed');}} style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    fontSize: '0.85em',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    zIndex: 10
                  }} onMouseEnter={(e) => {e.target.style.background = '#1d4ed8'; e.target.style.transform = 'scale(1.1)';}} onMouseLeave={(e) => {e.target.style.background = '#2563eb'; e.target.style.transform = 'scale(1)';}}>
                    ⓘ
                  </button>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#1e40af', marginBottom: '8px', textTransform: 'uppercase'}}>Incident Investigation Speed</div>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px'}}>
                    <div style={{fontSize: '2.5em', fontWeight: '900', color: '#2563eb'}}>4d</div>
                    <div style={{fontSize: '0.85em', fontWeight: '700', color: '#16a34a', background: '#dcfce7', padding: '4px 8px', borderRadius: '6px'}}>84%↓</div>
                  </div>
                  <div style={{fontSize: '0.7em', color: '#1e40af', marginBottom: '10px'}}>Reduced from 25 days</div>
                  <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <div style={{flex: 1, height: '8px', background: '#fee2e2', borderRadius: '4px'}}>
                      <div style={{width: '100%', height: '100%', background: '#ef4444', borderRadius: '4px'}}></div>
                    </div>
                    <div style={{fontSize: '0.65em', color: '#6b7280'}}>25d</div>
                    <div style={{fontSize: '0.8em'}}>→</div>
                    <div style={{flex: 1, height: '8px', background: '#dcfce7', borderRadius: '4px'}}>
                      <div style={{width: '16%', height: '100%', background: '#16a34a', borderRadius: '4px'}}></div>
                    </div>
                    <div style={{fontSize: '0.65em', color: '#16a34a', fontWeight: '700'}}>4d</div>
                  </div>
                </div>

                {/* Rejection Rate Card */}
                <div style={{background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #fcd34d', borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', top: '-20px', right: '-20px', fontSize: '5em', opacity: '0.1'}}>📉</div>
                  <button onClick={(e) => {e.stopPropagation(); setSelectedSite3KPIInfo('Rejection Rate');}} style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#d97706',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    fontSize: '0.85em',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    zIndex: 10
                  }} onMouseEnter={(e) => {e.target.style.background = '#b45309'; e.target.style.transform = 'scale(1.1)';}} onMouseLeave={(e) => {e.target.style.background = '#d97706'; e.target.style.transform = 'scale(1)';}}>
                    ⓘ
                  </button>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#92400e', marginBottom: '8px', textTransform: 'uppercase'}}>Rejection Rate</div>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px'}}>
                    <div style={{fontSize: '2.5em', fontWeight: '900', color: '#d97706'}}>2.5%</div>
                    <div style={{fontSize: '0.75em', fontWeight: '700', color: '#0f172a', background: '#ecfdf3', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '4px 8px'}}>Lower is better ↓</div>
                  </div>
                  <div style={{fontSize: '0.7em', color: '#92400e', marginBottom: '10px'}}>Improved from 4.0% • Target: &lt;2%</div>
                  <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <div style={{flex: 1, height: '8px', background: '#fee2e2', borderRadius: '4px'}}>
                      <div style={{width: '100%', height: '100%', background: '#ef4444', borderRadius: '4px'}}></div>
                    </div>
                    <div style={{fontSize: '0.65em', color: '#dc2626'}}>4%</div>
                    <div style={{fontSize: '0.8em'}}>→</div>
                    <div style={{flex: 1, height: '8px', background: '#fef3c7', borderRadius: '4px'}}>
                      <div style={{width: '62.5%', height: '100%', background: '#d97706', borderRadius: '4px'}}></div>
                    </div>
                    <div style={{fontSize: '0.65em', color: '#16a34a', fontWeight: '700'}}>2.5%</div>
                  </div>
                </div>

                {/* Sampling Coverage Card */}
                <div style={{background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)', border: '2px solid #c4b5fd', borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', top: '-20px', right: '-20px', fontSize: '5em', opacity: '0.1'}}>🎯</div>
                  <button onClick={(e) => {e.stopPropagation(); setSelectedSite3KPIInfo('Sampling Coverage');}} style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    fontSize: '0.85em',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    zIndex: 10
                  }} onMouseEnter={(e) => {e.target.style.background = '#7c3aed'; e.target.style.transform = 'scale(1.1)';}} onMouseLeave={(e) => {e.target.style.background = '#8b5cf6'; e.target.style.transform = 'scale(1)';}}>
                    ⓘ
                  </button>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#6b21a8', marginBottom: '8px', textTransform: 'uppercase'}}>Sampling Coverage</div>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px'}}>
                    <div style={{fontSize: '2.5em', fontWeight: '900', color: '#8b5cf6'}}>98.5%</div>
                    <div style={{fontSize: '0.85em', fontWeight: '700', color: '#8b5cf6', background: '#f3e8ff', padding: '4px 8px', borderRadius: '6px'}}>1,400+ lots</div>
                  </div>
                  <div style={{fontSize: '0.7em', color: '#6b21a8', marginBottom: '10px'}}>99% pass rate • Zero critical defects</div>
                  <div style={{height: '10px', background: '#faf5ff', borderRadius: '999px', overflow: 'hidden'}}>
                    <div style={{width: '98.5%', height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', borderRadius: '999px'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Performance Visualization */}
            <div style={{marginBottom: '28px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
                <div style={{background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: 'white', borderRadius: '10px', padding: '10px 14px', fontWeight: '800', fontSize: '1em', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'}}>
                  📊 LINE OPERATIONS PERFORMANCE
                </div>
                <div style={{fontSize: '0.85em', fontWeight: '600', color: '#64748b', background: '#ffffff', padding: '6px 12px', borderRadius: '20px', border: '1px solid #ede9fe'}}>4 Key Metrics • 99%+ Approval Rate</div>
              </div>

              {/* Summary Stats Bar - At Top of Line Operations */}
              <div style={{marginBottom: '20px'}}>
                {/* Summary Stats Cards */}
                <div style={{marginBottom: '16px', padding: '20px', background: 'linear-gradient(135deg, #ede9fe, #f5f3ff)', borderRadius: '12px', border: '2px solid #8b5cf6', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)'}}>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px'}}>
                    <div style={{textAlign: 'center'}}>
                      <div style={{fontSize: '0.7em', fontWeight: '700', color: '#6d28d9', marginBottom: '6px', textTransform: 'uppercase'}}>Total Operations</div>
                      <div style={{fontSize: '1.8em', fontWeight: '900', color: '#8b5cf6'}}>15,627</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <div style={{fontSize: '0.7em', fontWeight: '700', color: '#6d28d9', marginBottom: '6px', textTransform: 'uppercase'}}>Total Approved</div>
                      <div style={{fontSize: '1.8em', fontWeight: '900', color: '#10b981'}}>15,534</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <div style={{fontSize: '0.7em', fontWeight: '700', color: '#6d28d9', marginBottom: '6px', textTransform: 'uppercase'}}>Not Approved</div>
                      <div style={{fontSize: '1.8em', fontWeight: '900', color: '#ef4444'}}>93</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <div style={{fontSize: '0.7em', fontWeight: '700', color: '#6d28d9', marginBottom: '6px', textTransform: 'uppercase'}}>Overall Rate</div>
                      <div style={{fontSize: '1.8em', fontWeight: '900', color: '#8b5cf6'}}>99.40%</div>
                    </div>
                  </div>
                </div>

                {/* Combined Stacked Bar Chart */}
                <div style={{padding: '24px', background: '#ffffff', borderRadius: '12px', border: '2px solid #e9d5ff', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.1)'}}>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      {name: '🔓 Clearance', approved: 2464, notApproved: 29, rate: '98.84%'},
                      {name: '🔒 Closure', approved: 2459, notApproved: 29, rate: '98.84%'},
                      {name: '🔄 Reverif', approved: 4421, notApproved: 34, rate: '99.24%'},
                      {name: '✓ Verif', approved: 6190, notApproved: 1, rate: '99.98%'}
                    ]} layout="vertical" margin={{top: 5, right: 30, left: 90, bottom: 5}}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" fontSize={11} stroke="#9ca3af" />
                      <YAxis dataKey="name" type="category" fontSize={12} stroke="#9ca3af" width={85} />
                      <Tooltip 
                        contentStyle={{background: '#fff', border: '2px solid #e9d5ff', borderRadius: '8px', fontSize: '0.85em'}}
                        formatter={(value, name) => [value.toLocaleString(), name === 'approved' ? '✓ Approved' : '✗ Not Approved']}
                      />
                      <Legend wrapperStyle={{fontSize: '0.8em'}} />
                      <Bar dataKey="approved" stackId="a" fill="#10b981" name="Approved" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="notApproved" stackId="a" fill="#ef4444" name="Not Approved" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Visual Performance Chart */}
              <div style={{background: 'linear-gradient(135deg, #faf5ff, #ffffff)', border: '2px solid #e9d5ff', borderRadius: '16px', padding: '32px 24px', marginBottom: '20px'}}>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px'}}>
                  {[
                    {name: 'Line Clearance', value: 2464, notApproved: 29, trend: '98.84%', color: '#8b5cf6', icon: '🔓', total: 2493},
                    {name: 'Line Closure', value: 2459, notApproved: 29, trend: '98.84%', color: '#6d28d9', icon: '🔒', total: 2488},
                    {name: 'Line Reverification', value: 4421, notApproved: 34, trend: '99.24%', color: '#a78bfa', icon: '🔄', total: 4455},
                    {name: 'Line Verification', value: 6190, notApproved: 1, trend: '99.98%', color: '#c4b5fd', icon: '✓', total: 6191}
                  ].map((metric, idx) => {
                    const approvalPercent = (metric.value / metric.total) * 100;
                    const radius = 70;
                    const circumference = 2 * Math.PI * radius;
                    const strokeDashoffset = circumference - (approvalPercent / 100) * circumference;

                    return (
                      <div key={idx} style={{background: '#ffffff', borderRadius: '14px', padding: '20px', border: `2px solid ${metric.color}30`, boxShadow: '0 2px 8px rgba(139, 92, 246, 0.1)', transition: 'all 0.3s ease', cursor: 'pointer'}} onClick={() => setSelectedSite3Chart(metric.name)} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.25)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = metric.color;}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.1)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = `${metric.color}30`;}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingBottom: '12px', borderBottom: `2px solid ${metric.color}20`}}>
                          <div style={{fontSize: '2em'}}>{metric.icon}</div>
                          <div>
                            <div style={{fontSize: '0.95em', fontWeight: '800', color: '#0f172a'}}>{metric.name}</div>
                            <div style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b'}}>Total: {metric.total.toLocaleString()} operations</div>
                          </div>
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                          {/* Circular Progress */}
                          <div style={{position: 'relative', width: '140px', height: '140px'}}>
                            <svg width="140" height="140" style={{transform: 'rotate(-90deg)'}}>
                              <circle cx="70" cy="70" r={radius} stroke="#f3f4f6" strokeWidth="12" fill="none"/>
                              <circle cx="70" cy="70" r={radius} stroke={metric.color} strokeWidth="12" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" style={{transition: 'stroke-dashoffset 1s ease'}}>
                                <animate attributeName="stroke-dashoffset" from={circumference} to={strokeDashoffset} dur="1.5s" begin={`${idx * 0.2}s`} fill="freeze"/>
                              </circle>
                            </svg>
                            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
                              <div style={{fontSize: '0.95em', fontWeight: '900', color: metric.color}}>{metric.trend}</div>
                              <div style={{fontSize: '0.55em', fontWeight: '600', color: '#64748b', marginTop: '2px'}}>Approved</div>
                            </div>
                          </div>

                          {/* Stats */}
                          <div style={{flex: 1}}>
                            <div style={{marginBottom: '12px'}}>
                              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px'}}>
                                <div style={{fontSize: '0.75em', fontWeight: '700', color: '#166534'}}>✓ Approved</div>
                                <div style={{fontSize: '1.3em', fontWeight: '900', color: '#10b981'}}>{metric.value.toLocaleString()}</div>
                              </div>
                              <div style={{background: '#f0fdf4', height: '8px', borderRadius: '4px', overflow: 'hidden'}}>
                                <div style={{background: 'linear-gradient(90deg, #10b981, #059669)', height: '100%', width: `${approvalPercent}%`, transition: 'width 1s ease'}}></div>
                              </div>
                            </div>

                            <div>
                              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px'}}>
                                <div style={{fontSize: '0.75em', fontWeight: '700', color: '#991b1b'}}>✗ Not Approved</div>
                                <div style={{fontSize: '1.3em', fontWeight: '900', color: '#ef4444'}}>{metric.notApproved}</div>
                              </div>
                              <div style={{background: '#fef2f2', height: '8px', borderRadius: '4px', overflow: 'hidden'}}>
                                <div style={{background: 'linear-gradient(90deg, #ef4444, #dc2626)', height: '100%', width: `${(metric.notApproved / metric.total) * 100}%`, transition: 'width 1s ease'}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SITE-V Enhanced Visual Performance Dashboard */}
        {siteName === 'SITE-V' && (
          <div style={{
            marginTop: '28px',
            paddingTop: '24px',
            borderTop: `3px solid ${siteData.color}40`,
            position: 'relative',
            zIndex: 1
          }}>
            {/* SITE-V Overview Snapshot & Quick Stats */}
            <div style={{background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', border: `2px solid ${siteData.color}30`, borderRadius: '14px', padding: '24px', marginBottom: '28px', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.1)'}}>
              
              {/* Enhanced KPI Cards with Trend Analysis */}
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px'}}>
                {/* In-Process Sampling Volume Card */}
                <div style={{background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '2px solid #93c5fd', borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', top: '-20px', right: '-20px', fontSize: '5em', opacity: '0.1'}}>🧪</div>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#1e40af', marginBottom: '8px', textTransform: 'uppercase'}}>In-Process Sampling Volume</div>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px'}}>
                    <div style={{fontSize: '2.5em', fontWeight: '900', color: '#2563eb'}}>3,057</div>
                    <div style={{fontSize: '0.85em', fontWeight: '700', color: '#16a34a', background: '#dcfce7', padding: '4px 8px', borderRadius: '6px'}}>↑ 18%</div>
                  </div>
                  <div style={{fontSize: '0.7em', color: '#1e40af', marginBottom: '10px'}}>Highest volume across all sites - industry-leading coverage</div>
                  <div style={{display: 'flex', gap: '8px', marginTop: '12px'}}>
                    <div style={{flex: 1, textAlign: 'center', background: '#f0f9ff', padding: '6px', borderRadius: '6px', border: '1px solid #0ea5e9'}}>
                      <div style={{fontSize: '0.65em', color: '#64748b', fontWeight: '600'}}>Before</div>
                      <div style={{fontSize: '1.2em', fontWeight: '800', color: '#0ea5e9'}}>2,590</div>
                    </div>
                    <div style={{fontSize: '1.5em', alignSelf: 'center'}}>→</div>
                    <div style={{flex: 1, textAlign: 'center', background: '#dbeafe', padding: '6px', borderRadius: '6px', border: '2px solid #2563eb'}}>
                      <div style={{fontSize: '0.65em', color: '#64748b', fontWeight: '600'}}>Now</div>
                      <div style={{fontSize: '1.2em', fontWeight: '800', color: '#2563eb'}}>3,057</div>
                    </div>
                  </div>
                </div>

                {/* Incoming Sampling Quality Card */}
                <div style={{background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '2px solid #86efac', borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', top: '-20px', right: '-20px', fontSize: '5em', opacity: '0.1'}}>📦</div>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#166534', marginBottom: '8px', textTransform: 'uppercase'}}>Incoming Sampling Gate</div>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px'}}>
                    <div style={{fontSize: '2.5em', fontWeight: '900', color: '#16a34a'}}>1,405</div>
                    <div style={{fontSize: '0.85em', fontWeight: '700', color: '#16a34a', background: '#dcfce7', padding: '4px 8px', borderRadius: '6px'}}>↑ 12%</div>
                  </div>
                  <div style={{fontSize: '0.7em', color: '#166534', marginBottom: '10px'}}>Stringent incoming checks catch non-conformance early</div>
                  <div style={{height: '10px', background: '#f0fdf4', borderRadius: '999px', overflow: 'hidden', marginTop: '12px'}}>
                    <div style={{width: '100%', height: '100%', background: 'linear-gradient(90deg, #16a34a, #22c55e)', borderRadius: '999px'}}></div>
                  </div>
                </div>

                {/* BMR Verification Speed Card */}
                <div style={{background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #fbbf24', borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', top: '-20px', right: '-20px', fontSize: '5em', opacity: '0.1'}}>📋</div>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#92400e', marginBottom: '8px', textTransform: 'uppercase'}}>BMR Verification Volume</div>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px'}}>
                    <div style={{fontSize: '2.5em', fontWeight: '900', color: '#d97706'}}>643</div>
                    <div style={{fontSize: '0.85em', fontWeight: '700', color: '#16a34a', background: '#dcfce7', padding: '4px 8px', borderRadius: '6px'}}>↑ 15%</div>
                  </div>
                  <div style={{fontSize: '0.7em', color: '#92400e', marginBottom: '10px'}}>Comprehensive batch record verification coverage</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px'}}>
                    <div style={{flex: 1, height: '8px', background: '#fef3c7', borderRadius: '999px', overflow: 'hidden'}}>
                      <div style={{width: '85%', height: '100%', background: 'linear-gradient(90deg, #d97706, #f59e0b)', borderRadius: '999px'}}></div>
                    </div>
                    <div style={{fontSize: '0.8em', fontWeight: '800', color: '#d97706'}}>85%</div>
                  </div>
                </div>

                {/* Destruction Records Efficiency Card */}
                <div style={{background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', border: '2px solid #f9a8d4', borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', top: '-20px', right: '-20px', fontSize: '5em', opacity: '0.1'}}>🗑️</div>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#831843', marginBottom: '8px', textTransform: 'uppercase'}}>Destruction Records</div>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px'}}>
                    <div style={{fontSize: '2.5em', fontWeight: '900', color: '#be185d'}}>52</div>
                    <div style={{fontSize: '0.85em', fontWeight: '700', color: '#16a34a', background: '#dcfce7', padding: '4px 8px', borderRadius: '6px'}}>↓ 28%</div>
                  </div>
                  <div style={{fontSize: '0.7em', color: '#831843', marginBottom: '8px'}}>Significant reduction in destruction events</div>
                  <div style={{background: '#fce7f3', padding: '8px 12px', borderRadius: '8px', border: '1px solid #f9a8d4'}}>
                    <div style={{fontSize: '0.65em', color: '#64748b', fontWeight: '600', marginBottom: '4px'}}>Improvement</div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div style={{fontSize: '0.75em', color: '#be185d'}}>Before: <span style={{fontWeight: '800'}}>72</span></div>
                      <div style={{fontSize: '0.75em', color: '#16a34a'}}>Now: <span style={{fontWeight: '800'}}>52</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SAMPLING ACTIVITIES SUMMARY */}
              <div style={{marginTop: '24px'}}>
                <div style={{fontSize: '0.85em', fontWeight: '800', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span style={{background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', borderRadius: '8px', padding: '6px 12px', fontSize: '0.9em'}}>📊 SAMPLING ACTIVITIES SUMMARY</span>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px'}}>
                  <div style={{background: '#ffffff', border: '2px solid #e0f2fe', borderRadius: '10px', padding: '14px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.7em', fontWeight: '700', color: '#64748b', marginBottom: '6px'}}>Incoming</div>
                    <div style={{fontSize: '1.6em', fontWeight: '900', color: '#0ea5e9'}}>1,405</div>
                    <div style={{fontSize: '0.65em', color: '#16a34a', fontWeight: '700', marginTop: '4px'}}>+12%</div>
                  </div>
                  <div style={{background: '#ffffff', border: '2px solid #bfdbfe', borderRadius: '10px', padding: '14px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.7em', fontWeight: '700', color: '#64748b', marginBottom: '6px'}}>In-Process</div>
                    <div style={{fontSize: '1.6em', fontWeight: '900', color: '#2563eb'}}>3,057</div>
                    <div style={{fontSize: '0.65em', color: '#16a34a', fontWeight: '700', marginTop: '4px'}}>+18%</div>
                  </div>
                  <div style={{background: '#ffffff', border: '2px solid #fde68a', borderRadius: '10px', padding: '14px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.7em', fontWeight: '700', color: '#64748b', marginBottom: '6px'}}>BMR Verif.</div>
                    <div style={{fontSize: '1.6em', fontWeight: '900', color: '#d97706'}}>643</div>
                    <div style={{fontSize: '0.65em', color: '#16a34a', fontWeight: '700', marginTop: '4px'}}>+15%</div>
                  </div>
                  <div style={{background: '#ffffff', border: '2px solid #c4b5fd', borderRadius: '10px', padding: '14px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.7em', fontWeight: '700', color: '#64748b', marginBottom: '6px'}}>Transfer Note</div>
                    <div style={{fontSize: '1.6em', fontWeight: '900', color: '#7c3aed'}}>566</div>
                    <div style={{fontSize: '0.65em', color: '#16a34a', fontWeight: '700', marginTop: '4px'}}>+8%</div>
                  </div>
                  <div style={{background: '#ffffff', border: '2px solid #fbcfe8', borderRadius: '10px', padding: '14px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.7em', fontWeight: '700', color: '#64748b', marginBottom: '6px'}}>Destruction</div>
                    <div style={{fontSize: '1.6em', fontWeight: '900', color: '#be185d'}}>52</div>
                    <div style={{fontSize: '0.65em', color: '#16a34a', fontWeight: '700', marginTop: '4px'}}>-28%</div>
                  </div>
                </div>
              </div>

              {/* TREND ANALYSIS CHARTS */}
              <div style={{marginTop: '24px'}}>
                <div style={{fontSize: '0.85em', fontWeight: '800', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span style={{background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', borderRadius: '8px', padding: '6px 12px', fontSize: '0.9em'}}>📈 MONTHLY TREND ANALYSIS</span>
                  <span style={{fontSize: '0.75em', color: '#64748b', background: '#f0f9ff', padding: '4px 10px', borderRadius: '20px', border: '1px solid #bae6fd'}}>Jul - Nov 2025</span>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                  {/* Sampling Volume Trends Chart - AREA CHART */}
                  <div style={{background: 'linear-gradient(135deg, #f0f9ff, #ffffff)', border: '2px solid #0ea5e9', borderRadius: '14px', padding: '20px', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.1)'}}>
                    <div style={{fontSize: '0.85em', fontWeight: '800', color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <span style={{fontSize: '1.3em', background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', color: 'white', padding: '4px 8px', borderRadius: '6px'}}>🧪</span>
                      <span>Sampling Volume Growth</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <AreaChart data={[
                        {month: 'Jul', incoming: 1180, inProcess: 2450, bmr: 540},
                        {month: 'Aug', incoming: 1230, inProcess: 2620, bmr: 580},
                        {month: 'Sep', incoming: 1310, inProcess: 2850, bmr: 610},
                        {month: 'Oct', incoming: 1365, inProcess: 2980, bmr: 625},
                        {month: 'Nov', incoming: 1405, inProcess: 3057, bmr: 643}
                      ]}>
                        <defs>
                          <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorInProcess" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorBMR" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 4" stroke="#dbeafe" />
                        <XAxis dataKey="month" stroke="#64748b" style={{fontSize: '0.85em', fontWeight: '700'}} />
                        <YAxis stroke="#64748b" style={{fontSize: '0.75em'}} />
                        <Tooltip 
                          contentStyle={{background: '#ffffff', border: '2px solid #0ea5e9', borderRadius: '8px', fontSize: '0.8em', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.15)'}}
                          labelStyle={{fontWeight: '800', color: '#0f172a'}}
                        />
                        <Legend wrapperStyle={{fontSize: '0.75em', fontWeight: '700', paddingTop: '12px'}} />
                        <Area type="monotone" dataKey="incoming" stackId="1" stroke="#0ea5e9" fill="url(#colorIncoming)" name="Incoming" />
                        <Area type="monotone" dataKey="inProcess" stackId="1" stroke="#2563eb" fill="url(#colorInProcess)" name="In-Process" />
                        <Area type="monotone" dataKey="bmr" stackId="1" stroke="#7c3aed" fill="url(#colorBMR)" name="BMR Verif." />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div style={{fontSize: '0.7em', color: '#64748b', textAlign: 'center', marginTop: '8px', fontWeight: '600', background: '#f0f9ff', padding: '8px', borderRadius: '6px'}}>
                      Consistent upward trend across all sampling categories
                    </div>
                  </div>

                  {/* Destruction Records Reduction Chart - LINE CHART WITH TARGET */}
                  <div style={{background: 'linear-gradient(135deg, #fef3f2, #ffffff)', border: '2px solid #fb7185', borderRadius: '14px', padding: '20px', boxShadow: '0 4px 12px rgba(251, 113, 133, 0.1)'}}>
                    <div style={{fontSize: '0.85em', fontWeight: '800', color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <span style={{fontSize: '1.3em', background: 'linear-gradient(135deg, #ef4444, #f87171)', color: 'white', padding: '4px 8px', borderRadius: '6px'}}>📉</span>
                      <span>Destruction Records Reduction</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={[
                        {month: 'Jul', value: 72, target: 60},
                        {month: 'Aug', value: 68, target: 60},
                        {month: 'Sep', value: 61, target: 60},
                        {month: 'Oct', value: 56, target: 60},
                        {month: 'Nov', value: 52, target: 60}
                      ]}>
                        <defs>
                          <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#86efac" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#86efac" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 4" stroke="#fee2e2" />
                        <XAxis dataKey="month" stroke="#64748b" style={{fontSize: '0.85em', fontWeight: '700'}} />
                        <YAxis stroke="#64748b" style={{fontSize: '0.75em'}} />
                        <Tooltip 
                          contentStyle={{background: '#ffffff', border: '2px solid #fb7185', borderRadius: '8px', fontSize: '0.8em', boxShadow: '0 4px 12px rgba(251, 113, 133, 0.15)'}}
                          labelStyle={{fontWeight: '800', color: '#0f172a'}}
                        />
                        <Legend wrapperStyle={{fontSize: '0.75em', fontWeight: '700', paddingTop: '12px'}} />
                        <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={4} dot={{fill: '#ef4444', r: 5}} activeDot={{r: 7, fill: '#dc2626'}} name="Destruction Records" isAnimationActive={true} animationDuration={800} />
                        <Line type="monotone" dataKey="target" stroke="#16a34a" strokeWidth={3} strokeDasharray="5 5" dot={{fill: '#16a34a', r: 4}} name="Target (≤60)" isAnimationActive={true} animationDuration={800} />
                      </LineChart>
                    </ResponsiveContainer>
                    <div style={{fontSize: '0.7em', color: '#dc2626', textAlign: 'center', marginTop: '8px', fontWeight: '600', background: '#fee2e2', padding: '8px', borderRadius: '6px'}}>
                      📊 28% reduction achieved - now below target threshold ✓
                    </div>
                  </div>

                  {/* Transfer Note Verification Trend - STACKED BAR */}
                  <div style={{background: 'linear-gradient(135deg, #faf5ff, #ffffff)', border: '2px solid #c084fc', borderRadius: '14px', padding: '20px', boxShadow: '0 4px 12px rgba(192, 132, 252, 0.1)'}}>
                    <div style={{fontSize: '0.85em', fontWeight: '800', color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <span style={{fontSize: '1.3em', background: 'linear-gradient(135deg, #a78bfa, #c084fc)', color: 'white', padding: '4px 8px', borderRadius: '6px'}}>📋</span>
                      <span>Transfer Note Verification</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={[
                        {month: 'Jul', approved: 502, rejected: 8},
                        {month: 'Aug', approved: 528, rejected: 7},
                        {month: 'Sep', approved: 542, rejected: 6},
                        {month: 'Oct', approved: 553, rejected: 5},
                        {month: 'Nov', approved: 562, rejected: 4}
                      ]}>
                        <CartesianGrid strokeDasharray="4 4" stroke="#f3e8ff" />
                        <XAxis dataKey="month" stroke="#64748b" style={{fontSize: '0.85em', fontWeight: '700'}} />
                        <YAxis stroke="#64748b" style={{fontSize: '0.75em'}} />
                        <Tooltip 
                          contentStyle={{background: '#ffffff', border: '2px solid #c084fc', borderRadius: '8px', fontSize: '0.8em', boxShadow: '0 4px 12px rgba(192, 132, 252, 0.15)'}}
                          labelStyle={{fontWeight: '800', color: '#0f172a'}}
                        />
                        <Legend wrapperStyle={{fontSize: '0.75em', fontWeight: '700', paddingTop: '12px'}} />
                        <Bar dataKey="approved" stackId="a" fill="#a78bfa" name="Approved" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="rejected" stackId="a" fill="#f87171" name="Rejected" radius={[0, 0, 4, 4]} />
                      </BarChart>
                    </ResponsiveContainer>
                    <div style={{fontSize: '0.7em', color: '#6b21a8', textAlign: 'center', marginTop: '8px', fontWeight: '600', background: '#f3e8ff', padding: '8px', borderRadius: '6px'}}>
                      98.3% approval rate with declining rejections
                    </div>
                  </div>

                  {/* Overall Performance Score */}
                  <div style={{background: 'linear-gradient(135deg, #ffffff, #f0fdf4)', border: '2px solid #bbf7d0', borderRadius: '12px', padding: '20px'}}>
                    <div style={{fontSize: '0.85em', fontWeight: '800', color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <span style={{fontSize: '1.3em'}}>🎯</span>
                      <span>Overall Quality Performance</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', paddingTop: '10px'}}>
                      <div style={{background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', border: '3px solid #16a34a', borderRadius: '16px', padding: '24px', marginBottom: '16px', textAlign: 'center', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)'}}>
                        <div style={{fontSize: '3em', fontWeight: '900', color: '#16a34a', lineHeight: '1', marginBottom: '8px'}}>97.5%</div>
                        <div style={{fontSize: '0.75em', fontWeight: '700', color: '#166534', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Quality Score</div>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75em'}}>
                        <div style={{textAlign: 'center', background: '#f0f9ff', padding: '8px 12px', borderRadius: '8px', border: '1px solid #bae6fd'}}>
                          <div style={{fontWeight: '600', color: '#64748b', fontSize: '0.85em', marginBottom: '2px'}}>Before</div>
                          <div style={{fontWeight: '900', color: '#0ea5e9', fontSize: '1.3em'}}>94.2%</div>
                        </div>
                        <div style={{fontSize: '1.8em', color: '#16a34a', fontWeight: '700'}}>→</div>
                        <div style={{textAlign: 'center', background: '#dcfce7', padding: '8px 12px', borderRadius: '8px', border: '2px solid #16a34a'}}>
                          <div style={{fontWeight: '600', color: '#64748b', fontSize: '0.85em', marginBottom: '2px'}}>Now</div>
                          <div style={{fontWeight: '900', color: '#16a34a', fontSize: '1.3em'}}>97.5%</div>
                        </div>
                      </div>
                    </div>
                    <div style={{fontSize: '0.7em', color: '#16a34a', textAlign: 'center', marginTop: '12px', fontWeight: '700', background: '#dcfce7', padding: '8px', borderRadius: '8px', border: '1px solid #86efac'}}>
                      ↑ +3.3% improvement in overall quality metrics
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SITE-V Process Efficiency Charts (Keep existing) */}
        {siteName === 'SITE-V' && (
          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: `3px solid ${siteData.color}40`,
            position: 'relative',
            zIndex: 1
          }}>
            {/* SITE-V Process Efficiency - Scrollable Charts Carousel */}
            <div style={{marginTop: '28px', marginBottom: '28px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px'}}>
                <div style={{background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', borderRadius: '10px', padding: '10px 14px', fontWeight: '800', fontSize: '1em', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'}}>
                  📊 PROCESS EFFICIENCY METRICS
                </div>
                <div style={{fontSize: '0.85em', fontWeight: '600', color: '#64748b', background: '#ffffff', padding: '6px 12px', borderRadius: '20px', border: '1px solid #e0f2fe'}}>Monthly Trend Analysis (Jul - Nov)</div>
              </div>

              {/* Process Efficiency Overview - KPI Cards & Combined Chart */}
              <div style={{marginBottom: '28px'}}>
                {/* KPI Summary Cards */}
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px'}}>
                  <div style={{background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '2px solid #93c5fd', borderRadius: '10px', padding: '12px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.7em', fontWeight: '700', color: '#1e40af', marginBottom: '4px'}}>Total Clearance</div>
                    <div style={{fontSize: '1.8em', fontWeight: '900', color: '#2563eb'}}>2,726</div>
                    <div style={{fontSize: '0.65em', color: '#64748b', marginTop: '2px'}}>Avg: 545/month</div>
                  </div>
                  <div style={{background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '2px solid #86efac', borderRadius: '10px', padding: '12px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.7em', fontWeight: '700', color: '#166534', marginBottom: '4px'}}>Total Closure</div>
                    <div style={{fontSize: '1.8em', fontWeight: '900', color: '#16a34a'}}>2,674</div>
                    <div style={{fontSize: '0.65em', color: '#64748b', marginTop: '2px'}}>Avg: 535/month</div>
                  </div>
                  <div style={{background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #fbbf24', borderRadius: '10px', padding: '12px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.7em', fontWeight: '700', color: '#92400e', marginBottom: '4px'}}>Total Re-verification</div>
                    <div style={{fontSize: '1.8em', fontWeight: '900', color: '#d97706'}}>1,721</div>
                    <div style={{fontSize: '0.65em', color: '#64748b', marginTop: '2px'}}>Avg: 344/month</div>
                  </div>
                  <div style={{background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', border: '2px solid #c4b5fd', borderRadius: '10px', padding: '12px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.7em', fontWeight: '700', color: '#5b21b6', marginBottom: '4px'}}>Efficiency Rate</div>
                    <div style={{fontSize: '1.8em', fontWeight: '900', color: '#7c3aed'}}>92.3%</div>
                    <div style={{fontSize: '0.65em', color: '#16a34a', marginTop: '2px'}}>↑ +3.2%</div>
                  </div>
                </div>

                {/* Combined All Processes Chart - Line Chart with Smooth Animation */}
                <div style={{background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)', border: '3px solid #0ea5e9', borderRadius: '16px', padding: '24px', boxShadow: '0 12px 40px rgba(14, 165, 233, 0.15)'}}>
                  <div style={{fontSize: '0.95em', fontWeight: '900', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <span style={{fontSize: '1.4em', background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', padding: '8px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', color: 'white'}}>📈</span>
                    <span>Combined All Processes - Monthly Performance Trend</span>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      {month: 'Jul', clearance: 651, closure: 655, reverif: 83, total: 1389},
                      {month: 'Aug', clearance: 774, closure: 766, reverif: 52, total: 1592},
                      {month: 'Sep', clearance: 528, closure: 527, reverif: 63, total: 1118},
                      {month: 'Oct', clearance: 465, closure: 453, reverif: 46, total: 964},
                      {month: 'Nov', clearance: 509, closure: 508, reverif: 51, total: 1068}
                    ]} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                      <defs>
                        <linearGradient id="colorClearance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.9}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorClosure" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#16a34a" stopOpacity={0.9}/>
                          <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorReverif" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.9}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" stroke="#e0f2fe" vertical={false} />
                      <XAxis dataKey="month" stroke="#94a3b8" style={{fontSize: '0.9em', fontWeight: '700'}} tick={{fill: '#475569'}} />
                      <YAxis stroke="#94a3b8" style={{fontSize: '0.8em'}} tick={{fill: '#475569'}} />
                      <Tooltip 
                        contentStyle={{background: '#ffffff', border: '2px solid #0ea5e9', borderRadius: '12px', fontSize: '0.85em', boxShadow: '0 8px 24px rgba(14, 165, 233, 0.2)'}}
                        labelStyle={{fontWeight: '900', color: '#0ea5e9', fontSize: '0.9em'}}
                        cursor={{stroke: '#0ea5e9', strokeWidth: 2}}
                      />
                      <Legend wrapperStyle={{fontSize: '0.85em', fontWeight: '800', paddingTop: '16px'}} iconType="line" />
                      <Line type="monotone" dataKey="clearance" stroke="#2563eb" strokeWidth={4} dot={{fill: '#2563eb', r: 6}} activeDot={{r: 8, fill: '#1d4ed8'}} name="Line Clearance" isAnimationActive={true} animationDuration={800} />
                      <Line type="monotone" dataKey="closure" stroke="#16a34a" strokeWidth={4} dot={{fill: '#16a34a', r: 6}} activeDot={{r: 8, fill: '#15803d'}} name="Closure Verification" isAnimationActive={true} animationDuration={800} />
                      <Line type="monotone" dataKey="reverif" stroke="#f59e0b" strokeWidth={4} dot={{fill: '#f59e0b', r: 6}} activeDot={{r: 8, fill: '#d97706'}} name="Re-verification" isAnimationActive={true} animationDuration={800} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div style={{fontSize: '0.75em', color: '#475569', textAlign: 'center', marginTop: '12px', fontWeight: '600', background: 'linear-gradient(135deg, #dbeafe, #eff6ff)', padding: '10px', borderRadius: '8px', border: '1px solid #bae6fd'}}>
                    <span style={{color: '#0ea5e9'}}>💡</span> All 12 departments aggregated • Peak in August with 1,592 combined activities • Showing optimization across all processes
                  </div>
                </div>
              </div>

              {/* Scrollable Container with Arrows */}
              <div style={{position: 'relative', background: 'linear-gradient(135deg, #f0f9ff, #ffffff)', border: '2px solid #0ea5e9', borderRadius: '16px', padding: '24px', overflow: 'hidden'}}>
                <div style={{fontSize: '0.85em', fontWeight: '800', color: '#0f172a', marginBottom: '14px', paddingLeft: '60px'}}>
                  📋 Individual Department Breakdown - Scroll to view all 12 departments
                </div>

                {/* Left Arrow */}
                <button onClick={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const container = parent.querySelector('[data-scroll-container]');
                  container.scrollBy({left: -400, behavior: 'smooth'});
                }} style={{position: 'absolute', left: '12px', top: '60px', zIndex: 10, background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '1.4em', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)', transition: 'all 0.3s ease'}}
                onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(14, 165, 233, 0.5)'; e.currentTarget.style.transform = 'scale(1.1)';}}
                onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)'; e.currentTarget.style.transform = 'scale(1)';}}
                >←</button>

                {/* Scrollable Charts Container */}
                <div data-scroll-container style={{display: 'flex', overflowX: 'auto', gap: '20px', paddingRight: '60px', scrollBehavior: 'smooth', scrollbarWidth: 'thin', scrollbarColor: '#0ea5e9 #f0f9ff', paddingLeft: '60px'}}>
                  {[
                    {dept: '🧼 Chip Assembly/Washing/Drying', clearance: [651, 774, 528, 465, 509], closure: [655, 766, 527, 453, 508], reverif: [83, 52, 63, 46, 51], color: '#6366f1'},
                    {dept: '⚗️ MG Preparation', clearance: [120, 145, 98, 87, 102], closure: [118, 142, 96, 85, 100], reverif: [45, 38, 42, 35, 40], color: '#8b5cf6'},
                    {dept: '🧪 MG Filling Room', clearance: [54, 62, 76, 57, 66], closure: [54, 62, 76, 57, 66], reverif: [141, 88, 114, 65, 43], color: '#06b6d4'},
                    {dept: '👁️ Coat Inspection', clearance: [89, 102, 76, 69, 81], closure: [87, 100, 74, 67, 79], reverif: [56, 48, 52, 44, 50], color: '#10b981'},
                    {dept: '🔷 Polymer Filling', clearance: [145, 168, 132, 118, 135], closure: [143, 165, 130, 116, 133], reverif: [72, 62, 68, 58, 65], color: '#f59e0b'},
                    {dept: '🔌 Chip Sorting', clearance: [79, 126, 98, 85, 68], closure: [80, 132, 98, 88, 68], reverif: [31, 46, 33, 18, 16], color: '#ef4444'},
                    {dept: '⚡ Flashwriting', clearance: [112, 134, 98, 92, 105], closure: [110, 131, 96, 90, 103], reverif: [38, 44, 35, 28, 32], color: '#ec4899'},
                    {dept: '📦 Pouching Room 2&3', clearance: [176, 201, 145, 132, 154], closure: [174, 198, 143, 130, 152], reverif: [64, 72, 58, 48, 56], color: '#8b5cf6'},
                    {dept: '🏭 Assembly Room 3', clearance: [98, 115, 87, 79, 92], closure: [96, 112, 85, 77, 90], reverif: [52, 58, 48, 42, 50], color: '#06b6d4'},
                    {dept: '🔧 Tube Sorting', clearance: [134, 156, 121, 108, 128], closure: [132, 153, 119, 106, 126], reverif: [58, 68, 52, 44, 56], color: '#6366f1'},
                    {dept: '📋 Packing', clearance: [167, 189, 145, 131, 152], closure: [165, 186, 143, 129, 150], reverif: [71, 81, 62, 52, 65], color: '#10b981'},
                    {dept: '🧬 Master Mix Preparation', clearance: [203, 234, 178, 162, 189], closure: [201, 231, 176, 160, 187], reverif: [89, 102, 78, 65, 88], color: '#f59e0b'}
                  ].map((dept, deptIdx) => (
                    <div key={deptIdx} style={{flex: '0 0 400px', background: '#ffffff', border: '2px solid #e0f2fe', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 8px rgba(14, 165, 233, 0.1)', transition: 'all 0.3s ease', cursor: 'pointer'}}
                    onClick={() => setSelectedDeptChart(dept)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(14, 165, 233, 0.25)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = dept.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(14, 165, 233, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#e0f2fe';
                    }}>
                      {/* Department Header */}
                      <div style={{marginBottom: '16px', paddingBottom: '12px', borderBottom: `3px solid ${dept.color}`}}>
                        <div style={{fontSize: '0.95em', fontWeight: '800', color: '#0f172a'}}>{dept.dept}</div>
                      </div>

                      {/* Column Chart SVG */}
                      <svg viewBox="0 0 340 200" style={{width: '100%', height: 'auto', marginBottom: '14px'}}>
                        <defs>
                          <pattern id={`grid-${deptIdx}`} width="60" height="40" patternUnits="userSpaceOnUse">
                            <path d={`M 60 0 L 0 0 0 40`} fill="none" stroke="#e0f2fe" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="340" height="180" fill={`url(#grid-${deptIdx})`} />

                        <line x1="30" y1="10" x2="30" y2="170" stroke="#0369a1" strokeWidth="2"/>
                        <line x1="30" y1="170" x2="330" y2="170" stroke="#0369a1" strokeWidth="2"/>

                        {[0, 1, 2, 3, 4, 5].map(i => {
                          const y = 170 - (i * 32);
                          const label = i === 0 ? '0' : i === 5 ? '800+' : i * 160;
                          return (
                            <g key={`y-${i}`}>
                              <text x="20" y={y + 4} fontSize="11" fill="#64748b" fontWeight="600" textAnchor="end">{label}</text>
                              <line x1="28" y1={y} x2="330" y2={y} stroke="#e0f2fe" strokeWidth="1" strokeDasharray="2,2"/>
                            </g>
                          );
                        })}

                        {[0, 1, 2, 3, 4].map(monthIdx => {
                          const groupX = 60 + monthIdx * 60;
                          const colWidth = 14;
                          const maxVal = 800;
                          
                          const clearanceH = (dept.clearance[monthIdx] / maxVal) * 150;
                          const closureH = (dept.closure[monthIdx] / maxVal) * 150;
                          const reverH = (dept.reverif[monthIdx] / 200) * 150;

                          return (
                            <g key={`month-${monthIdx}`}>
                              <rect x={groupX - colWidth - 8} y={170 - clearanceH} width={colWidth} height={clearanceH} fill={dept.color} opacity="1" rx="2"/>
                              <rect x={groupX - 2} y={170 - closureH} width={colWidth} height={closureH} fill={dept.color} opacity="0.65" rx="2"/>
                              <rect x={groupX + colWidth + 4} y={170 - reverH} width={colWidth} height={reverH} fill={dept.color} opacity="0.35" rx="2"/>
                              <text x={groupX + 2} y="188" fontSize="12" fill="#0369a1" fontWeight="700" textAnchor="middle">
                                {['Jul', 'Aug', 'Sep', 'Oct', 'Nov'][monthIdx]}
                              </text>
                            </g>
                          );
                        })}

                        <g>
                          <rect x="45" y="12" width="10" height="10" fill={dept.color} opacity="1"/>
                          <text x="60" y="21" fontSize="10" fontWeight="700" fill="#0f172a">Clear</text>
                          <rect x="145" y="12" width="10" height="10" fill={dept.color} opacity="0.65"/>
                          <text x="160" y="21" fontSize="10" fontWeight="700" fill="#0f172a">Close</text>
                          <rect x="245" y="12" width="10" height="10" fill={dept.color} opacity="0.35"/>
                          <text x="260" y="21" fontSize="10" fontWeight="700" fill="#0f172a">Verif</text>
                        </g>
                      </svg>

                      {/* Summary Stats */}
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.75em'}}>
                        <div style={{textAlign: 'center', padding: '8px', background: '#f0f9ff', borderRadius: '6px', border: `1px solid ${dept.color}`}}>
                          <div style={{fontWeight: '600', color: '#64748b', marginBottom: '2px'}}>Clear</div>
                          <div style={{fontWeight: '800', color: dept.color}}>{Math.round(dept.clearance.reduce((a, b) => a + b) / dept.clearance.length)}</div>
                        </div>
                        <div style={{textAlign: 'center', padding: '8px', background: '#f0f9ff', borderRadius: '6px', border: `1px solid ${dept.color}`, opacity: 0.7}}>
                          <div style={{fontWeight: '600', color: '#64748b', marginBottom: '2px'}}>Close</div>
                          <div style={{fontWeight: '800', color: dept.color}}>{Math.round(dept.closure.reduce((a, b) => a + b) / dept.closure.length)}</div>
                        </div>
                        <div style={{textAlign: 'center', padding: '8px', background: '#f0f9ff', borderRadius: '6px', border: `1px solid ${dept.color}`, opacity: 0.4}}>
                          <div style={{fontWeight: '600', color: '#64748b', marginBottom: '2px'}}>Verif</div>
                          <div style={{fontWeight: '800', color: dept.color}}>{Math.round(dept.reverif.reduce((a, b) => a + b) / dept.reverif.length)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Arrow */}
                <button onClick={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const container = parent.querySelector('[data-scroll-container]');
                  container.scrollBy({left: 400, behavior: 'smooth'});
                }} style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '1.4em', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)', transition: 'all 0.3s ease'}}
                onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(14, 165, 233, 0.5)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';}}
                onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)';}}
                >→</button>

              </div>

              {/* Overall Summary Box */}
              <div style={{marginTop: '16px', padding: '14px', background: 'linear-gradient(135deg, #e0f2fe, #f0f9ff)', borderRadius: '12px', border: '2px solid #0ea5e9'}}>
                <div style={{fontSize: '0.8em', fontWeight: '700', color: '#0369a1', marginBottom: '6px'}}>📌 KEY INSIGHTS</div>
                <div style={{fontSize: '0.75em', color: '#0f172a', lineHeight: '1.4'}}>
                  Use ← → arrows to navigate all 12 departments • Solid columns: Clearance, Medium opacity: Closure, Light opacity: Re-Verification • Scroll to view complete process efficiency data across all production areas
                </div>
              </div>
            </div>
          </div>
        )}

                {/* SITE-III Manufacturing & Cartridge Assembly Overview - Modern Dashboard */}
        {siteName === 'SITE-III' && (
          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: `3px solid ${siteData.color}40`,
            position: 'relative',
            zIndex: 1
          }}>
            {/* ===== MANUFACTURING SECTION ===== */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                background: `linear-gradient(135deg, #8b5cf6, #6d28d9)`,
                color: 'white',
                borderRadius: '10px',
                padding: '8px 12px',
                fontWeight: '800',
                fontSize: '0.95em',
                letterSpacing: '0.5px',
                boxShadow: `0 4px 12px #8b5cf630`
              }}>
                ⚙️ MANUFACTURING DEVICE PROCESSES
              </div>
              <div style={{fontSize: '0.8em', fontWeight: '600', color: '#64748b'}}>4 Device Types • 38 Processes</div>
            </div>

            {/* Combined Manufacturing Devices Chart */}
            <div style={{background: 'linear-gradient(135deg, #ffffff, #faf5ff)', border: '3px solid #8b5cf6', borderRadius: '16px', padding: '24px', marginBottom: '28px', boxShadow: '0 8px 24px rgba(139, 92, 246, 0.1)'}}>
              <div style={{fontSize: '0.9em', fontWeight: '900', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <span style={{fontSize: '1.3em', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: 'white', padding: '8px 12px', borderRadius: '8px'}}>📊</span>
                <span>Combined Device Performance - All 4 Types</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={[
                  {period: 'Jan-Aug', clearance: 6.094, closure: 6.532, reverif: 4.625},
                  {period: 'Sep', clearance: 6.188, closure: 6.613, reverif: 4.650},
                  {period: 'Oct', clearance: 6.100, closure: 6.525, reverif: 4.550},
                  {period: 'Nov', clearance: 6.025, closure: 6.425, reverif: 4.475}
                ]} margin={{top: 15, right: 30, left: 0, bottom: 0}}>
                  <defs>
                    <linearGradient id="gradClear" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gradClose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e9d5ff" />
                  <XAxis dataKey="period" stroke="#8b5cf6" style={{fontSize: '0.9em', fontWeight: '700'}} tick={{fill: '#8b5cf6'}} />
                  <YAxis stroke="#8b5cf6" style={{fontSize: '0.8em'}} tick={{fill: '#8b5cf6'}} />
                  <Tooltip 
                    contentStyle={{background: '#faf5ff', border: '2px solid #8b5cf6', borderRadius: '10px', fontSize: '0.85em', boxShadow: '0 8px 24px rgba(139, 92, 246, 0.2)'}}
                    labelStyle={{fontWeight: '800', color: '#0f172a'}}
                    formatter={(value) => value.toFixed(2)}
                    cursor={{stroke: '#8b5cf6', strokeWidth: 2}}
                  />
                  <Legend wrapperStyle={{fontSize: '0.8em', fontWeight: '800', paddingTop: '12px'}} />
                  <Line type="monotone" dataKey="clearance" stroke="#8b5cf6" strokeWidth={4} dot={{fill: '#8b5cf6', r: 6}} activeDot={{r: 8, fill: '#7c3aed'}} name="Clearance" isAnimationActive={true} animationDuration={800} />
                  <Line type="monotone" dataKey="closure" stroke="#ec4899" strokeWidth={4} dot={{fill: '#ec4899', r: 6}} activeDot={{r: 8, fill: '#be185d'}} name="Closure" isAnimationActive={true} animationDuration={800} />
                  <Line type="monotone" dataKey="reverif" stroke="#06b6d4" strokeWidth={4} dot={{fill: '#06b6d4', r: 6}} activeDot={{r: 8, fill: '#0891b2'}} name="Re-Verification" isAnimationActive={true} animationDuration={800} />
                </LineChart>
              </ResponsiveContainer>
              <div style={{fontSize: '0.75em', color: '#6b21a8', textAlign: 'center', marginTop: '12px', fontWeight: '600', background: '#f3e8ff', padding: '10px', borderRadius: '8px', border: '1px solid #e9d5ff'}}>
                ✨ Overall trend showing average times across all device types (Rapid Cell Lysis, Two Bay PCR, Sixteen Bay PCR, Extraction Device)
              </div>
            </div>

            {/* Manufacturing Devices Grid - Individual Cards */}
            <div style={{background: 'linear-gradient(135deg, #faf5ff, #ffffff)', border: '2px solid #e9d5ff', borderRadius: '16px', padding: '24px', marginBottom: '28px'}}>
              
              {/* Grid Container */}
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px'}}>
                {[
                  {name: 'Rapid Cell Lysis', icon: '🧬', processes: 3, color: '#3b82f6', data: {clearance: [3.167, 3.2, 3.15, 3.1], closure: [3.483, 3.5, 3.45, 3.4], reverif: [3.783, 3.8, 3.75, 3.7]}},
                  {name: 'Two Bay PCR', icon: '🔬', processes: 9, color: '#8b5cf6', data: {clearance: [4.367, 4.4, 4.35, 4.3], closure: [4.817, 4.85, 4.8, 4.75], reverif: [3.683, 3.7, 3.65, 3.6]}},
                  {name: 'Sixteen Bay PCR', icon: '⚡', processes: 3, color: '#ec4899', data: {clearance: [9.45, 9.5, 9.4, 9.3], closure: [10.667, 10.7, 10.6, 10.5], reverif: [6.7, 6.75, 6.65, 6.55]}},
                  {name: 'Extraction Device', icon: '🔧', processes: 23, color: '#06b6d4', data: {clearance: [5.6, 5.65, 5.55, 5.5], closure: [6.267, 6.3, 6.25, 6.2], reverif: [4.317, 4.35, 4.3, 4.25]}}
                ].map((device, idx) => (
                  <div key={idx} style={{background: '#ffffff', border: '2px solid #e9d5ff', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 8px rgba(139, 92, 246, 0.1)', transition: 'all 0.3s ease', cursor: 'pointer'}}
                  onClick={() => setSelectedManufacturingChart(device)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = device.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e9d5ff';
                  }}>
                    {/* Device Header */}
                    <div style={{marginBottom: '16px', paddingBottom: '12px', borderBottom: `3px solid ${device.color}`}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <div style={{fontSize: '1.8em'}}>{device.icon}</div>
                        <div>
                          <div style={{fontSize: '0.95em', fontWeight: '800', color: '#0f172a'}}>{device.name}</div>
                          <div style={{fontSize: '0.75em', fontWeight: '600', color: '#64748b'}}>{device.processes} processes</div>
                        </div>
                      </div>
                    </div>

                    {/* Column Chart SVG */}
                    <svg viewBox="0 0 340 180" style={{width: '100%', height: 'auto', marginBottom: '14px'}}>
                      <defs>
                        <pattern id={`mfg-grid-${idx}`} width="60" height="40" patternUnits="userSpaceOnUse">
                          <path d={`M 60 0 L 0 0 0 40`} fill="none" stroke="#ede9fe" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="340" height="160" fill={`url(#mfg-grid-${idx})`} />

                      <line x1="30" y1="10" x2="30" y2="150" stroke="#8b5cf6" strokeWidth="2"/>
                      <line x1="30" y1="150" x2="330" y2="150" stroke="#8b5cf6" strokeWidth="2"/>

                      {[0, 1, 2, 3, 4].map(i => {
                        const y = 150 - (i * 30);
                        const label = i === 0 ? '0' : i === 4 ? '12m' : (i * 3).toString() + 'm';
                        return (
                          <g key={`y-${i}`}>
                            <text x="20" y={y + 4} fontSize="11" fill="#64748b" fontWeight="600" textAnchor="end">{label}</text>
                            <line x1="28" y1={y} x2="330" y2={y} stroke="#ede9fe" strokeWidth="1" strokeDasharray="2,2"/>
                          </g>
                        );
                      })}

                      {[0, 1, 2, 3].map(monthIdx => {
                        const groupX = 60 + monthIdx * 65;
                        const colWidth = 12;
                        const maxVal = 12;
                        
                        const clearH = device.data.clearance[monthIdx] > 0 ? (device.data.clearance[monthIdx] / maxVal) * 130 : 0;
                        const closeH = device.data.closure[monthIdx] > 0 ? (device.data.closure[monthIdx] / maxVal) * 130 : 0;
                        const revH = device.data.reverif[monthIdx] > 0 ? (device.data.reverif[monthIdx] / maxVal) * 130 : 0;

                        return (
                          <g key={`month-${monthIdx}`}>
                            {clearH > 0 && <rect x={groupX - colWidth - 6} y={150 - clearH} width={colWidth} height={clearH} fill={device.color} opacity="1" rx="2"/>}
                            {closeH > 0 && <rect x={groupX - 2} y={150 - closeH} width={colWidth} height={closeH} fill={device.color} opacity="0.65" rx="2"/>}
                            {revH > 0 && <rect x={groupX + colWidth + 4} y={150 - revH} width={colWidth} height={revH} fill={device.color} opacity="0.35" rx="2"/>}
                            <text x={groupX + 2} y="168" fontSize="12" fill="#8b5cf6" fontWeight="700" textAnchor="middle">
                              {['Jan-Aug', 'Sep', 'Oct', 'Nov'][monthIdx]}
                            </text>
                          </g>
                        );
                      })}

                      <g>
                        <rect x="45" y="8" width="10" height="10" fill={device.color} opacity="1"/>
                        <text x="60" y="17" fontSize="10" fontWeight="700" fill="#0f172a">Clear</text>
                        <rect x="145" y="8" width="10" height="10" fill={device.color} opacity="0.65"/>
                        <text x="160" y="17" fontSize="10" fontWeight="700" fill="#0f172a">Close</text>
                        <rect x="245" y="8" width="10" height="10" fill={device.color} opacity="0.35"/>
                        <text x="260" y="17" fontSize="10" fontWeight="700" fill="#0f172a">Rev</text>
                      </g>
                    </svg>

                    {/* Summary Stats */}
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.75em'}}>
                      <div style={{textAlign: 'center', padding: '8px', background: '#faf5ff', borderRadius: '6px', border: `1px solid ${device.color}`}}>
                        <div style={{fontWeight: '600', color: '#64748b', marginBottom: '2px'}}>Clear</div>
                        <div style={{fontWeight: '800', color: device.color}}>{device.data.clearance[0].toFixed(1)}m</div>
                      </div>
                      <div style={{textAlign: 'center', padding: '8px', background: '#faf5ff', borderRadius: '6px', border: `1px solid ${device.color}`, opacity: 0.7}}>
                        <div style={{fontWeight: '600', color: '#64748b', marginBottom: '2px'}}>Close</div>
                        <div style={{fontWeight: '800', color: device.color}}>{device.data.closure[0].toFixed(1)}m</div>
                      </div>
                      <div style={{textAlign: 'center', padding: '8px', background: '#faf5ff', borderRadius: '6px', border: `1px solid ${device.color}`, opacity: 0.4}}>
                        <div style={{fontWeight: '600', color: '#64748b', marginBottom: '2px'}}>Rev</div>
                        <div style={{fontWeight: '800', color: device.color}}>{device.data.reverif[0].toFixed(1)}m</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Manufacturing KPI Summary Cards */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px'}}>
              <div style={{background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)', border: '2px solid #0284c7', borderRadius: '14px', padding: '20px', textAlign: 'center', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(2, 132, 199, 0.1)'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(2, 132, 199, 0.2)'; e.currentTarget.style.transform = 'translateY(-2px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(2, 132, 199, 0.1)'; e.currentTarget.style.transform = 'translateY(0)';}}>
                <div style={{fontSize: '0.75em', fontWeight: '700', color: '#0c4a6e', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Avg Clearance Time</div>
                <div style={{fontSize: '2.2em', fontWeight: '900', color: '#0284c7', marginBottom: '4px'}}>5:42</div>
                <div style={{fontSize: '0.7em', fontWeight: '600', color: '#0369a1'}}>All Devices (Sep-Nov)</div>
              </div>

              <div style={{background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', border: '2px solid #ec4899', borderRadius: '14px', padding: '20px', textAlign: 'center', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(236, 72, 153, 0.1)'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(236, 72, 153, 0.2)'; e.currentTarget.style.transform = 'translateY(-2px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(236, 72, 153, 0.1)'; e.currentTarget.style.transform = 'translateY(0)';}}>
                <div style={{fontSize: '0.75em', fontWeight: '700', color: '#831843', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Avg Closure Time</div>
                <div style={{fontSize: '2.2em', fontWeight: '900', color: '#ec4899', marginBottom: '4px'}}>6:32</div>
                <div style={{fontSize: '0.7em', fontWeight: '600', color: '#be185d'}}>All Devices (Sep-Nov)</div>
              </div>

              <div style={{background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', border: '2px solid #3b82f6', borderRadius: '14px', padding: '20px', textAlign: 'center', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.2)'; e.currentTarget.style.transform = 'translateY(-2px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.1)'; e.currentTarget.style.transform = 'translateY(0)';}}>
                <div style={{fontSize: '0.75em', fontWeight: '700', color: '#1e3a8a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Avg Re-Verification</div>
                <div style={{fontSize: '2.2em', fontWeight: '900', color: '#3b82f6', marginBottom: '4px'}}>4:63</div>
                <div style={{fontSize: '0.7em', fontWeight: '600', color: '#1e40af'}}>All Devices (Sep-Nov)</div>
              </div>

              <div style={{background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', border: '2px solid #10b981', borderRadius: '14px', padding: '20px', textAlign: 'center', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.2)'; e.currentTarget.style.transform = 'translateY(-2px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.1)'; e.currentTarget.style.transform = 'translateY(0)';}}>
                <div style={{fontSize: '0.75em', fontWeight: '700', color: '#166534', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Total Devices</div>
                <div style={{fontSize: '2.2em', fontWeight: '900', color: '#10b981', marginBottom: '4px'}}>4</div>
                <div style={{fontSize: '0.7em', fontWeight: '600', color: '#047857'}}>38 Processes</div>
              </div>
            </div>

            {/* ===== SECTION SEPARATOR ===== */}
            <div style={{margin: '40px 0 0 0', padding: '24px 0', position: 'relative', display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{flex: 1, height: '3px', background: `linear-gradient(90deg, ${siteData.color}50, ${siteData.color}0)`, borderRadius: '2px'}}></div>
              <div style={{fontSize: '0.7em', fontWeight: '700', letterSpacing: '1.5px', color: '#94a3b8', textTransform: 'uppercase'}}>━━ Section 2 ━━</div>
              <div style={{flex: 1, height: '3px', background: `linear-gradient(90deg, ${siteData.color}0, ${siteData.color}50)`, borderRadius: '2px'}}></div>
            </div>

            {/* ===== CARTRIDGE ASSEMBLY SECTION ===== */}
            <div style={{marginTop: '32px', paddingTop: '24px', borderTop: `3px solid ${siteData.color}40`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px'}}>
                <div style={{background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', borderRadius: '10px', padding: '10px 14px', fontWeight: '800', fontSize: '1em', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'}}>
                  📦 CARTRIDGE ASSEMBLY & PACKAGING
                </div>
                <div style={{fontSize: '0.85em', fontWeight: '600', color: '#64748b', background: '#ffffff', padding: '6px 12px', borderRadius: '20px', border: '1px solid #d1fae5'}}>11 Activities • Optimized Timing</div>
              </div>

              {/* Combined Cartridge Assembly Chart */}
              <div style={{background: 'linear-gradient(135deg, #ffffff, #f0fdf4)', border: '3px solid #10b981', borderRadius: '16px', padding: '24px', marginBottom: '28px', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.1)'}}>
                <div style={{fontSize: '0.9em', fontWeight: '900', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <span style={{fontSize: '1.3em', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '8px 12px', borderRadius: '8px'}}>📊</span>
                  <span>Combined Cartridge Assembly - All 11 Activities</span>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={[
                    {period: 'Jan-Aug', clearance: 9.45, closure: 8.92, reverif: 6.58},
                    {period: 'Sep', clearance: 9.73, closure: 9.08, reverif: 6.65},
                    {period: 'Oct', clearance: 9.52, closure: 8.98, reverif: 6.48},
                    {period: 'Nov', clearance: 9.28, closure: 8.65, reverif: 6.12}
                  ]} margin={{top: 15, right: 30, left: 0, bottom: 0}}>
                    <defs>
                      <linearGradient id="gradCartClear" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="gradCartClose" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="gradCartRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke="#d1fae5" />
                    <XAxis dataKey="period" stroke="#10b981" style={{fontSize: '0.9em', fontWeight: '700'}} tick={{fill: '#059669'}} />
                    <YAxis stroke="#10b981" style={{fontSize: '0.8em'}} tick={{fill: '#059669'}} />
                    <Tooltip 
                      contentStyle={{background: '#f0fdf4', border: '2px solid #10b981', borderRadius: '10px', fontSize: '0.85em', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.2)'}}
                      labelStyle={{fontWeight: '800', color: '#0f172a'}}
                      formatter={(value) => value.toFixed(2)}
                      cursor={{stroke: '#10b981', strokeWidth: 2}}
                    />
                    <Legend wrapperStyle={{fontSize: '0.8em', fontWeight: '800', paddingTop: '12px'}} />
                    <Area type="monotone" dataKey="clearance" stackId="1" stroke="#10b981" fill="url(#gradCartClear)" name="Clearance" isAnimationActive={true} animationDuration={800} />
                    <Area type="monotone" dataKey="closure" stackId="1" stroke="#059669" fill="url(#gradCartClose)" name="Closure" isAnimationActive={true} animationDuration={800} />
                    <Area type="monotone" dataKey="reverif" stackId="1" stroke="#34d399" fill="url(#gradCartRev)" name="Re-Verification" isAnimationActive={true} animationDuration={800} />
                  </AreaChart>
                </ResponsiveContainer>
                <div style={{fontSize: '0.75em', color: '#065f46', textAlign: 'center', marginTop: '12px', fontWeight: '600', background: '#ecfdf5', padding: '10px', borderRadius: '8px', border: '1px solid #d1fae5'}}>
                  ✨ Average times across all 11 cartridge assembly activities (LINE-G, Dump to Annealing, Matrix Pallet, Rework, Verification, QR Code, QR Pasting, Grommet, Smiley, Filter Washing, Filter Heating)
                </div>
              </div>

              {/* Scrollable Container with Arrows */}
              <div style={{position: 'relative', background: 'linear-gradient(135deg, #f0fdf4, #ffffff)', border: '2px solid #10b981', borderRadius: '16px', padding: '24px', overflow: 'hidden', marginBottom: '28px'}}>
                
                {/* Left Arrow */}
                <button onClick={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const container = parent.querySelector('[data-cartridge-scroll]');
                  container.scrollBy({left: -400, behavior: 'smooth'});
                }} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '1.4em', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', transition: 'all 0.3s ease'}}
                onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.5)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';}}
                onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)';}}
                >←</button>

                {/* Scrollable Charts Container */}
                <div data-cartridge-scroll style={{display: 'flex', overflowX: 'auto', gap: '20px', paddingRight: '60px', scrollBehavior: 'smooth', paddingLeft: '60px'}}>
                  {[
                    {name: 'LINE-G (Automation)', clear: '13:00', close: '12:00', rev: '4:30', color: '#06b6d4', data: {clearance: [0, 0, 0, 13.0], closure: [0, 0, 0, 12.0], reverif: [0, 0, 0, 4.5]}},
                    {name: 'Dump to Annealing', clear: '8:59', close: '8:15', rev: '8:15', color: '#ef4444', data: {clearance: [8.983, 8.55, 9.2, 11.033], closure: [8.25, 11.167, 10.367, 13.733], reverif: [8.25, 6.317, 5.867, 6.017]}},
                    {name: 'Matrix Pallet to Pouch', clear: '10:28', close: '9:08', rev: '9:08', color: '#3b82f6', data: {clearance: [10.467, 10.75, 8.917, 10.283], closure: [9.133, 10.2, 10.633, 11.55], reverif: [9.133, 7.05, 6.533, 6.933]}},
                    {name: 'Rework', clear: '8:09', close: '9:02', rev: '9:02', color: '#8b5cf6', data: {clearance: [8.15, 5.0, 9.0, 5.783], closure: [9.033, 5.5, 5.0, 5.533], reverif: [9.033, 5.0, 3.0, 6.0]}},
                    {name: 'Packing Verification', clear: 'N/A', close: 'N/A', rev: '6:39', color: '#ec4899', data: {clearance: [0, 0, 0, 0], closure: [0, 0, 0, 0], reverif: [6.65, 5.75, 5.317, 6.083]}},
                    {name: 'QR Code Generation', clear: '6:25', close: '5:27', rev: '5:27', color: '#3b82f6', data: {clearance: [6.417, 6.4, 5.1, 6.117], closure: [5.45, 5.8, 5.433, 5.617], reverif: [5.45, 6.2, 4.0, 7.0]}},
                    {name: 'QR Pasting', clear: '6:15', close: '6:39', rev: '6:39', color: '#8b5cf6', data: {clearance: [6.25, 5.85, 5.55, 6.1], closure: [6.65, 6.083, 4.717, 5.217], reverif: [6.65, 6.917, 5.567, 5.5]}},
                    {name: 'Grommet Fixing', clear: '6:11', close: '6:41', rev: '6:41', color: '#ec4899', data: {clearance: [6.183, 6.5, 5.233, 5.717], closure: [6.683, 5.7, 5.333, 7.15], reverif: [6.683, 5.0, 5.183, 5.95]}},
                    {name: 'Smiley Assembly', clear: '6:20', close: '6:27', rev: '6:27', color: '#06b6d4', data: {clearance: [6.333, 6.217, 5.15, 6.367], closure: [6.45, 5.65, 6.65, 5.717], reverif: [6.45, 5.65, 4.617, 5.633]}},
                    {name: 'Sample Filter Washing', clear: '5:57', close: '4:30', rev: '4:30', color: '#10b981', data: {clearance: [5.95, 6.433, 5.167, 8.0], closure: [4.5, 4.717, 6.367, 5.333], reverif: [4.5, 0, 0, 0]}},
                    {name: 'Sample Filter Heating', clear: '6:05', close: '3:40', rev: '3:40', color: '#f59e0b', data: {clearance: [6.083, 6.0, 6.0, 6.367], closure: [3.667, 6.0, 5.2, 5.367], reverif: [3.667, 3.0, 6.0, 5.0]}}
                  ].map((activity, idx) => (
                    <div key={idx} style={{flex: '0 0 400px', background: '#ffffff', border: '2px solid #d1fae5', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)', transition: 'all 0.3s ease', cursor: 'pointer'}}
                    onClick={() => setSelectedCartridgeChart(activity)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.25)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = activity.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#d1fae5';
                    }}>
                      {/* Activity Header */}
                      <div style={{marginBottom: '16px', paddingBottom: '12px', borderBottom: `3px solid ${activity.color}`}}>
                        <div style={{fontSize: '0.95em', fontWeight: '800', color: '#0f172a'}}>{activity.name}</div>
                      </div>

                      {/* Column Chart SVG */}
                      <svg viewBox="0 0 340 180" style={{width: '100%', height: 'auto', marginBottom: '14px'}}>
                        <defs>
                          <pattern id={`cart-grid-${idx}`} width="60" height="40" patternUnits="userSpaceOnUse">
                            <path d={`M 60 0 L 0 0 0 40`} fill="none" stroke="#d1fae5" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="340" height="160" fill={`url(#cart-grid-${idx})`} />

                        <line x1="30" y1="10" x2="30" y2="150" stroke="#059669" strokeWidth="2"/>
                        <line x1="30" y1="150" x2="330" y2="150" stroke="#059669" strokeWidth="2"/>

                        {[0, 1, 2, 3, 4].map(i => {
                          const y = 150 - (i * 30);
                          const label = i === 0 ? '0' : i === 4 ? '15m' : (i * 3).toString() + 'm';
                          return (
                            <g key={`y-${i}`}>
                              <text x="20" y={y + 4} fontSize="11" fill="#64748b" fontWeight="600" textAnchor="end">{label}</text>
                              <line x1="28" y1={y} x2="330" y2={y} stroke="#d1fae5" strokeWidth="1" strokeDasharray="2,2"/>
                            </g>
                          );
                        })}

                        {[0, 1, 2, 3].map(monthIdx => {
                          const groupX = 60 + monthIdx * 65;
                          const colWidth = 12;
                          const maxVal = 15;
                          
                          const clearH = activity.data.clearance[monthIdx] > 0 ? (activity.data.clearance[monthIdx] / maxVal) * 130 : 0;
                          const closeH = activity.data.closure[monthIdx] > 0 ? (activity.data.closure[monthIdx] / maxVal) * 130 : 0;
                          const revH = activity.data.reverif[monthIdx] > 0 ? (activity.data.reverif[monthIdx] / maxVal) * 130 : 0;

                          return (
                            <g key={`month-${monthIdx}`}>
                              {clearH > 0 && <rect x={groupX - colWidth - 6} y={150 - clearH} width={colWidth} height={clearH} fill={activity.color} opacity="1" rx="2"/>}
                              {closeH > 0 && <rect x={groupX - 2} y={150 - closeH} width={colWidth} height={closeH} fill={activity.color} opacity="0.65" rx="2"/>}
                              {revH > 0 && <rect x={groupX + colWidth + 4} y={150 - revH} width={colWidth} height={revH} fill={activity.color} opacity="0.35" rx="2"/>}
                              <text x={groupX + 2} y="168" fontSize="12" fill="#059669" fontWeight="700" textAnchor="middle">
                                {['Jan-Aug', 'Sep', 'Oct', 'Nov'][monthIdx]}
                              </text>
                            </g>
                          );
                        })}

                        <g>
                          <rect x="45" y="8" width="10" height="10" fill={activity.color} opacity="1"/>
                          <text x="60" y="17" fontSize="10" fontWeight="700" fill="#0f172a">Clear</text>
                          <rect x="145" y="8" width="10" height="10" fill={activity.color} opacity="0.65"/>
                          <text x="160" y="17" fontSize="10" fontWeight="700" fill="#0f172a">Close</text>
                          <rect x="245" y="8" width="10" height="10" fill={activity.color} opacity="0.35"/>
                          <text x="260" y="17" fontSize="10" fontWeight="700" fill="#0f172a">Rev</text>
                        </g>
                      </svg>

                      {/* Summary Stats */}
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.75em'}}>
                        <div style={{textAlign: 'center', padding: '8px', background: '#f0fdf4', borderRadius: '6px', border: `1px solid ${activity.color}`}}>
                          <div style={{fontWeight: '600', color: '#64748b', marginBottom: '2px'}}>Clear</div>
                          <div style={{fontWeight: '800', color: activity.color}}>{activity.clear}</div>
                        </div>
                        <div style={{textAlign: 'center', padding: '8px', background: '#f0fdf4', borderRadius: '6px', border: `1px solid ${activity.color}`, opacity: 0.7}}>
                          <div style={{fontWeight: '600', color: '#64748b', marginBottom: '2px'}}>Close</div>
                          <div style={{fontWeight: '800', color: activity.color}}>{activity.close}</div>
                        </div>
                        <div style={{textAlign: 'center', padding: '8px', background: '#f0fdf4', borderRadius: '6px', border: `1px solid ${activity.color}`, opacity: 0.4}}>
                          <div style={{fontWeight: '600', color: '#64748b', marginBottom: '2px'}}>Rev</div>
                          <div style={{fontWeight: '800', color: activity.color}}>{activity.rev}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Arrow */}
                <button onClick={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const container = parent.querySelector('[data-cartridge-scroll]');
                  container.scrollBy({left: 400, behavior: 'smooth'});
                }} style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '1.4em', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', transition: 'all 0.3s ease'}}
                onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.5)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';}}
                onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)';}}
                >→</button>

              </div>

              {/* Overall Summary Box */}
              <div style={{marginBottom: '16px', padding: '14px', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderRadius: '12px', border: '2px solid #10b981'}}>
                <div style={{fontSize: '0.8em', fontWeight: '700', color: '#059669', marginBottom: '6px'}}>📌 CARTRIDGE ASSEMBLY METRICS</div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px'}}>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '1.8em', fontWeight: '800', color: '#15803d'}}>7:19</div>
                    <div style={{fontSize: '0.75em', fontWeight: '600', color: '#166534'}}>Avg Clearance</div>
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '1.8em', fontWeight: '800', color: '#15803d'}}>6:52</div>
                    <div style={{fontSize: '0.75em', fontWeight: '600', color: '#166534'}}>Avg Closure</div>
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '1.8em', fontWeight: '800', color: '#15803d'}}>6:19</div>
                    <div style={{fontSize: '0.75em', fontWeight: '600', color: '#166534'}}>Avg Re-Verification</div>
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '1.8em', fontWeight: '800', color: '#15803d'}}>11</div>
                    <div style={{fontSize: '0.75em', fontWeight: '600', color: '#166534'}}>Activities</div>
                  </div>
                </div>
              </div>

              {/* ===== CALIBRATION DATA SECTION ===== */}
              <div style={{marginTop: '36px', paddingTop: '28px', borderTop: `3px solid ${siteData.color}40`}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
                  <div style={{background: 'linear-gradient(135deg, #06b6d4, #0891b2)', color: 'white', borderRadius: '10px', padding: '10px 14px', fontWeight: '800', fontSize: '1em', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)'}}>🔧 CALIBRATION THROUGHPUT</div>
                  <div style={{fontSize: '0.85em', fontWeight: '600', color: '#64748b', background: '#ffffff', padding: '6px 12px', borderRadius: '20px', border: '1px solid #cffafe'}}>5 Months • 106 Units</div>
                </div>

                {/* Interactive Calibration Chart */}
                <div style={{background: 'linear-gradient(135deg, #ecfeff, #ffffff)', border: '2px solid #06b6d4', borderRadius: '16px', padding: '24px', marginBottom: '20px'}}>
                  <svg viewBox="0 0 600 240" style={{width: '100%', height: 'auto'}}>
                    <defs>
                      <pattern id="calib-grid" width="120" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 120 0 L 0 0 0 40" fill="none" stroke="#cffafe" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="600" height="200" fill="url(#calib-grid)" />

                    <line x1="50" y1="20" x2="50" y2="180" stroke="#0891b2" strokeWidth="2"/>
                    <line x1="50" y1="180" x2="580" y2="180" stroke="#0891b2" strokeWidth="2"/>

                    {[0, 10, 20, 30, 40, 50].map((val, i) => {
                      const y = 180 - (val * 3.2);
                      return (
                        <g key={`calib-y-${i}`}>
                          <text x="40" y={y + 4} fontSize="11" fill="#64748b" fontWeight="600" textAnchor="end">{val}</text>
                          <line x1="48" y1={y} x2="580" y2={y} stroke="#cffafe" strokeWidth="1" strokeDasharray="3,3"/>
                        </g>
                      );
                    })}

                    {[
                      {month: 'July', qty: 28, x: 120, color: '#ef4444'},
                      {month: 'Aug', qty: 6, x: 220, color: '#f59e0b'},
                      {month: 'Sep', qty: 48, x: 320, color: '#10b981'},
                      {month: 'Oct', qty: 5, x: 420, color: '#3b82f6'},
                      {month: 'Nov', qty: 19, x: 520, color: '#8b5cf6'}
                    ].map((m, idx) => {
                      const barHeight = m.qty * 3.2;
                      const barY = 180 - barHeight;
                      return (
                        <g key={`calib-bar-${idx}`}>
                          <defs>
                            <linearGradient id={`calib-grad-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor={m.color} stopOpacity="1" />
                              <stop offset="100%" stopColor={m.color} stopOpacity="0.7" />
                            </linearGradient>
                          </defs>
                          <rect x={m.x - 25} y={barY} width="50" height={barHeight} fill={`url(#calib-grad-${idx})`} rx="4" style={{transition: 'all 0.3s ease'}}>
                            <animate attributeName="height" from="0" to={barHeight} dur="0.8s" begin={`${idx * 0.1}s`} fill="freeze" />
                            <animate attributeName="y" from="180" to={barY} dur="0.8s" begin={`${idx * 0.1}s`} fill="freeze" />
                          </rect>
                          <text x={m.x} y={barY - 8} fontSize="14" fontWeight="800" fill={m.color} textAnchor="middle">{m.qty}</text>
                          <text x={m.x} y="200" fontSize="13" fontWeight="700" fill="#0891b2" textAnchor="middle">{m.month}</text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Summary Stats Below Chart */}
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px'}}>
                    <div style={{background: '#f0fdfa', border: '2px solid #06b6d4', borderRadius: '10px', padding: '12px', textAlign: 'center'}}>
                      <div style={{fontSize: '0.75em', fontWeight: '700', color: '#0c4a6e', marginBottom: '4px'}}>Peak Month</div>
                      <div style={{fontSize: '1.5em', fontWeight: '900', color: '#06b6d4'}}>Sep (48)</div>
                    </div>
                    <div style={{background: '#f0fdfa', border: '2px solid #10b981', borderRadius: '10px', padding: '12px', textAlign: 'center'}}>
                      <div style={{fontSize: '0.75em', fontWeight: '700', color: '#0c4a6e', marginBottom: '4px'}}>Total Units</div>
                      <div style={{fontSize: '1.5em', fontWeight: '900', color: '#10b981'}}>106</div>
                    </div>
                    <div style={{background: '#f0fdfa', border: '2px solid #8b5cf6', borderRadius: '10px', padding: '12px', textAlign: 'center'}}>
                      <div style={{fontSize: '0.75em', fontWeight: '700', color: '#0c4a6e', marginBottom: '4px'}}>Monthly Avg</div>
                      <div style={{fontSize: '1.5em', fontWeight: '900', color: '#8b5cf6'}}>21.2</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== SECTION SEPARATOR ===== */}
              <div style={{margin: '40px 0 0 0', padding: '24px 0', position: 'relative', display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{flex: 1, height: '3px', background: `linear-gradient(90deg, #f59e0b50, #f59e0b0)`, borderRadius: '2px'}}></div>
                <div style={{fontSize: '0.7em', fontWeight: '700', letterSpacing: '1.5px', color: '#94a3b8', textTransform: 'uppercase'}}>━━ Section 3 ━━</div>
                <div style={{flex: 1, height: '3px', background: `linear-gradient(90deg, #f59e0b0, #f59e0b50)`, borderRadius: '2px'}}></div>
              </div>

              {/* ===== SAMPLING DATA SECTION ===== */}
              <div style={{marginTop: '36px', paddingTop: '28px', borderTop: `3px solid ${siteData.color}40`}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
                  <div style={{background: `linear-gradient(135deg, #f59e0b, #d97706)`, color: 'white', borderRadius: '10px', padding: '8px 12px', fontWeight: '800', fontSize: '0.95em', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'}}>
                    📊 SAMPLING & QUALITY ASSURANCE
                  </div>
                  <div style={{fontSize: '0.8em', fontWeight: '600', color: '#64748b'}}>3 Sampling Types • 1396 Lots • 585k+ Units</div>
                </div>

                {/* Three Sampling Types - Main KPI Cards */}
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px'}}>
                  {[
                    {type: 'IQC Sampling', icon: '🔍', color: '#ef4444', bgColor: '#fef2f2', borderColor: '#ef4444', lots: 745, size: 383550, hours: '1564:18'},
                    {type: 'FQC Sampling', icon: '✓', color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#3b82f6', lots: 419, size: 101250, hours: '94:03'},
                    {type: 'IPQC Sampling', icon: '🎯', color: '#f59e0b', bgColor: '#fffbeb', borderColor: '#f59e0b', lots: 232, size: 100395, hours: '115:03'}
                  ].map((sample, idx) => (
                    <div key={idx} style={{background: sample.bgColor, border: `2px solid ${sample.borderColor}`, borderRadius: '14px', padding: '18px', transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = `0 8px 20px ${sample.color}20`; e.currentTarget.style.transform = 'translateY(-4px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)'; e.currentTarget.style.transform = 'translateY(0)';}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingBottom: '12px', borderBottom: `2px solid ${sample.borderColor}30`}}>
                        <div style={{fontSize: '1.6em'}}>{sample.icon}</div>
                        <div style={{fontSize: '0.9em', fontWeight: '800', color: sample.color}}>{sample.type}</div>
                      </div>
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px'}}>
                        <div style={{background: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', border: `1px solid ${sample.borderColor}20`}}>
                          <div style={{fontSize: '0.65em', fontWeight: '600', color: '#64748b', marginBottom: '4px'}}>Lots/Batch</div>
                          <div style={{fontSize: '1.1em', fontWeight: '800', color: sample.color}}>{sample.lots}</div>
                        </div>
                        <div style={{background: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', border: `1px solid ${sample.borderColor}20`}}>
                          <div style={{fontSize: '0.65em', fontWeight: '600', color: '#64748b', marginBottom: '4px'}}>Size</div>
                          <div style={{fontSize: '0.95em', fontWeight: '800', color: sample.color}}>{(sample.size / 1000).toFixed(0)}k</div>
                        </div>
                        <div style={{background: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', border: `1px solid ${sample.borderColor}20`}}>
                          <div style={{fontSize: '0.65em', fontWeight: '600', color: '#64748b', marginBottom: '4px'}}>Hours</div>
                          <div style={{fontSize: '0.9em', fontWeight: '800', color: sample.color}}>{sample.hours}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Monthly Comparison Charts - Enhanced */}
                <div style={{background: 'linear-gradient(135deg, #f8fafc, #ffffff)', border: '2px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '28px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'}}>
                  <div style={{fontSize: '1em', fontWeight: '800', color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{width: '6px', height: '28px', background: 'linear-gradient(180deg, #3b82f6, #1d4ed8)', borderRadius: '3px'}}></div>
                    <span>Monthly Sampling Trends</span>
                    <div style={{marginLeft: 'auto', background: '#dbeafe', color: '#1e40af', padding: '6px 12px', borderRadius: '20px', fontSize: '0.7em', fontWeight: '700'}}>5-Month Analysis</div>
                  </div>

                  {/* Chart Grid */}
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px'}}>
                    {/* IQC Chart - Enhanced */}
                    <div style={{background: 'white', borderRadius: '14px', padding: '18px', border: '2px solid #fecaca', boxShadow: '0 2px 8px rgba(239, 68, 68, 0.1)', transition: 'all 0.3s ease', cursor: 'pointer'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.2)'; e.currentTarget.style.transform = 'translateY(-4px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.1)'; e.currentTarget.style.transform = 'translateY(0)';}}>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', paddingBottom: '12px', borderBottom: '3px solid #ef4444'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <div style={{fontSize: '1.4em'}}>🔍</div>
                          <div style={{fontSize: '0.85em', fontWeight: '800', color: '#1e293b'}}>IQC - Lots/Batch</div>
                        </div>
                        <div style={{fontSize: '0.7em', fontWeight: '700', color: '#ef4444', background: '#fef2f2', padding: '4px 8px', borderRadius: '6px'}}>745 Total</div>
                      </div>
                      <div style={{height: '150px', display: 'flex', alignItems: 'flex-end', gap: '10px', justifyContent: 'space-around', paddingBottom: '10px'}}>
                        {[{m: 'Jul', v: 119}, {m: 'Aug', v: 196}, {m: 'Sep', v: 175}, {m: 'Oct', v: 112}, {m: 'Nov', v: 143}].map((d, i) => (
                          <div key={i} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'}}>
                            <div style={{width: '100%', height: `${(d.v / 196) * 130}px`, background: 'linear-gradient(180deg, #ef4444, #dc2626)', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '6px', fontSize: '0.7em', fontWeight: '800', color: 'white', boxShadow: '0 4px 8px rgba(239, 68, 68, 0.3)', transition: 'all 0.3s ease'}}>{d.v}</div>
                            <div style={{fontSize: '0.75em', fontWeight: '700', color: '#64748b'}}>{d.m}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FQC Chart - Enhanced */}
                    <div style={{background: 'white', borderRadius: '14px', padding: '18px', border: '2px solid #bfdbfe', boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)', transition: 'all 0.3s ease', cursor: 'pointer'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.2)'; e.currentTarget.style.transform = 'translateY(-4px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.1)'; e.currentTarget.style.transform = 'translateY(0)';}}>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', paddingBottom: '12px', borderBottom: '3px solid #3b82f6'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <div style={{fontSize: '1.4em'}}>✓</div>
                          <div style={{fontSize: '0.85em', fontWeight: '800', color: '#1e293b'}}>FQC - Lots/Batch</div>
                        </div>
                        <div style={{fontSize: '0.7em', fontWeight: '700', color: '#3b82f6', background: '#eff6ff', padding: '4px 8px', borderRadius: '6px'}}>419 Total</div>
                      </div>
                      <div style={{height: '150px', display: 'flex', alignItems: 'flex-end', gap: '10px', justifyContent: 'space-around', paddingBottom: '10px'}}>
                        {[{m: 'Jul', v: 72}, {m: 'Aug', v: 52}, {m: 'Sep', v: 93}, {m: 'Oct', v: 95}, {m: 'Nov', v: 107}].map((d, i) => (
                          <div key={i} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'}}>
                            <div style={{width: '100%', height: `${(d.v / 107) * 130}px`, background: 'linear-gradient(180deg, #3b82f6, #1d4ed8)', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '6px', fontSize: '0.7em', fontWeight: '800', color: 'white', boxShadow: '0 4px 8px rgba(59, 130, 246, 0.3)', transition: 'all 0.3s ease'}}>{d.v}</div>
                            <div style={{fontSize: '0.75em', fontWeight: '700', color: '#64748b'}}>{d.m}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* IPQC Chart - Enhanced */}
                    <div style={{background: 'white', borderRadius: '14px', padding: '18px', border: '2px solid #fde68a', boxShadow: '0 2px 8px rgba(245, 158, 11, 0.1)', transition: 'all 0.3s ease', cursor: 'pointer'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(245, 158, 11, 0.2)'; e.currentTarget.style.transform = 'translateY(-4px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(245, 158, 11, 0.1)'; e.currentTarget.style.transform = 'translateY(0)';}}>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', paddingBottom: '12px', borderBottom: '3px solid #f59e0b'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <div style={{fontSize: '1.4em'}}>🎯</div>
                          <div style={{fontSize: '0.85em', fontWeight: '800', color: '#1e293b'}}>IPQC - Lots/Batch</div>
                        </div>
                        <div style={{fontSize: '0.7em', fontWeight: '700', color: '#f59e0b', background: '#fffbeb', padding: '4px 8px', borderRadius: '6px'}}>232 Total</div>
                      </div>
                      <div style={{height: '150px', display: 'flex', alignItems: 'flex-end', gap: '10px', justifyContent: 'space-around', paddingBottom: '10px'}}>
                        {[{m: 'Jul', v: 52}, {m: 'Aug', v: 49}, {m: 'Sep', v: 49}, {m: 'Oct', v: 40}, {m: 'Nov', v: 42}].map((d, i) => (
                          <div key={i} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'}}>
                            <div style={{width: '100%', height: `${(d.v / 52) * 130}px`, background: 'linear-gradient(180deg, #f59e0b, #d97706)', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '6px', fontSize: '0.7em', fontWeight: '800', color: 'white', boxShadow: '0 4px 8px rgba(245, 158, 11, 0.3)', transition: 'all 0.3s ease'}}>{d.v}</div>
                            <div style={{fontSize: '0.75em', fontWeight: '700', color: '#64748b'}}>{d.m}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary KPIs */}
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px'}}>
                  <div style={{background: '#fef2f2', border: '2px solid #ef4444', borderRadius: '12px', padding: '14px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.75em', fontWeight: '700', color: '#7f1d1d', marginBottom: '6px', textTransform: 'uppercase'}}>Total IQC Lots</div>
                    <div style={{fontSize: '1.8em', fontWeight: '900', color: '#ef4444'}}>745</div>
                  </div>
                  <div style={{background: '#eff6ff', border: '2px solid #3b82f6', borderRadius: '12px', padding: '14px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.75em', fontWeight: '700', color: '#1e3a8a', marginBottom: '6px', textTransform: 'uppercase'}}>Total FQC Lots</div>
                    <div style={{fontSize: '1.8em', fontWeight: '900', color: '#3b82f6'}}>419</div>
                  </div>
                  <div style={{background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '14px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.75em', fontWeight: '700', color: '#78350f', marginBottom: '6px', textTransform: 'uppercase'}}>Total IPQC Lots</div>
                    <div style={{fontSize: '1.8em', fontWeight: '900', color: '#f59e0b'}}>232</div>
                  </div>
                  <div style={{background: '#f0fdf4', border: '2px solid #22c55e', borderRadius: '12px', padding: '14px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.75em', fontWeight: '700', color: '#15803d', marginBottom: '6px', textTransform: 'uppercase'}}>Combined Time</div>
                    <div style={{fontSize: '1.5em', fontWeight: '900', color: '#22c55e'}}>1773:24</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Main Overview */}
        <section
          className="content-slide"
          style={{
            overflowY: 'auto',
            paddingTop: '20px',
            background: '#ffffff',
            color: '#0f172a',
            filter: selectedDetail ? 'blur(2px)' : 'none',
            opacity: selectedDetail ? 0.35 : 1,
            pointerEvents: selectedDetail ? 'none' : 'auto',
            transition: 'opacity 0.2s ease, filter 0.2s ease'
          }}
          aria-hidden={!!selectedDetail}
        >
          {/* Header Section */}
          <div style={{
            marginBottom: '20px',
            position: 'relative'
          }}>
            <h2 style={{
              fontSize: '2em',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '4px',
              marginTop: '0px'
            }}>
              📊 Key Metrics Overview - IPQA
            </h2>
            <div style={{
              height: '4px',
              background: 'linear-gradient(90deg, #059669, #8b5cf6, #0ea5e9)',
              borderRadius: '2px',
              width: '200px',
              marginBottom: '12px'
            }}></div>
          </div>

          {/* Overall Quality Performance Section - MOVED TO TOP */}
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
            borderRadius: '16px',
            marginBottom: '24px',
            border: '3px solid #0ea5e9',
            boxShadow: '0 8px 24px rgba(14, 165, 233, 0.15)'
          }}>
            <div style={{
              fontSize: '1.1em',
              fontWeight: '800',
              color: '#0369a1',
              marginBottom: '16px',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              📊 In-Process Quality Assurance Compliance Across All Sites
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px'}}>
              {/* SITE-I Overall Quality Performance */}
              <div style={{
                background: 'linear-gradient(135deg, #ffffff, #fef2f2)',
                borderRadius: '14px',
                padding: '20px',
                border: '3px solid #dc2626',
                boxShadow: '0 6px 20px rgba(220, 38, 38, 0.15)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{position: 'absolute', top: '-30px', right: '-30px', fontSize: '6em', opacity: '0.05'}}>🎯</div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                  paddingBottom: '10px',
                  borderBottom: '2px solid #fecaca'
                }}>
                  <div style={{fontSize: '1.5em'}}>🎯</div>
                  <div style={{flex: 1}}>
                    <div style={{fontSize: '1.2em', fontWeight: '900', color: '#dc2626'}}>SITE-I</div>
                    <div style={{fontSize: '0.7em', fontWeight: '600', color: '#7f1d1d'}}>Overall Quality Performance</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedQualityScoreInfo('SITE-I');
                    }}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      fontSize: '0.9em',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)',
                      position: 'relative',
                      zIndex: 10,
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.5)';e.currentTarget.style.background = '#b91c1c';}}
                    onMouseLeave={(e) => {e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(220, 38, 38, 0.3)';e.currentTarget.style.background = '#dc2626';}}
                  >
                    ⓘ
                  </button>
                </div>

                <div style={{textAlign: 'center', marginBottom: '12px'}}>
                  <div style={{fontSize: '2.8em', fontWeight: '900', color: '#dc2626', lineHeight: 1}}>99.6%</div>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#991b1b', textTransform: 'uppercase'}}>Quality Score</div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  padding: '10px',
                  background: '#fee2e2',
                  borderRadius: '8px'
                }}>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '0.65em', fontWeight: '700', color: '#7f1d1d', marginBottom: '2px'}}>Before</div>
                    <div style={{fontSize: '1.3em', fontWeight: '900', color: '#ef4444'}}>99.2%</div>
                  </div>
                  <div style={{fontSize: '1.2em', color: '#dc2626'}}>→</div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '0.65em', fontWeight: '700', color: '#7f1d1d', marginBottom: '2px'}}>Now</div>
                    <div style={{fontSize: '1.3em', fontWeight: '900', color: '#16a34a'}}>99.6%</div>
                  </div>
                </div>

                <div style={{
                  textAlign: 'center',
                  padding: '10px',
                  background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                  borderRadius: '8px',
                  border: '2px solid #22c55e'
                }}>
                  <div style={{fontSize: '0.8em', fontWeight: '700', color: '#166534'}}>
                    ↑ +0.4% improvement
                  </div>
                </div>
              </div>

              {/* SITE-III Overall Quality Performance */}
              <div style={{
                background: 'linear-gradient(135deg, #ffffff, #faf5ff)',
                borderRadius: '14px',
                padding: '20px',
                border: '3px solid #8b5cf6',
                boxShadow: '0 6px 20px rgba(139, 92, 246, 0.15)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{position: 'absolute', top: '-30px', right: '-30px', fontSize: '6em', opacity: '0.05'}}>🎯</div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                  paddingBottom: '10px',
                  borderBottom: '2px solid #e9d5ff'
                }}>
                  <div style={{fontSize: '1.5em'}}>🎯</div>
                  <div style={{flex: 1}}>
                    <div style={{fontSize: '1.2em', fontWeight: '900', color: '#8b5cf6'}}>SITE-III</div>
                    <div style={{fontSize: '0.7em', fontWeight: '600', color: '#6b21a8'}}>Overall Quality Performance</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedQualityScoreInfo('SITE-III');
                    }}
                    style={{
                      background: '#8b5cf6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      fontSize: '0.9em',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
                      position: 'relative',
                      zIndex: 10,
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.5)';e.currentTarget.style.background = '#7c3aed';}}
                    onMouseLeave={(e) => {e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.3)';e.currentTarget.style.background = '#8b5cf6';}}
                  >
                    ⓘ
                  </button>
                </div>

                <div style={{textAlign: 'center', marginBottom: '12px'}}>
                  <div style={{fontSize: '2.8em', fontWeight: '900', color: '#8b5cf6', lineHeight: 1}}>99.2%</div>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase'}}>Quality Score</div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  padding: '10px',
                  background: '#f3e8ff',
                  borderRadius: '8px'
                }}>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '0.65em', fontWeight: '700', color: '#6b21a8', marginBottom: '2px'}}>Before</div>
                    <div style={{fontSize: '1.3em', fontWeight: '900', color: '#a78bfa'}}>98.9%</div>
                  </div>
                  <div style={{fontSize: '1.2em', color: '#8b5cf6'}}>→</div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '0.65em', fontWeight: '700', color: '#6b21a8', marginBottom: '2px'}}>Now</div>
                    <div style={{fontSize: '1.3em', fontWeight: '900', color: '#16a34a'}}>99.2%</div>
                  </div>
                </div>

                <div 
                  onClick={() => setShowSite3Improvements(true)}
                  style={{
                    textAlign: 'center',
                    padding: '10px',
                    background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                    borderRadius: '8px',
                    border: '2px solid #22c55e',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{fontSize: '0.8em', fontWeight: '700', color: '#166534'}}>
                    ↑ +0.3% improvement
                  </div>
                </div>
              </div>

              {/* SITE-V Overall Quality Performance */}
              <div style={{
                background: 'linear-gradient(135deg, #ffffff, #ecfeff)',
                borderRadius: '14px',
                padding: '20px',
                border: '3px solid #0ea5e9',
                boxShadow: '0 6px 20px rgba(14, 165, 233, 0.15)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{position: 'absolute', top: '-30px', right: '-30px', fontSize: '6em', opacity: '0.05'}}>🎯</div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                  paddingBottom: '10px',
                  borderBottom: '2px solid #cffafe'
                }}>
                  <div style={{fontSize: '1.5em'}}>🎯</div>
                  <div style={{flex: 1}}>
                    <div style={{fontSize: '1.2em', fontWeight: '900', color: '#0ea5e9'}}>SITE-V</div>
                    <div style={{fontSize: '0.7em', fontWeight: '600', color: '#0c4a6e'}}>Overall Quality Performance</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedQualityScoreInfo('SITE-V');
                    }}
                    style={{
                      background: '#0ea5e9',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      fontSize: '0.9em',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(14, 165, 233, 0.3)',
                      position: 'relative',
                      zIndex: 10,
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.5)';e.currentTarget.style.background = '#0284c7';}}
                    onMouseLeave={(e) => {e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(14, 165, 233, 0.3)';e.currentTarget.style.background = '#0ea5e9';}}
                  >
                    ⓘ
                  </button>
                </div>

                <div style={{textAlign: 'center', marginBottom: '12px'}}>
                  <div style={{fontSize: '2.8em', fontWeight: '900', color: '#0ea5e9', lineHeight: 1}}>98.8%</div>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#0369a1', textTransform: 'uppercase'}}>Quality Score</div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  padding: '10px',
                  background: '#e0f2fe',
                  borderRadius: '8px'
                }}>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '0.65em', fontWeight: '700', color: '#0c4a6e', marginBottom: '2px'}}>Before</div>
                    <div style={{fontSize: '1.3em', fontWeight: '900', color: '#38bdf8'}}>98.3%</div>
                  </div>
                  <div style={{fontSize: '1.2em', color: '#0ea5e9'}}>→</div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '0.65em', fontWeight: '700', color: '#0c4a6e', marginBottom: '2px'}}>Now</div>
                    <div style={{fontSize: '1.3em', fontWeight: '900', color: '#16a34a'}}>98.8%</div>
                  </div>
                </div>

                <div 
                  onClick={() => setShowSiteVImprovements(true)}
                  style={{
                    textAlign: 'center',
                    padding: '10px',
                    background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                    borderRadius: '8px',
                    border: '2px solid #22c55e',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{fontSize: '0.8em', fontWeight: '700', color: '#166534'}}>
                    ↑ +0.5% improvement
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Performance Dashboard */}
          <IPQAOverallPerformance />

          {/* Site Cards */}
          {Object.entries(metricsData).map(([siteName, siteData]) => (
            <SiteCard key={siteName} siteName={siteName} siteData={siteData} />
          ))}

          {/* Department Chart Detail Modal */}
          {selectedDeptChart && createPortal(
            <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px'}} onClick={(e) => {if(e.target === e.currentTarget) setSelectedDeptChart(null);}}>
              <div style={{background: '#ffffff', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)', maxWidth: '900px', width: '100%', maxHeight: '90vh', overflow: 'auto', padding: '32px', position: 'relative'}}>
                {/* Close Button */}
                <button onClick={() => setSelectedDeptChart(null)} style={{position: 'absolute', top: '16px', right: '16px', background: '#f0f9ff', border: '2px solid #e0f2fe', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.2em', color: '#0369a1', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease'}}
                onMouseEnter={(e) => {e.currentTarget.style.background = '#e0f2fe'; e.currentTarget.style.transform = 'scale(1.1)';}}
                onMouseLeave={(e) => {e.currentTarget.style.background = '#f0f9ff'; e.currentTarget.style.transform = 'scale(1)';}}>×</button>

                {/* Modal Header with Navigation */}
                <div style={{marginBottom: '28px', paddingBottom: '16px', borderBottom: `3px solid ${selectedDeptChart.color}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px'}}>
                  <div style={{flex: 1}}>
                    <div style={{fontSize: '1.6em', fontWeight: '800', color: '#0f172a', marginBottom: '8px'}}>{selectedDeptChart.dept}</div>
                    <div style={{fontSize: '0.9em', color: '#64748b', fontWeight: '600'}}>Complete Monthly Performance Analysis (July - November)</div>
                  </div>
                  
                  {/* Navigation Arrows for Department Carousel */}
                  <div style={{display: 'flex', gap: '8px'}}>
                    <button onClick={() => {
                      const depts = [
                        {dept: '🧼 Chip Assembly/Washing/Drying', clearance: [651, 774, 528, 465, 509], closure: [655, 766, 527, 453, 508], reverif: [83, 52, 63, 46, 51], color: '#6366f1'},
                        {dept: '⚗️ MG Preparation', clearance: [120, 145, 98, 87, 102], closure: [118, 142, 96, 85, 100], reverif: [45, 38, 42, 35, 40], color: '#8b5cf6'},
                        {dept: '🧪 MG Filling Room', clearance: [54, 62, 76, 57, 66], closure: [54, 62, 76, 57, 66], reverif: [141, 88, 114, 65, 43], color: '#06b6d4'},
                        {dept: '👁️ Coat Inspection', clearance: [89, 102, 76, 69, 81], closure: [87, 100, 74, 67, 79], reverif: [56, 48, 52, 44, 50], color: '#10b981'},
                        {dept: '🔷 Polymer Filling', clearance: [145, 168, 132, 118, 135], closure: [143, 165, 130, 116, 133], reverif: [72, 62, 68, 58, 65], color: '#f59e0b'},
                        {dept: '🔌 Chip Sorting', clearance: [79, 126, 98, 85, 68], closure: [80, 132, 98, 88, 68], reverif: [31, 46, 33, 18, 16], color: '#ef4444'},
                        {dept: '⚡ Flashwriting', clearance: [112, 134, 98, 92, 105], closure: [110, 131, 96, 90, 103], reverif: [38, 44, 35, 28, 32], color: '#ec4899'},
                        {dept: '📦 Pouching Room 2&3', clearance: [176, 201, 145, 132, 154], closure: [174, 198, 143, 130, 152], reverif: [64, 72, 58, 48, 56], color: '#8b5cf6'},
                        {dept: '🏭 Assembly Room 3', clearance: [98, 115, 87, 79, 92], closure: [96, 112, 85, 77, 90], reverif: [52, 58, 48, 42, 50], color: '#06b6d4'},
                        {dept: '🔧 Tube Sorting', clearance: [134, 156, 121, 108, 128], closure: [132, 153, 119, 106, 126], reverif: [58, 68, 52, 44, 56], color: '#6366f1'},
                        {dept: '📋 Packing', clearance: [167, 189, 145, 131, 152], closure: [165, 186, 143, 129, 150], reverif: [71, 81, 62, 52, 65], color: '#10b981'},
                        {dept: '🧬 Master Mix Preparation', clearance: [203, 234, 178, 162, 189], closure: [201, 231, 176, 160, 187], reverif: [89, 102, 78, 65, 88], color: '#f59e0b'}
                      ];
                      const currentIdx = depts.findIndex(d => d.dept === selectedDeptChart.dept);
                      const prevIdx = currentIdx === 0 ? depts.length - 1 : currentIdx - 1;
                      setSelectedDeptChart(depts[prevIdx]);
                    }} style={{background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1em', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(14, 165, 233, 0.2)'}}
                    onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.4)'; e.currentTarget.style.transform = 'scale(1.05)';}}
                    onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(14, 165, 233, 0.2)'; e.currentTarget.style.transform = 'scale(1)';}}>
                      ← Prev
                    </button>
                    <button onClick={() => {
                      const depts = [
                        {dept: '🧼 Chip Assembly/Washing/Drying', clearance: [651, 774, 528, 465, 509], closure: [655, 766, 527, 453, 508], reverif: [83, 52, 63, 46, 51], color: '#6366f1'},
                        {dept: '⚗️ MG Preparation', clearance: [120, 145, 98, 87, 102], closure: [118, 142, 96, 85, 100], reverif: [45, 38, 42, 35, 40], color: '#8b5cf6'},
                        {dept: '🧪 MG Filling Room', clearance: [54, 62, 76, 57, 66], closure: [54, 62, 76, 57, 66], reverif: [141, 88, 114, 65, 43], color: '#06b6d4'},
                        {dept: '👁️ Coat Inspection', clearance: [89, 102, 76, 69, 81], closure: [87, 100, 74, 67, 79], reverif: [56, 48, 52, 44, 50], color: '#10b981'},
                        {dept: '🔷 Polymer Filling', clearance: [145, 168, 132, 118, 135], closure: [143, 165, 130, 116, 133], reverif: [72, 62, 68, 58, 65], color: '#f59e0b'},
                        {dept: '🔌 Chip Sorting', clearance: [79, 126, 98, 85, 68], closure: [80, 132, 98, 88, 68], reverif: [31, 46, 33, 18, 16], color: '#ef4444'},
                        {dept: '⚡ Flashwriting', clearance: [112, 134, 98, 92, 105], closure: [110, 131, 96, 90, 103], reverif: [38, 44, 35, 28, 32], color: '#ec4899'},
                        {dept: '📦 Pouching Room 2&3', clearance: [176, 201, 145, 132, 154], closure: [174, 198, 143, 130, 152], reverif: [64, 72, 58, 48, 56], color: '#8b5cf6'},
                        {dept: '🏭 Assembly Room 3', clearance: [98, 115, 87, 79, 92], closure: [96, 112, 85, 77, 90], reverif: [52, 58, 48, 42, 50], color: '#06b6d4'},
                        {dept: '🔧 Tube Sorting', clearance: [134, 156, 121, 108, 128], closure: [132, 153, 119, 106, 126], reverif: [58, 68, 52, 44, 56], color: '#6366f1'},
                        {dept: '📋 Packing', clearance: [167, 189, 145, 131, 152], closure: [165, 186, 143, 129, 150], reverif: [71, 81, 62, 52, 65], color: '#10b981'},
                        {dept: '🧬 Master Mix Preparation', clearance: [203, 234, 178, 162, 189], closure: [201, 231, 176, 160, 187], reverif: [89, 102, 78, 65, 88], color: '#f59e0b'}
                      ];
                      const currentIdx = depts.findIndex(d => d.dept === selectedDeptChart.dept);
                      const nextIdx = currentIdx === depts.length - 1 ? 0 : currentIdx + 1;
                      setSelectedDeptChart(depts[nextIdx]);
                    }} style={{background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1em', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(14, 165, 233, 0.2)'}}
                    onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.4)'; e.currentTarget.style.transform = 'scale(1.05)';}}
                    onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(14, 165, 233, 0.2)'; e.currentTarget.style.transform = 'scale(1)';}}>
                      Next →
                    </button>
                  </div>
                </div>

                {/* Monthly Data Table */}
                <div style={{marginBottom: '28px', overflowX: 'auto'}}>
                  <table style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                      <tr style={{background: `linear-gradient(135deg, ${selectedDeptChart.color}, ${selectedDeptChart.color}dd)`, color: 'white'}}>
                        <th style={{padding: '12px 16px', textAlign: 'left', fontWeight: '800', fontSize: '0.9em'}}>Metric</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>Jul</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>Aug</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>Sep</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>Oct</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>Nov</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Clearance Row */}
                      <tr style={{background: '#f9fafb', borderBottom: '1px solid #e0f2fe'}}>
                        <td style={{padding: '14px 16px', fontWeight: '700', color: '#0f172a', background: '#f0f9ff'}}>Clearance</td>
                        {selectedDeptChart.clearance.map((val, idx) => (
                          <td key={idx} style={{padding: '14px 16px', textAlign: 'center', fontWeight: '700', color: selectedDeptChart.color, fontSize: '1em'}}>{val}</td>
                        ))}
                        <td style={{padding: '14px 16px', textAlign: 'center', fontWeight: '800', color: selectedDeptChart.color, background: '#f0f9ff', fontSize: '1.05em'}}>
                          {Math.round(selectedDeptChart.clearance.reduce((a, b) => a + b) / selectedDeptChart.clearance.length)}
                        </td>
                      </tr>

                      {/* Closure Row */}
                      <tr style={{background: '#ffffff', borderBottom: '1px solid #e0f2fe'}}>
                        <td style={{padding: '14px 16px', fontWeight: '700', color: '#0f172a', background: '#f0f9ff'}}>Closure</td>
                        {selectedDeptChart.closure.map((val, idx) => (
                          <td key={idx} style={{padding: '14px 16px', textAlign: 'center', fontWeight: '700', color: selectedDeptChart.color, fontSize: '1em', opacity: 0.7}}>{val}</td>
                        ))}
                        <td style={{padding: '14px 16px', textAlign: 'center', fontWeight: '800', color: selectedDeptChart.color, background: '#f0f9ff', fontSize: '1.05em', opacity: 0.7}}>
                          {Math.round(selectedDeptChart.closure.reduce((a, b) => a + b) / selectedDeptChart.closure.length)}
                        </td>
                      </tr>

                      {/* Re-Verification Row */}
                      <tr style={{background: '#f9fafb'}}>
                        <td style={{padding: '14px 16px', fontWeight: '700', color: '#0f172a', background: '#f0f9ff'}}>Re-Verification</td>
                        {selectedDeptChart.reverif.map((val, idx) => (
                          <td key={idx} style={{padding: '14px 16px', textAlign: 'center', fontWeight: '700', color: selectedDeptChart.color, fontSize: '1em', opacity: 0.5}}>{val}</td>
                        ))}
                        <td style={{padding: '14px 16px', textAlign: 'center', fontWeight: '800', color: selectedDeptChart.color, background: '#f0f9ff', fontSize: '1.05em', opacity: 0.5}}>
                          {Math.round(selectedDeptChart.reverif.reduce((a, b) => a + b) / selectedDeptChart.reverif.length)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Summary Statistics */}
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px'}}>
                  <div style={{background: `linear-gradient(135deg, #f0f9ff, #e0f2fe)`, border: `2px solid ${selectedDeptChart.color}`, borderRadius: '12px', padding: '18px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.8em', fontWeight: '700', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase'}}>Avg Clearance</div>
                    <div style={{fontSize: '2em', fontWeight: '900', color: selectedDeptChart.color}}>
                      {Math.round(selectedDeptChart.clearance.reduce((a, b) => a + b) / selectedDeptChart.clearance.length)}
                    </div>
                  </div>
                  <div style={{background: `linear-gradient(135deg, #f0f9ff, #e0f2fe)`, border: `2px solid ${selectedDeptChart.color}`, borderRadius: '12px', padding: '18px', textAlign: 'center', opacity: 0.7}}>
                    <div style={{fontSize: '0.8em', fontWeight: '700', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase'}}>Avg Closure</div>
                    <div style={{fontSize: '2em', fontWeight: '900', color: selectedDeptChart.color}}>
                      {Math.round(selectedDeptChart.closure.reduce((a, b) => a + b) / selectedDeptChart.closure.length)}
                    </div>
                  </div>
                  <div style={{background: `linear-gradient(135deg, #f0f9ff, #e0f2fe)`, border: `2px solid ${selectedDeptChart.color}`, borderRadius: '12px', padding: '18px', textAlign: 'center', opacity: 0.5}}>
                    <div style={{fontSize: '0.8em', fontWeight: '700', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase'}}>Avg Re-Verification</div>
                    <div style={{fontSize: '2em', fontWeight: '900', color: selectedDeptChart.color}}>
                      {Math.round(selectedDeptChart.reverif.reduce((a, b) => a + b) / selectedDeptChart.reverif.length)}
                    </div>
                  </div>
                </div>

                {/* Performance Insights */}
                <div style={{background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '2px solid #f59e0b', borderRadius: '12px', padding: '16px'}}>
                  <div style={{fontSize: '0.9em', fontWeight: '700', color: '#b45309', marginBottom: '10px'}}>📈 Performance Insights</div>
                  <div style={{fontSize: '0.85em', color: '#92400e', lineHeight: '1.6'}}>
                    <div>• Clearance Average: <strong>{Math.round(selectedDeptChart.clearance.reduce((a, b) => a + b) / selectedDeptChart.clearance.length)}</strong> - Highest performer in line clearance efficiency</div>
                    <div>• Closure Average: <strong>{Math.round(selectedDeptChart.closure.reduce((a, b) => a + b) / selectedDeptChart.closure.length)}</strong> - Consistent closure performance</div>
                    <div>• Re-Verification Average: <strong>{Math.round(selectedDeptChart.reverif.reduce((a, b) => a + b) / selectedDeptChart.reverif.length)}</strong> - Quality assurance touchpoints</div>
                    <div style={{marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #fcd34d'}}>
                      💡 <strong>Trend Analysis:</strong> Review monthly variations to identify peak efficiency periods and areas for operational optimization.
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}

          {/* Cartridge Assembly Chart Detail Modal */}
          {selectedCartridgeChart && createPortal(
            <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px'}} onClick={(e) => {if(e.target === e.currentTarget) setSelectedCartridgeChart(null);}}>
              <div style={{background: '#ffffff', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)', maxWidth: '900px', width: '100%', maxHeight: '90vh', overflow: 'auto', padding: '32px', position: 'relative'}}>
                {/* Close Button */}
                <button onClick={() => setSelectedCartridgeChart(null)} style={{position: 'absolute', top: '16px', right: '16px', background: '#f0fdf4', border: '2px solid #d1fae5', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.2em', color: '#059669', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease'}}
                onMouseEnter={(e) => {e.currentTarget.style.background = '#d1fae5'; e.currentTarget.style.transform = 'scale(1.1)';}}
                onMouseLeave={(e) => {e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.transform = 'scale(1)';}}>×</button>

                {/* Modal Header */}
                <div style={{marginBottom: '28px', paddingBottom: '16px', borderBottom: `3px solid ${selectedCartridgeChart.color}`}}>
                  <div style={{fontSize: '1.6em', fontWeight: '800', color: '#0f172a', marginBottom: '8px'}}>{selectedCartridgeChart.name}</div>
                  <div style={{fontSize: '0.9em', color: '#64748b', fontWeight: '600'}}>Monthly Performance Data (Jan-Aug Average, Sep, Oct, Nov)</div>
                </div>

                {/* Monthly Data Table */}
                <div style={{marginBottom: '28px', overflowX: 'auto'}}>
                  <table style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                      <tr style={{background: `linear-gradient(135deg, ${selectedCartridgeChart.color}, ${selectedCartridgeChart.color}dd)`, color: 'white'}}>
                        <th style={{padding: '12px 16px', textAlign: 'left', fontWeight: '800', fontSize: '0.9em'}}>Metric</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>Jan-Aug</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>September</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>October</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>November</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Clearance Row */}
                      {selectedCartridgeChart.data.clearance[0] > 0 && (
                        <tr style={{background: '#f9fafb', borderBottom: '1px solid #d1fae5'}}>
                          <td style={{padding: '14px 16px', fontWeight: '700', color: '#0f172a', background: '#f0fdf4'}}>Clearance</td>
                          {selectedCartridgeChart.data.clearance.map((val, idx) => (
                            <td key={idx} style={{padding: '14px 16px', textAlign: 'center', fontWeight: '700', color: selectedCartridgeChart.color, fontSize: '1em'}}>{val.toFixed(2)}</td>
                          ))}
                          <td style={{padding: '14px 16px', textAlign: 'center', fontWeight: '800', color: selectedCartridgeChart.color, background: '#f0fdf4', fontSize: '1.05em'}}>
                            {(selectedCartridgeChart.data.clearance.reduce((a, b) => a + b) / selectedCartridgeChart.data.clearance.length).toFixed(2)}
                          </td>
                        </tr>
                      )}

                      {/* Closure Row */}
                      {selectedCartridgeChart.data.closure[0] > 0 && (
                        <tr style={{background: '#ffffff', borderBottom: '1px solid #d1fae5'}}>
                          <td style={{padding: '14px 16px', fontWeight: '700', color: '#0f172a', background: '#f0fdf4'}}>Closure</td>
                          {selectedCartridgeChart.data.closure.map((val, idx) => (
                            <td key={idx} style={{padding: '14px 16px', textAlign: 'center', fontWeight: '700', color: selectedCartridgeChart.color, fontSize: '1em', opacity: 0.7}}>{val.toFixed(2)}</td>
                          ))}
                          <td style={{padding: '14px 16px', textAlign: 'center', fontWeight: '800', color: selectedCartridgeChart.color, background: '#f0fdf4', fontSize: '1.05em', opacity: 0.7}}>
                            {(selectedCartridgeChart.data.closure.reduce((a, b) => a + b) / selectedCartridgeChart.data.closure.length).toFixed(2)}
                          </td>
                        </tr>
                      )}

                      {/* Re-Verification Row */}
                      {selectedCartridgeChart.data.reverif[0] > 0 && (
                        <tr style={{background: '#f9fafb'}}>
                          <td style={{padding: '14px 16px', fontWeight: '700', color: '#0f172a', background: '#f0fdf4'}}>Re-Verification</td>
                          {selectedCartridgeChart.data.reverif.map((val, idx) => (
                            <td key={idx} style={{padding: '14px 16px', textAlign: 'center', fontWeight: '700', color: selectedCartridgeChart.color, fontSize: '1em', opacity: 0.5}}>{val.toFixed(2)}</td>
                          ))}
                          <td style={{padding: '14px 16px', textAlign: 'center', fontWeight: '800', color: selectedCartridgeChart.color, background: '#f0fdf4', fontSize: '1.05em', opacity: 0.5}}>
                            {(selectedCartridgeChart.data.reverif.reduce((a, b) => a + b) / selectedCartridgeChart.data.reverif.length).toFixed(2)}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Summary Statistics */}
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px'}}>
                  {selectedCartridgeChart.data.clearance[0] > 0 && (
                    <div style={{background: `linear-gradient(135deg, #f0fdf4, #e0fce7)`, border: `2px solid ${selectedCartridgeChart.color}`, borderRadius: '12px', padding: '18px', textAlign: 'center'}}>
                      <div style={{fontSize: '0.8em', fontWeight: '700', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase'}}>Avg Clearance</div>
                      <div style={{fontSize: '2em', fontWeight: '900', color: selectedCartridgeChart.color}}>
                        {(selectedCartridgeChart.data.clearance.reduce((a, b) => a + b) / selectedCartridgeChart.data.clearance.length).toFixed(2)}
                      </div>
                    </div>
                  )}
                  {selectedCartridgeChart.data.closure[0] > 0 && (
                    <div style={{background: `linear-gradient(135deg, #f0fdf4, #e0fce7)`, border: `2px solid ${selectedCartridgeChart.color}`, borderRadius: '12px', padding: '18px', textAlign: 'center', opacity: 0.7}}>
                      <div style={{fontSize: '0.8em', fontWeight: '700', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase'}}>Avg Closure</div>
                      <div style={{fontSize: '2em', fontWeight: '900', color: selectedCartridgeChart.color}}>
                        {(selectedCartridgeChart.data.closure.reduce((a, b) => a + b) / selectedCartridgeChart.data.closure.length).toFixed(2)}
                      </div>
                    </div>
                  )}
                  {selectedCartridgeChart.data.reverif[0] > 0 && (
                    <div style={{background: `linear-gradient(135deg, #f0fdf4, #e0fce7)`, border: `2px solid ${selectedCartridgeChart.color}`, borderRadius: '12px', padding: '18px', textAlign: 'center', opacity: 0.5}}>
                      <div style={{fontSize: '0.8em', fontWeight: '700', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase'}}>Avg Re-Verification</div>
                      <div style={{fontSize: '2em', fontWeight: '900', color: selectedCartridgeChart.color}}>
                        {(selectedCartridgeChart.data.reverif.reduce((a, b) => a + b) / selectedCartridgeChart.data.reverif.length).toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Performance Insights */}
                <div style={{background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '2px solid #f59e0b', borderRadius: '12px', padding: '16px'}}>
                  <div style={{fontSize: '0.9em', fontWeight: '700', color: '#b45309', marginBottom: '10px'}}>📈 Activity Performance</div>
                  <div style={{fontSize: '0.85em', color: '#92400e', lineHeight: '1.6'}}>
                    <div>• <strong>{selectedCartridgeChart.name}</strong> - Complete time analysis for all operational metrics</div>
                    <div>• Monthly trends showing clearance, closure, and re-verification performance</div>
                    <div style={{marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #fcd34d'}}>
                      💡 <strong>Analysis:</strong> Review monthly variations to identify optimization opportunities and efficiency patterns in this cartridge assembly activity.
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}

          {/* Manufacturing Chart Detail Modal */}
          {selectedManufacturingChart && createPortal(
            <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px'}} onClick={(e) => {if(e.target === e.currentTarget) setSelectedManufacturingChart(null);}}>
              <div style={{background: '#ffffff', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)', maxWidth: '900px', width: '100%', maxHeight: '90vh', overflow: 'auto', padding: '32px', position: 'relative'}}>
                {/* Close Button */}
                <button onClick={() => setSelectedManufacturingChart(null)} style={{position: 'absolute', top: '16px', right: '16px', background: '#faf5ff', border: '2px solid #e9d5ff', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.2em', color: '#8b5cf6', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease'}}
                onMouseEnter={(e) => {e.currentTarget.style.background = '#e9d5ff'; e.currentTarget.style.transform = 'scale(1.1)';}}
                onMouseLeave={(e) => {e.currentTarget.style.background = '#faf5ff'; e.currentTarget.style.transform = 'scale(1)';}}>×</button>

                {/* Modal Header */}
                <div style={{marginBottom: '28px', paddingBottom: '16px', borderBottom: `3px solid ${selectedManufacturingChart.color}`}}>
                  <div style={{fontSize: '1.6em', fontWeight: '800', color: '#0f172a', marginBottom: '8px'}}>{selectedManufacturingChart.icon} {selectedManufacturingChart.name}</div>
                  <div style={{fontSize: '0.9em', color: '#64748b', fontWeight: '600'}}>Process Performance Data (Jan-Aug Average, Sep, Oct, Nov)</div>
                </div>

                {/* Monthly Data Table */}
                <div style={{marginBottom: '28px', overflowX: 'auto'}}>
                  <table style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                      <tr style={{background: `linear-gradient(135deg, ${selectedManufacturingChart.color}, ${selectedManufacturingChart.color}dd)`, color: 'white'}}>
                        <th style={{padding: '12px 16px', textAlign: 'left', fontWeight: '800', fontSize: '0.9em'}}>Metric</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>Jan-Aug</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>September</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>October</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>November</th>
                        <th style={{padding: '12px 16px', textAlign: 'center', fontWeight: '800', fontSize: '0.9em'}}>Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Clearance Row */}
                      <tr style={{background: '#f9fafb', borderBottom: '1px solid #e9d5ff'}}>
                        <td style={{padding: '14px 16px', fontWeight: '700', color: '#0f172a', background: '#faf5ff'}}>Clearance</td>
                        {selectedManufacturingChart.data.clearance.map((val, idx) => (
                          <td key={idx} style={{padding: '14px 16px', textAlign: 'center', fontWeight: '700', color: selectedManufacturingChart.color, fontSize: '1em'}}>{val.toFixed(2)}</td>
                        ))}
                        <td style={{padding: '14px 16px', textAlign: 'center', fontWeight: '800', color: selectedManufacturingChart.color, background: '#faf5ff', fontSize: '1.05em'}}>
                          {(selectedManufacturingChart.data.clearance.reduce((a, b) => a + b) / selectedManufacturingChart.data.clearance.length).toFixed(2)}
                        </td>
                      </tr>

                      {/* Closure Row */}
                      <tr style={{background: '#ffffff', borderBottom: '1px solid #e9d5ff'}}>
                        <td style={{padding: '14px 16px', fontWeight: '700', color: '#0f172a', background: '#faf5ff'}}>Closure</td>
                        {selectedManufacturingChart.data.closure.map((val, idx) => (
                          <td key={idx} style={{padding: '14px 16px', textAlign: 'center', fontWeight: '700', color: selectedManufacturingChart.color, fontSize: '1em', opacity: 0.7}}>{val.toFixed(2)}</td>
                        ))}
                        <td style={{padding: '14px 16px', textAlign: 'center', fontWeight: '800', color: selectedManufacturingChart.color, background: '#faf5ff', fontSize: '1.05em', opacity: 0.7}}>
                          {(selectedManufacturingChart.data.closure.reduce((a, b) => a + b) / selectedManufacturingChart.data.closure.length).toFixed(2)}
                        </td>
                      </tr>

                      {/* Re-Verification Row */}
                      <tr style={{background: '#f9fafb'}}>
                        <td style={{padding: '14px 16px', fontWeight: '700', color: '#0f172a', background: '#faf5ff'}}>Re-Verification</td>
                        {selectedManufacturingChart.data.reverif.map((val, idx) => (
                          <td key={idx} style={{padding: '14px 16px', textAlign: 'center', fontWeight: '700', color: selectedManufacturingChart.color, fontSize: '1em', opacity: 0.5}}>{val.toFixed(2)}</td>
                        ))}
                        <td style={{padding: '14px 16px', textAlign: 'center', fontWeight: '800', color: selectedManufacturingChart.color, background: '#faf5ff', fontSize: '1.05em', opacity: 0.5}}>
                          {(selectedManufacturingChart.data.reverif.reduce((a, b) => a + b) / selectedManufacturingChart.data.reverif.length).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Summary Statistics */}
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px'}}>
                  <div style={{background: `linear-gradient(135deg, #faf5ff, #e9d5ff)`, border: `2px solid ${selectedManufacturingChart.color}`, borderRadius: '12px', padding: '18px', textAlign: 'center'}}>
                    <div style={{fontSize: '0.8em', fontWeight: '700', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase'}}>Avg Clearance</div>
                    <div style={{fontSize: '2em', fontWeight: '900', color: selectedManufacturingChart.color}}>
                      {(selectedManufacturingChart.data.clearance.reduce((a, b) => a + b) / selectedManufacturingChart.data.clearance.length).toFixed(2)}m
                    </div>
                  </div>
                  <div style={{background: `linear-gradient(135deg, #faf5ff, #e9d5ff)`, border: `2px solid ${selectedManufacturingChart.color}`, borderRadius: '12px', padding: '18px', textAlign: 'center', opacity: 0.7}}>
                    <div style={{fontSize: '0.8em', fontWeight: '700', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase'}}>Avg Closure</div>
                    <div style={{fontSize: '2em', fontWeight: '900', color: selectedManufacturingChart.color}}>
                      {(selectedManufacturingChart.data.closure.reduce((a, b) => a + b) / selectedManufacturingChart.data.closure.length).toFixed(2)}m
                    </div>
                  </div>
                  <div style={{background: `linear-gradient(135deg, #faf5ff, #e9d5ff)`, border: `2px solid ${selectedManufacturingChart.color}`, borderRadius: '12px', padding: '18px', textAlign: 'center', opacity: 0.5}}>
                    <div style={{fontSize: '0.8em', fontWeight: '700', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase'}}>Avg Re-Verification</div>
                    <div style={{fontSize: '2em', fontWeight: '900', color: selectedManufacturingChart.color}}>
                      {(selectedManufacturingChart.data.reverif.reduce((a, b) => a + b) / selectedManufacturingChart.data.reverif.length).toFixed(2)}m
                    </div>
                  </div>
                </div>

                {/* Performance Insights */}
                <div style={{background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', border: '2px solid #ddd6fe', borderRadius: '12px', padding: '16px'}}>
                  <div style={{fontSize: '0.9em', fontWeight: '700', color: '#6b21a8', marginBottom: '10px'}}>📈 Device Performance</div>
                  <div style={{fontSize: '0.85em', color: '#6b21a8', lineHeight: '1.6'}}>
                    <div>• <strong>{selectedManufacturingChart.name}</strong> - {selectedManufacturingChart.processes} manufacturing processes with consistent quality metrics</div>
                    <div>• Monthly trends showing clearance, closure, and re-verification performance across operational periods</div>
                    <div style={{marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #ddd6fe'}}>
                      💡 <strong>Analysis:</strong> Track performance variations to optimize process efficiency and maintain quality standards across all manufacturing operations.
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}

          {/* Footer Insights */}
          <div style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: '#f0fdf4',
            border: '2px solid #86efac',
            borderRadius: '12px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px'
          }}>
            {Object.entries(metricsData).map(([site, data]) => (
              <div key={site} style={{
                padding: '12px',
                backgroundColor: '#ffffff',
                border: `2px solid ${data.color}40`,
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.85em', fontWeight: '700', color: data.color, marginBottom: '4px' }}>
                  {site} Highlight
                </div>
                <div style={{ fontSize: '0.75em', color: '#6b7280' }}>
                  {site === 'SITE-I' && '100% Calibration Compliance (1,153 Equipment)'}
                  {site === 'SITE-III' && '99.2% Approval Rate with 84% Faster Investigations'}
                  {site === 'SITE-V' && 'Highest In-Process Sampling Volume (3,057)'}
                </div>
              </div>
            ))}
          </div>
        </section>

      {/* Detail Modal */}
      {selectedDetail && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
        onClick={() => setSelectedDetail(null)}>
          <div style={{
            position: 'relative',
            width: '95%',
            height: '95%',
            backgroundColor: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
          }}
          onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedDetail(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 1000000,
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                fontSize: '1.5em',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.backgroundColor = '#dc2626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#ef4444';
              }}>
              ✕
            </button>

            {/* Detail Content */}
            <div style={{ height: '100%', overflow: 'auto', backgroundColor: '#f0f9ff' }}>
              {(() => {
                if (import.meta.env?.DEV) console.log('Rendering detail for:', selectedDetail?.metric);
                
                if (!selectedDetail || !selectedDetail.metric) {
                  return <div style={{ padding: '40px', textAlign: 'center' }}>No metric selected</div>;
                }
                
                switch(selectedDetail.metric) {
                  case 'Incoming Sampling':
                    return <SiteVIncomingSampling />;
                  case 'In-Process Sampling':
                    return <SiteVInProcessSampling />;
                  case 'BMR Verification':
                    return <SiteVBMRVerification />;
                  case 'Transfer Note Verif.':
                    return <SiteVTransferNoteVerification />;
                  case 'Destruction Records':
                    return <SiteVDestructionRecords />;
                  case 'Line Clearance':
                    if (selectedDetail.site === 'SITE-I') {
                      return <SiteILineClearance />;
                    }
                    return <SiteIIILineClearance />;
                  case 'Line Closure':
                    if (selectedDetail.site === 'SITE-I') {
                      return <SiteILineClosure />;
                    }
                    return <SiteIIILineClosure />;
                  case 'Re-verification':
                    return <SiteIReverification />;
                  case 'Sampling Types':
                    return <SiteISamplingTypes />;
                  case 'Equipment Calibration':
                    return <SiteIEquipmentCalibration />;
                  case 'Line Reverification':
                    return <SiteIIILineReverification />;
                  case 'Line Verification':
                    return <SiteIIILineVerification />;
                  default:
                    return (
                      <div style={{ padding: '40px', textAlign: 'center', fontSize: '1.2em', color: '#64748b' }}>
                        <p>Component not found for: {selectedDetail.metric}</p>
                        <p style={{ fontSize: '0.8em', marginTop: '20px' }}>Available metrics:</p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          <li>SITE-I: Line Clearance, Line Closure, Re-verification, Sampling Types, Equipment Calibration</li>
                          <li>SITE-III: Line Clearance, Line Closure, Line Reverification, Line Verification</li>
                          <li>SITE-V: Incoming Sampling, In-Process Sampling, BMR Verification, Transfer Note Verif., Destruction Records</li>
                        </ul>
                      </div>
                    );
                }
              })()}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* SITE-III Chart Modal */}
      {selectedSite3Chart && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 999999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            width: '90%',
            height: '90%',
            maxWidth: '1400px',
            maxHeight: '900px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button onClick={() => setSelectedSite3Chart(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontSize: '1.5em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                transition: 'all 0.3s ease',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.backgroundColor = '#dc2626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#ef4444';
              }}>
              ✕
            </button>

            {/* Detail Content */}
            <div style={{ height: '100%', overflow: 'auto', backgroundColor: '#f0f9ff' }}>
              {(() => {
                switch(selectedSite3Chart) {
                  case 'Line Clearance':
                    return <SiteIIILineClearance />;
                  case 'Line Closure':
                    return <SiteIIILineClosure />;
                  case 'Line Reverification':
                    return <SiteIIILineReverification />;
                  case 'Line Verification':
                    return <SiteIIILineVerification />;
                  default:
                    return <div style={{ padding: '40px', textAlign: 'center' }}>No chart selected</div>;
                }
              })()}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* SITE-I Chart Modal */}
      {selectedSiteIChart && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 999999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            width: '90%',
            height: '90%',
            maxWidth: '1400px',
            maxHeight: '900px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflowY: 'auto'
          }}>
            {/* Close Button */}
            <button onClick={() => setSelectedSiteIChart(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                fontSize: '1.5em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000000,
                fontWeight: 'bold'
              }}>
              ✕
            </button>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {(() => {
                switch(selectedSiteIChart) {
                  case 'lineClearance':
                    return <SiteILineClearance />;
                  case 'lineClosure':
                    return <SiteILineClosure />;
                  case 'reverification':
                    return <SiteIReverification />;
                  case 'sampling':
                    return <SiteISamplingTypes />;
                  case 'calibration':
                    return <SiteIEquipmentCalibration />;
                  default:
                    return <div style={{ padding: '40px', textAlign: 'center' }}>No chart selected</div>;
                }
              })()}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* SITE-III KPI Info Modal */}
      {selectedSite3KPIInfo && (
        <Site3KPIInfoModal 
          kpiInfo={selectedSite3KPIInfo}
          onClose={() => setSelectedSite3KPIInfo(null)}
        />
      )}

      {/* Quality Score Info Modal */}
      {selectedQualityScoreInfo && (
        <QualityScoreInfoModal 
          site={selectedQualityScoreInfo}
          onClose={() => setSelectedQualityScoreInfo(null)}
        />
      )}

      {/* SITE-III Improvements Modal */}
      {showSite3Improvements && createPortal(
        <div 
          onClick={() => setShowSite3Improvements(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15))',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '20px',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(to bottom, #ffffff, #fefefe)',
              borderRadius: '24px',
              maxWidth: '1000px',
              width: '100%',
              maxHeight: '92vh',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(139, 92, 246, 0.1)',
              animation: 'slideUp 0.4s ease-out'
            }}
          >
            {/* Header with gradient background */}
            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
              padding: '32px 40px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.4
              }} />
              
              <button
                onClick={() => setShowSite3Improvements(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  fontSize: '1.4em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                ✕
              </button>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  marginBottom: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <span style={{ fontSize: '1.3em' }}>✨</span>
                  <span style={{ fontSize: '0.85em', fontWeight: '600', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Site III IPQA
                  </span>
                </div>
                
                <h2 style={{ 
                  fontSize: '2.2em', 
                  fontWeight: '900', 
                  color: '#ffffff', 
                  margin: '0',
                  lineHeight: '1.2',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}>
                  Key Improvements & Initiatives
                </h2>
              </div>
            </div>

            {/* Scrollable Content */}
            <div style={{ 
              padding: '32px 40px', 
              maxHeight: 'calc(92vh - 150px)', 
              overflowY: 'auto',
              overflowX: 'hidden'
            }}>
              {/* Stats Overview */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '32px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '2px solid #10b981',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    fontSize: '5em',
                    opacity: 0.1,
                    fontWeight: 'bold'
                  }}>✓</div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '3em', fontWeight: '900', color: '#059669', marginBottom: '4px' }}>8</div>
                    <div style={{ fontSize: '0.95em', fontWeight: '700', color: '#047857', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Completed
                    </div>
                    <div style={{ fontSize: '0.8em', color: '#065f46', marginTop: '4px', fontWeight: '500' }}>
                      Successfully Implemented
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '2px solid #3b82f6',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    fontSize: '5em',
                    opacity: 0.1,
                    fontWeight: 'bold'
                  }}>→</div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '3em', fontWeight: '900', color: '#2563eb', marginBottom: '4px' }}>3</div>
                    <div style={{ fontSize: '0.95em', fontWeight: '700', color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      In Progress
                    </div>
                    <div style={{ fontSize: '0.8em', color: '#1e40af', marginTop: '4px', fontWeight: '500' }}>
                      Active Development
                    </div>
                  </div>
                </div>
              </div>

              {/* Completed Initiatives */}
              <div style={{
                marginBottom: '32px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5em',
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                  }}>✓</div>
                  <h3 style={{ 
                    margin: '0', 
                    fontSize: '1.4em', 
                    fontWeight: '800', 
                    color: '#047857',
                    letterSpacing: '-0.5px'
                  }}>
                    Completed Initiatives
                  </h3>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px' 
                }}>
                  {[
                    'Monthly meeting with MG & MN on rejections/challenges',
                    'Observation meetings on shop floor (every 15 days)',
                    'Work instructions in production floor',
                    'Re-Work area implemented (Line-Wise)',
                    'Particle count testing implementation',
                    'QR pasting activity segregation',
                    'Pictorial representation implemented',
                    'Change control tracking sheet'
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      background: '#ffffff',
                      border: '2px solid #d1fae5',
                      borderRadius: '12px',
                      padding: '14px',
                      transition: 'all 0.2s ease',
                      cursor: 'default',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.15)'
                      e.currentTarget.style.borderColor = '#10b981'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = '#d1fae5'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px'
                      }}>
                        <div style={{
                          minWidth: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.85em',
                          fontWeight: '800',
                          color: '#047857'
                        }}>
                          {idx + 1}
                        </div>
                        <div style={{
                          fontSize: '0.88em',
                          color: '#065f46',
                          fontWeight: '600',
                          lineHeight: '1.5',
                          flex: 1
                        }}>
                          {item}
                        </div>
                      </div>
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        fontSize: '1.2em',
                        color: '#10b981',
                        opacity: 0.3
                      }}>✓</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Progress Initiatives */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5em',
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}>→</div>
                  <h3 style={{ 
                    margin: '0', 
                    fontSize: '1.4em', 
                    fontWeight: '800', 
                    color: '#1e40af',
                    letterSpacing: '-0.5px'
                  }}>
                    In Progress Initiatives
                  </h3>
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  {[
                    { icon: '📊', name: 'Defect Rate Setting', progress: 65, color: '#3b82f6' },
                    { icon: '📋', name: 'Limit Sample Register', progress: 45, color: '#8b5cf6' },
                    { icon: '📱', name: 'QR Scanning Software', progress: 50, color: '#06b6d4' }
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      background: '#ffffff',
                      border: '2px solid #dbeafe',
                      borderRadius: '16px',
                      padding: '20px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)'
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.15)'
                      e.currentTarget.style.borderColor = item.color
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = '#dbeafe'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '14px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}>
                          <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            background: `linear-gradient(135deg, ${item.color}15, ${item.color}08)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5em'
                          }}>
                            {item.icon}
                          </div>
                          <div style={{
                            fontSize: '1.05em',
                            fontWeight: '700',
                            color: '#1e293b'
                          }}>
                            {item.name}
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end'
                        }}>
                          <div style={{
                            fontSize: '1.8em',
                            fontWeight: '900',
                            color: item.color,
                            lineHeight: '1'
                          }}>
                            {item.progress}%
                          </div>
                          <div style={{
                            fontSize: '0.7em',
                            color: '#64748b',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Complete
                          </div>
                        </div>
                      </div>
                      
                      <div style={{
                        width: '100%',
                        height: '10px',
                        background: `${item.color}15`,
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: `${item.progress}%`,
                          height: '100%',
                          background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                          borderRadius: '10px',
                          transition: 'width 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                            animation: 'shimmer 2s infinite'
                          }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* SITE-V Improvements Modal */}
      {showSiteVImprovements && createPortal(
        <div 
          onClick={() => setShowSiteVImprovements(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
          >
            <button
              onClick={() => setShowSiteVImprovements(false)}
              style={{
                position: 'sticky',
                top: '20px',
                float: 'right',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#0ea5e9',
                color: '#ffffff',
                fontSize: '1.5em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000000,
                fontWeight: 'bold'
              }}
            >
              ✕
            </button>
            
            <div style={{ padding: '40px' }}>
              <h2 style={{ 
                fontSize: '1.8em', 
                fontWeight: '800', 
                color: '#0ea5e9', 
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                ✨ KEY IMPROVEMENTS & ACTIONS TAKEN
              </h2>

              <div style={{ display: 'grid', gap: '16px' }}>
                {[
                  {
                    icon: '🧪',
                    title: 'QA-controlled primer probe sampling',
                    desc: 'Sampling moved fully under QA oversight to tighten control.'
                  },
                  {
                    icon: '🛡️',
                    title: 'Stronger incoming gate',
                    desc: 'Stringent incoming sampling now catches non-conformance at chip entry.'
                  },
                  {
                    icon: '⚡',
                    title: 'Flashwriting device learnings',
                    desc: 'Repeated incidents surfaced weak pogo pins; verification now flags them early.'
                  },
                  {
                    icon: '📦',
                    title: 'Pouching mix-up prevention',
                    desc: 'Tighter IPQA verification reduced pouch/chip mixups during pouching.'
                  },
                  {
                    icon: '🏷️',
                    title: 'Label verification at sleeves',
                    desc: 'Checks added at chip insertion to stop misprints and mixed labels from user dept.'
                  },
                  {
                    icon: '🛡️',
                    title: 'Foil protection on trays',
                    desc: 'Aluminium foil now shields trays from activated filter tip contamination.'
                  },
                  {
                    icon: '✅',
                    title: 'Broader in-process checks',
                    desc: 'Covers arrangement, washing, volume checks (BSA/secondary coat), tube sorting, and MM filling.'
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                    borderRadius: '12px',
                    border: '2px solid #0ea5e9',
                    transition: 'all 0.2s'
                  }}>
                    <div style={{
                      fontSize: '2.5em',
                      minWidth: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(14, 165, 233, 0.2)'
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        margin: '0 0 8px 0',
                        fontSize: '1.1em',
                        fontWeight: '700',
                        color: '#0369a1'
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        margin: 0,
                        fontSize: '0.95em',
                        color: '#0c4a6e',
                        lineHeight: '1.6'
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

