import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getCampaignData } from '../services/api';

const CampaignPerformance = () => {
  const [campaigns, setCampaigns] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCampaignData()
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="page-header">
          <h1>Campaign Performance</h1>
          <p>Analyze performance metrics across all campaigns</p>
        </div>

        {loading ? (
          <div className="loading">Loading campaign data</div>
        ) : (
          <div className="empty-state">
            <h2>📊 Campaign Analytics Coming Soon</h2>
            <p>This page will display detailed campaign performance metrics, comparison charts, and insights.</p>
            <p style={{ marginTop: '1rem', color: '#1976d2' }}>Features: Campaign list, performance trends, ROI analysis</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignPerformance;