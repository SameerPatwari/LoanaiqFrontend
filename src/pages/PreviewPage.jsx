import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FinancialTable from '../components/FinancialTable';

const PreviewPage = ({ data, setData }) => {
  const navigate = useNavigate();

  if (!data || !data.balance_sheet || !data.profit_loss || !data.ratios) {
    return (
      <div>
        <h2>Error: No data available</h2>
        <button onClick={() => navigate('/')}>Return to Upload</button>
      </div>
    );
  }

  const handleDataChange = (section, newData) => {
    setData(prevData => ({
      ...prevData,
      [section]: newData
    }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Preview Data</h2>

      <FinancialTable 
        title="Balance Sheet" 
        data={data.balance_sheet} 
        years={data.balance_sheet.years} 
        onDataChange={handleDataChange}
      />
      <FinancialTable 
        title="Profit & Loss Statement" 
        data={data.profit_loss} 
        years={data.profit_loss.years}
        onDataChange={handleDataChange}
      />
      <FinancialTable 
        title="Ratios" 
        data={data.ratios} 
        years={data.ratios.years}
        onDataChange={handleDataChange}
      />

      <div style={styles.buttonContainer}>
        <button 
          style={styles.button}
          onClick={() => navigate('/confirm')}
        >
          Next
        </button>
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
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-start', // Align to the left
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#FF8225',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default PreviewPage;