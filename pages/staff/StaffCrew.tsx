import React from 'react';
import { Copy, Share2 } from 'lucide-react';

const StaffCrew: React.FC = () => {
  return (
    <div className="p-4 pt-24 pb-24 max-w-lg mx-auto">
      <p className="text-txt-secondary text-sm mb-6 text-center">Build your roster and earn override commissions.</p>

      {/* Invite Card */}
      <div className="glass-panel p-6 rounded-2xl mb-8 border border-neon-rose/30 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-neon-rose/10 rounded-full blur-2xl pointer-events-none" />
         
         <div className="text-center mb-6">
            <div className="text-neon-rose font-black text-5xl mb-2">3</div>
            <div className="text-sm text-txt-tertiary uppercase tracking-widest">Invites Remaining</div>
         </div>

         <div className="bg-gray-100 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl p-3 flex items-center justify-between mb-4">
            <code className="text-txt-primary font-mono text-lg tracking-widest ml-2">ELENA-X92</code>
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-neon-rose transition-colors">
               <Copy className="w-5 h-5" />
            </button>
         </div>

         <button className="w-full py-3 bg-neon-rose text-black font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-neon-rose/20">
            <Share2 className="w-4 h-4" /> Share Link
         </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
         <div className="p-4 content-card rounded-xl">
            <div className="text-xs text-txt-tertiary uppercase tracking-widest mb-1">Crew Size</div>
            <div className="text-2xl font-black text-txt-primary">12</div>
         </div>
         <div className="p-4 content-card rounded-xl">
            <div className="text-xs text-txt-tertiary uppercase tracking-widest mb-1">Earnings</div>
            <div className="text-2xl font-black text-neon-rose">$120.00</div>
         </div>
      </div>

      <h3 className="text-xs font-bold text-txt-tertiary uppercase tracking-widest mb-4">Your Recruits</h3>
      <div className="space-y-4">
         {[1, 2, 3].map((i) => (
             <div key={i} className="flex items-center gap-4 p-3 content-card rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                   <img src={`https://source.unsplash.com/random/100x100?face&${i}`} alt="User" className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="flex-1">
                   <div className="text-sm font-bold text-txt-primary">New User {i}</div>
                   <div className="text-xs text-green-500">Active • 3 Shifts</div>
                </div>
                <div className="text-xs font-bold text-txt-tertiary">+$15</div>
             </div>
         ))}
      </div>
    </div>
  );
};

export default StaffCrew;