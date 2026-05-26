import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Oops! Something went wrong</h3>
      <p>{message || 'Failed to load data. Please try again.'}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          🔄 Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
