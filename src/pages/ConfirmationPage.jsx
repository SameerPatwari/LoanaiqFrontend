import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadToS3 } from '../utils/api';

const ConfirmationPage = ({ data }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    setIsUploading(true);
    setError('');
    
    try {
      const id = await uploadToS3(data);
      navigate('/success', { state: { userId: id } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const renderTable = (title, tableData) => (
    <div style={styles.tableContainer}>
      <h3 style={styles.tableTitle}>{title}</h3>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>Financial Term</th>
              {tableData.years.map((year, index) => (
                <th key={index} style={styles.headerCell}>{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(tableData).map(([category, items]) => {
              if (category === 'years' || typeof items !== 'object') return null;
              
              return Object.entries(items).map(([key, values]) => (
                <tr key={`${category}-${key}`}>
                  <td style={styles.cell}>{key}</td>
                  {values.map((value, index) => (
                    <td key={index} style={styles.cell}>{value}</td>
                  ))}
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Confirm Data</h2>
      
      {renderTable('Balance Sheet', data.balance_sheet)}
      {renderTable('Profit & Loss Statement', data.profit_loss)}
      {renderTable('Ratios', data.ratios)}

      <div style={styles.footer}>
        <div style={styles.checkboxContainer}>
          <input 
            type="checkbox"
            id="confirm"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
            style={styles.checkbox}
          />
          <label htmlFor="confirm" style={styles.label}>
            Data verification complete
          </label>
        </div>

        <button
          style={{
            ...styles.button,
            opacity: !confirmed || isUploading ? 0.5 : 1,
          }}
          disabled={!confirmed || isUploading}
          onClick={handleUpload}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>

        {userId && (
          <div style={styles.success}>
            Upload Successful! Your User ID: {userId}
          </div>
        )}
        
        {error && (
          <div style={styles.error}>
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#F8EDED',
    color: '#173B45',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '20px',
  },
  tableContainer: {
    marginBottom: '30px',
  },
  tableTitle: {
    marginBottom: '10px',
    color: '#173B45',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#FFFFFF',
  },
  headerCell: {
    padding: '12px 8px',
    backgroundColor: '#FF8225',
    color: '#FFFFFF',
    textAlign: 'left',
  },
  cell: {
    padding: '8px',
    borderBottom: '1px solid #B43F3F',
    color: '#000000',
  },
  footer: {
    marginTop: '30px',
  },
  checkboxContainer: {
    marginBottom: '20px',
  },
  checkbox: {
    marginRight: '10px',
  },
  label: {
    cursor: 'pointer',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50', // Green color
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  success: {
    padding: '15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '4px',
    marginTop: '10px',
  },
  error: {
    padding: '15px',
    backgroundColor: '#f44336',
    color: 'white',
    borderRadius: '4px',
    marginTop: '10px',
  },
};

export default ConfirmationPage;