import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Pages - Landing
import Landing from './pages/Landing';

// Pages - Staff
import StaffDashboard from './pages/staff/StaffDashboard';
import StaffDiscovery from './pages/staff/StaffDiscovery';
import StaffShifts from './pages/staff/StaffShifts';
import StaffMessages from './pages/staff/StaffMessages';
import StaffProfile from './pages/staff/StaffProfile';

// New Staff Sub-Pages
import StaffWallet from './pages/staff/StaffWallet';
import StaffCrew from './pages/staff/StaffCrew';
import StaffReputation from './pages/staff/StaffReputation';
import StaffSettings from './pages/staff/StaffSettings';
import StaffSafety from './pages/staff/StaffSafety';

// Pages - Venue
import VenueDashboard from './pages/venue/VenueDashboard';
import VenueDiscovery from './pages/venue/VenueDiscovery';
import VenueShifts from './pages/venue/VenueShifts';
import VenueMessages from './pages/venue/VenueMessages';
import VenueProfile from './pages/venue/VenueProfile';

// Pages - Promoter
import PromoterDashboard from './pages/promoter/PromoterDashboard';
import PromoterDiscovery from './pages/promoter/PromoterDiscovery';
import PromoterShifts from './pages/promoter/PromoterShifts';
import PromoterMessages from './pages/promoter/PromoterMessages';
import PromoterProfile from './pages/promoter/PromoterProfile';

import MobileNav from './components/MobileNav';
import Header from './components/Header';
import AiModal from './components/AiModal';
import PostShiftDrawer from './components/PostShiftDrawer';
import AddAvailabilityDrawer from './components/AddAvailabilityDrawer';
import MenuDrawer from './components/MenuDrawer';
import { ThemeWrapper } from './components/ThemeWrapper';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isActionDrawerOpen, setIsActionDrawerOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  
  // Determine role for MobileNav
  const path = location.pathname;
  let role: 'staff' | 'venue' | 'promoter' | null = null;
  if (path.startsWith('/staff')) role = 'staff';
  if (path.startsWith('/venue')) role = 'venue';
  if (path.startsWith('/promoter')) role = 'promoter';

  const isLanding = path === '/';

  const handleAction = () => {
    // In a real implementation, this would save data or update context
    setIsActionDrawerOpen(false);
  };

  // Listen for custom event from nested components (like DiscoveryFeed) to open AI Modal
  useEffect(() => {
    const handleOpenAiEvent = () => setIsAiModalOpen(true);
    window.addEventListener('open-ai-modal', handleOpenAiEvent);
    return () => window.removeEventListener('open-ai-modal', handleOpenAiEvent);
  }, []);

  return (
    // Replaced hardcoded bg-pure-black with semantic bg-app and text-txt-primary
    <div className="min-h-screen bg-app text-txt-primary font-body relative overflow-hidden transition-colors duration-300">
      
      {/* Background Ambient Effects (Optional: Can hide in Light mode using CSS vars if desired, or keep subtle) */}
      <div className="fixed top-[-10%] left-[-20%] w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="fixed bottom-[-10%] right-[-20%] w-[500px] h-[500px] bg-neon-rose/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Header (Only show if not on landing) */}
      {!isLanding && (
        <Header 
          onOpenAi={() => setIsAiModalOpen(true)} 
          onOpenActionDrawer={() => setIsActionDrawerOpen(true)}
          onOpenMenu={() => setIsMenuDrawerOpen(true)}
        />
      )}

      {/* Main Content */}
      {children}

      {/* Global AI Modal */}
      <AiModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />

      {/* Menu Drawer */}
      <MenuDrawer isOpen={isMenuDrawerOpen} onClose={() => setIsMenuDrawerOpen(false)} />

      {/* Global Action Drawers */}
      {(role === 'venue' || role === 'promoter') && (
        <PostShiftDrawer 
          open={isActionDrawerOpen} 
          onClose={() => setIsActionDrawerOpen(false)} 
          onPost={handleAction} 
        />
      )}

      {role === 'staff' && (
        <AddAvailabilityDrawer 
          open={isActionDrawerOpen} 
          onClose={() => setIsActionDrawerOpen(false)} 
          onSave={handleAction} 
        />
      )}
      
      {/* Mobile Navigation */}
      {role && <MobileNav userRole={role} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeWrapper>
        <Layout>
          <Routes>
            {/* Public / Landing */}
            <Route path="/" element={<Landing />} />

            {/* Staff Routes */}
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            <Route path="/staff/discovery" element={<StaffDiscovery />} />
            <Route path="/staff/shifts" element={<StaffShifts />} />
            <Route path="/staff/messages" element={<StaffMessages />} />
            <Route path="/staff/profile" element={<StaffProfile />} />
            
            {/* New Staff Sub-Pages */}
            <Route path="/staff/wallet" element={<StaffWallet />} />
            <Route path="/staff/crew" element={<StaffCrew />} />
            <Route path="/staff/trust" element={<StaffReputation />} />
            <Route path="/staff/settings" element={<StaffSettings />} />
            <Route path="/staff/safety" element={<StaffSafety />} />

            {/* Venue Routes */}
            <Route path="/venue/dashboard" element={<VenueDashboard />} />
            <Route path="/venue/discovery" element={<VenueDiscovery />} />
            <Route path="/venue/shifts" element={<VenueShifts />} />
            <Route path="/venue/messages" element={<VenueMessages />} />
            <Route path="/venue/profile" element={<VenueProfile />} />

            {/* Promoter Routes */}
            <Route path="/promoter/dashboard" element={<PromoterDashboard />} />
            <Route path="/promoter/discovery" element={<PromoterDiscovery />} />
            <Route path="/promoter/shifts" element={<PromoterShifts />} />
            <Route path="/promoter/messages" element={<PromoterMessages />} />
            <Route path="/promoter/profile" element={<PromoterProfile />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </ThemeWrapper>
    </Router>
  );
};

export default App;