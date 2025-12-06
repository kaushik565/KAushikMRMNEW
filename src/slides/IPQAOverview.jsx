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
  const [selectedDeptChart, setSelectedDeptChart] = useState(null);
  const [selectedCartridgeChart, setSelectedCartridgeChart] = useState(null);
  const [selectedManufacturingChart, setSelectedManufacturingChart] = useState(null);

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
            {/* SITE-V Process Efficiency - Scrollable Charts Carousel */}
            <div style={{marginTop: '28px', marginBottom: '28px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px'}}>
                <div style={{background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', borderRadius: '10px', padding: '10px 14px', fontWeight: '800', fontSize: '1em', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'}}>
                  📊 PROCESS EFFICIENCY METRICS
                </div>
                <div style={{fontSize: '0.85em', fontWeight: '600', color: '#64748b', background: '#ffffff', padding: '6px 12px', borderRadius: '20px', border: '1px solid #e0f2fe'}}>Monthly Trend Analysis (Jul - Nov)</div>
              </div>

              {/* Scrollable Container with Arrows */}
              <div style={{position: 'relative', background: 'linear-gradient(135deg, #f0f9ff, #ffffff)', border: '2px solid #0ea5e9', borderRadius: '16px', padding: '24px', overflow: 'hidden'}}>
                
                {/* Left Arrow */}
                <button onClick={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const container = parent.querySelector('[data-scroll-container]');
                  container.scrollBy({left: -400, behavior: 'smooth'});
                }} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '1.4em', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)', transition: 'all 0.3s ease'}}
                onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(14, 165, 233, 0.5)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';}}
                onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)';}}
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

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '18px',
              marginTop: '28px'
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

            {/* Manufacturing Interactive Carousel */}
            <div style={{position: 'relative', background: 'linear-gradient(135deg, #faf5ff, #ffffff)', border: '2px solid #e9d5ff', borderRadius: '16px', padding: '24px', overflow: 'hidden', marginBottom: '28px'}}>
              
              {/* Left Arrow */}
              <button onClick={(e) => {
                const parent = e.currentTarget.parentElement;
                const container = parent.querySelector('[data-manufacturing-scroll]');
                container.scrollBy({left: -400, behavior: 'smooth'});
              }} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: 'white', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '1.4em', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)', transition: 'all 0.3s ease'}}
              onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.5)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';}}
              onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)';}}
              >←</button>

              {/* Scrollable Devices Container */}
              <div data-manufacturing-scroll style={{display: 'flex', overflowX: 'auto', gap: '20px', paddingRight: '60px', scrollBehavior: 'smooth', paddingLeft: '60px'}}>
                {[
                  {name: 'Rapid Cell Lysis', icon: '🧬', processes: 3, color: '#3b82f6', data: {clearance: [3.167, 3.2, 3.15, 3.1], closure: [3.483, 3.5, 3.45, 3.4], reverif: [3.783, 3.8, 3.75, 3.7]}},
                  {name: 'Two Bay PCR', icon: '🔬', processes: 9, color: '#8b5cf6', data: {clearance: [4.367, 4.4, 4.35, 4.3], closure: [4.817, 4.85, 4.8, 4.75], reverif: [3.683, 3.7, 3.65, 3.6]}},
                  {name: 'Sixteen Bay PCR', icon: '⚡', processes: 3, color: '#ec4899', data: {clearance: [9.45, 9.5, 9.4, 9.3], closure: [10.667, 10.7, 10.6, 10.5], reverif: [6.7, 6.75, 6.65, 6.55]}},
                  {name: 'Extraction Device', icon: '🔧', processes: 23, color: '#06b6d4', data: {clearance: [5.6, 5.65, 5.55, 5.5], closure: [6.267, 6.3, 6.25, 6.2], reverif: [4.317, 4.35, 4.3, 4.25]}}
                ].map((device, idx) => (
                  <div key={idx} style={{flex: '0 0 400px', background: '#ffffff', border: '2px solid #e9d5ff', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 8px rgba(139, 92, 246, 0.1)', transition: 'all 0.3s ease', cursor: 'pointer'}}
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

              {/* Right Arrow */}
              <button onClick={(e) => {
                const parent = e.currentTarget.parentElement;
                const container = parent.querySelector('[data-manufacturing-scroll]');
                container.scrollBy({left: 400, behavior: 'smooth'});
              }} style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: 'white', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '1.4em', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)', transition: 'all 0.3s ease'}}
              onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.5)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';}}
              onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)';}}
              >→</button>

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
