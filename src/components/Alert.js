import React, { useContext } from 'react';
import NoteContext from '../context/notes/nodeContext';

const Alert = (props) => {
  let { alert } = useContext(NoteContext);

  
  if (!alert.show) return null;

  
  const alertClass = `alert alert-${alert.type} alert-dismissible fade show shadow-lg rounded-3 d-flex align-items-center justify-content-between m-1`;

  return (
    <div className={alertClass} role="alert">
      
      <div className="d-flex align-items-center justify-content-center w-100">
      
        {alert.type === 'success' && (
          <i className="bi bi-check-circle-fill text-success me-2"></i>
        )}
        {alert.type === 'danger' && (
          <i className="bi bi-x-circle-fill text-danger me-2"></i> 
        )}
        {alert.type === 'warning' && (
          <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
        )}
        {alert.type === 'info' && (
          <i className="bi bi-info-circle-fill text-info me-2"></i>
        )}

        {/* Alert message */}
        <span className="fw-semibold me-auto">{alert.message}</span>
      </div>
    </div>
  );
};

export default Alert;
