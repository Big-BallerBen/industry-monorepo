import React, { useState, useEffect } from "react";
import { X, Clock, Calendar, Users, Sparkles, AlertTriangle } from "lucide-react";
import { MY_STAFF_ROSTER } from "../utils/mockData";

interface Shift {
  id: number;
  venue: string;
  role: string;
  date: string;
  startTime: string;
  endTime: string;
  rate: number;
  needed: number;
}

interface PostShiftDrawerProps {
  open: boolean;
  onClose: () => void;
  onPost: (shift: Shift) => void;
  initialDate?: string;
}

const PostShiftDrawer: React.FC<PostShiftDrawerProps> = ({ open, onClose, onPost, initialDate }) => {
  const [form, setForm] = useState({
    venue: "Club Onyx",
    role: "Bartender",
    date: new Date().toISOString().slice(0, 10),
    startTime: "21:00",
    endTime: "03:00",
    rate: 25,
    needed: 1,
  });

  const [copilotActive, setCopilotActive] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof MY_STAFF_ROSTER>([]);
  const [priorityFee, setPriorityFee] = useState(0);

  useEffect(() => {
    if (initialDate) {
        setForm(prev => ({ ...prev, date: initialDate }));
    }
  }, [initialDate]);

  useEffect(() => {
    const checkPriority = () => {
        const now = new Date();
        const shiftStart = new Date(`${form.date}T${form.startTime}`);
        const diffMs = shiftStart.getTime() - now.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours < 24 && diffHours > 0) {
            setPriorityFee(10);
        } else {
            setPriorityFee(0);
        }
    };
    checkPriority();
  }, [form.date, form.startTime]);

  useEffect(() => {
      if (copilotActive) {
          const matched = MY_STAFF_ROSTER.filter(staff => 
              staff.availableDates.includes(form.date) && 
              (staff.role === form.role || form.role === 'Bartender')
          );
          setSuggestions(matched);
      } else {
          setSuggestions([]);
      }
  }, [copilotActive, form.date, form.role]);


  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const autoFillStaff = (staffCount: number) => {
      handleChange("needed", staffCount);
  };

  const roundToNearest15 = (timeStr: string) => {
    if (!timeStr) return timeStr;
    const [hours, minutes] = timeStr.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    const rounded = Math.round(totalMinutes / 15) * 15;
    const newHours = Math.floor(rounded / 60) % 24;
    const newMinutes = rounded % 60;
    return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
  };

  const handleTimeBlur = (key: string, value: string) => {
      handleChange(key, roundToNearest15(value));
  };

  const handleSubmit = () => {
    const newShift: Shift = {
      id: Math.floor(Math.random() * 10000),
      ...form,
    };
    onPost(newShift);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className={`absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-electric-blue/30 bg-panel-black text-white p-6 transform transition-transform duration-300 ease-out ${open ? "translate-y-0" : "translate-y-full"} shadow-[0_-10px_50px_rgba(0,224,255,0.15)] max-w-3xl mx-auto flex flex-col max-h-[90vh] overflow-y-auto`}>
        
        <div className="mx-auto h-1 w-12 rounded-full bg-white/20 mb-6 flex-shrink-0" />
        
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
            <div>
                <h2 className="text-xl font-display font-black text-white tracking-wide">POST NEW SHIFT</h2>
                <p className="text-sm text-gray-400">Broadcast an open role to the talent pool.</p>
            </div>
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-gray-400" />
            </button>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-electric-blue/5 border border-electric-blue/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-electric-blue/10 rounded-lg">
                    <Sparkles className="w-5 h-5 text-electric-blue" />
                </div>
                <div>
                    <div className="font-bold text-white text-sm">CoPilot Auto-Fill</div>
                    <div className="text-xs text-gray-400">Check internal staff availability first?</div>
                </div>
            </div>
             <div 
                onClick={() => setCopilotActive(!copilotActive)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${copilotActive ? 'bg-electric-blue' : 'bg-gray-700'}`}
            >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${copilotActive ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
        </div>

        {copilotActive && suggestions.length > 0 && (
            <div className="mb-6 animate-fade-up">
                 <h3 className="text-xs font-bold text-electric-blue uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Users className="w-3 h-3" /> {suggestions.length} Internal Staff Available
                 </h3>
                 <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {suggestions.map(staff => (
                        <div key={staff.id} className="flex-shrink-0 w-48 bg-black/40 border border-electric-blue/30 rounded-lg p-3 flex items-center gap-3">
                            <img src={staff.image} className="w-10 h-10 rounded-full object-cover border border-white/10" alt={staff.name} />
                            <div>
                                <div className="text-sm font-bold text-white truncate">{staff.name}</div>
                                <div className="text-[10px] text-gray-400">{staff.role}</div>
                            </div>
                        </div>
                    ))}
                 </div>
                 <button 
                    onClick={() => autoFillStaff(suggestions.length)}
                    className="mt-2 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-electric-blue border border-white/5 transition-colors"
                 >
                    Auto-Populate {suggestions.length} Slots
                 </button>
            </div>
        )}
        {copilotActive && suggestions.length === 0 && (
             <div className="mb-6 p-3 rounded-lg border border-dashed border-white/10 text-center text-xs text-gray-500 animate-fade-in">
                No internal staff available for this date/role.
             </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
                <label className="text-xs font-bold text-electric-blue uppercase tracking-widest">Role</label>
                <div className="relative">
                    <select 
                        value={form.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:border-electric-blue outline-none transition-colors font-body"
                    >
                        <option>Bartender</option>
                        <option>Mixologist</option>
                        <option>Security</option>
                        <option>Bottle Service</option>
                        <option>Barback</option>
                        <option>DJ</option>
                        <option>Server</option>
                        <option>Hostess</option>
                    </select>
                    <div className="absolute right-4 top-3.5 pointer-events-none text-gray-500">▼</div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-electric-blue uppercase tracking-widest">Headcount</label>
                <div className="relative">
                    <Users className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                    <input 
                        type="number" 
                        min="1" 
                        max="10"
                        value={form.needed}
                        onChange={(e) => handleChange("needed", parseInt(e.target.value))}
                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-electric-blue outline-none transition-colors font-body"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-electric-blue uppercase tracking-widest">Date</label>
                <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                    <input 
                        type="date" 
                        value={form.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-electric-blue outline-none transition-colors font-body appearance-none"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-electric-blue uppercase tracking-widest">Timeframe</label>
                <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                        <Clock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                        <input 
                            type="time"
                            step="900" 
                            value={form.startTime}
                            onChange={(e) => handleChange("startTime", e.target.value)}
                            onBlur={(e) => handleTimeBlur("startTime", e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-2 py-3 text-white text-sm focus:border-electric-blue outline-none"
                        />
                    </div>
                    <div className="relative">
                        <Clock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                        <input 
                            type="time"
                            step="900" 
                            value={form.endTime}
                            onChange={(e) => handleChange("endTime", e.target.value)}
                            onBlur={(e) => handleTimeBlur("endTime", e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-2 py-3 text-white text-sm focus:border-electric-blue outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-electric-blue uppercase tracking-widest flex justify-between">
                    <span>Hourly Rate</span>
                    <span className="text-white">${form.rate}/hr</span>
                </label>
                <div className="bg-black/50 border border-white/10 rounded-xl p-3">
                    <input 
                        type="range" 
                        min="15" 
                        max="100" 
                        step="5"
                        value={form.rate}
                        onChange={(e) => handleChange("rate", parseInt(e.target.value))}
                        className="w-full accent-electric-blue h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>

        {priorityFee > 0 && (
            <div className="mb-6 p-4 rounded-xl bg-neon-rose/10 border border-neon-rose/30 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-neon-rose flex-shrink-0" />
                <div>
                    <div className="text-sm font-bold text-neon-rose">Priority Posting Fee ($10.00)</div>
                    <div className="text-xs text-gray-400">Shifts posted less than 24 hours in advance incur a priority platform fee to accelerate matching.</div>
                </div>
            </div>
        )}

        <div className="flex gap-4 mt-auto">
            <button 
                onClick={onClose}
                className="flex-1 py-4 rounded-xl border border-white/10 text-white font-bold font-display uppercase tracking-widest hover:bg-white/5 transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={handleSubmit}
                className="flex-1 py-4 rounded-xl bg-electric-blue text-black font-bold font-display uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,224,255,0.4)] transition-all flex flex-col items-center justify-center leading-none gap-1"
            >
                <span>Post Shift</span>
                {priorityFee > 0 && <span className="text-[10px] opacity-70">(Includes Priority Fee)</span>}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PostShiftDrawer;