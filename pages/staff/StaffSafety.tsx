import React from 'react';
import { ShieldAlert, Phone, FileWarning } from 'lucide-react';

const StaffSafety: React.FC = () => {
  return (
    <div className="p-4 pt-24 pb-24 max-w-lg mx-auto">
      <p className="text-txt-secondary text-sm mb-8 text-center">We prioritize your safety above all else.</p>

      <div className="space-y-4">
         <button className="w-full p-6 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-center gap-6 hover:bg-red-500/10 transition-colors group text-left">
             <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.3)] group-hover:scale-110 transition-transform">
                 <ShieldAlert className="w-6 h-6 text-white" />
             </div>
             <div>
                 <h3 className="text-lg font-bold text-txt-primary mb-1">Report Incident</h3>
                 <p className="text-xs text-red-500 font-medium">Report unsafe conditions or harassment immediately.</p>
             </div>
         </button>

         <button className="w-full p-6 content-card rounded-2xl flex items-center gap-6 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group text-left">
             <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-txt-primary">
                 <Phone className="w-6 h-6" />
             </div>
             <div>
                 <h3 className="text-lg font-bold text-txt-primary mb-1">Emergency Contacts</h3>
                 <p className="text-xs text-txt-secondary">Access local authorities and venue security.</p>
             </div>
         </button>

         <button className="w-full p-6 content-card rounded-2xl flex items-center gap-6 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group text-left">
             <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-txt-primary">
                 <FileWarning className="w-6 h-6" />
             </div>
             <div>
                 <h3 className="text-lg font-bold text-txt-primary mb-1">Dispute Resolution</h3>
                 <p className="text-xs text-txt-secondary">File a claim regarding pay or contract violations.</p>
             </div>
         </button>
      </div>

      <div className="mt-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
          <p className="text-xs text-blue-500 dark:text-blue-300 font-medium">
              Your reports are anonymous and handled by our dedicated Trust & Safety team 24/7.
          </p>
      </div>
    </div>
  );
};

export default StaffSafety;