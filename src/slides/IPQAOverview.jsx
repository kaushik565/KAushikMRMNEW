// IPQA Key Metrics Overview - Modern Horizontal Layout
import { useState } from 'react';
import { createPortal } from 'react-dom';
import SiteVIncomingSampling from './ipqa-details/SiteVIncomingSampling';
import SiteVInProcessSampling from './ipqa-details/SiteVInProcessSampling';
import SiteVBMRVerification from './ipqa-details/SiteVBMRVerification';
import SiteVTransferNoteVerification from './ipqa-details/SiteVTransferNoteVerification';
import SiteVDestructionRecords from './ipqa-details/SiteVDestructionRecords';
import SiteIIILineClearance from './ipqa-details/SiteIIILineClearance';
import SiteIIILineClosure from './ipqa-details/SiteIIILineClosure';
import SiteIIILineReverification from './ipqa-details/SiteIIILineReverification';
import SiteIIILineVerification from './ipqa-details/SiteIIILineVerification';

export default function IPQAOverview() {
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [expandedActivity, setExpandedActivity] = useState(null);

  // IPQA Key Metrics Data
  const metricsData = {
    'SITE-I': {
      color: '#dc2626',
      bgColor: '#fee2e2',
      accentColor: '#b91c1c',
      metrics: {
        'Audits': { value: 145, trend: '+18%', status: 'Excellent' },
        'NCs': { value: 78, trend: '-35%', status: 'Improved' },
        'Compliance': { value: '94%', trend: '+8%', status: 'Good' },
        'Training': { value: '94%', trend: '+25%', status: 'Excellent' },
        'Open Issues': { value: 9, trend: '-17%', status: 'Stable' }
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
          console.log('MetricTile clicked:', label);
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
      console.log('Card clicked:', siteName, metricName);
      
      // Only SITE-V and SITE-III have detailed views
      if (siteName !== 'SITE-V' && siteName !== 'SITE-III') {
        alert(`Detailed view for ${siteName} - ${metricName} is coming soon!`);
        return;
      }

      console.log('Setting selected detail:', { site: siteName, metric: metricName });
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

        {/* Metrics Grid */}
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

        {/* SITE-V Improvements Section */}
        {siteName === 'SITE-V' && (
          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: `3px solid ${siteData.color}40`,
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '18px'
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${siteData.color}, ${siteData.color}dd)`,
                color: 'white',
                borderRadius: '10px',
                padding: '8px 12px',
                fontWeight: '800',
                fontSize: '0.95em',
                letterSpacing: '0.5px',
                boxShadow: `0 4px 12px ${siteData.color}30`
              }}>
                🎯 IMPROVEMENTS
              </div>
              <div style={{
                fontSize: '0.95em',
                fontWeight: '700',
                color: '#0f172a',
                letterSpacing: '-0.01em'
              }}>
                Truenat IPQA Enhancements
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '12px'
            }}>
              {[
                { icon: '🧪', title: 'QA-Controlled Sampling', desc: 'Sampling of primer probe is taken under QA oversight' },
                { icon: '🛡️', title: 'Stringent Incoming Gate', desc: 'Stringent sampling during incoming stage has helped to rule out non conformance at initial stage of chip' },
                { icon: '⚡', title: 'Pogo Pin Detection', desc: 'Repetitive incident on flashwriting device has highlighted the inefficiency of some pogo pins in device' },
                { icon: '📦', title: 'Pouch Mix-up Prevention', desc: 'Stringent IPQA verification has reduced mixing of pouches and chips during pouching activity' },
                { icon: '🏷️', title: 'Label Verification', desc: 'IPQA label verification is introduced during chip insertion in sleeves to prevent mixed up chips' },
                { icon: '🛡️', title: 'Foil Protection', desc: 'Introduction of aluminum foil on tray has reduced contamination risk with activated filter tips' },
                { icon: '✅', title: 'In-Process Checks', desc: 'Implementation of checks during chip arrangement, washing, volume verification, tube sorting, and MM filling' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: '#ffffff',
                  border: `2px solid ${siteData.color}25`,
                  borderRadius: '14px',
                  padding: '14px',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = siteData.color;
                  e.currentTarget.style.boxShadow = `0 8px 24px ${siteData.color}20`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${siteData.color}25`;
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: `linear-gradient(90deg, ${siteData.color}, ${siteData.color}40)`,
                    borderRadius: '4px 4px 0 0'
                  }}></div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      fontSize: '1.6em',
                      lineHeight: '1.2',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <div style={{
                      fontWeight: '700',
                      fontSize: '0.92em',
                      color: '#0f172a',
                      lineHeight: '1.3',
                      letterSpacing: '-0.01em'
                    }}>
                      {item.title}
                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: '0.82em',
                    color: '#475569',
                    lineHeight: '1.5',
                    marginLeft: '0px'
                  }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SITE-III Operational Activity Overview */}
        {siteName === 'SITE-III' && (
          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: `3px solid ${siteData.color}40`,
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '18px'
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${siteData.color}, ${siteData.color}dd)`,
                color: 'white',
                borderRadius: '10px',
                padding: '8px 12px',
                fontWeight: '800',
                fontSize: '0.95em',
                letterSpacing: '0.5px',
                boxShadow: `0 4px 12px ${siteData.color}30`
              }}>
                📊 ACTIVITY OVERVIEW
              </div>
              <div style={{
                fontSize: '0.95em',
                fontWeight: '700',
                color: '#0f172a',
                letterSpacing: '-0.01em'
              }}>
                Clearance, Closure & Re-Verification Times
              </div>
            </div>

            {/* Activity Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px'
            }}>
              {[
                { 
                  dept: 'QR CODE GENERATION', 
                  clearance: 6.07, closure: 5.37, reverif: 7.00,
                  trendData: {
                    clearance: [6.25, 6.24, 5.06, 6.07],
                    closure: [5.27, 5.48, 5.26, 5.37],
                    reverif: [5.27, 6.12, 4.00, 7.00]
                  }
                },
                { 
                  dept: 'QR PASTING', 
                  clearance: 6.06, closure: 5.13, reverif: 5.30,
                  trendData: {
                    clearance: [6.15, 5.51, 5.33, 6.06],
                    closure: [6.39, 6.05, 4.43, 5.13],
                    reverif: [6.39, 6.55, 5.34, 5.30]
                  }
                },
                { 
                  dept: 'GROMMET FIXING', 
                  clearance: 5.43, closure: 7.09, reverif: 5.57,
                  trendData: {
                    clearance: [6.11, 6.30, 5.14, 5.43],
                    closure: [6.41, 5.42, 5.20, 7.09],
                    reverif: [6.41, 5.00, 5.11, 5.57]
                  }
                },
                { 
                  dept: 'SMILEY ASSEMBLY', 
                  clearance: 6.22, closure: 5.43, reverif: 5.38,
                  trendData: {
                    clearance: [6.20, 6.13, 5.09, 6.22],
                    closure: [6.27, 5.39, 6.39, 5.43],
                    reverif: [6.27, 5.39, 4.37, 5.38]
                  }
                },
                { 
                  dept: 'Sample filter washing', 
                  clearance: 8.00, closure: 5.20, reverif: null,
                  trendData: {
                    clearance: [5.57, 6.26, 5.10, 8.00],
                    closure: [4.30, 4.43, 6.22, 5.20],
                    reverif: [4.30, null, null, null]
                  }
                },
                { 
                  dept: 'Sample filter heating', 
                  clearance: 6.22, closure: 5.22, reverif: 5.00,
                  trendData: {
                    clearance: [6.05, 6.00, 6.00, 6.22],
                    closure: [3.40, 6.00, 5.12, 5.22],
                    reverif: [3.40, 3.00, 6.00, 5.00]
                  }
                },
                { 
                  dept: 'Dump to annealing', 
                  clearance: 11.02, closure: 13.44, reverif: 6.01,
                  trendData: {
                    clearance: [8.59, 8.33, 9.12, 11.02],
                    closure: [8.15, 11.10, 10.22, 13.44],
                    reverif: [8.15, 6.19, 5.52, 6.01]
                  }
                },
                { 
                  dept: 'Matrix pallet filling to pouch packing', 
                  clearance: 10.17, closure: 11.33, reverif: 6.56,
                  trendData: {
                    clearance: [10.28, 10.45, 8.55, 10.17],
                    closure: [9.08, 10.12, 10.38, 11.33],
                    reverif: [9.08, 7.03, 6.32, 6.56]
                  }
                },
                { 
                  dept: 'Rework', 
                  clearance: 5.47, closure: 5.32, reverif: 6.00,
                  trendData: {
                    clearance: [8.09, 5.00, 9.00, 5.47],
                    closure: [9.02, 5.30, 5.00, 5.32],
                    reverif: [9.02, 5.00, 3.00, 6.00]
                  }
                },
                { 
                  dept: 'Packing verification', 
                  clearance: null, closure: null, reverif: 6.05,
                  trendData: {
                    clearance: [null, null, null, null],
                    closure: [null, null, null, null],
                    reverif: [6.39, 5.45, 5.19, 6.05]
                  }
                },
                { 
                  dept: 'LINE-G (Automation line)', 
                  clearance: 13.00, closure: 12.00, reverif: 4.30,
                  trendData: {
                    clearance: [null, null, null, 13.00],
                    closure: [null, null, null, 12.00],
                    reverif: [null, null, null, 4.30]
                  }
                }
              ].map((data, idx) => {
                const clearWidth = Math.min((data.clearance / 15) * 100, 100);
                const closeWidth = Math.min((data.closure / 15) * 100, 100);
                const reverWidth = Math.min((data.reverif / 15) * 100, 100);
                const isExpanded = expandedActivity === idx;
                
                return (
                  <div key={idx} style={{
                    background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 100%)',
                    border: `1.5px solid ${isExpanded ? siteData.color : `${siteData.color}25`}`,
                    borderRadius: '14px',
                    padding: '14px',
                    transition: 'all 0.3s ease',
                    boxShadow: isExpanded ? `0 12px 24px ${siteData.color}30` : '0 2px 6px rgba(0, 0, 0, 0.04)',
                    position: 'relative',
                    cursor: 'pointer',
                    gridColumn: isExpanded ? '1 / -1' : 'auto'
                  }}
                  onClick={() => setExpandedActivity(isExpanded ? null : idx)}
                  onMouseEnter={(e) => {
                    if (!isExpanded) {
                      e.currentTarget.style.borderColor = siteData.color;
                      e.currentTarget.style.boxShadow = `0 8px 16px ${siteData.color}20`;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isExpanded) {
                      e.currentTarget.style.borderColor = `${siteData.color}25`;
                      e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.04)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}>
                    {/* Department Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        fontSize: '0.9em',
                        fontWeight: '700',
                        color: '#1e293b',
                        lineHeight: '1.2'
                      }}>
                        {data.dept}
                      </div>
                      <div style={{
                        fontSize: '1em',
                        color: '#64748b',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}>
                        ▼
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{
                      height: '1px',
                      background: '#e5e7eb',
                      marginBottom: '12px'
                    }}></div>
                    
                    {/* Clearance - Compact */}
                    <div style={{marginBottom: '8px'}}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '4px'
                      }}>
                        <div style={{
                          fontSize: '0.75em',
                          fontWeight: '600',
                          color: '#64748b'
                        }}>
                          Clearance
                        </div>
                        <div style={{
                          fontSize: '0.8em',
                          fontWeight: '700',
                          color: data.clearance === null ? '#94a3b8' : '#1e293b'
                        }}>
                          {data.clearance === null ? 'NA' : `${data.clearance.toFixed(2)}m`}
                        </div>
                      </div>
                      <div style={{
                        height: '6px',
                        background: '#f1f5f9',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: data.clearance === null ? '0%' : `${Math.min((data.clearance / 15) * 100, 100)}%`,
                          background: '#4338ca',
                          borderRadius: '3px',
                          transition: 'width 0.5s ease'
                        }}></div>
                      </div>
                    </div>
                    
                    {/* Closure - Compact */}
                    <div style={{marginBottom: '8px'}}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '4px'
                      }}>
                        <div style={{
                          fontSize: '0.75em',
                          fontWeight: '600',
                          color: '#64748b'
                        }}>
                          Closure
                        </div>
                        <div style={{
                          fontSize: '0.8em',
                          fontWeight: '700',
                          color: data.closure === null ? '#94a3b8' : '#1e293b'
                        }}>
                          {data.closure === null ? 'NA' : `${data.closure.toFixed(2)}m`}
                        </div>
                      </div>
                      <div style={{
                        height: '6px',
                        background: '#f1f5f9',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: data.closure === null ? '0%' : `${Math.min((data.closure / 15) * 100, 100)}%`,
                          background: '#0284c7',
                          borderRadius: '3px',
                          transition: 'width 0.5s ease'
                        }}></div>
                      </div>
                    </div>
                    
                    {/* Re-Verification - Compact */}
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '4px'
                      }}>
                        <div style={{
                          fontSize: '0.75em',
                          fontWeight: '600',
                          color: '#64748b'
                        }}>
                          Re-verification
                        </div>
                        <div style={{
                          fontSize: '0.8em',
                          fontWeight: '700',
                          color: data.reverif === null ? '#94a3b8' : '#1e293b'
                        }}>
                          {data.reverif === null ? 'NA' : `${data.reverif.toFixed(2)}m`}
                        </div>
                      </div>
                      <div style={{
                        height: '6px',
                        background: '#f1f5f9',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: data.reverif === null ? '0%' : `${Math.min((data.reverif / 15) * 100, 100)}%`,
                          background: '#b45309',
                          borderRadius: '3px',
                          transition: 'width 0.5s ease'
                        }}></div>
                      </div>
                    </div>

                    {/* Expanded Control Chart View */}
                    {isExpanded && (
                      <div style={{
                        marginTop: '20px',
                        paddingTop: '20px',
                        borderTop: `2px solid #e5e7eb`,
                        background: '#fafbfc',
                        borderRadius: '8px',
                        padding: '20px'
                      }}>
                        <div style={{
                          fontSize: '0.9em',
                          fontWeight: '700',
                          color: '#1e293b',
                          marginBottom: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingBottom: '10px',
                          borderBottom: `1px solid #e5e7eb`
                        }}>
                          <span>Control Chart - Trend Analysis</span>
                          <span style={{
                            fontSize: '0.75em',
                            color: '#64748b',
                            fontWeight: '600'
                          }}>Jan-Aug • Sep • Oct • Nov</span>
                        </div>

                        {/* Control Charts Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '16px'
                        }}>
                          {/* Clearance Chart */}
                          <div style={{
                            background: '#ffffff',
                            borderRadius: '8px',
                            padding: '16px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                          }}>
                            <div style={{
                              fontSize: '0.8em',
                              fontWeight: '700',
                              color: '#4338ca',
                              marginBottom: '12px',
                              textAlign: 'center',
                              paddingBottom: '8px',
                              borderBottom: '1px solid #e5e7eb'
                            }}>
                              Clearance Trend
                            </div>
                            <div style={{
                              height: '160px',
                              position: 'relative',
                              paddingBottom: '25px'
                            }}>
                              {data.trendData.clearance.map((value, i) => {
                                const validValues = data.trendData.clearance.filter(v => v !== null);
                                const maxVal = validValues.length > 0 ? Math.max(...validValues) : 1;
                                const height = value !== null ? (value / maxVal) * 100 : 0;
                                const periodLabels = ['J-A', 'Sep', 'Oct', 'Nov'];
                                
                                return (
                                  <div key={i} style={{
                                    display: 'inline-block',
                                    width: '23%',
                                    marginRight: i < 3 ? '2.66%' : '0',
                                    height: '100%',
                                    position: 'relative',
                                    verticalAlign: 'bottom',
                                    cursor: value !== null ? 'pointer' : 'default'
                                  }}>
                                    {value !== null && (
                                      <div 
                                        style={{
                                          position: 'absolute',
                                          bottom: '30px',
                                          left: '10%',
                                          right: '10%',
                                          height: `${height}%`,
                                          background: '#4338ca',
                                          borderRadius: '4px 4px 0 0',
                                          display: 'flex',
                                          alignItems: 'flex-start',
                                          justifyContent: 'center',
                                          paddingTop: '6px',
                                          fontSize: '0.7em',
                                          fontWeight: '700',
                                          color: '#ffffff',
                                          minHeight: '30px'
                                        }}
                                      >
                                        {value.toFixed(1)}
                                      </div>
                                    )}
                                    {value === null && (
                                      <div style={{
                                        position: 'absolute',
                                        bottom: '25px',
                                        left: 0,
                                        right: 0,
                                        height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.7em',
                                        fontWeight: '700',
                                        color: '#94a3b8'
                                      }}>
                                        NA
                                      </div>
                                    )}
                                    <div style={{
                                      position: 'absolute',
                                      bottom: '5px',
                                      left: 0,
                                      right: 0,
                                      textAlign: 'center',
                                      fontSize: '0.65em',
                                      fontWeight: '600',
                                      color: '#64748b'
                                    }}>
                                      {periodLabels[i]}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div style={{
                              marginTop: '10px',
                              textAlign: 'center',
                              fontSize: '0.75em',
                              fontWeight: '700',
                              color: data.clearance === null ? '#94a3b8' : '#1e293b'
                            }}>
                              Current: {data.clearance === null ? 'NA' : `${data.clearance.toFixed(2)}m`}
                            </div>
                          </div>

                          {/* Closure Chart */}
                          <div style={{
                            background: '#ffffff',
                            borderRadius: '8px',
                            padding: '16px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                          }}>
                            <div style={{
                              fontSize: '0.8em',
                              fontWeight: '700',
                              color: '#0284c7',
                              marginBottom: '12px',
                              textAlign: 'center',
                              paddingBottom: '8px',
                              borderBottom: '1px solid #e5e7eb'
                            }}>
                              Closure Trend
                            </div>
                            <div style={{
                              height: '160px',
                              position: 'relative',
                              paddingBottom: '25px'
                            }}>
                              {data.trendData.closure.map((value, i) => {
                                const validValues = data.trendData.closure.filter(v => v !== null);
                                const maxVal = validValues.length > 0 ? Math.max(...validValues) : 1;
                                const height = value !== null ? (value / maxVal) * 100 : 0;
                                const periodLabels = ['J-A', 'Sep', 'Oct', 'Nov'];
                                
                                return (
                                  <div key={i} style={{
                                    display: 'inline-block',
                                    width: '23%',
                                    marginRight: i < 3 ? '2.66%' : '0',
                                    height: '100%',
                                    position: 'relative',
                                    verticalAlign: 'bottom',
                                    cursor: value !== null ? 'pointer' : 'default'
                                  }}>
                                    {value !== null && (
                                      <div 
                                        style={{
                                          position: 'absolute',
                                          bottom: '30px',
                                          left: '10%',
                                          right: '10%',
                                          height: `${height}%`,
                                          background: 'linear-gradient(180deg, #0284c7, #0369a1)',
                                          borderRadius: '8px 8px 0 0',
                                          display: 'flex',
                                          alignItems: 'flex-start',
                                          justifyContent: 'center',
                                          paddingTop: '6px',
                                          fontSize: '0.7em',
                                          fontWeight: '800',
                                          color: '#ffffff',
                                          minHeight: '30px',
                                          transition: 'all 0.3s ease',
                                          boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.transform = 'scaleY(1.05)';
                                          e.currentTarget.style.filter = 'brightness(1.1)';
                                          e.currentTarget.style.boxShadow = '0 4px 16px rgba(2, 132, 199, 0.5)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.transform = 'scaleY(1)';
                                          e.currentTarget.style.filter = 'brightness(1)';
                                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(2, 132, 199, 0.3)';
                                        }}
                                      >
                                        {value.toFixed(1)}
                                      </div>
                                    )}
                                    {value === null && (
                                      <div style={{
                                        position: 'absolute',
                                        bottom: '25px',
                                        left: 0,
                                        right: 0,
                                        height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.7em',
                                        fontWeight: '700',
                                        color: '#94a3b8'
                                      }}>
                                        NA
                                      </div>
                                    )}
                                    <div style={{
                                      position: 'absolute',
                                      bottom: '5px',
                                      left: 0,
                                      right: 0,
                                      textAlign: 'center',
                                      fontSize: '0.65em',
                                      fontWeight: '600',
                                      color: '#64748b'
                                    }}>
                                      {periodLabels[i]}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div style={{
                              marginTop: '12px',
                              textAlign: 'center',
                              fontSize: '0.8em',
                              fontWeight: '800',
                              color: data.closure === null ? '#94a3b8' : '#0284c7',
                              background: data.closure === null ? '#f1f5f9' : '#e0f2fe',
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: data.closure === null ? '2px solid #e2e8f0' : '2px solid #bae6fd',
                              letterSpacing: '0.5px'
                            }}>
                              <span style={{fontSize: '0.85em', fontWeight: '600', color: '#64748b'}}>Current: </span>
                              {data.closure === null ? 'NA' : `${data.closure.toFixed(2)}m`}
                            </div>
                          </div>

                          {/* Re-verification Chart */}
                          <div style={{
                            background: '#ffffff',
                            borderRadius: '8px',
                            padding: '16px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                          }}>
                            <div style={{
                              fontSize: '0.8em',
                              fontWeight: '700',
                              color: '#b45309',
                              marginBottom: '12px',
                              textAlign: 'center',
                              paddingBottom: '8px',
                              borderBottom: '1px solid #e5e7eb'
                            }}>
                              Re-verification Trend
                            </div>
                            <div style={{
                              height: '160px',
                              position: 'relative',
                              paddingBottom: '25px'
                            }}>
                              {data.trendData.reverif.map((value, i) => {
                                const validValues = data.trendData.reverif.filter(v => v !== null);
                                const maxVal = validValues.length > 0 ? Math.max(...validValues) : 1;
                                const height = value !== null ? (value / maxVal) * 100 : 0;
                                const periodLabels = ['J-A', 'Sep', 'Oct', 'Nov'];
                                
                                return (
                                  <div key={i} style={{
                                    display: 'inline-block',
                                    width: '23%',
                                    marginRight: i < 3 ? '2.66%' : '0',
                                    height: '100%',
                                    position: 'relative',
                                    verticalAlign: 'bottom',
                                    cursor: value !== null ? 'pointer' : 'default'
                                  }}>
                                    {value !== null && (
                                      <div 
                                        style={{
                                          position: 'absolute',
                                          bottom: '30px',
                                          left: '10%',
                                          right: '10%',
                                          height: `${height}%`,
                                          background: 'linear-gradient(180deg, #b45309, #d97706)',
                                          borderRadius: '8px 8px 0 0',
                                          display: 'flex',
                                          alignItems: 'flex-start',
                                          justifyContent: 'center',
                                          paddingTop: '6px',
                                          fontSize: '0.7em',
                                          fontWeight: '800',
                                          color: '#ffffff',
                                          minHeight: '30px',
                                          transition: 'all 0.3s ease',
                                          boxShadow: '0 2px 8px rgba(180, 83, 9, 0.3)'
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.transform = 'scaleY(1.05)';
                                          e.currentTarget.style.filter = 'brightness(1.1)';
                                          e.currentTarget.style.boxShadow = '0 4px 16px rgba(180, 83, 9, 0.5)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.transform = 'scaleY(1)';
                                          e.currentTarget.style.filter = 'brightness(1)';
                                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(180, 83, 9, 0.3)';
                                        }}
                                      >
                                        {value.toFixed(1)}
                                      </div>
                                    )}
                                    {value === null && (
                                      <div style={{
                                        position: 'absolute',
                                        bottom: '30px',
                                        left: 0,
                                        right: 0,
                                        height: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75em',
                                        fontWeight: '700',
                                        color: '#94a3b8'
                                      }}>
                                        NA
                                      </div>
                                    )}
                                    <div style={{
                                      position: 'absolute',
                                      bottom: '5px',
                                      left: 0,
                                      right: 0,
                                      textAlign: 'center',
                                      fontSize: '0.7em',
                                      fontWeight: '800',
                                      color: i === 3 ? '#b45309' : '#64748b',
                                      background: i === 3 ? '#fef3c7' : 'transparent',
                                      padding: '2px 4px',
                                      borderRadius: '4px',
                                      letterSpacing: '0.3px'
                                    }}>
                                      {periodLabels[i]}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div style={{
                              marginTop: '12px',
                              textAlign: 'center',
                              fontSize: '0.8em',
                              fontWeight: '800',
                              color: data.reverif === null ? '#94a3b8' : '#b45309',
                              background: data.reverif === null ? '#f1f5f9' : '#fef3c7',
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: data.reverif === null ? '2px solid #e2e8f0' : '2px solid #fde68a',
                              letterSpacing: '0.5px'
                            }}>
                              <span style={{fontSize: '0.85em', fontWeight: '600', color: '#64748b'}}>Current: </span>
                              {data.reverif === null ? 'NA' : `${data.reverif.toFixed(2)}m`}
                            </div>
                          </div>
                        </div>

                        {/* Click to Collapse Message */}
                        <div style={{
                          marginTop: '16px',
                          textAlign: 'center',
                          fontSize: '0.7em',
                          color: '#94a3b8',
                          fontWeight: '500'
                        }}>
                          Click again to collapse
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Comparison Bar Component
  const ComparisonBar = () => {
    const sites = ['SITE-I', 'SITE-III', 'SITE-V']
    const metrics = ['Compliance', 'Training', 'NCs']

    return (
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '16px',
        border: '2px solid #e5e7eb'
      }}>
        <div style={{ fontSize: '1em', fontWeight: '800', color: '#111827', marginBottom: '16px' }}>
          📊 Activity Volume Comparison
        </div>

        {['Incoming Sampling', 'In-Process Sampling', 'BMR Verification'].map(metricLabel => (
          <div key={metricLabel} style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '0.9em', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>
              {metricLabel}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {sites.map(site => {
                const metricName = metricLabel === 'Incoming Sampling' ? 'Incoming Sampling' : 
                                   metricLabel === 'In-Process Sampling' ? 'In-Process Sampling' : 'BMR Verification'
                const data = metricsData[site].metrics[metricName]
                if (!data) return null
                
                const value = typeof data.value === 'string' ? parseInt(data.value) : data.value
                const color = metricsData[site].color
                const maxValue = 3057 // Max value from all data

                return (
                  <div key={`${site}-${metricLabel}`} style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    height: '32px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: `1px solid ${color}40`
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      height: '100%',
                      width: `${(value / maxValue) * 100}%`,
                      backgroundColor: `${color}40`,
                      borderRadius: '8px 0 0 8px',
                      transition: 'width 0.5s ease'
                    }}></div>
                    <div style={{
                      position: 'relative',
                      zIndex: 1,
                      width: '100%',
                      textAlign: 'center',
                      fontSize: '0.8em',
                      fontWeight: '700',
                      color: '#111827'
                    }}>
                      {site}: {data.value}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
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
            <p style={{ fontSize: '0.9em', color: '#4b5563', margin: '0px' }}>
              In-Process Quality Assurance Performance Across Manufacturing Sites • Click SITE-V cards for detailed analysis
            </p>
          </div>

          {/* Site Cards */}
          {Object.entries(metricsData).map(([siteName, siteData]) => (
            <SiteCard key={siteName} siteName={siteName} siteData={siteData} />
          ))}

          {/* Comparison Section */}
          <ComparisonBar />

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
                  {site === 'SITE-I' && 'Solid Performance with Strong Compliance'}
                  {site === 'SITE-III' && 'Consistent Quality Verification'}
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
                console.log('Rendering detail for:', selectedDetail?.metric);
                
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
                    return <SiteIIILineClearance />;
                  case 'Line Closure':
                    return <SiteIIILineClosure />;
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
                          <li>SITE-V: Incoming Sampling, In-Process Sampling, BMR Verification, Transfer Note Verif., Destruction Records</li>
                          <li>SITE-III: Line Clearance, Line Closure, Line Reverification, Line Verification</li>
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
    </>
  )
}
