import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UploadForm from './components/UploadForm';
import PreviewPage from './pages/PreviewPage';
import ConfirmationPage from './pages/ConfirmationPage';
import SuccessPage from './pages/SuccessPage';
import AnalyzePage from './pages/AnalyzePage';

const App = () => {
    const [data, setData] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<UploadForm setData={setData} />} />
                <Route path="/preview" element={<PreviewPage data={data} setData={setData} />} />
                <Route path="/confirm" element={<ConfirmationPage data={data} />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/analyze/:userId" element={<AnalyzePage />} />
            </Routes>
        </Router>
    );
};

export default App;
