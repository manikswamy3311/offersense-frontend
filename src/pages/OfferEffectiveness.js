import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getOfferEffectiveness } from '../services/api';

const OfferEffectiveness = () => {
  const [offers, setOffers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOfferEffectiveness()
      .then((data) => {
        setOffers(data);
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
          <h1>Offer Effectiveness</h1>
          <p>Evaluate and compare the performance of your promotional offers</p>
        </div>

        {loading ? (
          <div className="loading">Loading offer data</div>
        ) : (
          <div className="empty-state">
            <h2>🎯 Offer Analytics Coming Soon</h2>
            <p>This page will display offer performance comparisons, redemption rates, and ROI analysis.</p>
            <p style={{ marginTop: '1rem', color: '#1976d2' }}>Features: Offer rankings, redemption trends, performance heatmap</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferEffectiveness;