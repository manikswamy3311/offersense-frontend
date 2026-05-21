import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import KPIBox from '../components/KPIBox';
import ChartCard from '../components/ChartCard';
import { getCustomerSegments } from '../services/api';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock segment data
const mockSegments = [
  {
    id: 1,
    name: "High Value Customers",
    customerCount: 1250,
    percentage: 8.5,
    totalRevenue: 485000,
    avgOrderValue: 388,
    purchaseFrequency: 8.2,
    engagementScore: 92,
    growth: "+12.3%",
    color: "#4caf50",
    engagementLevel: "high"
  },
  {
    id: 2,
    name: "Regular Customers",
    customerCount: 4200,
    percentage: 28.5,
    totalRevenue: 756000,
    avgOrderValue: 180,
    purchaseFrequency: 4.5,
    engagementScore: 78,
    growth: "+8.7%",
    color: "#2196f3",
    engagementLevel: "high"
  },
  {
    id: 3,
    name: "Occasional Shoppers",
    customerCount: 5800,
    percentage: 39.4,
    totalRevenue: 464000,
    avgOrderValue: 80,
    purchaseFrequency: 2.1,
    engagementScore: 54,
    growth: "+3.2%",
    color: "#ff9800",
    engagementLevel: "medium"
  },
  {
    id: 4,
    name: "New Customers",
    customerCount: 2100,
    percentage: 14.3,
    totalRevenue: 168000,
    avgOrderValue: 80,
    purchaseFrequency: 1.2,
    engagementScore: 68,
    growth: "+25.4%",
    color: "#9c27b0",
    engagementLevel: "medium"
  },
  {
    id: 5,
    name: "At-Risk Customers",
    customerCount: 980,
    percentage: 6.7,
    totalRevenue: 78400,
    avgOrderValue: 80,
    purchaseFrequency: 1.5,
    engagementScore: 38,
    growth: "-5.8%",
    color: "#f44336",
    engagementLevel: "low"
  },
  {
    id: 6,
    name: "Dormant Customers",
    customerCount: 390,
    percentage: 2.6,
    totalRevenue: 19500,
    avgOrderValue: 50,
    purchaseFrequency: 0.3,
    engagementScore: 12,
    growth: "-12.1%",
    color: "#9e9e9e",
    engagementLevel: "low"
  },
];

// Demographics data
const ageGroupData = [
  { range: "18-24", count: 2100, percentage: 14.3 },
  { range: "25-34", count: 4500, percentage: 30.6 },
  { range: "35-44", count: 3800, percentage: 25.8 },
  { range: "45-54", count: 2600, percentage: 17.7 },
  { range: "55+", count: 1720, percentage: 11.6 },
];

const channelPreferenceData = [
  { name: "Email", value: 45, color: "#1976d2" },
  { name: "Mobile App", value: 30, color: "#9c27b0" },
  { name: "Website", value: 18, color: "#4caf50" },
  { name: "SMS", value: 7, color: "#ff9800" },
];

