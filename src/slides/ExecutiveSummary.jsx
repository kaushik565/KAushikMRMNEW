import { 
  incidentData, incidentDuration, correctiveActionData, preventiveActionData, 
  outOfServiceData, changeControlData, lineApprovalRates, calibrationData 
} from '../data'

export default function ExecutiveSummary() {
  // Calculate all metrics
  const sum = (arr) => arr.reduce((a, b) => a + b, 0)
  
  // Incidents
  const totalIncidents = sum(incidentData.minor) + sum(incidentData.major) + sum(incidentData.critical)
  const latestIndex = incidentDuration.labels.length - 1
  const latestClosure = Math.floor(incidentDuration.closure[latestIndex])
  const peakClosure = Math.floor(Math.max(...incidentDuration.closure))
  const closureDropPct = Math.round(((peakClosure - latestClosure) / peakClosure) * 100)
  
  // Line Clearance
  const avgLineApproval = Math.round(lineApprovalRates.clearance.reduce((a, b) => a + b, 0) / lineApprovalRates.clearance.length * 10) / 10
  
  // Corrective Actions
  const caClosureImprovement = Math.round(((correctiveActionData.avgDaysToClosure[0] - correctiveActionData.avgDaysToClosure[1]) / correctiveActionData.avgDaysToClosure[0]) * 100)
  const caTotal = sum(correctiveActionData.total)
  
  // Preventive Actions
  const paClosureImprovement = Math.round(((preventiveActionData.avgDaysToClosure[0] - preventiveActionData.avgDaysToClosure[1]) / preventiveActionData.avgDaysToClosure[0]) * 100)
  
  // Out of Service
  const oosImprovement = Math.round(((outOfServiceData.avgDaysToClosure[0] - outOfServiceData.avgDaysToClosure[5]) / outOfServiceData.avgDaysToClosure[0]) * 100)
  
  // Change Controls
  const ccImprovement = Math.round(((changeControlData.avgDaysClosure.data[0] - changeControlData.avgDaysClosure.data[10]) / changeControlData.avgDaysClosure.data[0]) * 100)
  
  // Calibrations
  const totalCalibrations = sum(calibrationData.counts)
  
  // Before/After metrics for detailed comparison
  const metrics = {
    incidentClosure: {
      before: peakClosure,
      after: latestClosure,
      improvement: closureDropPct
    },
    ca: {
      before: correctiveActionData.avgDaysToClosure[0],
      after: correctiveActionData.avgDaysToClosure[1],
      improvement: caClosureImprovement
    },
    pa: {
      before: preventiveActionData.avgDaysToClosure[0],
      after: preventiveActionData.avgDaysToClosure[1],
      improvement: paClosureImprovement
    },
    oos: {
      before: outOfServiceData.avgDaysToClosure[0],
      after: Math.floor(outOfServiceData.avgDaysToClosure[5]),
      improvement: oosImprovement
    },
    cc: {
      before: Math.floor(changeControlData.avgDaysClosure.data[0]),
      after: Math.floor(changeControlData.avgDaysClosure.data[10]),
      improvement: ccImprovement
    }
  }

  const MetricCard = ({ value, label, metric, color }) => (
    <div style={{
      padding: '16px',
      backgroundColor: '#f8fafc',
      borderLeft: `5px solid ${color}`,
      borderRadius: '4px'
    }}>
      <div style={{ fontSize: '0.8em', fontWeight: '600', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </div>
      <div style={{ fontSize: '2.2em', fontWeight: '800', color: color, marginBottom: '4px' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.85em', color: '#6b7280' }}>
        {metric}
      </div>
    </div>
  )

  return (
    <section className="content-slide">
      <h2 style={{ borderBottom: '4px solid #b91c1c', paddingBottom: '8px', marginBottom: '16px', color: '#b91c1c' }}>
        Executive Summary – Quality Performance Overview
      </h2>

      {/* Top Row - Main Performance Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <MetricCard
          value={`↓${closureDropPct}%`}
          label="Incidents"
          metric={`${peakClosure} → ${latestClosure} days`}
          color="#dc2626"
        />
        <MetricCard
          value={`↓${caClosureImprovement}%`}
          label="Corrective Actions"
          metric={`${caTotal} total processed`}
          color="#8b5cf6"
        />
        <MetricCard
          value={`${avgLineApproval}%`}
          label="Line Approval"
          metric="Within control limits"
          color="#22c55e"
        />
        <MetricCard
          value={`↓${paClosureImprovement}%`}
          label="Preventive Actions"
          metric={`${preventiveActionData.avgDaysToClosure[1]} days current`}
          color="#f59e0b"
        />
      </div>

      {/* Middle Row - Process Status */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <MetricCard
          value={`↓${oosImprovement}%`}
          label="Out of Specifications"
          metric={`${Math.floor(outOfServiceData.avgDaysToClosure[5])} days current`}
          color="#f97316"
        />
        <MetricCard
          value={`↓${ccImprovement}%`}
          label="Change Controls"
          metric={`${Math.floor(changeControlData.avgDaysClosure.data[10])} days current`}
          color="#3b82f6"
        />
        <MetricCard
          value={totalCalibrations}
          label="Total Calibrations"
          metric="units completed"
          color="#06b6d4"
        />
      </div>

        {/* Detailed Improvements Grid */}
        <div style={{ marginTop: '16px', marginBottom: '0px' }}>
          <h3 style={{ fontSize: '0.95em', fontWeight: '700', color: '#111827', marginBottom: '12px', marginTop: '0px' }}>
            Detailed Performance Improvements (Before → After)
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px'
          }}>
            {[
              { title: 'Incidents Closed', subtitle: `${metrics.incidentClosure.before} → ${metrics.incidentClosure.after} days`, ...metrics.incidentClosure },
              { title: 'CA Improvement', subtitle: 'Closure efficiency', ...metrics.ca },
              { title: 'PA Closure', subtitle: 'Preventive actions', ...metrics.pa },
              { title: 'Out of Spec', subtitle: 'OOS resolution', ...metrics.oos },
              { title: 'Change Control', subtitle: 'CC time reduction', ...metrics.cc }
            ].map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: '#ffffff',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #e5e7eb',
                textAlign: 'center',
                fontSize: '0.8em'
              }}>
                <div style={{ fontWeight: '700', color: '#111827', marginBottom: '2px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.7em', color: '#6b7280', marginBottom: '6px' }}>
                  {item.subtitle}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '6px', fontSize: '0.75em' }}>
                  <div>
                    <span style={{ color: '#6b7280' }}>Before:</span>
                    <div style={{ fontWeight: '700', color: '#dc2626' }}>{item.before}</div>
                  </div>
                  <div>
                    <span style={{ color: '#6b7280' }}>After:</span>
                    <div style={{ fontWeight: '700', color: '#22c55e' }}>{item.after}</div>
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#eff6ff',
                  padding: '4px',
                  borderRadius: '3px',
                  fontSize: '0.8em',
                  fontWeight: '800',
                  color: '#3b82f6'
                }}>
                  ↓ {item.improvement}%
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}
