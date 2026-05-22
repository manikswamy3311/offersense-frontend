import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import KPIBox from '../components/KPIBox';
import ChartCard from '../components/ChartCard';
import { getOfferEffectiveness } from '../services/api';
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

// Mock offer data
const mockOffers = [
  {
    id: 1,
    name: "Summer Sale 25% Off",
    code: "SUMMER25",
    type: "Percentage",
    discountValue: 25,
    redemptionCount: 3420,
    impressions: 45000,
    redemptionRate: 7.6,
    revenueGenerated: 256000,
    cost: 85000,
    roi: 3.01,
    status: "Active",
    campaign: "Summer Sale 2026"
  },
  {
    id: 2,
    name: "Free Shipping on $50+",
    code: "SHIP50",
    type: "Free Shipping",
    discountValue: 0,
    redemptionCount: 5200,
    impressions: 62000,
    redemptionRate: 8.4,
    revenueGenerated: 312000,
    cost: 52000,
    roi: 6.0,
    status: "Active",
    campaign: "Ongoing"
  },
  {
    id: 3,
    name: "Buy One Get One Free",
    code: "BOGO",
    type: "BOGO",
    discountValue: 50,
    redemptionCount: 2800,
    impressions: 38000,
    redemptionRate: 7.4,
    revenueGenerated: 168000,
    cost: 84000,
    roi: 2.0,
    status: "Active",
    campaign: "Spring Collection"
  },
  {
    id: 4,
    name: "$20 Off Orders Over $100",
    code: "SAVE20",
    type: "Fixed Amount",
    discountValue: 20,
    redemptionCount: 1850,
    impressions: 32000,
    redemptionRate: 5.8,
    revenueGenerated: 185000,
    cost: 37000,
    roi: 5.0,
    status: "Active",
    campaign: "Premium Products"
  },
  {
    id: 5,
    name: "Weekend Flash 30% Off",
    code: "WEEKEND30",
    type: "Percentage",
    discountValue: 30,
    redemptionCount: 4100,
    impressions: 48000,
    redemptionRate: 8.5,
    revenueGenerated: 287000,
    cost: 123000,
    roi: 2.33,
    status: "Expired",
    campaign: "Weekend Flash Sale"
  },
  {
    id: 6,
    name: "Bundle Deal - 3 for $99",
    code: "BUNDLE99",
    type: "Bundle Deal",
    discountValue: 15,
    redemptionCount: 1420,
    impressions: 28000,
    redemptionRate: 5.1,
    revenueGenerated: 140580,
    cost: 24780,
    roi: 5.67,
    status: "Active",
    campaign: "Bundle Promotion"
  },
  {
    id: 7,
    name: "First Purchase 15% Off",
    code: "FIRST15",
    type: "Percentage",
    discountValue: 15,
    redemptionCount: 2650,
    impressions: 52000,
    redemptionRate: 5.1,
    revenueGenerated: 159000,
    cost: 26500,
    roi: 6.0,
    status: "Active",
    campaign: "New Customer"
  },
  {
    id: 8,
    name: "Clearance 40% Off",
    code: "CLEAR40",
    type: "Percentage",
    discountValue: 40,
    redemptionCount: 3800,
    impressions: 41000,
    redemptionRate: 9.3,
    revenueGenerated: 228000,
    cost: 152000,
    roi: 1.5,
    status: "Active",
    campaign: "Clearance Event"
  },
  {
    id: 9,
    name: "Loyalty Members 10% Off",
    code: "LOYAL10",
    type: "Percentage",
    discountValue: 10,
    redemptionCount: 6200,
    impressions: 78000,
    redemptionRate: 7.9,
    revenueGenerated: 372000,
    cost: 37200,
    roi: 10.0,
    status: "Active",
    campaign: "Loyalty Program"
  },
  {
    id: 10,
    name: "$10 Off First Order",
    code: "WELCOME10",
    type: "Fixed Amount",
    discountValue: 10,
    redemptionCount: 2100,
    impressions: 38000,
    redemptionRate: 5.5,
    revenueGenerated: 126000,
    cost: 21000,
    roi: 6.0,
    status: "Active",
    campaign: "Welcome Campaign"
  },
  {
    id: 11,
    name: "Seasonal 20% Off",
    code: "SEASON20",
    type: "Percentage",
    discountValue: 20,
    redemptionCount: 980,
    impressions: 25000,
    redemptionRate: 3.9,
    revenueGenerated: 58800,
    cost: 14700,
    roi: 4.0,
    status: "Expired",
    campaign: "Seasonal"
  },
  {
    id: 12,
    name: "Student Discount 15%",
    code: "STUDENT15",
    type: "Percentage",
    discountValue: 15,
    redemptionCount: 1680,
    impressions: 22000,
    redemptionRate: 7.6,
    revenueGenerated: 100800,
    cost: 17640,
    roi: 5.71,
    status: "Active",
    campaign: "Student Program"
  },
];

