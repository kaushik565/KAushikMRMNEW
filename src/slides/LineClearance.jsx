import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import {
  months,
  lineClearanceData,
  lineClosureData,
  lineReverificationData,
  lineVerificationData,
  lineProcessTotals
} from '../data'

Chart.register(...registerables)

export default function LineClearance() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const fullChartRef = useRef(null)
  const fullChartInstance = useRef(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isTableExpanded, setIsTableExpanded] = useState(false)

  const sum = (arr) => arr.reduce((a, b) => a + b, 0)

  const totalNotApprovedClearance = sum(lineClearanceData.notApproved)
  const totalNotApprovedClosure = sum(lineClosureData.notApproved)
  const totalNotApprovedReverification = sum(lineReverificationData.notApproved)
  const totalNotApprovedVerification = sum(lineVerificationData.notApproved)
  const totalNotApprovedReverifyAndVerify = totalNotApprovedReverification + totalNotApprovedVerification

  const overallApproved =
    sum(lineClearanceData.approved) +
    sum(lineClosureData.approved) +
    sum(lineReverificationData.approved) +
    sum(lineVerificationData.approved)
  const overallNotApproved =
    totalNotApprovedClearance +
    totalNotApprovedClosure +
    totalNotApprovedReverification +
    totalNotApprovedVerification

  const chartConfig = {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Clearance Approved',
          data: lineClearanceData.approved,
          backgroundColor: '#111827',
          borderColor: '#111827',
          borderWidth: 2,
          stack: 'clearance'
        },
        {
          label: 'Clearance Not Approved',
          data: lineClearanceData.notApproved,
          backgroundColor: '#fca5a5',
          borderColor: '#f87171',
          borderWidth: 2,
          stack: 'clearance'
        },
        {
          label: 'Closure Approved',
          data: lineClosureData.approved,
          backgroundColor: '#374151',
          borderColor: '#111827',
          borderWidth: 2,
          stack: 'closure'
        },
        {
          label: 'Closure Not Approved',
          data: lineClosureData.notApproved,
          backgroundColor: '#fecdd3',
          borderColor: '#fca5a5',
          borderWidth: 2,
          stack: 'closure'
        },
        {
          label: 'Reverification Approved',
          data: lineReverificationData.approved,
          backgroundColor: '#6b7280',
          borderColor: '#4b5563',
          borderWidth: 2,
          stack: 'reverification'
        },
        {
          label: 'Reverification Not Approved',
          data: lineReverificationData.notApproved,
          backgroundColor: '#fca5a5',
          borderColor: '#f87171',
          borderWidth: 2,
          stack: 'reverification'
        },
        {
          label: 'Verification Approved',
          data: lineVerificationData.approved,
          backgroundColor: '#d1d5db',
          borderColor: '#9ca3af',
          borderWidth: 2,
          stack: 'verification'
        },
        {
          label: 'Verification Not Approved',
          data: lineVerificationData.notApproved,
          backgroundColor: '#fee2e2',
          borderColor: '#fca5a5',
          borderWidth: 2,
          stack: 'verification'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Line Clearance / Closure / (Re)Verification by Month',
          font: { size: 20, weight: 'bold' }
        },
        legend: {
          position: 'top',
          labels: { padding: 20, font: { size: 14 } }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false }
        },
        y: {
          stacked: true,
          title: { display: true, text: 'Count' },
          beginAtZero: true
        }
      }
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')

      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      chartInstance.current = new Chart(ctx, chartConfig)
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (isFullScreen && fullChartRef.current) {
      const ctx = fullChartRef.current.getContext('2d')

      if (fullChartInstance.current) {
        fullChartInstance.current.destroy()
      }

      fullChartInstance.current = new Chart(ctx, chartConfig)
    }

    return () => {
      if (fullChartInstance.current) {
        fullChartInstance.current.destroy()
      }
    }
  }, [isFullScreen])

  const openFullScreen = () => setIsFullScreen(true)
  const closeFullScreen = () => setIsFullScreen(false)
  const openTableExpanded = () => setIsTableExpanded(true)
  const closeTableExpanded = () => setIsTableExpanded(false)

  return (
    <section className="content-slide">
      <h2 className="line-clearance-title">Line Clearance / Closure / (Re)Verification (Jul–Nov)</h2>

      <div className="metric-cards">
        <div className="metric-card blue">
          <div className="metric-label">Approved (All Processes)</div>
          <div className="metric-value">{overallApproved}</div>
        </div>
        <div className="metric-card red">
          <div className="metric-label">Not Approved (All)</div>
          <div className="metric-value">{overallNotApproved}</div>
        </div>
        <div className="metric-card amber">
          <div className="metric-label">Clearance Not Approved</div>
          <div className="metric-value">{totalNotApprovedClearance}</div>
        </div>
        <div className="metric-card green">
          <div className="metric-label">Closure Not Approved</div>
          <div className="metric-value">{totalNotApprovedClosure}</div>
        </div>
        <div className="metric-card purple">
          <div className="metric-label">(Re)Verification Not Approved</div>
          <div className="metric-value">{totalNotApprovedReverifyAndVerify}</div>
        </div>
      </div>

      <div className="content-grid">
        <div className="grid-col">
          <div className="chart-container clickable" onClick={openFullScreen}>
            <canvas ref={chartRef}></canvas>
          </div>

          <div className="insights">
            <h4>Key Insights</h4>
            <ul>
              <li>Not-approved volume stays low; concentrate QA checks on clearance (29) and closure (29) outliers.</li>
              <li>(Re)verification not-approved counts are minimal (34 + 1); keep quick triage to prevent recurrence.</li>
              <li>Approved throughput remains strong at 15,534 across all processes; maintain current controls while watching October dips.</li>
            </ul>
          </div>
        </div>

        <div className="grid-col">
          <div className="data-table">
            <div className="table-header-with-expand">
              <h4>Process Summary</h4>
              <button className="expand-btn" onClick={openTableExpanded} title="Expand to monthly view">
                <span>📊 Expand</span>
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Process</th>
                  <th>Approved</th>
                  <th className="not-approved-col">Not Approved</th>
                  <th>Total Qty</th>
                </tr>
              </thead>
              <tbody>
                {[{
                  name: 'Line Clearance',
                  approved: lineProcessTotals.clearance,
                  notApproved: sum(lineClearanceData.notApproved)
                }, {
                  name: 'Line Closure',
                  approved: lineProcessTotals.closure,
                  notApproved: sum(lineClosureData.notApproved)
                }, {
                  name: 'Line Reverification',
                  approved: lineProcessTotals.reverification,
                  notApproved: sum(lineReverificationData.notApproved)
                }, {
                  name: 'Line Verification',
                  approved: lineProcessTotals.verification,
                  notApproved: sum(lineVerificationData.notApproved)
                }].map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.approved}</td>
                    <td className="not-approved-text">{row.notApproved}</td>
                    <td>{row.approved + row.notApproved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="spotlight">
        <h4>Not Approved Spotlight (QA)</h4>
        <div className="pill-row">
          {[{
            label: 'Clearance',
            count: totalNotApprovedClearance
          }, {
            label: 'Closure',
            count: totalNotApprovedClosure
          }, {
            label: 'Reverification',
            count: totalNotApprovedReverification
          }, {
            label: 'Verification',
            count: totalNotApprovedVerification
          }].map((item) => (
            <div key={item.label} className="pill">
              <span className="pill-label">{item.label}</span>
              <span className="pill-value">{item.count}</span>
            </div>
          ))}
          <div className="pill critical">
            <span className="pill-label">Total Not Approved</span>
            <span className="pill-value">{overallNotApproved}</span>
          </div>
        </div>
      </div>

      {isFullScreen && (
        <div className="modal-overlay" onClick={closeFullScreen}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeFullScreen} aria-label="Close full screen chart">×</button>
            <div className="chart-container full-screen">
              <canvas ref={fullChartRef}></canvas>
            </div>
          </div>
        </div>
      )}

      {isTableExpanded && (
        <div className="modal-overlay" onClick={closeTableExpanded}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeTableExpanded} aria-label="Close expanded table">×</button>
            <h3 className="expanded-table-title">Monthly Breakdown by Process</h3>
            <div className="expanded-tables-container">
              {[{
                name: 'Line Clearance',
                approved: lineClearanceData.approved,
                notApproved: lineClearanceData.notApproved
              }, {
                name: 'Line Closure',
                approved: lineClosureData.approved,
                notApproved: lineClosureData.notApproved
              }, {
                name: 'Line Reverification',
                approved: lineReverificationData.approved,
                notApproved: lineReverificationData.notApproved
              }, {
                name: 'Line Verification',
                approved: lineVerificationData.approved,
                notApproved: lineVerificationData.notApproved
              }].map((process) => (
                <div key={process.name} className="expanded-table-item">
                  <table className="expanded-table">
                    <thead>
                      <tr>
                        <th colSpan="4">{process.name}</th>
                      </tr>
                      <tr>
                        <th>Month</th>
                        <th>Approved</th>
                        <th className="not-approved-col">Not Approved</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {months.map((month, idx) => (
                        <tr key={month}>
                          <td>{month}</td>
                          <td>{process.approved[idx]}</td>
                          <td className="not-approved-text">{process.notApproved[idx]}</td>
                          <td>{process.approved[idx] + process.notApproved[idx]}</td>
                        </tr>
                      ))}
                      <tr className="total-row">
                        <td><strong>Total</strong></td>
                        <td><strong>{sum(process.approved)}</strong></td>
                        <td className="not-approved-text"><strong>{sum(process.notApproved)}</strong></td>
                        <td><strong>{sum(process.approved) + sum(process.notApproved)}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
