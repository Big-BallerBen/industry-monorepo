import React from 'react';
import { Zap, Lock } from 'lucide-react';

const StaffReputation: React.FC = () => {
  const score = 98;
  // SVG Logic
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="p-4 pt-32 pb-24 max-w-lg mx-auto">
      <p className="text-txt-secondary text-sm mb-8 text-center">Your reliability rating determines your access.</p>

      {/* Trust Score Circle */}
      <div className="flex justify-center mb-8 relative">
         <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-200 dark:text-zinc-800" />
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="text-neon-rose" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-black text-txt-primary">{score}</div>
                <div className="text-[9px] text-neon-rose uppercase tracking-widest font-bold mt-0.5">Excellent</div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8 text-center">
         <div className="p-3 content-card rounded-xl">
            <div className="text-xl font-bold text-txt-primary mb-1">100%</div>
            <div className="text-[10px] text-txt-tertiary uppercase tracking-wider">Show Rate</div>
         </div>
         <div className="p-3 content-card rounded-xl">
            <div className="text-xl font-bold text-txt-primary mb-1">4.9</div>
            <div className="text-[10px] text-txt-tertiary uppercase tracking-wider">Rating</div>
         </div>
         <div className="p-3 content-card rounded-xl">
            <div className="text-xl font-bold text-txt-primary mb-1">0</div>
            <div className="text-[10px] text-txt-tertiary uppercase tracking-wider">Incidents</div>
         </div>
      </div>

      <h3 className="text-xs font-bold text-txt-tertiary uppercase tracking-widest mb-4">Progression</h3>
      <div className="space-y-4">
         <div className="p-4 content-card rounded-xl flex items-center gap-4 opacity-50">
             <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-full"><Lock className="w-5 h-5 text-txt-secondary" /></div>
             <div className="flex-1">
                 <div className="text-sm font-bold text-txt-primary">Legendary Status</div>
                 <div className="text-xs text-txt-secondary">Requires 50 completed shifts</div>
             </div>
         </div>
         <div className="p-4 bg-neon-rose/10 border border-neon-rose/30 rounded-xl flex items-center gap-4">
             <div className="p-3 bg-neon-rose/20 rounded-full"><Zap className="w-5 h-5 text-neon-rose" /></div>
             <div className="flex-1">
                 <div className="text-sm font-bold text-txt-primary">Instant Pay Unlocked</div>
                 <div className="text-xs text-txt-secondary">Benefit active</div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default StaffReputation;