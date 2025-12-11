import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, MessageSquare, User } from 'lucide-react';

interface MobileNavProps {
  userRole: 'venue' | 'staff' | 'promoter';
}

const MobileNav: React.FC<MobileNavProps> = ({ userRole }) => {
  const location = useLocation();
  
  const activeColor = userRole === 'staff' ? 'text-neon-rose' : 'text-electric-blue';
  const shadowColor = userRole === 'staff' ? 'shadow-[0_0_15px_rgba(255,126,179,0.3)]' : 'shadow-[0_0_15px_rgba(0,224,255,0.3)]';

  const navItems = [
    { icon: Home, label: 'Home', path: `/${userRole}/dashboard` },
    { icon: Search, label: 'Discover', path: `/${userRole}/discovery` },
    { icon: Calendar, label: 'Schedule', path: `/${userRole}/shifts` },
    { icon: MessageSquare, label: 'Inbox', path: `/${userRole}/messages` },
    { icon: User, label: 'Profile', path: `/${userRole}/profile` },
  ];

  return (
    <nav className="fixed bottom-6 inset-x-6 z-50">
      <div className="glass-panel rounded-2xl p-4 flex justify-between items-center transition-all duration-300">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 w-12 transition-all duration-300 relative
              ${isActive ? `scale-110 ${activeColor}` : 'text-txt-secondary hover:text-txt-primary'}
            `}
          >
            <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'fill-current' : ''}`} strokeWidth={2.5} />
            
            {location.pathname === item.path && (
               <div className={`absolute -bottom-3 w-1 h-1 rounded-full bg-current ${shadowColor}`} />
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;