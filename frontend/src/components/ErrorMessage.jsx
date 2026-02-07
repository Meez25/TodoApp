export const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div style={{
      padding: '12px 16px',
      backgroundColor: '#fee',
      border: '1px solid #fcc',
      borderRadius: '4px',
      color: '#c33',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    }}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#c33',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '0 8px'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export const SuccessMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div style={{
      padding: '12px 16px',
      backgroundColor: '#d4edda',
      border: '1px solid #c3e6cb',
      borderRadius: '4px',
      color: '#155724',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    }}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#155724',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '0 8px'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};
