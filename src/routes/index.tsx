import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from '../pages/home';
import AnalysisPage from '../pages/analysis';
import FindActions from '../pages/find-actions';
import VerifySale from '../pages/verify-sale';


function App() {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname === '/') {
            navigate('/home')
        }
    }, [])

    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/find-actions" element={<FindActions />} />
            <Route path="/verify-sales" element={<VerifySale />} />
            <Route path="*" element={<HomePage />} />
        </Routes>
    );
}

export default App;