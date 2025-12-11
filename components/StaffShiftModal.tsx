import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, MessageSquare, Bot, AlertTriangle, 
  Clock, DollarSign, Navigation, Ban, Edit, Trash2, Zap, Smartphone,
  Star, CheckCircle2
} from 'lucide-react';
import { MOCK_THREADS } from '../utils/mockData';

interface StaffShiftModalProps {
  shift: any;
  onClose: () => void;
  onEdit?: (shift: any) => void;
  initialReviewMode?: boolean;
  onReviewSubmit?: () => void;
}

const StaffShiftModal: React.FC<StaffShiftModalProps> = ({ 
    shift, 
    onClose, 
    onEdit, 
    initialReviewMode = false,
    onReviewSubmit 
}) => {
  const navigate = useNavigate();
  const [cancelStep, setCancelStep] = useState<'idle' | 'warning' | 'confirm'>('idle');
  const [viewRatingStep, setViewRatingStep] = useState<'none' | 'review' | 'rating'>('none');

  useEffect(() => {
      if (initialReviewMode && !shift.userReviewed) {
          setViewRatingStep('review');
      }
  }, [initialReviewMode, shift]);

  if (!shift) return null;

  const isAvailability = shift.status === 'availability';
  const isPending = shift.status === 'pending';
  const isCompleted = shift.status === 'completed';

  const handleContactVenue = () => {
    const thread = MOCK_THREADS.find(t => t.shiftId == shift.id && t.type === 'venue');
    const targetThreadId = thread ? thread.id : 't1'; 
    navigate(`/staff/messages?threadId=${targetThreadId}`);
    onClose();
  };

  const handleOpenCopilot = () => {
    const thread = MOCK_THREADS.find(t => t.shiftId == shift.id && t.type === 'copilot');
    const targetThreadId = thread ? thread.id : 't2'; 
    navigate(`/staff/messages?threadId=${targetThreadId}`);
    onClose();
  };

  const handleDeleteAvailability = () => {
      onClose();
  };

  const handleSubmitReview = () => {
      shift.userReviewed = true; 
      if (onReviewSubmit) {
          onReviewSubmit();
          onClose();
      } else {
          setViewRatingStep('none'); 
      }
  };

  let statusBadge = { color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', dot: 'bg-green-500', text: 'Confirmed' };
  
  if (isPending) {
      statusBadge = { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', dot: 'bg-yellow-500', text: 'Pending' };
  } else if (isAvailability) {
      statusBadge = { color: 'text-brand', bg: 'bg-brand/20', border: 'border-brand/30', dot: 'bg-brand', text: 'Open' };
  } else if (isCompleted) {
      statusBadge = { color: 'text-gray-400', bg: 'bg-white/10', border: 'border-white/20', dot: 'bg-gray-400', text: 'Completed' };
  }

  // REVIEW MODE
  if (viewRatingStep === 'review') {
      return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-sm bg-panel border border-glass rounded-2xl p-6 animate-fade-up">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-display font-black text-txt-primary">REVIEW</h2>
                    <button onClick={onClose}><X className="w-5 h-5 text-txt-tertiary" /></button>
                </div>
                
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white/5 rounded-full mx-auto flex items-center justify-center mb-3">
                        <img src={shift.image} className="w-full h-full rounded-full object-cover" alt="venue" />
                    </div>
                    <div className="text-txt-primary font-bold">{shift.venue}</div>
                </div>

                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className="w-8 h-8 text-txt-tertiary hover:text-yellow-400 cursor-pointer transition-colors" />
                    ))}
                </div>

                <button 
                    onClick={handleSubmitReview}
                    className="w-full py-3 bg-brand text-black font-bold rounded-xl uppercase tracking-wider hover:brightness-110 transition-all"
                >
                    Submit
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full md:max-w-md bg-panel border-t md:border border-glass rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        
        {/* HERO */}
        <div className="h-48 w-full relative">
            <img src={shift.image} alt={shift.venue} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors z-20 border border-white/10"
            >
                <X className="w-4 h-4" />
            </button>

            <div className="absolute bottom-4 left-6 right-6">
                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${statusBadge.bg} border ${statusBadge.border} ${statusBadge.color} text-[10px] font-bold uppercase tracking-wider mb-2`}>
                    {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot} animate-pulse`} />}
                    {statusBadge.text}
                </div>
                <h2 className="font-display font-black text-3xl text-white leading-none mb-1">
                    {isAvailability ? 'Availability Log' : shift.venue}
                </h2>
                <p className="text-gray-300 text-sm font-medium">
                    {isAvailability ? 'Open for Booking' : shift.role}
                </p>
            </div>
        </div>

        <div className="p-6 pt-2 space-y-6">
            {/* METRICS */}
            <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-xl content-card text-center">
                    <div className="flex justify-center mb-1"><Clock className="w-4 h-4 text-electric-blue" /></div>
                    <div className="text-[10px] text-txt-tertiary uppercase">Time</div>
                    <div className="font-bold text-txt-primary text-xs">{shift.time}</div>
                </div>
                <div className="p-3 rounded-xl content-card text-center">
                    <div className="flex justify-center mb-1">
                        {isAvailability ? <Zap className="w-4 h-4 text-brand" /> : <DollarSign className="w-4 h-4 text-brand" />}
                    </div>
                    <div className="text-[10px] text-txt-tertiary uppercase">{isAvailability ? 'Auto-Book' : 'Pay'}</div>
                    <div className="font-bold text-txt-primary text-xs">{shift.pay}</div>
                </div>
                <div className="p-3 rounded-xl content-card text-center">
                    <div className="flex justify-center mb-1"><Navigation className="w-4 h-4 text-emerald-400" /></div>
                    <div className="text-[10px] text-txt-tertiary uppercase">Map</div>
                    <div className="font-bold text-txt-primary text-xs">{isAvailability ? 'N/A' : '0.8 mi'}</div>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="space-y-3">
                <h3 className="text-xs font-bold text-txt-tertiary uppercase tracking-widest pl-1">Actions</h3>
                
                {isAvailability ? (
                    <button 
                        onClick={() => onEdit && onEdit(shift)}
                        className="w-full flex items-center justify-between p-4 rounded-xl content-card hover:border-brand/50 group transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-brand/10 text-brand">
                                <Edit className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-txt-primary text-sm">Edit Parameters</div>
                                <div className="text-[10px] text-txt-secondary">Change time or rate</div>
                            </div>
                        </div>
                    </button>
                ) : (
                    <>
                        {isCompleted && (
                            <button 
                                onClick={() => setViewRatingStep('review')}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border group transition-all ${
                                    !shift.userReviewed 
                                    ? 'bg-brand text-black border-brand shadow-lg' 
                                    : 'content-card'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${!shift.userReviewed ? 'bg-white/20 text-white' : 'bg-white/10 text-txt-primary'}`}>
                                        <Star className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-sm">
                                            {!shift.userReviewed ? 'Complete Review' : 'View Your Rating'}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        )}

                        <button 
                            onClick={handleContactVenue}
                            disabled={isPending || isCompleted}
                            className={`w-full flex items-center justify-between p-4 rounded-xl content-card group transition-all ${isPending || isCompleted ? 'opacity-50 cursor-not-allowed' : 'hover:border-electric-blue/50'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-electric-blue/10 text-electric-blue">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-txt-primary text-sm">Contact Venue</div>
                                    <div className="text-[10px] text-txt-secondary">
                                        {isPending ? 'Locked' : (isCompleted ? 'Closed' : 'Direct line')}
                                    </div>
                                </div>
                            </div>
                        </button>

                        <button 
                            onClick={handleOpenCopilot}
                            disabled={isPending || isCompleted}
                            className={`w-full flex items-center justify-between p-4 rounded-xl content-card group transition-all ${isPending || isCompleted ? 'opacity-50 cursor-not-allowed' : 'hover:border-emerald-400/50'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-txt-primary text-sm">Shift Intel</div>
                                    <div className="text-[10px] text-txt-secondary">
                                        {isPending ? 'Locked' : (isCompleted ? 'Archived' : 'Uniform & Codes')}
                                    </div>
                                </div>
                            </div>
                        </button>
                    </>
                )}
            </div>

            {/* DANGER ZONE */}
            {!isCompleted && (
                <div className="pt-4 border-t border-glass pb-safe-bottom">
                    {cancelStep === 'idle' ? (
                        <button 
                            onClick={() => setCancelStep('warning')}
                            className="w-full py-3 text-xs font-bold text-red-500 uppercase tracking-widest transition-all flex items-center justify-center gap-2 bg-red-500/10 backdrop-blur-md border border-red-500/20 hover:bg-red-500/20 rounded-xl"
                        >
                            {isAvailability ? <Trash2 className="w-4 h-4" /> : <Ban className="w-4 h-4" />} 
                            {isAvailability ? 'Delete Availability' : 'Cancel Shift'}
                        </button>
                    ) : (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-fade-in backdrop-blur-md">
                            <div className="flex items-start gap-3 mb-4">
                                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-txt-primary text-sm mb-1">Are you sure?</h4>
                                    <p className="text-xs text-txt-secondary leading-relaxed">
                                        This action cannot be undone and may affect your reliability score.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setCancelStep('idle')}
                                    className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-txt-primary text-xs font-bold transition-colors"
                                >
                                    Go Back
                                </button>
                                <button 
                                    onClick={handleDeleteAvailability}
                                    className="flex-1 py-2 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default StaffShiftModal;