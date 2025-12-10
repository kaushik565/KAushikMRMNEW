import React, { useState, useEffect } from 'react';
import FullScreenChartModal from '../../components/FullScreenChartModal';

const styles = `
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
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default function QualityObjectives() {
  const [activeModals, setActiveModals] = useState({
    card: null,
    qi04: null,
    qi05: null,
    qi06: null,
    qi07: null
  });
  const [hoveredCard, setHoveredCard] = useState(null);

  // Close all modals when slide changes
  useEffect(() => {
    const handleCloseModals = () => {
      setActiveModals({
        card: null,
        qi04: null,
        qi05: null,
        qi06: null,
        qi07: null
      });
    };

    window.addEventListener('closeAllModals', handleCloseModals);
    return () => {
      window.removeEventListener('closeAllModals', handleCloseModals);
    };
  }, []);

  const handleCardClick = (cardId) => {
    setActiveModals({
      card: activeModals.card === cardId ? null : cardId,
      qi04: null,
      qi05: null,
      qi06: null,
      qi07: null
    });
  };

  const handleQIClick = (qiIndex, objective) => {
    const key = `qi${objective}`;
    setActiveModals(prev => ({
      ...prev,
      [key]: prev[key] === qiIndex ? null : qiIndex
    }));
  };

  // QI Data for Objective 04
  const qi1Data = [
    { 
      site: 'Site I', 
      value: 100, 
      target: 100,
      totalEmployees: 191,
      noTraining: 99,
      trainedOldRevision: 0,
      trainedLatestRevision: 92
    },
    { 
      site: 'Site III', 
      value: 100, 
      target: 100,
      totalEmployees: 103,
      noTraining: 30,
      trainedOldRevision: 0,
      trainedLatestRevision: 73
    },
    { 
      site: 'Site V', 
      value: 100, 
      target: 100,
      totalEmployees: 280,
      noTraining: 73,
      trainedOldRevision: 0,
      trainedLatestRevision: 207
    }
  ];

  const qi2Data = [
    { 
      site: 'Site I', 
      value: 100, 
      target: 100,
      trainedLatestSOP: 176,
      evaluationPassed80: 134,
      retrainingProvided: 31,
      evaluation100Passed: 29
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
      trainedLatestSOP: 271,
      evaluationPassed80: 230,
      retrainingProvided: 41,
      evaluation100Passed: 271
    }
  ];

  const qi3Data = [
    { 
      site: 'Site I', 
      value: 60, 
      target: 100,
      biweeklyChecks: [
        { date: 'Data', status: 'No data available' }
      ]
    },
    { 
      site: 'Site III', 
      value: 50, 
      target: 100,
      biweeklyChecks: [
        { date: '31/10/2025', status: 'No GDP error found and no incident has been raised' },
        { date: '15/11/2025', status: 'No GDP error found and no incident has been raised' },
        { date: '29/11/2025', status: 'No GDP error found and no incident has been raised' },
        { date: '15/12/2025', status: 'Need to check' }
      ]
    },
    { 
      site: 'Site V', 
      value: 40, 
      target: 100,
      biweeklyChecks: [
        { date: '14/11/2025', status: '08 Incidents related to GDP were initiated' },
        { date: '05/12/2025', status: '03 Incidents related to GDP were initiated' }
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

  // QI Data for Objective 05
  const obj05_qi1Data = [
    { 
      site: 'Site I', 
      value: 100, 
      target: 100,
      identificationOfRiskCauseMoreDefects: 100,
      listOfActivitiesBasedOnCriticalProcess: 100
    },
    { 
      site: 'Site III', 
      value: 100, 
      target: 100,
      identificationOfRiskCauseMoreDefects: 100,
      listOfActivitiesBasedOnCriticalProcess: 100
    },
    { 
      site: 'Site V', 
      value: 100, 
      target: 100,
      identificationOfRiskCauseMoreDefects: 100,
      listOfActivitiesBasedOnCriticalProcess: 100
    }
  ];

  const obj05_qi2Data = [
    { 
      site: 'Site I', 
      value: 50, 
      target: 100,
      trainingPlannerAndExecution: 50,
      trainingOfIPQAOnDefectRecognitionAndRCAnalysis: 100,
      evaluationOfPostTraining: 100,
      retrainingOrRefresherTrainingPlanner: 75
    },
    { 
      site: 'Site III', 
      value: 83, 
      target: 100,
      trainingPlannerAndExecution: 50,
      trainingOfIPQAOnDefectRecognitionAndRCAnalysis: 100,
      evaluationOfPostTraining: 100,
      retrainingOrRefresherTrainingPlanner: 50
    },
    { 
      site: 'Site V', 
      value: 50, 
      target: 100,
      trainingPlannerAndExecution: 50,
      trainingOfIPQAOnDefectRecognitionAndRCAnalysis: 100,
      evaluationOfPostTraining: 100,
      retrainingOrRefresherTrainingPlanner: 75
    }
  ];

  const obj05_qi3Data = [
    { 
      site: 'Site I', 
      value: 92, 
      target: 100,
      verificationFrequencyIncreased: 100,
      stringentMonitoring: 75,
      realtimeContainmentAndRootCauseAnalysisBeforeBatchContinuation: 100
    },
    { 
      site: 'Site III', 
      value: 92, 
      target: 100,
      verificationFrequencyIncreased: 100,
      stringentMonitoring: 75,
      realtimeContainmentAndRootCauseAnalysisBeforeBatchContinuation: 100
    },
    { 
      site: 'Site V', 
      value: 85, 
      target: 100,
      verificationFrequencyIncreased: 100,
      stringentMonitoring: 75,
      realtimeContainmentAndRootCauseAnalysisBeforeBatchContinuation: 100
    }
  ];

  const obj05_qi4Data = [
    { 
      site: 'Site I', 
      value: 50, 
      target: 100,
      percentageIncreaseInProactiveIdentification: 50,
      percentageReductionInInProcessAndFinishedGoodsDefectRate: 50,
      percentageReductionInReworkReprocessingRate: 50,
      percentageReductionInAvgTimeToCloseInvestigationsAndCAPA: 72
    },
    { 
      site: 'Site III', 
      value: 58, 
      target: 100,
      percentageIncreaseInProactiveIdentification: 50,
      percentageReductionInInProcessAndFinishedGoodsDefectRate: 50,
      percentageReductionInReworkReprocessingRate: 50,
      percentageReductionInAvgTimeToCloseInvestigationsAndCAPA: 72
    },
    { 
      site: 'Site V', 
      value: 50, 
      target: 100,
      percentageIncreaseInProactiveIdentification: 50,
      percentageReductionInInProcessAndFinishedGoodsDefectRate: 50,
      percentageReductionInReworkReprocessingRate: 50,
      percentageReductionInAvgTimeToCloseInvestigationsAndCAPA: 72
    }
  ];

  const obj05_qiDataMap = {
    0: obj05_qi1Data,
    1: obj05_qi2Data,
    2: obj05_qi3Data,
    3: obj05_qi4Data
  };

  const objective5Flow = [
    { id: 'qi1', label: 'Gap assessment', color: '#f59e0b' },
    { id: 'qi2', label: 'Training and evaluation', color: '#3b82f6' },
    { id: 'qi3', label: 'Implementation', color: '#10b981' },
    { id: 'qi4', label: 'Effectiveness', color: '#ec4899' }
  ];

  // QI Data for Objective 06 (Combined across all sites - I, III, IV, V)
  const obj06_qi1Data = [
    { 
      allSites: true,
      sites: 'I, III, IV, V', 
      value: 31, 
      target: 100,
      projectInitiation: 100,
      defineScopeAndObjective: 100,
      crossFunctionalCoreTeamFormation: 100,
      preparationAndApprovalsOfURS: 40,
      timelinessMillestonesApprovalFromProjectLeadAndTopManagement: 0,
      systemConfigurationAndValidation: 0,
      dataMigration: 0,
      trainingAndEvaluation: 0,
      goLive: 0,
      postImplementationReview: 0,
      verifyTheComplianceThroughUserFeedbackInternalExternalAudit: 0
    }
  ];

  const obj06_qi2Data = [
    { 
      allSites: true,
      sites: 'I, III, IV, V', 
      value: 29, 
      target: 100,
      projectInitiation: 100,
      defineScopeAndObjective: 100,
      crossFunctionalCoreTeamFormation: 100,
      preparationAndApprovalsOfURS: 20,
      timelinessMillestonesApprovalFromProjectLeadAndTopManagement: 0,
      systemConfigurationAndValidation: 0,
      dataMigration: 0,
      trainingAndEvaluation: 0,
      goLive: 0,
      postImplementationReview: 0,
      verifyTheComplianceThroughUserFeedbackRightAtFirstTimeBatchRecordAccuracyRate: 0
    }
  ];

  const obj06_qi3Data = [];

  const obj06_qi4Data = [];

  const obj06_qiDataMap = {
    0: obj06_qi1Data,
    1: obj06_qi2Data,
    2: obj06_qi3Data,
    3: obj06_qi4Data
  };

  const objective6Flow = [
    { id: 'qi1', label: 'Electronic Quality Management system (eQMS)', color: '#8b5cf6' },
    { id: 'qi2', label: 'Electronic batch manufacturing records (eBMR)', color: '#06b6d4' },
    { id: 'qi3', label: 'Need to add', color: '#ec4899' },
    { id: 'qi4', label: 'Need to add', color: '#eab308' }
  ];

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
    const key = `qi${objective}`;
    const isActive = activeModals[key] === index;
    const isObj06 = objective === '06';
    const labelFontSize = isObj06 ? '1.15rem' : '1.5rem';
    const labelLineHeight = isObj06 ? '1.3' : '1.2';
    
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
          transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isActive ? 'scale(1.1)' : 'scale(1)',
          zIndex: isActive ? 10 : 5 - index,
          animation: `slideIn 0.4s ease-out ${0.4 + (index * 0.15)}s both`,
          padding: '8px 14px',
          gap: '4px',
          overflow: 'hidden',
          boxShadow: isActive ? `0 8px 24px ${qiItem.color}40` : 'none'
        }}
      >
        <div style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '0.5px', minWidth: '55px', textAlign: 'center', marginBottom: '6px' }}>
          QI {index + 1}
        </div>
        <div style={{ fontSize: labelFontSize, fontWeight: 600, textAlign: 'center', lineHeight: labelLineHeight, flex: 1, wordBreak: 'break-word' }}>
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
    const isObj05QI1 = data[0]?.identificationOfRiskCauseMoreDefects !== undefined;
    const isObj05QI2 = data[0]?.trainingPlannerAndExecution !== undefined;
    const isObj05QI3 = data[0]?.verificationFrequencyIncreased !== undefined;
    const isObj05QI4 = data[0]?.percentageIncreaseInProactiveIdentification !== undefined;
    const isObj06QI1 = data[0]?.verifyTheComplianceThroughUserFeedbackInternalExternalAudit !== undefined && data[0]?.verifyTheComplianceThroughUserFeedbackRightAtFirstTimeBatchRecordAccuracyRate === undefined;
    const isObj06QI2 = data[0]?.verifyTheComplianceThroughUserFeedbackRightAtFirstTimeBatchRecordAccuracyRate !== undefined;
    const isObj07QI1 = data[0]?.trainingNeedIdentification !== undefined;
    const isObj07QI2 = data[0]?.trainingCompletion !== undefined;
    const isObj07QI3 = data[0]?.errorDecrease !== undefined;

    if (isQI1) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px', animation: 'fadeInUp 0.5s ease-out' }}>
          {data.map((item, idx) => {
            const trainingCategories = [
              { label: 'No Training', value: item.noTraining, color: '#ef4444' }
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
                  fontSize: '1.5rem', 
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
                  <span style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 600 }}>Total Employees: </span>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: colors.primary }}>{item.totalEmployees}</span>
                </div>

                {/* Training Status Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {trainingCategories.map((category, catIdx) => {
                    const percentage = ((category.value / item.totalEmployees) * 100).toFixed(1);
                    return (
                      <div key={catIdx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>
                            {category.label}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: category.color }}>
                              {category.value}
                            </span>
                            <span style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 600 }}>
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

              </div>
            );
          })}
        </div>
      );
    }

    if (isQI2) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px', animation: 'fadeInUp 0.5s ease-out' }}>
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
                  fontSize: '1.5rem', 
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
                        <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 600, marginBottom: '2px' }}>
                          {stage.label}
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: stage.color }}>
                          {stage.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Success Rate Badge */}
                <div style={{ 
                  padding: '16px',
                  background: `linear-gradient(135deg, #10b981 0%, #059669 100%)`,
                  borderRadius: '12px',
                  border: `2px solid #10b981`,
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}>
                  <div style={{ fontSize: '1.5rem', color: '#ffffff', fontWeight: 600, marginBottom: '6px' }}>
                    Implementation Success Rate
                  </div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff' }}>
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
            const hasBiweeklyData = item.biweeklyChecks?.some(
              (check) => check.status && check.status.toLowerCase() !== 'no data available'
            );

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
                  fontSize: '1.5rem', 
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
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: colors.primary }}>
                    📅 Biweekly Verification Checks
                  </div>
                </div>

                {hasBiweeklyData ? (
                  <>
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
                                fontSize: '1.5rem', 
                              fontWeight: 700, 
                              color: colors.primary,
                            }}>
                              {check.date}
                            </div>
                            <div style={{ 
                                fontSize: '1.5rem', 
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
                      <div style={{ fontSize: '1.5rem', marginBottom: '4px', opacity: 0.9 }}>
                        Verification Status
                      </div>
                      {item.site === 'Site V' ? (
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                          Initiated 11 incidents
                        </div>
                      ) : (
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                          ✓ All Checks Passed
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div style={{
                    padding: '18px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px dashed #cbd5e1',
                    textAlign: 'center',
                    color: '#475569',
                    fontSize: '1.5rem',
                    fontWeight: 700
                  }}>
                    Data not available yet.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // Objective 06 QI1 & QI2 - Combined for all sites
    if (isObj06QI1 || isObj06QI2) {
      const qiLabel = isObj06QI1 ? 'Electronic Quality Management system (eQMS)' : 'Electronic batch manufacturing records (eBMR)';
      const qiIcon = isObj06QI1 ? '📋' : '📄';
      const steps = isObj06QI1 ? [
        { label: 'Project initiation', key: 'projectInitiation', phase: 'Planning' },
        { label: 'Define Scope and objective', key: 'defineScopeAndObjective', phase: 'Planning' },
        { label: 'Cross functional core team formation', key: 'crossFunctionalCoreTeamFormation', phase: 'Planning' },
        { label: 'Preparation and approvals of URS', key: 'preparationAndApprovalsOfURS', phase: 'Planning' },
        { label: 'Timeliness/Milestones approval', key: 'timelinessMillestonesApprovalFromProjectLeadAndTopManagement', phase: 'Approval' },
        { label: 'System configuration and validation', key: 'systemConfigurationAndValidation', phase: 'Setup' },
        { label: 'Data migration', key: 'dataMigration', phase: 'Setup' },
        { label: 'Training and evaluation', key: 'trainingAndEvaluation', phase: 'Implementation' },
        { label: 'Go live', key: 'goLive', phase: 'Implementation' },
        { label: 'Post implementation review', key: 'postImplementationReview', phase: 'Implementation' },
        { label: 'Compliance verification & audit', key: 'verifyTheComplianceThroughUserFeedbackInternalExternalAudit', phase: 'Verification' }
      ] : [
        { label: 'Project initiation', key: 'projectInitiation', phase: 'Planning' },
        { label: 'Define Scope and objective', key: 'defineScopeAndObjective', phase: 'Planning' },
        { label: 'Cross functional core team formation', key: 'crossFunctionalCoreTeamFormation', phase: 'Planning' },
        { label: 'Preparation and approvals of URS', key: 'preparationAndApprovalsOfURS', phase: 'Planning' },
        { label: 'Timeliness/Milestones approval', key: 'timelinessMillestonesApprovalFromProjectLeadAndTopManagement', phase: 'Approval' },
        { label: 'System configuration and validation', key: 'systemConfigurationAndValidation', phase: 'Setup' },
        { label: 'Data migration', key: 'dataMigration', phase: 'Setup' },
        { label: 'Training and evaluation', key: 'trainingAndEvaluation', phase: 'Implementation' },
        { label: 'Go live', key: 'goLive', phase: 'Implementation' },
        { label: 'Post implementation review', key: 'postImplementationReview', phase: 'Implementation' },
        { label: 'Record accuracy & compliance', key: 'verifyTheComplianceThroughUserFeedbackRightAtFirstTimeBatchRecordAccuracyRate', phase: 'Verification' }
      ];

      const phaseGroups = {
        'Planning': { color: '#f59e0b', bgColor: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', icon: '📝' },
        'Approval': { color: '#3b82f6', bgColor: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', icon: '✅' },
        'Setup': { color: '#8b5cf6', bgColor: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)', icon: '⚙️' },
        'Implementation': { color: '#10b981', bgColor: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', icon: '🚀' },
        'Verification': { color: '#ec4899', bgColor: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', icon: '🔍' }
      };

      const overallProgress = data[0]?.value || 0;
      const completedSteps = steps.filter(s => parseInt(data[0]?.[s.key] || 0) > 0).length;

      return (
        <div style={{ padding: '28px', background: '#ffffff', borderRadius: '16px', border: `3px solid ${colors.primary}`, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
          {/* Header with Overall Progress */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px',
            marginBottom: '32px',
            paddingBottom: '24px',
            borderBottom: `2px solid ${colors.primary}20`
          }}>
            <div>
              <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>
                {qiIcon} Implementation Phase
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                {qiLabel}
              </div>

              {/* Summary Stats - Inline */}
              <div style={{
                padding: '16px',
                background: '#ffffff',
                borderRadius: '14px',
                border: `2px solid #e2e8f0`,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                <div style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #10b98120 0%, #059669 100%)',
                  borderRadius: '12px',
                  border: '2px solid #10b981'
                }}>
                  <div style={{ fontSize: '1.5rem', color: '#065f46', fontWeight: 700, marginBottom: '6px' }}>
                    ✓ Completed
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#047857' }}>
                    {completedSteps}/{steps.length}
                  </div>
                </div>
                <div style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #3b82f620 0%, #2563eb 100%)',
                  borderRadius: '12px',
                  border: '2px solid #3b82f6'
                }}>
                  <div style={{ fontSize: '1.5rem', color: '#0c2d6b', fontWeight: 700, marginBottom: '6px' }}>
                    📍 Scope
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1e40af' }}>
                    I, III, IV, V
                  </div>
                </div>
                <div style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #f59e0b20 0%, #d97706 100%)',
                  borderRadius: '12px',
                  border: '2px solid #f59e0b'
                }}>
                  <div style={{ fontSize: '1.5rem', color: '#92400e', fontWeight: 700, marginBottom: '6px' }}>
                    ⏳ Status
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#b45309' }}>
                    In Process
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Progress Circle */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: `${colors.primary}08`,
              borderRadius: '14px',
              padding: '18px'
            }}>
              <div style={{
                position: 'relative',
                width: '150px',
                height: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <svg width="150" height="150" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
                  <circle cx="75" cy="75" r="66" fill="none" stroke="#e2e8f0" strokeWidth="8"/>
                  <circle
                    cx="75"
                    cy="75"
                    r="66"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth="8"
                    strokeDasharray={`${(overallProgress / 100) * 2 * 3.14159 * 66} ${2 * 3.14159 * 66}`}
                    strokeDashoffset="var(--dash-total)"
                    style={{
                      '--dash-total': `${2 * 3.14159 * 66}`,
                      animation: 'progressFill 1.5s ease-out forwards'
                    }}
                  />
                </svg>
                <div style={{ textAlign: 'center', zIndex: 1 }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: colors.primary }}>
                    {overallProgress}%
                  </div>
                  <div style={{ fontSize: '1.4rem', color: '#64748b', fontWeight: 600 }}>
                    Complete
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase-grouped Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {Object.entries(phaseGroups).map(([phase, style]) => {
              const phaseSteps = steps.filter(s => s.phase === phase);
              return (
                <div key={phase} style={{
                  padding: '18px',
                  background: style.bgColor,
                  borderRadius: '14px',
                  border: `3px solid ${style.color}`,
                  boxShadow: `0 8px 16px ${style.color}20`,
                  transition: 'transform 200ms'
                }}>
                  <div style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: style.color,
                    marginBottom: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '1.8rem' }}>{style.icon}</span>
                    {phase}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {phaseSteps.map((step, idx) => {
                      const value = parseInt(data[0]?.[step.key] || 0);
                      const isComplete = value > 0;
                      return (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 14px',
                          background: isComplete ? '#ffffff' : '#f8fafc',
                          borderRadius: '10px',
                          border: `2px solid ${isComplete ? style.color + '60' : '#e2e8f0'}`,
                          boxShadow: isComplete ? `0 4px 8px ${style.color}15` : 'none',
                          transition: 'all 200ms'
                        }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: isComplete ? `${style.color}25` : '#e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.6rem',
                            color: style.color,
                            fontWeight: 900,
                            flexShrink: 0,
                            border: `2px solid ${isComplete ? style.color : '#d1d5db'}`
                          }}>
                            {isComplete ? '✓' : '○'}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 700 }}>
                              {step.label}
                            </div>
                          </div>
                          <div style={{
                            fontSize: '1.8rem',
                            fontWeight: 900,
                            color: isComplete ? style.color : '#94a3b8',
                            minWidth: '50px',
                            textAlign: 'right',
                            padding: '6px 12px',
                            background: isComplete ? `${style.color}12` : 'transparent',
                            borderRadius: '6px'
                          }}>
                            {value}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
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
                fontSize: '1.5rem', 
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
                  <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>
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
                  <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>
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
                <div style={{ fontSize: '1.5rem', marginBottom: '4px', opacity: 0.9 }}>
                  Gap Analysis Status
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>
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
                  fontSize: '1.5rem', 
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
                        <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>
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
                fontSize: '1.5rem', 
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
                  <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
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
                  <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
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

    // Objective 05 QI1 - Gap Assessment
    if (isObj05QI1) {
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
                fontSize: '1.5rem', 
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
                  <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>
                    Identification of the risk cause more defects
                  </div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: colors.primary }}>
                    {item.identificationOfRiskCauseMoreDefects}%
                  </div>
                </div>

                <div style={{
                  padding: '18px',
                  background: `${colors.primary}10`,
                  borderRadius: '12px',
                  border: `1px solid ${colors.primary}30`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>
                    List of activities based on critical process
                  </div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: colors.primary }}>
                    {item.listOfActivitiesBasedOnCriticalProcess}%
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
                <div style={{ fontSize: '1.5rem', marginBottom: '4px', opacity: 0.9 }}>
                  Gap Assessment Status
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                  ✓ Completed
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Objective 05 QI2 - Training and Evaluation
    if (isObj05QI2) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px' }}>
          {data.map((item, idx) => {
            const trainingStages = [
              { label: 'Training planner and execution', value: item.trainingPlannerAndExecution, icon: '📋', color: '#3b82f6' },
              { label: 'Training of IPQA on defect recognition and RC analysis', value: item.trainingOfIPQAOnDefectRecognitionAndRCAnalysis, icon: '🔍', color: '#10b981' },
              { label: 'Evaluation of post training', value: item.evaluationOfPostTraining, icon: '✓', color: '#10b981' },
              { label: 'Retraining or refresher training planner', value: item.retrainingOrRefresherTrainingPlanner, icon: '🔄', color: '#f59e0b' }
            ];

            const avgCompliance = Math.round((item.trainingPlannerAndExecution + item.trainingOfIPQAOnDefectRecognitionAndRCAnalysis + item.evaluationOfPostTraining + item.retrainingOrRefresherTrainingPlanner) / 4);
            
            return (
              <div key={idx} style={{
                padding: '24px',
                background: `linear-gradient(135deg, ${colors.primary}08 0%, #ffffff 100%)`,
                borderRadius: '16px',
                border: `2px solid ${colors.primary}30`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 800, 
                  color: colors.primary, 
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: `2px solid ${colors.primary}20`,
                  textAlign: 'center'
                }}>
                  {item.site}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {trainingStages.map((stage, stageIdx) => (
                    <div key={stageIdx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '14px 16px',
                      background: `${stage.color}10`,
                      borderRadius: '10px',
                      border: `1px solid ${stage.color}30`
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
                        <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 600, marginBottom: '2px' }}>
                          {stage.label}
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: stage.color }}>
                          {stage.value}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ 
                  padding: '16px',
                  background: `linear-gradient(135deg, #10b981 0%, #059669 100%)`,
                  borderRadius: '12px',
                  border: `2px solid #10b981`,
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}>
                  <div style={{ fontSize: '1.5rem', color: '#ffffff', fontWeight: 600, marginBottom: '6px' }}>
                    Overall Compliance
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff' }}>
                    {avgCompliance}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Objective 05 QI3 - Implementation
    if (isObj05QI3) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px' }}>
          {data.map((item, idx) => {
            const implementationSteps = [
              { label: 'Verification frequency increased', value: item.verificationFrequencyIncreased, icon: '📊', color: '#3b82f6' },
              { label: 'Stringent monitoring', value: item.stringentMonitoring, icon: '🔍', color: '#10b981' },
              { label: 'Real time containment and root cause analysis before batch continuation', value: item.realtimeContainmentAndRootCauseAnalysisBeforeBatchContinuation, icon: '⚡', color: '#ef4444' }
            ];

            const avgImplementation = Math.round((item.verificationFrequencyIncreased + item.stringentMonitoring + item.realtimeContainmentAndRootCauseAnalysisBeforeBatchContinuation) / 3);
            
            return (
              <div key={idx} style={{
                padding: '24px',
                background: `linear-gradient(135deg, ${colors.primary}08 0%, #ffffff 100%)`,
                borderRadius: '16px',
                border: `2px solid ${colors.primary}30`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 800, 
                  color: colors.primary, 
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: `2px solid ${colors.primary}20`,
                  textAlign: 'center'
                }}>
                  {item.site}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {implementationSteps.map((step, stepIdx) => (
                    <div key={stepIdx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '14px 16px',
                      background: `${step.color}10`,
                      borderRadius: '10px',
                      border: `1px solid ${step.color}30`
                    }}>
                      <div style={{ 
                        fontSize: '1.5rem', 
                        marginRight: '12px',
                        width: '32px',
                        textAlign: 'center'
                      }}>
                        {step.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 600, marginBottom: '2px' }}>
                          {step.label}
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: step.color }}>
                          {step.value}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ 
                  padding: '16px',
                  background: `linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`,
                  borderRadius: '12px',
                  border: `2px solid #3b82f6`,
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}>
                  <div style={{ fontSize: '1.5rem', color: '#ffffff', fontWeight: 600, marginBottom: '6px' }}>
                    Implementation Progress
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff' }}>
                    {avgImplementation}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Objective 05 QI4 - Effectiveness
    if (isObj05QI4) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px' }}>
          {data.map((item, idx) => {
            const effectivenessMetrics = [
              { label: '% increase in proactive identifcation', value: item.percentageIncreaseInProactiveIdentification, icon: '📈', color: '#3b82f6' },
              { label: '% Reduction in in-process and finished goods defect rate', value: item.percentageReductionInInProcessAndFinishedGoodsDefectRate, icon: '📉', color: '#10b981' },
              { label: '% Reduction in rework/reprocessing rate', value: item.percentageReductionInReworkReprocessingRate, icon: '♻️', color: '#f59e0b' },
              { label: '% reduction in avg time to close investigations and CAPA', value: item.percentageReductionInAvgTimeToCloseInvestigationsAndCAPA, icon: '⏱️', color: '#ec4899' }
            ];

            const avgEffectiveness = Math.round((item.percentageIncreaseInProactiveIdentification + item.percentageReductionInInProcessAndFinishedGoodsDefectRate + item.percentageReductionInReworkReprocessingRate + item.percentageReductionInAvgTimeToCloseInvestigationsAndCAPA) / 4);
            
            return (
              <div key={idx} style={{
                padding: '24px',
                background: `linear-gradient(135deg, ${colors.primary}08 0%, #ffffff 100%)`,
                borderRadius: '16px',
                border: `2px solid ${colors.primary}30`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 800, 
                  color: colors.primary, 
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: `2px solid ${colors.primary}20`,
                  textAlign: 'center'
                }}>
                  {item.site}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {effectivenessMetrics.map((metric, metricIdx) => (
                    <div key={metricIdx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 14px',
                      background: `${metric.color}10`,
                      borderRadius: '8px',
                      border: `1px solid ${metric.color}30`
                    }}>
                      <div style={{ 
                        fontSize: '1.5rem', 
                        marginRight: '10px',
                        width: '28px',
                        textAlign: 'center'
                      }}>
                        {metric.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 600 }}>
                          {metric.label}
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: metric.color }}>
                          {metric.value}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ 
                  padding: '16px',
                  background: `linear-gradient(135deg, #f59e0b 0%, #d97706 100%)`,
                  borderRadius: '12px',
                  border: `2px solid #f59e0b`,
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                }}>
                  <div style={{ fontSize: '1.5rem', color: '#ffffff', fontWeight: 600, marginBottom: '6px' }}>
                    Overall Effectiveness
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff' }}>
                    {avgEffectiveness}%
                  </div>
                </div>
              </div>
            );
          })}
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
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
              {item.site}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.5rem', color: '#64748b' }}>Performance</span>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: colors.primary }}>{item.value}%</span>
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
    <section style={{ padding: '60px 24px', minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 25%, #fef3c7 50%, #fef2f2 75%, #f0f9ff 100%)', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', boxSizing: 'border-box', overflowY: 'hidden', overflowX: 'hidden' }}>
      {/* Decorative Elements */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(30, 144, 255, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', top: '50%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
      
      <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5em', color: '#ef4444', fontWeight: 700, letterSpacing: '0.05em' }}>QUALITY OBJECTIVES - 2025</div>
          <div style={{ height: '4px', width: '80px', background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%)', marginTop: '8px', marginBottom: '14px', borderRadius: '999px', margin: '8px auto 14px' }}></div>
        </header>

        <style>{`
          ${activeModals.card ? '.corner-logo { display: none !important; }' : ''}
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
          @keyframes progressFill {
            from {
              stroke-dashoffset: var(--dash-total);
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>

        {/* 4-Card Grid - Centered */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(400px, 1fr))', gap: '24px', margin: '0 auto 52px', justifyContent: 'center', justifyItems: 'stretch', maxWidth: '1580px', width: '100%' }}>
          {[
            {
              id: '04',
              title: 'Reduce Good Documentation Practices (GDP) related Nonconformities',
              subtitle: '',
              description: 'Reduce Good Documentation Practices (GDP) related Nonconformities and incidents by 50%',
              color: '#667eea',
              bgColor: '#f3f0ff'
            },
            {
              id: '05',
              title: '',
              subtitle: '',
              description: 'To reduce the number of In-process and final product defects through stringent IPQA verification and proactive defect prevention.',
              color: '#059669',
              bgColor: '#ecfdf5'
            },
            {
              id: '06',
              title: '',
              subtitle: '',
              description: 'Digitalization of quality management system to improve efficiency, data integrity, traceability, real-time monitoring and compliance with regulatory',
              color: '#0ea5e9',
              bgColor: '#e0f2fe'
            },
            {
              id: '07',
              title: '',
              subtitle: '',
              description: 'Enhance the competency autonomy and engagement of QA staff to improve overall quality system performance and compliance',
              color: '#f59e0b',
              bgColor: '#fffbeb'
            }
          ].map((card, idx) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                padding: '30px',
                borderRadius: '20px',
                border: activeModals.card === card.id
                  ? `2px solid ${card.color}`
                  : hoveredCard === card.id
                    ? `2px solid ${card.color}90`
                    : '1.5px solid #e2e8f0',
                background: activeModals.card === card.id
                  ? `linear-gradient(145deg, ${card.color} 0%, ${card.color}d0 100%)`
                  : hoveredCard === card.id
                    ? `linear-gradient(145deg, ${card.color}bb 0%, ${card.color}e6 100%)`
                    : `linear-gradient(145deg, ${card.bgColor} 0%, #ffffff 100%)`,
                boxShadow: activeModals.card === card.id
                  ? `0 14px 36px ${card.color}30`
                  : hoveredCard === card.id
                    ? `0 12px 30px ${card.color}25`
                    : '0 10px 26px rgba(15, 23, 42, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: activeModals.card === card.id
                  ? 'translateY(-8px)'
                  : hoveredCard === card.id
                    ? 'translateY(-4px)'
                    : 'translateY(0)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                animation: `slideIn 0.5s ease-out ${idx * 0.1}s both`,
                minHeight: '380px'
              }}
            >
              {/* Active Indicator */}
              {activeModals.card === card.id && (
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
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  animation: 'pulse 0.6s ease-in-out',
                  zIndex: 2
                }}>
                  ✓
                </div>
              )}

              {/* Title Section */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                {['04', '05', '06', '07'].includes(card.id) && (
                  <div style={{
                    width: '100%',
                    padding: '14px 24px',
                    borderRadius: '18px',
                    fontSize: '2.4rem',
                    fontWeight: 850,
                    letterSpacing: '1px',
                    color: '#ffffff',
                    background: hoveredCard === card.id 
                      ? `linear-gradient(135deg, ${card.color}88 0%, ${card.color}66 100%)` 
                      : `linear-gradient(135deg, ${card.color}dd 0%, ${card.color}cc 100%)`,
                    border: hoveredCard === card.id 
                      ? `2px solid ${card.color}` 
                      : `2px solid ${card.color}aa`,
                    boxShadow: hoveredCard === card.id 
                      ? `0 12px 28px ${card.color}35` 
                      : `0 8px 20px ${card.color}25`,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}>
                    {`Objective ${card.id}`}
                  </div>
                )}
              </div>

              {/* Description */}
              <div style={{
                fontSize: '2.0rem',
                color: '#0f172a',
                fontWeight: '600',
                lineHeight: '1.6',
                position: 'relative',
                zIndex: 1,
                textAlign: 'left'
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
          <div style={{ fontSize: '2.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>
            💡 Click a card to open the data
          </div>
          <div style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 500 }}>
            Select an Objective to view detailed QI flow and site-wise metrics
          </div>
        </div>
        {/* Full Screen Modal/Details Section */}
        {activeModals.card && (
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
              onClick={() => setActiveModals({ card: null, qi04: null, qi05: null, qi06: null, qi07: null })}
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
              margin: '0 auto',
              fontSize: '1.5rem',
              lineHeight: 1.5
            }}>

            {/* Modal Header */}
            {activeModals.card === '04' && (
              <>
                <div style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  padding: '28px', 
                  borderRadius: '12px', 
                  marginBottom: '24px',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.4 }}>Objective 04</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 300, marginTop: '6px', lineHeight: 1.45 }}>
                    Reduce Good Documentation Practices (GDP) related Nonconformities and incidents by 50%
                  </div>
                </div>

                {/* QI Buttons */}
                <div style={{ display: 'flex', gap: '14px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {objective4Flow.map((qiItem, index) => renderQIButton(qiItem, index, '04'))}
                </div>

                {/* Site Data Cards */}
                {activeModals.qi04 !== null ? (
                  <div style={{ animation: 'slideIn 0.4s ease-out' }}>
                    {renderSiteCards(qiDataMap[activeModals.qi04], { primary: '#667eea', accent: '#764ba2', light: '#f3f0ff' })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#475569', padding: '8px 0' }}>Select a QI to view site-wise details.</div>
                )}
              </>
            )}

            {activeModals.card === '05' && (
              <>
                <div style={{ 
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', 
                  padding: '28px', 
                  borderRadius: '12px', 
                  marginBottom: '24px',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.4 }}>Objective 05</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 300, marginTop: '6px', lineHeight: 1.45 }}>
                    To reduce the number of In-process and final product defects through stringent IPQA verification and proactive defect prevention.
                  </div>
                </div>

                {/* QI Buttons */}
                <div style={{ display: 'flex', gap: '14px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {objective5Flow.map((qiItem, index) => renderQIButton(qiItem, index, '05'))}
                </div>

                {/* Site Data Cards */}
                {activeModals.qi05 !== null ? (
                  <div style={{ animation: 'slideIn 0.4s ease-out' }}>
                    {renderSiteCards(obj05_qiDataMap[activeModals.qi05], { primary: '#059669', accent: '#047857', light: '#ecfdf5' })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#475569', padding: '8px 0' }}>Select a QI to view site-wise details.</div>
                )}
              </>
            )}

            {activeModals.card === '06' && (
              <>
                <div style={{ 
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)', 
                  padding: '28px', 
                  borderRadius: '12px', 
                  marginBottom: '24px',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.4 }}>Objective 06</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 300, marginTop: '6px', lineHeight: 1.45 }}>
                    Digitalization of quality management system to improve efficiency, data integrity, traceability, real-time monitoring and compliance with regulatory
                  </div>
                </div>

                {/* QI Buttons */}
                <div style={{ display: 'flex', gap: '14px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {objective6Flow.map((qiItem, index) => renderQIButton(qiItem, index, '06'))}
                </div>

                {/* Site Data Cards */}
                {activeModals.qi06 !== null ? (
                  <div style={{ animation: 'slideIn 0.4s ease-out' }}>
                    {renderSiteCards(obj06_qiDataMap[activeModals.qi06], { primary: '#0ea5e9', accent: '#06b6d4', light: '#ecf0ff' })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#475569', padding: '8px 0' }}>Select a QI to view details.</div>
                )}
              </>
            )}

      {activeModals.card === '07' && (
              <>
                <div style={{ 
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
                  padding: '28px', 
                  borderRadius: '12px', 
                  marginBottom: '24px',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.4 }}>Objective 07</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 300, marginTop: '6px', lineHeight: 1.45 }}>
                    Enhance the competency autonomy and engagement of QA staff to improve overall quality system performance and compliance
                  </div>
                </div>

                {/* QI Buttons */}
                <div style={{ display: 'flex', gap: '14px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {objective7Flow.map((qiItem, index) => renderQIButton(qiItem, index, '07'))}
                </div>

                {/* Site Data Cards */}
                {activeModals.qi07 !== null ? (
                  <div style={{ animation: 'slideIn 0.4s ease-out' }}>
                    {renderSiteCards(obj07_qiDataMap[activeModals.qi07], { primary: '#f59e0b', accent: '#d97706', light: '#fff7ed' })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#475569', padding: '8px 0' }}>Select a QI to view site-wise details.</div>
                )}
              </>
            )}


            </div>
          </div>
        )}

      </div>
    </section>
  );
}




