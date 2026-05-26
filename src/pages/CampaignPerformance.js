import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import KPIBox from '../components/KPIBox';
import ChartCard from '../components/ChartCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getCampaignData } from '../services/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock campaign data
const mockCampaigns = [
  {
    id: 1,
    name: "Summer Sale 2026",
    impressions: 125000,
    clicks: 8500,
    conversions: 720,
    ctr: 6.8,
    conversionRate: 8.47,
    status: "Active",
    budget: 15000,
    spend: 12500,
  },
  {
    id: 2,
    name: "Spring Collection Launch",
    impressions: 98000,
    clicks: 7200,
    conversions: 640,
    ctr: 7.35,
    conversionRate: 8.89,
    status: "Active",
    budget: 12000,
    spend: 10800,
  },
  {
    id: 3,
    name: "Holiday Special Offers",
    impressions: 156000,
    clicks: 9800,
    conversions: 850,
    ctr: 6.28,
    conversionRate: 8.67,
    status: "Completed",
    budget: 20000,
    spend: 19500,
  },
  {
    id: 4,
    name: "Back to School",
    impressions: 87000,
    clicks: 5400,
    conversions: 420,
    ctr: 6.21,
    conversionRate: 7.78,
    status: "Active",
    budget: 10000,
    spend: 8200,
  },
  {
    id: 5,
    name: "Black Friday Preview",
    impressions: 142000,
    clicks: 11200,
    conversions: 980,
    ctr: 7.89,
    conversionRate: 8.75,
    status: "Paused",
    budget: 18000,
    spend: 9000,
  },
  {
    id: 6,
    name: "New Year Clearance",
    impressions: 76000,
    clicks: 4800,
    conversions: 380,
    ctr: 6.32,
    conversionRate: 7.92,
    status: "Completed",
    budget: 8000,
    spend: 7800,
  },
  {
    id: 7,
    name: "Weekend Flash Sale",
    impressions: 105000,
    clicks: 8900,
    conversions: 750,
    ctr: 8.48,
    conversionRate: 8.43,
    status: "Active",
    budget: 13000,
    spend: 11500,
  },
  {
    id: 8,
    name: "Premium Members Only",
    impressions: 62000,
    clicks: 5200,
    conversions: 520,
    ctr: 8.39,
    conversionRate: 10.0,
    status: "Active",
    budget: 9000,
    spend: 7800,
  },
  {
    id: 9,
    name: "Seasonal Accessories",
    impressions: 91000,
    clicks: 6100,
    conversions: 480,
    ctr: 6.7,
    conversionRate: 7.87,
    status: "Paused",
    budget: 11000,
    spend: 5500,
  },
  {
    id: 10,
    name: "Clearance Event",
    impressions: 118000,
    clicks: 7800,
    conversions: 620,
    ctr: 6.61,
    conversionRate: 7.95,
    status: "Completed",
    budget: 14000,
    spend: 13200,
  },
];

const COLORS = ['#1976d2', '#9c27b0', '#4caf50', '#ff9800', '#f44336', '#00bcd4'];

