import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Users, ChevronRight, Clock, Zap } from 'lucide-react';
import StaffShiftModal from '../../components/StaffShiftModal';
import { VENUE_IMAGES } from '../../utils/mockData';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [selectedShift, setSelectedShift] = useState<any>(null);

  // Dynamic Date
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const userStats = {
    name: "Elena",
    trustScore: 98,
    pendingPayout: 450.00,
    crewEarnings: 120.00,
    invitesLeft: 3,
    nextShift: {
      id: 99,
      venue: "Club Onyx",
      role: "Mixologist",
      time: "Tonight • 9:00 PM",
      rate: "$50/hr + Tips",
      pay: "$50/hr + Tips",
      isUrgent: true,
      image: VENUE_IMAGES['Club Onyx'],
      startTime: new Date(new Date().getTime() + 4 * 3600 * 1000).toISOString()
    }
  };

  return (
    <div className="w-full max-w-md mx-auto pb-24 space-y-6 animate-fade-up pt-24 px-4">
      
      {/* 1. WELCOME HEADER - Now a structured card for better visual presence */}
      <div className="glass-panel p-5 rounded-3xl flex justify-between items-center relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

        <div className="relative z-10">
          <p className="text-[10px] font-bold text-txt-tertiary uppercase tracking-widest mb-1">{currentDate}</p>
          <h1 className="font-display font-black text-3xl text-txt-primary uppercase tracking-tight leading-none mb-2">
            HELLO, <span className="text-brand">{userStats.name}</span>
          </h1>
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Active & Verified</p>
          </div>
        </div>
        
        <div 
            onClick={() => navigate('/staff/profile')}
            className="relative z-10 w-16 h-16 rounded-full p-[3px] border border-brand/30 cursor-pointer hover:border-brand transition-colors bg-panel"
        >
            <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover" 
            />
        </div>
      </div>

      {/* 2. NEXT MISSION CARD */}
      <div 
        onClick={() => setSelectedShift(userStats.nextShift)}
        className="relative w-full aspect-[2/1] rounded-3xl overflow-hidden group cursor-pointer content-card transition-all duration-500 hover:scale-[1.02] shadow-xl border border-white/5"
      >
        <img 
            src={userStats.nextShift.image}
            className="absolute inset-0 w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-105" 
            alt="Venue" 
        />
        {/* Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />
        
        {/* PINK BADGE - Explicitly Neon Rose for pop */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#FF7EB3] shadow-[0_0_15px_rgba(255,126,179,0.6)] z-20">
            <span className="text-[10px] font-black text-black uppercase tracking-wider">Next Shift</span>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 z-20">
            <h3 className="font-display font-black text-2xl text-white mb-2 drop-shadow-lg">{userStats.nextShift.venue}</h3>
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                    <Zap className="w-3 h-3 text-yellow-400" /> {userStats.nextShift.role}
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                    <Clock className="w-3 h-3 text-white" /> {userStats.nextShift.time}
                </span>
            </div>
        </div>
      </div>

      {/* 3. STATS GRID */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* WALLET WIDGET */}
        <div 
            onClick={() => navigate('/staff/wallet')}
            className="glass-panel p-5 rounded-2xl hover:bg-white/5 active:scale-95 transition-all cursor-pointer flex flex-col justify-between h-32"
        >
            <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <CreditCard className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-txt-secondary" />
            </div>
            <div>
                <div className="text-2xl font-mono font-bold text-txt-primary tracking-tight">${userStats.pendingPayout}</div>
                <div className="text-[10px] font-bold text-txt-tertiary uppercase tracking-widest mt-1">Pending Payout</div>
            </div>
        </div>

        {/* TRUST WIDGET */}
        <div 
            onClick={() => navigate('/staff/trust')}
            className="glass-panel p-5 rounded-2xl hover:bg-white/5 active:scale-95 transition-all cursor-pointer flex flex-col justify-between h-32"
        >
            <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-brand/10 text-brand">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded text-txt-primary">TOP 1%</div>
            </div>
            <div>
                <div className="text-2xl font-display font-black text-txt-primary">{userStats.trustScore}</div>
                <div className="text-[10px] font-bold text-txt-tertiary uppercase tracking-widest mt-1">Trust Score</div>
            </div>
        </div>
      </div>

      {/* 4. CREW BANNER - Standardized to Glass Panel */}
      <div 
        onClick={() => navigate('/staff/crew')}
        className="glass-panel p-5 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all group"
      >
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
            </div>
            <div>
                <h4 className="font-bold text-txt-primary text-sm">Build Your Crew</h4>
                <p className="text-xs text-txt-tertiary mt-0.5">
                    Earnings: <span className="text-brand font-bold">${userStats.crewEarnings}</span>
                </p>
            </div>
        </div>
        <div className="text-center bg-brand/5 px-4 py-2 rounded-xl border border-brand/10">
            {/* FORCE PINK COLOR FOR COUNT */}
            <div className="text-xl font-black text-neon-rose">{userStats.invitesLeft}</div>
            <div className="text-[8px] font-bold text-txt-tertiary uppercase tracking-widest">Invites</div>
        </div>
      </div>

      {/* 5. QUICK ACTIONS */}
      <div className="pt-2">
        <h3 className="text-xs font-bold text-txt-tertiary uppercase tracking-widest mb-3 pl-2">Quick Actions</h3>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            <button className="flex-shrink-0 px-4 py-3 rounded-xl content-card text-xs font-bold text-txt-secondary whitespace-nowrap hover:text-txt-primary transition-all">
                Update Availability
            </button>
            <button className="flex-shrink-0 px-4 py-3 rounded-xl content-card text-xs font-bold text-txt-secondary whitespace-nowrap hover:text-txt-primary transition-all">
                View Past Shifts
            </button>
            <button className="flex-shrink-0 px-4 py-3 rounded-xl content-card text-xs font-bold text-txt-secondary whitespace-nowrap hover:text-txt-primary transition-all">
                Contact Support
            </button>
        </div>
      </div>

      {selectedShift && (
        <StaffShiftModal 
            shift={selectedShift} 
            onClose={() => setSelectedShift(null)} 
        />
      )}

    </div>
  );
};

export default StaffDashboard;