import { useEffect, useState } from "react";
import { getKPIs, getTrendData } from "../services/api";
import Navbar from "../components/Navbar";
import KPIBox from "../components/KPIBox";
import ChartCard from "../components/ChartCard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [data, setData] = useState(null);
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock trend data for charts (last 7 days)
  const mockTrendData = [
    { date: "May 12", impressions: 45000, clicks: 3200, conversions: 280 },
    { date: "May 13", impressions: 52000, clicks: 3800, conversions: 320 },
    { date: "May 14", impressions: 48000, clicks: 3500, conversions: 290 },
    { date: "May 15", impressions: 61000, clicks: 4200, conversions: 380 },
    { date: "May 16", impressions: 55000, clicks: 3900, conversions: 350 },
    { date: "May 17", impressions: 58000, clicks: 4100, conversions: 370 },
    { date: "May 18", impressions: 63000, clicks: 4500, conversions: 410 },
  ];

  const mockMetricsData = [
    { metric: "Impressions", value: 382000, target: 400000 },
    { metric: "Clicks", value: 27200, target: 30000 },
    { metric: "Conversions", value: 2400, target: 2500 },
  ];

  useEffect(() => {
    getKPIs()
      .then((res) => {
        console.log("API RESPONSE:", res);
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Try to fetch trend data, fallback to mock data
    getTrendData()
      .then((res) => {
        setTrendData(res);
      })
      .catch((err) => {
        console.log("Using mock trend data");
        setTrendData(mockTrendData);
      });
  }, []);

  if (loading) return <div className="loading">Loading</div>;

  if (!data) return <div className="error-message">Failed to load data</div>;

  const displayTrendData = trendData || mockTrendData;

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Overview of your campaign performance metrics</p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-4 mb-3">
          <KPIBox
            title="Total Impressions"
            value={data.impressions?.toLocaleString() || "0"}
            trend="+12.5%"
            bgColor="#e3f2fd"
          />
          <KPIBox
            title="Total Clicks"
            value={data.clicks?.toLocaleString() || "0"}
            trend="+8.3%"
            bgColor="#f3e5f5"
          />
          <KPIBox
            title="Conversions"
            value={data.conversions?.toLocaleString() || "0"}
            trend="+15.7%"
            bgColor="#e8f5e9"
          />
          <KPIBox
            title="Click-Through Rate"
            value={`${(data.ctr * 100).toFixed(2)}%` || "0%"}
            trend="+2.1%"
            bgColor="#fff3e0"
          />
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 mb-3">
          <KPIBox
            title="Conversion Rate"
            value={`${(data.conversion_rate * 100).toFixed(2)}%` || "0%"}
            trend="+5.4%"
            bgColor="#fce4ec"
          />
          <KPIBox
            title="Avg. Cost per Click"
            value="$2.45"
            trend="-3.2%"
            bgColor="#e0f2f1"
          />
        </div>

        {/* Chart Section - Line Chart */}
        <div className="grid grid-cols-1 mb-3">
          <ChartCard
            title="Performance Trends"
            description="Daily metrics for the last 7 days"
          >
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={displayTrendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" stroke="#757575" />
                <YAxis stroke="#757575" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="impressions"
                  stroke="#1976d2"
                  strokeWidth={2}
                  dot={{ fill: "#1976d2", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Impressions"
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#9c27b0"
                  strokeWidth={2}
                  dot={{ fill: "#9c27b0", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Clicks"
                />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke="#4caf50"
                  strokeWidth={2}
                  dot={{ fill: "#4caf50", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Conversions"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Bar Chart - Metrics vs Target */}
        <div className="grid grid-cols-1">
          <ChartCard
            title="Metrics vs Target"
            description="Current performance against monthly targets"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockMetricsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="metric" stroke="#757575" />
                <YAxis stroke="#757575" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="value" fill="#1976d2" name="Current" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="#e0e0e0" name="Target" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;