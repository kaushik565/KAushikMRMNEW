import { useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function SiteILineClosure() {
  const lineClosureData = useMemo(() => ({
    activity: 'Line Closure',
    responsibility: 'Vaishnavi',
    monthly: [
      { month: 'Jun', approved: 782, notApproved: 0, total: 782 },
      { month: 'Jul', approved: 1426, notApproved: 2, total: 1428 },
      { month: 'Aug', approved: 1270, notApproved: 0, total: 1270 },
      { month: 'Sep', approved: 1089, notApproved: 1, total: 1090 },
      { month: 'Oct', approved: 1036, notApproved: 1, total: 1037 },
      { month: 'Nov', approved: 1013, notApproved: 0, total: 1013 }
    ],
    summary: {
      totalApproved: 6616,
      totalNotApproved: 4,
      approvalRate: '99.9%',
      avgPerMonth: 1019
    }
  }), []);

  const chartColors = {
    approved: '#3b82f6',
    notApproved: '#f97316',
    total: '#8b5cf6'
  };

  return (
    <section className="ipqa-detail-section">
      <div className="ipqa-detail-container">
        <div className="detail-header">
          <h2>{lineClosureData.activity}</h2>
          <p className="responsibility">Responsibility: <strong>{lineClosureData.responsibility}</strong></p>
        </div>

        {/* KPI Cards */}
        <div className="kpi-cards-grid">
          <div className="kpi-card">
            <div className="kpi-value">{lineClosureData.summary.totalApproved}</div>
            <div className="kpi-label">Total Approved</div>
            <div className="kpi-subtext">Jun - Nov 2025</div>
          </div>
          <div className="kpi-card warning">
            <div className="kpi-value">{lineClosureData.summary.totalNotApproved}</div>
            <div className="kpi-label">Not Approved</div>
            <div className="kpi-subtext">Exceptions</div>
          </div>
          <div className="kpi-card success">
            <div className="kpi-value">{lineClosureData.summary.approvalRate}</div>
            <div className="kpi-label">Approval Rate</div>
            <div className="kpi-subtext">Excellent</div>
          </div>
          <div className="kpi-card info">
            <div className="kpi-value">{lineClosureData.summary.avgPerMonth}</div>
            <div className="kpi-label">Avg/Month</div>
            <div className="kpi-subtext">Monthly Average</div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-row">
          {/* Stacked Bar Chart */}
          <div className="chart-container">
            <h3>Monthly Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lineClosureData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" fill={chartColors.approved} name="Approved" />
                <Bar dataKey="notApproved" fill={chartColors.notApproved} name="Not Approved" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Total Trend Line */}
          <div className="chart-container">
            <h3>Total Activity Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineClosureData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke={chartColors.total} strokeWidth={3} name="Total Activities" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Approved</th>
                <th>Not Approved</th>
                <th>Total</th>
                <th>Approval %</th>
              </tr>
            </thead>
            <tbody>
              {lineClosureData.monthly.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.month}</td>
                  <td className="approved">{row.approved}</td>
                  <td className="not-approved">{row.notApproved}</td>
                  <td className="total">{row.total}</td>
                  <td className="percentage">{((row.approved / row.total) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
