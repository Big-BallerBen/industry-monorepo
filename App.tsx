import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// --- PUBLIC PAGES ---
import Landing from './pages/Landing';
import Login from './pages/Login';         // Ensure this file exists
import Download from './pages/Download';   // Ensure this file exists

// --- STAFF PAGES ---
import StaffDashboard from './pages/staff/StaffDashboard';
import StaffDiscovery from './pages/staff/StaffDiscovery';
import StaffShifts from './pages/staff/StaffShifts';
import StaffMessages from './pages/staff/StaffMessages';
import StaffProfile from './pages/staff/StaffProfile';
import StaffWallet from './pages/staff/StaffWallet';
import StaffCrew from './pages/staff/StaffCrew';
import StaffReputation from './pages/staff/StaffReputation';
import StaffSettings from './pages/staff/StaffSettings';
import StaffSafety from './pages/staff/StaffSafety';

// --- VENUE PAGES ---
import VenueDashboard from './pages/venue/VenueDashboard';
import VenueDiscovery from './pages/venue/VenueDiscovery';
import VenueShifts from './pages/venue/VenueShifts';
import VenueMessages from './pages/venue/VenueMessages';
import VenueProfile from './pages/venue/VenueProfile';

// --- PROMOTER PAGES ---
import PromoterDashboard from './pages/promoter/PromoterDashboard';
import PromoterDiscovery from './pages/promoter/PromoterDiscovery';
import PromoterShifts from './pages/promoter/PromoterShifts';
import PromoterMessages from './pages/promoter/PromoterMessages';
import PromoterProfile from './pages/promoter/PromoterProfile';

// --- COMPONENTS ---
import MobileNav from './components/MobileNav';
import Header from './components/Header';
import AiModal from './components/AiModal';
import PostShiftDrawer from './components/PostShiftDrawer';
import AddAvailabilityDrawer from './components/AddAvailabilityDrawer';
import MenuDrawer from './components/MenuDrawer';
import { ThemeWrapper } from './components/ThemeWrapper';

// --- 1. SPLASH SCREEN COMPONENT (Internal) ---
const SplashScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => navigate('/home'), 2500); // 2.5s delay then go to Landing
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative animate-fade-up text-center">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-zinc-800 to-black rounded-[2rem] border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(0,224,255,0.2)] mb-6">
           <span className="font-display font-black text-3xl text-white">IND</span>
        </div>
        <h1 className="font-display font-black text-3xl text-white tracking-[0.3em]">
          INDUSTRY<span className="text-electric-blue">.IO</span>
        </h1>
      </div>
    </div>
  );
};

// --- 2. LAYOUT WRAPPER ---
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isActionDrawerOpen, setIsActionDrawerOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  // Hide UI on Public Pages
  const isPublic = ['/', '/home', '/login', '/download'].includes(location.pathname);

  // Role Logic
  const path = location.pathname;
  let role: 'staff' | 'venue' | 'promoter' | null = null;
  if (path.startsWith('/staff')) role = 'staff';
  if (path.startsWith('/venue')) role = 'venue';
  if (path.startsWith('/promoter')) role = 'promoter';

  const handleAction = () => setIsActionDrawerOpen(false);

  return (
    <div className="min-h-screen bg-app text-txt-primary font-body relative overflow-hidden transition-colors duration-300">
      
      {/* Header - Only show inside the App (Not on Landing/Login/Download) */}
      {!isPublic && (
        <Header 
          onOpenAi={() => setIsAiModalOpen(true)} 
          onOpenActionDrawer={() => setIsActionDrawerOpen(true)}
          onOpenMenu={() => setIsMenuDrawerOpen(true)}
        />
      )}

      {children}

      {/* Global Modals (Only render if logged in/not public to save resources) */}
      {!isPublic && (
        <>
          <AiModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
          <MenuDrawer isOpen={isMenuDrawerOpen} onClose={() => setIsMenuDrawerOpen(false)} />
          
          {(role === 'venue' || role === 'promoter') && (
            <PostShiftDrawer open={isActionDrawerOpen} onClose={() => setIsActionDrawerOpen(false)} onPost={handleAction} />
          )}
          {role === 'staff' && (
            <AddAvailabilityDrawer open={isActionDrawerOpen} onClose={() => setIsActionDrawerOpen(false)} onSave={handleAction} />
          )}
          
          {role && <MobileNav userRole={role} />}
        </>
      )}
    </div>
  );
};

// --- 3. MAIN ROUTER ---
const App: React.FC = () => {
  return (
    <Router>
      <ThemeWrapper>
        <Layout>
          <Routes>
            {/* FLOW: Splash -> Home -> Login -> App */}
            <Route path="/" element={<SplashScreen />} />
            <Route path="/home" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/download" element={<Download />} />

            {/* STAFF */}
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            <Route path="/staff/discovery" element={<StaffDiscovery />} />
            <Route path="/staff/shifts" element={<StaffShifts />} />
            <Route path="/staff/messages" element={<StaffMessages />} />
            <Route path="/staff/profile" element={<StaffProfile />} />
            <Route path="/staff/wallet" element={<StaffWallet />} />
            <Route path="/staff/crew" element={<StaffCrew />} />
            <Route path="/staff/trust" element={<StaffReputation />} />
            <Route path="/staff/settings" element={<StaffSettings />} />
            <Route path="/staff/safety" element={<StaffSafety />} />

            {/* VENUE */}
            <Route path="/venue/dashboard" element={<VenueDashboard />} />
            <Route path="/venue/discovery" element={<VenueDiscovery />} />
            <Route path="/venue/shifts" element={<VenueShifts />} />
            <Route path="/venue/messages" element={<VenueMessages />} />
            <Route path="/venue/profile" element={<VenueProfile />} />

            {/* PROMOTER */}
            <Route path="/promoter/dashboard" element={<PromoterDashboard />} />
            <Route path="/promoter/discovery" element={<PromoterDiscovery />} />
            <Route path="/promoter/shifts" element={<PromoterShifts />} />
            <Route path="/promoter/messages" element={<PromoterMessages />} />
            <Route path="/promoter/profile" element={<PromoterProfile />} />

            {/* FALLBACK: Send unknown links to Splash */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </ThemeWrapper>
    </Router>
  );
};

export default App;
