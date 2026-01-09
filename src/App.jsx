import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Existing Client Components
import TopBar from './client/components/Header/TopBar';
import Navbar from './client/components/Header/Navbar';
import Footer from './client/components/Footer/Footer';
import ScrollToTop from './client/components/ScrollToTop';
import CallButton from './client/components/CallButton';

// Page Components
import HomePage from './client/pages/HomePage';
import AboutPage from './client/pages/AboutPage';
import ContactPage from './client/pages/ContactPage';
import ActivitiesPage from './client/pages/ActivitiesPage';
import GalleryPage from './client/pages/GalleryPage';
import NewsUpdates from './client/pages/NewsUpdatesPage';
import AdmissionPage from './client/pages/AdmissionPage';
import FacilitiesPage from './client/pages/FacilitiesPage';
import AcademicsPage from './client/pages/AcademicsPage';
import PublicDisclosure from './client/pages/PublicDisclosure';
import FeeStructure from './client/pages/FeeStructure';

// Admin Components (Import your Admin Layout or Main Admin page)
import AdminRoutes from './admin/auth/AdminRoute';
import TCDownload from './client/pages/TCDownload';

// Helper component to hide Header/Footer on Admin routes
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPath && <TopBar />}
      {!isAdminPath && <Navbar />}
      {!isAdminPath && <ScrollToTop />}
      
      <main className="min-h-screen">
        {children}
      </main>

      {!isAdminPath && <Footer />}
      {!isAdminPath && <CallButton />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* CLIENT ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/news" element={<NewsUpdates />} />
          <Route path="/admission" element={<AdmissionPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/academics/details" element={<AcademicsPage />} />
          <Route path='/disclosure' element={< PublicDisclosure />} />
          <Route path='/fee' element={< FeeStructure />} />
          <Route path='/student/tc' element={< TCDownload />} />

          {/* ADMIN ROUTES */}
          {/* Isme aapka login aur dashboard manage hoga */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* 404 PAGE */}
          <Route path="*" element={<div className="py-20 text-center text-2xl font-bold">404 - Page Not Found</div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;