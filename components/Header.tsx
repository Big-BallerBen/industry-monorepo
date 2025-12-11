import React from 'react';
import { Bell, Plus, Menu, Bot, ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenAi: () => void;
  onOpenActionDrawer: () => void;
  onOpenMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAi, onOpenActionDrawer, onOpenMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  // 1. Hide Global Header on Discovery and Shifts Pages (Local headers used)
  if (path.includes('/discovery') || path.includes('/shifts')) {
    return null;
  }

  // Role Detection
  let role = 'staff';
  if (path.includes('/venue')) role = 'venue';
  if (path.includes('/promoter')) role = 'promoter';

  // Identify Sub-Pages (Settings Menu Pages)
  const isSubPage = [
    '/staff/wallet',
    '/staff/crew',
    '/staff/trust',
    '/staff/settings',
    '/staff/safety'
  ].includes(path);

  // Title Logic
  const getTitle = () => {
    if (path.includes('/staff/wallet')) return 'WALLET';
    if (path.includes('/staff/crew')) return 'MY CREW';
    if (path.includes('/staff/trust')) return 'TRUST SCORE';
    if (path.includes('/staff/settings')) return 'SETTINGS';
    if (path.includes('/staff/safety')) return 'SAFETY CENTER';
    
    if (path.includes('/messages')) return 'INBOX';
    if (path.includes('/dashboard')) return 'INDUSTRY';
    if (path.includes('/profile')) return 'INDUSTRY';
    return 'INDUSTRY';
  };

  const rawTitle = getTitle();
  const isTwoTone = rawTitle.includes(' ');
  const titleParts = rawTitle.split(' ');
  const isMessages = path.includes('/messages');
  const isProfile = path.includes('/profile');

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-6 py-4 grid grid-cols-3 items-center glass-panel border-x-0 border-t-0 rounded-none transition-colors duration-300">
      
      {/* Left: Action Button OR Back Arrow */}
      <div className="justify-self-start">
        {isSubPage ? (
            <button 
              onClick={() => navigate('/staff/profile')}
              className="w-10 h-10 rounded-full flex items-center justify-start text-txt-primary hover:text-txt-secondary transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
        ) : (
            <button 
              onClick={onOpenActionDrawer}
              className="w-10 h-10 rounded-full bg-transparent border border-glass-border flex items-center justify-center text-txt-primary hover:bg-white/10 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
        )}
      </div>

      {/* Center: Dynamic Title */}
      <div className="justify-self-center whitespace-nowrap">
        <h1 className="text-xl font-display font-black tracking-widest text-txt-primary uppercase flex gap-2">
          {isTwoTone ? (
            <>
              <span>{titleParts[0]}</span>
              <span className="text-brand">{titleParts[1]}</span>
            </>
          ) : (
             <span>{rawTitle}</span>
          )}
        </h1>
      </div>

      {/* Right: Icon Logic */}
      <div className="justify-self-end">
        {isSubPage ? (
           <button 
             onClick={onOpenMenu}
             className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
           >
             <Menu className="w-6 h-6 text-txt-primary" />
           </button>
        ) : isProfile ? (
           <button 
             onClick={onOpenMenu}
             className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
           >
             <Menu className="w-6 h-6 text-txt-primary" />
           </button>
        ) : isMessages ? (
          <button 
            onClick={onOpenAi}
            className="relative p-2 rounded-full hover:bg-white/10 transition-colors group"
          >
            <Bot className="w-6 h-6 text-brand group-hover:text-txt-primary transition-colors" />
          </button>
        ) : (
          <button 
            onClick={() => navigate(`/${role}/messages`)}
            className="relative p-2 rounded-full hover:bg-white/10 transition-colors group"
          >
            <Bell className="w-6 h-6 text-txt-secondary group-hover:text-txt-primary transition-colors" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full border border-app"></span>
          </button>
        )}
      </div>

    </header>
  );
};

export default Header;