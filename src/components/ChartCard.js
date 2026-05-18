import React from 'react';

const ChartCard = ({ title, description, children, className = '' }) => {
  return (
    <div className={`chart-card ${className}`}>
      <div className="chart-card-header">
        <h3 className="chart-card-title">{title}</h3>
        {description && <p className="chart-card-description">{description}</p>}
      </div>
      <div className="chart-card-content">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
