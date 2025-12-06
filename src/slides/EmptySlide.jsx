import { useState, useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { incidentData, incidentDuration, correctiveActionData, preventiveActionData, outOfServiceData, changeControlData, siteIIncidentsData, siteIIIIncidentsData, siteVIncidentsData, siteICAData, siteIIICAData, siteVCAData, siteIPAData, siteIIIPAData, siteVPAData, siteIOOSData, siteIIIOOSData, siteVOOSData, siteIChangeControlData, siteIIIChangeControlData, siteVChangeControlData } from '../data'
import caChartImage from '../../image (6).png'
import paChartImage from '../../image (5).png'

Chart.register(...registerables)

export default function EmptySlide() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSite, setSelectedSite] = useState(null)
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const oosChartRef = useRef(null)
  const oosChartInstance = useRef(null)
  const ccMonthlyChartRef = useRef(null)
  const ccMonthlyChartInstance = useRef(null)

  const categories = ['Incidents', 'CA', 'PA', 'Out of Specifications', 'Change Controls']

  // Calculate incident metrics
  const sum = (arr) => arr.reduce((a, b) => a + b, 0)
  const totalMinor = sum(incidentData.minor)
  const totalMajor = sum(incidentData.major)
  const totalCritical = sum(incidentData.critical)
  const totalIncidents = totalMinor + totalMajor + totalCritical
  
  const latestIndex = incidentDuration.labels.length - 1
  const latestClosure = incidentDuration.closure[latestIndex]
  const latestInvestigation = incidentDuration.investigation[latestIndex]
  const peakClosure = Math.max(...incidentDuration.closure)
  const peakInvestigation = Math.max(...incidentDuration.investigation)
  const closureDropPct = Math.round(((peakClosure - latestClosure) / peakClosure) * 100)
  const investigationDropPct = Math.round(((peakInvestigation - latestInvestigation) / peakInvestigation) * 100)

  // CA metrics
  const caLatestIndex = correctiveActionData.labels.length - 1
  const caBeforeDays = correctiveActionData.avgDaysToClosure[0] // Jan-June: 51
  const caAfterDays = correctiveActionData.avgDaysToClosure[caLatestIndex] // July-Nov: 43
  const caBeforeTotal = correctiveActionData.total[0] // 13
  const caAfterTotal = correctiveActionData.total[caLatestIndex] // 39
  const caBeforeMNC = correctiveActionData.majorNonCompliance[0] // 10
  const caAfterMNC = correctiveActionData.majorNonCompliance[caLatestIndex] // 34
  const caBeforeNC = correctiveActionData.nonCompliance[0] // 3
  const caAfterNC = correctiveActionData.nonCompliance[caLatestIndex] // 5
  const caClosureImprovement = Math.round(((caBeforeDays - caAfterDays) / caBeforeDays) * 100) // % improvement in closure time
  const caTotalIncrease = Math.round(((caAfterTotal - caBeforeTotal) / caBeforeTotal) * 100) // % increase in total CAs

  // PA metrics
  const paLatestIndex = preventiveActionData.labels.length - 1
  const paBeforeDays = preventiveActionData.avgDaysToClosure[0] // Jan-June: 64
  const paAfterDays = preventiveActionData.avgDaysToClosure[paLatestIndex] // July-Nov: 60
  const paClosureImprovement = Math.round(((paBeforeDays - paAfterDays) / paBeforeDays) * 100) // % improvement in closure time

  // OOS metrics
  const oosMinDays = Math.min(...outOfServiceData.avgDaysToClosure) // Best performance
  const oosMaxDays = Math.max(...outOfServiceData.avgDaysToClosure) // Longest duration
  const oosAvgDays = Math.round(outOfServiceData.avgDaysToClosure.reduce((a, b) => a + b, 0) / outOfServiceData.avgDaysToClosure.length)
  const oosLatestDays = outOfServiceData.avgDaysToClosure[outOfServiceData.avgDaysToClosure.length - 1] // November: 6
  const oosFirstDays = outOfServiceData.avgDaysToClosure[0] // Apr-Jun: 27
  const oosImprovement = Math.round(((oosFirstDays - oosLatestDays) / oosFirstDays) * 100) // % improvement

  // Change Control metrics
  const ccFirstDays = changeControlData.avgDaysClosure.data[0] // January: 53.00
  const ccLatestDays = changeControlData.avgDaysClosure.data[changeControlData.avgDaysClosure.data.length - 1] // November: 15.60
  const ccImprovement = Math.round(((ccFirstDays - ccLatestDays) / ccFirstDays) * 100) // % improvement
  const ccAvgDays = Math.floor(changeControlData.avgDaysClosure.data.reduce((a, b) => a + b, 0) / changeControlData.avgDaysClosure.data.length)
  const ccMinDays = Math.min(...changeControlData.avgDaysClosure.data)
  const ccMaxDays = Math.max(...changeControlData.avgDaysClosure.data)

  // Setup chart for Incidents, CA, and Change Controls
  useEffect(() => {
    if ((selectedCategory === 'Incidents' || selectedCategory === 'CA' || selectedCategory === 'Change Controls') && chartRef.current) {
      // Give DOM time to render
      setTimeout(() => {
        if (!chartRef.current) return
        
        const ctx = chartRef.current.getContext('2d')
        
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        try {
          // Define chart data based on selected category
          let chartData, chartLabels
          
          if (selectedCategory === 'Incidents') {
            chartLabels = incidentDuration.labels
            chartData = [
              {
                label: 'Avg Days to Close',
                data: incidentDuration.closure,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.12)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                fill: true,
                tension: 0.35
              },
              {
                label: 'Avg Days to Investigate',
                data: incidentDuration.investigation,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.14)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                fill: true,
                tension: 0.35
              }
            ]
          } else if (selectedCategory === 'CA') {
            chartLabels = correctiveActionData.labels
            chartData = [
              {
                label: 'Avg Days to Closure',
                data: correctiveActionData.avgDaysToClosure,
                borderColor: '#b91c1c',
                backgroundColor: 'rgba(185, 28, 28, 0.12)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#b91c1c',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                fill: true,
                tension: 0.35
              },
              {
                label: 'Total CAs',
                data: correctiveActionData.total,
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#f59e0b',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                fill: true,
                tension: 0.35,
                yAxisID: 'y1'
              }
            ]
          } else if (selectedCategory === 'Change Controls') {
            chartLabels = changeControlData.avgDaysClosure.labels
            chartData = [
              {
                label: 'Avg Days to Closure',
                data: changeControlData.avgDaysClosure.data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.12)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: changeControlData.avgDaysClosure.data.map(val => 
                  val < 25 ? '#059669' : val < 40 ? '#3b82f6' : '#ef4444'
                ),
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                fill: true,
                tension: 0.35
              }
            ]
          }
          
          chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
              labels: chartLabels,
              datasets: chartData
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: {
                duration: 800,
                easing: 'easeInOutQuart'
              },
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    font: { size: 12 },
                    boxWidth: 15,
                    padding: 15
                  }
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  padding: 12,
                  titleFont: { size: 12 },
                  bodyFont: { size: 11 },
                  cornerRadius: 6
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    font: { size: 11 }
                  },
                  title: {
                    display: true,
                    text: 'Days',
                    font: { size: 12, weight: 'bold' }
                  }
                },
                ...(selectedCategory === 'CA' && {
                  y1: {
                    beginAtZero: true,
                    position: 'right',
                    ticks: {
                      font: { size: 11 }
                    },
                    title: {
                      display: true,
                      text: 'Count',
                      font: { size: 12, weight: 'bold' }
                    },
                    grid: {
                      drawOnChartArea: false
                    }
                  }
                }),
                x: {
                  ticks: {
                    font: { size: 11 }
                  }
                }
              }
            }
          })
        } catch (error) {
          console.error('Chart error:', error)
        }
      }, 100)
    }
  }, [selectedCategory])

  useEffect(() => {
    if (selectedCategory !== 'Out of Specifications') {
      if (oosChartInstance.current) {
        oosChartInstance.current.destroy()
        oosChartInstance.current = null
      }
      return
    }

    if (!oosChartRef.current) return

    const ctx = oosChartRef.current.getContext('2d')

    if (oosChartInstance.current) {
      oosChartInstance.current.destroy()
    }

    oosChartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: outOfServiceData.labels,
        datasets: [
          {
            label: 'Avg Days to Closure',
            data: outOfServiceData.avgDaysToClosure,
            borderColor: '#7c3aed',
            backgroundColor: 'rgba(124, 58, 237, 0.12)',
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: '#7c3aed',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            fill: true,
            tension: 0.35
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: { size: 12 },
              boxWidth: 14,
              padding: 14
            }
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            padding: 10,
            titleFont: { size: 12 },
            bodyFont: { size: 11 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { size: 11 }
            },
            title: {
              display: true,
              text: 'Days',
              font: { size: 12, weight: 'bold' }
            }
          },
          x: {
            ticks: {
              font: { size: 11 }
            }
          }
        }
      }
    })

    return () => {
      if (oosChartInstance.current) {
        oosChartInstance.current.destroy()
        oosChartInstance.current = null
      }
    }
  }, [selectedCategory])

  // Monthly Change Controls chart
  useEffect(() => {
    if (selectedCategory !== 'Change Controls' || !ccMonthlyChartRef.current) {
      if (ccMonthlyChartInstance.current) {
        ccMonthlyChartInstance.current.destroy()
        ccMonthlyChartInstance.current = null
      }
      return
    }

    setTimeout(() => {
      if (!ccMonthlyChartRef.current) return

      const ctx = ccMonthlyChartRef.current.getContext('2d')
      
      if (ccMonthlyChartInstance.current) {
        ccMonthlyChartInstance.current.destroy()
      }

      try {
        // Monthly CC data
        const monthlyData = [
          { month: 'JAN - JUNE', days: 41, count: 119, closed: 20, percent: 16.81, overall: 17 },
          { month: 'JULY', days: 39, count: 22, closed: 6, percent: 27.27, overall: 27 },
          { month: 'AUGUST', days: 32, count: 27, closed: 3, percent: 11.11, overall: 11 },
          { month: 'SEPTEMBER', days: 27, count: 24, closed: 7, percent: 29.17, overall: 29 },
          { month: 'OCTOBER', days: 19, count: 28, closed: 8, percent: 28.57, overall: 29 },
          { month: 'NOVEMBER', days: 16, count: 15, closed: 5, percent: 33.33, overall: 33 }
        ]

        const labels = monthlyData.map(d => d.month)
        const daysData = monthlyData.map(d => d.days)
        const countData = monthlyData.map(d => d.count)
        const percentData = monthlyData.map(d => d.percent)

        ccMonthlyChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Avg Days to Close',
                data: daysData,
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: '#3b82f6',
                borderWidth: 2,
                yAxisID: 'y'
              },
              {
                label: 'Total CC Count',
                data: countData,
                backgroundColor: 'rgba(245, 158, 11, 0.6)',
                borderColor: '#f59e0b',
                borderWidth: 2,
                yAxisID: 'y1'
              },
              {
                label: 'Closed Same Month %',
                data: percentData,
                backgroundColor: 'rgba(16, 185, 129, 0.6)',
                borderColor: '#10b981',
                borderWidth: 2,
                yAxisID: 'y2'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 800,
              easing: 'easeInOutQuart'
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  font: { size: 12 },
                  boxWidth: 14,
                  padding: 14
                }
              },
              tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                padding: 10,
                titleFont: { size: 12 },
                bodyFont: { size: 11 },
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || ''
                    if (label) {
                      label += ': '
                    }
                    if (context.datasetIndex === 2) {
                      label += context.parsed.y.toFixed(2) + '%'
                    } else {
                      label += context.parsed.y
                    }
                    return label
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                position: 'left',
                ticks: {
                  font: { size: 11 }
                },
                title: {
                  display: true,
                  text: 'Days / Count',
                  font: { size: 12, weight: 'bold' }
                }
              },
              y1: {
                beginAtZero: true,
                position: 'right',
                ticks: {
                  font: { size: 11 }
                },
                grid: {
                  drawOnChartArea: false
                },
                title: {
                  display: true,
                  text: 'CC Count',
                  font: { size: 12, weight: 'bold' }
                }
              },
              y2: {
                beginAtZero: true,
                position: 'right',
                offset: true,
                ticks: {
                  font: { size: 11 }
                },
                title: {
                  display: true,
                  text: 'Closure %',
                  font: { size: 12, weight: 'bold' }
                }
              },
              x: {
                ticks: {
                  font: { size: 11 }
                }
              }
            }
          }
        })
      } catch (error) {
        console.error('Monthly CC Chart error:', error)
      }
    }, 100)
  }, [selectedCategory])

  return (
    <section className="content-slide">
      <h2 style={{ borderBottom: '4px solid #b91c1c', paddingBottom: '8px', marginBottom: '30px', color: '#b91c1c', fontSize: '1.8em', fontWeight: '600' }}>
        📊 Key Metrics Overview
      </h2>

      {selectedCategory && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <button
            onClick={() => setSelectedCategory(null)}
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
            <h3 style={{ fontSize: '1.2em', color: '#0f172a', fontWeight: '700', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #3b82f6' }}>
              🏭 SITE-I
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              {/* SITE-I Incidents */}
              <div 
                onClick={() => { setSelectedCategory('Incidents'); setSelectedSite('SITE-I') }}
                style={{
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%)',
                  borderLeft: '5px solid #dc2626',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(220, 38, 38, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.08)'
                }}
              >
                <h4 style={{ margin: 0, color: '#991b1b', fontWeight: '700', fontSize: '0.95em', textAlign: 'center' }}>Incidents</h4>
              </div>
              
              {/* SITE-I CA */}
              <div 
                  onClick={() => { setSelectedCategory('CA'); setSelectedSite('SITE-I') }}
                style={{
                  background: 'linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)',
                  borderLeft: '5px solid #8b5cf6',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.08)'
                }}
              >
                <h4 style={{ margin: 0, color: '#6d28d9', fontWeight: '700', fontSize: '0.95em', textAlign: 'center' }}>Corrective Actions</h4>
              </div>
              
              {/* SITE-I PA */}
              <div 
                  onClick={() => { setSelectedCategory('PA'); setSelectedSite('SITE-I') }}
                style={{
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  borderLeft: '5px solid #10b981',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.08)'
                }}
              >
                <h4 style={{ margin: 0, color: '#047857', fontWeight: '700', fontSize: '0.95em', textAlign: 'center' }}>Preventive Actions</h4>
              </div>
              
              {/* SITE-I OOS */}
              <div 
                  onClick={() => { setSelectedCategory('Out of Specifications'); setSelectedSite('SITE-I') }}
                style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderLeft: '5px solid #f59e0b',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(245, 158, 11, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.08)'
                }}
              >
                <h4 style={{ margin: 0, color: '#b45309', fontWeight: '700', fontSize: '0.95em', textAlign: 'center' }}>Out of Specifications</h4>
              </div>
              
              {/* SITE-I CC */}
              <div 
                onClick={() => setSelectedCategory('Change Controls')}
                style={{
                  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  borderLeft: '5px solid #3b82f6',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.08)'
                }}
              >
                <h4 style={{ margin: 0, color: '#1e40af', fontWeight: '700', fontSize: '0.95em', textAlign: 'center' }}>Change Controls</h4>
              </div>
            </div>
          </div>

          {/* SITE-III Section */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.2em', color: '#0f172a', fontWeight: '700', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #f59e0b' }}>
              🏭 SITE-III
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              {/* SITE-III Incidents */}
              <div 
                  onClick={() => { setSelectedCategory('Incidents'); setSelectedSite('SITE-III') }}
                style={{
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%)',
                  borderLeft: '5px solid #dc2626',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(220, 38, 38, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.08)'
                }}
              >
                <h4 style={{ margin: '0 0 12px 0', color: '#991b1b', fontWeight: '700', fontSize: '0.95em' }}>Incidents</h4>
                <div style={{ fontSize: '1.8em', fontWeight: '800', color: '#dc2626', marginBottom: '4px' }}>{totalIncidents}</div>
                <div style={{ fontSize: '0.75em', color: '#7f1d1d', fontWeight: '500', marginBottom: '8px' }}>Closure Time</div>
                <div style={{ fontSize: '0.8em', color: '#991b1b', marginBottom: '8px', fontWeight: '600' }}>Before: {peakClosure} days</div>
                <div style={{ fontSize: '0.8em', color: '#991b1b', marginBottom: '4px', fontWeight: '600' }}>After: {latestClosure} days</div>
                <div style={{ fontSize: '0.8em', color: '#b45309', fontWeight: '600' }}>↑ Improved by {closureDropPct}%</div>
              </div>

              {/* SITE-III CA */}
              <div 
                    onClick={() => { setSelectedCategory('CA'); setSelectedSite('SITE-III') }}
                style={{
                  background: 'linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)',
                  borderLeft: '5px solid #8b5cf6',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.08)'
                }}
              >
                <h4 style={{ margin: 0, color: 
+
'#6d28d9', fontWeight: '700', fontSize: '0.95em', textAlign: 'center' }}>Corrective Actions</h4>
                <div style={{ fontSize: '1.8em', fontWeight: '800', color: '#8b5cf6', marginBottom: '4px' }}>{caAfterTotal}</div>
                <div style={{ fontSize: '0.75em', color: '#5b21b6', fontWeight: '500', marginBottom: '8px' }}>Total (July-Nov)</div>
                <div style={{ fontSize: '0.8em', color: '#6d28d9', marginBottom: '4px', fontWeight: '600' }}>📊 Closure: {caClosureImprovement}% ↑</div>
                <div style={{ fontSize: '0.8em', color: '#5b21b6', fontWeight: '600' }}>{caAfterDays} days avg</div>
              </div>

              {/* SITE-III PA */}
              <div 
                    onClick={() => { setSelectedCategory('PA'); setSelectedSite('SITE-III') }}
                style={{
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  borderLeft: '5px solid #10b981',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.08)'
                }}
              >
                <h4 style={{ margin: '0 0 12px 0', color: '#047857', fontWeight: '700', fontSize: '0.95em' }}>Preventive Actions</h4>
                <div style={{ fontSize: '1.8em', fontWeight: '800', color: '#10b981', marginBottom: '4px' }}>{paClosureImprovement}%</div>
                <div style={{ fontSize: '0.75em', color: '#065f46', fontWeight: '500', marginBottom: '8px' }}>Closure Improved</div>
                <div style={{ fontSize: '0.8em', color: '#047857', marginBottom: '4px', fontWeight: '600' }}>Before: {paBeforeDays} days</div>
                <div style={{ fontSize: '0.8em', color: '#065f46', fontWeight: '600' }}>After: {paAfterDays} days</div>
              </div>

              {/* SITE-III OOS */}
              <div 
                    onClick={() => { setSelectedCategory('Out of Specifications'); setSelectedSite('SITE-III') }}
                style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderLeft: '5px solid #f59e0b',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(245, 158, 11, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.08)'
                }}
              >
                <h4 style={{ margin: '0 0 12px 0', color: '#b45309', fontWeight: '700', fontSize: '0.95em' }}>Out of Specifications</h4>
                <div style={{ fontSize: '1.8em', fontWeight: '800', color: '#d97706', marginBottom: '4px' }}>{oosImprovement}%</div>
                <div style={{ fontSize: '0.75em', color: '#78350f', fontWeight: '500', marginBottom: '8px' }}>Improvement</div>
                <div style={{ fontSize: '0.8em', color: '#b45309', marginBottom: '4px', fontWeight: '600' }}>Avg: {oosAvgDays} days</div>
                <div style={{ fontSize: '0.8em', color: '#78350f', fontWeight: '600' }}>Latest: {oosLatestDays} days</div>
              </div>

              {/* SITE-III CC */}
              <div 
                onClick={() => setSelectedCategory('Change Controls')}
                style={{
                  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  borderLeft: '5px solid #3b82f6',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.08)'
                }}
              >
                <h4 style={{ margin: '0 0 12px 0', color: '#1e40af', fontWeight: '700', fontSize: '0.95em' }}>Change Controls</h4>
                <div style={{ fontSize: '1.8em', fontWeight: '800', color: '#3b82f6', marginBottom: '4px' }}>{ccImprovement}%</div>
                <div style={{ fontSize: '0.75em', color: '#1e3a8a', fontWeight: '500', marginBottom: '8px' }}>Closure Improved</div>
                <div style={{ fontSize: '0.8em', color: '#1e40af', marginBottom: '4px', fontWeight: '600' }}>From: {ccFirstDays} days</div>
                <div style={{ fontSize: '0.8em', color: '#1e3a8a', fontWeight: '600' }}>To: {ccLatestDays} days</div>
              </div>
            </div>
          </div>

          {/* SITE-V Section */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.2em', color: '#0f172a', fontWeight: '700', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #ec4899' }}>
              🏭 SITE-V
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              {/* SITE-V Incidents */}
              <div 
                    onClick={() => { setSelectedCategory('Incidents'); setSelectedSite('SITE-V') }}
                style={{
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%)',
                  borderLeft: '5px solid #dc2626',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(220, 38, 38, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.08)'
                }}
              >
                <h4 style={{ margin: 0, color: '#991b1b', fontWeight: '700', fontSize: '0.95em', textAlign: 'center' }}>Incidents</h4>
              </div>
              
              {/* SITE-V CA */}
              <div 
                      onClick={() => { setSelectedCategory('CA'); setSelectedSite('SITE-V') }}
                style={{
                  background: 'linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)',
                  borderLeft: '5px solid #8b5cf6',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.08)'
                }}
              >
                <h4 style={{ margin: 0, color: '#6d28d9', fontWeight: '700', fontSize: '0.95em', textAlign: 'center' }}>Corrective Actions</h4>
              </div>
              
              {/* SITE-V PA */}
              <div 
                      onClick={() => { setSelectedCategory('PA'); setSelectedSite('SITE-V') }}
                style={{
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  borderLeft: '5px solid #10b981',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.08)'
                }}
              >
                <h4 style={{ margin: 0, color: '#047857', fontWeight: '700', fontSize: '0.95em', textAlign: 'center' }}>Preventive Actions</h4>
              </div>
              
              {/* SITE-V OOS */}
              <div 
                      onClick={() => { setSelectedCategory('Out of Specifications'); setSelectedSite('SITE-V') }}
                style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderLeft: '5px solid #f59e0b',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(245, 158, 11, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.08)'
                }}
              >
                <h4 style={{ margin: 0, color: '#b45309', fontWeight: '700', fontSize: '0.95em', textAlign: 'center' }}>Out of Specifications</h4>
              </div>
              
              {/* SITE-V CC */}
              <div 
                onClick={() => setSelectedCategory('Change Controls')}
                style={{
                  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  borderLeft: '5px solid #3b82f6',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.08)'
                }}
              >
                <h4 style={{ margin: 0, color: '#1e40af', fontWeight: '700', fontSize: '0.95em', textAlign: 'center' }}>Change Controls</h4>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', padding: '16px', background: '#f0f9ff', borderRadius: '10px', border: '2px dashed #93c5fd', textAlign: 'center' }}>
            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '0.95em', fontWeight: '500' }}>
              👆 Click on any card above to view detailed analysis and charts for that category
            </p>
            <p style={{ margin: '8px 0 0 0', color: '#075985', fontSize: '0.85em', fontWeight: '600' }}>
              📅 <strong>Before:</strong> Jan-May | <strong>After:</strong> June-Nov
            </p>
          </div>
        </div>
      )}

      {selectedCategory === 'Incidents' && (
          <div style={{ marginTop: '20px', flex: 1 }}>
            {/* Incident Duration Chart */}
            <div style={{
              marginBottom: '20px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ padding: '16px', height: '320px' }}>
                <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
              </div>
            </div>

            {/* Chart Legend */}
            <div style={{
              display: 'flex',
              gap: '30px',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '0.9em'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '20px', height: '3px', backgroundColor: '#2563eb' }}></div>
                <span style={{ color: '#6b7280' }}>Avg Days to Close</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '20px', height: '3px', backgroundColor: '#10b981' }}></div>
                <span style={{ color: '#6b7280' }}>Avg Days to Investigate</span>
              </div>
            </div>

            {/* Incident Severity KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div style={{
                backgroundColor: '#fef2f2',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #fecaca'
              }}>
                <div style={{ fontSize: '0.85em', color: '#991b1b', marginBottom: '8px' }}>Minor Incidents</div>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#dc2626' }}>73</div>
              </div>
              <div style={{
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #fde047'
              }}>
                <div style={{ fontSize: '0.85em', color: '#92400e', marginBottom: '8px' }}>Major Incidents</div>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#d97706' }}>7</div>
              </div>
              <div style={{
                backgroundColor: '#fee2e2',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #fca5a5'
              }}>
                <div style={{ fontSize: '0.85em', color: '#7f1d1d', marginBottom: '8px' }}>Critical Incidents</div>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#991b1b' }}>1</div>
              </div>
            </div>

            {/* Closure & Investigation Time KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div style={{
                backgroundColor: '#dbeafe',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #7dd3fc'
              }}>
                <div style={{ fontSize: '0.85em', color: '#0369a1', marginBottom: '8px' }}>Closure Time Improvement</div>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#0284c7' }}>{closureDropPct}%</div>
                <div style={{ fontSize: '0.75em', color: '#0369a1', marginTop: '4px' }}>{peakClosure}d ? {latestClosure}d</div>
              </div>
              <div style={{
                backgroundColor: '#dcfce7',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #86efac'
              }}>
                <div style={{ fontSize: '0.85em', color: '#166534', marginBottom: '8px' }}>Investigation Time Improvement</div>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#16a34a' }}>{investigationDropPct}%</div>
                <div style={{ fontSize: '0.75em', color: '#166534', marginTop: '4px' }}>{peakInvestigation}d ? {latestInvestigation}d</div>
              </div>
            </div>

            {/* Monthly Breakdown */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '2px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '1.1em', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>Monthly Incident Summary</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '12px'
              }}>
                {incidentData.labels.slice(0, 6).map((month, idx) => (
                  <div key={idx} style={{
                    textAlign: 'center',
                    padding: '12px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontSize: '0.8em', color: '#6b7280', marginBottom: '8px', fontWeight: '500' }}>{month}</div>
                    <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#dc2626' }}>{incidentData.minor[idx]}</div>
                    <div style={{ fontSize: '0.7em', color: '#9ca3af', marginTop: '2px' }}>Minor</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Incident Trend Summary */}
            <div style={{
              backgroundColor: '#dbeafe',
              borderLeft: '4px solid #0284c7',
              padding: '16px',
              borderRadius: '6px',
              marginTop: '20px'
            }}>
              <p style={{ margin: '0', color: '#0c4a6e', fontSize: '0.95em', fontWeight: '500' }}>
                📊 <strong>Key Findings:</strong> Total incidents decreased by 42% YoY. Critical incidents reduced to 1 (100% improvement). Closure time improved {closureDropPct}% and investigation time improved {investigationDropPct}%.
              </p>
            </div>
          </div>
      )}

      {selectedCategory === 'Change Controls' && (
        <div style={{ marginTop: '20px', flex: 1 }}>
          {/* Summary Header */}
          <div style={{
            backgroundColor: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)'
          }}>
            <h2 style={{ margin: '0 0 12px 0', fontSize: '1.5em', fontWeight: '700' }}>📊 Change Controls Management</h2>
            <p style={{ margin: '0', fontSize: '0.95em', opacity: 0.95 }}>
              Monthly tracking of change control closure times, volumes, and same-month closure rates across the year
            </p>
          </div>

          {/* Quick Stats KPI Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              backgroundColor: '#dbeafe',
              borderRadius: '12px',
              padding: '20px',
              border: '2px solid #7dd3fc',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.12)'
            }}>
              <div style={{ fontSize: '0.75em', color: '#0369a1', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Latest (Nov)</div>
              <div style={{ fontSize: '2.4em', fontWeight: '800', color: '#0284c7', marginBottom: '4px' }}>{ccLatestDays.toFixed(1)}</div>
              <div style={{ fontSize: '0.8em', color: '#0369a1', fontWeight: '500' }}>Days to Close</div>
            </div>
            <div style={{
              backgroundColor: '#dcfce7',
              borderRadius: '12px',
              padding: '20px',
              border: '2px solid #86efac',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.12)'
            }}>
              <div style={{ fontSize: '0.75em', color: '#166534', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Best (Min)</div>
              <div style={{ fontSize: '2.4em', fontWeight: '800', color: '#16a34a', marginBottom: '4px' }}>{ccMinDays.toFixed(1)}</div>
              <div style={{ fontSize: '0.8em', color: '#166534', fontWeight: '500' }}>Days to Close</div>
            </div>
            <div style={{
              backgroundColor: '#fed7aa',
              borderRadius: '12px',
              padding: '20px',
              border: '2px solid #fdba74',
              boxShadow: '0 2px 8px rgba(217, 119, 6, 0.12)'
            }}>
              <div style={{ fontSize: '0.75em', color: '#854d0e', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Worst (Max)</div>
              <div style={{ fontSize: '2.4em', fontWeight: '800', color: '#d97706', marginBottom: '4px' }}>{ccMaxDays.toFixed(1)}</div>
              <div style={{ fontSize: '0.8em', color: '#854d0e', fontWeight: '500' }}>Days to Close</div>
            </div>
            <div style={{
              backgroundColor: '#f3e8ff',
              borderRadius: '12px',
              padding: '20px',
              border: '2px solid #ddd6fe',
              boxShadow: '0 2px 8px rgba(124, 58, 237, 0.12)'
            }}>
              <div style={{ fontSize: '0.75em', color: '#6d28d9', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Overall Improvement</div>
              <div style={{ fontSize: '2.4em', fontWeight: '800', color: '#7c3aed', marginBottom: '4px' }}>{ccImprovement}%</div>
              <div style={{ fontSize: '0.8em', color: '#6d28d9', fontWeight: '500' }}>vs January</div>
            </div>
          </div>

          {/* Monthly Performance Chart - Top Chart */}
          <div style={{
            marginBottom: '24px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: '1.1em', color: '#1f2937', fontWeight: '700' }}>📈 Monthly Performance Chart</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85em', color: '#6b7280' }}>Days to close, total CC count, and closure percentage trends</p>
            </div>
            <div style={{ padding: '20px', height: '340px' }}>
              <canvas ref={ccMonthlyChartRef} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>

          {/* Legend for Monthly Chart */}
          <div style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            marginBottom: '24px',
            fontSize: '0.9em',
            flexWrap: 'wrap',
            padding: '12px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '3px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
              <span style={{ color: '#374151', fontWeight: '500' }}>Avg Days to Close</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '3px', backgroundColor: '#f59e0b', borderRadius: '2px' }}></div>
              <span style={{ color: '#374151', fontWeight: '500' }}>Total CC Count</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '3px', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
              <span style={{ color: '#374151', fontWeight: '500' }}>Closed Same Month %</span>
            </div>
          </div>

          {/* Secondary Chart - Trend Line */}
          <div style={{
            marginBottom: '24px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: '1.1em', color: '#1f2937', fontWeight: '700' }}>📊 Closure Time Trend (Jan-Nov)</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85em', color: '#6b7280' }}>Individual month performance</p>
            </div>
            <div style={{ padding: '20px', height: '320px' }}>
              <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
          
          {/* Legend for Trend */}
          <div style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            marginBottom: '24px',
            fontSize: '0.9em',
            padding: '12px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '3px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
              <span style={{ color: '#374151', fontWeight: '500' }}>Avg Days to Closure</span>
            </div>
          </div>

          {/* Monthly Breakdown Cards */}
          <div style={{
            marginBottom: '24px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            backgroundColor: '#ffffff',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1em', color: '#1f2937', fontWeight: '700' }}>📅 Monthly Closure Timeline</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px'
            }}>
              {changeControlData.avgDaysClosure.labels.map((month, idx) => {
                const value = changeControlData.avgDaysClosure.data[idx]
                const isImprovement = idx > 0 && value < changeControlData.avgDaysClosure.data[idx - 1]
                const isWorstCase = value === ccMaxDays
                return (
                  <div key={idx} style={{
                    textAlign: 'center',
                    padding: '14px',
                    backgroundColor: isWorstCase ? '#fef2f2' : isImprovement ? '#ecfdf5' : '#f9fafb',
                    borderRadius: '8px',
                    border: isWorstCase ? '2px solid #fecaca' : isImprovement ? '2px solid #86efac' : '1px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ fontSize: '0.75em', color: '#6b7280', marginBottom: '6px', fontWeight: '600' }}>{month}</div>
                    <div style={{ fontSize: '1.4em', fontWeight: '800', color: isWorstCase ? '#dc2626' : isImprovement ? '#16a34a' : '#2563eb' }}>{value.toFixed(1)}</div>
                    <div style={{ fontSize: '0.7em', color: '#9ca3af', marginTop: '4px' }}>
                      {isWorstCase ? '❌ Worst' : isImprovement ? '✓ Improved' : 'days'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Comprehensive Data Table */}
          <div style={{
            marginBottom: '24px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: '1.1em', color: '#1f2937', fontWeight: '700' }}>📋 Monthly Change Controls Analysis</h3>
            </div>
            <div style={{ padding: '20px', overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.9em'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #d1d5db' }}>
                    <th style={{ padding: '14px', textAlign: 'left', fontWeight: '700', color: '#1f2937' }}>Month</th>
                    <th style={{ padding: '14px', textAlign: 'center', fontWeight: '700', color: '#1f2937' }}>Avg Days</th>
                    <th style={{ padding: '14px', textAlign: 'center', fontWeight: '700', color: '#1f2937' }}>vs Jan</th>
                    <th style={{ padding: '14px', textAlign: 'center', fontWeight: '700', color: '#1f2937' }}>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {changeControlData.avgDaysClosure.labels.map((month, idx) => {
                    const days = changeControlData.avgDaysClosure.data[idx]
                    const janDays = changeControlData.avgDaysClosure.data[0]
                    const improvement = ((janDays - days) / janDays) * 100
                    const isImprovement = improvement > 0
                    const prevValue = idx > 0 ? changeControlData.avgDaysClosure.data[idx - 1] : null
                    const trendBetter = prevValue && days < prevValue ? '↓' : prevValue && days > prevValue ? '↑' : '→'
                    const trendColor = trendBetter === '↓' ? '#16a34a' : trendBetter === '↑' ? '#dc2626' : '#6b7280'
                    
                    return (
                      <tr key={idx} style={{
                        backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb',
                        borderBottom: '1px solid #e5e7eb',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#ffffff' : '#f9fafb'}
                      >
                        <td style={{ padding: '14px', fontWeight: '600', color: '#1f2937' }}>{month}</td>
                        <td style={{ padding: '14px', textAlign: 'center', color: '#0284c7', fontWeight: '700', fontSize: '1em' }}>{days.toFixed(1)}d</td>
                        <td style={{ padding: '14px', textAlign: 'center', color: isImprovement ? '#16a34a' : '#dc2626', fontWeight: '700' }}>
                          {isImprovement ? '✓' : ''} {improvement.toFixed(1)}%
                        </td>
                        <td style={{ padding: '14px', textAlign: 'center', color: trendColor, fontWeight: '700', fontSize: '1.2em' }}>{trendBetter}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Insights - Enhanced */}
          <div style={{
            backgroundColor: 'linear-gradient(135deg, #dbeafe 0%, #ecfdf5 100%)',
            borderLeft: '5px solid #0284c7',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#0c4a6e', fontSize: '1em', fontWeight: '700' }}>🎯 Key Performance Insights</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', fontSize: '0.95em', lineHeight: '1.6' }}>
              <li><strong>Overall Improvement:</strong> {ccImprovement}% reduction from {ccFirstDays.toFixed(1)} days (Jan) to {ccLatestDays.toFixed(1)} days (Nov)</li>
              <li><strong>Average Performance:</strong> {ccAvgDays} days across all 11 months</li>
              <li><strong>Best Performance:</strong> {ccMinDays.toFixed(1)} days (closest to target)</li>
              <li><strong>Process Optimization:</strong> Consistent downward trend indicates effective change control process improvements</li>
              <li><strong>Trend Status:</strong> ✓ On target - November shows {ccLatestDays.toFixed(1)}d, best performance of the year</li>
            </ul>
          </div>
        </div>
      )}

      {selectedCategory === 'CA' && (
        <div style={{ marginTop: '20px', flex: 1 }}>
          {/* CA Total Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '20px',
            border: '2px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.2em',
                color: '#111827',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#f59e0b' }}>📋</span> Total Corrective Actions
              </h3>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px'
            }}>
              {/* Jan-June Total */}
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
                <div style={{
                  fontSize: '0.75em',
                  color: '#92400e',
                  fontWeight: '600',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}>Jan-June</div>
                <div style={{
                  fontSize: '2.2em',
                  fontWeight: '800',
                  color: '#d97706',
                  lineHeight: '1'
                }}>{caBeforeTotal}</div>
                <div style={{
                  fontSize: '0.7em',
                  color: '#92400e',
                  marginTop: '4px'
                }}>MNC: {caBeforeMNC} | NC: {caBeforeNC}</div>
              </div>

              {/* July-Nov Total */}
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#dbeafe', borderRadius: '8px' }}>
                <div style={{
                  fontSize: '0.75em',
                  color: '#1e40af',
                  fontWeight: '600',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}>July-Nov</div>
                <div style={{
                  fontSize: '2.2em',
                  fontWeight: '800',
                  color: '#2563eb',
                  lineHeight: '1'
                }}>{caAfterTotal}</div>
                <div style={{
                  fontSize: '0.7em',
                  color: '#1e40af',
                  marginTop: '4px'
                }}>MNC: {caAfterMNC} | NC: {caAfterNC}</div>
              </div>

              {/* MNC Increase */}
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
                <div style={{
                  fontSize: '0.75em',
                  color: '#7f1d1d',
                  fontWeight: '600',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}>MNC Change</div>
                <div style={{
                  fontSize: '2.2em',
                  fontWeight: '800',
                  color: '#dc2626',
                  lineHeight: '1'
                }}>+{caAfterMNC - caBeforeMNC}</div>
                <div style={{
                  fontSize: '0.7em',
                  color: '#7f1d1d',
                  marginTop: '4px'
                }}>{caBeforeMNC} ? {caAfterMNC}</div>
              </div>

              {/* NC Increase */}
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
                <div style={{
                  fontSize: '0.75em',
                  color: '#92400e',
                  fontWeight: '600',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}>NC Change</div>
                <div style={{
                  fontSize: '2.2em',
                  fontWeight: '800',
                  color: '#d97706',
                  lineHeight: '1'
                }}>+{caAfterNC - caBeforeNC}</div>
                <div style={{
                  fontSize: '0.7em',
                  color: '#92400e',
                  marginTop: '4px'
                }}>{caBeforeNC} ? {caAfterNC}</div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div style={{
            position: 'relative',
            height: '320px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            backgroundColor: '#fafbfc',
            marginBottom: '16px'
          }}>
            <canvas ref={chartRef} style={{ display: 'block', width: '100%', height: '100%' }} />
          </div>
          
          {/* Legend */}
          <div style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            marginBottom: '20px',
            fontSize: '0.9em'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '3px', backgroundColor: '#b91c1c' }}></div>
              <span style={{ color: '#6b7280' }}>Avg Days to Closure</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '3px', backgroundColor: '#f59e0b' }}></div>
              <span style={{ color: '#6b7280' }}>Total CAs (Right Axis)</span>
            </div>
          </div>

          {/* CA KPI Cards - Redesigned with Visual Flow */}
          <div style={{ marginBottom: '20px' }}>
            {/* Closure Time Section */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '16px',
              border: '2px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '1.2em',
                  color: '#111827',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: '#b91c1c' }}>⏱️</span> Avg Days to Closure
                </h3>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                justifyContent: 'space-around'
              }}>
                {/* Before */}
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{
                    fontSize: '0.85em',
                    color: '#6b7280',
                    fontWeight: '600',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Jan-June</div>
                  <div style={{
                    fontSize: '3em',
                    fontWeight: '800',
                    color: '#dc2626',
                    lineHeight: '1'
                  }}>{caBeforeDays}d</div>
                  <div style={{
                    fontSize: '0.8em',
                    color: '#991b1b',
                    marginTop: '6px',
                    fontWeight: '500'
                  }}>Baseline</div>
                </div>

                {/* Arrow */}
                <div style={{
                  fontSize: '2.5em',
                  color: '#10b981',
                  fontWeight: 'bold'
                }}>?</div>

                {/* Now */}
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{
                    fontSize: '0.85em',
                    color: '#6b7280',
                    fontWeight: '600',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>July-Nov</div>
                  <div style={{
                    fontSize: '3em',
                    fontWeight: '800',
                    color: '#2563eb',
                    lineHeight: '1'
                  }}>{caAfterDays}d</div>
                  <div style={{
                    fontSize: '0.8em',
                    color: '#1e40af',
                    marginTop: '6px',
                    fontWeight: '500'
                  }}>Current</div>
                </div>

                {/* Improvement Badge */}
                <div style={{
                  backgroundColor: '#dcfce7',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  border: '2px solid #86efac',
                  flex: 1,
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '2.2em',
                    fontWeight: '800',
                    color: '#059669',
                    lineHeight: '1',
                    marginBottom: '4px'
                  }}>?{caClosureImprovement}%</div>
                  <div style={{
                    fontSize: '0.8em',
                    color: '#065f46',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Faster</div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional CA Analysis Chart */}
          <div style={{
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <img 
              src={caChartImage}
              alt="CA Analysis Chart" 
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Trend Summary Message */}
          <div style={{
            backgroundColor: '#fef3c7',
            borderLeft: '4px solid #f59e0b',
            padding: '16px',
            borderRadius: '6px',
            marginTop: '20px'
          }}>
            <p style={{ margin: '0', color: '#92400e', fontSize: '0.95em', fontWeight: '500' }}>
              📊 <strong>CA Trend Summary:</strong> Closure time improved by {caClosureImprovement}% (51d → 43d). Total CAs increased by {caTotalIncrease}% ({caBeforeTotal} → {caAfterTotal}), with MNC rising from {caBeforeMNC} to {caAfterMNC}.
            </p>
          </div>
        </div>
      )}

      {selectedCategory === 'PA' && (
        <div style={{ marginTop: '20px', flex: 1 }}>
          {/* PA KPI Cards - Closure Time Comparison */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '20px',
            border: '2px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.2em',
                color: '#111827',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#7c3aed' }}>⏱️</span> Avg Days to Closure
              </h3>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              justifyContent: 'space-around'
            }}>
              {/* Before */}
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  fontSize: '0.85em',
                  color: '#6b7280',
                  fontWeight: '600',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Jan-June</div>
                <div style={{
                  fontSize: '3em',
                  fontWeight: '800',
                  color: '#dc2626',
                  lineHeight: '1'
                }}>{paBeforeDays}d</div>
                <div style={{
                  fontSize: '0.8em',
                  color: '#991b1b',
                  marginTop: '6px',
                  fontWeight: '500'
                }}>Baseline</div>
              </div>

              {/* Arrow */}
              <div style={{
                fontSize: '2.5em',
                color: '#10b981',
                fontWeight: 'bold'
              }}>?</div>

              {/* Now */}
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  fontSize: '0.85em',
                  color: '#6b7280',
                  fontWeight: '600',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>July-Nov</div>
                <div style={{
                  fontSize: '3em',
                  fontWeight: '800',
                  color: '#2563eb',
                  lineHeight: '1'
                }}>{paAfterDays}d</div>
                <div style={{
                  fontSize: '0.8em',
                  color: '#1e40af',
                  marginTop: '6px',
                  fontWeight: '500'
                }}>Current</div>
              </div>

              {/* Improvement Badge */}
              <div style={{
                backgroundColor: '#dcfce7',
                borderRadius: '12px',
                padding: '16px 24px',
                border: '2px solid #86efac',
                flex: 1,
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2.2em',
                  fontWeight: '800',
                  color: '#059669',
                  lineHeight: '1',
                  marginBottom: '4px'
                }}>?{paClosureImprovement}%</div>
                <div style={{
                  fontSize: '0.8em',
                  color: '#065f46',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Faster</div>
              </div>
            </div>
          </div>

          {/* PA Analysis Chart */}
          <div style={{
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <img 
              src={paChartImage}
              alt="PA Analysis Chart" 
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* PA Trend Summary */}
          <div style={{
            backgroundColor: '#fef3c7',
            borderLeft: '4px solid #f59e0b',
            padding: '16px',
            borderRadius: '6px',
            marginTop: '20px'
          }}>
            <p style={{ margin: '0', color: '#92400e', fontSize: '0.95em', fontWeight: '500' }}>
              📊 <strong>PA Trend Summary:</strong> Closure time improved by {paClosureImprovement}% (64d → 60d). Preventive actions are being closed faster over time.
            </p>
          </div>
        </div>
      )}

      {selectedCategory === 'Out of Specifications' && (
        <div style={{ marginTop: '20px', flex: 1 }}>
          {/* Summary Header */}
          <div style={{
            backgroundColor: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)'
          }}>
            <h2 style={{ margin: '0 0 12px 0', fontSize: '1.5em', fontWeight: '700' }}>📊 Out of Specifications Analysis</h2>
            <p style={{ margin: '0', fontSize: '0.95em', opacity: 0.95 }}>
              Monthly tracking of OOS closure times by inspection point (IQC, IPQC, FQC) with volume and closure metrics
            </p>
          </div>

          {/* Quick Stats KPI Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              backgroundColor: '#dcfce7',
              borderRadius: '12px',
              padding: '20px',
              border: '2px solid #86efac',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.12)'
            }}>
              <div style={{ fontSize: '0.75em', color: '#065f46', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Best Performance</div>
              <div style={{ fontSize: '2.4em', fontWeight: '800', color: '#059669', marginBottom: '4px' }}>{oosMinDays}d</div>
              <div style={{ fontSize: '0.8em', color: '#065f46', fontWeight: '500' }}>November</div>
            </div>
            <div style={{
              backgroundColor: '#dbeafe',
              borderRadius: '12px',
              padding: '20px',
              border: '2px solid #7dd3fc',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.12)'
            }}>
              <div style={{ fontSize: '0.75em', color: '#0369a1', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Average</div>
              <div style={{ fontSize: '2.4em', fontWeight: '800', color: '#2563eb', marginBottom: '4px' }}>{oosAvgDays}d</div>
              <div style={{ fontSize: '0.8em', color: '#0369a1', fontWeight: '500' }}>Overall</div>
            </div>
            <div style={{
              backgroundColor: '#fee2e2',
              borderRadius: '12px',
              padding: '20px',
              border: '2px solid #fca5a5',
              boxShadow: '0 2px 8px rgba(220, 38, 38, 0.12)'
            }}>
              <div style={{ fontSize: '0.75em', color: '#7f1d1d', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Longest Duration</div>
              <div style={{ fontSize: '2.4em', fontWeight: '800', color: '#dc2626', marginBottom: '4px' }}>{oosMaxDays}d</div>
              <div style={{ fontSize: '0.8em', color: '#7f1d1d', fontWeight: '500' }}>July</div>
            </div>
            <div style={{
              backgroundColor: '#f3e8ff',
              borderRadius: '12px',
              padding: '20px',
              border: '2px solid #ddd6fe',
              boxShadow: '0 2px 8px rgba(124, 58, 237, 0.12)'
            }}>
              <div style={{ fontSize: '0.75em', color: '#6d28d9', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Overall Improvement</div>
              <div style={{ fontSize: '2.4em', fontWeight: '800', color: '#7c3aed', marginBottom: '4px' }}>{oosImprovement}%</div>
              <div style={{ fontSize: '0.8em', color: '#6d28d9', fontWeight: '500' }}>{oosFirstDays}d → {oosLatestDays}d</div>
            </div>
          </div>

          {/* OOS Analysis Chart */}
          <div style={{
            marginBottom: '24px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: '1.1em', color: '#1f2937', fontWeight: '700' }}>📈 Closure Time Trend</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85em', color: '#6b7280' }}>Monthly average days to closure by inspection point</p>
            </div>
            <div style={{ padding: '20px', height: '320px' }}>
              <canvas ref={oosChartRef} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>

          {/* Monthly Breakdown Cards */}
          <div style={{
            marginBottom: '24px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            backgroundColor: '#ffffff',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1em', color: '#1f2937', fontWeight: '700' }}>📅 Monthly Closure Timeline</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px'
            }}>
              {outOfServiceData.labels.map((label, idx) => {
                const value = outOfServiceData.avgDaysToClosure[idx]
                const isImprovement = idx > 0 && value < outOfServiceData.avgDaysToClosure[idx - 1]
                const isWorstCase = value === oosMaxDays
                return (
                  <div key={idx} style={{
                    textAlign: 'center',
                    padding: '14px',
                    backgroundColor: isWorstCase ? '#fef2f2' : isImprovement ? '#ecfdf5' : '#f9fafb',
                    borderRadius: '8px',
                    border: isWorstCase ? '2px solid #fecaca' : isImprovement ? '2px solid #86efac' : '1px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ fontSize: '0.75em', color: '#6b7280', marginBottom: '6px', fontWeight: '600' }}>{label}</div>
                    <div style={{ fontSize: '1.4em', fontWeight: '800', color: isWorstCase ? '#dc2626' : isImprovement ? '#16a34a' : '#7c3aed' }}>{value}</div>
                    <div style={{ fontSize: '0.7em', color: '#9ca3af', marginTop: '4px' }}>
                      {isWorstCase ? '❌ Worst' : isImprovement ? '✓ Improved' : 'days'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Comprehensive Monthly Data Table */}
          <div style={{
            marginBottom: '24px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: '1.1em', color: '#1f2937', fontWeight: '700' }}>📋 Out of Specifications - Monthly Details</h3>
            </div>
            <div style={{ padding: '20px', overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.9em'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #d1d5db' }}>
                    <th style={{ padding: '14px', textAlign: 'left', fontWeight: '700', color: '#1f2937' }}>Month</th>
                    <th style={{ padding: '14px', textAlign: 'center', fontWeight: '700', color: '#1f2937' }}>Avg Days</th>
                    <th style={{ padding: '14px', textAlign: 'center', fontWeight: '700', color: '#1f2937' }}>IQC</th>
                    <th style={{ padding: '14px', textAlign: 'center', fontWeight: '700', color: '#1f2937' }}>IPQC</th>
                    <th style={{ padding: '14px', textAlign: 'center', fontWeight: '700', color: '#1f2937' }}>FQC</th>
                    <th style={{ padding: '14px', textAlign: 'center', fontWeight: '700', color: '#1f2937' }}>Total</th>
                    <th style={{ padding: '14px', textAlign: 'center', fontWeight: '700', color: '#1f2937' }}>Closed</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { month: 'APRIL - JUNE', days: 27, iqc: 22, ipqc: 0, fqc: 10, total: 32, closed: 27 },
                    { month: 'JULY', days: 47, iqc: 1, ipqc: 0, fqc: 2, total: 3, closed: 4 },
                    { month: 'AUGUST', days: 12, iqc: 4, ipqc: 0, fqc: 1, total: 5, closed: 6 },
                    { month: 'SEPTEMBER', days: 9, iqc: 1, ipqc: 0, fqc: 2, total: 3, closed: 6 },
                    { month: 'OCTOBER', days: 11, iqc: 0, ipqc: 0, fqc: 10, total: 10, closed: 5 },
                    { month: 'NOVEMBER', days: 6, iqc: 2, ipqc: 0, fqc: 12, total: 14, closed: 19 }
                  ].map((row, idx) => {
                    const prevValue = idx > 0 ? 27 : null
                    const trendBetter = idx > 0 && row.days < 27 ? '↓' : idx > 0 && row.days > 27 ? '↑' : '→'
                    const trendColor = trendBetter === '↓' ? '#16a34a' : trendBetter === '↑' ? '#dc2626' : '#6b7280'
                    
                    return (
                      <tr key={idx} style={{
                        backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb',
                        borderBottom: '1px solid #e5e7eb',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3e8ff'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#ffffff' : '#f9fafb'}
                      >
                        <td style={{ padding: '14px', fontWeight: '600', color: '#1f2937' }}>{row.month}</td>
                        <td style={{ padding: '14px', textAlign: 'center', color: '#7c3aed', fontWeight: '700', fontSize: '1em' }}>{row.days}d</td>
                        <td style={{ padding: '14px', textAlign: 'center', color: '#1f2937', fontWeight: '600' }}>{row.iqc}</td>
                        <td style={{ padding: '14px', textAlign: 'center', color: '#1f2937', fontWeight: '600' }}>{row.ipqc}</td>
                        <td style={{ padding: '14px', textAlign: 'center', color: '#1f2937', fontWeight: '600' }}>{row.fqc}</td>
                        <td style={{ padding: '14px', textAlign: 'center', color: '#1f2937', fontWeight: '700' }}>{row.total}</td>
                        <td style={{ padding: '14px', textAlign: 'center', color: '#059669', fontWeight: '700' }}>{row.closed}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Insights */}
          <div style={{
            backgroundColor: 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)',
            borderLeft: '5px solid #7c3aed',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#6b21a8', fontSize: '1em', fontWeight: '700' }}>🎯 Key Performance Insights</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#6b21a8', fontSize: '0.95em', lineHeight: '1.6' }}>
              <li><strong>Overall Improvement:</strong> {oosImprovement}% reduction from {oosFirstDays} days (April-June) to {oosLatestDays} days (November)</li>
              <li><strong>Best Performance:</strong> {oosMinDays} days in November with FQC contributing {12} items</li>
              <li><strong>Primary Source:</strong> IQC dominates in April-June with 22 items, shifting to FQC in later months</li>
              <li><strong>Closure Rate:</strong> 27 closed out of 32 in April-June (84%); November shows 19 out of 14 total</li>
              <li><strong>Trend Status:</strong> ✓ Consistent improvement - significant drop from July peak (47d) to November (6d)</li>
            </ul>
          </div>
        </div>
      )}

      {selectedCategory && selectedCategory !== 'Incidents' && selectedCategory !== 'CA' && selectedCategory !== 'PA' && selectedCategory !== 'Out of Specifications' && selectedCategory !== 'Change Controls' && (
        <div style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          borderLeft: '4px solid #b91c1c',
          textAlign: 'center',
          fontSize: '1.1em',
          color: '#4b5563'
        }}>
          <strong style={{ color: '#b91c1c' }}>{selectedCategory}</strong> data will be displayed here
        </div>
      )}

      {selectedCategory === 'Change Controls' && (
        <div style={{ marginTop: '20px' }}>
          {/* KPI Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              borderLeft: '5px solid #059669',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '2em', fontWeight: '800', color: '#059669' }}>{ccImprovement}%</div>
              <div style={{ fontSize: '0.85em', color: '#15803d', fontWeight: '500' }}>Improvement</div>
            </div>

            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderLeft: '5px solid #3b82f6',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '2em', fontWeight: '800', color: '#3b82f6' }}>{ccLatestDays}d</div>
              <div style={{ fontSize: '0.85em', color: '#1e40af', fontWeight: '500' }}>Latest (Nov)</div>
            </div>

            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderLeft: '5px solid #f59e0b',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '2em', fontWeight: '800', color: '#d97706' }}>{ccAvgDays}d</div>
              <div style={{ fontSize: '0.85em', color: '#92400e', fontWeight: '500' }}>Average</div>
            </div>

            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              borderLeft: '5px solid #ef4444',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '2em', fontWeight: '800', color: '#dc2626' }}>{ccFirstDays}d</div>
              <div style={{ fontSize: '0.85em', color: '#991b1b', fontWeight: '500' }}>Initial (Jan)</div>
            </div>
          </div>

          {/* Trend Analysis Summary */}
          <div style={{
            backgroundColor: '#eff6ff',
            borderLeft: '4px solid #3b82f6',
            padding: '16px',
            borderRadius: '6px',
            marginBottom: '24px'
          }}>
            <p style={{ margin: '0', color: '#1e40af', fontSize: '0.95em', fontWeight: '500' }}>
              📊 <strong>Change Control Trend:</strong> Closure time improved by {ccImprovement}% from {ccFirstDays} days (January) to {ccLatestDays} days (November). Best performance: {ccMinDays} days. Average closure time: {ccAvgDays} days.
            </p>
          </div>

          {/* Percentage Closed in Same Month */}
          <div style={{
            marginBottom: '24px',
            padding: '24px',
            background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 70%)',
            borderRadius: '14px',
            border: '1px solid #e5e8ed',
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.07), 0 4px 10px rgba(15, 23, 42, 0.04)'
          }}>
            <h3 style={{ 
              fontSize: '1.05em', 
              marginBottom: '20px', 
              color: '#0f172a', 
              fontWeight: '700',
              letterSpacing: '0.005em'
            }}>
              Percentage of Change Controls Closed in the Same Month
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
              gap: '14px',
              marginTop: '16px'
            }}>
              {changeControlData.closurePercentage.labels.map((month, idx) => {
                const percentage = changeControlData.closurePercentage.data[idx]
                const getColor = (val) => {
                  if (val >= 30) return { bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '#059669', text: '#059669' }
                  if (val >= 20) return { bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '#3b82f6', text: '#3b82f6' }
                  return { bg: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', border: '#ef4444', text: '#ef4444' }
                }
                const colors = getColor(percentage)
                
                return (
                  <div key={month} style={{
                    textAlign: 'center',
                    padding: '14px 10px',
                    background: colors.bg,
                    borderRadius: '10px',
                    borderLeft: `4px solid ${colors.border}`,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}
                  >
                    <div style={{ 
                      fontSize: '0.75em', 
                      color: '#64748b', 
                      marginBottom: '6px', 
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>{month}</div>
                    <div style={{ 
                      fontSize: '2em', 
                      fontWeight: '800', 
                      color: colors.text,
                      marginBottom: '2px'
                    }}>
                      {percentage}%
                    </div>
                    <div style={{
                      fontSize: '0.65em',
                      color: '#94a3b8',
                      fontWeight: '500'
                    }}>
                      {percentage >= 30 ? 'Excellent' : percentage >= 20 ? 'Good' : 'Low'}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary Stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '24px',
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75em', color: '#64748b', marginBottom: '4px', fontWeight: '500' }}>Average</div>
                <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#0f172a' }}>
                  {Math.round(changeControlData.closurePercentage.data.reduce((a, b) => a + b, 0) / changeControlData.closurePercentage.data.length)}%
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75em', color: '#64748b', marginBottom: '4px', fontWeight: '500' }}>Best</div>
                <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#059669' }}>
                  {Math.max(...changeControlData.closurePercentage.data)}%
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75em', color: '#64748b', marginBottom: '4px', fontWeight: '500' }}>Lowest</div>
                <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#ef4444' }}>
                  {Math.min(...changeControlData.closurePercentage.data)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
