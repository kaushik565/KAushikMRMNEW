import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import SiteIIncidents from './site-details/SiteIIncidents'
import SiteICorrectiveActions from './site-details/SiteICorrectiveActions'
import SiteIPreventiveActions from './site-details/SiteIPreventiveActions'
import SiteIOutOfSpecifications from './site-details/SiteIOutOfSpecifications'
import SiteIChangeControls from './site-details/SiteIChangeControls'
import SiteIIIIncidents from './site-details/SiteIIIIncidents'
import SiteIIICorrectiveActions from './site-details/SiteIIICorrectiveActions'
import SiteIIIPreventiveActions from './site-details/SiteIIIPreventiveActions'
import SiteIIIOutOfSpecifications from './site-details/SiteIIIOutOfSpecifications'
import SiteIIIChangeControls from './site-details/SiteIIIChangeControls'
import SiteVIncidents from './site-details/SiteVIncidents'
import SiteVCorrectiveActions from './site-details/SiteVCorrectiveActions'
import SiteVPreventiveActions from './site-details/SiteVPreventiveActions'
import SiteVOutOfSpecifications from './site-details/SiteVOutOfSpecifications'
import SiteVChangeControls from './site-details/SiteVChangeControls'
import QMSOverview from './QMSOverview'

// Key metrics data for each category - showing ONE main improvement metric highlighted
// Data extracted from actual component calculations
const metricsData = {
  'SITE-I': {
    'Incidents': { total: 262, period: 'Jan-Nov 2025', improvement: '15%', from: 20, to: 17, label: 'Closure Days Reduced' },
    'CA': { total: 89, period: 'Jan-Nov 2025', improvement: '54%', from: 91, to: 42, label: 'Avg Days to Close Reduced' },
    'PA': { total: 29, period: 'Jan-Nov 2025', improvement: '60%', from: 135, to: 54, label: 'Processing Time Reduced' },
    'Out of Specifications': { total: 259, period: 'Apr-Nov 2025', improvement: '49%', avg: 21, latest: 17, label: 'Improvement' },
    'Change Controls': { total: 492, period: 'Jan-Nov 2025', improvement: '13%', from: 46, to: 40, label: 'Closure Days Reduced' }
  },
  'SITE-III': {
    'Incidents': { total: 82, period: 'Jan-Nov 2025', improvement: '42%', from: 24, to: 14, label: 'Closure Days Reduced' },
    'CA': { total: 52, period: 'Jan-Nov 2025', improvement: '16%', from: 56, to: 47, label: 'Avg Days to Close Reduced' },
    'PA': { total: 66, period: 'Jan-Nov 2025', improvement: '6%', from: 36, to: 34, label: 'Processing Time Reduced' },
    'Out of Specifications': { total: 159, period: 'Apr-Nov 2025', improvement: '49%', avg: 14, latest: 9, label: 'Improvement' },
    'Change Controls': { total: 261, period: 'Jan-Nov 2025', improvement: '61%', from: 41, to: 16, label: 'Closure Days Reduced' }
  },
  'SITE-V': {
    'Incidents': { total: 196, period: 'Jan-Nov 2025', improvement: '59%', from: 17, to: 7, label: 'Closure Days Reduced' },
    'CA': { total: 70, period: 'Jan-Nov 2025', improvement: '52%', from: 56, to: 27, label: 'NC Closure Days Reduced' },
    'PA': { total: 37, period: 'Jan-Nov 2025', improvement: '54%', from: 63, to: 29, label: 'Processing Time Reduced' },
    'Out of Specifications': { total: 89, period: 'Apr-Aug 2025', improvement: '59%', avg: 12, latest: 7, label: 'Improvement' },
    'Change Controls': { total: 178, period: 'Jan-Nov 2025', improvement: '23%', from: 50, to: 39, label: 'Closure Days Reduced' }
  }
}

// Executive Summary Data - 3 Sites Data
const sitesData = {
  'SITE-I': {
    Incidents: { total: 262, improvement: 15, from: 20, to: 17 },
    CA: { total: 89, improvement: 54, from: 91, to: 42 },
    PA: { total: 29, improvement: 60, from: 135, to: 54 },
    OOS: { total: 259, improvement: 49, avg: 21, latest: 17 },
    CC: { total: 492, improvement: 13, from: 46, to: 40 },
    Investigation: { total: 262, improvement: -8, from: 5.65, to: 6.1 }
  },
  'SITE-III': {
    Incidents: { total: 82, improvement: 42, from: 24, to: 14 },
    CA: { total: 52, improvement: 16, from: 56, to: 47 },
    PA: { total: 66, improvement: 6, from: 36, to: 34 },
    OOS: { total: 159, improvement: 49, avg: 14, latest: 9 },
    CC: { total: 261, improvement: 61, from: 41, to: 16 },
    Investigation: { total: 82, improvement: 72, from: 14.3, to: 4.0 }
  },
  'SITE-V': {
    Incidents: { total: 196, improvement: 59, from: 17, to: 7 },
    CA: { total: 70, improvement: 52, from: 56, to: 27 },
    PA: { total: 37, improvement: 54, from: 63, to: 29 },
    OOS: { total: 89, improvement: 59, avg: 12, latest: 7 },
    CC: { total: 178, improvement: 23, from: 50, to: 39 },
    Investigation: { total: 196, improvement: -6, from: 3.5, to: 3.7 }
  }
}

const categoryColors = {
  Incidents: '#ef4444',
  CA: '#8b5cf6',
  PA: '#f59e0b',
  OOS: '#f97316',
  CC: '#3b82f6',
  Investigation: '#10b981'
}

const siteColors = {
  'SITE-I': '#dc2626',
  'SITE-III': '#8b5cf6',
  'SITE-V': '#0ea5e9'
}

