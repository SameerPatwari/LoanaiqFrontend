import { useState } from 'react';
import { uploadFile } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const UploadForm = ({ setData }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }
    setError('');

    try {
      const data = await uploadFile(file);
      setData(data);
      navigate('/preview');
      window.scrollTo({ top: 200, behavior: 'smooth' }); // Scroll down after upload
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <img src="/logo.png" alt="Logo" style={styles.logo} />
      <h1 style={styles.title}>Business Credit Automation</h1>
      <h2 style={styles.header}>Upload Excel File</h2>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} style={styles.input} />
      <button onClick={handleUpload} style={styles.button}>Upload</button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#F8EDED',
  },
  logo: {
    width: '369px',
    marginBottom: '20px',
  },
  title: {
    color: '#173B45',
    fontSize: '32px',
    marginBottom: '20px',
  },
  header: {
    color: '#000000', // Black text
    marginBottom: '20px',
  },
  input: {
    marginBottom: '10px',
    color: '#000000', // Black text
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50', // Green color
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: '#B43F3F',
    marginTop: '10px',
  },
};

export default UploadForm;