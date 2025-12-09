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

  const qi4Data = [];

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
  const obj07_qi4Data = [];

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
    const baseWidth = 260;
    const baseHeight = 110;
    const clipPathValue = 'polygon(0 0, calc(100% - 40px) 0, 100% 50%, calc(100% - 40px) 100%, 0 100%, 35px 50%)';
    
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
          zIndex: isActive ? 10 : 5 - index,
          animation: `slideIn 0.4s ease-out ${0.4 + (index * 0.15)}s both`,
          padding: '8px 14px',
          gap: '4px',
          overflow: 'hidden'
        }}
      >
        <div style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '0.5px', minWidth: '55px', textAlign: 'center', marginBottom: '6px' }}>
          QI {index + 1}
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: 600, textAlign: 'center', lineHeight: '1.2', flex: 1, wordBreak: 'break-word' }}>
          {qiItem.label}
        </div>
      </div>
    );
  };

  const renderSiteCards = (data, colors) => {
    if (!data || data.length === 0) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: '#475569', fontWeight: 600 }}>
          Data need to be added.
        </div>
      );
    }

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
                  padding: '10px 18px',
                  background: `${colors.primary}15`,
                  borderRadius: '10px',
                  marginBottom: '22px'
                }}>
                  <span style={{ fontSize: '1.15rem', color: '#64748b', fontWeight: 600 }}>Total Employees: </span>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: colors.primary }}>{item.totalEmployees}</span>
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
    <section style={{ padding: '60px 24px', minHeight: '100vh', background: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', boxSizing: 'border-box', overflowY: 'auto', overflowX: 'hidden' }}>
      <div style={{ maxWidth: '1150px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
        {/* Header */}
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9em', color: '#ef4444', fontWeight: 700, letterSpacing: '0.05em' }}>QUALITY OBJECTIVES - 2025</div>
          <div style={{ height: '3px', width: '60px', background: '#ef4444', marginTop: '8px', marginBottom: '14px', borderRadius: '999px', margin: '8px auto 14px' }}></div>
        </header>

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>

        {/* 4-Card Grid - Centered */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(240px, 1fr))', gap: '18px', margin: '0 auto 48px', justifyContent: 'center', justifyItems: 'stretch', maxWidth: '1440px', width: '100%' }}>
          {[
            {
              id: '04',
              title: 'Reduce Good Documentation Practices (GDP) related Nonconformities',
              subtitle: '',
              description: '',
              color: '#667eea',
              bgColor: '#f3f0ff'
            },
            {
              id: '05',
              title: '',
              subtitle: '',
              description: '',
              color: '#059669',
              bgColor: '#ecfdf5'
            },
            {
              id: '07',
              title: '',
              subtitle: '',
              description: '',
              color: '#f59e0b',
              bgColor: '#fffbeb'
            },
            {
              id: 'EQ',
              title: '',
              subtitle: '',
              description: '',
              color: '#0ea5e9',
              bgColor: '#e0f2fe'
            }
          ].map((card, idx) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              style={{
                padding: '28px',
                borderRadius: '18px',
                border: activeCard === card.id ? `2px solid ${card.color}` : '1.5px solid #e2e8f0',
                background: activeCard === card.id 
                  ? `linear-gradient(145deg, ${card.color} 0%, ${card.color}d0 100%)`
                  : `linear-gradient(145deg, ${card.bgColor} 0%, #ffffff 100%)`,
                boxShadow: activeCard === card.id 
                  ? `0 14px 36px ${card.color}30`
                  : '0 10px 26px rgba(15, 23, 42, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: activeCard === card.id ? 'translateY(-8px)' : 'translateY(0)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                animation: `slideIn 0.5s ease-out ${idx * 0.1}s both`,
                aspectRatio: '1 / 1',
                minHeight: '380px',
                height: '100%'
              }}
            >
              {/* Active Indicator */}
              {activeCard === card.id && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  animation: 'pulse 0.6s ease-in-out',
                  zIndex: 2
                }}>
                  ✓
                </div>
              )}

              {/* Title Section */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                {['04', '05', '07', 'EQ'].includes(card.id) && (
                  <div style={{
                    alignSelf: 'center',
                    padding: '8px 14px',
                    borderRadius: '14px',
                    fontSize: '0.85em',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    color: '#0f172a',
                    background: activeCard === card.id 
                      ? 'rgba(255, 255, 255, 0.35)' 
                      : `linear-gradient(135deg, ${card.color}18 0%, ${card.color}28 100%)`,
                    border: activeCard === card.id 
                      ? '1px solid rgba(15, 23, 42, 0.25)' 
                      : `1px solid ${card.color}30`,
                    boxShadow: activeCard === card.id 
                      ? '0 6px 16px rgba(0,0,0,0.12)' 
                      : '0 4px 12px rgba(0,0,0,0.08)',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                  }}>
                    {card.id === 'EQ' ? 'E-QMS' : `Objective ${card.id}`}
                  </div>
                )}
              </div>

              {/* Description */}
              <div style={{
                fontSize: '0.92em',
                color: activeCard === card.id ? 'rgba(255, 255, 255, 0.95)' : '#475569',
                fontWeight: '500',
                lineHeight: '1.55',
                position: 'relative',
                zIndex: 1
              }}>
                {card.description}
              </div>

              {/* CTA */}
              <div style={{ display: 'none' }}></div>
            </div>
          ))}
        </div>

        {/* Hint Text */}
        <div style={{ textAlign: 'center', marginTop: '32px', animation: 'slideIn 0.6s ease-out 0.5s both' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>
            💡 Click a card to open the data
          </div>
          <div style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 500 }}>
            Select an Objective to view detailed QI flow and site-wise metrics
          </div>
        </div>
        {/* Full Screen Modal/Details Section */}
        {activeCard && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#ffffff',
            zIndex: 9999,
            padding: '80px 40px 40px',
            animation: 'slideIn 0.4s ease-out',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setActiveCard(null)}
              style={{
                position: 'fixed',
                top: '24px',
                right: '24px',
                background: '#ef4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                fontSize: '1.5em',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                zIndex: 10000
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
              }}
            >
              ×
            </button>

            {/* Content Container */}
            <div style={{
              maxWidth: '1200px',
              width: '100%',
              margin: '0 auto'
            }}>

            {/* Modal Header */}
            {activeCard === '04' && (
              <>
                <div style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  padding: '28px', 
                  borderRadius: '12px', 
                  marginBottom: '24px',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.4 }}>Objective 04</div>
                  <div style={{ fontSize: '1.15em', fontWeight: 800, marginTop: '6px', lineHeight: 1.45 }}>
                    Reduce Good Documentation Practices (GDP) related Nonconformities and incidents by 50%
                  </div>
                </div>

                {/* QI Buttons */}
                <div style={{ display: 'flex', gap: '14px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {objective4Flow.map((qiItem, index) => renderQIButton(qiItem, index, '04'))}
                </div>

                {/* Site Data Cards */}
                {activeQI !== null ? (
                  <div style={{ animation: 'slideIn 0.4s ease-out' }}>
                    {renderSiteCards(qiDataMap[activeQI], { primary: '#667eea', accent: '#764ba2', light: '#f3f0ff' })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#475569', padding: '8px 0' }}>Select a QI to view site-wise details.</div>
                )}
              </>
            )}

            {activeCard === '05' && (
              <>
                <div style={{ 
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', 
                  padding: '28px', 
                  borderRadius: '12px', 
                  marginBottom: '24px',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.4 }}>Objective 05</div>
                  <div style={{ fontSize: '1.15em', fontWeight: 800, marginTop: '6px', lineHeight: 1.45 }}>
                    Details to be added
                  </div>
                </div>
                <div style={{ color: '#475569', fontSize: '0.95em', textAlign: 'center' }}>Data to be added.</div>
              </>
            )}

            {activeCard === '07' && (
              <>
                <div style={{ 
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
                  padding: '28px', 
                  borderRadius: '12px', 
                  marginBottom: '24px',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.4 }}>Objective 07</div>
                  <div style={{ fontSize: '1.15em', fontWeight: 800, marginTop: '6px', lineHeight: 1.45 }}>
                    Enhance the competency autonomy and engagement of QA staff to improve overall quality system performance and compliance
                  </div>
                </div>

                {/* QI Buttons */}
                <div style={{ display: 'flex', gap: '14px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {objective7Flow.map((qiItem, index) => renderQIButton(qiItem, index, '07'))}
                </div>

                {/* Site Data Cards */}
                {activeQI07 !== null ? (
                  <div style={{ animation: 'slideIn 0.4s ease-out' }}>
                    {renderSiteCards(obj07_qiDataMap[activeQI07], { primary: '#f59e0b', accent: '#d97706', light: '#fff7ed' })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#475569', padding: '8px 0' }}>Select a QI to view site-wise details.</div>
                )}
              </>
            )}

            {activeCard === 'EQ' && (
              <>
                <div style={{ 
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', 
                  padding: '28px', 
                  borderRadius: '12px', 
                  marginBottom: '24px',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.4 }}>E-QMS</div>
                  <div style={{ fontSize: '1.15em', fontWeight: 800, marginTop: '6px', lineHeight: 1.45 }}>
                    Data to be added
                  </div>
                </div>
                <div style={{ color: '#475569', fontSize: '0.95em', textAlign: 'center' }}>Data to be added.</div>
              </>
            )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

