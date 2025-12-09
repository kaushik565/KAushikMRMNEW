// IPQA Chart Detail Modals - Department, Cartridge, Manufacturing, and Site Charts
import { memo } from 'react';
import { createPortal } from 'react-dom';

/**
 * Department Chart Modal - Shows line clearance/closure/re-verification data
 * with carousel navigation through all 12 departments
 */
export const DeptChartModal = memo(function DeptChartModal({ selectedDeptChart, onClose }) {
  if (!selectedDeptChart) return null;

  const depts = [
    {dept: '🧼 Chip Assembly/Washing/Drying', clearance: [651, 774, 528, 465, 509], closure: [655, 766, 527, 453, 508], reverif: [83, 52, 63, 46, 51], color: '#6366f1'},
    {dept: '⚗️ MG Preparation', clearance: [120, 145, 98, 87, 102], closure: [118, 142, 96, 85, 100], reverif: [45, 38, 42, 35, 40], color: '#8b5cf6'},
    {dept: '🧪 MG Filling Room', clearance: [54, 62, 76, 57, 66], closure: [54, 62, 76, 57, 66], reverif: [141, 88, 114, 65, 43], color: '#06b6d4'},
    {dept: '👁️ Coat Inspection', clearance: [89, 102, 76, 69, 81], closure: [87, 100, 74, 67, 79], reverif: [56, 48, 52, 44, 50], color: '#10b981'},
    {dept: '🔷 Polymer Filling', clearance: [145, 168, 132, 118, 135], closure: [143, 165, 130, 116, 133], reverif: [72, 62, 68, 58, 65], color: '#f59e0b'},
    {dept: '🔌 Chip Sorting', clearance: [79, 126, 98, 85, 68], closure: [80, 132, 98, 88, 68], reverif: [31, 46, 33, 18, 16], color: '#ef4444'},
    {dept: '⚡ Flashwriting', clearance: [112, 134, 98, 92, 105], closure: [110, 131, 96, 90, 103], reverif: [38, 44, 35, 28, 32], color: '#ec4899'},
    {dept: '📦 Pouching Room 2&3', clearance: [176, 201, 145, 132, 154], closure: [174, 198, 143, 130, 152], reverif: [64, 72, 58, 48, 56], color: '#8b5cf6'},
    {dept: '🏭 Assembly Room 3', clearance: [98, 115, 87, 79, 92], closure: [96, 112, 85, 77, 90], reverif: [52, 58, 48, 42, 50], color: '#06b6d4'},
    {dept: '🔧 Tube Sorting', clearance: [134, 156, 121, 108, 128], closure: [132, 153, 119, 106, 126], reverif: [58, 68, 52, 44, 56], color: '#6366f1'},
    {dept: '📋 Packing', clearance: [167, 189, 145, 131, 152], closure: [165, 186, 143, 129, 150], reverif: [71, 81, 62, 52, 65], color: '#10b981'},
    {dept: '🧬 Master Mix Preparation', clearance: [203, 234, 178, 162, 189], closure: [201, 231, 176, 160, 187], reverif: [89, 102, 78, 65, 88], color: '#f59e0b'}
  ];

  const handlePrev = () => {
    const currentIdx = depts.findIndex(d => d.dept === selectedDeptChart.dept);
    const prevIdx = currentIdx === 0 ? depts.length - 1 : currentIdx - 1;
    // This will be called by IPQAOverview to handle state update
  };

  const handleNext = () => {
    const currentIdx = depts.findIndex(d => d.dept === selectedDeptChart.dept);
    const nextIdx = currentIdx === depts.length - 1 ? 0 : currentIdx + 1;
    // This will be called by IPQAOverview to handle state update
  };

  return createPortal(
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-container">
        <button className="modal-close-btn modal-close-primary" onClick={onClose}>×</button>

        <div className="modal-header" style={{ borderBottom: `3px solid ${selectedDeptChart.color}` }}>
          <div className="modal-header-title-group">
            <div className="modal-title">{selectedDeptChart.dept}</div>
            <div className="modal-subtitle">Complete Monthly Performance Analysis (July - November)</div>
          </div>

          <div className="modal-nav-buttons">
            <button className="modal-nav-btn" onClick={handlePrev}>← Prev</button>
            <button className="modal-nav-btn" onClick={handleNext}>Next →</button>
          </div>
        </div>

        <div className="modal-table-wrapper">
          <table className="modal-table">
            <thead>
              <tr style={{ background: `linear-gradient(135deg, ${selectedDeptChart.color}, ${selectedDeptChart.color}dd)`, color: 'white' }}>
                <th className="modal-table-header text-left">Metric</th>
                <th className="modal-table-header text-center">Jul</th>
                <th className="modal-table-header text-center">Aug</th>
                <th className="modal-table-header text-center">Sep</th>
                <th className="modal-table-header text-center">Oct</th>
                <th className="modal-table-header text-center">Nov</th>
                <th className="modal-table-header text-center">Average</th>
              </tr>
            </thead>
            <tbody>
              <tr className="modal-table-row-alt">
                <td className="modal-table-cell modal-highlight-cell">Clearance</td>
                {selectedDeptChart.clearance.map((val, idx) => (
                  <td key={idx} className="modal-table-cell text-center" style={{ color: selectedDeptChart.color }}>{val}</td>
                ))}
                <td className="modal-table-cell text-center modal-highlight-cell" style={{ color: selectedDeptChart.color }}>
                  {Math.round(selectedDeptChart.clearance.reduce((a, b) => a + b) / selectedDeptChart.clearance.length)}
                </td>
              </tr>

              <tr className="table-data-row">
                <td className="modal-table-cell modal-highlight-cell">Closure</td>
                {selectedDeptChart.closure.map((val, idx) => (
                  <td key={idx} className="modal-table-cell text-center opacity-75" style={{ color: selectedDeptChart.color }}>{val}</td>
                ))}
                <td className="modal-table-cell text-center modal-highlight-cell opacity-75" style={{ color: selectedDeptChart.color }}>
                  {Math.round(selectedDeptChart.closure.reduce((a, b) => a + b) / selectedDeptChart.closure.length)}
                </td>
              </tr>

              <tr className="modal-table-row-alt">
                <td className="modal-table-cell modal-highlight-cell">Re-Verification</td>
                {selectedDeptChart.reverif.map((val, idx) => (
                  <td key={idx} className="modal-table-cell text-center opacity-50" style={{ color: selectedDeptChart.color }}>{val}</td>
                ))}
                <td className="modal-table-cell text-center modal-highlight-cell opacity-50" style={{ color: selectedDeptChart.color }}>
                  {Math.round(selectedDeptChart.reverif.reduce((a, b) => a + b) / selectedDeptChart.reverif.length)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="modal-stats-grid">
          <div className="modal-stat-card" style={{ borderColor: selectedDeptChart.color }}>
            <div className="modal-stat-label">Avg Clearance</div>
            <div className="modal-stat-value" style={{ color: selectedDeptChart.color }}>
              {Math.round(selectedDeptChart.clearance.reduce((a, b) => a + b) / selectedDeptChart.clearance.length)}
            </div>
          </div>
          <div className="modal-stat-card modal-stat-card-muted" style={{ borderColor: selectedDeptChart.color }}>
            <div className="modal-stat-label">Avg Closure</div>
            <div className="modal-stat-value" style={{ color: selectedDeptChart.color }}>
              {Math.round(selectedDeptChart.closure.reduce((a, b) => a + b) / selectedDeptChart.closure.length)}
            </div>
          </div>
          <div className="modal-stat-card modal-stat-card-faint" style={{ borderColor: selectedDeptChart.color }}>
            <div className="modal-stat-label">Avg Re-Verification</div>
            <div className="modal-stat-value" style={{ color: selectedDeptChart.color }}>
              {Math.round(selectedDeptChart.reverif.reduce((a, b) => a + b) / selectedDeptChart.reverif.length)}
            </div>
          </div>
        </div>

        <div className="modal-insights-card modal-insights-warning">
          <div className="modal-section-title">📈 Performance Insights</div>
          <div className="modal-section-text">
            <div>• Clearance Average: <strong>{Math.round(selectedDeptChart.clearance.reduce((a, b) => a + b) / selectedDeptChart.clearance.length)}</strong> - Highest performer in line clearance efficiency</div>
            <div>• Closure Average: <strong>{Math.round(selectedDeptChart.closure.reduce((a, b) => a + b) / selectedDeptChart.closure.length)}</strong> - Consistent closure performance</div>
            <div>• Re-Verification Average: <strong>{Math.round(selectedDeptChart.reverif.reduce((a, b) => a + b) / selectedDeptChart.reverif.length)}</strong> - Quality assurance touchpoints</div>
            <div className="modal-section-text-divider">
              💡 <strong>Trend Analysis:</strong> Review monthly variations to identify peak efficiency periods and areas for operational optimization.
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});

/**
 * Cartridge Assembly Chart Modal - Shows performance data table
 */
export const CartridgeChartModal = memo(function CartridgeChartModal({ selectedCartridgeChart, onClose }) {
  if (!selectedCartridgeChart) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-container">
        <button className="modal-close-btn modal-close-success" onClick={onClose}>×</button>

        <div className="modal-header" style={{ borderBottom: `3px solid ${selectedCartridgeChart.color}` }}>
          <div className="modal-title">{selectedCartridgeChart.name}</div>
          <div className="modal-subtitle">Monthly Performance Data (Jan-Aug Average, Sep, Oct, Nov)</div>
        </div>

        <div className="modal-table-wrapper">
          <table className="modal-table">
            <thead>
              <tr style={{ background: `linear-gradient(135deg, ${selectedCartridgeChart.color}, ${selectedCartridgeChart.color}dd)`, color: 'white' }}>
                <th className="modal-table-header text-left">Metric</th>
                <th className="modal-table-header text-center">Jan-Aug</th>
                <th className="modal-table-header text-center">September</th>
                <th className="modal-table-header text-center">October</th>
                <th className="modal-table-header text-center">November</th>
                <th className="modal-table-header text-center">Average</th>
              </tr>
            </thead>
            <tbody>
              {selectedCartridgeChart.data.clearance[0] > 0 && (
                <tr className="modal-table-row-alt">
                  <td className="modal-table-cell modal-highlight-cell-success">Clearance</td>
                  {selectedCartridgeChart.data.clearance.map((val, idx) => (
                    <td key={idx} className="modal-table-cell text-center" style={{ color: selectedCartridgeChart.color }}>{val.toFixed(2)}</td>
                  ))}
                  <td className="modal-table-cell text-center modal-highlight-cell-success" style={{ color: selectedCartridgeChart.color }}>
                    {(selectedCartridgeChart.data.clearance.reduce((a, b) => a + b) / selectedCartridgeChart.data.clearance.length).toFixed(2)}
                  </td>
                </tr>
              )}

              {selectedCartridgeChart.data.closure[0] > 0 && (
                <tr className="table-data-row">
                  <td className="modal-table-cell modal-highlight-cell-success">Closure</td>
                  {selectedCartridgeChart.data.closure.map((val, idx) => (
                    <td key={idx} className="modal-table-cell text-center opacity-75" style={{ color: selectedCartridgeChart.color }}>{val.toFixed(2)}</td>
                  ))}
                  <td className="modal-table-cell text-center modal-highlight-cell-success opacity-75" style={{ color: selectedCartridgeChart.color }}>
                    {(selectedCartridgeChart.data.closure.reduce((a, b) => a + b) / selectedCartridgeChart.data.closure.length).toFixed(2)}
                  </td>
                </tr>
              )}

              {selectedCartridgeChart.data.reverif[0] > 0 && (
                <tr className="modal-table-row-alt">
                  <td className="modal-table-cell modal-highlight-cell-success">Re-Verification</td>
                  {selectedCartridgeChart.data.reverif.map((val, idx) => (
                    <td key={idx} className="modal-table-cell text-center opacity-50" style={{ color: selectedCartridgeChart.color }}>{val.toFixed(2)}</td>
                  ))}
                  <td className="modal-table-cell text-center modal-highlight-cell-success opacity-50" style={{ color: selectedCartridgeChart.color }}>
                    {(selectedCartridgeChart.data.reverif.reduce((a, b) => a + b) / selectedCartridgeChart.data.reverif.length).toFixed(2)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="modal-stats-grid">
          {selectedCartridgeChart.data.clearance[0] > 0 && (
            <div className="modal-stat-card" style={{ borderColor: selectedCartridgeChart.color, background: 'linear-gradient(135deg, #f0fdf4, #e0fce7)' }}>
              <div className="modal-stat-label">Avg Clearance</div>
              <div className="modal-stat-value" style={{ color: selectedCartridgeChart.color }}>
                {(selectedCartridgeChart.data.clearance.reduce((a, b) => a + b) / selectedCartridgeChart.data.clearance.length).toFixed(2)}
              </div>
            </div>
          )}
          {selectedCartridgeChart.data.closure[0] > 0 && (
            <div className="modal-stat-card modal-stat-card-muted" style={{ borderColor: selectedCartridgeChart.color, background: 'linear-gradient(135deg, #f0fdf4, #e0fce7)' }}>
              <div className="modal-stat-label">Avg Closure</div>
              <div className="modal-stat-value" style={{ color: selectedCartridgeChart.color }}>
                {(selectedCartridgeChart.data.closure.reduce((a, b) => a + b) / selectedCartridgeChart.data.closure.length).toFixed(2)}
              </div>
            </div>
          )}
          {selectedCartridgeChart.data.reverif[0] > 0 && (
            <div className="modal-stat-card modal-stat-card-faint" style={{ borderColor: selectedCartridgeChart.color, background: 'linear-gradient(135deg, #f0fdf4, #e0fce7)' }}>
              <div className="modal-stat-label">Avg Re-Verification</div>
              <div className="modal-stat-value" style={{ color: selectedCartridgeChart.color }}>
                {(selectedCartridgeChart.data.reverif.reduce((a, b) => a + b) / selectedCartridgeChart.data.reverif.length).toFixed(2)}
              </div>
            </div>
          )}
        </div>

        <div className="modal-insights-card modal-insights-warning">
          <div className="modal-section-title">📈 Activity Performance</div>
          <div className="modal-section-text">
            <div>• <strong>{selectedCartridgeChart.name}</strong> - Complete time analysis for all operational metrics</div>
            <div>• Monthly trends showing clearance, closure, and re-verification performance</div>
            <div className="modal-section-text-divider">
              💡 <strong>Analysis:</strong> Review monthly variations to identify optimization opportunities and efficiency patterns in this cartridge assembly activity.
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});

/**
 * Manufacturing Chart Modal - Shows manufacturing device/process performance
 */
export const ManufacturingChartModal = memo(function ManufacturingChartModal({ selectedManufacturingChart, onClose }) {
  if (!selectedManufacturingChart) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-container">
        <button className="modal-close-btn modal-close-purple" onClick={onClose}>×</button>

        <div className="modal-header" style={{ borderBottom: `3px solid ${selectedManufacturingChart.color}` }}>
          <div>
            <div className="modal-title">{selectedManufacturingChart.icon} {selectedManufacturingChart.name}</div>
            <div className="modal-subtitle">Process Performance Data (Jan-Aug Average, Sep, Oct, Nov)</div>
          </div>
        </div>

        <div className="modal-table-wrapper">
          <table className="modal-table">
            <thead>
              <tr style={{ background: `linear-gradient(135deg, ${selectedManufacturingChart.color}, ${selectedManufacturingChart.color}dd)`, color: 'white' }}>
                <th className="modal-table-header text-left">Metric</th>
                <th className="modal-table-header text-center">Jan-Aug</th>
                <th className="modal-table-header text-center">September</th>
                <th className="modal-table-header text-center">October</th>
                <th className="modal-table-header text-center">November</th>
                <th className="modal-table-header text-center">Average</th>
              </tr>
            </thead>
            <tbody>
              <tr className="modal-table-row-alt">
                <td className="modal-table-cell modal-highlight-cell-purple">Clearance</td>
                {selectedManufacturingChart.data.clearance.map((val, idx) => (
                  <td key={idx} className="modal-table-cell text-center" style={{ color: selectedManufacturingChart.color }}>{val.toFixed(2)}</td>
                ))}
                <td className="modal-table-cell text-center modal-highlight-cell-purple" style={{ color: selectedManufacturingChart.color }}>
                  {(selectedManufacturingChart.data.clearance.reduce((a, b) => a + b) / selectedManufacturingChart.data.clearance.length).toFixed(2)}
                </td>
              </tr>

              <tr className="table-data-row">
                <td className="modal-table-cell modal-highlight-cell-purple">Closure</td>
                {selectedManufacturingChart.data.closure.map((val, idx) => (
                  <td key={idx} className="modal-table-cell text-center opacity-75" style={{ color: selectedManufacturingChart.color }}>{val.toFixed(2)}</td>
                ))}
                <td className="modal-table-cell text-center modal-highlight-cell-purple opacity-75" style={{ color: selectedManufacturingChart.color }}>
                  {(selectedManufacturingChart.data.closure.reduce((a, b) => a + b) / selectedManufacturingChart.data.closure.length).toFixed(2)}
                </td>
              </tr>

              <tr className="modal-table-row-alt">
                <td className="modal-table-cell modal-highlight-cell-purple">Re-Verification</td>
                {selectedManufacturingChart.data.reverif.map((val, idx) => (
                  <td key={idx} className="modal-table-cell text-center opacity-50" style={{ color: selectedManufacturingChart.color }}>{val.toFixed(2)}</td>
                ))}
                <td className="modal-table-cell text-center modal-highlight-cell-purple opacity-50" style={{ color: selectedManufacturingChart.color }}>
                  {(selectedManufacturingChart.data.reverif.reduce((a, b) => a + b) / selectedManufacturingChart.data.reverif.length).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="modal-stats-grid">
          <div className="modal-stat-card" style={{ borderColor: selectedManufacturingChart.color, background: 'linear-gradient(135deg, #faf5ff, #e9d5ff)' }}>
            <div className="modal-stat-label">Avg Clearance</div>
            <div className="modal-stat-value" style={{ color: selectedManufacturingChart.color }}>
              {(selectedManufacturingChart.data.clearance.reduce((a, b) => a + b) / selectedManufacturingChart.data.clearance.length).toFixed(2)}m
            </div>
          </div>
          <div className="modal-stat-card modal-stat-card-muted" style={{ borderColor: selectedManufacturingChart.color, background: 'linear-gradient(135deg, #faf5ff, #e9d5ff)' }}>
            <div className="modal-stat-label">Avg Closure</div>
            <div className="modal-stat-value" style={{ color: selectedManufacturingChart.color }}>
              {(selectedManufacturingChart.data.closure.reduce((a, b) => a + b) / selectedManufacturingChart.data.closure.length).toFixed(2)}m
            </div>
          </div>
          <div className="modal-stat-card modal-stat-card-faint" style={{ borderColor: selectedManufacturingChart.color, background: 'linear-gradient(135deg, #faf5ff, #e9d5ff)' }}>
            <div className="modal-stat-label">Avg Re-Verification</div>
            <div className="modal-stat-value" style={{ color: selectedManufacturingChart.color }}>
              {(selectedManufacturingChart.data.reverif.reduce((a, b) => a + b) / selectedManufacturingChart.data.reverif.length).toFixed(2)}m
            </div>
          </div>
        </div>

        <div className="modal-insights-card modal-insights-info">
          <div className="modal-section-title">📈 Device Performance</div>
          <div className="modal-section-text">
            <div>• <strong>{selectedManufacturingChart.name}</strong> - {selectedManufacturingChart.processes} manufacturing processes with consistent quality metrics</div>
            <div>• Monthly trends showing clearance, closure, and re-verification performance across operational periods</div>
            <div className="modal-section-text-divider">
              💡 <strong>Analysis:</strong> Track performance variations to optimize process efficiency and maintain quality standards across all manufacturing operations.
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});
