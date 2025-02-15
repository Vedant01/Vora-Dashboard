import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FundManagement from './pages/FundManagement';
import AIAllocation from './pages/AIAllocation';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 ml-64">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/funds" element={<FundManagement />} />
                    <Route path="/allocation" element={<AIAllocation />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;