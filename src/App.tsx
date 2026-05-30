import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import CandidateDashboard from './pages/CandidateDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CompanyProfile from './pages/CompanyProfile';
import CandidateProfile from './pages/CandidateProfile';
import CreateProfile from './pages/CreateProfile';
import { ToastProvider } from './context/ToastContext';

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/candidates" element={<CandidateDashboard />} />
          <Route path="/companies" element={<RecruiterDashboard />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/candidate-profile" element={<CandidateProfile />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </BrowserRouter>
  );
}
