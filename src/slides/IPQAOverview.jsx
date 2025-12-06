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

                {/* SITE-III Manufacturing & Cartridge Assembly Overview - Modern Dashboard */}
        {siteName === 'SITE-III' && (
          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: `3px solid ${siteData.color}40`,
            position: 'relative',
            zIndex: 1
          }}>
            {/* SITE-III Overview Dashboard Header */}
            <div style={{background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', border: `2px solid ${siteData.color}30`, borderRadius: '14px', padding: '20px', marginBottom: '32px', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.1)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px'}}>
                <div style={{fontSize: '1.4em'}}>📈</div>
                <div style={{fontSize: '0.95em', fontWeight: '800', color: '#0f172a'}}>SITE-III IPQA Dashboard</div>
                <div style={{marginLeft: 'auto', display: 'flex', gap: '8px'}}>
                  <div style={{background: '#8b5cf6', color: 'white', borderRadius: '6px', padding: '4px 10px', fontSize: '0.7em', fontWeight: '700', textTransform: 'uppercase'}}>All On Track</div>
                  <div style={{background: '#10b981', color: 'white', borderRadius: '6px', padding: '4px 10px', fontSize: '0.7em', fontWeight: '700', textTransform: 'uppercase'}}>Optimized</div>
                </div>
              </div>
              <div style={{fontSize: '0.85em', color: '#475569', lineHeight: '1.6', marginBottom: '12px'}}>
                Comprehensive overview of Manufacturing, Cartridge Assembly, Calibration & Sampling Operations with real-time metrics and quality indicators.
              </div>
              
              {/* Quick Stats Row */}
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', paddingTop: '12px', borderTop: '1px solid rgba(139, 92, 246, 0.2)'}}>
                <div style={{textAlign: 'center', paddingY: '6px'}}>
                  <div style={{fontSize: '1.2em', fontWeight: '900', color: '#8b5cf6'}}>4</div>
                  <div style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b'}}>Device Types</div>
                </div>
                <div style={{textAlign: 'center', paddingY: '6px'}}>
                  <div style={{fontSize: '1.2em', fontWeight: '900', color: '#8b5cf6'}}>11</div>
                  <div style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b'}}>Cart Activities</div>
                </div>
                <div style={{textAlign: 'center', paddingY: '6px'}}>
                  <div style={{fontSize: '1.2em', fontWeight: '900', color: '#8b5cf6'}}>106</div>
                  <div style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b'}}>Calibrated Units</div>
                </div>
                <div style={{textAlign: 'center', paddingY: '6px'}}>
                  <div style={{fontSize: '1.2em', fontWeight: '900', color: '#8b5cf6'}}>1.4k+</div>
                  <div style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b'}}>Total Lots Sampled</div>
                </div>
              </div>
            </div>

            {/* ===== MANUFACTURING SECTION ===== */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
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
                ⚙️ MANUFACTURING OVERVIEW
              </div>
              <div style={{fontSize: '0.8em', fontWeight: '600', color: '#64748b'}}>4 Device Types • 38 Processes</div>
            </div>

            {/* Manufacturing KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '28px'
            }}>
              {[
                {label: 'Rapid Cell Lysis', icon: '🧬', processes: 3, avgClear: '3:10', avgClose: '3:29', avgRev: '3:47', approval: '99.2%', color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#3b82f6'},
                {label: 'Two Bay PCR', icon: '🔬', processes: 9, avgClear: '4:22', avgClose: '4:49', avgRev: '3:41', approval: '99.5%', color: '#8b5cf6', bgColor: '#faf5ff', borderColor: '#8b5cf6'},
                {label: 'Sixteen Bay PCR', icon: '⚡', processes: 3, avgClear: '9:27', avgClose: '10:40', avgRev: '6:42', approval: '98.8%', color: '#ec4899', bgColor: '#fdf2f8', borderColor: '#ec4899'},
                {label: 'Extraction Device', icon: '🔧', processes: 23, avgClear: '5:36', avgClose: '6:16', avgRev: '4:19', approval: '99.1%', color: '#06b6d4', bgColor: '#ecf8fb', borderColor: '#06b6d4'}
              ].map((device, idx) => (
                <div key={idx} style={{background: device.bgColor, border: `2px solid ${device.borderColor}`, borderRadius: '14px', padding: '18px', transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = `0 8px 20px ${device.color}20`; e.currentTarget.style.transform = 'translateY(-4px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)'; e.currentTarget.style.transform = 'translateY(0)';}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', paddingBottom: '10px', borderBottom: `2px solid ${device.borderColor}30`}}>
                    <div style={{fontSize: '1.6em'}}>{device.icon}</div>
                    <div><div style={{fontSize: '0.9em', fontWeight: '800', color: device.color}}>{device.label}</div><div style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b'}}>{device.processes} processes</div></div>
                  </div>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '12px'}}>
                    <div style={{background: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.5)'}}><div style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b', marginBottom: '4px'}}>Clearance</div><div style={{fontSize: '0.9em', fontWeight: '800', color: '#4338ca'}}>{device.avgClear}</div></div>
                    <div style={{background: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.5)'}}><div style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b', marginBottom: '4px'}}>Closure</div><div style={{fontSize: '0.9em', fontWeight: '800', color: '#0284c7'}}>{device.avgClose}</div></div>
                    <div style={{background: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.5)'}}><div style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b', marginBottom: '4px'}}>Re-Verification</div><div style={{fontSize: '0.9em', fontWeight: '800', color: '#b45309'}}>{device.avgRev}</div></div>
                    <div style={{background: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.5)'}}><div style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b', marginBottom: '4px'}}>Approval Rate</div><div style={{fontSize: '0.9em', fontWeight: '800', color: device.color}}>{device.approval}</div></div>
                  </div>
                  <div style={{height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden'}}><div style={{height: '100%', width: device.approval.replace('%', ''), background: `linear-gradient(90deg, ${device.color}, ${device.color}dd)`, borderRadius: '3px', transition: 'width 0.5s ease'}}></div></div>
                </div>
              ))}
            </div>

            {/* Process Time Comparison Charts */}
            <div style={{background: 'linear-gradient(135deg, #f8fafc, #ffffff)', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', marginBottom: '28px'}}>
              <div style={{fontSize: '0.95em', fontWeight: '800', color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}><div style={{width: '4px', height: '20px', background: siteData.color, borderRadius: '2px'}}></div>Process Time Comparison</div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px'}}>
                {[
                  {title: '⏱️ Clearance Times', items: [{name: 'Cell Lysis', time: 3.17, color: '#3b82f6'}, {name: 'PCR 2-Bay', time: 4.37, color: '#8b5cf6'}, {name: 'PCR 16-Bay', time: 9.27, color: '#ec4899'}, {name: 'Extraction', time: 5.60, color: '#06b6d4'}], maxTime: 10},
                  {title: '🔒 Closure Times', items: [{name: 'Cell Lysis', time: 3.50, color: '#3b82f6'}, {name: 'PCR 2-Bay', time: 4.82, color: '#8b5cf6'}, {name: 'PCR 16-Bay', time: 10.67, color: '#ec4899'}, {name: 'Extraction', time: 6.27, color: '#06b6d4'}], maxTime: 12},
                  {title: '✓ Re-Verification Times', items: [{name: 'Cell Lysis', time: 3.48, color: '#3b82f6'}, {name: 'PCR 2-Bay', time: 3.71, color: '#8b5cf6'}, {name: 'PCR 16-Bay', time: 6.42, color: '#ec4899'}, {name: 'Extraction', time: 4.19, color: '#06b6d4'}], maxTime: 8}
                ].map((chart, cidx) => (
                  <div key={cidx} style={{background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
                    <div style={{fontSize: '0.85em', fontWeight: '800', color: '#1e293b', marginBottom: '16px', textAlign: 'center', paddingBottom: '10px', borderBottom: '2px solid #e2e8f0'}}>{chart.title}</div>
                    <div style={{height: '180px', position: 'relative', paddingBottom: '30px'}}>
                      {chart.items.map((item, i) => {
                        const height = (item.time / chart.maxTime) * 100;
                        return (
                          <div key={i} style={{display: 'inline-block', width: '23%', marginRight: i < 3 ? '2%' : '0', height: '100%', position: 'relative', verticalAlign: 'bottom'}}>
                            <div style={{position: 'absolute', bottom: '30px', left: '5%', right: '5%', height: `${height}%`, background: `linear-gradient(180deg, ${item.color}, ${item.color}dd)`, borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '6px', fontSize: '0.7em', fontWeight: '700', color: '#ffffff', boxShadow: `0 4px 8px ${item.color}30`}}>{item.time.toFixed(1)}m</div>
                            <div style={{position: 'absolute', bottom: '5px', left: '0', right: '0', textAlign: 'center', fontSize: '0.65em', fontWeight: '700', color: '#64748b'}}>{item.name}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Manufacturing Summary KPIs - Quick Overview */}
            <div style={{background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)', border: '2px solid #0284c7', borderRadius: '14px', padding: '20px', marginBottom: '28px'}}>
              <div style={{fontSize: '0.95em', fontWeight: '800', color: '#0c4a6e', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>📊 Manufacturing Process Averages</div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px'}}>
                <div style={{background: 'white', borderRadius: '12px', padding: '16px', textAlign: 'center', border: '2px solid #0284c7', boxShadow: '0 2px 8px rgba(2, 132, 199, 0.1)'}}>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#0c4a6e', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Avg Clearance</div>
                  <div style={{fontSize: '2em', fontWeight: '900', color: '#0284c7', marginBottom: '4px'}}>5:24</div>
                  <div style={{fontSize: '0.7em', fontWeight: '600', color: '#0369a1'}}>All Devices</div>
                </div>
                <div style={{background: 'white', borderRadius: '12px', padding: '16px', textAlign: 'center', border: '2px solid #0284c7', boxShadow: '0 2px 8px rgba(2, 132, 199, 0.1)'}}>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#0c4a6e', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Avg Closure</div>
                  <div style={{fontSize: '2em', fontWeight: '900', color: '#0284c7', marginBottom: '4px'}}>6:18</div>
                  <div style={{fontSize: '0.7em', fontWeight: '600', color: '#0369a1'}}>All Devices</div>
                </div>
                <div style={{background: 'white', borderRadius: '12px', padding: '16px', textAlign: 'center', border: '2px solid #0284c7', boxShadow: '0 2px 8px rgba(2, 132, 199, 0.1)'}}>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#0c4a6e', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Avg Re-Verification</div>
                  <div style={{fontSize: '2em', fontWeight: '900', color: '#0284c7', marginBottom: '4px'}}>4:37</div>
                  <div style={{fontSize: '0.7em', fontWeight: '600', color: '#0369a1'}}>All Devices</div>
                </div>
                <div style={{background: 'white', borderRadius: '12px', padding: '16px', textAlign: 'center', border: '2px solid #0284c7', boxShadow: '0 2px 8px rgba(2, 132, 199, 0.1)'}}>
                  <div style={{fontSize: '0.75em', fontWeight: '700', color: '#0c4a6e', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Avg Approval Rate</div>
                  <div style={{fontSize: '2em', fontWeight: '900', color: '#10b981', marginBottom: '4px'}}>99.15%</div>
                  <div style={{fontSize: '0.7em', fontWeight: '600', color: '#047857'}}>Overall Quality</div>
                </div>
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
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
                <div style={{background: `linear-gradient(135deg, #10b981, #059669)`, color: 'white', borderRadius: '10px', padding: '8px 12px', fontWeight: '800', fontSize: '0.95em', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'}}>
                  📦 CARTRIDGE ASSEMBLY & PACKAGING
                </div>
                <div style={{fontSize: '0.8em', fontWeight: '600', color: '#64748b'}}>11 Activities • Optimized Timing</div>
              </div>

              {/* Cartridge Assembly Process Activities - with Accurate IPQA Data */}
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '28px'}}>
                {[
                  {name: 'QR Code Generation', clear: '6:25', close: '5:27', rev: '5:27', color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#3b82f6'},
                  {name: 'QR Pasting', clear: '6:15', close: '6:39', rev: '6:39', color: '#8b5cf6', bgColor: '#faf5ff', borderColor: '#8b5cf6'},
                  {name: 'Grommet Fixing', clear: '6:11', close: '6:41', rev: '6:41', color: '#ec4899', bgColor: '#fdf2f8', borderColor: '#ec4899'},
                  {name: 'Smiley Assembly', clear: '6:20', close: '6:27', rev: '6:27', color: '#06b6d4', bgColor: '#ecf8fb', borderColor: '#06b6d4'},
                  {name: 'Sample Filter Washing', clear: '5:57', close: '4:30', rev: '4:30', color: '#10b981', bgColor: '#f0fdf4', borderColor: '#10b981'},
                  {name: 'Sample Filter Heating', clear: '6:05', close: '3:40', rev: '3:40', color: '#f59e0b', bgColor: '#fffbeb', borderColor: '#f59e0b'},
                  {name: 'Dump to Annealing', clear: '8:59', close: '8:15', rev: '8:15', color: '#ef4444', bgColor: '#fef2f2', borderColor: '#ef4444'},
                  {name: 'Matrix Pallet to Pouch', clear: '10:28', close: '9:08', rev: '9:08', color: '#06b6d4', bgColor: '#ecf8fb', borderColor: '#06b6d4'},
                  {name: 'Rework', clear: '8:09', close: '9:02', rev: '9:02', color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#3b82f6'},
                  {name: 'Packing Verification', clear: 'N/A', close: 'N/A', rev: '6:39', color: '#8b5cf6', bgColor: '#faf5ff', borderColor: '#8b5cf6'},
                  {name: 'LINE-G (Automation)', clear: '13:00', close: '12:00', rev: '4:30', color: '#ec4899', bgColor: '#fdf2f8', borderColor: '#ec4899'}
                ].map((process, idx) => (
                  <div key={idx} style={{background: process.bgColor, border: `2px solid ${process.borderColor}`, borderRadius: '12px', padding: '14px', transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = `0 6px 16px ${process.color}20`; e.currentTarget.style.transform = 'translateY(-3px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.06)'; e.currentTarget.style.transform = 'translateY(0)';}}>
                    <div style={{fontSize: '0.8em', fontWeight: '800', color: process.color, marginBottom: '10px', paddingBottom: '8px', borderBottom: `1.5px solid ${process.borderColor}30`}}>
                      {process.name}
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.75em'}}>
                      <div>
                        <div style={{color: '#64748b', fontWeight: '600', marginBottom: '3px'}}>Clear</div>
                        <div style={{fontWeight: '800', color: '#4338ca'}}>{process.clear}</div>
                      </div>
                      <div>
                        <div style={{color: '#64748b', fontWeight: '600', marginBottom: '3px'}}>Close</div>
                        <div style={{fontWeight: '800', color: '#0284c7'}}>{process.close}</div>
                      </div>
                      <div>
                        <div style={{color: '#64748b', fontWeight: '600', marginBottom: '3px'}}>Rev</div>
                        <div style={{fontWeight: '800', color: '#b45309'}}>{process.rev}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cartridge Assembly Summary Stats */}
              <div style={{background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '2px solid #86efac', borderRadius: '12px', padding: '16px'}}>
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
                    <div style={{fontSize: '0.75em', fontWeight: '600', color: '#166534'}}>Process Activities</div>
                  </div>
                </div>
              </div>

              {/* ===== CALIBRATION DATA SECTION ===== */}
              <div style={{marginTop: '36px', paddingTop: '28px', borderTop: `3px solid ${siteData.color}40`}}>
                <div style={{fontSize: '0.95em', fontWeight: '800', color: '#1e293b', marginBottom: '20px'}}>🔧 Calibration Data (July - November)</div>

                {/* Simple Month Cards */}
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px', marginBottom: '20px'}}>
                  {[
                    {month: 'July', qty: 28},
                    {month: 'Aug', qty: 6},
                    {month: 'Sep', qty: 48},
                    {month: 'Oct', qty: 5},
                    {month: 'Nov', qty: 19}
                  ].map((m, i) => (
                    <div key={i} style={{background: '#f8fafc', border: '2px solid #cbd5e1', borderRadius: '10px', padding: '16px', textAlign: 'center', transition: 'all 0.3s ease'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'; e.currentTarget.style.transform = 'translateY(-2px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)';}}>
                      <div style={{fontSize: '0.8em', fontWeight: '700', color: '#64748b', marginBottom: '8px'}}>{m.month}</div>
                      <div style={{fontSize: '1.8em', fontWeight: '900', color: '#0f172a'}}>{m.qty}</div>
                    </div>
                  ))}
                </div>

                {/* Total Summary */}
                <div style={{background: '#f0fdf4', border: '2px solid #86efac', borderRadius: '10px', padding: '16px', textAlign: 'center'}}>
                  <div style={{fontSize: '0.8em', fontWeight: '700', color: '#166534', marginBottom: '8px', textTransform: 'uppercase'}}>Total Calibrated Units</div>
                  <div style={{fontSize: '2.2em', fontWeight: '900', color: '#15803d'}}>106</div>
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

                {/* Monthly Comparison Charts */}
                <div style={{background: 'linear-gradient(135deg, #f8fafc, #ffffff)', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', marginBottom: '28px'}}>
                  <div style={{fontSize: '0.9em', fontWeight: '800', color: '#1e293b', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <div style={{width: '4px', height: '20px', background: '#3b82f6', borderRadius: '2px'}}></div>
                    Monthly Sampling Trends
                  </div>

                  {/* Chart Grid */}
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px'}}>
                    {/* IQC Chart */}
                    <div style={{background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
                      <div style={{fontSize: '0.8em', fontWeight: '800', color: '#1e293b', marginBottom: '14px', textAlign: 'center', paddingBottom: '10px', borderBottom: '2px solid #ffe2e5'}}>🔍 IQC - Lots/Batch</div>
                      <div style={{height: '140px', display: 'flex', alignItems: 'flex-end', gap: '8px', justifyContent: 'space-around', paddingBottom: '10px'}}>
                        {[{m: 'Jul', v: 119}, {m: 'Aug', v: 196}, {m: 'Sep', v: 175}, {m: 'Oct', v: 112}, {m: 'Nov', v: 143}].map((d, i) => (
                          <div key={i} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'}}>
                            <div style={{width: '100%', height: `${(d.v / 196) * 120}px`, background: 'linear-gradient(180deg, #ef4444, #dc2626)', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '4px', fontSize: '0.65em', fontWeight: '700', color: 'white'}}>{d.v}</div>
                            <div style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b'}}>{d.m}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FQC Chart */}
                    <div style={{background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
                      <div style={{fontSize: '0.8em', fontWeight: '800', color: '#1e293b', marginBottom: '14px', textAlign: 'center', paddingBottom: '10px', borderBottom: '2px solid #dbeafe'}}>✓ FQC - Lots/Batch</div>
                      <div style={{height: '140px', display: 'flex', alignItems: 'flex-end', gap: '8px', justifyContent: 'space-around', paddingBottom: '10px'}}>
                        {[{m: 'Jul', v: 72}, {m: 'Aug', v: 52}, {m: 'Sep', v: 93}, {m: 'Oct', v: 95}, {m: 'Nov', v: 107}].map((d, i) => (
                          <div key={i} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'}}>
                            <div style={{width: '100%', height: `${(d.v / 107) * 120}px`, background: 'linear-gradient(180deg, #3b82f6, #1d4ed8)', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '4px', fontSize: '0.65em', fontWeight: '700', color: 'white'}}>{d.v}</div>
                            <div style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b'}}>{d.m}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* IPQC Chart */}
                    <div style={{background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
                      <div style={{fontSize: '0.8em', fontWeight: '800', color: '#1e293b', marginBottom: '14px', textAlign: 'center', paddingBottom: '10px', borderBottom: '2px solid #fef3c7'}}>🎯 IPQC - Lots/Batch</div>
                      <div style={{height: '140px', display: 'flex', alignItems: 'flex-end', gap: '8px', justifyContent: 'space-around', paddingBottom: '10px'}}>
                        {[{m: 'Jul', v: 52}, {m: 'Aug', v: 49}, {m: 'Sep', v: 49}, {m: 'Oct', v: 40}, {m: 'Nov', v: 42}].map((d, i) => (
                          <div key={i} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'}}>
                            <div style={{width: '100%', height: `${(d.v / 52) * 120}px`, background: 'linear-gradient(180deg, #f59e0b, #d97706)', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '4px', fontSize: '0.65em', fontWeight: '700', color: 'white'}}>{d.v}</div>
                            <div style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b'}}>{d.m}</div>
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

                {/* ===== KEY IMPROVEMENTS SECTION ===== */}
                <div style={{marginTop: '40px', paddingTop: '28px', borderTop: `3px solid ${siteData.color}40`}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px'}}>
                    <div style={{background: `linear-gradient(135deg, #10b981, #059669)`, color: 'white', borderRadius: '10px', padding: '8px 12px', fontWeight: '800', fontSize: '0.95em', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'}}>
                      ✨ KEY IMPROVEMENTS & INITIATIVES
                    </div>
                  </div>

                  {/* Completed Initiatives */}
                  <div style={{marginBottom: '28px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px'}}>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '8px', color: 'white', fontWeight: '900', fontSize: '1.1em', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'}}>✓</div>
                      <span>Completed Initiatives</span>
                      <span style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b', marginLeft: 'auto', background: '#d1fae5', color: '#065f46', padding: '4px 10px', borderRadius: '20px'}}>8 Achievements</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
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
                        <div key={idx} style={{background: '#f0fdf4', border: '2px solid #10b981', borderRadius: '8px', padding: '12px 14px', fontSize: '0.8em', color: '#166534', lineHeight: '1.5', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '10px'}} onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.2)';}} onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none';}}>
                          <span style={{fontWeight: '800', color: '#10b981', fontSize: '0.9em'}}>{idx + 1}.</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* In Progress Section */}
                  <div style={{marginBottom: '24px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px'}}>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#fbbf24', borderRadius: '8px', color: '#78350f', fontWeight: '900', fontSize: '1.1em', boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)'}}>→</div>
                      <span>In Progress</span>
                      <span style={{fontSize: '0.7em', fontWeight: '600', color: '#64748b', marginLeft: 'auto', background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '20px'}}>3 In Progress</span>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px'}}>
                      {[
                        {emoji: '📊', title: 'Defect Rate Setting', progress: 65},
                        {emoji: '📋', title: 'Limit Sample Register', progress: 45},
                        {emoji: '📱', title: 'QR Scanning Software', progress: 50}
                      ].map((item, idx) => (
                        <div key={idx} style={{background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '2px solid #fbbf24', borderRadius: '8px', padding: '14px', cursor: 'pointer', transition: 'all 0.3s ease'}} onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 6px 16px rgba(251, 191, 36, 0.3)'; e.currentTarget.style.transform = 'translateY(-3px)';}} onMouseLeave={(e) => {e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)';}}>
                          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                            <div style={{fontSize: '1.4em'}}>{item.emoji}</div>
                            <div style={{fontSize: '0.8em', fontWeight: '800', color: '#b45309', textTransform: 'uppercase', flex: 1}}>{item.title}</div>
                          </div>
                          <div style={{background: '#ffe4b5', borderRadius: '4px', height: '8px', marginBottom: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(251, 191, 36, 0.2)'}}>
                            <div style={{background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', height: '100%', width: `${item.progress}%`, transition: 'width 0.5s ease'}}></div>
                          </div>
                          <div style={{fontSize: '0.7em', fontWeight: '700', color: '#b45309', textAlign: 'right'}}>{item.progress}% Complete</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div style={{background: 'linear-gradient(135deg, #dbeafe, #e0f2fe)', border: '2px solid #0ea5e9', borderRadius: '8px', padding: '14px', marginTop: '16px'}}>
                    <div style={{fontSize: '0.8em', fontWeight: '800', color: '#0369a1', marginBottom: '12px', textTransform: 'uppercase'}}>📊 Business Impact</div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px'}}>
                      <div style={{textAlign: 'center', padding: '8px'}}>
                        <div style={{fontSize: '0.7em', fontWeight: '600', color: '#0369a1', marginBottom: '4px'}}>Rejection Rate</div>
                        <div style={{fontSize: '1.1em', fontWeight: '800', color: '#0369a1'}}>4% → 2.5%</div>
                      </div>
                      <div style={{textAlign: 'center', padding: '8px'}}>
                        <div style={{fontSize: '0.7em', fontWeight: '600', color: '#0369a1', marginBottom: '4px'}}>NC Reduction</div>
                        <div style={{fontSize: '1.1em', fontWeight: '800', color: '#0369a1'}}>↓50%</div>
                      </div>
                      <div style={{textAlign: 'center', padding: '8px'}}>
                        <div style={{fontSize: '0.7em', fontWeight: '600', color: '#0369a1', marginBottom: '4px'}}>Issue Prevention</div>
                        <div style={{fontSize: '1.1em', fontWeight: '800', color: '#0369a1'}}>100%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
