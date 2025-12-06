import { useState } from 'react'
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

// Key metrics data for each category - showing ONE main improvement metric highlighted
// Data extracted from actual component calculations
const metricsData = {
  'SITE-I': {
    'Incidents': { total: 262, period: 'Jan-Nov 2024', improvement: '13%', from: 20, to: 17, label: 'Closure Days Reduced' },
    'CA': { total: 89, period: 'Jan-Nov 2024', improvement: '-42%', from: 2, to: 4, label: 'Avg Days to Close Reduced' },
    'PA': { total: 29, period: 'Jan-Nov 2024', improvement: '56%', from: 25, to: 11, label: 'Processing Time Reduced' },
    'Out of Specifications': { total: 259, period: 'Apr-Nov 2024', improvement: '49%', avg: 21, latest: 17, label: 'Improvement' },
    'Change Controls': { total: 492, period: 'Jan-Nov 2024', improvement: '13%', from: 46, to: 40, label: 'Closure Days Reduced' }
  },
  'SITE-III': {
    'Incidents': { total: 82, period: 'Jan-Nov 2024', improvement: '42%', from: 24, to: 14, label: 'Closure Days Reduced' },
    'CA': { total: 52, period: 'Jan-Nov 2024', improvement: '16%', from: 56, to: 47, label: 'Avg Days to Close Reduced' },
    'PA': { total: 66, period: 'Jan-Nov 2024', improvement: '6%', from: 36, to: 34, label: 'Processing Time Reduced' },
    'Out of Specifications': { total: 159, period: 'Apr-Nov 2024', improvement: '49%', avg: 14, latest: 9, label: 'Improvement' },
    'Change Controls': { total: 261, period: 'Jan-Nov 2024', improvement: '61%', from: 41, to: 16, label: 'Closure Days Reduced' }
  },
  'SITE-V': {
    'Incidents': { total: 196, period: 'Jan-Nov 2024', improvement: '59%', from: 17, to: 7, label: 'Closure Days Reduced' },
    'CA': { total: 57, period: 'Jan-Nov 2024', improvement: '71%', from: 5, to: 4, label: 'Avg Days to Close Reduced' },
    'PA': { total: 41, period: 'Jan-Nov 2024', improvement: '20%', from: 40, to: 32, label: 'Processing Time Reduced' },
    'Out of Specifications': { total: 89, period: 'Apr-Aug 2024', improvement: '59%', avg: 12, latest: 7, label: 'Improvement' },
    'Change Controls': { total: 178, period: 'Jan-Nov 2024', improvement: '23%', from: 50, to: 39, label: 'Closure Days Reduced' }
  }
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

  return (
    <section className="content-slide">
      <h2 style={{ borderBottom: '4px solid #b91c1c', paddingBottom: '8px', marginBottom: '30px', color: '#b91c1c', fontSize: '1.8em', fontWeight: '600' }}>
        📊 Key Metrics Overview - QMS
      </h2>

      {/* Home Button */}
      {selectedCategory && (
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

      {/* Overview - Show when no category is selected */}
      {!selectedCategory && (
        <div style={{ marginTop: '20px' }}>
          {/* SITE-I Section */}
          <div style={{ marginBottom: '40px' }}>
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
                onClick={() => { setSelectedCategory('Incidents'); setSelectedSite('SITE-I') }}
              />
              <CategoryCard
                title="Corrective Actions"
                metrics={metricsData['SITE-I']['CA']}
                color="#8b5cf6"
                borderColor="#8b5cf6"
                textColor="#6d28d9"
                onClick={() => { setSelectedCategory('CA'); setSelectedSite('SITE-I') }}
              />
              <CategoryCard
                title="Preventive Actions"
                metrics={metricsData['SITE-I']['PA']}
                color="#10b981"
                borderColor="#10b981"
                textColor="#047857"
                onClick={() => { setSelectedCategory('PA'); setSelectedSite('SITE-I') }}
              />
              <CategoryCard
                title="Out of Specifications"
                metrics={metricsData['SITE-I']['Out of Specifications']}
                color="#f59e0b"
                borderColor="#f59e0b"
                textColor="#b45309"
                onClick={() => { setSelectedCategory('Out of Specifications'); setSelectedSite('SITE-I') }}
              />
              <CategoryCard
                title="Change Controls"
                metrics={metricsData['SITE-I']['Change Controls']}
                color="#3b82f6"
                borderColor="#3b82f6"
                textColor="#1e40af"
                onClick={() => { setSelectedCategory('Change Controls'); setSelectedSite('SITE-I') }}
              />
            </div>
          </div>

          {/* SITE-III Section */}
          <div style={{ marginBottom: '40px' }}>
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
                onClick={() => { setSelectedCategory('Incidents'); setSelectedSite('SITE-III') }}
              />
              <CategoryCard
                title="Corrective Actions"
                metrics={metricsData['SITE-III']['CA']}
                color="#8b5cf6"
                borderColor="#8b5cf6"
                textColor="#6d28d9"
                onClick={() => { setSelectedCategory('CA'); setSelectedSite('SITE-III') }}
              />
              <CategoryCard
                title="Preventive Actions"
                metrics={metricsData['SITE-III']['PA']}
                color="#10b981"
                borderColor="#10b981"
                textColor="#047857"
                onClick={() => { setSelectedCategory('PA'); setSelectedSite('SITE-III') }}
              />
              <CategoryCard
                title="Out of Specifications"
                metrics={metricsData['SITE-III']['Out of Specifications']}
                color="#f59e0b"
                borderColor="#f59e0b"
                textColor="#b45309"
                onClick={() => { setSelectedCategory('Out of Specifications'); setSelectedSite('SITE-III') }}
              />
              <CategoryCard
                title="Change Controls"
                metrics={metricsData['SITE-III']['Change Controls']}
                color="#3b82f6"
                borderColor="#3b82f6"
                textColor="#1e40af"
                onClick={() => { setSelectedCategory('Change Controls'); setSelectedSite('SITE-III') }}
              />
            </div>
          </div>

          {/* SITE-V Section */}
          <div style={{ marginBottom: '40px' }}>
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
                onClick={() => { setSelectedCategory('Incidents'); setSelectedSite('SITE-V') }}
              />
              <CategoryCard
                title="Corrective Actions"
                metrics={metricsData['SITE-V']['CA']}
                color="#8b5cf6"
                borderColor="#8b5cf6"
                textColor="#6d28d9"
                onClick={() => { setSelectedCategory('CA'); setSelectedSite('SITE-V') }}
              />
              <CategoryCard
                title="Preventive Actions"
                metrics={metricsData['SITE-V']['PA']}
                color="#10b981"
                borderColor="#10b981"
                textColor="#047857"
                onClick={() => { setSelectedCategory('PA'); setSelectedSite('SITE-V') }}
              />
              <CategoryCard
                title="Out of Specifications"
                metrics={metricsData['SITE-V']['Out of Specifications']}
                color="#f59e0b"
                borderColor="#f59e0b"
                textColor="#b45309"
                onClick={() => { setSelectedCategory('Out of Specifications'); setSelectedSite('SITE-V') }}
              />
              <CategoryCard
                title="Change Controls"
                metrics={metricsData['SITE-V']['Change Controls']}
                color="#3b82f6"
                borderColor="#3b82f6"
                textColor="#1e40af"
                onClick={() => { setSelectedCategory('Change Controls'); setSelectedSite('SITE-V') }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Category Details View */}
      {selectedCategory && selectedSite && (
        <div style={{ 
          marginTop: '20px',
          maxHeight: 'calc(100vh - 250px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: '10px'
        }}>
          <h3 style={{ fontSize: '1.3em', color: '#0f172a', fontWeight: '700', marginBottom: '20px' }}>
            {selectedSite} - {selectedCategory}
          </h3>

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