const CustomerSegments = () => {
  const [segments, setSegments] = useState(mockSegments);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    // Try to fetch from API, fallback to mock data
    getCustomerSegments()
      .then((data) => {
        setSegments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Using mock segment data");
        setSegments(mockSegments);
        setLoading(false);
      });
  }, []);

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...segments].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setSegments(sorted);
  };

  // Calculate KPIs
  const totalCustomers = segments.reduce((sum, s) => sum + s.customerCount, 0);
  const totalRevenue = segments.reduce((sum, s) => sum + s.totalRevenue, 0);
  const avgCLV = (totalRevenue / totalCustomers).toFixed(2);
  const avgEngagement = (segments.reduce((sum, s) => sum + s.engagementScore, 0) / segments.length).toFixed(1);
  const mostValuableSegment = segments.reduce((best, s) => 
    s.totalRevenue > (best.totalRevenue || 0) ? s : best, 
    {}
  );

  // Prepare revenue comparison chart data
  const revenueComparisonData = segments.map(s => ({
    name: s.name.length > 15 ? s.name.substring(0, 15) + '...' : s.name,
    revenue: s.totalRevenue / 1000, // in thousands
    aov: s.avgOrderValue,
  }));

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="page-header">
          <h1>Customer Segments</h1>
          <p>Understand your customer base through segmentation analysis</p>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-4 mb-3">
          <KPIBox
            title="Total Customers"
            value={totalCustomers.toLocaleString()}
            bgColor="#e3f2fd"
          />
          <KPIBox
            title="Most Valuable Segment"
            value={mostValuableSegment.name || 'N/A'}
            trend={`$${(mostValuableSegment.totalRevenue / 1000).toFixed(0)}K`}
            bgColor="#e8f5e9"
          />
          <KPIBox
            title="Avg. Customer Lifetime Value"
            value={`$${avgCLV}`}
            bgColor="#f3e5f5"
          />
          <KPIBox
            title="Avg. Engagement Score"
            value={`${avgEngagement}/100`}
            bgColor="#fff3e0"
          />
        </div>

        {/* Segment Cards Grid */}
        <div className="segment-grid">
          {segments.map((segment) => (
            <div 
              key={segment.id} 
              className="segment-card"
              style={{ borderLeftColor: segment.color }}
            >
              <div className="segment-card-header">
                <h3 className="segment-name">{segment.name}</h3>
                <span className="segment-percentage">{segment.percentage}%</span>
              </div>
              <div className="segment-count">
                {segment.customerCount.toLocaleString()} customers
              </div>
              <div className="segment-metrics">
                <div className="segment-metric-item">
                  <span className="segment-metric-label">Total Revenue</span>
                  <span className="segment-metric-value">
                    ${(segment.totalRevenue / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="segment-metric-item">
                  <span className="segment-metric-label">Avg Order Value</span>
                  <span className="segment-metric-value">${segment.avgOrderValue}</span>
                </div>
                <div className="segment-metric-item">
                  <span className="segment-metric-label">Purchase Freq.</span>
                  <span className="segment-metric-value">{segment.purchaseFrequency}x</span>
                </div>
                <div className="segment-metric-item">
                  <span className="segment-metric-label">Engagement</span>
                  <span className="segment-metric-value">
                    <span className={`engagement-badge ${segment.engagementLevel}`}>
                      {segment.engagementScore}
                    </span>
                  </span>
                </div>
              </div>
              <div className={`growth-indicator ${segment.growth.startsWith('+') ? 'positive' : 'negative'}`}>
                <span>{segment.growth.startsWith('+') ? '↑' : '↓'}</span>
                <span>{segment.growth} growth</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visualizations */}
        <div className="grid grid-cols-2 mb-3">
          {/* Segment Distribution Pie Chart */}
          <ChartCard title="Customer Distribution" description="By segment">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={segments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name.substring(0, 12)}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="customerCount"
                >
                  {segments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value.toLocaleString()} customers`}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Revenue Comparison Bar Chart */}
          <ChartCard title="Revenue by Segment" description="Revenue and AOV comparison">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#757575"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 11 }}
                />
                <YAxis stroke="#757575" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                  formatter={(value, name) => {
                    if (name === 'revenue') return [`$${value.toFixed(0)}K`, 'Revenue'];
                    return [`$${value}`, 'AOV'];
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#1976d2" name="Revenue (K)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="aov" fill="#9c27b0" name="AOV ($)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Demographics Section */}
        <div className="demographics-section">
          <div className="page-header">
            <h2>Demographics & Preferences</h2>
            <p>Customer age distribution and channel preferences</p>
          </div>

          <div className="demographics-grid">
            {/* Age Distribution */}
            <ChartCard title="Age Distribution" description="Customer age groups">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageGroupData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="range" stroke="#757575" />
                  <YAxis stroke="#757575" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `${value.toLocaleString()} customers`}
                  />
                  <Bar dataKey="count" fill="#4caf50" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Channel Preferences */}
            <ChartCard title="Channel Preferences" description="Preferred communication channels">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={channelPreferenceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {channelPreferenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        {/* Segment Performance Table */}
        <div className="table-container" style={{ marginTop: '2rem' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th className="sortable-header" onClick={() => handleSort('name')}>
                  Segment Name
                </th>
                <th className="sortable-header" onClick={() => handleSort('customerCount')}>
                  Customers
                </th>
                <th className="sortable-header" onClick={() => handleSort('percentage')}>
                  % of Total
                </th>
                <th className="sortable-header" onClick={() => handleSort('totalRevenue')}>
                  Total Revenue
                </th>
                <th className="sortable-header" onClick={() => handleSort('avgOrderValue')}>
                  AOV
                </th>
                <th className="sortable-header" onClick={() => handleSort('purchaseFrequency')}>
                  Purchase Freq.
                </th>
                <th className="sortable-header" onClick={() => handleSort('engagementScore')}>
                  Engagement
                </th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              {segments.map((segment) => (
                <tr key={segment.id}>
                  <td style={{ fontWeight: 600, color: segment.color }}>{segment.name}</td>
                  <td>{segment.customerCount.toLocaleString()}</td>
                  <td>{segment.percentage}%</td>
                  <td>${(segment.totalRevenue / 1000).toFixed(0)}K</td>
                  <td>${segment.avgOrderValue}</td>
                  <td>{segment.purchaseFrequency}x</td>
                  <td>
                    <span className={`engagement-badge ${segment.engagementLevel}`}>
                      {segment.engagementScore}
                    </span>
                  </td>
                  <td>
                    <span className={`growth-indicator ${segment.growth.startsWith('+') ? 'positive' : 'negative'}`}>
                      {segment.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerSegments;