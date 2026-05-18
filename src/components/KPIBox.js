import React from 'react';

const KPIBox = ({ title, value, trend, bgColor = '#e3f2fd', icon }) => {
  const getTrendColor = () => {
    if (!trend) return '';
    return trend.startsWith('+') ? '#4caf50' : '#f44336';
  };

  return (
    <div className="kpi-box" style={{ backgroundColor: bgColor }}>
      <div className="kpi-header">
        <h3 className="kpi-title">{title}</h3>
        {icon && <span className="kpi-icon">{icon}</span>}
      </div>
      <div className="kpi-value">{value}</div>
      {trend && (
        <div className="kpi-trend" style={{ color: getTrendColor() }}>
          <span>{trend.startsWith('+') ? '↑' : '↓'}</span>
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};

export default KPIBox;
