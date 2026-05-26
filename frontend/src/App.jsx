import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AgentDashboard from './pages/AgentDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerKYC from './pages/CustomerKYC';
import ClaimsSubmission from './pages/ClaimsSubmission';
import ClaimsAssessment from './pages/ClaimsAssessment';
import FraudDetection from './pages/FraudDetection';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-ink text-gray-100 font-sans selection:bg-brand-gold/30 flex">
        <SideBar />
        <main className="flex-1 h-screen overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/agent" element={<AgentDashboard />} />
              <Route path="/customer" element={<CustomerDashboard />} />
              <Route path="/kyc" element={<CustomerKYC />} />
              <Route path="/claims" element={<ClaimsSubmission />} />
              <Route path="/assessment" element={<ClaimsAssessment />} />
              <Route path="/fraud" element={<FraudDetection />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;