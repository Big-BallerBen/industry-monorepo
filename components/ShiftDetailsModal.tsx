import React from 'react';
import { X, Star, User, DollarSign, Check, Sparkles, MapPin, Briefcase } from 'lucide-react';
import { VENUE_IMAGES } from '../utils/mockData';

export interface Applicant {
  id: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
  status: 'hired' | 'applicant';
}

export interface ShiftDetail {
  id: number;
  role: string;
  venue: string;
  date: string;
  time: string;
  rate: number;
  hiredCount: number;
  neededCount: number;
  staff: Applicant[];
  status: 'open' | 'partially' | 'filled';
}

interface ShiftDetailsModalProps {
  open: boolean;
  onClose: () => void;
  shift: ShiftDetail | null;
  onToggleHire: (shiftId: number, staffId: string) => void;
  onPayNow: (shift: ShiftDetail) => void;
}

const ShiftDetailsModal: React.FC<ShiftDetailsModalProps> = ({ open, onClose, shift, onToggleHire, onPayNow }) => {
  if (!open || !shift) return null;

  const hiredStaff = shift.staff.filter(s => s.status === 'hired');
  const applicants = shift.staff.filter(s => s.status === 'applicant');
  
  // Resolve image from mock data or use a fallback
  const venueImage = VENUE_IMAGES[shift.venue as keyof typeof VENUE_IMAGES] || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Card Container - Reverted to the rounded card style in screenshot */}
      <div className="relative w-full max-w-sm bg-panel border border-glass rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-up max-h-[85vh]">
        
        {/* Header Image Area */}
        <div className="relative h-72 shrink-0">
             <img 
                src={venueImage} 
                alt={shift.venue} 
                className="w-full h-full object-cover" 
             />
             
             {/* Dark Gradient Overlay for Text Contrast */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

             {/* Close Button */}
             <button 
                onClick={onClose} 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors z-50 border border-white/10 backdrop-blur-md"
            >
                <X className="w-4 h-4" />
            </button>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 pb-4">
                <div className="flex justify-between items-end mb-1">
                    <h2 className="text-3xl font-display font-black text-white flex items-center gap-2 leading-none">
                        {shift.venue} 
                        <Check className="w-5 h-5 text-electric-blue fill-current stroke-[4] p-0.5 bg-white rounded-full" />
                    </h2>
                    <div className="text-right">
                        <div className="text-2xl font-black text-neon-rose">${shift.rate}</div>
                        <div className="text-[10px] font-bold text-neon-rose uppercase tracking-wide opacity-80">Flat</div>
                    </div>
                </div>
                <div className="text-sm font-medium text-gray-300 flex flex-wrap items-center gap-1.5">
                    {shift.role} Needed • {shift.time} • <span className="text-white">SoHo District</span>
                </div>
            </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-app/20">
            
            {/* Stats Row */}
            <div className="flex justify-between text-center divide-x divide-white/10 py-2">
                <div className="flex-1 px-2">
                    <div className="text-2xl font-black text-txt-primary">92%</div>
                    <div className="text-[9px] text-txt-tertiary uppercase tracking-widest font-bold mt-1">Trust</div>
                </div>
                <div className="flex-1 px-2">
                    <div className="text-2xl font-black text-txt-primary">4.9</div>
                    <div className="text-[9px] text-txt-tertiary uppercase tracking-widest font-bold mt-1">Rating</div>
                </div>
                <div className="flex-1 px-2">
                    <div className="text-2xl font-black text-txt-primary">24</div>
                    <div className="text-[9px] text-txt-tertiary uppercase tracking-widest font-bold mt-1">Jobs</div>
                </div>
            </div>

            {/* Tags */}
            <div>
                <h3 className="text-xs font-bold text-txt-tertiary uppercase tracking-widest mb-3">Expertise / Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {['High Volume', 'Uniform', 'Mixology'].map(tag => (
                        <span key={tag} className="px-4 py-2 rounded-xl bg-card border border-glass text-xs font-bold text-txt-secondary whitespace-nowrap">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Manager View: Applicants List (Only if needed/staff present) */}
            {(applicants.length > 0 || hiredStaff.length > 0) && (
                <div className="pt-4 border-t border-glass">
                    <h3 className="text-xs font-bold text-txt-tertiary uppercase tracking-widest mb-3">Shift Roster</h3>
                    <div className="space-y-3">
                        {hiredStaff.map(s => (
                             <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                                <div className="flex items-center gap-3">
                                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
                                    <span className="text-sm font-bold text-txt-primary">{s.name}</span>
                                </div>
                                <span className="text-[10px] font-bold text-green-500 uppercase">Hired</span>
                             </div>
                        ))}
                        {applicants.map(s => (
                             <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-card border border-glass">
                                <div className="flex items-center gap-3">
                                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
                                    <span className="text-sm font-bold text-txt-primary">{s.name}</span>
                                </div>
                                <button onClick={() => onToggleHire(shift.id, s.id)} className="text-xs font-bold text-electric-blue">Hire</button>
                             </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-0 bg-app/20 pb-safe-bottom">
            {(shift.status === 'filled' || shift.status === 'partially') ? (
                 <div className="flex gap-3">
                    <button onClick={() => onPayNow(shift)} className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-electric-blue font-bold font-display uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        <DollarSign className="w-4 h-4" /> Pay Now
                    </button>
                     <button onClick={onClose} className="flex-1 py-4 rounded-xl bg-electric-blue text-black font-bold font-display uppercase tracking-widest hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,224,255,0.3)]">
                        Done
                    </button>
                 </div>
            ) : (
                <button 
                    onClick={onClose}
                    className="w-full py-4 rounded-xl bg-neon-rose text-black font-bold font-display uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(255,126,179,0.4)] hover:shadow-[0_0_30px_rgba(255,126,179,0.6)]"
                >
                    Apply For Shift
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ShiftDetailsModal;