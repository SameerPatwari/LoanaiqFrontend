import { useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {}; // Access userId from state

  const handleAnalyzeNow = () => {
    navigate(`/analyze/${userId}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Upload Successful!</h2>
        <div style={styles.userIdContainer}>
          <p style={styles.label}>Your User ID:</p>
          <p style={styles.userId}>{userId}</p>
          <p style={styles.note}>Please save this ID for future reference</p>
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.analyzeButton} onClick={handleAnalyzeNow}>
            Analyze Now
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F8EDED',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#173B45',
    marginTop: 0,
    marginBottom: '30px',
    textAlign: 'center',
  },
  userIdContainer: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  label: {
    color: '#173B45',
    fontSize: '16px',
    marginBottom: '8px',
  },
  userId: {
    color: '#4CAF50',
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  note: {
    color: '#999999',
    fontSize: '14px',
    margin: 0,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  analyzeButton: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  },
};

export default SuccessPage;