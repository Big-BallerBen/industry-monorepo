import React, { useState, useEffect } from "react";
import { X, Clock, Calendar, Zap } from "lucide-react";

interface Availability {
  date: string;
  startTime: string; // Will return 12h format "9:00 PM"
  endTime: string;   // Will return 12h format "2:00 AM"
  instantBook: boolean;
  rawStartTime?: string; // 24h "21:00"
  rawEndTime?: string;   // 24h "02:00"
}

interface AddAvailabilityDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (availability: Availability) => void;
  initialDate?: string;
  initialData?: Availability | null;
}

const parseTime = (timeStr: string) => {
    if (!timeStr) return { hour: '9', minute: '00', ampm: 'PM' };
    if (timeStr.includes(':') && !timeStr.includes('M')) {
        const [h, m] = timeStr.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hour = h % 12 || 12;
        return { hour: String(hour), minute: String(m).padStart(2, '0'), ampm };
    }
    const match = timeStr.match(/(\d+):(\d+)\s?(AM|PM)/i);
    if (match) {
        return { hour: match[1], minute: match[2], ampm: match[3].toUpperCase() };
    }
    return { hour: '9', minute: '00', ampm: 'PM' };
};

const AddAvailabilityDrawer: React.FC<AddAvailabilityDrawerProps> = ({ open, onClose, onSave, initialDate, initialData }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [instantBook, setInstantBook] = useState(true);

  // Time States
  const [startHour, setStartHour] = useState('6');
  const [startMin, setStartMin] = useState('00');
  const [startAmPm, setStartAmPm] = useState('PM');

  const [endHour, setEndHour] = useState('2');
  const [endMin, setEndMin] = useState('00');
  const [endAmPm, setEndAmPm] = useState('AM');

  useEffect(() => {
    if (open) {
      if (initialData) {
        setDate(initialData.date || new Date().toISOString().slice(0, 10));
        setInstantBook(initialData.instantBook ?? true);
        const start = parseTime(initialData.rawStartTime || initialData.startTime || "18:00");
        setStartHour(start.hour);
        setStartMin(start.minute);
        setStartAmPm(start.ampm);
        const end = parseTime(initialData.rawEndTime || initialData.endTime || "02:00");
        setEndHour(end.hour);
        setEndMin(end.minute);
        setEndAmPm(end.ampm);
      } else {
          if (initialDate) setDate(initialDate);
          setStartHour('6'); setStartMin('00'); setStartAmPm('PM');
          setEndHour('2'); setEndMin('00'); setEndAmPm('AM');
      }
    }
  }, [open, initialDate, initialData]);

  const handleSubmit = () => {
    const formattedStart = `${startHour}:${startMin} ${startAmPm}`;
    const formattedEnd = `${endHour}:${endMin} ${endAmPm}`;

    const to24h = (h: string, m: string, ap: string) => {
        let hour = parseInt(h);
        if (ap === 'PM' && hour !== 12) hour += 12;
        if (ap === 'AM' && hour === 12) hour = 0;
        return `${String(hour).padStart(2, '0')}:${m}`;
    };

    const rawStart = to24h(startHour, startMin, startAmPm);
    const rawEnd = to24h(endHour, endMin, endAmPm);

    onSave({
        date,
        startTime: formattedStart,
        endTime: formattedEnd,
        instantBook,
        rawStartTime: rawStart,
        rawEndTime: rawEnd
    });
    onClose();
  };

  if (!open) return null;

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minutes = ['00', '15', '30', '45'];

  const TimeSelector = ({ 
      label, 
      h, setH, 
      m, setM, 
      ap, setAp 
  }: { 
      label: string, 
      h: string, setH: (v: string) => void, 
      m: string, setM: (v: string) => void, 
      ap: string, setAp: (v: string) => void 
  }) => (
    <div className="flex flex-col gap-2">
         <label className="text-xs font-bold text-txt-tertiary uppercase tracking-widest">{label}</label>
         <div className="flex gap-2">
             <div className="relative flex-1">
                 <select value={h} onChange={(e) => setH(e.target.value)} className="w-full bg-white dark:bg-black/50 rounded-xl px-2 py-3 text-txt-primary appearance-none text-center font-bold focus:ring-1 focus:ring-neon-rose outline-none transition-all">
                     {hours.map(hr => <option key={hr} value={hr}>{hr}</option>)}
                 </select>
             </div>
             <div className="flex items-center text-txt-tertiary">:</div>
             <div className="relative flex-1">
                 <select value={m} onChange={(e) => setM(e.target.value)} className="w-full bg-white dark:bg-black/50 rounded-xl px-2 py-3 text-txt-primary appearance-none text-center font-bold focus:ring-1 focus:ring-neon-rose outline-none transition-all">
                     {minutes.map(min => <option key={min} value={min}>{min}</option>)}
                 </select>
             </div>
             <div className="relative flex-1">
                 <select value={ap} onChange={(e) => setAp(e.target.value)} className="w-full bg-white dark:bg-black/50 rounded-xl px-1 py-3 text-txt-primary appearance-none text-center font-bold focus:ring-1 focus:ring-neon-rose outline-none transition-all">
                     <option value="AM">AM</option>
                     <option value="PM">PM</option>
                 </select>
             </div>
         </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[90]">
      <div 
        className="absolute inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className={`absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-neon-rose/30 bg-panel text-txt-primary p-6 transform transition-transform duration-300 ease-out ${open ? "translate-y-0" : "translate-y-full"} shadow-[0_-10px_50px_rgba(255,126,179,0.15)] max-w-3xl mx-auto`}>
        
        <div className="mx-auto h-1 w-12 rounded-full bg-gray-300 dark:bg-white/20 mb-6" />
        
        <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-xl font-display font-black text-txt-primary tracking-wide">
                    {initialData ? 'EDIT SCHEDULE' : 'LOG SCHEDULE'}
                </h2>
                <p className="text-sm text-txt-secondary">Let venues know when you're free to work.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-txt-tertiary" />
            </button>
        </div>

        <div className="space-y-6 mb-8">
            <div className="space-y-2">
                <label className="text-xs font-bold text-neon-rose uppercase tracking-widest">Date</label>
                <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-txt-tertiary" />
                    <input 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-white dark:bg-black/50 rounded-xl pl-10 pr-4 py-3 text-txt-primary focus:ring-1 focus:ring-neon-rose outline-none transition-all font-body appearance-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <TimeSelector 
                    label="Start Time" 
                    h={startHour} setH={setStartHour} 
                    m={startMin} setM={setStartMin} 
                    ap={startAmPm} setAp={setStartAmPm} 
                />
                <TimeSelector 
                    label="End Time" 
                    h={endHour} setH={setEndHour} 
                    m={endMin} setM={setEndMin} 
                    ap={endAmPm} setAp={setEndAmPm} 
                />
            </div>

            <div className="flex items-center justify-between bg-white dark:bg-black/20 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-neon-rose/10 rounded-lg">
                        <Zap className="w-5 h-5 text-neon-rose" />
                    </div>
                    <div>
                        <div className="font-bold text-txt-primary text-sm">Instant Book</div>
                        <div className="text-xs text-txt-secondary">Auto-accept shifts matching your rate.</div>
                    </div>
                </div>
                <div 
                    onClick={() => setInstantBook(!instantBook)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${instantBook ? 'bg-neon-rose' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${instantBook ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
            </div>
        </div>

        <div className="flex gap-4 pb-safe-bottom">
            <button 
                onClick={onClose}
                className="flex-1 py-4 rounded-xl bg-gray-100 dark:bg-white/5 text-txt-primary font-bold font-display uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={handleSubmit}
                className="flex-1 py-4 rounded-xl bg-neon-rose text-black font-bold font-display uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,126,179,0.4)] transition-all"
            >
                {initialData ? 'Update Schedule' : 'Set Schedule'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default AddAvailabilityDrawer;