import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';

// Dashboard / Private Pages
import LoginPage from '../dashboard/pages/LoginPage.jsx';
import RegisterPage from '../dashboard/pages/RegisterPage.jsx';
import DashboardPage from '../dashboard/pages/DashboardPage.jsx';

// Landing Page (Isolated module)
import LandingPage from '../landing/LandingPage.jsx';

// Public Portfolio Pages
import PublicPortfolioPage from '../portfolio/pages/PublicPortfolioPage.jsx';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing & Information */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Private CMS Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Quick Demo Routes */}
      <Route path="/demo1" element={<PublicPortfolioPage overrideUsername="demo1" />} />
      <Route path="/demo2" element={<PublicPortfolioPage overrideUsername="demo2" />} />

      {/* Public Vanity URL Route (/:username) */}
      <Route path="/:username" element={<PublicPortfolioPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
