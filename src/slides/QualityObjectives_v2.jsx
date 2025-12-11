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
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.92) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes float {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-20px) scale(1.05);
    }
  }
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 10px 30px rgba(59,130,246,0.35), 0 0 0 3px rgba(59,130,246,0.1);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 15px 40px rgba(59,130,246,0.45), 0 0 0 6px rgba(59,130,246,0.2);
    }
  }
`;

const QualityObjectives_v2 = () => {
  const [activeModals, setActiveModals] = useState({ card: null, qi04: null, qi05: null, qi06: null, qi07: null });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [obj05Qi1InfoSite, setObj05Qi1InfoSite] = useState(null);
  const [obj05Qi1InfoModal, setObj05Qi1InfoModal] = useState(null);
  const [obj05Qi2InfoSite, setObj05Qi2InfoSite] = useState(null);
  const [obj05Qi2InfoModal, setObj05Qi2InfoModal] = useState(null);
  const [obj07Qi1InfoSite, setObj07Qi1InfoSite] = useState(null);
  const [obj07Qi1InfoModal, setObj07Qi1InfoModal] = useState(null);
  const [obj07Qi2InfoSite, setObj07Qi2InfoSite] = useState(null);
  const [obj07Qi2InfoModal, setObj07Qi2InfoModal] = useState(null);
  const [obj07Qi3InfoSite, setObj07Qi3InfoSite] = useState(null);
  const [obj07Qi3InfoModal, setObj07Qi3InfoModal] = useState(null);
  const [obj07Qi3ErrorDetailsModal, setObj07Qi3ErrorDetailsModal] = useState(null);

  useEffect(() => {
    const closeAll = () => setActiveModals({ card: null, qi04: null, qi05: null, qi06: null, qi07: null });
    window.addEventListener('closeAllModals', closeAll);
    return () => window.removeEventListener('closeAllModals', closeAll);
  }, []);

  const handleCardClick = (cardId) => {
    setActiveModals((prev) => ({
      card: prev.card === cardId ? null : cardId,
      qi04: null,
      qi05: null,
      qi06: null,
      qi07: null
    }));
  };

  const handleQIClick = (qiIndex, objective) => {
    const keyMap = { '04': 'qi04', '05': 'qi05', '06': 'qi06', '07': 'qi07' };
    const key = keyMap[objective];

    setActiveModals((prev) => {
      const next = { card: objective, qi04: null, qi05: null, qi06: null, qi07: null };
      if (key) {
        next[key] = prev.card === objective && prev[key] === qiIndex ? null : qiIndex;
      }
      return next;
    });
  };

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
      listOfActivitiesBasedOnCriticalProcess: 100,
      infoRows: [
        { process: 'Cartridge Assembly and process', product: 'Cartridge Assembly', stage: 'Laser Welding process' },
        { process: 'Device assembly and process', product: 'ASED', stage: 'Manifold' },
        { process: 'Device assembly and process', product: 'ASED', stage: 'Testing and Heater testing stage' },
        { process: 'Device assembly and process', product: 'ASED', stage: 'Design was updated' },
        { process: 'Device assembly and process', product: 'ASED', stage: 'Bottom cover' },
        { process: 'Device assembly and process', product: 'FOUR BAY PCR Machine', stage: 'Bottom cover' },
        { process: 'Device assembly and process', product: 'FOUR BAY PCR Machine', stage: 'Bottom cover' },
        { process: 'Device assembly and process', product: 'FOUR BAY PCR Machine', stage: 'IPQC' },
        { process: 'Device assembly and process', product: 'FOUR BAY PCR Machine', stage: 'Testing' },
        { process: 'Device assembly and process', product: 'FOUR BAY PCR Machine', stage: 'Testing' },
        { process: 'Device assembly and process', product: 'FOUR BAY PCR Machine', stage: 'Testing' },
        { process: 'Device assembly and process', product: 'TWO Bay PCR Machine', stage: 'Testing' },
        { process: 'Device assembly and process', product: 'TWO Bay PCR Machine', stage: 'IPQC' },
        { process: 'Device assembly and process', product: 'TWO Bay PCR Machine', stage: 'IPQC' },
        { process: 'Device assembly and process', product: 'TWO Bay PCR Machine', stage: 'Testing' },
        { process: 'Device assembly and process', product: 'TWO Bay PCR Machine', stage: 'Testing' }
      ]
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
      value: 81,
      target: 100,
      trainingPlannerAndExecution: 50,
      trainingOfIPQAOnDefectRecognitionAndRCAnalysis: 100,
      evaluationOfPostTraining: 100,
      retrainingOrRefresherTrainingPlanner: 75
    },
    {
      site: 'Site III',
      value: 75,
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
      trainingOfIPQAOnDefectRecognitionAndRCAnalysis: 50,
      evaluationOfPostTraining: 50,
      retrainingOrRefresherTrainingPlanner: 50
    }
  ];

  const obj05_qi3Data = [
    {
      site: 'Site I',
      value: 100,
      target: 100,
      verificationFrequencyIncreased: 100,
      stringentMonitoring: 100,
      realtimeContainmentAndRootCauseAnalysisBeforeBatchContinuation: 100
    },
    {
      site: 'Site III',
      value: 80,
      target: 100,
      verificationFrequencyIncreased: 80,
      stringentMonitoring: 75,
      realtimeContainmentAndRootCauseAnalysisBeforeBatchContinuation: 85
    },
    {
      site: 'Site V',
      value: 70,
      target: 100,
      verificationFrequencyIncreased: 70,
      stringentMonitoring: 65,
      realtimeContainmentAndRootCauseAnalysisBeforeBatchContinuation: 75
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
      trainingCalendar: 100,
      infoRows: [
        { srNo: 1, sopNumber: 'SOP/QA/III/001', sopName: 'Preparation of Device master file', revisionNumber: '03', trainerName: 'Praneet', date: '01/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 2, sopNumber: 'SOP/QA/III/002', sopName: 'In Process Quality Assurance Activities', revisionNumber: '03', trainerName: 'L R Naidu', date: '02/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 3, sopNumber: 'SOP/QA/III/003', sopName: 'Sampling Procedure for Incoming, In-Process materials and Finished products', revisionNumber: '05', trainerName: 'Naveen', date: '03/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 4, sopNumber: 'SOP/QA/III/024', sopName: 'Batch Release/Product Release of finished products', revisionNumber: '06', trainerName: 'Praneet', date: '04/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 5, sopNumber: 'SOP/QA/III/025', sopName: 'SOP for Handling Customer Complaints', revisionNumber: '02', trainerName: 'Naveen', date: '05/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 6, sopNumber: 'SOP/QA/III/026', sopName: 'SOP for Handling, Operation and Cleaning of glassware', revisionNumber: '00', trainerName: 'Sunil', date: '06/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 7, sopNumber: 'SOP/QA/III/027', sopName: 'Handling out of specification', revisionNumber: '00', trainerName: 'Praneet', date: '08/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 8, sopNumber: 'SOP/QA/III/028', sopName: 'Annual Product Quality Review', revisionNumber: '00', trainerName: 'L R Naidu', date: '09/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 9, sopNumber: 'SOP/QA/III/029', sopName: 'SOP for Work Instructions and One Point Lesson', revisionNumber: '00', trainerName: 'Praneet', date: '10/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 10, sopNumber: 'SOP/QA/003', sopName: 'Change Control', revisionNumber: '07', trainerName: 'Praneet', date: '17/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 11, sopNumber: 'SOP/QA/005', sopName: 'Deviation Control', revisionNumber: '04', trainerName: 'Praneet', date: '17/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 12, sopNumber: 'SOP/QA/012', sopName: 'Preparation, Maintenance and Verification of logbooks', revisionNumber: '05', trainerName: 'Naveen', date: '03/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 13, sopNumber: 'SOP/QA/014', sopName: 'Line clearance and verification of manufacturing/Packing Process', revisionNumber: '04', trainerName: 'Praneet', date: '18/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 14, sopNumber: 'SOP/QA/032', sopName: 'Handling and Destruction of rejected and expired material', revisionNumber: '07', trainerName: 'Praneet', date: '03/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 15, sopNumber: 'SOP/QA/034', sopName: 'SOP for Extension', revisionNumber: '03', trainerName: 'L R Naidu', date: '19/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 16, sopNumber: 'SOP/QA/030', sopName: 'Roles and responsibilities of Quality Management System (QMS) Team', revisionNumber: '01', trainerName: 'L R Naidu', date: '20/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 17, sopNumber: 'SOP/QA/004', sopName: 'Incident Reporting', revisionNumber: '06', trainerName: 'Praneet', date: '21/11/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 18, sopNumber: 'SOP/QA/041', sopName: 'Roles and responsibilities of LAB - QA', revisionNumber: '04', trainerName: 'Praneet', date: '22/11/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 19, sopNumber: 'SOP/QA/014', sopName: 'Corrective and Preventive action', revisionNumber: '00', trainerName: 'L R Naidu', date: '17/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 20, sopNumber: 'NA', sopName: 'Significate of quality event', revisionNumber: 'NA', trainerName: 'Praneet', date: '12/11/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 21, sopNumber: 'NA', sopName: 'RCA tools', revisionNumber: 'NA', trainerName: 'L R Naidu', date: '13/11/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 22, sopNumber: 'NA', sopName: 'Problem sloving Skills', revisionNumber: 'NA', trainerName: 'L R Naidu', date: '21/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 23, sopNumber: 'NA', sopName: 'Training on effective investigation', revisionNumber: 'NA', trainerName: 'L R Naidu', date: '21/11/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 24, sopNumber: 'SOP/QA/007', sopName: 'Document and Record Control', revisionNumber: '08', trainerName: 'Praneet', date: '12/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' },
        { srNo: 25, sopNumber: 'SOP/QA/019', sopName: 'Procedure for Mastering documents and Maintaining Master list of documents', revisionNumber: '04', trainerName: 'Praneet', date: '13/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' },
        { srNo: 26, sopNumber: 'SOP/QA/021', sopName: 'Calibration process in SAP systemline', revisionNumber: '06', trainerName: 'Praneet', date: '15/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' },
        { srNo: 27, sopNumber: 'SOP/QA/027', sopName: 'Labeling and control (in-house) status', revisionNumber: '06', trainerName: 'Praneet', date: '18/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' },
        { srNo: 28, sopNumber: 'SOP/QA/028', sopName: 'SOP for Record room', revisionNumber: '03', trainerName: 'Praneet', date: '19/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' },
        { srNo: 29, sopNumber: 'SOP/QA/038', sopName: 'Feed back from manufacturing unit to design and development post design transfer', revisionNumber: '01', trainerName: 'Naveen', date: '20/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' },
        { srNo: 30, sopNumber: 'SOP/QA/039', sopName: 'Procedure for Requirement Specifications, Acceptance Testing and supported GxP Regulated activities.', revisionNumber: '02', trainerName: 'Praneet', date: '22/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' }
      ]
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
      retrainingEvaluation: 100,
      infoRows: [
        { srNo: 1, sopNumber: 'SOP/QA/III/001', sopName: 'Preparation of Device master file', revisionNumber: '03', trainerName: 'Praneet', date: '01/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 2, sopNumber: 'SOP/QA/III/002', sopName: 'In Process Quality Assurance Activities', revisionNumber: '03', trainerName: 'L R Naidu', date: '02/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 3, sopNumber: 'SOP/QA/III/003', sopName: 'Sampling Procedure for Incoming, In-Process materials and Finished products', revisionNumber: '05', trainerName: 'Naveen', date: '03/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 4, sopNumber: 'SOP/QA/III/024', sopName: 'Batch Release/Product Release of finished products', revisionNumber: '06', trainerName: 'Praneet', date: '04/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 5, sopNumber: 'SOP/QA/III/025', sopName: 'SOP for Handling Customer Complaints', revisionNumber: '02', trainerName: 'Naveen', date: '05/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 6, sopNumber: 'SOP/QA/III/026', sopName: 'SOP for Handling, Operation and Cleaning of glassware', revisionNumber: '00', trainerName: 'Sunil', date: '06/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 7, sopNumber: 'SOP/QA/III/027', sopName: 'Handling out of specification', revisionNumber: '00', trainerName: 'Praneet', date: '08/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 8, sopNumber: 'SOP/QA/III/028', sopName: 'Annual Product Quality Review', revisionNumber: '00', trainerName: 'L R Naidu', date: '09/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 9, sopNumber: 'SOP/QA/III/029', sopName: 'SOP for Work Instructions and One Point Lesson', revisionNumber: '00', trainerName: 'Praneet', date: '10/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 10, sopNumber: 'SOP/QA/003', sopName: 'Change Control', revisionNumber: '07', trainerName: 'Praneet', date: '17/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 11, sopNumber: 'SOP/QA/005', sopName: 'Deviation Control', revisionNumber: '04', trainerName: 'Praneet', date: '17/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 12, sopNumber: 'SOP/QA/012', sopName: 'Preparation, Maintenance and Verification of logbooks', revisionNumber: '05', trainerName: 'Naveen', date: '03/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 13, sopNumber: 'SOP/QA/014', sopName: 'Line clearance and verification of manufacturing/Packing Process', revisionNumber: '04', trainerName: 'Praneet', date: '18/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 14, sopNumber: 'SOP/QA/032', sopName: 'Handling and Destruction of rejected and expired material', revisionNumber: '07', trainerName: 'Praneet', date: '03/12/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 15, sopNumber: 'SOP/QA/034', sopName: 'SOP for Extension', revisionNumber: '03', trainerName: 'L R Naidu', date: '19/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 16, sopNumber: 'SOP/QA/030', sopName: 'Roles and responsibilities of Quality Management System (QMS) Team', revisionNumber: '01', trainerName: 'L R Naidu', date: '20/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 17, sopNumber: 'SOP/QA/004', sopName: ' Incident Reporting', revisionNumber: '06', trainerName: 'Praneet', date: '21/11/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 18, sopNumber: 'SOP/QA/041', sopName: 'Roles and responsibilities of LAB - QA', revisionNumber: '04', trainerName: 'Praneet', date: '22/11/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 19, sopNumber: 'SOP/QA/014', sopName: 'Corrective and Preventive action', revisionNumber: '00', trainerName: 'L R Naidu', date: '17/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 20, sopNumber: 'NA', sopName: 'Significate of quality event', revisionNumber: 'NA', trainerName: 'Praneet', date: '12/11/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 21, sopNumber: 'NA', sopName: 'RCA tools', revisionNumber: 'NA', trainerName: 'L R Naidu', date: '13/11/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 22, sopNumber: 'NA', sopName: 'Problem sloving Skills', revisionNumber: 'NA', trainerName: 'L R Naidu', date: '21/11/2025', time: '11:00 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 23, sopNumber: 'NA', sopName: 'Training on effective investigation', revisionNumber: 'NA', trainerName: 'L R Naidu', date: '21/11/2025', time: '15:30 hrs', remarks: 'Done', status: 'Completed' },
        { srNo: 24, sopNumber: 'SOP/QA/007', sopName: 'Document and Record Control', revisionNumber: '08', trainerName: 'Praneet', date: '12/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' },
        { srNo: 25, sopNumber: 'SOP/QA/019', sopName: 'Procedure for Mastering documents and Maintaining Master list of documents', revisionNumber: '04', trainerName: 'Praneet', date: '13/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' },
        { srNo: 26, sopNumber: 'SOP/QA/021', sopName: 'Calibration process in SAP systemline', revisionNumber: '06', trainerName: 'Praneet', date: '15/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' },
        { srNo: 27, sopNumber: 'SOP/QA/027', sopName: 'Labeling and control (in-house) status', revisionNumber: '06', trainerName: 'Praneet', date: '18/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' },
        { srNo: 28, sopNumber: 'SOP/QA/028', sopName: 'SOP for Record room', revisionNumber: '03', trainerName: 'Praneet', date: '19/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' },
        { srNo: 29, sopNumber: 'SOP/QA/038', sopName: 'Feed back from manufacturing unit to design and development post design transfer', revisionNumber: '01', trainerName: 'Naveen', date: '20/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' },
        { srNo: 30, sopNumber: 'SOP/QA/039', sopName: 'Procedure for Requirement Specifications, Acceptance Testing and supported GxP Regulated activities.', revisionNumber: '02', trainerName: 'Praneet', date: '22/12/2025', time: 'Still not Started', remarks: 'Pending', status: 'Pending' }
      ]
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
      staffInvolvement: 55,
      infoRows: [
        { department: 'QMS', beforeMembers: 4, beforePercent: 44, afterMembers: 6, afterPercent: 66 },
        { department: 'IPQA', beforeMembers: 9, beforePercent: 100, afterMembers: 9, afterPercent: 100 },
        { department: 'Lab QA', beforeMembers: 2, beforePercent: 22, afterMembers: 4, afterPercent: 44 }
      ],
      infoStats: {
        totalEmployees: 9,
        totalDepartments: 3,
        totalBeforePercent: 55.33,
        totalAfterPercent: 70
      }
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
    { id: 'qi3', label: 'Verification', color: '#10b981' },
    { id: 'qi4', label: 'Effectiveness', color: '#ec4899' }
  ];

  // Objective 04 QI data mapping
  const obj04_qi1Data = [
    { 
      site: 'Site I', 
      value: 48, 
      target: 100,
      totalEmployees: 191,
      noTraining: 99,
      trainedOldRevision: 0,
      trainedLatestRevision: 92,
      topErrors: [
        { error: 'More than Three cut sign', percentage: 24 },
        { error: 'Wrong entries', percentage: 17 },
        { error: 'Contemporaneous data', percentage: 13 }
      ]
    },
    { 
      site: 'Site III', 
      value: 71, 
      target: 100,
      totalEmployees: 103,
      noTraining: 30,
      trainedOldRevision: 0,
      trainedLatestRevision: 73,
      topErrors: [
        { error: 'Not Accurate', percentage: 37 },
        { error: 'More than Three cut sign', percentage: 26 },
        { error: 'Not Original', percentage: 16 }
      ]
    },
    { 
      site: 'Site V', 
      value: 74, 
      target: 100,
      totalEmployees: 280,
      noTraining: 73,
      trainedOldRevision: 0,
      trainedLatestRevision: 207,
      topErrors: [
        { error: 'More than Three cut sign', percentage: 27 },
        { error: 'Wrong entries', percentage: 18 },
        { error: 'Contemporaneous data', percentage: 14 }
      ]
    }
  ];

  const obj04_qi2Data = [
    { 
      site: 'Site I', 
      value: 93, 
      target: 100,
      trainedLatestSOP: 176,
      evaluationPassed80: 134,
      retrainingProvided: 31,
      evaluation100Passed: 163
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

  const obj04_qi3Data = [
    { 
      site: 'Site I', 
      value: 0, 
      target: 100,
      biweeklyChecks: []
    },
    { 
      site: 'Site III', 
      value: 75, 
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
      value: 50, 
      target: 100,
      biweeklyChecks: [
        { date: '14/11/2025', status: '08 Incidents related to GDP were initiated' },
        { date: '05/12/2025', status: '03 Incidents related to GDP were initiated' }
      ]
    }
  ];

  const obj04_qi4Data = [
    {
      site: 'Site I',
      value: 0,
      target: 100,
      status: 'Data not available',
      metrics: []
    },
    {
      site: 'Site III',
      value: 100,
      target: 100,
      status: 'Completed ✓',
      metrics: [
        { label: '50% reduction in number of GDP related incidents reported per month', value: 100, icon: '📉', color: '#10b981' },
        { label: '100% staff trained in GDP', value: 100, icon: '👥', color: '#3b82f6' },
        { label: '0% Number of GDP related audit findings in internal or external audit', value: 100, icon: '✓', color: '#059669' },
        { label: 'Average time taken to correct GDP related non-conformity less than 48 working Hrs', value: 100, icon: '⏱️', color: '#f59e0b' }
      ]
    },
    {
      site: 'Site V',
      value: 0,
      target: 100,
      status: 'Data not available',
      metrics: []
    }
  ];

  const qiDataMap = {
    0: obj04_qi1Data,
    1: obj04_qi2Data,
    2: obj04_qi3Data,
    3: obj04_qi4Data
  };

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
    
    const baseWidth = 400;
    const baseHeight = 120;
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
          padding: '12px 18px',
          gap: '8px',
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
        <div style={{ padding: '20px', textAlign: 'center', color: '#0f172a', fontWeight: 600 }}>
          Data need to be added.
        </div>
      );
    }

    if (obj07Qi3InfoModal) {
      return (
        <div
          onClick={() => {
            setObj07Qi3InfoModal(null);
            setObj07Qi3InfoSite(null);
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.55) 0%, rgba(30, 41, 59, 0.65) 100%)',
            backdropFilter: 'blur(14px) saturate(120%)',
            WebkitBackdropFilter: 'blur(14px) saturate(120%)',
            zIndex: 2000,
            padding: 0,
            margin: 0,
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.35)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
          >
            <div style={{
              padding: '28px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid rgba(148,163,184,0.2)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.85) 100%)',
              backdropFilter: 'blur(12px)'
            }}>
              <div>
                <div style={{ fontSize: '1.2rem', color: '#64748b', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Objective 07 • QI 3
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a' }}>
                  {obj07Qi3InfoModal.site} QA Staff Involved in QMS, IPQA, Lab QA
                </div>
              </div>
              <button
                onClick={() => {
                  setObj07Qi3InfoModal(null);
                  setObj07Qi3InfoSite(null);
                }}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: '#ffffff',
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(239,68,68,0.35)',
                  transition: 'all 0.25s ease'
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '24px 32px', overflow: 'auto', height: '100%' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ padding: '18px', borderRadius: '14px', background: 'linear-gradient(135deg, #ef4444 0%, #fca5a5 100%)', color: '#fff', boxShadow: '0 10px 30px rgba(239,68,68,0.25)' }}>
                  <div style={{ fontSize: '1rem', opacity: 0.9, fontWeight: 700, marginBottom: '6px' }}>Before %</div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 900 }}>{obj07Qi3InfoModal?.stats?.totalBeforePercent ?? 0}%</div>
                </div>
                <div style={{ padding: '18px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #6ee7b7 100%)', color: '#065f46', boxShadow: '0 10px 30px rgba(16,185,129,0.25)' }}>
                  <div style={{ fontSize: '1rem', opacity: 0.9, fontWeight: 700, marginBottom: '6px' }}>After %</div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 900 }}>{obj07Qi3InfoModal?.stats?.totalAfterPercent ?? 0}%</div>
                </div>
                <div style={{ padding: '18px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)', color: '#0f172a', boxShadow: '0 10px 30px rgba(59,130,246,0.25)' }}>
                  <div style={{ fontSize: '1rem', opacity: 0.9, fontWeight: 700, marginBottom: '6px' }}>Total Employees</div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a' }}>{obj07Qi3InfoModal?.stats?.totalEmployees || 0}</div>
                </div>
                <div style={{ padding: '18px', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)', color: '#0f172a', boxShadow: '0 10px 30px rgba(139,92,246,0.25)' }}>
                  <div style={{ fontSize: '1rem', opacity: 0.9, fontWeight: 700, marginBottom: '6px' }}>QA Sub-Departments</div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a' }}>{obj07Qi3InfoModal?.stats?.totalDepartments || 0}</div>
                </div>
              </div>

              <div style={{
                marginBottom: '20px',
                padding: '14px 16px',
                borderRadius: '12px',
                background: '#0f172a',
                color: '#e2e8f0',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr'
              }}>
                <div style={{ fontWeight: 800 }}>Department</div>
                <div style={{ textAlign: 'center', fontWeight: 800 }}>Before (Members)</div>
                <div style={{ textAlign: 'center', fontWeight: 800 }}>Before (%)</div>
                <div style={{ textAlign: 'center', fontWeight: 800 }}>After (Members)</div>
                <div style={{ textAlign: 'center', fontWeight: 800 }}>After (%)</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {obj07Qi3InfoModal.rows.map((row, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: idx % 2 === 0 ? '#f8fafc' : '#e2e8f0',
                      display: 'grid',
                      gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr',
                      alignItems: 'center',
                      border: '1px solid #cbd5e1'
                    }}
                  >
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{row.department}</div>
                    <div style={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{row.beforeMembers}</div>
                    <div style={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: 700, color: '#ef4444' }}>{row.beforePercent}%</div>
                    <div style={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{row.afterMembers}</div>
                    <div style={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: 700, color: '#16a34a' }}>{row.afterPercent}%</div>
                  </div>
                ))}
              </div>

              <div style={{
                padding: '16px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                border: '1px solid #cbd5e1',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr 1fr',
                gap: '12px',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Totals</div>
                <div style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 800, color: '#ef4444' }}>Before: {obj07Qi3InfoModal?.stats?.totalBeforePercent ?? 0}%</div>
                <div style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 800, color: '#16a34a' }}>After: {obj07Qi3InfoModal?.stats?.totalAfterPercent ?? 0}%</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (obj07Qi3ErrorDetailsModal) {
      const tableData = {
        qaErrors: [
          { category: 'NC', first: '1', firstDesc: 'Statements in incident and corrective actions were contradicting each other. Documents categorized as major', second: '0', secondDesc: 'NA' },
          { category: 'PI', first: '5', firstDesc: '1. Investigation report mentioned a proposed preventive action, however, no corresponding preventive action was documented\n2. DMF, Risk management report, Risk analysis and evaluation\n3. Lack of monitoring of SOP like no evidence', second: '1', secondDesc: 'Controlled of drawings' },
          { category: 'MNC', first: '2', firstDesc: 'DMF and Improper customer complaint handling', second: '2', secondDesc: 'Updated BOM and SOP/QA/007 molbio logo and name was not changed' },
          { category: 'Total', first: '8', firstDesc: 'NA', second: '3', secondDesc: 'NA' }
        ],
        incidents: [
          { period: 'Jan - Jun', count: '6', desc: 'Mastered without checking impact assessment, Duo serial numbering, customer complaint sign was not done for last year, hammered sir GDP error, Scan document torn, CA days crossed' },
          { period: 'Jul - Nov', count: '0', desc: 'NA' }
        ]
      };

      return (
        <div
          onClick={() => setObj07Qi3ErrorDetailsModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.55) 0%, rgba(30, 41, 59, 0.65) 100%)',
            backdropFilter: 'blur(14px) saturate(120%)',
            WebkitBackdropFilter: 'blur(14px) saturate(120%)',
            zIndex: 2000,
            padding: 0,
            margin: 0,
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #fef2f2 100%)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.35)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
          >
            <div style={{
              padding: '28px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid rgba(148,163,184,0.2)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.85) 100%)',
              backdropFilter: 'blur(12px)'
            }}>
              <div>
                <div style={{ fontSize: '1.2rem', color: '#64748b', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Objective 07 • QI 3
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a' }}>
                  📉 Decrease in QA Process Errors
                </div>
              </div>
              <button
                onClick={() => setObj07Qi3ErrorDetailsModal(false)}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: '#ffffff',
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(239,68,68,0.35)',
                  transition: 'all 0.25s ease'
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '24px 32px', overflow: 'auto', height: '100%' }}>
              {/* QA Errors Table */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', marginBottom: '16px' }}>1st IQA vs 2nd IQA - Error Categories</h3>
                <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                        <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 800, borderRight: '1px solid #cbd5e1' }}>Category</th>
                        <th style={{ padding: '14px 16px', fontWeight: 800, borderRight: '1px solid #cbd5e1' }}>1st IQA Count</th>
                        <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 800, borderRight: '1px solid #cbd5e1' }}>Description</th>
                        <th style={{ padding: '14px 16px', fontWeight: 800, borderRight: '1px solid #cbd5e1' }}>2nd IQA Count</th>
                        <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 800 }}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.qaErrors.map((row, idx) => (
                        <tr key={idx} style={{ background: idx % 2 === 0 ? '#f8fafc' : '#ffffff', borderBottom: idx < tableData.qaErrors.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                          <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0f172a', borderRight: '1px solid #cbd5e1' }}>{row.category}</td>
                          <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 700, color: '#ef4444', borderRight: '1px solid #cbd5e1' }}>{row.first}</td>
                          <td style={{ padding: '14px 16px', fontSize: '0.95rem', color: '#475569', borderRight: '1px solid #cbd5e1', whiteSpace: 'pre-wrap' }}>{row.firstDesc}</td>
                          <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 700, color: '#16a34a', borderRight: '1px solid #cbd5e1' }}>{row.second}</td>
                          <td style={{ padding: '14px 16px', fontSize: '0.95rem', color: '#475569', whiteSpace: 'pre-wrap' }}>{row.secondDesc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Incidents Table */}
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', marginBottom: '16px' }}>Incidents Comparison</h3>
                <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                        <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 800, borderRight: '1px solid #cbd5e1' }}>Period</th>
                        <th style={{ padding: '14px 16px', fontWeight: 800, borderRight: '1px solid #cbd5e1' }}>Count</th>
                        <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 800 }}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.incidents.map((row, idx) => (
                        <tr key={idx} style={{ background: idx % 2 === 0 ? '#f8fafc' : '#ffffff', borderBottom: idx < tableData.incidents.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                          <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0f172a', borderRight: '1px solid #cbd5e1' }}>{row.period}</td>
                          <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 700, color: row.period === 'Jan - Jun' ? '#ef4444' : '#16a34a', borderRight: '1px solid #cbd5e1' }}>{row.count}</td>
                          <td style={{ padding: '14px 16px', fontSize: '0.95rem', color: '#475569', whiteSpace: 'pre-wrap' }}>{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (obj07Qi1InfoModal) {
      return (
        <div
          onClick={() => {
            setObj07Qi1InfoModal(null);
            setObj07Qi1InfoSite(null);
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.55) 0%, rgba(30, 41, 59, 0.65) 100%)',
            backdropFilter: 'blur(14px) saturate(120%)',
            WebkitBackdropFilter: 'blur(14px) saturate(120%)',
            zIndex: 2000,
            padding: 0,
            margin: 0,
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100vw',
              height: '100vh',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.35)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Decorative Background */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
              animation: 'float 6s ease-in-out infinite'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-150px',
              left: '-150px',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(217,119,6,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
              animation: 'float 8s ease-in-out infinite reverse'
            }}></div>

            {/* Header */}
            <div style={{
              padding: '32px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid rgba(148,163,184,0.2)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  boxShadow: '0 10px 30px rgba(245,158,11,0.35), 0 0 0 3px rgba(245,158,11,0.1)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  🎓
                </div>
                <div>
                  <div style={{ 
                    fontSize: '1.3rem', 
                    color: '#64748b', 
                    fontWeight: 700, 
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>
                    Objective 07 • QI 1
                  </div>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 900, 
                    background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.5px'
                  }}>
                    {obj07Qi1InfoModal.site} Training Details
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setObj07Qi1InfoModal(null);
                  setObj07Qi1InfoSite(null);
                }}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: '#ffffff',
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(239,68,68,0.35)',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08) rotate(90deg)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(239,68,68,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(239,68,68,0.35)';
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div style={{ 
              flex: 1,
              overflow: 'auto', 
              padding: '40px', 
              position: 'relative',
              zIndex: 5
            }}>
              {/* Stats Banner */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px',
                marginBottom: '36px',
                animation: 'slideUp 0.5s ease-out'
              }}>
                <div style={{
                  padding: '24px',
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 10px 30px rgba(16,185,129,0.3)',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '1.3rem', opacity: 0.9, fontWeight: 700, marginBottom: '8px' }}>Total Sessions</div>
                  <div style={{ fontSize: '3.5rem', fontWeight: 900 }}>{obj07Qi1InfoModal.rows.length}</div>
                </div>
                <div style={{
                  padding: '24px',
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  boxShadow: '0 10px 30px rgba(59,130,246,0.3)',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '1.3rem', opacity: 0.9, fontWeight: 700, marginBottom: '8px' }}>Completed</div>
                  <div style={{ fontSize: '3.5rem', fontWeight: 900 }}>{obj07Qi1InfoModal.rows.filter(r => r.status === 'Completed').length}</div>
                </div>
                <div style={{
                  padding: '24px',
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  boxShadow: '0 10px 30px rgba(245,158,11,0.3)',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '1.3rem', opacity: 0.9, fontWeight: 700, marginBottom: '8px' }}>Pending</div>
                  <div style={{ fontSize: '3.5rem', fontWeight: 900 }}>{obj07Qi1InfoModal.rows.filter(r => r.status === 'Pending').length}</div>
                </div>
                <div style={{
                  padding: '24px',
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  boxShadow: '0 10px 30px rgba(139,92,246,0.3)',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '1.3rem', opacity: 0.9, fontWeight: 700, marginBottom: '8px' }}>In Progress / Scheduled</div>
                  <div style={{ fontSize: '3.5rem', fontWeight: 900 }}>{obj07Qi1InfoModal.rows.filter(r => r.status === 'In Progress' || r.status === 'Scheduled').length + 7}</div>
                </div>
              </div>

              {/* Training Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
                gap: '20px'
              }}>
                {obj07Qi1InfoModal.rows.map((row, idx) => {
                  const statusColors = {
                    'Completed': { bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', border: '#10b981', text: '#065f46', badge: '#10b981' },
                    'Pending': { bg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', border: '#94a3b8', text: '#0f172a', badge: '#94a3b8' },
                    'In Progress': { bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '#f59e0b', text: '#92400e', badge: '#f59e0b' },
                    'Scheduled': { bg: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', border: '#6366f1', text: '#3730a3', badge: '#6366f1' }
                  };
                  const scheme = statusColors[row.status] || statusColors['Pending'];
                  
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '24px',
                        borderRadius: '16px',
                        background: scheme.bg,
                        border: `3px solid ${scheme.border}`,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        cursor: 'pointer',
                        position: 'relative',
                        animation: `slideUp 0.5s ease-out ${idx * 0.05}s both`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                        e.currentTarget.style.boxShadow = `0 12px 30px ${scheme.border}30`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                      }}
                    >
                      {/* Status Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        padding: '8px 14px',
                        borderRadius: '10px',
                        background: scheme.badge,
                        color: '#ffffff',
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        boxShadow: `0 4px 10px ${scheme.badge}40`
                      }}>
                        {row.status}
                      </div>

                      <div style={{
                        fontSize: '1.9rem',
                        fontWeight: 900,
                        color: scheme.text,
                        marginBottom: '16px',
                        lineHeight: '1.3',
                        paddingRight: '120px'
                      }}>
                        {row.srNo ? `${row.srNo}. ${row.sopName}` : row.sopName}
                      </div>

                      <div style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: scheme.text,
                        marginBottom: '10px'
                      }}>
                        SOP Number: {row.sopNumber}
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                        marginTop: '8px'
                      }}>
                        <div style={{
                          padding: '12px 16px',
                          borderRadius: '10px',
                          background: '#ffffff',
                          border: `2px solid ${scheme.border}30`
                        }}>
                          <div style={{ fontSize: '1.05rem', color: scheme.text, opacity: 0.7, fontWeight: 700, marginBottom: '4px' }}>Revision</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: scheme.text }}>🌀 {row.revisionNumber}</div>
                        </div>
                        <div style={{
                          padding: '12px 16px',
                          borderRadius: '10px',
                          background: '#ffffff',
                          border: `2px solid ${scheme.border}30`
                        }}>
                          <div style={{ fontSize: '1.05rem', color: scheme.text, opacity: 0.7, fontWeight: 700, marginBottom: '4px' }}>Trainer</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: scheme.text }}>👤 {row.trainerName}</div>
                        </div>
                        <div style={{
                          padding: '12px 16px',
                          borderRadius: '10px',
                          background: '#ffffff',
                          border: `2px solid ${scheme.border}30`
                        }}>
                          <div style={{ fontSize: '1.05rem', color: scheme.text, opacity: 0.7, fontWeight: 700, marginBottom: '4px' }}>Date</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: scheme.text }}>📅 {row.date}</div>
                        </div>
                        <div style={{
                          padding: '12px 16px',
                          borderRadius: '10px',
                          background: '#ffffff',
                          border: `2px solid ${scheme.border}30`
                        }}>
                          <div style={{ fontSize: '1.05rem', color: scheme.text, opacity: 0.7, fontWeight: 700, marginBottom: '4px' }}>Time</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: scheme.text }}>⏰ {row.time}</div>
                        </div>
                      </div>

                      <div style={{
                        marginTop: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: '#ffffff',
                        border: `2px solid ${scheme.border}30`
                      }}>
                        <div style={{ fontSize: '1.05rem', color: scheme.text, opacity: 0.7, fontWeight: 700, marginBottom: '4px' }}>Remarks</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: scheme.text }}>📝 {row.remarks}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Check data types
    const isQI1 = data[0]?.totalEmployees !== undefined;
    const isQI2 = data[0]?.trainedLatestSOP !== undefined;
    const isQI3 = data[0]?.biweeklyChecks !== undefined;
    const isQI4 = data[0]?.metrics !== undefined;
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
      // Define gradient colors for each site
      const siteGradients = [
        { from: '#3b82f6', to: '#1d4ed8', accent: '#60a5fa', bg: '#eff6ff' }, // Blue
        { from: '#10b981', to: '#047857', accent: '#34d399', bg: '#ecfdf5' }, // Green
        { from: '#f59e0b', to: '#d97706', accent: '#fbbf24', bg: '#fffbeb' }  // Orange
      ];
      
      return (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '28px', 
          marginTop: '24px', 
          animation: 'fadeInUp 0.5s ease-out' 
        }}>
          {data.map((item, idx) => {
            const gradient = siteGradients[idx % siteGradients.length];
            const noTrainingPercentage = ((item.noTraining / item.totalEmployees) * 100).toFixed(1);
            
            return (
              <div 
                key={idx} 
                style={{
                  padding: '28px',
                  background: `linear-gradient(135deg, ${gradient.bg} 0%, #ffffff 100%)`,
                  borderRadius: '20px',
                  border: `3px solid ${gradient.from}30`,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)';
                }}
              >
                {/* Corner Decorative Element */}
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${gradient.accent}40 0%, transparent 70%)`,
                  borderRadius: '50%'
                }} />

                {/* Shimmer Effect Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent 0%, ${gradient.from}15 50%, transparent 100%)`,
                  animation: 'shimmer 3s infinite',
                  pointerEvents: 'none'
                }} />

                {/* Site Header Badge */}
                <div style={{ 
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                  borderRadius: '12px',
                  marginBottom: '20px',
                  boxShadow: `0 4px 12px ${gradient.from}40`
                }}>
                  <span style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: '0.5px'
                  }}>
                    {item.site}
                  </span>
                </div>

                {/* Total Employees Card */}
                <div style={{ 
                  padding: '16px 20px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  marginBottom: '24px',
                  border: `2px solid ${gradient.from}20`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.6rem', color: '#475569', fontWeight: 600 }}>Total Employees</span>
                    <span style={{ 
                      fontSize: '2.2rem', 
                      fontWeight: 900, 
                      background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {item.totalEmployees}
                    </span>
                  </div>
                </div>

                {/* No Training Status Card */}
                <div style={{
                  padding: '20px',
                  background: `linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)`,
                  borderRadius: '14px',
                  border: '2px solid #fee2e2',
                  marginBottom: '24px',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '1.7rem', fontWeight: 800, color: '#dc2626' }}>
                      No Training
                    </span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ef4444' }}>
                        {item.noTraining}
                      </span>
                      <span style={{ fontSize: '1.7rem', color: '#64748b', fontWeight: 700 }}>
                        ({noTrainingPercentage}%)
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div style={{
                    height: '14px',
                    background: '#fee2e2',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${noTrainingPercentage}%`,
                      background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
                      borderRadius: '999px',
                      transition: 'width 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 0 12px #ef444460',
                      position: 'relative'
                    }}>
                      {/* Animated shine effect */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                        animation: 'slideRight 2s infinite'
                      }} />
                    </div>
                  </div>
                </div>

                {/* Top 3 Errors Section */}
                {item.topErrors && (
                  <div style={{ 
                    padding: '20px',
                    background: '#ffffff',
                    borderRadius: '14px',
                    border: `2px solid ${gradient.from}20`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    <div style={{ 
                      fontSize: '1.7rem', 
                      fontWeight: 800, 
                      background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ 
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                        borderRadius: '50%'
                      }} />
                      Top 3 Errors:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {item.topErrors.map((errorItem, errIdx) => (
                        <div 
                          key={errIdx} 
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            padding: '12px 16px',
                            background: `linear-gradient(135deg, ${gradient.bg} 0%, #ffffff 100%)`,
                            borderRadius: '10px',
                            border: `1px solid ${gradient.from}20`,
                            transition: 'all 0.2s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `linear-gradient(135deg, ${gradient.from}15 0%, ${gradient.bg} 100%)`;
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `linear-gradient(135deg, ${gradient.bg} 0%, #ffffff 100%)`;
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: 600, 
                            color: '#1e293b',
                            flex: 1
                          }}>
                            {errorItem.error}
                          </span>
                          <span style={{ 
                            fontSize: '1.8rem', 
                            fontWeight: 900, 
                            background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            minWidth: '60px',
                            textAlign: 'right'
                          }}>
                            {errorItem.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      );
    }

    if (isQI2) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px', marginTop: '24px', animation: 'fadeInUp 0.5s ease-out' }}>
          {data.map((item, idx) => {
            const implementationStages = [
              { label: 'Trained on Latest SOP', value: item.trainedLatestSOP, icon: '📚', color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
              { label: 'Evaluation >80% Passed', value: item.evaluationPassed80, icon: '✓', color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
              { label: 'Retraining Provided', value: item.retrainingProvided, icon: '🔄', color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
              { label: 'Evaluation 100% Passed', value: item.evaluation100Passed, icon: '✓✓', color: '#059669', gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }
            ];

            const successRate = ((item.evaluation100Passed / item.trainedLatestSOP) * 100).toFixed(0);
            
            return (
              <div key={idx} style={{
                padding: '28px',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: `3px solid ${colors.primary}`,
                boxShadow: `0 12px 32px ${colors.primary}25`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Decorative corner accent */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 70%)`,
                  pointerEvents: 'none'
                }}></div>

                {/* Site Header with Badge Style */}
                <div style={{ 
                  display: 'inline-block',
                  fontSize: '1.8rem', 
                  fontWeight: 900, 
                  color: '#ffffff',
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                  padding: '12px 28px',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  boxShadow: `0 6px 20px ${colors.primary}40`,
                  position: 'relative',
                  zIndex: 1
                }}>
                  {item.site}
                </div>

                {/* Implementation Flow with Modern Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
                  {implementationStages.map((stage, stageIdx) => (
                    <div key={stageIdx} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '18px 14px',
                      background: stage.gradient,
                      borderRadius: '14px',
                      border: `2px solid ${stage.color}`,
                      boxShadow: `0 8px 20px ${stage.color}30`,
                      transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 12px 28px ${stage.color}45`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = `0 8px 20px ${stage.color}30`;
                    }}
                    >
                      {/* Shine effect */}
                      <div style={{
                        position: 'absolute',
                        top: '-2px',
                        left: '-2px',
                        right: '-2px',
                        height: '50%',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)',
                        borderRadius: '12px 12px 0 0',
                        pointerEvents: 'none'
                      }}></div>

                      <div style={{ 
                        fontSize: '2.2rem', 
                        marginBottom: '8px',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                      }}>
                        {stage.icon}
                      </div>
                      <div style={{ 
                        fontSize: '1.3rem', 
                        color: '#ffffff', 
                        fontWeight: 700, 
                        marginBottom: '8px',
                        textAlign: 'center',
                        lineHeight: '1.3',
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}>
                        {stage.label}
                      </div>
                      <div style={{ 
                        fontSize: '2.4rem', 
                        fontWeight: 900, 
                        color: '#ffffff',
                        textShadow: '0 3px 8px rgba(0,0,0,0.3)'
                      }}>
                        {stage.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Success Rate - Large Prominent Display */}
                <div style={{ 
                  padding: '20px',
                  background: `linear-gradient(135deg, #10b981 0%, #059669 100%)`,
                  borderRadius: '16px',
                  border: `3px solid #10b981`,
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Animated shimmer effect */}
                  <div style={{
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    right: '-2px',
                    height: '50%',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                    borderRadius: '14px 14px 0 0',
                    pointerEvents: 'none'
                  }}></div>

                  <div style={{ 
                    fontSize: '1.4rem', 
                    color: 'rgba(255,255,255,0.95)', 
                    fontWeight: 700, 
                    marginBottom: '8px',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}>
                    Implementation Success Rate
                  </div>
                  <div style={{ 
                    fontSize: '3.5rem', 
                    fontWeight: 900, 
                    color: '#ffffff',
                    textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    letterSpacing: '-1px'
                  }}>
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
      // Define gradient colors for each site
      const siteGradients = [
        { from: '#8b5cf6', to: '#6d28d9', accent: '#a78bfa', bg: '#faf5ff' }, // Purple
        { from: '#06b6d4', to: '#0891b2', accent: '#22d3ee', bg: '#ecfdf5' }, // Cyan
        { from: '#f97316', to: '#ea580c', accent: '#fed7aa', bg: '#fff7ed' }  // Orange
      ];

      return (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '28px', 
          marginTop: '24px', 
          animation: 'fadeInUp 0.5s ease-out' 
        }}>
          {data.map((item, idx) => {
            const gradient = siteGradients[idx % siteGradients.length];
            const hasBiweeklyData = item.biweeklyChecks?.some(
              (check) => check.status && check.status.toLowerCase() !== 'no data available'
            );

            return (
              <div 
                key={idx} 
                style={{
                  padding: '28px',
                  background: `linear-gradient(135deg, ${gradient.bg} 0%, #ffffff 100%)`,
                  borderRadius: '20px',
                  border: `3px solid ${gradient.from}30`,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)';
                }}
              >
                {/* Corner Decorative Element */}
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${gradient.accent}40 0%, transparent 70%)`,
                  borderRadius: '50%'
                }} />

                {/* Shimmer Effect Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent 0%, ${gradient.from}15 50%, transparent 100%)`,
                  animation: 'shimmer 3s infinite',
                  pointerEvents: 'none'
                }} />

                {/* Site Header Badge */}
                <div style={{ 
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                  borderRadius: '12px',
                  marginBottom: '20px',
                  boxShadow: `0 4px 12px ${gradient.from}40`
                }}>
                  <span style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: '0.5px'
                  }}>
                    {item.site}
                  </span>
                </div>

                {/* Title Section */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '24px',
                  padding: '16px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: `2px solid ${gradient.from}20`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <span style={{ fontSize: '2rem' }}>📅</span>
                  <div style={{
                    fontSize: '1.65rem',
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Biweekly Verification Checks
                  </div>
                </div>

                {/* Content Section */}
                {hasBiweeklyData ? (
                  <>
                    {/* Timeline of Checks */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                      {item.biweeklyChecks.map((check, checkIdx) => (
                        <div 
                          key={checkIdx} 
                          style={{
                            position: 'relative',
                            paddingLeft: '36px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          {/* Timeline Dot */}
                          <div style={{
                            position: 'absolute',
                            left: '8px',
                            top: '6px',
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                            border: '3px solid #ffffff',
                            boxShadow: `0 0 0 3px ${gradient.from}40`,
                            transition: 'all 0.2s ease'
                          }} />
                          
                          {/* Timeline Line */}
                          {checkIdx < item.biweeklyChecks.length - 1 && (
                            <div style={{
                              position: 'absolute',
                              left: '14px',
                              top: '24px',
                              width: '2px',
                              height: 'calc(100% + 10px)',
                              background: `linear-gradient(180deg, ${gradient.from}60 0%, ${gradient.from}10 100%)`
                            }}/>
                          )}

                          {/* Check Content */}
                          <div style={{
                            padding: '14px 16px',
                            background: `linear-gradient(135deg, ${gradient.bg} 0%, #ffffff 100%)`,
                            borderRadius: '12px',
                            border: `2px solid ${gradient.from}30`,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                          }}>
                            <div style={{ 
                              fontSize: '1.6rem', 
                              fontWeight: 800, 
                              background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              marginBottom: '6px'
                            }}>
                              {check.date}
                            </div>
                            <div style={{ 
                              fontSize: '1.5rem', 
                              color: '#1e293b',
                              lineHeight: '1.5',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px'
                            }}>
                              <span style={{ 
                                color: gradient.from,
                                fontWeight: 900,
                                marginTop: '2px'
                              }}>✓</span>
                              <span>{check.status}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Verification Status Badge */}
                    <div style={{
                      padding: '18px 22px',
                      background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                      borderRadius: '14px',
                      textAlign: 'center',
                      color: '#ffffff',
                      boxShadow: `0 6px 16px ${gradient.from}40`,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = `0 8px 24px ${gradient.from}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = `0 6px 16px ${gradient.from}40`;
                    }}>
                      <div style={{ fontSize: '1.4rem', marginBottom: '6px', opacity: 0.95, fontWeight: 600 }}>
                        Verification Status
                      </div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '0.3px' }}>
                        {item.site === 'Site V' ? (
                          <>🔴 Initiated 11 incidents</>
                        ) : item.site === 'Site III' ? (
                          <>✓ All Checks Passed</>
                        ) : (
                          <>⏳ Data not available yet</>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{
                    padding: '32px 24px',
                    background: `linear-gradient(135deg, ${gradient.bg} 0%, #ffffff 100%)`,
                    borderRadius: '14px',
                    border: `2px dashed ${gradient.from}40`,
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📊</div>
                    <div style={{
                      color: '#475569',
                      fontSize: '1.7rem',
                      fontWeight: 700,
                      lineHeight: '1.6'
                    }}>
                      Data not available yet.
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      );
    }

    // QI4 - Effectiveness
    if (isQI4) {
      // Define gradient colors for each site
      const siteGradients = [
        { from: '#ec4899', to: '#be185d', accent: '#f472b6', bg: '#fdf2f8' }, // Pink
        { from: '#06b6d4', to: '#0891b2', accent: '#22d3ee', bg: '#ecfdf5' }, // Cyan
        { from: '#f97316', to: '#ea580c', accent: '#fed7aa', bg: '#fff7ed' }  // Orange
      ];

      return (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '28px', 
          marginTop: '24px', 
          animation: 'fadeInUp 0.5s ease-out' 
        }}>
          {data.map((item, idx) => {
            const gradient = siteGradients[idx % siteGradients.length];
            const hasMetrics = item.metrics && item.metrics.length > 0;

            return (
              <div 
                key={idx} 
                style={{
                  padding: '28px',
                  background: `linear-gradient(135deg, ${gradient.bg} 0%, #ffffff 100%)`,
                  borderRadius: '20px',
                  border: `3px solid ${gradient.from}30`,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)';
                }}
              >
                {/* Corner Decorative Element */}
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${gradient.accent}40 0%, transparent 70%)`,
                  borderRadius: '50%'
                }} />

                {/* Shimmer Effect Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent 0%, ${gradient.from}15 50%, transparent 100%)`,
                  animation: 'shimmer 3s infinite',
                  pointerEvents: 'none'
                }} />

                {/* Site Header Badge */}
                <div style={{ 
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                  borderRadius: '12px',
                  marginBottom: '20px',
                  boxShadow: `0 4px 12px ${gradient.from}40`
                }}>
                  <span style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: '0.5px'
                  }}>
                    {item.site}
                  </span>
                </div>

                {/* Status Badge */}
                <div style={{
                  display: 'inline-block',
                  padding: '10px 18px',
                  background: hasMetrics ? `linear-gradient(135deg, #10b98120 0%, #10b98108 100%)` : `linear-gradient(135deg, #f5956020 0%, #f5956008 100%)`,
                  borderRadius: '10px',
                  marginBottom: '22px',
                  border: `2px solid ${hasMetrics ? '#10b98140' : '#f5956040'}`
                }}>
                  <span style={{ 
                    fontSize: '1.6rem', 
                    fontWeight: 800, 
                    background: `linear-gradient(135deg, ${hasMetrics ? '#10b981' : '#f59e0b'} 0%, ${hasMetrics ? '#047857' : '#d97706'} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {item.status}
                  </span>
                </div>

                {/* Metrics Section */}
                {hasMetrics ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {item.metrics.map((metric, metricIdx) => (
                      <div 
                        key={metricIdx}
                        style={{
                          padding: '16px',
                          background: '#ffffff',
                          borderRadius: '12px',
                          border: `2px solid ${metric.color}40`,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(4px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
                          e.currentTarget.style.borderColor = metric.color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                          e.currentTarget.style.borderColor = `${metric.color}40`;
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          marginBottom: '12px'
                        }}>
                          <span style={{ fontSize: '2rem' }}>{metric.icon}</span>
                          <div style={{
                            fontSize: '1.4rem',
                            fontWeight: 700,
                            color: '#1e293b',
                            lineHeight: '1.5',
                            flex: 1
                          }}>
                            {metric.label}
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '10px',
                          background: `${metric.color}15`,
                          borderRadius: '8px'
                        }}>
                          <span style={{
                            fontSize: '2.2rem',
                            fontWeight: 900,
                            color: metric.color
                          }}>
                            {metric.value}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    padding: '32px 24px',
                    background: `linear-gradient(135deg, ${gradient.bg} 0%, #ffffff 100%)`,
                    borderRadius: '14px',
                    border: `2px dashed ${gradient.from}40`,
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📋</div>
                    <div style={{
                      color: '#475569',
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      lineHeight: '1.6'
                    }}>
                      Data need to add
                    </div>
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
              <div style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 600, marginBottom: '4px' }}>
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
                  <div style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 600 }}>
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
          {data.map((item, idx) => {
            const isInfoOpen = item.site === 'Site III' && obj07Qi1InfoSite === item.site;
            const hasInfoData = item.site === 'Site III' && item.infoRows;
            
            return (
            <div key={idx} style={{
              padding: '24px',
              background: `linear-gradient(135deg, ${colors.primary}08 0%, #ffffff 100%)`,
              borderRadius: '16px',
              border: `2px solid ${colors.primary}30`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              position: 'relative'
            }}>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 800, 
                color: colors.primary, 
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: `2px solid ${colors.primary}20`,
                textAlign: 'center',
                position: 'relative'
              }}>
                {item.site}
                {hasInfoData && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setObj07Qi1InfoSite(isInfoOpen ? null : item.site);
                      setObj07Qi1InfoModal(isInfoOpen ? null : { site: item.site, rows: item.infoRows });
                    }}
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      border: `2px solid ${colors.primary}`,
                      background: isInfoOpen ? colors.primary : '#ffffff',
                      color: isInfoOpen ? '#ffffff' : colors.primary,
                      fontSize: '1.3rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      boxShadow: isInfoOpen ? `0 4px 12px ${colors.primary}35` : '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'serif'
                    }}
                    onMouseEnter={(e) => {
                      if (!isInfoOpen) {
                        e.currentTarget.style.background = colors.primary;
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.transform = 'scale(1.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isInfoOpen) {
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.color = colors.primary;
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                    title="View Site III training details"
                  >
                    i
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  padding: '18px',
                  background: `${colors.primary}10`,
                  borderRadius: '12px',
                  border: `1px solid ${colors.primary}30`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 600, marginBottom: '8px' }}>
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
                  <div style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 600, marginBottom: '8px' }}>
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
            );
          })}
        </div>
      );
    }

    if (isObj07QI2) {
      return (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px' }}>
            {data.map((item, idx) => {
              const metrics = [
                { label: '% Completion of Training', value: item.trainingCompletion, icon: '📚', color: '#3b82f6' },
                { label: '100% Evaluation of All Trainings', value: item.evaluation100, icon: '✓', color: '#10b981' },
                { label: 'Retraining & Evaluation', value: item.retrainingEvaluation, icon: '🔄', color: '#059669' }
              ];

              const isInfoOpen = item.site === 'Site III' && obj07Qi2InfoSite === item.site;
              const hasInfoData = item.site === 'Site III' && item.infoRows;

              return (
                <div key={idx} style={{
                  padding: '24px',
                  background: `linear-gradient(135deg, ${colors.primary}08 0%, #ffffff 100%)`,
                  borderRadius: '16px',
                  border: `2px solid ${colors.primary}30`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  position: 'relative'
                }}>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 800, 
                    color: colors.primary, 
                    marginBottom: '20px',
                    paddingBottom: '12px',
                    borderBottom: `2px solid ${colors.primary}20`,
                    textAlign: 'center',
                    position: 'relative'
                  }}>
                    {item.site}
                    {hasInfoData && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setObj07Qi2InfoSite(isInfoOpen ? null : item.site);
                          setObj07Qi2InfoModal(isInfoOpen ? null : { site: item.site, rows: item.infoRows });
                        }}
                        style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          border: `2px solid ${colors.primary}`,
                          background: isInfoOpen ? colors.primary : '#ffffff',
                          color: isInfoOpen ? '#ffffff' : colors.primary,
                          fontSize: '1.3rem',
                          fontWeight: 900,
                          cursor: 'pointer',
                          boxShadow: isInfoOpen ? `0 4px 12px ${colors.primary}35` : '0 2px 8px rgba(0,0,0,0.1)',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'serif'
                        }}
                        onMouseEnter={(e) => {
                          if (!isInfoOpen) {
                            e.currentTarget.style.background = colors.primary;
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.transform = 'scale(1.08)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isInfoOpen) {
                            e.currentTarget.style.background = '#ffffff';
                            e.currentTarget.style.color = colors.primary;
                            e.currentTarget.style.transform = 'scale(1)';
                          }
                        }}
                        title="View Site III training details"
                      >
                        i
                      </button>
                    )}
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
                          <div style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 600, marginBottom: '4px' }}>
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

          {obj07Qi2InfoModal && (
            <div
              onClick={() => {
                setObj07Qi2InfoModal(null);
                setObj07Qi2InfoSite(null);
              }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.55) 0%, rgba(30, 41, 59, 0.65) 100%)',
                backdropFilter: 'blur(14px) saturate(120%)',
                WebkitBackdropFilter: 'blur(14px) saturate(120%)',
                zIndex: 2000,
                padding: 0,
                margin: 0,
                animation: 'fadeIn 0.3s ease-out'
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100vw',
                  height: '100vh',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%)',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.35)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                {/* Decorative Background */}
                <div style={{
                  position: 'absolute',
                  top: '-100px',
                  right: '-100px',
                  width: '400px',
                  height: '400px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  animation: 'float 6s ease-in-out infinite'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '-150px',
                  left: '-150px',
                  width: '500px',
                  height: '500px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  animation: 'float 8s ease-in-out infinite reverse'
                }}></div>

                {/* Header */}
                <div style={{
                  padding: '32px 40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '2px solid rgba(148,163,184,0.2)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative',
                  zIndex: 10
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      boxShadow: '0 10px 30px rgba(59,130,246,0.35), 0 0 0 3px rgba(59,130,246,0.1)',
                      animation: 'pulse 2s ease-in-out infinite'
                    }}>
                      🎓
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '1.3rem', 
                        color: '#64748b', 
                        fontWeight: 700, 
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        marginBottom: '4px'
                      }}>
                        Objective 07 • QI 2
                      </div>
                      <div style={{ 
                        fontSize: '2.5rem', 
                        fontWeight: 900, 
                        background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '0.5px'
                      }}>
                        {obj07Qi2InfoModal.site} Training Details
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setObj07Qi2InfoModal(null);
                      setObj07Qi2InfoSite(null);
                    }}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      color: '#ffffff',
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      boxShadow: '0 8px 20px rgba(239,68,68,0.35)',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.08) rotate(90deg)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(239,68,68,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(239,68,68,0.35)';
                    }}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                {/* Content */}
                <div style={{ 
                  flex: 1,
                  overflow: 'auto', 
                  padding: '40px', 
                  position: 'relative',
                  zIndex: 5
                }}>
                  {/* Stats Banner */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '20px',
                    marginBottom: '36px',
                    animation: 'slideUp 0.5s ease-out'
                  }}>
                    <div style={{
                      padding: '24px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      boxShadow: '0 10px 30px rgba(16,185,129,0.3)',
                      color: '#ffffff'
                    }}>
                      <div style={{ fontSize: '1.3rem', opacity: 0.9, fontWeight: 700, marginBottom: '8px' }}>Total Sessions</div>
                      <div style={{ fontSize: '3.5rem', fontWeight: 900 }}>{obj07Qi2InfoModal.rows.length}</div>
                    </div>
                    <div style={{
                      padding: '24px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      boxShadow: '0 10px 30px rgba(59,130,246,0.3)',
                      color: '#ffffff'
                    }}>
                      <div style={{ fontSize: '1.3rem', opacity: 0.9, fontWeight: 700, marginBottom: '8px' }}>Completed</div>
                          <div style={{ fontSize: '3.5rem', fontWeight: 900 }}>{obj07Qi2InfoModal.rows.filter(r => r.status === 'Completed').length}</div>
                    </div>
                    <div style={{
                      padding: '24px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      boxShadow: '0 10px 30px rgba(245,158,11,0.3)',
                      color: '#ffffff'
                    }}>
                          <div style={{ fontSize: '1.3rem', opacity: 0.9, fontWeight: 700, marginBottom: '8px' }}>Pending</div>
                          <div style={{ fontSize: '3.5rem', fontWeight: 900 }}>{obj07Qi2InfoModal.rows.filter(r => r.status === 'Pending').length}</div>
                    </div>
                    <div style={{
                      padding: '24px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      boxShadow: '0 10px 30px rgba(139,92,246,0.3)',
                      color: '#ffffff'
                    }}>
                          <div style={{ fontSize: '1.3rem', opacity: 0.9, fontWeight: 700, marginBottom: '8px' }}>In Progress / Scheduled</div>
                          <div style={{ fontSize: '3.5rem', fontWeight: 900 }}>{obj07Qi2InfoModal.rows.filter(r => r.status === 'In Progress' || r.status === 'Scheduled').length + 7}</div>
                    </div>
                  </div>

                  {/* Training Cards */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
                    gap: '20px'
                  }}>
                    {obj07Qi2InfoModal.rows.map((row, idx) => {
                      const statusColors = {
                            'Completed': { bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', border: '#10b981', text: '#065f46', badge: '#10b981' },
                            'Pending': { bg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', border: '#94a3b8', text: '#0f172a', badge: '#94a3b8' },
                            'In Progress': { bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '#f59e0b', text: '#92400e', badge: '#f59e0b' },
                            'Scheduled': { bg: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', border: '#6366f1', text: '#3730a3', badge: '#6366f1' }
                      };
                          const scheme = statusColors[row.status] || statusColors['Pending'];
                      
                      return (
                        <div
                          key={idx}
                          style={{
                            padding: '24px',
                            borderRadius: '16px',
                            background: scheme.bg,
                            border: `3px solid ${scheme.border}`,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            cursor: 'pointer',
                            position: 'relative',
                            animation: `slideUp 0.5s ease-out ${idx * 0.05}s both`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                            e.currentTarget.style.boxShadow = `0 12px 30px ${scheme.border}30`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                          }}
                        >
                          {/* Status Badge */}
                          <div style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            padding: '8px 14px',
                            borderRadius: '10px',
                            background: scheme.badge,
                            color: '#ffffff',
                            fontSize: '1.1rem',
                            fontWeight: 800,
                            boxShadow: `0 4px 10px ${scheme.badge}40`
                          }}>
                            {row.status}
                          </div>

                          <div style={{
                            fontSize: '1.9rem',
                            fontWeight: 900,
                            color: scheme.text,
                            marginBottom: '16px',
                            lineHeight: '1.3',
                            paddingRight: '120px'
                          }}>
                            {row.srNo ? `${row.srNo}. ${row.sopName}` : row.sopName}
                          </div>

                          <div style={{
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: scheme.text,
                            marginBottom: '10px'
                          }}>
                            SOP Number: {row.sopNumber}
                          </div>

                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '12px',
                            marginTop: '8px'
                          }}>
                            <div style={{
                              padding: '12px 16px',
                              borderRadius: '10px',
                              background: '#ffffff',
                              border: `2px solid ${scheme.border}30`
                            }}>
                              <div style={{ fontSize: '1.05rem', color: scheme.text, opacity: 0.7, fontWeight: 700, marginBottom: '4px' }}>Revision</div>
                              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: scheme.text }}>🌀 {row.revisionNumber}</div>
                            </div>
                            <div style={{
                              padding: '12px 16px',
                              borderRadius: '10px',
                              background: '#ffffff',
                              border: `2px solid ${scheme.border}30`
                            }}>
                              <div style={{ fontSize: '1.05rem', color: scheme.text, opacity: 0.7, fontWeight: 700, marginBottom: '4px' }}>Trainer</div>
                              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: scheme.text }}>👤 {row.trainerName}</div>
                            </div>
                            <div style={{
                              padding: '12px 16px',
                              borderRadius: '10px',
                              background: '#ffffff',
                              border: `2px solid ${scheme.border}30`
                            }}>
                              <div style={{ fontSize: '1.05rem', color: scheme.text, opacity: 0.7, fontWeight: 700, marginBottom: '4px' }}>Date</div>
                              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: scheme.text }}>📅 {row.date}</div>
                            </div>
                            <div style={{
                              padding: '12px 16px',
                              borderRadius: '10px',
                              background: '#ffffff',
                              border: `2px solid ${scheme.border}30`
                            }}>
                              <div style={{ fontSize: '1.05rem', color: scheme.text, opacity: 0.7, fontWeight: 700, marginBottom: '4px' }}>Time</div>
                              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: scheme.text }}>⏰ {row.time}</div>
                            </div>
                            <div style={{
                              padding: '12px 16px',
                              borderRadius: '10px',
                              background: '#ffffff',
                              border: `2px solid ${scheme.border}30`,
                              gridColumn: 'span 2'
                            }}>
                              <div style={{ fontSize: '1.05rem', color: scheme.text, opacity: 0.7, fontWeight: 700, marginBottom: '4px' }}>Remarks</div>
                              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: scheme.text }}>📝 {row.remarks}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
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
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              position: 'relative'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                fontSize: '1.5rem', 
                fontWeight: 800, 
                color: colors.primary, 
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: `2px solid ${colors.primary}20`
              }}>
                <span style={{ flex: 1, textAlign: 'center' }}>{item.site}</span>
                {item.site === 'Site III' && item.infoRows && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const isOpen = obj07Qi3InfoSite === item.site;
                      setObj07Qi3InfoSite(isOpen ? null : item.site);
                      setObj07Qi3InfoModal(isOpen ? null : { 
                        site: item.site, 
                        rows: item.infoRows, 
                        errorDecrease: item.errorDecrease, 
                        staffInvolvement: item.staffInvolvement,
                        stats: item.infoStats
                      });
                    }}
                    style={{
                      minWidth: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      border: `2px solid ${colors.primary}50`,
                      background: obj07Qi3InfoSite === item.site ? `${colors.primary}15` : '#ffffff',
                      color: colors.primary,
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                      transition: 'all 0.2s ease'
                    }}
                    aria-label="Show Site III error details"
                  >
                    i
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Error Decrease */}
                <div style={{
                  padding: '20px',
                  background: 'linear-gradient(135deg, #ef444410 0%, #ffffff 100%)',
                  borderRadius: '12px',
                  border: '2px solid #ef444420',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setObj07Qi3ErrorDetailsModal(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setObj07Qi3ErrorDetailsModal(true);
                    }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#ef4444',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '0.9em',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.15)';
                      e.currentTarget.style.background = '#dc2626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = '#ef4444';
                    }}
                  >
                    ⓘ
                  </button>
                  <div style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
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
                  <div style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
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
          {data.map((item, idx) => {
            const isInfoOpen = item.site === 'Site III' && obj05Qi1InfoSite === item.site;

            return (
              <div key={idx} style={{
                padding: '24px',
                background: `linear-gradient(135deg, ${colors.primary}08 0%, #ffffff 100%)`,
                borderRadius: '16px',
                border: `2px solid ${colors.primary}30`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                position: 'relative'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  fontSize: '1.5rem', 
                  fontWeight: 800, 
                  color: colors.primary, 
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: `2px solid ${colors.primary}20`
                }}>
                  <span style={{ flex: 1, textAlign: 'center' }}>{item.site}</span>
                  {item.site === 'Site III' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setObj05Qi1InfoSite(isInfoOpen ? null : item.site);
                        if (item.infoRows) {
                          setObj05Qi1InfoModal(isInfoOpen ? null : { site: item.site, rows: item.infoRows });
                        }
                      }}
                      style={{
                        minWidth: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: `2px solid ${colors.primary}50`,
                        background: isInfoOpen ? `${colors.primary}15` : '#ffffff',
                        color: colors.primary,
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                        transition: 'all 0.2s ease'
                      }}
                      aria-label="Show process details"
                    >
                      i
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    padding: '18px',
                    background: `${colors.primary}10`,
                    borderRadius: '12px',
                    border: `1px solid ${colors.primary}30`,
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 600, marginBottom: '8px' }}>
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
                    <div style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 600, marginBottom: '8px' }}>
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

                {/* Info shown via modal only */}

              </div>
            );
          })}
          {obj05Qi1InfoModal && (
            <div
              onClick={() => {
                setObj05Qi1InfoModal(null);
                setObj05Qi1InfoSite(null);
              }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.95) 100%)',
                backdropFilter: 'blur(12px)',
                zIndex: 2000,
                padding: 0,
                margin: 0,
                animation: 'fadeIn 0.3s ease-out'
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100vw',
                  height: '100vh',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%)',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.35)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                {/* Decorative Background Elements */}
                <div style={{
                  position: 'absolute',
                  top: '-100px',
                  right: '-100px',
                  width: '400px',
                  height: '400px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  animation: 'float 6s ease-in-out infinite'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '-150px',
                  left: '-150px',
                  width: '500px',
                  height: '500px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  animation: 'float 8s ease-in-out infinite reverse'
                }}></div>

                {/* Glassmorphic Header */}
                <div style={{
                  padding: '32px 40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '2px solid rgba(148,163,184,0.2)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative',
                  zIndex: 10
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      boxShadow: '0 10px 30px rgba(59,130,246,0.35), 0 0 0 3px rgba(59,130,246,0.1)',
                      animation: 'pulse 2s ease-in-out infinite'
                    }}>
                      🔍
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '1.3rem', 
                        color: '#64748b', 
                        fontWeight: 700, 
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        marginBottom: '4px'
                      }}>
                        Objective 05 • QI 1
                      </div>
                      <div style={{ 
                        fontSize: '2.5rem', 
                        fontWeight: 900, 
                        background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '0.5px'
                      }}>
                        {obj05Qi1InfoModal.site} Process Mapping
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setObj05Qi1InfoModal(null);
                      setObj05Qi1InfoSite(null);
                    }}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      color: '#ffffff',
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      boxShadow: '0 8px 20px rgba(239,68,68,0.35)',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.08) rotate(90deg)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(239,68,68,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(239,68,68,0.35)';
                    }}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                {/* Scrollable Content */}
                <div style={{ 
                  flex: 1,
                  overflow: 'auto', 
                  padding: '40px', 
                  position: 'relative',
                  zIndex: 5
                }}>
                  {/* Stats Banner */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                    marginBottom: '36px',
                    animation: 'slideUp 0.5s ease-out'
                  }}>
                    <div style={{
                      padding: '24px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      boxShadow: '0 10px 30px rgba(59,130,246,0.3)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.15)',
                        pointerEvents: 'none'
                      }}></div>
                      <div style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.9)', fontWeight: 700, marginBottom: '8px' }}>
                        Total Processes
                      </div>
                      <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {obj05Qi1InfoModal.rows.length}
                        <span style={{ fontSize: '2rem', opacity: 0.8 }}>📊</span>
                      </div>
                    </div>
                    
                    <div style={{
                      padding: '24px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      boxShadow: '0 10px 30px rgba(16,185,129,0.3)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.15)',
                        pointerEvents: 'none'
                      }}></div>
                      <div style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.9)', fontWeight: 700, marginBottom: '8px' }}>
                        Unique Products
                      </div>
                      <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {[...new Set(obj05Qi1InfoModal.rows.map(r => r.product))].length}
                        <span style={{ fontSize: '2rem', opacity: 0.8 }}>🏭</span>
                      </div>
                    </div>
                    
                    <div style={{
                      padding: '24px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      boxShadow: '0 10px 30px rgba(245,158,11,0.3)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.15)',
                        pointerEvents: 'none'
                      }}></div>
                      <div style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.9)', fontWeight: 700, marginBottom: '8px' }}>
                        Production Stages
                      </div>
                      <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {[...new Set(obj05Qi1InfoModal.rows.map(r => r.stage))].length}
                        <span style={{ fontSize: '2rem', opacity: 0.8 }}>⚙️</span>
                      </div>
                    </div>
                  </div>

                  {/* Process Groups with Cards */}
                  {(() => {
                    const processGroups = {};
                    obj05Qi1InfoModal.rows.forEach(row => {
                      if (!processGroups[row.process]) {
                        processGroups[row.process] = [];
                      }
                      processGroups[row.process].push(row);
                    });

                    const groupColors = [
                      { bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '#3b82f6', text: '#1e40af', icon: '🔧' },
                      { bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', border: '#10b981', text: '#065f46', icon: '⚡' },
                      { bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '#f59e0b', text: '#92400e', icon: '🎯' },
                      { bg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', border: '#ec4899', text: '#9f1239', icon: '🚀' },
                      { bg: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', border: '#6366f1', text: '#3730a3', icon: '💎' }
                    ];

                    return Object.entries(processGroups).map(([process, items], groupIdx) => {
                      const colorScheme = groupColors[groupIdx % groupColors.length];
                      
                      return (
                        <div 
                          key={groupIdx} 
                          style={{
                            marginBottom: '32px',
                            animation: `slideUp 0.5s ease-out ${groupIdx * 0.1}s both`
                          }}
                        >
                          {/* Group Header */}
                          <div style={{
                            padding: '20px 28px',
                            borderRadius: '16px 16px 0 0',
                            background: colorScheme.bg,
                            border: `3px solid ${colorScheme.border}`,
                            borderBottom: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: `0 4px 12px ${colorScheme.border}20`
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.8rem',
                                boxShadow: `0 4px 12px ${colorScheme.border}30`,
                                border: `2px solid ${colorScheme.border}`
                              }}>
                                {colorScheme.icon}
                              </div>
                              <div>
                                <div style={{ 
                                  fontSize: '1.9rem', 
                                  fontWeight: 900, 
                                  color: colorScheme.text,
                                  letterSpacing: '0.3px'
                                }}>
                                  {process}
                                </div>
                                <div style={{ fontSize: '1.2rem', color: colorScheme.text, opacity: 0.75, fontWeight: 700, marginTop: '2px' }}>
                                  {items.length} stage{items.length !== 1 ? 's' : ''} identified
                                </div>
                              </div>
                            </div>
                            <div style={{
                              padding: '10px 18px',
                              borderRadius: '12px',
                              background: '#ffffff',
                              border: `2px solid ${colorScheme.border}`,
                              fontWeight: 900,
                              fontSize: '1.3rem',
                              color: colorScheme.text,
                              boxShadow: `0 4px 12px ${colorScheme.border}25`
                            }}>
                              {items.length} ITEMS
                            </div>
                          </div>

                          {/* Group Cards */}
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                            gap: '16px',
                            padding: '24px',
                            background: '#ffffff',
                            borderRadius: '0 0 16px 16px',
                            border: `3px solid ${colorScheme.border}`,
                            borderTop: 'none',
                            boxShadow: `0 10px 30px ${colorScheme.border}15`
                          }}>
                            {items.map((item, itemIdx) => (
                              <div
                                key={itemIdx}
                                style={{
                                  padding: '20px',
                                  borderRadius: '14px',
                                  background: colorScheme.bg,
                                  border: `2px solid ${colorScheme.border}40`,
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                  cursor: 'pointer',
                                  position: 'relative',
                                  overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                                  e.currentTarget.style.boxShadow = `0 12px 30px ${colorScheme.border}30`;
                                  e.currentTarget.style.borderColor = colorScheme.border;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                                  e.currentTarget.style.borderColor = `${colorScheme.border}40`;
                                }}
                              >
                                <div style={{
                                  position: 'absolute',
                                  top: '8px',
                                  right: '8px',
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '8px',
                                  background: colorScheme.border,
                                  color: '#ffffff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '1rem',
                                  fontWeight: 900,
                                  boxShadow: `0 4px 10px ${colorScheme.border}40`
                                }}>
                                  {itemIdx + 1}
                                </div>
                                
                                <div style={{ marginBottom: '12px' }}>
                                  <div style={{ fontSize: '1.1rem', color: colorScheme.text, fontWeight: 700, opacity: 0.7, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                                    Product Line
                                  </div>
                                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: colorScheme.text, lineHeight: '1.4' }}>
                                    {item.product}
                                  </div>
                                </div>
                                
                                <div style={{
                                  padding: '14px 16px',
                                  borderRadius: '10px',
                                  background: '#ffffff',
                                  border: `2px solid ${colorScheme.border}30`,
                                  marginTop: '12px'
                                }}>
                                  <div style={{ fontSize: '1rem', color: colorScheme.text, fontWeight: 700, opacity: 0.7, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                                    Manufacturing Stage
                                  </div>
                                  <div style={{ 
                                    fontSize: '1.45rem', 
                                    fontWeight: 800, 
                                    color: colorScheme.text,
                                    lineHeight: '1.4',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                  }}>
                                    <span style={{ color: colorScheme.border, fontSize: '1.2rem' }}>▸</span>
                                    {item.stage}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Objective 05 QI2 - Training and Evaluation
    if (isObj05QI2) {
      return (
        <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px' }}>
          {data.map((item, idx) => {
            const trainingStages = [
              { label: 'Training planner and execution', value: item.trainingPlannerAndExecution, icon: '📋', color: '#3b82f6' },
              { label: 'Training of IPQA on defect recognition and RC analysis', value: item.trainingOfIPQAOnDefectRecognitionAndRCAnalysis, icon: '🔍', color: '#10b981' },
              { label: 'Evaluation of post training', value: item.evaluationOfPostTraining, icon: '✓', color: '#10b981' },
              { label: 'Retraining or refresher training planner', value: item.retrainingOrRefresherTrainingPlanner, icon: '🔄', color: '#f59e0b' }
            ];

            const avgCompliance = Math.round((item.trainingPlannerAndExecution + item.trainingOfIPQAOnDefectRecognitionAndRCAnalysis + item.evaluationOfPostTraining + item.retrainingOrRefresherTrainingPlanner) / 4);
            const isInfoOpen = item.site === 'Site III' && obj05Qi2InfoSite === item.site;
            const hasInfoData = item.site === 'Site III' && item.infoRows;
            
            return (
              <div key={idx} style={{
                padding: '24px',
                background: `linear-gradient(135deg, ${colors.primary}08 0%, #ffffff 100%)`,
                borderRadius: '16px',
                border: `2px solid ${colors.primary}30`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                position: 'relative'
              }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 800, 
                  color: colors.primary, 
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: `2px solid ${colors.primary}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}>
                  {item.site}
                  {hasInfoData && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setObj05Qi2InfoSite(isInfoOpen ? null : item.site);
                        setObj05Qi2InfoModal(isInfoOpen ? null : { site: item.site, rows: item.infoRows });
                      }}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: `2px solid ${colors.primary}`,
                        background: isInfoOpen ? colors.primary : '#ffffff',
                        color: isInfoOpen ? '#ffffff' : colors.primary,
                        fontSize: '1.4rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        boxShadow: isInfoOpen ? `0 4px 12px ${colors.primary}40` : '0 2px 8px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'serif'
                      }}
                      onMouseEnter={(e) => {
                        if (!isInfoOpen) {
                          e.currentTarget.style.background = colors.primary;
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isInfoOpen) {
                          e.currentTarget.style.background = '#ffffff';
                          e.currentTarget.style.color = colors.primary;
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                      title="View training schedule & details"
                    >
                      i
                    </button>
                  )}
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
                        <div style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 600, marginBottom: '2px' }}>
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
        {obj05Qi2InfoModal && (
          <div
            onClick={() => {
              setObj05Qi2InfoModal(null);
              setObj05Qi2InfoSite(null);
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.95) 100%)',
              backdropFilter: 'blur(12px)',
              zIndex: 2000,
              padding: 0,
              margin: 0,
              animation: 'fadeIn 0.3s ease-out'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.35)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Decorative Background */}
              <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
                animation: 'float 6s ease-in-out infinite'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-150px',
                left: '-150px',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
                animation: 'float 8s ease-in-out infinite reverse'
              }}></div>

              {/* Header */}
              <div style={{
                padding: '32px 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid rgba(148,163,184,0.2)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                zIndex: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    boxShadow: '0 10px 30px rgba(16,185,129,0.35), 0 0 0 3px rgba(16,185,129,0.1)',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}>
                    📚
                  </div>
                  <div>
                    <div style={{ 
                      fontSize: '1.3rem', 
                      color: '#64748b', 
                      fontWeight: 700, 
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      marginBottom: '4px'
                    }}>
                      Objective 05 • QI 2
                    </div>
                    <div style={{ 
                      fontSize: '2.5rem', 
                      fontWeight: 900, 
                      background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '0.5px'
                    }}>
                      {obj05Qi2InfoModal.site} Training Schedule
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setObj05Qi2InfoModal(null);
                    setObj05Qi2InfoSite(null);
                  }}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: '#ffffff',
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(239,68,68,0.35)',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08) rotate(90deg)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(239,68,68,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(239,68,68,0.35)';
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div style={{ 
                flex: 1,
                overflow: 'auto', 
                padding: '40px', 
                position: 'relative',
                zIndex: 5
              }}>
                {/* Stats Banner */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '20px',
                  marginBottom: '36px',
                  animation: 'slideUp 0.5s ease-out'
                }}>
                  <div style={{
                    padding: '24px',
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    boxShadow: '0 10px 30px rgba(16,185,129,0.3)',
                    color: '#ffffff'
                  }}>
                    <div style={{ fontSize: '1.3rem', opacity: 0.9, fontWeight: 700, marginBottom: '8px' }}>Total Sessions</div>
                    <div style={{ fontSize: '3.5rem', fontWeight: 900 }}>{obj05Qi2InfoModal.rows.length}</div>
                  </div>
                  <div style={{
                    padding: '24px',
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    boxShadow: '0 10px 30px rgba(59,130,246,0.3)',
                    color: '#ffffff'
                  }}>
                    <div style={{ fontSize: '1.3rem', opacity: 0.9, fontWeight: 700, marginBottom: '8px' }}>Completed</div>
                    <div style={{ fontSize: '3.5rem', fontWeight: 900 }}>{obj05Qi2InfoModal.rows.filter(r => r.status === 'Completed').length}</div>
                  </div>
                  <div style={{
                    padding: '24px',
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    boxShadow: '0 10px 30px rgba(245,158,11,0.3)',
                    color: '#ffffff'
                  }}>
                    <div style={{ fontSize: '1.3rem', opacity: 0.9, fontWeight: 700, marginBottom: '8px' }}>In Progress</div>
                    <div style={{ fontSize: '3.5rem', fontWeight: 900 }}>{obj05Qi2InfoModal.rows.filter(r => r.status === 'In Progress').length}</div>
                  </div>
                  <div style={{
                    padding: '24px',
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    boxShadow: '0 10px 30px rgba(139,92,246,0.3)',
                    color: '#ffffff'
                  }}>
                    <div style={{ fontSize: '1.3rem', opacity: 0.9, fontWeight: 700, marginBottom: '8px' }}>Scheduled</div>
                    <div style={{ fontSize: '3.5rem', fontWeight: 900 }}>{obj05Qi2InfoModal.rows.filter(r => r.status === 'Scheduled').length}</div>
                  </div>
                </div>

                {/* Training Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
                  gap: '20px'
                }}>
                  {obj05Qi2InfoModal.rows.map((row, idx) => {
                    const statusColors = {
                      'Completed': { bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', border: '#10b981', text: '#065f46', badge: '#10b981' },
                      'In Progress': { bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '#f59e0b', text: '#92400e', badge: '#f59e0b' },
                      'Scheduled': { bg: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', border: '#6366f1', text: '#3730a3', badge: '#6366f1' }
                    };
                    const scheme = statusColors[row.status];
                    
                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '24px',
                          borderRadius: '16px',
                          background: scheme.bg,
                          border: `3px solid ${scheme.border}`,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          cursor: 'pointer',
                          position: 'relative',
                          animation: `slideUp 0.5s ease-out ${idx * 0.05}s both`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                          e.currentTarget.style.boxShadow = `0 12px 30px ${scheme.border}30`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                        }}
                      >
                        {/* Status Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          padding: '8px 14px',
                          borderRadius: '10px',
                          background: scheme.badge,
                          color: '#ffffff',
                          fontSize: '1.1rem',
                          fontWeight: 800,
                          boxShadow: `0 4px 10px ${scheme.badge}40`
                        }}>
                          {row.status}
                        </div>

                        <div style={{
                          fontSize: '1.9rem',
                          fontWeight: 900,
                          color: scheme.text,
                          marginBottom: '16px',
                          lineHeight: '1.3',
                          paddingRight: '120px'
                        }}>
                          {row.training}
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '12px',
                          marginTop: '16px'
                        }}>
                          <div style={{
                            padding: '12px 16px',
                            borderRadius: '10px',
                            background: '#ffffff',
                            border: `2px solid ${scheme.border}30`
                          }}>
                            <div style={{ fontSize: '1.05rem', color: scheme.text, opacity: 0.7, fontWeight: 700, marginBottom: '4px' }}>Duration</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: scheme.text }}>📅 {row.duration}</div>
                          </div>
                          <div style={{
                            padding: '12px 16px',
                            borderRadius: '10px',
                            background: '#ffffff',
                            border: `2px solid ${scheme.border}30`
                          }}>
                            <div style={{ fontSize: '1.05rem', color: scheme.text, opacity: 0.7, fontWeight: 700, marginBottom: '4px' }}>Participants</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: scheme.text }}>👥 {row.participants}</div>
                          </div>
                          <div style={{
                            padding: '12px 16px',
                            borderRadius: '10px',
                            background: scheme.badge,
                            gridColumn: 'span 2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}>
                            <div style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 700 }}>📆 Scheduled:</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>{row.date}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
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
                        <div style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 600, marginBottom: '2px' }}>
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
                        <div style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 600 }}>
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
              <span style={{ fontSize: '1.5rem', color: '#0f172a' }}>Performance</span>
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
    <section data-state="quality-objectives" style={{ padding: '60px 24px', background: 'linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 25%, #fef3c7 50%, #fef2f2 75%, #f0f9ff 100%)', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', boxSizing: 'border-box', overflow: 'visible' }}>
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
          <div style={{ fontSize: '2.1rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
            💡 Click a card to open the data
          </div>
          <div style={{ fontSize: '1.5rem', color: '#cbd5e1', fontWeight: 500 }}>
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
            padding: '100px 60px 60px',
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
              maxWidth: '100%',
              width: '100%',
              margin: '0 auto',
              fontSize: '1.65rem',
              lineHeight: 1.6
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
                  <div style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.25 }}>Objective 04</div>
                  <div style={{ fontSize: '2.1rem', fontWeight: 700, marginTop: '12px', lineHeight: 1.55 }}>
                    Reduce Good Documentation Practices (GDP) related Nonconformities and incidents by 50%
                  </div>
                </div>

                {/* QI Buttons */}
                <div style={{ display: 'flex', gap: '18px', marginBottom: '28px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {objective4Flow.map((qiItem, index) => renderQIButton(qiItem, index, '04'))}
                </div>

                {/* Site Data Cards */}
                {activeModals.qi04 !== null ? (
                  <div style={{ animation: 'slideIn 0.4s ease-out' }}>
                    {renderSiteCards(qiDataMap[activeModals.qi04], { primary: '#667eea', accent: '#764ba2', light: '#f3f0ff' })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#0f172a', padding: '12px 0', fontSize: '1.4rem', fontWeight: 700 }}>
                    Select a QI to view site-wise details.
                  </div>
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
                  <div style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.25 }}>Objective 05</div>
                  <div style={{ fontSize: '2.1rem', fontWeight: 700, marginTop: '12px', lineHeight: 1.55 }}>
                    To reduce the number of In-process and final product defects through stringent IPQA verification and proactive defect prevention.
                  </div>
                </div>

                {/* QI Buttons */}
                <div style={{ display: 'flex', gap: '18px', marginBottom: '28px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {objective5Flow.map((qiItem, index) => renderQIButton(qiItem, index, '05'))}
                </div>

                {/* Site Data Cards */}
                {activeModals.qi05 !== null ? (
                  <div style={{ animation: 'slideIn 0.4s ease-out' }}>
                    {renderSiteCards(obj05_qiDataMap[activeModals.qi05], { primary: '#059669', accent: '#047857', light: '#ecfdf5' })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#0f172a', padding: '12px 0', fontSize: '1.4rem', fontWeight: 700 }}>
                    Select a QI to view site-wise details.
                  </div>
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
                  <div style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.25 }}>Objective 06</div>
                  <div style={{ fontSize: '2.1rem', fontWeight: 700, marginTop: '12px', lineHeight: 1.55 }}>
                    Digitalization of quality management system to improve efficiency, data integrity, traceability, real-time monitoring and compliance with regulatory
                  </div>
                </div>

                {/* QI Buttons */}
                <div style={{ display: 'flex', gap: '18px', marginBottom: '28px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {objective6Flow.map((qiItem, index) => renderQIButton(qiItem, index, '06'))}
                </div>

                {/* Site Data Cards */}
                {activeModals.qi06 !== null ? (
                  <div style={{ animation: 'slideIn 0.4s ease-out' }}>
                    {renderSiteCards(obj06_qiDataMap[activeModals.qi06], { primary: '#0ea5e9', accent: '#06b6d4', light: '#ecf0ff' })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#0f172a', padding: '12px 0', fontSize: '1.4rem', fontWeight: 700 }}>
                    Select a QI to view details.
                  </div>
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
                  <div style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.25 }}>Objective 07</div>
                  <div style={{ fontSize: '2.1rem', fontWeight: 700, marginTop: '12px', lineHeight: 1.55 }}>
                    Enhance the competency autonomy and engagement of QA staff to improve overall quality system performance and compliance
                  </div>
                </div>

                {/* QI Buttons */}
                <div style={{ display: 'flex', gap: '18px', marginBottom: '28px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {objective7Flow.map((qiItem, index) => renderQIButton(qiItem, index, '07'))}
                </div>

                {/* Site Data Cards */}
                {activeModals.qi07 !== null ? (
                  <div style={{ animation: 'slideIn 0.4s ease-out' }}>
                    {renderSiteCards(obj07_qiDataMap[activeModals.qi07], { primary: '#f59e0b', accent: '#d97706', light: '#fff7ed' })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#0f172a', padding: '12px 0', fontSize: '1.4rem', fontWeight: 700 }}>
                    Select a QI to view site-wise details.
                  </div>
                )}
              </>
            )}


            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default QualityObjectives_v2;





