import React, { useState } from 'react';
import { Moon, Bell, Globe, User, LogOut, ChevronRight, Bot, Sparkles, Zap, Brain, Command, Sun } from 'lucide-react';
import { useTheme } from '../../components/ThemeWrapper';

const StaffSettings: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState('classic');
  const { mode, toggleMode } = useTheme();

  const avatars = [
    { 
        id: 'classic', 
        icon: Bot, 
        label: 'Classic', 
        color: 'text-electric-blue', 
        bg: 'bg-electric-blue/10',
    },
    { 
        id: 'sparkle', 
        icon: Sparkles, 
        label: 'Neon', 
        color: 'text-brand', 
        bg: 'bg-brand/10',
    },
    { 
        id: 'zap', 
        icon: Zap, 
        label: 'Flash', 
        color: 'text-yellow-400', 
        bg: 'bg-yellow-400/10',
    },
    { 
        id: 'brain', 
        icon: Brain, 
        label: 'Neural', 
        color: 'text-purple-400', 
        bg: 'bg-purple-400/10',
    },
    { 
        id: 'cmd', 
        icon: Command, 
        label: 'Ops', 
        color: 'text-green-400', 
        bg: 'bg-green-400/10',
    },
  ];

  return (
    <div className="p-4 pt-24 pb-24 max-w-lg mx-auto">
      <div className="space-y-6">
         
         {/* CoPilot */}
         <section>
            <h3 className="text-xs font-bold text-txt-tertiary uppercase tracking-widest mb-3">CoPilot Configuration</h3>
            <div className="glass-panel rounded-2xl overflow-hidden p-4">
                <div className="mb-4 flex items-center gap-3">
                    <div className="p-2 bg-electric-blue/10 rounded-lg">
                        <Bot className="w-5 h-5 text-electric-blue" />
                    </div>
                    <span className="text-sm font-bold text-txt-primary">Assistant Avatar</span>
                </div>
                
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {avatars.map((avatar) => (
                        <button
                            key={avatar.id}
                            onClick={() => setSelectedAvatar(avatar.id)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all min-w-[80px] ${
                                selectedAvatar === avatar.id 
                                ? 'bg-panel border-brand shadow-lg' 
                                : 'bg-transparent border-glass hover:bg-white/5'
                            }`}
                        >
                            <div className={`p-2 rounded-full ${avatar.bg}`}>
                                <avatar.icon className={`w-6 h-6 ${avatar.color}`} />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedAvatar === avatar.id ? 'text-txt-primary' : 'text-txt-tertiary'}`}>
                                {avatar.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
         </section>

         {/* Preferences */}
         <section>
            <h3 className="text-xs font-bold text-txt-tertiary uppercase tracking-widest mb-3">Preferences</h3>
            {/* Removed divide-y divide-glass to fix visual clutter */}
            <div className="glass-panel rounded-2xl overflow-hidden space-y-1">
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {mode === 'dark' ? <Moon className="w-5 h-5 text-txt-secondary" /> : <Sun className="w-5 h-5 text-txt-secondary" />}
                        <span className="text-sm font-bold text-txt-primary">Dark Mode</span>
                    </div>
                    {/* Toggle Button */}
                    <button 
                        onClick={toggleMode}
                        className={`w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-300 ${mode === 'dark' ? 'bg-brand' : 'bg-gray-300'}`}
                    >
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${mode === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}></div>
                    </button>
                </div>
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-txt-secondary" />
                        <span className="text-sm font-bold text-txt-primary">Push Notifications</span>
                    </div>
                    <div className="w-12 h-7 bg-zinc-700 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-5 h-5 bg-gray-400 rounded-full"></div>
                    </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-txt-secondary" />
                        <span className="text-sm font-bold text-txt-primary">Language</span>
                    </div>
                    <span className="text-xs text-txt-tertiary font-mono">ENGLISH (US)</span>
                </div>
            </div>
         </section>

         {/* Account */}
         <section>
            <h3 className="text-xs font-bold text-txt-tertiary uppercase tracking-widest mb-3">Account</h3>
            {/* Removed divide-y divide-glass */}
            <div className="glass-panel rounded-2xl overflow-hidden space-y-1">
                <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-white/5">
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-txt-secondary" />
                        <span className="text-sm font-bold text-txt-primary">Edit Profile</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-txt-secondary" />
                </div>
                <button className="w-full p-4 flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition-colors text-left">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-bold">Sign Out</span>
                </button>
            </div>
         </section>
      </div>
    </div>
  );
};

export default StaffSettings;