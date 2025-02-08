import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const ANALYSIS_API_URL = 'http://13.233.122.58:8000'; // Update with your FastAPI server URL

const AnalyzePage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState({ message: '', isError: false });
    const [uploadStatus, setUploadStatus] = useState({ message: '', isError: false });
    const [isGenerating, setIsGenerating] = useState(false);

    const handleLoadData = async () => {
        setLoadingStatus({ message: 'Loading data...', isError: false });
        try {
            const response = await axios.post(`${ANALYSIS_API_URL}/load-data`, { 
                user_id: userId 
            });
            setDataLoaded(true);
            setLoadingStatus({ message: response.data.message, isError: false });
        } catch (error) {
            setLoadingStatus({ 
                message: error.response?.data?.detail || 'Failed to load data', 
                isError: true 
            });
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', userId);

        setUploadStatus({ message: 'Uploading profile...', isError: false });
        try {
            const response = await axios.post(
                `${ANALYSIS_API_URL}/generate-note`,
                { user_id: userId },
                { responseType: 'blob' }
            );
        } catch (error) {
            console.error('Error details:', error);
            alert('Failed to generate appreciation note');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateNote = async () => {
        setIsGenerating(true);
        try {
            const response = await axios.post(
                `${ANALYSIS_API_URL}/generate-note`,
                { user_id: userId },
                { responseType: 'blob' }
            );

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `analysis_${userId}.docx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert('Failed to generate appreciation note');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Analysis Dashboard</h2>
            <p style={styles.userId}>User ID: {userId}</p>
            
            <div style={styles.section}>
                <h3 style={styles.sectionHeader}>1. Load Financial Data</h3>
                <button 
                    style={styles.button}
                    onClick={handleLoadData}
                >
                    Load Data
                </button>
                {loadingStatus.message && (
                    <p style={loadingStatus.isError ? styles.errorText : styles.successText}>
                        {loadingStatus.message}
                    </p>
                )}
            </div>

            <div style={styles.section}>
                <h3 style={styles.sectionHeader}>2. Upload Borrower's Profile</h3>
                <input
                    type="file"
                    accept=".docx,.pdf"
                    onChange={handleFileUpload}
                    style={styles.fileInput}
                />
                {uploadStatus.message && (
                    <p style={uploadStatus.isError ? styles.errorText : styles.successText}>
                        {uploadStatus.message}
                    </p>
                )}
            </div>

            <div style={styles.section}>
                <h3 style={styles.sectionHeader}>3. Generate Appreciation Note</h3>
                <button 
                    style={{
                        ...styles.button,
                        opacity: !dataLoaded ? 0.5 : 1,
                        cursor: !dataLoaded ? 'not-allowed' : 'pointer',
                    }}
                    onClick={handleGenerateNote}
                    disabled={!dataLoaded || isGenerating}
                >
                    {isGenerating ? 'Generating...' : 'Generate Appreciation Note'}
                </button>
            </div>

            <button 
                style={styles.homeButton}
                onClick={() => navigate('/')}
            >
                Back to Home
            </button>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#F8EDED',
        minHeight: '100vh',
        color: '#173B45',
    },
    header: {
        marginBottom: '20px',
    },
    userId: {
        color: '#4CAF50',
        fontSize: '18px',
        marginBottom: '20px',
    },
    section: {
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    sectionHeader: {
        marginTop: 0,
        marginBottom: '15px',
        color: '#173B45',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '10px',
    },
    homeButton: {
        padding: '10px 20px',
        backgroundColor: '#FF8225',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    fileInput: {
        marginBottom: '10px',
        color: '#173B45',
    },
    successText: {
        color: '#4CAF50',
        marginTop: '10px',
    },
    errorText: {
        color: '#f44336',
        marginTop: '10px',
    },
};

export default AnalyzePage;