// Overall Performance Component
function OverallPerformance({ onCompleteOverviewClick }) {
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState(null);
  
  const categories = ['Incidents', 'CA', 'PA', 'OOS', 'CC', 'Investigation']
  const improvements = categories.map(cat => {
    let sum = 0, count = 0
    Object.values(sitesData).forEach(site => {
      if (site[cat]) {
        sum += site[cat].improvement
        count++
      }
    })
    return Math.round(sum / count)
  })

  const categoryDetails = {
    'Incidents': {
      title: 'Incidents - Average Improvement Calculation',
      avgImprovement: improvements[0],
      calculation: `(SITE-I: 15% + SITE-III: 42% + SITE-V: 59%) ÷ 3 = ${improvements[0]}%`,
      sites: [
        { name: 'SITE-I', improvement: 15, from: '20 days', to: '17 days', total: 262 },
        { name: 'SITE-III', improvement: 42, from: '24 days', to: '14 days', total: 82 },
        { name: 'SITE-V', improvement: 59, from: '17 days', to: '7 days', total: 196 }
      ],
      description: 'Incident closure time reduction across all manufacturing sites'
    },
    'CA': {
      title: 'Corrective Actions (CA) - Average Improvement Calculation',
      avgImprovement: improvements[1],
      calculation: `(SITE-I: 54% + SITE-III: 16% + SITE-V: 52%) ÷ 3 = ${improvements[1]}%`,
      sites: [
        { name: 'SITE-I', improvement: 54, from: '91 days', to: '42 days', total: 89 },
        { name: 'SITE-III', improvement: 16, from: '56 days', to: '47 days', total: 52 },
        { name: 'SITE-V', improvement: 52, from: '56 days', to: '27 days', total: 70 }
      ],
      description: 'Corrective action closure time improvement across sites'
    },
    'PA': {
      title: 'Preventive Actions (PA) - Average Improvement Calculation',
      avgImprovement: improvements[2],
      calculation: `(SITE-I: 60% + SITE-III: 6% + SITE-V: 54%) ÷ 3 = ${improvements[2]}%`,
      sites: [
        { name: 'SITE-I', improvement: 60, from: '135 days', to: '54 days', total: 29 },
        { name: 'SITE-III', improvement: 6, from: '36 days', to: '34 days', total: 66 },
        { name: 'SITE-V', improvement: 54, from: '63 days', to: '29 days', total: 37 }
      ],
      description: 'Preventive action processing time reduction across sites'
    },
    'OOS': {
      title: 'Out of Specifications (OOS) - Average Improvement Calculation',
      avgImprovement: improvements[3],
      calculation: `(SITE-I: 49% + SITE-III: 49% + SITE-V: 59%) ÷ 3 = ${improvements[3]}%`,
      sites: [
        { name: 'SITE-I', improvement: 49, from: '21 days avg', to: '17 days', total: 259 },
        { name: 'SITE-III', improvement: 49, from: '14 days avg', to: '9 days', total: 159 },
        { name: 'SITE-V', improvement: 59, from: '12 days avg', to: '7 days', total: 89 }
      ],
      description: 'Out of specification resolution time improvement'
    },
    'CC': {
      title: 'Change Controls (CC) - Average Improvement Calculation',
      avgImprovement: improvements[4],
      calculation: `(SITE-I: 13% + SITE-III: 61% + SITE-V: 23%) ÷ 3 = ${improvements[4]}%`,
      sites: [
        { name: 'SITE-I', improvement: 13, from: '46 days', to: '40 days', total: 492 },
        { name: 'SITE-III', improvement: 61, from: '41 days', to: '16 days', total: 261 },
        { name: 'SITE-V', improvement: 23, from: '50 days', to: '39 days', total: 178 }
      ],
      description: 'Change control closure time reduction across all sites'
    },
    'Investigation': {
      title: 'Investigation Time - Average Improvement Calculation',
      avgImprovement: improvements[5],
      calculation: `(SITE-I: -8% + SITE-III: 72% + SITE-V: -6%) ÷ 3 = ${improvements[5]}%`,
      sites: [
        { name: 'SITE-I', improvement: -8, from: '5.65 days', to: '6.1 days', total: 262 },
        { name: 'SITE-III', improvement: 72, from: '14.3 days', to: '4.0 days', total: 82 },
        { name: 'SITE-V', improvement: -6, from: '3.5 days', to: '3.7 days', total: 196 }
      ],
      description: 'Investigation time reduction (Jan-Aug avg vs Sep-Nov avg) across sites'
    }
  };

  const CategoryInfoModal = ({ category, onClose }) => {
    const details = categoryDetails[category];
    return createPortal(
      <div onClick={onClose} style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '20px'}}>
        <div onClick={(e) => e.stopPropagation()} style={{background: 'linear-gradient(135deg, #ffffff, #f9fafb)', borderRadius: '16px', padding: '32px', maxWidth: '700px', width: '100%', maxHeight: '85vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)', border: `3px solid ${categoryColors[category]}`, position: 'relative'}}>
          <button onClick={onClose} style={{position: 'absolute', top: '16px', right: '16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', fontSize: '1.2em', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'}}
          onMouseEnter={(e) => {e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.transform = 'scale(1.1)';}}
          onMouseLeave={(e) => {e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.transform = 'scale(1)';}}>×</button>

          <div style={{marginBottom: '24px'}}>
            <h3 style={{fontSize: '1.5em', fontWeight: '800', color: categoryColors[category], marginBottom: '8px', marginTop: 0}}>{details.title}</h3>
            <div style={{height: '3px', background: `linear-gradient(90deg, ${categoryColors[category]}, ${categoryColors[category]}dd)`, width: '100px', borderRadius: '2px'}}></div>
            <p style={{fontSize: '0.9em', color: '#64748b', marginTop: '12px', fontStyle: 'italic'}}>{details.description}</p>
          </div>

          <div style={{textAlign: 'center', padding: '20px', background: `${categoryColors[category]}10`, borderRadius: '12px', border: `2px solid ${categoryColors[category]}`, marginBottom: '24px'}}>
            <div style={{fontSize: '0.8em', fontWeight: '700', color: '#334155', textTransform: 'uppercase', marginBottom: '8px'}}>Average Improvement Across All Sites</div>
            <div style={{fontSize: '3em', fontWeight: '900', color: categoryColors[category]}}>{details.avgImprovement}%</div>
          </div>

          <div style={{background: '#f0f9ff', borderLeft: `4px solid ${categoryColors[category]}`, padding: '16px', borderRadius: '8px', marginBottom: '20px'}}>
            <div style={{fontSize: '0.75em', fontWeight: '700', color: '#334155', textTransform: 'uppercase', marginBottom: '8px'}}>Calculation Formula</div>
            <div style={{fontSize: '0.95em', fontFamily: 'monospace', color: '#1f2937', background: '#fff', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1'}}>{details.calculation}</div>
          </div>

          <div style={{marginBottom: '16px'}}>
            <div style={{fontSize: '1em', fontWeight: '700', color: '#0f172a', marginBottom: '12px'}}>📊 Site-wise Breakdown:</div>
            {details.sites.map((site, idx) => (
              <div key={idx} style={{marginBottom: '12px', padding: '14px', background: '#f8fafc', borderLeft: `4px solid ${siteColors[site.name]}`, borderRadius: '8px'}}>
                <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '8px'}}>
                  <div style={{fontSize: '1.1em', fontWeight: '800', color: siteColors[site.name]}}>{site.name}</div>
                  <div style={{fontSize: '1.4em', fontWeight: '900', color: siteColors[site.name]}}>{site.improvement}%</div>
                </div>
                <div style={{fontSize: '0.85em', color: '#475569', lineHeight: '1.5'}}>
                  <div>Before: {site.from} → After: {site.to}</div>
                  <div>Total Items: {site.total}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
    <div style={{
      padding: '28px',
      backgroundColor: '#f0f9ff',
      border: '2px solid #0ea5e9',
      borderRadius: '8px',
      marginBottom: '14px'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.1em', fontWeight: '700', color: '#0ea5e9', margin: '0' }}>
          📊 Overall Performance (Average Improvement Across All Sites)
        </h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '18px' }}>
        {categories.map((cat, idx) => (
          <div key={cat} style={{ textAlign: 'center', position: 'relative' }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedCategoryInfo(cat);
              }}
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                background: categoryColors[cat],
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                fontSize: '0.9em',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                zIndex: 10,
                boxShadow: `0 2px 8px ${categoryColors[cat]}60`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${categoryColors[cat]}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = `0 2px 8px ${categoryColors[cat]}60`;
              }}
            >
              ⓘ
            </button>
            <div style={{
              width: '100%',
              height: '170px',
              backgroundColor: '#e0f2fe',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginBottom: '14px',
              position: 'relative'
            }}>
              <div style={{
                width: '60%',
                height: `${Math.min(Math.abs(improvements[idx]), 100) * 1.5}px`,
                backgroundColor: improvements[idx] < 0 ? '#ef4444' : categoryColors[cat],
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '1.2em'
              }}>
                {Math.abs(improvements[idx])}%
              </div>
            </div>
            <div style={{ fontSize: '0.9em', fontWeight: '700', color: '#111827' }}>
              {cat}
            </div>
            <div style={{ fontSize: '0.76em', color: '#6b7280', marginTop: '6px' }}>
              Avg Improvement
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Category Info Modal */}
    {selectedCategoryInfo && (
      <CategoryInfoModal 
        category={selectedCategoryInfo}
        onClose={() => setSelectedCategoryInfo(null)}
      />
    )}
    </>
  )
}

// Site Comparison Grid Component
function SiteComparisonGrid({ onSiteClick }) {
  const [selectedSiteInfo, setSelectedSiteInfo] = useState(null);
  const [selectedSiteKeyImprovements, setSelectedSiteKeyImprovements] = useState(null);

  const SiteInfoModal = ({ site, onClose }) => {
    const data = sitesData[site];
    // Exclude Investigation from total since it's the same incidents counted twice
    const totalItems = data.Incidents.total + data.CA.total + data.PA.total + data.OOS.total + data.CC.total;
    const avgImprovement = Math.round(
      Object.values(data).reduce((sum, m) => sum + m.improvement, 0) / Object.values(data).length
    );

    const metricsBreakdown = [
      { name: 'Incidents', ...data.Incidents, color: categoryColors.Incidents },
      { name: 'Corrective Actions (CA)', ...data.CA, color: categoryColors.CA },
      { name: 'Preventive Actions (PA)', ...data.PA, color: categoryColors.PA },
      { name: 'Out of Specifications (OOS)', ...data.OOS, color: categoryColors.OOS },
      { name: 'Change Controls (CC)', ...data.CC, color: categoryColors.CC },
      { name: 'Investigation Time', ...data.Investigation, color: categoryColors.Investigation }
    ];

    return createPortal(
      <div onClick={onClose} style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '20px'}}>
        <div onClick={(e) => e.stopPropagation()} style={{background: 'linear-gradient(135deg, #ffffff, #f9fafb)', borderRadius: '16px', padding: '32px', maxWidth: '750px', width: '100%', maxHeight: '85vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)', border: `3px solid ${siteColors[site]}`, position: 'relative'}}>
          <button onClick={onClose} style={{position: 'absolute', top: '16px', right: '16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', fontSize: '1.2em', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'}}
          onMouseEnter={(e) => {e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.transform = 'scale(1.1)';}}
          onMouseLeave={(e) => {e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.transform = 'scale(1)';}}>×</button>

          <div style={{marginBottom: '24px'}}>
            <h3 style={{fontSize: '1.6em', fontWeight: '800', color: siteColors[site], marginBottom: '8px', marginTop: 0}}>{site} - Performance Breakdown</h3>
            <div style={{height: '3px', background: `linear-gradient(90deg, ${siteColors[site]}, ${siteColors[site]}dd)`, width: '120px', borderRadius: '2px'}}></div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px'}}>
            <div style={{textAlign: 'center', padding: '20px', background: `${siteColors[site]}10`, borderRadius: '12px', border: `2px solid ${siteColors[site]}`}}>
              <div style={{fontSize: '0.8em', fontWeight: '700', color: '#334155', textTransform: 'uppercase', marginBottom: '8px'}}>Average Improvement</div>
              <div style={{fontSize: '3em', fontWeight: '900', color: siteColors[site]}}>{avgImprovement}%</div>
            </div>
            <div style={{textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '2px solid #cbd5e1'}}>
              <div style={{fontSize: '0.8em', fontWeight: '700', color: '#334155', textTransform: 'uppercase', marginBottom: '8px'}}>Total Items</div>
              <div style={{fontSize: '3em', fontWeight: '900', color: '#1e293b'}}>{totalItems.toLocaleString()}</div>
            </div>
          </div>

          <div style={{background: '#f0f9ff', borderLeft: `4px solid ${siteColors[site]}`, padding: '16px', borderRadius: '8px', marginBottom: '20px'}}>
            <div style={{fontSize: '0.75em', fontWeight: '700', color: '#334155', textTransform: 'uppercase', marginBottom: '8px'}}>Average Improvement Calculation</div>
            <div style={{fontSize: '0.9em', fontFamily: 'monospace', color: '#1f2937', background: '#fff', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '8px'}}>
              ({metricsBreakdown.map(m => `${m.improvement}%`).join(' + ')}) ÷ 6 = {avgImprovement}%
            </div>
            <div style={{fontSize: '0.7em', color: '#64748b', fontStyle: 'italic'}}>Average of all 6 metrics (Incidents, CA, PA, OOS, CC, Investigation)</div>
          </div>

          <div style={{background: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '16px', borderRadius: '8px', marginBottom: '20px'}}>
            <div style={{fontSize: '0.75em', fontWeight: '700', color: '#334155', textTransform: 'uppercase', marginBottom: '8px'}}>Total Items Calculation</div>
            <div style={{fontSize: '0.9em', fontFamily: 'monospace', color: '#1f2937', background: '#fff', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '8px'}}>
              {data.Incidents.total} + {data.CA.total} + {data.PA.total} + {data.OOS.total} + {data.CC.total} = {totalItems.toLocaleString()}
            </div>
            <div style={{fontSize: '0.7em', color: '#92400e', fontStyle: 'italic'}}>Note: Investigation Time is NOT included in total count as it uses the same incident records already counted in "Incidents"</div>
          </div>

          <div>
            <div style={{fontSize: '1em', fontWeight: '700', color: '#0f172a', marginBottom: '12px'}}>📊 Metrics Breakdown:</div>
            {metricsBreakdown.map((metric, idx) => (
              <div key={idx} style={{marginBottom: '12px', padding: '14px', background: '#f8fafc', borderLeft: `4px solid ${metric.color}`, borderRadius: '8px'}}>
                <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '6px'}}>
                  <div style={{fontSize: '1em', fontWeight: '800', color: metric.color}}>{metric.name}</div>
                  <div style={{fontSize: '1.4em', fontWeight: '900', color: metric.color}}>{metric.improvement}%</div>
                </div>
                <div style={{fontSize: '0.85em', color: '#475569', lineHeight: '1.5'}}>
                  {metric.from !== undefined ? (
                    <div>Before: {metric.from} days → After: {metric.to} days | Total: {metric.total}</div>
                  ) : (
                    <div>Before: {metric.avg} days → After: {metric.latest} days | Total: {metric.total}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  const KeyImprovementsModal = ({ site, onClose }) => {
    const data = sitesData[site];
    const metrics = [
      { name: 'Incidents', ...data.Incidents },
      { name: 'Corrective Actions (CA)', ...data.CA },
      { name: 'Preventive Actions (PA)', ...data.PA },
      { name: 'Out of Specifications (OOS)', ...data.OOS },
      { name: 'Change Controls (CC)', ...data.CC },
      { name: 'Investigation Time', ...data.Investigation }
    ];

    const collaborationMeetings = [
      { month: 'July', meetings: 7, departments: ['QC', 'CA', 'MD', 'PU', 'HR', 'ST', 'DP', 'IT', 'MN', 'DI'] },
      { month: 'August', meetings: 7, departments: ['QC', 'CA', 'MD', 'PU', 'HR', 'ST', 'IT', 'MN', 'DI'] },
      { month: 'September', meetings: 7, departments: ['QC', 'CA', 'MD', 'PU', 'HR', 'ST', 'IT', 'MN', 'DI'] },
      { month: 'October', meetings: 40, departments: ['QC', 'CA', 'MD', 'PU', 'HR', 'ST', 'DP', 'IT', 'MN', 'DI'] },
      { month: 'November', meetings: 25, departments: ['QC', 'CA', 'MD', 'PU', 'HR', 'ST', 'DP', 'IT', 'MN', 'DI'] }
    ];

    const collaborationAgenda = [
      {
        month: 'July',
        items: [
          { title: 'Pending Entry Log Meeting', count: 3 },
          { title: 'Discussion of Observations in Shop Floor', count: 2 },
          { title: 'Monthly meeting with MG (Device and Cartridge)', count: 2 }
        ]
      },
      {
        month: 'August',
        items: [
          { title: 'Pending Entry Log Meeting', count: 2 },
          { title: 'Discussion of Observations in Shop Floor', count: 2 },
          { title: 'Discussion on Minor Rejection Materials', count: 1 },
          { title: 'Monthly meeting with MG (Device and Cartridge)', count: 2 }
        ]
      },
      {
        month: 'September',
        items: [
          { title: 'Pending Entry Log Meeting', count: 2 },
          { title: 'Discussion of Observations in Shop Floor', count: 2 },
          { title: 'Discussion on Device Rejection and its Root Causes', count: 1 },
          { title: 'Monthly meeting with MG (Device and Cartridge)', count: 2 }
        ]
      },
      {
        month: 'October',
        items: [
          { title: 'Pending Entry Log Meeting', count: 2 },
          { title: 'Discussion on Rejection with Visual Inspection Operators', count: 1 },
          { title: 'Monthly Rejections Meeting', count: 1 },
          { title: 'Operator-wise rejections, traceability, yield', count: 1 },
          { title: 'Stage wise rejections meeting', count: 31 },
          { title: 'Discussion of Observations in Shop Floor', count: 2 },
          { title: 'Monthly meeting with MG (Device and Cartridge)', count: 2 }
        ]
      },
      {
        month: 'November',
        items: [
          { title: 'Pending Entry Log Meeting', count: 2 },
          { title: 'Stage wise rejections meeting', count: 15 },
          { title: 'Discussion of Observations in Shop Floor', count: 2 },
          { title: 'Operator-wise rejections, traceability, yield', count: 1 },
          { title: 'Discussion on Rejection with Visual Inspection Operators', count: 3 },
          { title: 'Monthly meeting with MG (Device and Cartridge)', count: 2 }
        ]
      }
    ];

    const departmentsList = ['CA', 'MD', 'QC', 'PU', 'HR', 'DI', 'MN', 'IT', 'ST', 'DP'];

    const departmentParticipation = [
      {
        month: 'July',
        agendas: [
          { title: 'Pending Entry Log Meeting', count: 3, attendees: ['CA', 'MD', 'QC', 'PU', 'HR', 'DI', 'MN', 'IT', 'ST', 'DP'] },
          { title: 'Discussion of Observations in Shop Floor', count: 2, attendees: ['CA', 'MD', 'QC'] },
          { title: 'Monthly meeting with MG (Device and Cartridge)', count: 2, attendees: ['CA', 'MD', 'QC', 'MN'] }
        ]
      },
      {
        month: 'August',
        agendas: [
          { title: 'Pending Entry Log Meeting', count: 2, attendees: ['CA', 'MD', 'QC', 'PU', 'HR', 'DI', 'MN', 'IT', 'ST'] },
          { title: 'Discussion of Observations in Shop Floor', count: 2, attendees: ['CA', 'MD', 'QC'] },
          { title: 'Discussion on Minor Rejection Materials', count: 1, attendees: ['CA'] },
          { title: 'Monthly meeting with MG (Device and Cartridge)', count: 2, attendees: ['CA', 'MD', 'QC', 'DI', 'MN'] }
        ]
      },
      {
        month: 'September',
        agendas: [
          { title: 'Pending Entry Log Meeting', count: 2, attendees: ['CA', 'MD', 'QC', 'PU', 'HR', 'DI', 'MN', 'IT', 'ST'] },
          { title: 'Discussion of Observations in Shop Floor', count: 2, attendees: ['CA', 'MD', 'QC'] },
          { title: 'Discussion on Device Rejection and its Root Causes', count: 1, attendees: ['MD', 'QC'] },
          { title: 'Monthly meeting with MG (Device and Cartridge)', count: 2, attendees: ['CA', 'MD', 'QC', 'DI', 'MN'] }
        ]
      },
      {
        month: 'October',
        agendas: [
          { title: 'Pending Entry Log Meeting', count: 2, attendees: ['CA', 'MD', 'QC', 'PU', 'HR', 'DI', 'MN', 'IT', 'ST', 'DP'] },
          { title: 'Discussion on Rejection with Visual Inspection Operators', count: 1, attendees: ['CA'] },
          { title: 'Monthly Rejections Meeting', count: 1, attendees: ['CA', 'QC', 'MN'] },
          { title: 'Operator-wise rejections, traceability, yield', count: 1, attendees: ['CA'] },
          { title: 'Stage wise rejections meeting', count: 31, attendees: ['CA'] },
          { title: 'Discussion of Observations in Shop Floor', count: 2, attendees: ['CA', 'MD'] },
          { title: 'Monthly meeting with MG (Device and Cartridge)', count: 2, attendees: ['CA', 'MD', 'QC'] }
        ]
      },
      {
        month: 'November',
        agendas: [
          { title: 'Pending Entry Log Meeting', count: 2, attendees: ['CA', 'MD', 'QC', 'PU', 'HR', 'DI', 'MN', 'IT', 'ST', 'DP'] },
          { title: 'Stage wise rejections meeting', count: 15, attendees: ['CA'] },
          { title: 'Discussion of Observations in Shop Floor', count: 2, attendees: ['CA', 'MD'] },
          { title: 'Operator-wise rejections, traceability, yield', count: 1, attendees: ['CA'] },
          { title: 'Discussion on Rejection with Visual Inspection Operators', count: 3, attendees: ['CA'] },
          { title: 'Monthly meeting with MG (Device and Cartridge)', count: 2, attendees: ['CA', 'MD', 'QC'] }
        ]
      }
    ];

    const positiveGains = metrics
      .filter((m) => m.improvement > 0)
      .sort((a, b) => b.improvement - a.improvement);

    // Calculate composite improvement score
    const compositeImprovement = Math.round(positiveGains.reduce((sum, m) => sum + m.improvement, 0) / positiveGains.length);
    const totalMeetings = collaborationMeetings.reduce((sum, m) => sum + m.meetings, 0);
    const totalAgendaItems = collaborationAgenda.reduce((sum, m) => sum + m.items.length, 0);
    const totalDepartmentsInvolved = new Set(departmentParticipation.flatMap((m) => m.agendas.flatMap((a) => a.attendees))).size;

    const agendaTotals = departmentParticipation.reduce((acc, month) => {
      month.agendas.forEach((a) => {
        acc[a.title] = (acc[a.title] || 0) + a.count;
      });
      return acc;
    }, {});

    const topAgendaItems = Object.entries(agendaTotals)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    const agendaParticipationDetails = Object.values(
      departmentParticipation.reduce((acc, month) => {
        month.agendas.forEach((a) => {
          if (!acc[a.title]) {
            acc[a.title] = {
              title: a.title,
              totalSessions: 0,
              departments: new Set(),
              months: new Set()
            };
          }
          acc[a.title].totalSessions += a.count;
          a.attendees.forEach((d) => acc[a.title].departments.add(d));
          acc[a.title].months.add(month.month);
        });
        return acc;
      }, {})
    )
      .map((item) => ({
        title: item.title,
        totalSessions: item.totalSessions,
        departments: Array.from(item.departments),
        months: Array.from(item.months)
      }))
      .sort((a, b) => b.totalSessions - a.totalSessions);

    const maxMeetings = Math.max(...collaborationMeetings.map((m) => m.meetings));
    const avgMeetings = Math.round(totalMeetings / collaborationMeetings.length);

    // Key achievements
    const achievements = [
      { 
        icon: '⚡', 
        title: 'Impact Assessment Time', 
        metric: '61%',
        unit: 'improvement',
        desc: 'Reduced CC impact time',
        color: '#ef4444',
        bgColor: '#fef2f2'
      },
      { 
        icon: '📊', 
        title: 'Pictorial Representation', 
        metric: '100%',
        unit: 'implemented',
        desc: 'Visual dashboards & metrics',
        color: '#8b5cf6',
        bgColor: '#faf5ff'
      },
      { 
        icon: '📋', 
        title: 'Change Control Tracking', 
        metric: 'Complete',
        unit: 'system',
        desc: 'Automated tracking sheet',
        color: '#f59e0b',
        bgColor: '#fffbeb'
      },
      { 
        icon: '⏱️', 
        title: 'Investigation Time', 
        metric: '72%',
        unit: 'reduction',
        desc: 'Faster incident resolution',
        color: '#10b981',
        bgColor: '#ecfdf5'
      }
    ];

    return createPortal(
      <div onClick={onClose} style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '20px'}}>
        <div onClick={(e) => e.stopPropagation()} style={{background: 'linear-gradient(135deg, #ffffff, #f9fafb)', borderRadius: '16px', padding: 0, maxWidth: '1000px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)', border: `3px solid ${siteColors[site]}`, position: 'relative', display: 'flex', flexDirection: 'column'}}>
          <button onClick={onClose} style={{position: 'absolute', top: '16px', right: '16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', fontSize: '1.2em', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', zIndex: 10}}
          onMouseEnter={(e) => {e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.transform = 'scale(1.1)';}}
          onMouseLeave={(e) => {e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.transform = 'scale(1)';}}>×</button>

          {/* HERO SECTION - Main Message */}
          <div style={{background: `linear-gradient(135deg, ${siteColors[site]}dd, ${siteColors[site]})`, padding: '40px 32px', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden'}}>
            <div style={{position: 'absolute', top: '-40px', right: '-40px', fontSize: '200px', opacity: 0.1}}>🎯</div>
            <div style={{position: 'relative', zIndex: 1}}>
              <div style={{fontSize: '0.9em', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.95, marginBottom: '16px'}}>How SITE-III Achieved</div>
              <div style={{fontSize: '3.5em', fontWeight: '900', marginBottom: '16px'}}>{compositeImprovement}%</div>
              <div style={{fontSize: '1.1em', fontWeight: '700', lineHeight: '1.5', opacity: 0.95, marginBottom: '0'}}>
                Through <strong>{totalMeetings} QA-led collaboration sessions</strong> + <strong>visual dashboards</strong> + <strong>change control automation</strong> = <strong>Faster decisions, reduced investigation time</strong>
              </div>
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div style={{padding: '32px', overflow: 'auto', flex: 1}}>
            {/* Key Achievements Grid */}
            <div style={{marginBottom: '32px'}}>
              <div style={{fontSize: '0.9em', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px'}}>🏆 Key Accomplishments</div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px'}}>
                {achievements.map((ach, idx) => (
                  <div key={idx} style={{padding: '16px', borderRadius: '12px', background: ach.bgColor, border: `2px solid ${ach.color}40`, textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
                    <div style={{position: 'absolute', top: '-10px', right: '-10px', fontSize: '80px', opacity: 0.05}}>{ach.icon}</div>
                    <div style={{fontSize: '2.4em', marginBottom: '8px', position: 'relative', zIndex: 1}}>{ach.icon}</div>
                    <div style={{fontSize: '0.75em', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px'}}>
                      {ach.title}
                    </div>
                    <div style={{fontSize: '1.8em', fontWeight: '900', color: ach.color, marginBottom: '4px'}}>
                      {ach.metric}
                    </div>
                    <div style={{fontSize: '0.75em', color: '#475569', fontWeight: '700', marginBottom: '8px'}}>
                      {ach.unit}
                    </div>
                    <div style={{fontSize: '0.75em', color: '#64748b', lineHeight: '1.3'}}>
                      {ach.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration Meetings Deep Dive - THE STAR SECTION */}
            <div style={{marginBottom: '28px', padding: '24px', borderRadius: '14px', background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0', boxShadow: '0 14px 32px rgba(15, 23, 42, 0.08)'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '16px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <div style={{fontSize: '1.8em'}}>🤝</div>
                  <div>
                    <div style={{fontSize: '1.05em', fontWeight: '800', letterSpacing: '-0.2px', color: '#0f172a'}}>Collaboration Meetings – The Driver</div>
                    <div style={{fontSize: '0.85em', color: '#475569'}}>Foundation of all improvements across SITE-III</div>
                  </div>
                </div>
                <div style={{display: 'flex', gap: '8px'}}>
                  <div style={{fontSize: '0.75em', fontWeight: '800', color: '#0ea5e9', background: '#e0f2fe', border: '1px solid #bae6fd', padding: '6px 10px', borderRadius: '10px'}}>Jul–Nov</div>
                  <div style={{fontSize: '0.75em', fontWeight: '800', color: '#15803d', background: '#dcfce7', border: '1px solid #bbf7d0', padding: '6px 10px', borderRadius: '10px'}}>Peak: Oct</div>
                </div>
              </div>

              {/* Top strip */}
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '16px'}}>
                {[ 
                  { label: 'Total Sessions', value: totalMeetings, color: '#0284c7', bg: '#e0f2fe' },
                  { label: 'Avg / Month', value: Math.round(totalMeetings / collaborationMeetings.length), color: '#7c3aed', bg: '#f3e8ff' },
                  { label: 'Departments', value: totalDepartmentsInvolved, color: '#059669', bg: '#dcfce7' },
                  { label: 'Topics', value: totalAgendaItems, color: '#d97706', bg: '#fef3c7' }
                ].map((stat, idx) => (
                  <div key={idx} style={{padding: '12px', borderRadius: '12px', background: stat.bg, border: `1px solid ${stat.color}30`, display: 'flex', flexDirection: 'column', gap: '6px'}}>
                    <div style={{fontSize: '0.75em', fontWeight: '800', color: '#0f172a', letterSpacing: '0.3px'}}>{stat.label}</div>
                    <div style={{fontSize: '1.8em', fontWeight: '900', color: stat.color}}>{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Mid row: growth + agenda mix */}
              <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '16px'}}>
                <div style={{background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px'}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
                    <div style={{fontSize: '0.8em', fontWeight: '800', color: '#0f172a'}}>📈 Growth Trend</div>
                    <div style={{display: 'flex', gap: '6px'}}>
                      <div style={{fontSize: '0.7em', fontWeight: '800', color: '#0ea5e9', background: '#e0f2fe', borderRadius: '8px', padding: '4px 8px'}}>Total {totalMeetings}</div>
                      <div style={{fontSize: '0.7em', fontWeight: '800', color: '#15803d', background: '#dcfce7', borderRadius: '8px', padding: '4px 8px'}}>Peak {maxMeetings}</div>
                    </div>
                  </div>
                  <div style={{position: 'relative', height: '190px', padding: '12px 12px 18px 12px', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #cbd5e1', overflow: 'hidden'}}>
                    <div style={{position: 'absolute', inset: '10px 12px 14px 12px', display: 'grid', gridTemplateColumns: `repeat(${collaborationMeetings.length}, 1fr)`, gap: '10px', alignItems: 'end'}}>
                      {collaborationMeetings.map((m, idx) => {
                        const heightPct = Math.round((m.meetings / maxMeetings) * 100);
                        const delta = idx === 0 ? 0 : m.meetings - collaborationMeetings[idx - 1].meetings;
                        const badgeColor = delta > 0 ? '#15803d' : delta < 0 ? '#dc2626' : '#475569';
                        const badgeText = idx === 0 ? 'start' : delta > 0 ? `+${delta}` : delta < 0 ? `${delta}` : 'flat';
                        return (
                          <div key={m.month} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%'}}>
                            <div style={{fontSize: '0.62em', fontWeight: '800', color: badgeColor, background: '#ffffff', border: `1px solid ${badgeColor}33`, borderRadius: '8px', padding: '3px 8px', textTransform: 'uppercase'}}>
                              {badgeText}
                            </div>
                            <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end'}}>
                              <div style={{width: '100%', height: `${heightPct}%`, background: 'linear-gradient(180deg, #0ea5e9 0%, #0369a1 100%)', borderRadius: '10px', border: '1px solid #bae6fd', boxShadow: '0 10px 20px rgba(14, 165, 233, 0.2)', position: 'relative', overflow: 'hidden'}}>
                                <div style={{position: 'absolute', inset: '6px', borderRadius: '8px', background: 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0))', opacity: 0.8}}></div>
                                <div style={{position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.8em', fontWeight: '900', color: '#ffffff'}}>{m.meetings}</div>
                              </div>
                            </div>
                            <div style={{fontSize: '0.72em', fontWeight: '800', color: '#0f172a'}}>{m.month.slice(0, 3)}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{position: 'absolute', left: '12px', right: '12px', bottom: `${Math.round((avgMeetings / maxMeetings) * 100)}%`, borderTop: '1px dashed #94a3b8', pointerEvents: 'none'}}>
                      <div style={{position: 'absolute', right: '0', transform: 'translateY(-8px)', background: '#0f172a', color: '#fff', fontSize: '0.65em', fontWeight: '800', borderRadius: '6px', padding: '3px 8px', boxShadow: '0 4px 10px rgba(15, 23, 42, 0.2)'}}>Avg {avgMeetings}/mo</div>
                    </div>
                  </div>
                </div>

                <div style={{background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  <div style={{fontSize: '0.8em', fontWeight: '800', color: '#0f172a'}}>📋 Top Agendas</div>
                  {topAgendaItems.map((item, idx) => (
                    <div key={idx} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '8px 10px', borderRadius: '10px', border: '1px solid #e2e8f0'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <div style={{width: '8px', height: '8px', borderRadius: '50%', background: ['#0ea5e9','#7c3aed','#15803d','#d97706'][idx % 4]}}></div>
                        <div style={{fontSize: '0.8em', fontWeight: '800', color: '#0f172a'}}>{item.title.length > 36 ? item.title.slice(0, 36) + '…' : item.title}</div>
                      </div>
                      <div style={{fontSize: '0.9em', fontWeight: '900', color: '#0f172a'}}>{item.count}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agenda participation detail (topic x departments) */}
              <div style={{background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <div>
                    <div style={{fontSize: '0.9em', fontWeight: '800', color: '#0f172a'}}>Agenda Participation Details</div>
                    <div style={{fontSize: '0.8em', color: '#475569', fontWeight: '600'}}>Which departments joined each topic</div>
                  </div>
                  <div style={{fontSize: '0.75em', fontWeight: '800', color: '#0ea5e9', background: '#e0f2fe', border: '1px solid #bae6fd', padding: '6px 10px', borderRadius: '10px'}}>
                    Topics: {agendaParticipationDetails.length}
                  </div>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px'}}>
                  {agendaParticipationDetails.map((agenda, idx) => (
                    <div key={idx} style={{background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px'}}>
                        <div style={{fontSize: '0.85em', fontWeight: '800', color: '#0f172a', lineHeight: '1.3'}}>
                          {agenda.title.length > 44 ? agenda.title.slice(0, 44) + '…' : agenda.title}
                        </div>
                        <div style={{fontSize: '0.75em', fontWeight: '900', color: '#0ea5e9', background: '#e0f2fe', padding: '3px 8px', borderRadius: '8px'}}>{agenda.totalSessions}</div>
                      </div>
                      <div style={{display: 'flex', gap: '6px', flexWrap: 'wrap'}}>
                        {agenda.months.map((m) => (
                          <div key={m} style={{fontSize: '0.65em', fontWeight: '800', color: '#0f172a', background: '#fff', border: '1px solid #e2e8f0', padding: '3px 6px', borderRadius: '6px'}}>{m.slice(0,3)}</div>
                        ))}
                      </div>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '4px'}}>
                        {departmentsList.map((dept) => {
                          const active = agenda.departments.includes(dept);
                          return (
                            <div key={dept} style={{
                              fontSize: '0.65em',
                              fontWeight: '800',
                              padding: '3px 6px',
                              borderRadius: '6px',
                              border: active ? '1px solid #0ea5e9' : '1px solid #e2e8f0',
                              background: active ? '#e0f2fe' : '#ffffff',
                              color: active ? '#075985' : '#94a3b8'
                            }}>
                              {dept}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Supporting Metrics */}
            <div>
              <div style={{fontSize: '0.9em', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px'}}>📊 Key Performance Improvements</div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px'}}>
                {positiveGains.slice(0, 6).map((metric, idx) => (
                  <div key={idx} style={{padding: '14px', borderRadius: '10px', background: `${siteColors[site]}08`, border: `1.5px solid ${siteColors[site]}40`, textAlign: 'center'}}>
                    <div style={{fontSize: '2em', fontWeight: '900', color: siteColors[site], marginBottom: '4px'}}>{metric.improvement}%</div>
                    <div style={{fontSize: '0.75em', color: '#0f172a', fontWeight: '700', lineHeight: '1.3'}}>{metric.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '12px',
      marginBottom: '14px'
    }}>
      {Object.entries(sitesData).map(([site, data]) => {
        // Exclude Investigation from total since it's the same incidents counted twice
        const totalItems = data.Incidents.total + data.CA.total + data.PA.total + data.OOS.total + data.CC.total;
        const avgImprovement = Math.round(
          Object.values(data).reduce((sum, m) => sum + m.improvement, 0) / Object.values(data).length
        )

        return (
          <div key={site} onClick={() => onSiteClick(site)} style={{
            padding: '14px',
            backgroundColor: siteColors[site] + '10',
            border: `3px solid ${siteColors[site]}`,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: 'scale(1)',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = `0 8px 20px ${siteColors[site]}30`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px', zIndex: 10 }}>
              {site === 'SITE-III' && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSiteKeyImprovements(site);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '5px 10px',
                    fontSize: '0.7em',
                    cursor: 'pointer',
                    fontWeight: '700',
                    boxShadow: '0 4px 12px rgba(249, 115, 22, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(249, 115, 22, 0.45), inset 0 1px 0 rgba(255,255,255,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)';
                  }}
                >
                  <span style={{fontSize: '0.9em'}}>✨</span>
                  Key Improvements
                </button>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSiteInfo(site);
                }}
                style={{
                  background: siteColors[site],
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  fontSize: '0.85em',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  boxShadow: `0 2px 8px ${siteColors[site]}60`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${siteColors[site]}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = `0 2px 8px ${siteColors[site]}60`;
                }}
              >
                ⓘ
              </button>
            </div>
            <div style={{
              fontSize: '1em',
              fontWeight: '800',
              color: siteColors[site],
              marginBottom: '8px'
            }}>
              {site}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '10px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.8em',
                  fontWeight: '800',
                  color: siteColors[site]
                }}>
                  {avgImprovement}%
                </div>
                <div style={{ fontSize: '0.7em', color: '#6b7280' }}>
                  Avg Improvement
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.8em',
                  fontWeight: '800',
                  color: '#111827'
                }}>
                  {totalItems}
                </div>
                <div style={{ fontSize: '0.7em', color: '#6b7280' }}>
                  Total Items
                </div>
              </div>
            </div>
            <div style={{
              fontSize: '0.75em',
              color: '#6b7280',
              lineHeight: '1.6',
              paddingTop: '8px',
              borderTop: `1px solid ${siteColors[site]}30`,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px 12px'
            }}>
              <div>
                ✓ Incidents:{' '}
                <span style={{ color: data.Incidents.improvement < 0 ? '#ef4444' : '#6b7280', fontWeight: '600' }}>
                  {data.Incidents.improvement}%
                </span>
              </div>
              <div>
                ✓ OOS:{' '}
                <span style={{ color: data.OOS.improvement < 0 ? '#ef4444' : '#6b7280', fontWeight: '600' }}>
                  {data.OOS.improvement}%
                </span>
              </div>
              <div>
                ✓ CA:{' '}
                <span style={{ color: data.CA.improvement < 0 ? '#ef4444' : '#6b7280', fontWeight: '600' }}>
                  {data.CA.improvement}%
                </span>
              </div>
              <div>
                ✓ CC:{' '}
                <span style={{ color: data.CC.improvement < 0 ? '#ef4444' : '#6b7280', fontWeight: '600' }}>
                  {data.CC.improvement}%
                </span>
              </div>
              <div>
                ✓ PA:{' '}
                <span style={{ color: data.PA.improvement < 0 ? '#ef4444' : '#6b7280', fontWeight: '600' }}>
                  {data.PA.improvement}%
                </span>
              </div>
              <div>
                ✓ Investigation:{' '}
                <span style={{ color: data.Investigation.improvement < 0 ? '#ef4444' : '#6b7280', fontWeight: '600' }}>
                  {data.Investigation.improvement}%
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>

    {/* Site Info Modal */}
    {selectedSiteInfo && (
      <SiteInfoModal 
        site={selectedSiteInfo}
        onClose={() => setSelectedSiteInfo(null)}
      />
    )}
    {selectedSiteKeyImprovements && (
      <KeyImprovementsModal 
        site={selectedSiteKeyImprovements}
        onClose={() => setSelectedSiteKeyImprovements(null)}
      />
    )}
    </>
  )
}

// Helper component to render category card with single highlighted metric
function CategoryCard({ title, metrics, color, borderColor, onClick, textColor, isSpecial }) {
  return (
    <div 
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, #ffffff 0%, ${borderColor}08 100%)`,
        border: `2px solid ${borderColor}40`,
        borderRadius: '16px',
        padding: '24px',
        boxShadow: `0 8px 24px ${borderColor}12, 0 2px 8px rgba(0, 0, 0, 0.08)`,
        cursor: 'pointer',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: '240px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)'
        e.currentTarget.style.boxShadow = `0 24px 48px ${borderColor}20, 0 8px 16px rgba(0, 0, 0, 0.15)`
        e.currentTarget.style.borderColor = borderColor
        e.currentTarget.style.background = `linear-gradient(135deg, #ffffff 0%, ${borderColor}12 100%)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = `0 8px 24px ${borderColor}12, 0 2px 8px rgba(0, 0, 0, 0.08)`
        e.currentTarget.style.borderColor = `${borderColor}40`
        e.currentTarget.style.background = `linear-gradient(135deg, #ffffff 0%, ${borderColor}08 100%)`
      }}
    >
      {/* Decorative top accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '5px',
        background: `linear-gradient(90deg, ${borderColor}, ${borderColor}40, transparent)`,
        borderRadius: '16px 16px 0 0'
      }}></div>

      {/* Decorative corner accent */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        width: '40px',
        height: '40px',
        background: `radial-gradient(circle, ${borderColor}15 0%, transparent 70%)`,
        borderRadius: '50%',
        pointerEvents: 'none'
      }}></div>

      {/* Title */}
      <div style={{ marginBottom: '14px', marginTop: '2px' }}>
        <h4 style={{ 
          margin: '0', 
          color: textColor, 
          fontWeight: '800', 
          fontSize: '1.05em',
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
          lineHeight: '1.3'
        }}>
          {title}
        </h4>
      </div>

      {/* Total Records Section */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '0.7em', color: '#94a3b8', fontWeight: '700', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          Total Records
        </div>
        <div style={{ 
          fontSize: '2.2em', 
          fontWeight: '900', 
          color: borderColor,
          lineHeight: '1',
          textShadow: `0 2px 4px ${borderColor}20`
        }}>
          {metrics?.total}
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${borderColor}30, transparent)`,
        marginBottom: '16px'
      }}></div>

      {/* Main Metric Label (for Incidents, CA, PA) */}
      {metrics?.mainMetric && (
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '0.7em', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            {metrics?.mainMetric}
          </div>
        </div>
      )}

      {/* Improvement Percentage */}
      <div style={{ textAlign: 'center', marginBottom: '14px' }}>
        <div style={{ 
          fontSize: parseInt(metrics?.improvement) < 0 ? '2.8em' : '3.2em', 
          fontWeight: '900', 
          color: borderColor,
          lineHeight: '1',
          marginBottom: '4px',
          textShadow: `0 4px 8px ${borderColor}25`,
          letterSpacing: '-1px',
          position: 'relative',
          display: 'inline-block',
          paddingLeft: '48px'
        }}>
          {parseInt(metrics?.improvement) < 0 ? (
            <span style={{ color: '#dc2626', fontSize: '0.5em', position: 'absolute', top: '-20px', left: '0' }}>↓</span>
          ) : (
            <span style={{ color: '#22c55e', fontSize: '0.5em', position: 'absolute', top: '-20px', left: '0' }}>↑</span>
          )}
          {metrics?.improvement.replace('%', '')}<span style={{ fontSize: '0.75em', marginLeft: '2px' }}>%</span>
        </div>
        <div style={{ fontSize: '0.8em', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {metrics?.label}
        </div>
      </div>

      {/* From/To Details Section - Enhanced */}
      <div style={{ 
        background: `linear-gradient(135deg, ${borderColor}15, ${borderColor}08)`,
        border: `1.5px solid ${borderColor}30`,
        padding: '16px 16px',
        borderRadius: '12px',
        fontSize: '0.85em',
        color: '#475569',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `linear-gradient(135deg, ${borderColor}20, ${borderColor}12)`
        e.currentTarget.style.borderColor = `${borderColor}50`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `linear-gradient(135deg, ${borderColor}15, ${borderColor}08)`
        e.currentTarget.style.borderColor = `${borderColor}30`
      }}
      >
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: '700', color: '#64748b', textTransform: 'uppercase', fontSize: '0.75em', letterSpacing: '0.3px' }}>From:</span>
          <strong style={{ color: '#dc2626', fontWeight: '900', fontSize: '1.15em' }}>
            {title === 'Out of Specifications' ? metrics?.avg : metrics?.from} days
          </strong>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingTop: '8px',
          borderTop: `1px solid ${borderColor}20`
        }}>
          <span style={{ fontWeight: '700', color: '#64748b', textTransform: 'uppercase', fontSize: '0.75em', letterSpacing: '0.3px' }}>To:</span>
          <strong style={{ color: borderColor, fontWeight: '900', fontSize: '1.15em' }}>
            {title === 'Out of Specifications' ? metrics?.latest : metrics?.to} days
          </strong>
        </div>
      </div>
    </div>
  )
}

export default function SiteOverview() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSite, setSelectedSite] = useState(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const sectionRef = useRef(null)
  const siteRefMap = useRef({
    'SITE-I': useRef(null),
    'SITE-III': useRef(null),
    'SITE-V': useRef(null)
  })

  const handleCategoryClick = (category, site) => {
    // Save the current scroll position of the section
    if (sectionRef.current) {
      setScrollPosition(sectionRef.current.scrollTop)
    }
    setSelectedCategory(category)
    setSelectedSite(site)
  }

  const handleClose = () => {
    setSelectedCategory(null)
    setSelectedSite(null)
    // Restore scroll position after state update
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollTop = scrollPosition
      }
    }, 0)
  }

  const handleSiteClick = (siteName) => {
    if (siteRefMap.current[siteName] && siteRefMap.current[siteName].current) {
      const siteElement = siteRefMap.current[siteName].current
      const sectionContainer = sectionRef.current
      if (sectionContainer) {
        const elementPosition = siteElement.offsetTop - 100
        sectionContainer.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <section className="content-slide" ref={sectionRef} style={{ position: 'relative', overflow: 'auto' }}>
      <h2 style={{ borderBottom: '4px solid #b91c1c', paddingBottom: '8px', marginBottom: '20px', color: '#b91c1c', fontSize: '1.8em', fontWeight: '600' }}>
        📊 Key Metrics Overview - QMS
      </h2>

      {/* Executive Summary Sections at the top */}
      <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #e5e7eb' }}>
        <OverallPerformance onCompleteOverviewClick={() => setSelectedCategory('overview')} />
        <SiteComparisonGrid onSiteClick={handleSiteClick} />
      </div>

      {/* Home Button - Show when any category is selected (except overview) */}
      {selectedCategory && selectedCategory !== 'overview' && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <button
            onClick={() => { setSelectedCategory(null); setSelectedSite(null) }}
            style={{
              padding: '14px 28px',
              fontSize: '1.1em',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: '#b91c1c',
              color: '#ffffff',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(185, 28, 28, 0.3)',
              minWidth: '110px',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#991b1b'
              e.target.style.boxShadow = '0 6px 16px rgba(185, 28, 28, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#b91c1c'
              e.target.style.boxShadow = '0 4px 12px rgba(185, 28, 28, 0.3)'
            }}
          >
            🏠 Home
          </button>
        </div>
      )}

      {/* Complete Overview Section - Show when overview button is clicked */}
      {selectedCategory === 'overview' && (
        <div style={{ marginTop: '20px', backgroundColor: '#ffffff', padding: '0', borderRadius: '0' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            <button
              onClick={() => { setSelectedCategory(null); setSelectedSite(null) }}
              style={{
                padding: '14px 28px',
                fontSize: '1.1em',
                fontWeight: '600',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: '#b91c1c',
                color: '#ffffff',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(185, 28, 28, 0.3)',
                minWidth: '110px',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#991b1b'
                e.target.style.boxShadow = '0 6px 16px rgba(185, 28, 28, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#b91c1c'
                e.target.style.boxShadow = '0 4px 12px rgba(185, 28, 28, 0.3)'
              }}
            >
              🏠 Home
            </button>
          </div>
          <QMSOverview />
        </div>
      )}

      {/* Overview - Show when no category is selected */}
      {!selectedCategory && (
        <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2em', color: '#0f172a', fontWeight: '700', paddingBottom: '10px', borderBottom: '2px solid #b91c1c', margin: 0, flex: 1 }}>
              📈 Individual Site Key Metrics
            </h3>
          </div>
          {/* SITE-I Section */}
          <div ref={siteRefMap.current['SITE-I']} style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              fontSize: '1.4em', 
              color: '#0f172a', 
              fontWeight: '800', 
              marginBottom: '20px', 
              paddingBottom: '16px', 
              paddingLeft: '16px',
              borderBottom: '3px solid #3b82f6',
              borderLeft: '6px solid #3b82f6',
              letterSpacing: '0.5px',
              position: 'relative'
            }}>
              🏭 SITE-I
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              <CategoryCard
                title="Incidents"
                metrics={metricsData['SITE-I']['Incidents']}
                color="#dc2626"
                borderColor="#dc2626"
                textColor="#991b1b"
                onClick={() => handleCategoryClick('Incidents', 'SITE-I')}
              />
              <CategoryCard
                title="Corrective Actions"
                metrics={metricsData['SITE-I']['CA']}
                color="#8b5cf6"
                borderColor="#8b5cf6"
                textColor="#6d28d9"
                onClick={() => handleCategoryClick('CA', 'SITE-I')}
              />
              <CategoryCard
                title="Preventive Actions"
                metrics={metricsData['SITE-I']['PA']}
                color="#10b981"
                borderColor="#10b981"
                textColor="#047857"
                onClick={() => handleCategoryClick('PA', 'SITE-I')}
              />
              <CategoryCard
                title="Out of Specifications"
                metrics={metricsData['SITE-I']['Out of Specifications']}
                color="#f59e0b"
                borderColor="#f59e0b"
                textColor="#b45309"
                onClick={() => handleCategoryClick('Out of Specifications', 'SITE-I')}
              />
              <CategoryCard
                title="Change Controls"
                metrics={metricsData['SITE-I']['Change Controls']}
                color="#3b82f6"
                borderColor="#3b82f6"
                textColor="#1e40af"
                onClick={() => handleCategoryClick('Change Controls', 'SITE-I')}
              />
            </div>
          </div>

          {/* SITE-III Section */}
          <div ref={siteRefMap.current['SITE-III']} style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              fontSize: '1.4em', 
              color: '#0f172a', 
              fontWeight: '800', 
              marginBottom: '20px', 
              paddingBottom: '16px', 
              paddingLeft: '16px',
              borderBottom: '3px solid #f59e0b',
              borderLeft: '6px solid #f59e0b',
              letterSpacing: '0.5px',
              position: 'relative'
            }}>
              🏭 SITE-III
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              <CategoryCard
                title="Incidents"
                metrics={metricsData['SITE-III']['Incidents']}
                color="#dc2626"
                borderColor="#dc2626"
                textColor="#991b1b"
                onClick={() => handleCategoryClick('Incidents', 'SITE-III')}
              />
              <CategoryCard
                title="Corrective Actions"
                metrics={metricsData['SITE-III']['CA']}
                color="#8b5cf6"
                borderColor="#8b5cf6"
                textColor="#6d28d9"
                onClick={() => handleCategoryClick('CA', 'SITE-III')}
              />
              <CategoryCard
                title="Preventive Actions"
                metrics={metricsData['SITE-III']['PA']}
                color="#10b981"
                borderColor="#10b981"
                textColor="#047857"
                onClick={() => handleCategoryClick('PA', 'SITE-III')}
              />
              <CategoryCard
                title="Out of Specifications"
                metrics={metricsData['SITE-III']['Out of Specifications']}
                color="#f59e0b"
                borderColor="#f59e0b"
                textColor="#b45309"
                onClick={() => handleCategoryClick('Out of Specifications', 'SITE-III')}
              />
              <CategoryCard
                title="Change Controls"
                metrics={metricsData['SITE-III']['Change Controls']}
                color="#3b82f6"
                borderColor="#3b82f6"
                textColor="#1e40af"
                onClick={() => handleCategoryClick('Change Controls', 'SITE-III')}
              />
            </div>
          </div>

          {/* SITE-V Section */}
          <div ref={siteRefMap.current['SITE-V']} style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              fontSize: '1.4em', 
              color: '#0f172a', 
              fontWeight: '800', 
              marginBottom: '20px', 
              paddingBottom: '16px', 
              paddingLeft: '16px',
              borderBottom: '3px solid #ec4899',
              borderLeft: '6px solid #ec4899',
              letterSpacing: '0.5px',
              position: 'relative'
            }}>
              🏭 SITE-V
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              <CategoryCard
                title="Incidents"
                metrics={metricsData['SITE-V']['Incidents']}
                color="#dc2626"
                borderColor="#dc2626"
                textColor="#991b1b"
                onClick={() => handleCategoryClick('Incidents', 'SITE-V')}
              />
              <CategoryCard
                title="Corrective Actions"
                metrics={metricsData['SITE-V']['CA']}
                color="#8b5cf6"
                borderColor="#8b5cf6"
                textColor="#6d28d9"
                onClick={() => handleCategoryClick('CA', 'SITE-V')}
              />
              <CategoryCard
                title="Preventive Actions"
                metrics={metricsData['SITE-V']['PA']}
                color="#10b981"
                borderColor="#10b981"
                textColor="#047857"
                onClick={() => handleCategoryClick('PA', 'SITE-V')}
              />
              <CategoryCard
                title="Out of Specifications"
                metrics={metricsData['SITE-V']['Out of Specifications']}
                color="#f59e0b"
                borderColor="#f59e0b"
                textColor="#b45309"
                onClick={() => handleCategoryClick('Out of Specifications', 'SITE-V')}
              />
              <CategoryCard
                title="Change Controls"
                metrics={metricsData['SITE-V']['Change Controls']}
                color="#3b82f6"
                borderColor="#3b82f6"
                textColor="#1e40af"
                onClick={() => handleCategoryClick('Change Controls', 'SITE-V')}
              />
            </div>
          </div>


        </div>
      )}

      {/* Category Details View */}
      {selectedCategory && selectedSite && (
        <div style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#ffffff',
          zIndex: 9999,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '40px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '1.8em', color: '#0f172a', fontWeight: '700', margin: '0' }}>
              {selectedSite} - {selectedCategory}
            </h3>
            <button
              onClick={handleClose}
              style={{
                padding: '10px 20px',
                fontSize: '1em',
                fontWeight: '600',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: '#b91c1c',
                color: '#ffffff',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(185, 28, 28, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#991b1b'
                e.target.style.boxShadow = '0 6px 16px rgba(185, 28, 28, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#b91c1c'
                e.target.style.boxShadow = '0 4px 12px rgba(185, 28, 28, 0.3)'
              }}
            >
              ✕ Close
            </button>
          </div>

          {selectedSite === 'SITE-I' && selectedCategory === 'Incidents' && <SiteIIncidents />}
          {selectedSite === 'SITE-I' && selectedCategory === 'CA' && <SiteICorrectiveActions />}
          {selectedSite === 'SITE-I' && selectedCategory === 'PA' && <SiteIPreventiveActions />}
          {selectedSite === 'SITE-I' && selectedCategory === 'Out of Specifications' && <SiteIOutOfSpecifications />}
          {selectedSite === 'SITE-I' && selectedCategory === 'Change Controls' && <SiteIChangeControls />}
          {selectedSite === 'SITE-III' && selectedCategory === 'Incidents' && <SiteIIIIncidents />}
          {selectedSite === 'SITE-III' && selectedCategory === 'CA' && <SiteIIICorrectiveActions />}
          {selectedSite === 'SITE-III' && selectedCategory === 'PA' && <SiteIIIPreventiveActions />}
          {selectedSite === 'SITE-III' && selectedCategory === 'Out of Specifications' && <SiteIIIOutOfSpecifications />}
          {selectedSite === 'SITE-III' && selectedCategory === 'Change Controls' && <SiteIIIChangeControls />}
          {selectedSite === 'SITE-V' && selectedCategory === 'Incidents' && <SiteVIncidents />}
          {selectedSite === 'SITE-V' && selectedCategory === 'CA' && <SiteVCorrectiveActions />}
          {selectedSite === 'SITE-V' && selectedCategory === 'PA' && <SiteVPreventiveActions />}
          {selectedSite === 'SITE-V' && selectedCategory === 'Out of Specifications' && <SiteVOutOfSpecifications />}
          {selectedSite === 'SITE-V' && selectedCategory === 'Change Controls' && <SiteVChangeControls />}

          {!(selectedSite === 'SITE-I' && (
            selectedCategory === 'Incidents' ||
            selectedCategory === 'CA' ||
            selectedCategory === 'PA' ||
            selectedCategory === 'Out of Specifications' ||
            selectedCategory === 'Change Controls'
          )) && !(
            selectedSite === 'SITE-III' && (
              selectedCategory === 'Incidents' ||
              selectedCategory === 'CA' ||
              selectedCategory === 'PA' ||
              selectedCategory === 'Out of Specifications' ||
              selectedCategory === 'Change Controls'
            )
          ) && !(
            selectedSite === 'SITE-V' && (
              selectedCategory === 'Incidents' ||
              selectedCategory === 'CA' ||
              selectedCategory === 'PA' ||
              selectedCategory === 'Out of Specifications' ||
              selectedCategory === 'Change Controls'
            )
          ) && (
            <p style={{ color: '#64748b', fontSize: '0.95em', marginTop: '20px' }}>
              Data for {selectedSite} - {selectedCategory} will be added here.
            </p>
          )}
        </div>
      )}
    </section>
  )
}


