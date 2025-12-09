import React, { useState, useEffect } from 'react';

export default function QualityObjectives() {
  const [activeCard, setActiveCard] = useState(null);
  const [activeQI, setActiveQI] = useState(null);
  const [activeQI07, setActiveQI07] = useState(null);

  // Close all modals when slide changes
  useEffect(() => {
    const handleCloseModals = () => {
      setActiveCard(null);
      setActiveQI(null);
      setActiveQI07(null);
    };

    window.addEventListener('closeAllModals', handleCloseModals);
    return () => {
      window.removeEventListener('closeAllModals', handleCloseModals);
    };
  }, []);

  const handleCardClick = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
    setActiveQI(null);
    setActiveQI07(null);
  };

  const handleQIClick = (qiIndex, objective) => {
    if (objective === '04') {
      setActiveQI(activeQI === qiIndex ? null : qiIndex);
    } else {
      setActiveQI07(activeQI07 === qiIndex ? null : qiIndex);
    }
  };

  // QI Data for Objective 04
  const qi1Data = [
    { 
      site: 'Site I', 
      value: 100, 
      target: 100,
      totalEmployees: 85,
      noTraining: 20,
      trainedOldRevision: 45,
      trainedLatestRevision: 20
    },
    { 
      site: 'Site III', 
      value: 100, 
      target: 100,
      totalEmployees: 103,
      noTraining: 30,
      trainedOldRevision: 56,
      trainedLatestRevision: 17
    },
    { 
      site: 'Site V', 
      value: 100, 
      target: 100,
      totalEmployees: 92,
      noTraining: 25,
      trainedOldRevision: 50,
      trainedLatestRevision: 17
    }
  ];
  const qi2Data = [
    { 
      site: 'Site I', 
      value: 100, 
      target: 100,
      trainedLatestSOP: 88,
      evaluationPassed80: 82,
      retrainingProvided: 6,
      evaluation100Passed: 88
    },
    { 
      site: 'Site III', 
      value: 100, 
      target: 100,
      trainedLatestSOP: 103,
      evaluationPassed80: 98,
      retrainingProvided: 5,
      evaluation100Passed: 103
    },
    { 
      site: 'Site V', 
      value: 100, 
      target: 100,
      trainedLatestSOP: 95,
      evaluationPassed80: 88,
      retrainingProvided: 7,
      evaluation100Passed: 95
    }
  ];
  const qi3Data = [
    { 
      site: 'Site I', 
      value: 60, 
      target: 100,
      biweeklyChecks: [
        { date: '31/10/2025', status: 'No GDP error found and no incident has been raised' },
        { date: '15/11/2025', status: 'No GDP error found and no incident has been raised' },
        { date: '29/11/2025', status: 'No GDP error found and no incidents were raised related to GDP' },
        { date: '15/12/2025', status: 'No GDP error found and no incident has been raised' }
      ]
    },
    { 
      site: 'Site III', 
      value: 50, 
      target: 100,
      biweeklyChecks: [
        { date: '31/10/2025', status: 'No GDP error found and no incident has been raised' },
        { date: '15/11/2025', status: 'No GDP error found and no incident has been raised' },
        { date: '29/11/2025', status: 'No GDP error found and no incidents were raised related to GDP' },
        { date: '15/12/2025', status: 'No GDP error found and no incident has been raised' }
      ]
    },
    { 
      site: 'Site V', 
      value: 40, 
      target: 100,
      biweeklyChecks: [
        { date: '31/10/2025', status: 'No GDP error found and no incident has been raised' },
        { date: '15/11/2025', status: 'No GDP error found and no incident has been raised' },
        { date: '29/11/2025', status: 'No GDP error found and no incidents were raised related to GDP' },
        { date: '15/12/2025', status: 'No GDP error found and no incident has been raised' }
      ]
    }
  ];
  const qi4Data = [
    { site: 'Site I', value: 12, target: 100 },
    { site: 'Site III', value: 10, target: 100 },
    { site: 'Site V', value: 8, target: 100 }
  ];

  const qiDataMap = {
    0: qi1Data,
    1: qi2Data,
    2: qi3Data,
    3: qi4Data
  };

  // QI Data for Objective 07
  const obj07_qi1Data = [
    { 
      site: 'Site I', 
      value: 100, 
      target: 100,
      trainingNeedIdentification: 100,
      trainingCalendar: 100
    },
    { 
      site: 'Site III', 
      value: 100, 
      target: 100,
      trainingNeedIdentification: 100,
      trainingCalendar: 100
    },
    { 
      site: 'Site V', 
      value: 100, 
      target: 100,
      trainingNeedIdentification: 100,
      trainingCalendar: 100
    }
  ];
  const obj07_qi2Data = [
    { 
      site: 'Site I', 
      value: 100, 
      target: 100,
      trainingCompletion: 95,
      evaluation100: 92,
      retrainingEvaluation: 100
    },
    { 
      site: 'Site III', 
      value: 100, 
      target: 100,
      trainingCompletion: 90,
      evaluation100: 90,
      retrainingEvaluation: 100
    },
    { 
      site: 'Site V', 
      value: 100, 
      target: 100,
      trainingCompletion: 88,
      evaluation100: 85,
      retrainingEvaluation: 100
    }
  ];
  const obj07_qi3Data = [
    { 
      site: 'Site I', 
      value: 50, 
      target: 100,
      errorDecrease: 55,
      staffInvolvement: 58
    },
    { 
      site: 'Site III', 
      value: 50, 
      target: 100,
      errorDecrease: 50,
      staffInvolvement: 55
    },
    { 
      site: 'Site V', 
      value: 50, 
      target: 100,
      errorDecrease: 48,
      staffInvolvement: 52
    }
  ];
  const obj07_qi4Data = [
    { site: 'Site I', value: 10, target: 100 },
    { site: 'Site III', value: 10, target: 100 },
    { site: 'Site V', value: 10, target: 100 }
  ];

  const obj07_qiDataMap = {
    0: obj07_qi1Data,
    1: obj07_qi2Data,
    2: obj07_qi3Data,
    3: obj07_qi4Data
  };

  const objective4Flow = [
    { id: 'qi1', label: 'Gap analysis', color: '#f59e0b' },
    { id: 'qi2', label: 'Implementation', color: '#3b82f6' },
    { id: 'qi3', label: 'Verification & effectiveness', color: '#10b981' },
    { id: 'qi4', label: 'Data need to add', color: '#ec4899' }
  ];

  const objective7Flow = [
    { id: 'qi1', label: 'Gap analysis', color: '#f59e0b' },
    { id: 'qi2', label: 'Implementation', color: '#3b82f6' },
    { id: 'qi3', label: 'Skill Advancement', color: '#10b981' },
    { id: 'qi4', label: 'Data need to add', color: '#ec4899' }
  ];

  const kpiCards = [
    {
      id: '04',
      title: '',
      metrics: []
    },
    {
      id: '07',
      title: '',
      metrics: []
    }
  ];

  const renderQIButton = (qiItem, index, objective) => {
    const isActive = objective === '04' ? activeQI === index : activeQI07 === index;
    const baseWidth = 250;
    const baseHeight = 110;
    const clipPathValue = 'polygon(0 0, calc(100% - 32px) 0, 100% 50%, calc(100% - 32px) 100%, 0 100%, 28px 50%)';
    
    return (
      <div
        key={qiItem.id}
        onClick={() => handleQIClick(index, objective)}
        style={{
          width: `${baseWidth}px`,
          height: `${baseHeight}px`,
          background: isActive ? qiItem.color : `${qiItem.color}20`,
          clipPath: clipPathValue,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          color: isActive ? '#ffffff' : qiItem.color,
          transition: 'all 200ms ease',
          transform: isActive ? 'scale(1.1)' : 'scale(1)',
          marginRight: index < 3 ? '-8px' : '0',
          zIndex: isActive ? 10 : 5 - index,
          animation: `slideIn 0.4s ease-out ${0.4 + (index * 0.15)}s both`,
          padding: '0 20px',
          gap: '4px'
        }}
      >
        <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.5px' }}>
          QI {index + 1}
        </div>
        <div style={{ fontSize: '1.15rem', fontWeight: 600, textAlign: 'center', lineHeight: '1.3' }}>
          {qiItem.label}
        </div>
      </div>
    );
  };

  const renderSiteCards = (data, colors) => {
    // Check data types
    const isQI1 = data[0]?.totalEmployees !== undefined;
    const isQI2 = data[0]?.trainedLatestSOP !== undefined;
    const isQI3 = data[0]?.biweeklyChecks !== undefined;
    const isObj07QI1 = data[0]?.trainingNeedIdentification !== undefined;
    const isObj07QI2 = data[0]?.trainingCompletion !== undefined;
    const isObj07QI3 = data[0]?.errorDecrease !== undefined;

    if (isQI1) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px' }}>
          {data.map((item, idx) => {
            const trainingCategories = [
              { label: 'No Training', value: item.noTraining, color: '#ef4444' },
              { label: 'Old Revision', value: item.trainedOldRevision, color: '#f59e0b' },
              { label: 'Latest Revision', value: item.trainedLatestRevision, color: '#10b981' }
            ];
            
            return (
              <div key={idx} style={{
                padding: '24px',
                background: `linear-gradient(135deg, ${colors.primary}08 0%, #ffffff 100%)`,
                borderRadius: '16px',
                border: `2px solid ${colors.primary}30`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                {/* Site Header */}
                <div style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 800, 
                  color: colors.primary, 
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: `2px solid ${colors.primary}20`
                }}>
                  {item.site}
                </div>

                {/* Total Employees Badge */}
                <div style={{ 
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: `${colors.primary}15`,
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 600 }}>Total Employees: </span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: colors.primary }}>{item.totalEmployees}</span>
                </div>

                {/* Training Status Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {trainingCategories.map((category, catIdx) => {
                    const percentage = ((category.value / item.totalEmployees) * 100).toFixed(1);
                    return (
                      <div key={catIdx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                            {category.label}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: category.color }}>
                              {category.value}
                            </span>
                            <span style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 600 }}>
                              ({percentage}%)
                            </span>
                          </div>
                        </div>
                        <div style={{
                          height: '12px',
                          background: '#e2e8f0',
                          borderRadius: '999px',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${percentage}%`,
                            background: `linear-gradient(90deg, ${category.color} 0%, ${category.color}dd 100%)`,
                            borderRadius: '999px',
                            transition: 'width 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: `0 0 8px ${category.color}40`
                          }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Completion Rate Circle */}
                <div style={{ 
                  marginTop: '20px', 
                  paddingTop: '20px', 
                  borderTop: `1px solid ${colors.primary}20`,
                  textAlign: 'center' 
                }}>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>
                    Latest Revision Coverage
                  </div>
                  <div style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: `conic-gradient(${colors.primary} ${(item.trainedLatestRevision / item.totalEmployees) * 360}deg, #e2e8f0 0deg)`,
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}>
                      <span style={{ fontSize: '1.6rem', fontWeight: 800, color: colors.primary }}>
                        {((item.trainedLatestRevision / item.totalEmployees) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (isQI2) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px' }}>
          {data.map((item, idx) => {
            const implementationStages = [
              { label: 'Trained on Latest SOP', value: item.trainedLatestSOP, icon: '📚', color: '#3b82f6' },
              { label: 'Evaluation >80% Passed', value: item.evaluationPassed80, icon: '✓', color: '#10b981' },
              { label: 'Retraining Provided', value: item.retrainingProvided, icon: '🔄', color: '#f59e0b' },
              { label: 'Evaluation 100% Passed', value: item.evaluation100Passed, icon: '✓✓', color: '#059669' }
            ];

            const successRate = ((item.evaluation100Passed / item.trainedLatestSOP) * 100).toFixed(0);
            
            return (
              <div key={idx} style={{
                padding: '24px',
                background: `linear-gradient(135deg, ${colors.primary}08 0%, #ffffff 100%)`,
                borderRadius: '16px',
                border: `2px solid ${colors.primary}30`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                {/* Site Header */}
                <div style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 800, 
                  color: colors.primary, 
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: `2px solid ${colors.primary}20`
                }}>
                  {item.site}
                </div>

                {/* Implementation Flow */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {implementationStages.map((stage, stageIdx) => (
                    <div key={stageIdx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '14px 16px',
                      background: `${stage.color}10`,
                      borderRadius: '10px',
                      border: `1px solid ${stage.color}30`,
                      transition: 'transform 200ms ease',
                      cursor: 'default'
                    }}>
                      <div style={{ 
                        fontSize: '1.5rem', 
                        marginRight: '12px',
                        width: '32px',
                        textAlign: 'center'
                      }}>
                        {stage.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 600, marginBottom: '2px' }}>
                          {stage.label}
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: stage.color }}>
                          {stage.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Success Rate Badge */}
                <div style={{ 
                  padding: '16px',
                  background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.primary}05 100%)`,
                  borderRadius: '12px',
                  border: `2px solid ${colors.primary}30`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>
                    Implementation Success Rate
                  </div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: colors.primary }}>
                    {successRate}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (isQI3) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px' }}>
          {data.map((item, idx) => {
            return (
              <div key={idx} style={{
                padding: '24px',
                background: `linear-gradient(135deg, ${colors.primary}08 0%, #ffffff 100%)`,
                borderRadius: '16px',
                border: `2px solid ${colors.primary}30`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                {/* Site Header */}
                <div style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 800, 
                  color: colors.primary, 
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: `2px solid ${colors.primary}20`,
                  textAlign: 'center'
                }}>
                  {item.site}
                </div>

                {/* Biweekly Checks Title */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: '20px',
                  padding: '10px',
                  background: `${colors.primary}15`,
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: colors.primary }}>
                    📅 Biweekly Verification Checks
                  </div>
                </div>

                {/* Timeline of Checks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {item.biweeklyChecks.map((check, checkIdx) => (
                    <div key={checkIdx} style={{
                      position: 'relative',
                      paddingLeft: '32px'
                    }}>
                      {/* Timeline Dot */}
                      <div style={{
                        position: 'absolute',
                        left: '8px',
                        top: '4px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: '#10b981',
                        border: '2px solid #ffffff',
                        boxShadow: '0 0 0 2px #10b981'
                      }}></div>
                      
                      {/* Timeline Line */}
                      {checkIdx < item.biweeklyChecks.length - 1 && (
                        <div style={{
                          position: 'absolute',
                          left: '13px',
                          top: '20px',
                          width: '2px',
                          height: 'calc(100% + 6px)',
                          background: `${colors.primary}20`
                        }}></div>
                      )}

                      {/* Check Content */}
                      <div style={{
                        padding: '12px 14px',
                        background: '#f0fdf4',
                        borderRadius: '10px',
                        border: '1px solid #86efac'
                      }}>
                        <div style={{ 
                          fontSize: '0.95rem', 
                          fontWeight: 700, 
                          color: colors.primary,
                          marginBottom: '4px'
                        }}>
                          {check.date}
                        </div>
                        <div style={{ 
                          fontSize: '0.85rem', 
                          color: '#166534',
                          lineHeight: '1.4',
                          fontWeight: 600
                        }}>
                          ✓ {check.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Badge */}
                <div style={{
                  marginTop: '20px',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '4px', opacity: 0.9 }}>
                    Verification Status
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                    ✓ All Checks Passed
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (isObj07QI1) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px' }}>
          {data.map((item, idx) => (
            <div key={idx} style={{
              padding: '24px',
              background: `linear-gradient(135deg, ${colors.primary}08 0%, #ffffff 100%)`,
              borderRadius: '16px',
              border: `2px solid ${colors.primary}30`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ 
                fontSize: '1.3rem', 
                fontWeight: 800, 
                color: colors.primary, 
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: `2px solid ${colors.primary}20`,
                textAlign: 'center'
              }}>
                {item.site}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  padding: '18px',
                  background: `${colors.primary}10`,
                  borderRadius: '12px',
                  border: `1px solid ${colors.primary}30`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>
                    📋 Training Need Identification
                  </div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: colors.primary }}>
                    {item.trainingNeedIdentification}%
                  </div>
                </div>

                <div style={{
                  padding: '18px',
                  background: `${colors.primary}10`,
                  borderRadius: '12px',
                  border: `1px solid ${colors.primary}30`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>
                    📅 Training Calendar
                  </div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: colors.primary }}>
                    {item.trainingCalendar}%
                  </div>
                </div>
              </div>

              <div style={{
                marginTop: '20px',
                padding: '14px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#ffffff'
              }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '4px', opacity: 0.9 }}>
                  Gap Analysis Status
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  ✓ Completed
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (isObj07QI2) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px' }}>
          {data.map((item, idx) => {
            const metrics = [
              { label: '% Completion of Training', value: item.trainingCompletion, icon: '📚', color: '#3b82f6' },
              { label: '100% Evaluation of All Trainings', value: item.evaluation100, icon: '✓', color: '#10b981' },
              { label: 'Retraining & Evaluation', value: item.retrainingEvaluation, icon: '🔄', color: '#059669' }
            ];

            return (
              <div key={idx} style={{
                padding: '24px',
                background: `linear-gradient(135deg, ${colors.primary}08 0%, #ffffff 100%)`,
                borderRadius: '16px',
                border: `2px solid ${colors.primary}30`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                <div style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 800, 
                  color: colors.primary, 
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: `2px solid ${colors.primary}20`,
                  textAlign: 'center'
                }}>
                  {item.site}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {metrics.map((metric, metricIdx) => (
                    <div key={metricIdx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px',
                      background: `${metric.color}10`,
                      borderRadius: '10px',
                      border: `1px solid ${metric.color}30`
                    }}>
                      <div style={{ fontSize: '1.8rem', marginRight: '14px' }}>
                        {metric.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>
                          {metric.label}
                        </div>
                        <div style={{ fontSize: '1.7rem', fontWeight: 800, color: metric.color }}>
                          {metric.value}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (isObj07QI3) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px' }}>
          {data.map((item, idx) => (
            <div key={idx} style={{
              padding: '24px',
              background: `linear-gradient(135deg, ${colors.primary}08 0%, #ffffff 100%)`,
              borderRadius: '16px',
              border: `2px solid ${colors.primary}30`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ 
                fontSize: '1.3rem', 
                fontWeight: 800, 
                color: colors.primary, 
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: `2px solid ${colors.primary}20`,
                textAlign: 'center'
              }}>
                {item.site}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Error Decrease */}
                <div style={{
                  padding: '20px',
                  background: 'linear-gradient(135deg, #ef444410 0%, #ffffff 100%)',
                  borderRadius: '12px',
                  border: '2px solid #ef444420'
                }}>
                  <div style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
                    📉 Decrease in QA Process Errors
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <div style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      background: `conic-gradient(#ef4444 ${item.errorDecrease * 3.6}deg, #e2e8f0 0deg)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.7rem',
                        fontWeight: 800,
                        color: '#ef4444'
                      }}>
                        {item.errorDecrease}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Staff Involvement */}
                <div style={{
                  padding: '20px',
                  background: 'linear-gradient(135deg, #10b98110 0%, #ffffff 100%)',
                  borderRadius: '12px',
                  border: '2px solid #10b98120'
                }}>
                  <div style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
                    👥 QA Staff Involved in QMS, IPQA, Lab QA
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <div style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      background: `conic-gradient(#10b981 ${item.staffInvolvement * 3.6}deg, #e2e8f0 0deg)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.7rem',
                        fontWeight: 800,
                        color: '#10b981'
                      }}>
                        {item.staffInvolvement}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Default card view for other QIs
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '24px' }}>
        {data.map((item, idx) => (
          <div key={idx} style={{
            padding: '20px',
            background: `${colors.primary}08`,
            borderRadius: '12px',
            border: `1px solid ${colors.primary}20`
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
              {item.site}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Performance</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: colors.primary }}>{item.value}%</span>
            </div>
            <div style={{
              height: '8px',
              background: `${colors.light}`,
              borderRadius: '999px',
              overflow: 'hidden',
              border: `1px solid ${colors.primary}20`
            }}>
              <div style={{
                height: '100%',
                width: `${item.value}%`,
                background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                transition: 'width 600ms ease'
              }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section style={{ padding: '40px 24px', minHeight: '100vh', background: '#ffffff' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <header style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '0.9em', color: '#ef4444', fontWeight: 700, letterSpacing: '0.05em' }}>QUALITY OBJECTIVES - 2025</div>
          <div style={{ height: '3px', width: '80px', background: '#ef4444', marginTop: '8px', marginBottom: '8px', borderRadius: '2px' }}></div>
          <div style={{ marginTop: '4px', fontSize: '0.8em', color: '#94a3b8', fontWeight: 600 }}>Click a KPI card to expand its flow.</div>
        </header>

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>

        {/* Two-Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '48px', marginBottom: '24px', alignItems: 'start' }}>
          {/* Left Column - KPI Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {kpiCards.map((card, cardIdx) => {
              const cardColors = cardIdx === 0
                ? { primary: '#667eea', accent: '#764ba2', light: '#f3f0ff' }
                : { primary: '#059669', accent: '#047857', light: '#ecfdf5' };

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  style={{
                    width: '280px',
                    padding: '24px',
                    borderRadius: '20px',
                    border: activeCard === card.id ? `3px solid ${cardColors.primary}` : '3px solid transparent',
                    background: activeCard === card.id 
                      ? `linear-gradient(135deg, ${cardColors.primary} 0%, ${cardColors.accent} 100%)`
                      : `linear-gradient(135deg, ${cardColors.light} 0%, #ffffff 100%)`,
                    boxShadow: activeCard === card.id 
                      ? `0 20px 40px ${cardColors.primary}50, 0 0 0 4px ${cardColors.primary}15` 
                      : '0 8px 20px rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: activeCard === card.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Active Indicator */}
                  {activeCard === card.id && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      animation: 'slideIn 0.3s ease-out'
                    }}>
                      ✓
                    </div>
                  )}

                  {/* Header */}
                  <div>
                    <div style={{
                      background: activeCard === card.id ? 'rgba(255, 255, 255, 0.25)' : `${cardColors.primary}20`,
                      color: activeCard === card.id ? '#ffffff' : cardColors.primary,
                      borderRadius: '999px',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      marginBottom: '8px',
                      padding: '8px 16px',
                      display: 'inline-block',
                      letterSpacing: '0.5px'
                    }}>
                      OBJECTIVE {card.id}
                    </div>
                    {card.title && (
                      <div style={{ fontSize: '0.95em', fontWeight: 700, color: activeCard === card.id ? '#ffffff' : '#0f172a', lineHeight: 1.3 }}>
                        {card.title}
                      </div>
                    )}
                  </div>

                  {/* Metrics */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {card.metrics.map((metric) => {
                      const parts = metric.split(' ');
                      const label = parts[0];
                      const percentage = parseInt(parts[1]);

                      return (
                        <div key={metric}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: activeCard === card.id ? '#ffffff' : '#0f172a' }}>
                              {label}
                            </span>
                            <span style={{ 
                              fontSize: '1rem', 
                              fontWeight: 800, 
                              color: activeCard === card.id ? '#ffffff' : cardColors.primary,
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: activeCard === card.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                            }}>
                              {percentage}%
                            </span>
                          </div>
                          <div style={{
                            height: '10px',
                            background: activeCard === card.id ? 'rgba(255, 255, 255, 0.2)' : `${cardColors.primary}15`,
                            borderRadius: '999px',
                            overflow: 'hidden',
                            border: activeCard === card.id ? '1px solid rgba(255, 255, 255, 0.3)' : `1px solid ${cardColors.primary}20`,
                            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
                          }}>
                            <div style={{
                              height: '100%',
                              width: `${percentage}%`,
                              background: activeCard === card.id 
                                ? 'linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0.85) 100%)'
                                : `linear-gradient(90deg, ${cardColors.primary} 0%, ${cardColors.accent} 100%)`,
                              transition: 'width 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                              boxShadow: activeCard === card.id ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none'
                            }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Objective 04 Site Snapshot */}
                  {card.id === '04' && (
                    <div style={{ 
                      marginTop: '4px', 
                      padding: '12px', 
                      background: activeCard === card.id ? 'rgba(255, 255, 255, 0.15)' : `${cardColors.primary}0d`, 
                      borderRadius: '12px', 
                      border: activeCard === card.id ? '1px solid rgba(255, 255, 255, 0.3)' : `1px solid ${cardColors.primary}26`,
                      display: 'grid', 
                      gap: '8px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      {[
                        { site: 'Site I', qi1: 100, qi2: 100, qi3: 50, qi4: 10 },
                        { site: 'Site III', qi1: 100, qi2: 100, qi3: 50, qi4: 10 },
                        { site: 'Site V', qi1: 100, qi2: 100, qi3: 50, qi4: 10 }
                      ].map((row) => (
                        <div key={row.site} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          fontSize: '0.8rem', 
                          color: activeCard === card.id ? '#ffffff' : '#0f172a', 
                          fontWeight: 600,
                          padding: '4px 0'
                        }}>
                          <span style={{ minWidth: '70px', fontWeight: 700 }}>{row.site}</span>
                          <span style={{ color: activeCard === card.id ? 'rgba(255, 255, 255, 0.9)' : cardColors.primary }}>QI1 {row.qi1}%</span>
                          <span style={{ color: activeCard === card.id ? 'rgba(255, 255, 255, 0.9)' : cardColors.primary }}>QI2 {row.qi2}%</span>
                          <span style={{ color: activeCard === card.id ? 'rgba(255, 255, 255, 0.9)' : cardColors.primary }}>QI3 {row.qi3}%</span>
                          <span style={{ color: activeCard === card.id ? 'rgba(255, 255, 255, 0.9)' : cardColors.primary }}>QI4 {row.qi4}%</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Objective 07 Site Snapshot */}
                  {card.id === '07' && (
                    <div style={{ 
                      marginTop: '4px', 
                      padding: '12px', 
                      background: activeCard === card.id ? 'rgba(255, 255, 255, 0.15)' : `${cardColors.primary}0d`, 
                      borderRadius: '12px', 
                      border: activeCard === card.id ? '1px solid rgba(255, 255, 255, 0.3)' : `1px solid ${cardColors.primary}26`,
                      display: 'grid', 
                      gap: '8px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      {[
                        { site: 'Site I', qi1: 100, qi2: 100, qi3: 50, qi4: 10 },
                        { site: 'Site III', qi1: 100, qi2: 100, qi3: 50, qi4: 10 },
                        { site: 'Site V', qi1: 100, qi2: 100, qi3: 50, qi4: 10 }
                      ].map((row) => (
                        <div key={row.site} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          fontSize: '0.8rem', 
                          color: activeCard === card.id ? '#ffffff' : '#0f172a', 
                          fontWeight: 600,
                          padding: '4px 0'
                        }}>
                          <span style={{ minWidth: '70px', fontWeight: 700 }}>{row.site}</span>
                          <span style={{ color: activeCard === card.id ? 'rgba(255, 255, 255, 0.9)' : cardColors.primary }}>QI1 {row.qi1}%</span>
                          <span style={{ color: activeCard === card.id ? 'rgba(255, 255, 255, 0.9)' : cardColors.primary }}>QI2 {row.qi2}%</span>
                          <span style={{ color: activeCard === card.id ? 'rgba(255, 255, 255, 0.9)' : cardColors.primary }}>QI3 {row.qi3}%</span>
                          <span style={{ color: activeCard === card.id ? 'rgba(255, 255, 255, 0.9)' : cardColors.primary }}>QI4 {row.qi4}%</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Status Indicator */}
                  <div style={{
                    paddingTop: '12px',
                    borderTop: `1px solid ${cardColors.primary}20`,
                    fontSize: '0.8rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}>
                    Click to expand details
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column - Details Content */}
          <div style={{ flex: 1, minWidth: '0', padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
            {!activeCard ? (
              <div style={{ textAlign: 'center', padding: '60px 24px', color: '#64748b' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👆</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  Select a KPI Card
                </h4>
                <p>Click on Objective 04 or 07 to view details</p>
              </div>
            ) : activeCard === '04' ? (
              <>
                <div style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  padding: '24px', 
                  borderRadius: '12px', 
                  marginBottom: '24px',
                  animation: 'slideIn 0.4s ease-out 0s both'
                }}>
                  <div style={{ color: '#ffffff', fontSize: '1.45rem', fontWeight: 800 }}>Objective 04</div>
                  <div style={{ color: '#ffffff', opacity: 0.9, marginTop: '6px', fontSize: '2.1rem', fontWeight: 600 }}>
                    Reduce Good Documentation Practices (GDP) related Nonconformities and incidents by 50%
                  </div>
                </div>

                {/* QI Buttons */}
                <div key="qi-buttons-04" style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {objective4Flow.map((qiItem, index) => renderQIButton(qiItem, index, '04'))}
                </div>

                {/* Site Data Cards */}
                {activeQI !== null && (
                  <div style={{ animation: 'slideIn 0.4s ease-out' }}>
                    {renderSiteCards(qiDataMap[activeQI], { primary: '#667eea', accent: '#764ba2', light: '#f3f0ff' })}
                  </div>
                )}
              </>
            ) : activeCard === '07' ? (
              <>
                <div style={{ 
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', 
                  padding: '24px', 
                  borderRadius: '12px', 
                  marginBottom: '24px',
                  animation: 'slideIn 0.4s ease-out 0s both'
                }}>
                  <div style={{ color: '#ffffff', fontSize: '1.45rem', fontWeight: 800 }}>Objective 07</div>
                  <div style={{ color: '#ffffff', opacity: 0.9, marginTop: '6px', fontSize: '2.1rem', fontWeight: 600 }}>
                    Enhance the competency autonomy and engagement of QA staff to improve overall quality system performance and compliance
                  </div>
                </div>

                {/* QI Buttons */}
                <div key="qi-buttons-07" style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {objective7Flow.map((qiItem, index) => renderQIButton(qiItem, index, '07'))}
                </div>

                {/* Site Data Cards */}
                {activeQI07 !== null && (
                  <div style={{ animation: 'slideIn 0.4s ease-out' }}>
                    {renderSiteCards(obj07_qiDataMap[activeQI07], { primary: '#059669', accent: '#047857', light: '#ecfdf5' })}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
