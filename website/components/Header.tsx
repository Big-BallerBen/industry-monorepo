import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenAi: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAi }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/home';
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path: string) => `
    nav-link font-display text-xs font-bold tracking-wider relative
    ${isActive(path) ? 'text-white after:w-full' : 'text-gray-400 hover:text-white'}
    transition-colors duration-300 cursor-pointer
    after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-electric-blue after:transition-[width] after:duration-300
    ${isActive(path) ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
  `;

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-24 z-40 glass-panel flex justify-between items-center px-8 border-b border-glass-border">
        {/* Left: Logo */}
        <div className="flex items-center z-20">
          <Link to="/" className="font-display font-black text-2xl tracking-tighter text-white drop-shadow-lg">
            INDUSTRY
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-8">
          <Link to="/" className={navLinkClass('/')}>HOME</Link>
          <Link to="/about" className={navLinkClass('/about')}>ABOUT</Link>
          
          <div className="relative group">
            <button className={`${isActive('/demo') ? 'text-white' : 'text-gray-400 hover:text-white'} font-display text-xs font-bold tracking-wider flex items-center gap-1 outline-none transition-colors`}>
              DEMO
              <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-40 bg-black/95 border border-glass-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50 backdrop-blur-md">
              <Link to="/demo/bar" className="block px-4 py-3 text-xs font-display font-bold tracking-wider hover:bg-white/10 text-gray-300 hover:text-white transition-colors border-b border-white/5 text-center">
                BAR DEMO
              </Link>
              <Link to="/demo/staff" className="block px-4 py-3 text-xs font-display font-bold tracking-wider hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-center">
                STAFF DEMO
              </Link>
            </div>
          </div>

          <Link to="/download" className={`${navLinkClass('/download')} text-electric-blue drop-shadow-[0_0_5px_rgba(0,224,255,0.5)]`}>
            DOWNLOAD NOW
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-6 z-20">
          <button 
            onClick={onOpenAi}
            className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-electric-blue/30 rounded-lg transition-all text-xs font-bold tracking-wider text-electric-blue shadow-neon-blue group backdrop-blur-sm mr-2"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden lg:inline">AI OPS</span>
          </button>

          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-all text-xs font-bold tracking-wider text-white hover:border-electric-blue/50 group backdrop-blur-sm">
            <User className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            LOG IN
          </button>
          
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-pure-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-8 right-8 text-white" onClick={() => setIsMobileMenuOpen(false)}>
          <X className="w-8 h-8" />
        </button>
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="font-display text-2xl font-bold text-white tracking-wider">HOME</Link>
        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-display text-2xl font-bold text-white tracking-wider">ABOUT</Link>
        <Link to="/demo/bar" onClick={() => setIsMobileMenuOpen(false)} className="font-display text-2xl font-bold text-white tracking-wider">BAR DEMO</Link>
        <Link to="/demo/staff" onClick={() => setIsMobileMenuOpen(false)} className="font-display text-2xl font-bold text-white tracking-wider">STAFF DEMO</Link>
        <Link to="/download" onClick={() => setIsMobileMenuOpen(false)} className="font-display text-2xl font-bold text-electric-blue tracking-wider">DOWNLOAD NOW</Link>
        <button onClick={() => { setIsMobileMenuOpen(false); onOpenAi(); }} className="font-display text-xl font-bold text-electric-blue tracking-wider flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> AI ARCHITECT
        </button>
      </div>
    </>
  );
};

export default Header;
