import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Bot, AlertTriangle, Lock, Send, Star, ChevronLeft, Paperclip, AlertCircle, Check } from 'lucide-react';
import { PAST_STAFF_SHIFTS, MOCK_THREADS, ChatThread } from '../../utils/mockData';
import StaffShiftModal from '../../components/StaffShiftModal';

const StaffMessages: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);
  const initialThreadId = searchParams.get('threadId');
  
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(initialThreadId);
  const [selectedShiftForReview, setSelectedShiftForReview] = useState<any>(null);

  useEffect(() => {
    const pendingReviews = PAST_STAFF_SHIFTS.filter(s => s.status === 'completed' && !s.userReviewed);
    const reviewThreads: ChatThread[] = pendingReviews.map(shift => ({
        id: `review-${shift.id}`,
        type: 'alert',
        title: 'Action Required: Review Shift',
        subtitle: `Rate your experience at ${shift.venue}`,
        timestamp: 'Pending',
        unread: true,
        data: shift
    }));
    setThreads([...reviewThreads, ...MOCK_THREADS]);
  }, []);

  useEffect(() => {
      setActiveThreadId(initialThreadId);
  }, [initialThreadId]);

  useEffect(() => {
      if (activeThreadId && bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  }, [activeThreadId]);

  const activeThread = threads.find(t => t.id === activeThreadId);

  const handleThreadClick = (thread: ChatThread) => {
      if (thread.id.startsWith('review-')) {
          setSelectedShiftForReview(thread.data);
      } else {
          setActiveThreadId(thread.id);
          navigate(`/staff/messages?threadId=${thread.id}`);
      }
  };

  const handleBack = () => {
      setActiveThreadId(null);
      navigate('/staff/messages');
  };

  const renderThreadIcon = (thread: ChatThread) => {
      if (thread.title.startsWith('Action Required') || thread.type === 'alert') {
          return (
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-neon-rose fill-neon-rose/20" />
              </div>
          );
      }
      if (thread.title.startsWith('URGENT') || thread.type === 'system') {
          return (
              <div className="w-12 h-12 rounded-xl bg-neon-rose/20 border border-neon-rose/30 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-neon-rose" />
              </div>
          );
      }
      if (thread.type === 'copilot') {
          return (
              <div className="w-12 h-12 rounded-xl bg-panel border border-brand/30 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-brand" />
              </div>
          );
      }
      return (
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-panel border border-glass relative">
            <img src={thread.avatar} className="w-full h-full object-cover" alt="avatar" />
            {thread.activeShift && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            )}
            {thread.isLocked && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-gray-400" />
                </div>
            )}
        </div>
      );
  };

  return (
    <div className="w-full h-screen flex flex-col pt-16 pb-20 bg-app">
      
      {/* --- VIEW 1: THREAD LIST (INBOX) --- */}
      {!activeThread && (
        <div className="flex-1 flex flex-col p-4 animate-fade-in overflow-hidden">
          <div className="space-y-3 overflow-y-auto pb-4 pt-2">
             {threads.map((thread) => {
                const isActionRequired = thread.title.startsWith('Action Required') || thread.type === 'alert';
                const isUrgent = thread.title.startsWith('URGENT') || thread.type === 'system';
                const isActiveShift = thread.activeShift;

                let cardClasses = "relative p-4 rounded-2xl border transition-all cursor-pointer overflow-hidden ";
                
                if (isUrgent) {
                    // URGENT CARD STYLE
                    cardClasses += "bg-neon-rose/10 border-neon-rose/30 hover:bg-neon-rose/15";
                } else if (isActionRequired) {
                    // ACTION REQUIRED STYLE
                    cardClasses += "content-card hover:bg-white/5 border-glass bg-white/5 dark:bg-white/5";
                } else {
                    // STANDARD STYLE
                    cardClasses += "content-card hover:bg-white/5 border-glass";
                }

                return (
                    <div 
                        key={thread.id} 
                        onClick={() => handleThreadClick(thread)}
                        className={cardClasses}
                    >
                        {/* LEFT BORDER INDICATORS */}
                        {isActiveShift && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>}
                        {isActionRequired && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-neon-rose"></div>}
                        
                        <div className="flex gap-4 items-center">
                            <div className="relative flex-shrink-0">
                                {renderThreadIcon(thread)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-0.5">
                                    <h3 className={`font-bold text-sm truncate pr-2 ${isUrgent ? 'text-neon-rose' : 'text-txt-primary'}`}>
                                        {thread.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] whitespace-nowrap ${isUrgent ? 'text-neon-rose' : 'text-txt-tertiary'}`}>
                                            {thread.timestamp}
                                        </span>
                                        {isActionRequired && (
                                            <div className="w-2 h-2 rounded-full bg-neon-rose animate-pulse shadow-[0_0_8px_rgba(255,126,179,0.8)]"></div>
                                        )}
                                    </div>
                                </div>
                                <p className={`text-xs truncate ${thread.unread ? 'text-txt-primary font-medium' : 'text-txt-secondary'}`}>
                                    {thread.subtitle || thread.lastMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
          </div>
        </div>
      )}

      {/* --- VIEW 2: ACTIVE CHAT WINDOW --- */}
      {activeThread && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-app animate-slide-up h-[100dvh]">
            
            {/* HEADER */}
            <div className="relative h-44 w-full flex-shrink-0 z-20 shadow-xl">
                <div className="absolute inset-0">
                    {activeThread.type !== 'copilot' && activeThread.avatar ? (
                        <img src={activeThread.avatar} className="w-full h-full object-cover" alt="header bg" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black" />
                    )}
                    {/* Updated Gradient: Dark scrim only, no fade to white/app-bg */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />
                </div>

                <div className="absolute top-0 left-0 right-0 pt-12 px-4 flex justify-between items-center">
                    <button 
                        onClick={handleBack} 
                        className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-txt-primary hover:bg-gray-200/50 dark:hover:bg-white/20 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </div>

                <div className="absolute bottom-4 left-6 right-6">
                    <h2 className="text-3xl font-display font-black text-white leading-none mb-1 drop-shadow-md">
                        {activeThread.title}
                    </h2>
                    <div className="flex items-center gap-2">
                        {activeThread.type === 'copilot' && <Bot className="w-3 h-3 text-brand" />}
                        <p className="text-sm font-medium text-gray-200 drop-shadow-sm truncate">
                            {activeThread.subtitle}
                        </p>
                    </div>
                </div>
            </div>

            {/* CHAT AREA */}
            <div className="flex-1 p-4 overflow-y-auto space-y-6 pb-32">
                <div className="text-center text-[10px] text-txt-tertiary uppercase tracking-widest font-bold mt-4">Today</div>

                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-panel flex-shrink-0 overflow-hidden border border-glass self-end mb-1">
                         {activeThread.type === 'copilot' ? (
                             <div className="w-full h-full bg-brand/20 flex items-center justify-center">
                                 <Bot className="w-4 h-4 text-brand" />
                             </div>
                         ) : (
                             <img src={activeThread.avatar} className="w-full h-full object-cover" alt="Avatar" />
                         )}
                    </div>
                    
                    <div className={`p-4 rounded-2xl rounded-bl-none max-w-[80%] shadow-sm content-card ${activeThread.type === 'copilot' ? 'border-brand/30 text-brand' : 'text-txt-primary'}`}>
                        <p className="text-sm leading-relaxed">
                            {activeThread.lastMessage || activeThread.subtitle}
                        </p>
                    </div>
                </div>
                
                <div ref={bottomRef} />
            </div>

            {/* INPUT AREA */}
            <div className="absolute bottom-0 left-0 right-0 z-30 p-4 pt-4 pb-safe-bottom glass-panel border-t border-glass">
                {activeThread.isLocked ? (
                    <div className="w-full py-4 content-card text-center text-xs text-txt-secondary flex items-center justify-center gap-2 font-bold tracking-wide">
                        <Lock className="w-3 h-3" /> THREAD LOCKED
                    </div>
                ) : (
                    <div className="flex gap-3 items-end">
                         <button className="p-3 content-card rounded-full text-txt-secondary hover:text-txt-primary transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <div className="flex-1 theme-input rounded-2xl px-4 py-3 focus-within:border-brand transition-all flex items-center gap-2">
                             <input 
                                type="text" 
                                placeholder="Message..." 
                                className="flex-1 bg-transparent text-sm text-txt-primary focus:outline-none placeholder-txt-tertiary"
                            />
                        </div>
                        <button className="p-3 bg-brand rounded-full text-black hover:scale-105 transition-transform shadow-lg">
                            <Send className="w-5 h-5 ml-0.5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}

      {selectedShiftForReview && (
          <StaffShiftModal 
              shift={selectedShiftForReview} 
              onClose={() => setSelectedShiftForReview(null)}
              initialReviewMode={true}
          />
      )}
    </div>
  );
};

export default StaffMessages;