const CampaignPerformance = () => {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [filteredCampaigns, setFilteredCampaigns] = useState(mockCampaigns);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const fetchData = () => {
    setLoading(true);
    setError(null);
    getCampaignData()
      .then((data) => {
        setCampaigns(data);
        setFilteredCampaigns(data);
        setLoading(false);
      })
      .catch((err) => {
        setCampaigns(mockCampaigns);
        setFilteredCampaigns(mockCampaigns);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = campaigns;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter((campaign) => campaign.status === statusFilter);
    }

    setFilteredCampaigns(filtered);
  }, [searchTerm, statusFilter, campaigns]);

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredCampaigns].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredCampaigns(sorted);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setSortConfig({ key: null, direction: 'asc' });
    setFilteredCampaigns(campaigns);
  };

  // Calculate KPIs
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const avgCTR = (campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length).toFixed(2);
  const bestCampaign = campaigns.reduce((best, c) => 
    c.conversionRate > (best.conversionRate || 0) ? c : best, 
    {}
  );

  // Prepare chart data (top 5 campaigns by conversions)
  const topCampaigns = [...campaigns]
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, 5);

  // Budget distribution for pie chart
  const budgetData = campaigns.slice(0, 6).map(c => ({
    name: c.name.length > 20 ? c.name.substring(0, 20) + '...' : c.name,
    value: c.spend,
  }));

  // Export to CSV function
  const exportToCSV = () => {
    const headers = ['Campaign Name', 'Impressions', 'Clicks', 'Conversions', 'CTR %', 'Conv. Rate %', 'Spend', 'Status'];
    const csvData = filteredCampaigns.map(c => [
      c.name,
      c.impressions,
      c.clicks,
      c.conversions,
      c.ctr.toFixed(2),
      c.conversionRate.toFixed(2),
      c.spend,
      c.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campaign-performance-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return (
    <div>
      <Navbar />
      <LoadingSpinner message="Loading campaign data..." />
    </div>
  );

  if (error) return (
    <div>
      <Navbar />
      <ErrorMessage message={error} onRetry={fetchData} />
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="page-header">
          <h1>Campaign Performance</h1>
          <p>Analyze performance metrics across all campaigns</p>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-4 mb-3">
          <KPIBox
            title="Total Campaigns"
            value={totalCampaigns}
            bgColor="#e3f2fd"
          />
          <KPIBox
            title="Active Campaigns"
            value={activeCampaigns}
            trend={`${((activeCampaigns/totalCampaigns)*100).toFixed(0)}%`}
            bgColor="#e8f5e9"
          />
          <KPIBox
            title="Total Spend"
            value={`$${totalSpend.toLocaleString()}`}
            bgColor="#fff3e0"
          />
          <KPIBox
            title="Average CTR"
            value={`${avgCTR}%`}
            bgColor="#f3e5f5"
          />
        </div>

        {/* Best Performer */}
        <div className="grid grid-cols-2 mb-3">
          <KPIBox
            title="Best Performing Campaign"
            value={bestCampaign.name || 'N/A'}
            trend={`${bestCampaign.conversionRate}% conversion`}
            bgColor="#fce4ec"
          />
          <KPIBox
            title="Top Campaign Conversions"
            value={bestCampaign.conversions?.toLocaleString() || '0'}
            bgColor="#e0f2f1"
          />
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="🔍 Search campaigns..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
          </select>
          {(searchTerm || statusFilter !== 'All') && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
          <button className="export-btn" onClick={exportToCSV}>
            📥 Export CSV
          </button>
          <span className="results-count">
            Showing {filteredCampaigns.length} of {campaigns.length} campaigns
          </span>
        </div>

        {/* Campaign Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th className="sortable-header" onClick={() => handleSort('name')}>
                  Campaign Name
                </th>
                <th className="sortable-header" onClick={() => handleSort('impressions')}>
                  Impressions
                </th>
                <th className="sortable-header" onClick={() => handleSort('clicks')}>
                  Clicks
                </th>
                <th className="sortable-header" onClick={() => handleSort('conversions')}>
                  Conversions
                </th>
                <th className="sortable-header" onClick={() => handleSort('ctr')}>
                  CTR %
                </th>
                <th className="sortable-header" onClick={() => handleSort('conversionRate')}>
                  Conv. Rate %
                </th>
                <th className="sortable-header" onClick={() => handleSort('spend')}>
                  Spend
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td>{campaign.name}</td>
                  <td>{campaign.impressions.toLocaleString()}</td>
                  <td>{campaign.clicks.toLocaleString()}</td>
                  <td>{campaign.conversions.toLocaleString()}</td>
                  <td>{campaign.ctr.toFixed(2)}%</td>
                  <td>{campaign.conversionRate.toFixed(2)}%</td>
                  <td>${campaign.spend.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${campaign.status.toLowerCase()}`}>
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 mb-3">
          {/* Top Campaigns Bar Chart */}
          <ChartCard title="Top Performing Campaigns" description="By conversions">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCampaigns} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" stroke="#757575" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150}
                  stroke="#757575"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="conversions" fill="#1976d2" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Budget Distribution Pie Chart */}
          <ChartCard title="Budget Allocation" description="Spend distribution by campaign">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {budgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `$${value.toLocaleString()}`}
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
    </div>
  );
};

export default CampaignPerformance;