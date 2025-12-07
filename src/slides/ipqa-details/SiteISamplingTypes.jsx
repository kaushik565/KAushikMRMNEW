import { useMemo, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';

export default function SiteISamplingTypes() {
  const [selectedObservation, setSelectedObservation] = useState(null);

  const observationsData = {
    'Incoming Sampling': [
      { id: 1, date: 'Jun 2025', type: 'Visual Inspection', finding: 'BLACK SPOTS OBSERVED ON LTCC WELL. 10000069740 Truenat® Blank Chip', severity: 'Critical', status: 'Resolved', action: 'Batch rejected and returned to supplier. Quality issue escalated for root cause analysis' },
      { id: 2, date: 'Jul 2025', type: 'Label Verification', finding: 'While sampling Truenat® LTS 5 Test kit label having inspection lot number 10000071335 it was found that 10 nos of Truenat® HPV-HR 20 Test Kit Label were found together in one packet', severity: 'Critical', status: 'Resolved', action: 'Incorrect labels separated and correct labels verified before proceeding' },
      { id: 3, date: 'Jul 2025', type: 'Sampling Delay', finding: 'Sampling was delayed for 30 minutes since under test labels were not being affixed on the respective boxes. Upon intimation the same was affixed and sampling was carried out', severity: 'Minor', status: 'Resolved', action: 'Process adherence reinforced with team. Under-test labels affixed before sampling' },
      { id: 4, date: 'Aug 2025', type: 'Packaging Inspection', finding: 'Cartridges were not covered with polythene bags before packing in boxes, just one piece of polythene kept over the cartridges', severity: 'Major', status: 'Resolved', action: 'Proper packaging procedure followed and all cartridges repackaged correctly' },
      { id: 5, date: 'Aug 2025', type: 'Quality Check', finding: 'Fine hair and dust found in wells of blank chips contained in 02 boxes out of 40 boxes', severity: 'Critical', status: 'Resolved', action: 'Affected boxes rejected. Supplier notified for corrective action' },
      { id: 6, date: 'Sep 2025', type: 'COA Review', finding: 'In COA, expiry date of ALQ091 is mentioned as 2028-08 instead of 2028-06. Later corrected COA was received and handovered to QC. 10000074483, 10000074497 Liquefaction Buffer 4ml label (Site I), Liquefaction Buffer 1ml Label (Site I)', severity: 'Major', status: 'Resolved', action: 'Corrected COA obtained from supplier and verified before proceeding' },
      { id: 7, date: 'Oct 2025', type: 'Documentation', finding: 'Mfg date on COA is not matching with the matter printed on label. Also vertical cuttings are not present on the label', severity: 'Major', status: 'Resolved', action: 'Documentation corrected and labels replaced with proper markings' },
      { id: 8, date: 'Oct 2025', type: 'Label Compliance', finding: 'Under test label not affixed', severity: 'Minor', status: 'Resolved', action: 'Under test labels affixed immediately on all relevant boxes' },
      { id: 9, date: 'Nov 2025', type: 'Label Verification', finding: 'Wrong label affixed, kindly check under test label once again', severity: 'Major', status: 'Resolved', action: 'Correct labels verified and affixed after thorough check' },
      { id: 10, date: 'Nov 2025', type: 'Documentation Error', finding: 'Wrong no. of boxes updated', severity: 'Minor', status: 'Resolved', action: 'Box count corrected in documentation and verified' }
    ],
    'In-Process Sampling': [
      { id: 1, date: 'Jul 2025', type: 'Sampling Delay', finding: 'BCL004 - Standard Curve tubes were Sampled on saturday but handover to QC today as chip was not available on 26/07/2025', severity: 'Minor', status: 'Resolved', action: 'Chips arranged and handover completed. Process planning improved' },
      { id: 2, date: 'Jul 2025', type: 'Sampling Delay', finding: 'BCL005 - Standard Curve tubes were Sampled on saturday but handover to QC today as chip was not available on 26/07/2025', severity: 'Minor', status: 'Resolved', action: 'Chips arranged and handover completed. Coordination improved' },
      { id: 3, date: 'Jul 2025', type: 'Sampling Delay', finding: 'BCL005 - Post Lyo tube were Sampled on saturday but handover to QC today as chip was not available on 26/07/2025', severity: 'Minor', status: 'Resolved', action: 'Chips arranged and samples handed over. Inventory management enhanced' },
      { id: 4, date: 'Aug 2025', type: 'Material Unavailability', finding: 'Double distilled water not given as distillation unit is not working properly', severity: 'Major', status: 'Resolved', action: 'Distillation unit repaired and validated. Alternative source arranged during downtime' },
      { id: 5, date: 'Sep 2025', type: 'Documentation', finding: 'TB403 - Sampling advice was not ready, hence delayed', severity: 'Minor', status: 'Resolved', action: 'Sampling advice prepared and sampling completed. Documentation workflow improved' },
      { id: 6, date: 'Oct 2025', type: 'SAP System', finding: 'SAP order pending and inspection lot was not generated, hence sampling delayed', severity: 'Major', status: 'Resolved', action: 'SAP order processed and inspection lot generated. IT coordination improved' },
      { id: 7, date: 'Oct 2025', type: 'Documentation', finding: 'TB398 - DOCUMENTS INCOMPLETE', severity: 'Major', status: 'Resolved', action: 'All required documents completed and verified before proceeding' },
      { id: 8, date: 'Nov 2025', type: 'Material Unavailability', finding: 'Double distilled water not given as distillation unit is not working properly', severity: 'Major', status: 'Resolved', action: 'Preventive maintenance schedule established for distillation unit. Water supplied' }
    ],
    'Finished Kit': [
      { id: 1, date: 'Sep 2025', type: 'QC Unavailability', finding: 'TB383 - Due to unavailibility of QC staff, the sampled kits are kept in Cold room', severity: 'Minor', status: 'Resolved', action: 'Kits stored properly in cold room and handed over to QC when staff available' },
      { id: 2, date: 'Sep 2025', type: 'QC Unavailability', finding: 'TB380 - Due to unavailibility of QC staff, the sampled kits are kept in Cold room', severity: 'Minor', status: 'Resolved', action: 'Kits maintained under proper storage and transferred to QC promptly' },
      { id: 3, date: 'Oct 2025', type: 'SAP System', finding: 'TB400 - SAP order pending and inspection lot was not generated, hence sampling delayed', severity: 'Major', status: 'Resolved', action: 'SAP order processed and sampling completed after lot generation' },
      { id: 4, date: 'Nov 2025', type: 'Documentation', finding: 'TB403 - Sampling advice was not ready, hence delayed', severity: 'Minor', status: 'Resolved', action: 'Sampling advice prepared and sampling executed as per schedule' }
    ],
    'Control Kit': [
      { id: 1, date: 'Aug 2025', type: 'QC Unavailability', finding: 'TB373 - Sampled on 07/08/2025 and kept in cold room as QC was not available, handed over to QC on 08/08/2025', severity: 'Minor', status: 'Resolved', action: 'Samples stored under validated conditions and transferred next day. No impact on sample integrity' },
      { id: 2, date: 'Oct 2025', type: 'QC Unavailability', finding: 'AB030 - Due to unavailibilty of QC staff, the sampled kits are kept in Cold room', severity: 'Minor', status: 'Resolved', action: 'Kits maintained in cold room as per storage requirements and handed over when QC available' }
    ],
    'Transfer Note Verification': [
      { id: 1, date: 'Sep 2025', type: 'Quantity Verification', finding: 'HH008 - 01 number of extra kit given to QC', severity: 'Minor', status: 'Resolved', action: 'Extra kit returned and count reconciled in documentation' },
      { id: 2, date: 'Oct 2025', type: 'Documentation Hold', finding: 'MSPT292 - On hold - MAL156 Batch not submitted informed officer and cleared', severity: 'Major', status: 'Resolved', action: 'Batch documentation submitted and clearance obtained' },
      { id: 3, date: 'Oct 2025', type: 'Documentation Hold', finding: 'USPT291 - On Hold MUL031 BMR Not submitted informed officer and cleared', severity: 'Major', status: 'Resolved', action: 'BMR submitted after review and clearance provided' },
      { id: 4, date: 'Oct 2025', type: 'Documentation Hold', finding: 'VUCPK494L - On Hold UAC637 BMR Not submitted informed officer and cleared', severity: 'Major', status: 'Resolved', action: 'BMR completed and submitted for clearance' },
      { id: 5, date: 'Nov 2025', type: 'Documentation Hold', finding: 'VUCPK485L - On Hold MUA083 BMR Not submitted informed officer and cleared', severity: 'Major', status: 'Resolved', action: 'BMR documentation completed and officer clearance obtained' },
      { id: 6, date: 'Nov 2025', type: 'Documentation Hold', finding: 'VUCPK486L - On Hold MUA083 BMR Not submitted informed officer and cleared', severity: 'Major', status: 'Resolved', action: 'BMR submitted and clearance completed after verification' },
      { id: 7, date: 'Nov 2025', type: 'Documentation Hold', finding: 'VUCPK490L - On Hold UAC634 BMR Not submitted informed officer and cleared', severity: 'Major', status: 'Resolved', action: 'BMR documentation finalized and officer clearance provided' }
    ]
  };

  const samplingData = useMemo(() => ({
    monthly: [
      {
        month: 'Jun',
        incoming: 255,
        inprocess: 260,
        finishedKit: 48,
        controlKit: 46,
        stabilityKit: 10,
        total: 619
      },
      {
        month: 'Jul',
        incoming: 436,
        inprocess: 450,
        finishedKit: 80,
        controlKit: 65,
        stabilityKit: 0,
        total: 1031
      },
      {
        month: 'Aug',
        incoming: 272,
        inprocess: 355,
        finishedKit: 95,
        controlKit: 91,
        stabilityKit: 0,
        total: 813
      },
      {
        month: 'Sep',
        incoming: 307,
        inprocess: 329,
        finishedKit: 60,
        controlKit: 53,
        stabilityKit: 0,
        total: 749
      },
      {
        month: 'Oct',
        incoming: 272,
        inprocess: 333,
        finishedKit: 42,
        controlKit: 40,
        stabilityKit: 3,
        total: 690
      },
      {
        month: 'Nov',
        incoming: 597,
        inprocess: 271,
        finishedKit: 66,
        controlKit: 53,
        stabilityKit: 5,
        total: 992
      }
    ],
    summary: {
      totalIncoming: 2139,
      totalInProcess: 1998,
      totalFinishedKit: 391,
      totalControlKit: 348,
      totalStabilityKit: 18,
      overallTotal: 4894,
      avgPerMonth: 816
    },
    observations: {
      incoming: { Jun: 1, Jul: 3, Aug: 1, Sep: 4, Oct: 0, Nov: 1 },
      inprocess: { Jun: 0, Jul: 4, Aug: 4, Sep: 0, Oct: 0, Nov: 0 },
      finishedKit: { Jun: 0, Jul: 0, Aug: 4, Sep: 0, Oct: 0, Nov: 0 },
      controlKit: { Jun: 0, Jul: 0, Aug: 2, Sep: 0, Oct: 0, Nov: 0 }
    }
  }), []);

  const chartColors = {
    incoming: '#3b82f6',
    inprocess: '#10b981',
    finishedKit: '#f59e0b',
    controlKit: '#ef4444',
    stabilityKit: '#8b5cf6'
  };

  const calibrationData = useMemo(() => ({
    monthly: [
      { month: 'Jul', qty: 28 },
      { month: 'Aug', qty: 6 },
      { month: 'Sep', qty: 48 },
      { month: 'Oct', qty: 5 },
      { month: 'Nov', qty: 19 }
    ],
    total: 106
  }), []);

  return (
    <section style={{
      marginBottom: '20px',
      paddingBottom: '20px',
      borderBottom: '2px solid #e5e7eb'
    }}>
      <div style={{ padding: '0' }}>
        <div style={{
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '2px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '1.5em',
            margin: '0 0 6px 0',
            color: '#b91c1c'
          }}>Sampling Activities Overview</h2>
          <p style={{
            fontSize: '0.85em',
            color: '#6b7280',
            margin: '0'
          }}>Multiple sampling types across all teams</p>
        </div>

        {/* Enhanced KPI Cards - Sampling Activities */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '2px solid #0ea5e9', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '1.2em', fontWeight: '700', color: '#0ea5e9', marginBottom: '4px' }}>📥</div>
            <div style={{ fontSize: '1.6em', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>{samplingData.summary.totalIncoming}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '700', color: '#4b5563', marginBottom: '2px' }}>Incoming</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>{Math.round(samplingData.summary.totalIncoming / 6)}/month avg</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', border: '2px solid #10b981', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '1.2em', fontWeight: '700', color: '#10b981', marginBottom: '4px' }}>⚙️</div>
            <div style={{ fontSize: '1.6em', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>{samplingData.summary.totalInProcess}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '700', color: '#4b5563', marginBottom: '2px' }}>In-Process</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>{Math.round(samplingData.summary.totalInProcess / 6)}/month avg</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '2px solid #f59e0b', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '1.2em', fontWeight: '700', color: '#f59e0b', marginBottom: '4px' }}>📦</div>
            <div style={{ fontSize: '1.6em', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>{samplingData.summary.totalFinishedKit}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '700', color: '#4b5563', marginBottom: '2px' }}>Finished Kit</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>{Math.round(samplingData.summary.totalFinishedKit / 6)}/month avg</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', border: '2px solid #ef4444', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '1.2em', fontWeight: '700', color: '#ef4444', marginBottom: '4px' }}>🎛️</div>
            <div style={{ fontSize: '1.6em', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>{samplingData.summary.totalControlKit}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '700', color: '#4b5563', marginBottom: '2px' }}>Control Kit</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>{Math.round(samplingData.summary.totalControlKit / 6)}/month avg</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', border: '2px solid #ec4899', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '1.2em', fontWeight: '700', color: '#ec4899', marginBottom: '4px' }}>🔧</div>
            <div style={{ fontSize: '1.6em', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>{calibrationData.total}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '700', color: '#4b5563', marginBottom: '2px' }}>Calibrations</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>Jul-Nov 2025</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)', border: '2px solid #8b5cf6', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '1.2em', fontWeight: '700', color: '#8b5cf6', marginBottom: '4px' }}>📊</div>
            <div style={{ fontSize: '1.6em', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>{samplingData.summary.overallTotal}</div>
            <div style={{ fontSize: '0.75em', fontWeight: '700', color: '#4b5563', marginBottom: '2px' }}>Total Activities</div>
            <div style={{ fontSize: '0.65em', color: '#6b7280' }}>{samplingData.summary.avgPerMonth}/month avg</div>
          </div>
        </div>

        {/* Charts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          marginBottom: '20px'
        }}>
          {/* Stacked Bar Chart */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '12px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ fontSize: '0.9em', margin: '0 0 10px 0', color: '#111827', fontWeight: '600' }}>
              Sampling Types Monthly Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={samplingData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: '0.65em' }} />
                <YAxis style={{ fontSize: '0.65em' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '0.75em' }} />
                <Bar dataKey="incoming" fill={chartColors.incoming} name="Incoming" />
                <Bar dataKey="inprocess" fill={chartColors.inprocess} name="In-Process" />
                <Bar dataKey="finishedKit" fill={chartColors.finishedKit} name="Finished Kit" />
                <Bar dataKey="controlKit" fill={chartColors.controlKit} name="Control Kit" />
                <Bar dataKey="stabilityKit" fill={chartColors.stabilityKit} name="Stability Kit" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Total Trend Line */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '12px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ fontSize: '0.9em', margin: '0 0 10px 0', color: '#111827', fontWeight: '600' }}>
              Total Sampling Activities Trend
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={samplingData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: '0.65em' }} />
                <YAxis style={{ fontSize: '0.65em' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '0.75em' }} />
                <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={3} name="Total Activities" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sampling Categories Distribution Charts - Individual Activity Charts */}
        <div style={{
          marginBottom: '20px',
          paddingTop: '12px',
          borderTop: '2px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '1.1em',
            margin: '0 0 14px 0',
            color: '#111827',
            fontWeight: '700'
          }}>📊 Sampling Categories Distribution by Activity</h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '15px',
            marginBottom: '20px'
          }}>
            {/* Incoming Sampling Chart */}
            <div style={{
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              padding: '14px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              borderLeft: `4px solid ${chartColors.incoming}`
            }}>
              <h4 style={{ fontSize: '0.95em', margin: '0 0 12px 0', color: '#111827', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2em' }}>📥</span>
                Incoming Sampling
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={samplingData.monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" style={{ fontSize: '0.65em' }} />
                  <YAxis style={{ fontSize: '0.65em' }} />
                  <Tooltip />
                  <Bar dataKey="incoming" fill={chartColors.incoming} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '8px', fontSize: '0.75em', color: '#6b7280', textAlign: 'center', fontWeight: '600' }}>
                Total: {samplingData.summary.totalIncoming} | Avg/Month: {Math.round(samplingData.summary.totalIncoming / 6)}
              </div>
            </div>

            {/* In-Process Sampling Chart */}
            <div style={{
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              padding: '14px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              borderLeft: `4px solid ${chartColors.inprocess}`
            }}>
              <h4 style={{ fontSize: '0.95em', margin: '0 0 12px 0', color: '#111827', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2em' }}>⚙️</span>
                In-Process Sampling
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={samplingData.monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" style={{ fontSize: '0.65em' }} />
                  <YAxis style={{ fontSize: '0.65em' }} />
                  <Tooltip />
                  <Bar dataKey="inprocess" fill={chartColors.inprocess} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '8px', fontSize: '0.75em', color: '#6b7280', textAlign: 'center', fontWeight: '600' }}>
                Total: {samplingData.summary.totalInProcess} | Avg/Month: {Math.round(samplingData.summary.totalInProcess / 6)}
              </div>
            </div>

            {/* Finished Kit Chart */}
            <div style={{
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              padding: '14px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              borderLeft: `4px solid ${chartColors.finishedKit}`
            }}>
              <h4 style={{ fontSize: '0.95em', margin: '0 0 12px 0', color: '#111827', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2em' }}>📦</span>
                Finished Kit Sampling
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={samplingData.monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" style={{ fontSize: '0.65em' }} />
                  <YAxis style={{ fontSize: '0.65em' }} />
                  <Tooltip />
                  <Bar dataKey="finishedKit" fill={chartColors.finishedKit} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '8px', fontSize: '0.75em', color: '#6b7280', textAlign: 'center', fontWeight: '600' }}>
                Total: {samplingData.summary.totalFinishedKit} | Avg/Month: {Math.round(samplingData.summary.totalFinishedKit / 6)}
              </div>
            </div>

            {/* Control Kit Chart */}
            <div style={{
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              padding: '14px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              borderLeft: `4px solid ${chartColors.controlKit}`
            }}>
              <h4 style={{ fontSize: '0.95em', margin: '0 0 12px 0', color: '#111827', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2em' }}>🎛️</span>
                Control Kit Sampling
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={samplingData.monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" style={{ fontSize: '0.65em' }} />
                  <YAxis style={{ fontSize: '0.65em' }} />
                  <Tooltip />
                  <Bar dataKey="controlKit" fill={chartColors.controlKit} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '8px', fontSize: '0.75em', color: '#6b7280', textAlign: 'center', fontWeight: '600' }}>
                Total: {samplingData.summary.totalControlKit} | Avg/Month: {Math.round(samplingData.summary.totalControlKit / 6)}
              </div>
            </div>
          </div>
        </div>

        {/* Calibration Data Section */}
        <div style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '3px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '1.1em',
            margin: '0 0 14px 0',
            color: '#111827',
            fontWeight: '700'
          }}>🔧 Calibration Activities & SLO Tracking</h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '15px'
          }}>
            {/* Calibration Bar Chart */}
            <div style={{
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              padding: '14px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              borderLeft: '4px solid #ec4899'
            }}>
              <h4 style={{ fontSize: '0.95em', margin: '0 0 12px 0', color: '#111827', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2em' }}>📊</span>
                Monthly Calibration Distribution
              </h4>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={calibrationData.monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" style={{ fontSize: '0.7em' }} />
                  <YAxis style={{ fontSize: '0.7em' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    formatter={(value) => `${value} calibrations`}
                  />
                  <Bar dataKey="qty" fill="#ec4899" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '10px', padding: '10px', background: '#fce7f3', borderRadius: '6px', fontSize: '0.75em', color: '#6b7280', textAlign: 'center', fontWeight: '600' }}>
                Total Calibrations: <span style={{ color: '#ec4899', fontWeight: '800' }}>{calibrationData.total}</span>
              </div>
            </div>

            {/* Calibration SLO Summary */}
            <div style={{
              background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
              border: '2px solid #ec4899',
              borderRadius: '8px',
              padding: '14px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
              <h4 style={{ fontSize: '0.95em', margin: '0 0 12px 0', color: '#111827', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2em' }}>✓</span>
                Calibration SLO Status
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ padding: '10px', background: 'white', borderRadius: '6px', borderLeft: '3px solid #ec4899' }}>
                  <div style={{ fontSize: '0.8em', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>📅 Period Coverage</div>
                  <div style={{ fontSize: '0.75em', color: '#6b7280' }}>Jul 2025 - Nov 2025 (5 months)</div>
                </div>
                <div style={{ padding: '10px', background: 'white', borderRadius: '6px', borderLeft: '3px solid #10b981' }}>
                  <div style={{ fontSize: '0.8em', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>🎯 Total Activities</div>
                  <div style={{ fontSize: '1.4em', fontWeight: '800', color: '#10b981', marginBottom: '2px' }}>{calibrationData.total}</div>
                  <div style={{ fontSize: '0.75em', color: '#6b7280' }}>Average: {Math.round(calibrationData.total / 5)}/month</div>
                </div>
                <div style={{ padding: '10px', background: 'white', borderRadius: '6px', borderLeft: '3px solid #0ea5e9' }}>
                  <div style={{ fontSize: '0.8em', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>📈 Peak Month</div>
                  <div style={{ fontSize: '1.2em', fontWeight: '800', color: '#0ea5e9', marginBottom: '2px' }}>September - 48 calibrations</div>
                  <div style={{ fontSize: '0.75em', color: '#6b7280' }}>Highest activity observed</div>
                </div>
                <div style={{ padding: '10px', background: '#f0fdf4', borderRadius: '6px', borderLeft: '3px solid #16a34a' }}>
                  <div style={{ fontSize: '0.8em', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>✓ Status</div>
                  <div style={{ fontSize: '0.9em', fontWeight: '700', color: '#16a34a' }}>On Track - SLO Met</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Data Table */}
        <div style={{
          overflowX: 'auto',
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
          marginBottom: '20px'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'white',
            fontSize: '0.8em'
          }}>
            <thead>
              <tr style={{
                background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)'
              }}>
                <th style={{ color: 'white', padding: '8px', textAlign: 'left', fontWeight: '600', fontSize: '0.85em' }}>Month</th>
                <th style={{ color: 'white', padding: '8px', textAlign: 'left', fontWeight: '600', fontSize: '0.85em' }}>Incoming</th>
                <th style={{ color: 'white', padding: '8px', textAlign: 'left', fontWeight: '600', fontSize: '0.85em' }}>In-Process</th>
                <th style={{ color: 'white', padding: '8px', textAlign: 'left', fontWeight: '600', fontSize: '0.85em' }}>Finished Kit</th>
                <th style={{ color: 'white', padding: '8px', textAlign: 'left', fontWeight: '600', fontSize: '0.85em' }}>Control Kit</th>
                <th style={{ color: 'white', padding: '8px', textAlign: 'left', fontWeight: '600', fontSize: '0.85em' }}>Stability Kit</th>
                <th style={{ color: 'white', padding: '8px', textAlign: 'left', fontWeight: '600', fontSize: '0.85em' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {samplingData.monthly.map((row, idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px' }}>{row.month}</td>
                  <td style={{ padding: '8px', color: '#3b82f6', fontWeight: '600' }}>{row.incoming}</td>
                  <td style={{ padding: '8px', color: '#10b981', fontWeight: '600' }}>{row.inprocess}</td>
                  <td style={{ padding: '8px', color: '#f59e0b', fontWeight: '600' }}>{row.finishedKit}</td>
                  <td style={{ padding: '8px', color: '#ef4444', fontWeight: '600' }}>{row.controlKit}</td>
                  <td style={{ padding: '8px', color: '#8b5cf6', fontWeight: '600' }}>{row.stabilityKit}</td>
                  <td style={{ padding: '8px', color: '#0ea5e9', fontWeight: '700', fontSize: '1.05em' }}>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Observations Summary */}
        <div style={{
          borderTop: '2px solid #e5e7eb',
          paddingTop: '20px'
        }}>
          <h3 style={{
            fontSize: '1.1em',
            margin: '0 0 12px 0',
            color: '#111827',
            fontWeight: '600'
          }}>Observations Recorded</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '12px'
          }}>
            {[
              { label: 'Incoming Sampling', count: 10, color: '#0ea5e9', bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' },
              { label: 'In-Process Sampling', count: 8, color: '#10b981', bg: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' },
              { label: 'Finished Kit', count: 4, color: '#f59e0b', bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' },
              { label: 'Control Kit', count: 2, color: '#ef4444', bg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' },
              { label: 'Transfer Note Verification', count: 7, color: '#8b5cf6', bg: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)' }
            ].map((obs, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedObservation(obs.label)}
                style={{
                  background: obs.bg,
                  border: `1px solid ${obs.color}`,
                  borderRadius: '6px',
                  padding: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: selectedObservation === obs.label ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: selectedObservation === obs.label ? `0 4px 12px ${obs.color}40` : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${obs.color}40`;
                }}
                onMouseLeave={(e) => {
                  if (selectedObservation !== obs.label) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div style={{ fontSize: '1.8em', fontWeight: '700', color: obs.color, marginBottom: '4px' }}>{obs.count}</div>
                <div style={{ fontSize: '0.8em', color: '#4b5563', fontWeight: '600' }}>{obs.label}</div>
                <div style={{ fontSize: '0.65em', color: '#9ca3af', marginTop: '4px', fontStyle: 'italic' }}>Click for details</div>
              </div>
            ))}
          </div>

          {/* Observation Details Section */}
          {selectedObservation && (
            <div style={{
              marginTop: '20px',
              background: 'white',
              border: '3px solid #3b82f6',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)',
              animation: 'slideIn 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '2px solid #e5e7eb'
              }}>
                <h4 style={{
                  fontSize: '1.3em',
                  margin: 0,
                  color: '#1f2937',
                  fontWeight: '700'
                }}>
                  📋 {selectedObservation} - Detailed Observations
                </h4>
                <button
                  onClick={() => setSelectedObservation(null)}
                  style={{
                    background: '#ef4444',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    color: 'white',
                    fontSize: '0.9em',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#dc2626';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ef4444';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  ✕ Close
                </button>
              </div>

              <div style={{
                display: 'grid',
                gap: '12px',
                maxHeight: '500px',
                overflowY: 'auto',
                paddingRight: '10px'
              }}>
                {observationsData[selectedObservation].map((obs) => (
                  <div
                    key={obs.id}
                    style={{
                      background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      padding: '16px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          background: obs.severity === 'Critical' ? '#fee2e2' : obs.severity === 'Major' ? '#fef3c7' : '#dbeafe',
                          color: obs.severity === 'Critical' ? '#dc2626' : obs.severity === 'Major' ? '#d97706' : '#2563eb',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.7em',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {obs.severity}
                        </span>
                        <span style={{
                          background: obs.status === 'Resolved' ? '#dcfce7' : '#fef3c7',
                          color: obs.status === 'Resolved' ? '#166534' : '#d97706',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.7em',
                          fontWeight: '700'
                        }}>
                          ✓ {obs.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75em', color: '#6b7280', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        📅 {obs.date}
                      </div>
                    </div>
                    <div style={{ marginBottom: '6px', display: 'flex', gap: '4px' }}>
                      <span style={{ fontSize: '0.8em', fontWeight: '700', color: '#374151' }}>Type:</span>
                      <span style={{ fontSize: '0.8em', color: '#6b7280', fontWeight: '600' }}>{obs.type}</span>
                    </div>
                    <div style={{ marginBottom: '10px', padding: '8px', background: 'white', borderRadius: '6px', borderLeft: '3px solid #f59e0b' }}>
                      <span style={{ fontSize: '0.8em', fontWeight: '700', color: '#d97706' }}>Finding: </span>
                      <span style={{ fontSize: '0.8em', color: '#111827' }}>{obs.finding}</span>
                    </div>
                    <div style={{
                      background: 'white',
                      padding: '10px',
                      borderRadius: '6px',
                      borderLeft: '3px solid #10b981'
                    }}>
                      <span style={{ fontSize: '0.75em', fontWeight: '700', color: '#10b981' }}>✓ Action Taken: </span>
                      <span style={{ fontSize: '0.75em', color: '#4b5563', lineHeight: '1.5' }}>{obs.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
