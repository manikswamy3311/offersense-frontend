import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getCustomerSegments } from '../services/api';

const CustomerSegments = () => {
  const [segments, setSegments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomerSegments()
      .then((data) => {
        setSegments(data);
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
          <h1>Customer Segments</h1>
          <p>Understand your customer base through segmentation analysis</p>
        </div>

        {loading ? (
          <div className="loading">Loading segment data</div>
        ) : (
          <div className="empty-state">
            <h2>👥 Customer Insights Coming Soon</h2>
            <p>This page will show customer segment distribution, behavior patterns, and engagement metrics.</p>
            <p style={{ marginTop: '1rem', color: '#1976d2' }}>Features: Segment breakdown, demographic analysis, value distribution</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSegments;