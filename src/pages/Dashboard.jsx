import { useEffect, useState } from "react";
import { getKPIs } from "../services/api";
import Navbar from "../components/Navbar";
import KPIBox from "../components/KPIBox";
import ChartCard from "../components/ChartCard";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  if (loading) return <div className="loading">Loading</div>;

  if (!data) return <div className="error-message">Failed to load data</div>;

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

        {/* Chart Section */}
        <div className="grid grid-cols-1">
          <ChartCard
            title="Performance Trends"
            description="Campaign metrics over the last 30 days"
          >
            <div style={{ padding: "2rem", textAlign: "center", color: "#757575" }}>
              📊 Chart visualization will be added here in Day 2
              <br />
              <small>(Line chart showing impressions, clicks, and conversions over time)</small>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;