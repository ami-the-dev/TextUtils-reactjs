import React from 'react';

export default function Alert({ alert }) {
  if (!alert) return null;

  return (
    <div
      className={`alert alert-${alert.type}`}
      role="alert"
      style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        maxWidth: 480,
        width: '90%',
        padding: '10px 20px',
        fontSize: 14,
      }}
    >
      {alert.msg}
    </div>
  );
}