const COLORS = ['#1976d2', '#9c27b0', '#4caf50', '#ff9800', '#f44336', '#00bcd4'];

const OfferEffectiveness = () => {
  const [offers, setOffers] = useState(mockOffers);
  const [filteredOffers, setFilteredOffers] = useState(mockOffers);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    // Try to fetch from API, fallback to mock data
    getOfferEffectiveness()
      .then((data) => {
        setOffers(data);
        setFilteredOffers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Using mock offer data");
        setOffers(mockOffers);
        setFilteredOffers(mockOffers);
        setLoading(false);
      });
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = offers;

    if (searchTerm) {
      filtered = filtered.filter((offer) =>
        offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'All') {
      filtered = filtered.filter((offer) => offer.type === typeFilter);
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((offer) => offer.status === statusFilter);
    }

    setFilteredOffers(filtered);
  }, [searchTerm, typeFilter, statusFilter, offers]);

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredOffers].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredOffers(sorted);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('All');
    setStatusFilter('All');
    setSortConfig({ key: null, direction: 'asc' });
    setFilteredOffers(offers);
  };

  // Calculate KPIs
  const activeOffers = offers.filter(o => o.status === 'Active').length;
  const totalRedemptions = offers.reduce((sum, o) => sum + o.redemptionCount, 0);
  const totalRevenue = offers.reduce((sum, o) => sum + o.revenueGenerated, 0);
  const avgRedemptionRate = (offers.reduce((sum, o) => sum + o.redemptionRate, 0) / offers.length).toFixed(1);
  const avgROI = (offers.reduce((sum, o) => sum + o.roi, 0) / offers.length).toFixed(2);
  const totalCost = offers.reduce((sum, o) => sum + o.cost, 0);

  // Best and worst performers
  const topOffers = [...offers].sort((a, b) => b.roi - a.roi).slice(0, 3);
  const worstOffers = [...offers].sort((a, b) => a.roi - b.roi).slice(0, 3);

  // Get performance level
  const getPerformanceLevel = (roi) => {
    if (roi >= 5) return 'high';
    if (roi >= 2.5) return 'medium';
    return 'low';
  };

  // Prepare chart data
  const topRedemptions = [...offers]
    .sort((a, b) => b.redemptionCount - a.redemptionCount)
    .slice(0, 6);

  const offerTypes = [...new Set(offers.map(o => o.type))];
  const typeDistribution = offerTypes.map(type => ({
    name: type,
    value: offers.filter(o => o.type === type).length,
  }));

  // Performance matrix
  const winners = offers.filter(o => o.roi >= 4 && o.redemptionRate >= 7).length;
  const gems = offers.filter(o => o.roi >= 4 && o.redemptionRate < 7).length;
  const review = offers.filter(o => o.roi < 4 && o.redemptionRate >= 7).length;
  const underperformers = offers.filter(o => o.roi < 4 && o.redemptionRate < 7).length;

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="page-header">
          <h1>Offer Effectiveness</h1>
          <p>Evaluate and compare the performance of your promotional offers</p>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-4 mb-3">
          <KPIBox
            title="Active Offers"
            value={activeOffers}
            bgColor="#e3f2fd"
          />
          <KPIBox
            title="Total Redemptions"
            value={totalRedemptions.toLocaleString()}
            bgColor="#e8f5e9"
          />
          <KPIBox
            title="Total Revenue"
            value={`$${(totalRevenue / 1000).toFixed(0)}K`}
            bgColor="#f3e5f5"
          />
          <KPIBox
            title="Average ROI"
            value={`${avgROI}x`}
            trend={`${avgRedemptionRate}% redemption`}
            bgColor="#fff3e0"
          />
        </div>

        {/* Additional KPIs */}
        <div className="grid grid-cols-2 mb-3">
          <KPIBox
            title="Best Performing Offer"
            value={topOffers[0]?.name || 'N/A'}
            trend={`${topOffers[0]?.roi}x ROI`}
            bgColor="#fce4ec"
          />
          <KPIBox
            title="Total Discounts Given"
            value={`$${(totalCost / 1000).toFixed(0)}K`}
            bgColor="#e0f2f1"
          />
        </div>

        {/* Performance Matrix */}
        <div className="page-header">
          <h2>Performance Matrix</h2>
          <p>Offers categorized by ROI and redemption rate</p>
        </div>

        <div className="performance-matrix">
          <div className="matrix-cell winners">
            <div className="matrix-title">🏆 Winners</div>
            <div className="matrix-count">{winners}</div>
            <div className="matrix-description">High ROI + High Redemption</div>
          </div>
          <div className="matrix-cell gems">
            <div className="matrix-title">💎 Hidden Gems</div>
            <div className="matrix-count">{gems}</div>
            <div className="matrix-description">High ROI + Low Redemption</div>
          </div>
          <div className="matrix-cell review">
            <div className="matrix-title">⚠️ Review Needed</div>
            <div className="matrix-count">{review}</div>
            <div className="matrix-description">Low ROI + High Redemption</div>
          </div>
          <div className="matrix-cell underperformers">
            <div className="matrix-title">📉 Underperformers</div>
            <div className="matrix-count">{underperformers}</div>
            <div className="matrix-description">Low ROI + Low Redemption</div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="performers-section">
          <div className="page-header">
            <h2>Top 3 Performers</h2>
            <p>Best offers by ROI</p>
          </div>
          <div className="performers-grid">
            {topOffers.map((offer, index) => (
              <div key={offer.id} className="offer-card top-performer">
                <div className="offer-header">
                  <div>
                    <h3 className="offer-name">
                      {index === 0 && '🥇 '}
                      {index === 1 && '🥈 '}
                      {index === 2 && '🥉 '}
                      {offer.name}
                    </h3>
                    <div className="offer-code">{offer.code}</div>
                  </div>
                  <div className="offer-badges">
                    <span className="offer-type-badge">{offer.type}</span>
                    <span className={`performance-badge ${getPerformanceLevel(offer.roi)}`}>
                      {offer.roi}x ROI
                    </span>
                  </div>
                </div>
                <div className="offer-metrics-grid">
                  <div className="offer-metric">
                    <span className="offer-metric-label">Redemptions</span>
                    <span className="offer-metric-value">{offer.redemptionCount.toLocaleString()}</span>
                  </div>
                  <div className="offer-metric">
                    <span className="offer-metric-label">Rate</span>
                    <span className="offer-metric-value">{offer.redemptionRate}%</span>
                  </div>
                  <div className="offer-metric">
                    <span className="offer-metric-label">Revenue</span>
                    <span className="offer-metric-value">${(offer.revenueGenerated / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="🔍 Search offers..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            {offerTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
          {(searchTerm || typeFilter !== 'All' || statusFilter !== 'All') && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
          <span className="results-count">
            Showing {filteredOffers.length} of {offers.length} offers
          </span>
        </div>

        {/* Offer Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th className="sortable-header" onClick={() => handleSort('name')}>
                  Offer Name
                </th>
                <th>Type</th>
                <th className="sortable-header" onClick={() => handleSort('redemptionCount')}>
                  Redemptions
                </th>
                <th className="sortable-header" onClick={() => handleSort('redemptionRate')}>
                  Rate %
                </th>
                <th className="sortable-header" onClick={() => handleSort('revenueGenerated')}>
                  Revenue
                </th>
                <th className="sortable-header" onClick={() => handleSort('roi')}>
                  ROI
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((offer) => (
                <tr key={offer.id}>
                  <td>
                    <div>{offer.name}</div>
                    <small style={{ color: '#757575' }}>{offer.code}</small>
                  </td>
                  <td>
                    <span className="offer-type-badge" style={{ fontSize: '0.7rem' }}>
                      {offer.type}
                    </span>
                  </td>
                  <td>{offer.redemptionCount.toLocaleString()}</td>
                  <td>{offer.redemptionRate}%</td>
                  <td>${(offer.revenueGenerated / 1000).toFixed(0)}K</td>
                  <td>
                    <span className={`performance-badge ${getPerformanceLevel(offer.roi)}`}>
                      {offer.roi}x
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${offer.status.toLowerCase()}`}>
                      {offer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 mb-3" style={{ marginTop: '2rem' }}>
          {/* Top Redemptions Bar Chart */}
          <ChartCard title="Top Offers by Redemptions" description="Most redeemed offers">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topRedemptions} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" stroke="#757575" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={120}
                  stroke="#757575"
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="redemptionCount" fill="#4caf50" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Offer Type Distribution */}
          <ChartCard title="Offer Type Distribution" description="By number of offers">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
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

export default OfferEffectiveness;