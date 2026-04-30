import { useEffect, useState } from "react";
import { getKPIs } from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getKPIs()
      .then((res) => {
        console.log("API RESPONSE:", res);
        setData(res);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Impressions: {data.impressions}</p>
      <p>Clicks: {data.clicks}</p>
      <p>Conversions: {data.conversions}</p>
      <p>CTR: {data.ctr}</p>
      <p>Conversion Rate: {data.conversion_rate}</p>
    </div>
  );
}

export default Dashboard;