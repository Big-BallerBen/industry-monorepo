import React from 'react';
import { DollarSign, Clock, ShieldCheck } from 'lucide-react';

const StaffWallet: React.FC = () => {
  return (
    <div className="p-4 pt-24 pb-24 max-w-lg mx-auto">
      <p className="text-txt-secondary text-sm mb-6 text-center">Manage your earnings and payouts.</p>

      {/* Balance Card - Dark themed specifically even in light mode for contrast, or use semantic colors carefully */}
      <div className="glass-panel p-6 rounded-2xl mb-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <DollarSign className="w-32 h-32 text-neon-rose" />
        </div>
        <div className="relative z-10">
          <div className="text-sm text-txt-tertiary uppercase tracking-widest mb-1">Pending Release</div>
          <div className="text-4xl font-black text-txt-primary mb-4">$450.00</div>
          
          <div className="flex gap-3">
             <button className="flex-1 py-3 bg-neon-rose text-black font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-white transition-colors shadow-lg shadow-neon-rose/20">
                Instant Payout
             </button>
             <button className="flex-1 py-3 bg-gray-100 dark:bg-white/10 text-txt-primary font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                View History
             </button>
          </div>
        </div>
      </div>

      {/* Trust Score Hook */}
      <div className="mb-8 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl flex items-center gap-4">
         <div className="p-3 bg-purple-500/10 rounded-full text-purple-500">
            <ShieldCheck className="w-6 h-6" />
         </div>
         <div>
            <div className="font-bold text-txt-primary text-sm">Level 4 Trust Score</div>
            <div className="text-xs text-txt-secondary">Unlock instant deposits at Level 5.</div>
         </div>
      </div>

      <h3 className="text-xs font-bold text-txt-tertiary uppercase tracking-widest mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 content-card rounded-xl">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-full text-txt-secondary">
                   <Clock className="w-5 h-5" />
                </div>
                <div>
                   <div className="font-bold text-txt-primary text-sm">Club Onyx Shift</div>
                   <div className="text-xs text-txt-secondary">Pending • 2 hrs ago</div>
                </div>
             </div>
             <div className="text-right">
                <div className="font-mono font-bold text-txt-primary">$150.00</div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffWallet;