import { useState } from 'react'
import { processImplementations } from '../data'

export default function ProcessImprovements() {
  const doneImprovements = processImplementations.filter(p => p.status === 'done')
  const inProgressImprovements = processImplementations.filter(p => p.status === 'in-progress')
  const [expandedDone, setExpandedDone] = useState(null)
  const [expandedProgress, setExpandedProgress] = useState(null)

  return (
    <section className="content-slide">
      <h2>New Process Implementation – Site III</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div>
          <h3 style={{ color: '#111827', marginBottom: '15px', fontSize: '1.1em' }}>Completed</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {doneImprovements.map((impl, idx) => (
              <div 
                key={idx} 
                className="improvement-card done"
                onMouseEnter={() => setExpandedDone(idx)}
                onMouseLeave={() => setExpandedDone(null)}
              >
                <div style={{ fontSize: '0.9em', fontWeight: '600', color: '#111827' }}>✓ {impl.title}</div>
                {expandedDone === idx && (
                  <div style={{ fontSize: '0.8em', color: '#374151', lineHeight: '1.4', marginTop: '6px' }}>{impl.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 style={{ color: '#b91c1c', marginBottom: '15px', fontSize: '1.1em' }}>In Progress</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {inProgressImprovements.map((impl, idx) => (
              <div 
                key={idx} 
                className="improvement-card in-progress"
                onMouseEnter={() => setExpandedProgress(idx)}
                onMouseLeave={() => setExpandedProgress(null)}
              >
                <div style={{ fontSize: '0.9em', fontWeight: '600', color: '#b91c1c' }}>→ {impl.title}</div>
                {expandedProgress === idx && (
                  <div style={{ fontSize: '0.8em', color: '#374151', lineHeight: '1.4', marginTop: '6px' }}>{impl.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
