import React, { useState } from 'react';
import { Clock, CheckCircle2, AlertCircle, User, DollarSign, Plus, Zap, MoreHorizontal, Bell, ChevronDown, Wallet, Calendar as CalendarIcon, Briefcase, ArrowRight, Download, FileText, CalendarDays, Star, ChevronRight } from 'lucide-react';
import PostShiftDrawer from './PostShiftDrawer';
import PayDrawer from './PayDrawer';
import AddAvailabilityDrawer from './AddAvailabilityDrawer';
import ShiftDetailsModal, { ShiftDetail, Applicant } from './ShiftDetailsModal';
import StaffShiftModal from './StaffShiftModal';
import { getRelativeDate, MY_STAFF_ROSTER, VENUE_IMAGES, PAST_STAFF_SHIFTS } from '../utils/mockData';
import { useNavigate } from 'react-router-dom';

type SchedulerMode = 'venue' | 'staff';

interface SchedulerProps {
  mode: SchedulerMode;
}

const INITIAL_ZONES = [
  {
    id: 'z1',
    name: 'Main Bar',
    shifts: [
      { id: 1, staff: 'Elena R.', time: '20:00 - 03:00', role: 'Mixologist', status: 'clocked-in', avatar: MY_STAFF_ROSTER[0].image, rate: 45 },
      { id: 2, staff: 'James W.', time: '21:00 - 04:00', role: 'Bartender', status: 'scheduled', avatar: MY_STAFF_ROSTER[5].image, rate: 30 },
    ]
  },
  {
    id: 'z2',
    name: 'VIP Lounge',
    shifts: [
      { id: 3, staff: 'Sarah J.', time: '22:00 - 04:00', role: 'Bottle Service', status: 'completed', avatar: MY_STAFF_ROSTER[2].image, rate: 40 },
    ]
  },
  {
    id: 'z3',
    name: 'Entrance',
    shifts: [
      { id: 4, staff: 'Marcus C.', time: '21:00 - 03:00', role: 'Security', status: 'late', avatar: MY_STAFF_ROSTER[1].image, rate: 35 },
    ]
  }
];

const INITIAL_MANAGED_SHIFTS: ShiftDetail[] = [
    {
        id: 101,
        role: 'Bartender',
        venue: 'Main Bar',
        date: getRelativeDate(0),
        time: '7:00 PM – 2:00 AM',
        rate: 25,
        hiredCount: 0,
        neededCount: 5,
        status: 'open',
        staff: [
            { id: 'a1', name: 'Grace Molina', role: 'Bartender', rating: 4.6, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100', status: 'applicant' },
            { id: 'a2', name: 'Sofia Luna', role: 'Bartender', rating: 4.0, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100', status: 'applicant' },
        ]
    },
    {
        id: 102,
        role: 'Barback',
        venue: 'Support Barback',
        date: getRelativeDate(1),
        time: '5:00 PM – 12:00 AM',
        rate: 20,
        hiredCount: 1,
        neededCount: 2,
        status: 'partially',
        staff: [
             { id: 'a4', name: 'Alyssa Cruz', role: 'Barback', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100', status: 'hired' },
        ]
    },
    {
        id: 103,
        role: 'Server',
        venue: 'Section Server',
        date: getRelativeDate(2),
        time: '6:00 PM – 12:30 AM',
        rate: 22,
        hiredCount: 7,
        neededCount: 7,
        status: 'filled',
        staff: [
             { id: 'a6', name: 'Kevin Tran', role: 'Server', rating: 4.5, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100', status: 'hired' },
        ]
    }
];

const STAFF_CALENDAR = [
  {
    id: 1,
    day: 'TODAY',
    date: getRelativeDate(0),
    venue: 'Club Onyx',
    role: 'Bartender',
    time: '9:00 PM - 3:00 AM',
    pay: '$250 Flat',
    status: 'confirmed',
    image: VENUE_IMAGES['Club Onyx']
  },
  {
    id: 2,
    day: 'TOMORROW',
    date: getRelativeDate(1),
    venue: 'The Alchemist',
    role: 'Mixologist',
    time: '8:00 PM - 2:00 AM',
    pay: '$45/hr + Tips',
    status: 'pending',
    image: VENUE_IMAGES['The Alchemist']
  },
  {
    id: 3,
    day: 'SATURDAY',
    date: getRelativeDate(2),
    venue: 'Rooftop 99',
    role: 'Bar Support',
    time: '10:00 PM - 4:00 AM',
    pay: '$30/hr',
    status: 'confirmed',
    image: VENUE_IMAGES['Rooftop 99']
  }
];

const Scheduler: React.FC<SchedulerProps> = ({ mode }) => {
  const navigate = useNavigate();
  const [zones, setZones] = useState(INITIAL_ZONES);
  const [staffShifts, setStaffShifts] = useState<any[]>(STAFF_CALENDAR);
  const [managedShifts, setManagedShifts] = useState<ShiftDetail[]>(INITIAL_MANAGED_SHIFTS);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [calendarCollapsed, setCalendarCollapsed] = useState(false);
  const [shiftsCollapsed, setShiftsCollapsed] = useState(false);
  
  const [postDrawerOpen, setPostDrawerOpen] = useState(false);
  const [payDrawerOpen, setPayDrawerOpen] = useState(false);
  const [availDrawerOpen, setAvailDrawerOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [staffShiftModalOpen, setStaffShiftModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  
  const [selectedShiftForPay, setSelectedShiftForPay] = useState<any>(null);
  const [selectedManagedShift, setSelectedManagedShift] = useState<ShiftDetail | null>(null);
  const [selectedStaffShift, setSelectedStaffShift] = useState<any>(null);
  const [selectedDateForDrawer, setSelectedDateForDrawer] = useState<string | undefined>(undefined);
  const [selectedAvailability, setSelectedAvailability] = useState<any>(null);

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'Upcoming' | 'Past'>('Upcoming');

  const isVenue = mode === 'venue';
  const themeColor = isVenue ? 'electric-blue' : 'neon-rose';

  const handleFilterChange = (filter: 'Upcoming' | 'Past') => {
    setActiveFilter(filter);
    setIsFilterDropdownOpen(false);
    if (filter === 'Past') {
        setStaffShifts(PAST_STAFF_SHIFTS);
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        setCurrentDate(lastWeek);
    } else {
        setStaffShifts(STAFF_CALENDAR);
        setCurrentDate(new Date());
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
          setCurrentDate(new Date(e.target.value));
      }
  };

  const handleExport = (type: 'week' | 'month') => {
      // Simulate export
      console.log(`Exporting ${type} starting from ${currentDate.toISOString()}`);
      setExportModalOpen(false);
  };

  const handlePostShift = (newShiftData: any) => {
    const newManagedShift: ShiftDetail = {
        id: Math.random(),
        role: newShiftData.role,
        venue: newShiftData.positionType || 'Main Floor',
        date: new Date(newShiftData.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
        time: `${newShiftData.startTime} - ${newShiftData.endTime}`,
        rate: newShiftData.rate,
        hiredCount: 0,
        neededCount: newShiftData.needed,
        status: 'open',
        staff: []
    };
    setManagedShifts(prev => [newManagedShift, ...prev]);
  };

  const openPay = (shift: any) => {
    setSelectedShiftForPay({
        staffName: shift.staff,
        role: shift.role,
        rate: shift.rate,
        hours: 6
    });
    setPayDrawerOpen(true);
  };

  const openPayFromManagement = (shift: ShiftDetail) => {
    setDetailsModalOpen(false);
    setSelectedShiftForPay({
        staffName: "Multiple Staff",
        role: shift.role,
        rate: shift.rate,
        hours: 6
    });
    setPayDrawerOpen(true);
  };

  const handlePayConfirm = () => {
    setPayDrawerOpen(false);
  };

  const handleAddAvailability = (avail: any) => {
    const newAvailSlot = {
        id: Math.random(),
        day: 'AVAILABLE',
        date: avail.date,
        venue: 'Open for Booking',
        role: 'Any Role',
        time: `${avail.startTime} - ${avail.endTime}`,
        pay: 'Instant Book On',
        status: 'availability',
        image: VENUE_IMAGES['Availability'],
        rawStartTime: avail.rawStartTime, // Store 24h
        rawEndTime: avail.rawEndTime,     // Store 24h
        instantBook: avail.instantBook
    };
    
    // Update Local State
    setStaffShifts(prev => {
        const filtered = prev.filter(s => s.date !== avail.date || s.status !== 'availability');
        return [newAvailSlot, ...filtered];
    });
    setAvailDrawerOpen(false);
    setSelectedAvailability(null);
  };

  const handleEditAvailability = (shift: any) => {
      let initialData = {
          date: shift.date,
          // Prefer raw 24h if available for logic, but default to 18:00
          rawStartTime: shift.rawStartTime || "18:00",
          rawEndTime: shift.rawEndTime || "02:00",
          instantBook: shift.instantBook ?? true
      };

      setSelectedAvailability(initialData);
      setStaffShiftModalOpen(false); // Close the detail modal
      setAvailDrawerOpen(true); // Open the editor
  };

  const handleToggleHire = (shiftId: number, staffId: string) => {
    setManagedShifts(prev => {
        return prev.map(shift => {
            if (shift.id !== shiftId) return shift;
            
            const updatedStaff = shift.staff.map(person => {
                if (person.id !== staffId) return person;
                return {
                    ...person,
                    status: person.status === 'hired' ? 'applicant' : 'hired'
                } as Applicant;
            });

            const hiredCount = updatedStaff.filter(s => s.status === 'hired').length;
            let status: ShiftDetail['status'] = 'open';
            if (hiredCount >= shift.neededCount) status = 'filled';
            else if (hiredCount > 0) status = 'partially';

            const updatedShift = { ...shift, staff: updatedStaff, hiredCount, status };
            
            if (selectedManagedShift?.id === shiftId) {
                setSelectedManagedShift(updatedShift);
            }

            return updatedShift;
        });
    });
  };

  const openShiftDetails = (shift: ShiftDetail) => {
      setSelectedManagedShift(shift);
      setDetailsModalOpen(true);
  };

  const openStaffShiftModal = (shift: any) => {
      setSelectedStaffShift(shift);
      setStaffShiftModalOpen(true);
  };

  const SliderToggle = ({ collapsed, onClick }: { collapsed: boolean, onClick: () => void }) => (
     <button 
        onClick={onClick}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${!collapsed ? `bg-${themeColor}` : 'bg-gray-700'}`}
     >
        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${!collapsed ? 'translate-x-6' : 'translate-x-0'}`} />
     </button>
  );

  // Generate 4 weeks (28 days) based on currentDate
  const generateWeeks = () => {
      const start = new Date(currentDate);
      const weeks = [];
      
      for(let w = 0; w < 4; w++) {
          const days = [];
          // If Past, we want to look backwards. w=0 is most recent past week.
          const weekOffset = activeFilter === 'Past' ? -(w * 7) : (w * 7);
          
          const blockStartDate = new Date(start);
          blockStartDate.setDate(start.getDate() + weekOffset);

          for(let d = 0; d < 7; d++) {
              const current = new Date(blockStartDate);
              current.setDate(blockStartDate.getDate() + d);
              days.push({
                  day: current.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
                  date: current.getDate().toString(),
                  fullDate: current.toISOString().split('T')[0],
                  isoDate: current.toISOString().slice(0, 10) 
              });
          }
          weeks.push({ id: w, days });
      }
      return weeks;
  };

  const calendarWeeks = generateWeeks();

  const handleDayClick = (isoDate: string) => {
      // If we are in Past mode, disable adding availability
      if (activeFilter === 'Past') return;

      setSelectedDateForDrawer(isoDate);
      setSelectedAvailability(null); 
      if (isVenue) {
          setPostDrawerOpen(true);
      } else {
          setAvailDrawerOpen(true);
      }
  };

  const getShiftsForDate = (dateStr: string) => {
      return managedShifts.filter(s => {
          const d1 = new Date(s.date).toDateString();
          const d2 = new Date(dateStr).toDateString();
          return d1 === d2;
      });
  };

  const getStaffShiftForDate = (dateStr: string) => {
      return staffShifts.find(s => new Date(s.date).toDateString() === new Date(dateStr).toDateString());
  };

  // --- Components for Venue Mode ---
  const VenueDayCard = ({ dateItem }: { dateItem: any }) => {
      const shifts = getShiftsForDate(dateItem.fullDate);
      return (
        <button 
            onClick={() => handleDayClick(dateItem.isoDate)}
            className="flex-1 flex flex-col items-center bg-black/40 rounded-xl p-2 md:p-3 border border-white/5 min-h-[110px] md:min-h-[120px] hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden"
        >
            <span className="text-[9px] md:text-[10px] font-bold mb-1 uppercase tracking-wider group-hover:text-electric-blue text-gray-500">
                {dateItem.day}
            </span>
            <span className="text-lg md:text-xl font-bold text-white mb-2">{dateItem.date}</span>
            
            <div className="flex flex-col gap-1 w-full mt-auto">
                {shifts.map(s => (
                    <div 
                        key={s.id} 
                        className={`h-1.5 w-full rounded-full ${
                            s.status === 'open' ? 'bg-emerald-500' : 
                            s.status === 'partially' ? 'bg-amber-500' : 
                            'bg-rose-500' 
                        }`}
                    />
                ))}
            </div>
            
            {shifts.length === 0 && (
                <div className="mt-2 text-[8px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2">
                    <Plus className="w-3 h-3" />
                </div>
            )}
        </button>
      );
  };

  // --- Components for Staff Mode ---
  const StaffDayRow = ({ dateItem }: { dateItem: any }) => {
      const shift = getStaffShiftForDate(dateItem.fullDate);
      const isToday = new Date().toDateString() === new Date(dateItem.fullDate).toDateString();

      return (
          <div className="w-full">
              {shift ? (
                  shift.status === 'availability' ? (
                      // UPDATED AVAILABILITY CARD STYLE (Dashboard Widget Look)
                      <div 
                        onClick={() => openStaffShiftModal(shift)}
                        className="glass-panel p-5 rounded-2xl hover:bg-white/5 active:scale-95 transition-all cursor-pointer flex items-center justify-between mb-3 shadow-sm"
                      >
                         <div className="flex items-center gap-4">
                             {/* Date Block */}
                             <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-neon-rose/10 border border-neon-rose/20 text-neon-rose">
                                <span className="text-[10px] font-bold uppercase tracking-widest">{dateItem.day}</span>
                                <span className="text-xl font-black">{dateItem.date}</span>
                             </div>

                             <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-sm font-bold text-txt-primary">Available</h3>
                                    <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-wide">
                                        Active
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-txt-secondary">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-neon-rose" /> {shift.time}</span>
                                    {shift.instantBook && <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-400" /> Instant</span>}
                                </div>
                             </div>
                         </div>
                         
                         <ChevronRight className="w-5 h-5 text-txt-tertiary" />
                      </div>
                  ) : (
                      // SHIFT CARD (Styled like DiscoveryFeed)
                      <div 
                        onClick={() => openStaffShiftModal(shift)}
                        className={`group relative w-full rounded-2xl overflow-hidden cursor-pointer border border-white/5 transition-all duration-300 h-40 hover:border-neon-rose/50 hover:shadow-[0_0_20px_rgba(255,126,179,0.15)] mb-3`}
                      >
                            <img src={shift.image} alt={shift.venue} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className={`absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent`} />
                            
                            {/* Status Overlay (Completed/Confirmed) */}
                            <div className="absolute top-0 left-0 w-full h-1 z-20 flex">
                                {shift.status === 'completed' ? (
                                    <div className="flex-1 bg-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                ) : null}
                            </div>

                            <div className="absolute inset-0 p-5 flex items-center justify-between z-10">
                                <div className="flex items-center gap-5">
                                    {/* Date Box */}
                                    <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border bg-white/10 border-white/20 text-white backdrop-blur-md`}>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{dateItem.day}</span>
                                        <span className="text-xl font-black">{dateItem.date}</span>
                                    </div>

                                    {/* Info */}
                                    <div>
                                        <h3 className="text-xl font-black text-white leading-none mb-1">{shift.venue}</h3>
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3 text-gray-400" /> {shift.role}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-electric-blue" /> {shift.time}</span>
                                        </div>
                                        {/* Review Needed Notice for Past Shifts */}
                                        {shift.status === 'completed' && !shift.userReviewed && (
                                            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-neon-rose text-black text-[10px] font-bold uppercase tracking-wider animate-pulse">
                                                <Star className="w-3 h-3 fill-black" />
                                                Review Needed
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Right Side Stats */}
                                <div className="hidden sm:block text-right">
                                    {shift.status === 'confirmed' && <div className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1">Confirmed</div>}
                                    {shift.status === 'completed' && <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Completed</div>}
                                    {shift.status === 'pending' && <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1">Pending</div>}
                                    <div className="font-mono font-bold text-lg text-neon-rose">{shift.pay}</div>
                                </div>
                            </div>
                      </div>
                  )
              ) : (
                  // EMPTY STATE (Minimal) - Only show if Upcoming
                  activeFilter === 'Upcoming' ? (
                    <div 
                        onClick={() => handleDayClick(dateItem.isoDate)}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-transparent dark:border-white/5 shadow-sm transition-all cursor-pointer group h-24 mb-3"
                    >
                            <div className="w-14 flex flex-col items-center justify-center text-center opacity-40 group-hover:opacity-100 transition-opacity">
                                <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isToday ? 'text-neon-rose' : 'text-txt-tertiary'}`}>{dateItem.day}</div>
                                <div className="text-xl font-bold text-txt-tertiary group-hover:text-txt-primary">{dateItem.date}</div>
                            </div>
                            <div className="flex-1 flex items-center justify-between">
                                <span className="text-sm text-txt-secondary font-medium group-hover:text-txt-primary transition-colors">No Shift Scheduled</span>
                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-txt-secondary group-hover:text-neon-rose group-hover:bg-neon-rose/10 transition-all">
                                    <Plus className="w-4 h-4" />
                                </div>
                            </div>
                    </div>
                  ) : (
                    // EMPTY STATE (Past) - Non-interactive, darker
                     <div className="flex items-center gap-4 p-4 rounded-2xl bg-transparent border border-white/5 opacity-50 h-24 mb-3">
                         <div className="w-14 flex flex-col items-center justify-center text-center opacity-40">
                             <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-txt-tertiary">{dateItem.day}</div>
                             <div className="text-xl font-bold text-txt-tertiary">{dateItem.date}</div>
                         </div>
                         <div className="flex-1 border-l border-white/5 pl-4">
                             <span className="text-sm text-txt-tertiary font-medium">No Data</span>
                         </div>
                     </div>
                  )
              )}
          </div>
      );
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-up pb-20">
      
       {/* Header matching Global Header Structure */}
       <div className="fixed top-0 inset-x-0 z-40 px-6 py-4 grid grid-cols-3 items-center bg-panel/90 backdrop-blur-xl border-b border-glass-border transition-colors duration-300">
         <div className="justify-self-start flex items-center gap-2">
             {/* LEFT ICON LOGIC - Styled with semantic classes */}
             {activeFilter === 'Upcoming' ? (
                <button 
                    onClick={() => {
                        setSelectedAvailability(null);
                        isVenue ? setPostDrawerOpen(true) : setAvailDrawerOpen(true);
                    }}
                    className="w-10 h-10 rounded-full bg-transparent border border-glass flex items-center justify-center text-txt-primary hover:bg-white/10 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                </button>
             ) : (
                <div className="relative">
                    <button className="w-10 h-10 rounded-full bg-transparent border border-glass flex items-center justify-center text-txt-primary hover:bg-white/10 transition-colors">
                        <CalendarDays className="w-5 h-5" />
                    </button>
                    <input 
                        type="date" 
                        onChange={handleDateChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
             )}
         </div>

         <div className="justify-self-center relative">
            <button 
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="flex items-center gap-2"
            >
                <h1 className="text-xl font-display font-black tracking-widest text-txt-primary uppercase flex gap-2">
                    <span>MY</span>
                    <span className="text-neon-rose">SHIFTS</span>
                </h1>
                <ChevronDown className={`w-4 h-4 text-txt-tertiary transition-transform ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFilterDropdownOpen && (
                <div className="absolute top-full mt-2 w-48 bg-panel border border-glass rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in text-left backdrop-blur-xl">
                    <button 
                        onClick={() => handleFilterChange('Upcoming')}
                        className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors"
                    >
                        <Clock className={`w-5 h-5 ${activeFilter === 'Upcoming' ? 'text-txt-primary' : 'text-txt-tertiary'}`} />
                        <span className={`font-bold text-sm ${activeFilter === 'Upcoming' ? 'text-txt-primary' : 'text-txt-tertiary'}`}>Upcoming</span>
                        {activeFilter === 'Upcoming' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-rose shadow-[0_0_8px_rgba(255,126,179,0.8)]"></div>}
                    </button>
                    <div className="h-px bg-white/5 mx-4"></div>
                    <button 
                        onClick={() => handleFilterChange('Past')}
                        className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors"
                    >
                        <CheckCircle2 className={`w-5 h-5 ${activeFilter === 'Past' ? 'text-neon-rose' : 'text-txt-tertiary'}`} />
                        <span className={`font-bold text-sm ${activeFilter === 'Past' ? 'text-txt-primary' : 'text-txt-tertiary'}`}>Past</span>
                        {activeFilter === 'Past' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-rose shadow-[0_0_8px_rgba(255,126,179,0.8)]"></div>}
                    </button>
                </div>
            )}
         </div>

         <div className="justify-self-end flex items-center gap-2">
             {/* RIGHT ICON LOGIC */}
             {activeFilter === 'Upcoming' ? (
                <button 
                    onClick={() => navigate('/staff/messages')}
                    className="relative p-2 rounded-full hover:bg-white/10 transition-colors group"
                >
                    <Bell className="w-6 h-6 text-txt-secondary group-hover:text-txt-primary transition-colors" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-neon-rose rounded-full border border-pure-black"></span>
                </button>
             ) : (
                <button 
                    onClick={() => setExportModalOpen(true)}
                    className="w-10 h-10 rounded-full bg-transparent border border-glass flex items-center justify-center text-txt-primary hover:bg-white/10 transition-colors"
                >
                    <Download className="w-5 h-5" />
                </button>
             )}
         </div>
      </div>

      <div className="px-4">
        {isVenue ? (
            // VENUE VIEW (Unchanged)
            <div className="animate-fade-up">
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display font-black text-3xl text-white">WEEKLY OVERVIEW</h2>
                        <SliderToggle collapsed={calendarCollapsed} onClick={() => setCalendarCollapsed(!calendarCollapsed)} />
                    </div>

                    {!calendarCollapsed && (
                        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6">
                            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4">
                                {calendarWeeks.map((week) => (
                                    <div key={week.id} className="min-w-full snap-center px-0.5">
                                        <div className="flex gap-1.5">
                                            {week.days.map((d) => (
                                                <VenueDayCard key={d.isoDate} dateItem={d} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="flex gap-4 mt-2 pt-4 border-t border-white/5 justify-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Fill Shift</div>
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Partially Filled</div>
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Pay Now</div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display font-black text-3xl text-white">MANAGED SHIFTS</h2>
                        <SliderToggle collapsed={shiftsCollapsed} onClick={() => setShiftsCollapsed(!shiftsCollapsed)} />
                    </div>

                    {!shiftsCollapsed && (
                        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 animate-fade-up">
                            <div className="block space-y-4">
                                {managedShifts.map((s) => (
                                    <div key={s.id} className="bg-black/30 border border-white/5 rounded-2xl p-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="text-sm font-bold text-white mb-0.5">{s.date}</div>
                                                <div className="text-xs text-gray-400">{s.time}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-white">{s.role}</div>
                                                <div className="text-xs text-electric-blue font-mono">${s.rate}/hr</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between items-center mb-4 p-3 bg-white/5 rounded-xl">
                                            <div className="text-xs font-bold text-gray-400 uppercase">Hired</div>
                                            <div className="text-sm font-bold text-white">{s.hiredCount} / {s.neededCount}</div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            {s.status === 'filled' ? (
                                                <div className="flex items-center justify-center py-3 rounded-xl bg-green-500/20 text-green-400 font-bold text-xs uppercase tracking-wider border border-green-500/20">
                                                    <CheckCircle2 className="w-4 h-4 mr-2" /> Filled
                                                </div>
                                            ) : (
                                                <button 
                                                    onClick={() => openShiftDetails(s)}
                                                    className="py-3 rounded-xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
                                                >
                                                    {s.status === 'partially' ? 'Manage' : 'Fill Shift'}
                                                </button>
                                            )}
                                            
                                            {(s.status === 'filled' || s.status === 'partially') ? (
                                                <button 
                                                    onClick={() => openPayFromManagement(s)}
                                                    className="py-3 rounded-xl bg-electric-blue text-black font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors"
                                                >
                                                    Pay Now
                                                </button>
                                            ) : (
                                                <div className="flex items-center justify-center py-3 rounded-xl bg-white/5 text-gray-600 font-bold text-xs uppercase tracking-wider border border-dashed border-white/10">
                                                    Unpaid
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        ) : (
            // STAFF VIEW (Clean Vertical Stack without Container)
            <div className="animate-fade-up">
            {/* Weekly Slider Container - Direct Rendering */}
                <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10">
                {calendarWeeks.map((week) => (
                    <div key={week.id} className="min-w-full snap-center px-1">
                        <div className="flex flex-col gap-0">
                            {/* 7-Day Vertical Stack */}
                            {week.days.map((d) => (
                                <StaffDayRow 
                                    key={d.isoDate} 
                                    dateItem={d} 
                                />
                            ))}
                        </div>
                        
                        {/* Swipe Right Tip */}
                        {activeFilter === 'Upcoming' ? (
                            <div className="mt-8 pt-4 border-t border-glass flex items-center justify-center gap-2 text-txt-tertiary animate-pulse">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Swipe for Future</span>
                                <ArrowRight className="w-3 h-3" />
                            </div>
                        ) : (
                            <div className="mt-8 pt-4 border-t border-glass flex items-center justify-center gap-2 text-txt-tertiary animate-pulse">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Swipe for History</span>
                                <ArrowRight className="w-3 h-3" />
                            </div>
                        )}
                    </div>
                ))}
                </div>
            </div>
        )}
      </div>

      {/* Export Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setExportModalOpen(false)} />
            <div className="relative w-full max-w-sm bg-panel border border-glass rounded-2xl p-6 animate-fade-in shadow-2xl">
                <h2 className="text-xl font-display font-black text-txt-primary mb-2">EXPORT SCHEDULE</h2>
                <p className="text-sm text-txt-secondary mb-6">Choose how much data you want to save.</p>
                
                <div className="space-y-3">
                    <button 
                        onClick={() => handleExport('week')}
                        className="w-full p-4 rounded-xl bg-card border border-glass hover:bg-white/10 hover:border-electric-blue/50 flex items-center gap-4 transition-all group"
                    >
                        <div className="p-3 rounded-lg bg-electric-blue/10 text-electric-blue group-hover:scale-110 transition-transform">
                            <CalendarDays className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-txt-primary text-sm">Current 7 Days</div>
                            <div className="text-[10px] text-txt-tertiary">Save the visible week</div>
                        </div>
                    </button>

                    <button 
                        onClick={() => handleExport('month')}
                        className="w-full p-4 rounded-xl bg-card border border-glass hover:bg-white/10 hover:border-neon-rose/50 flex items-center gap-4 transition-all group"
                    >
                        <div className="p-3 rounded-lg bg-neon-rose/10 text-neon-rose group-hover:scale-110 transition-transform">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-txt-primary text-sm">Full Month</div>
                            <div className="text-[10px] text-txt-tertiary">Export entire month of data</div>
                        </div>
                    </button>
                </div>
                
                <button 
                    onClick={() => setExportModalOpen(false)}
                    className="w-full mt-6 py-3 text-xs font-bold text-txt-tertiary hover:text-txt-primary uppercase tracking-widest"
                >
                    Cancel
                </button>
            </div>
        </div>
      )}

      <PostShiftDrawer 
            open={postDrawerOpen} 
            onClose={() => { setPostDrawerOpen(false); setSelectedDateForDrawer(undefined); }}
            onPost={handlePostShift}
            initialDate={selectedDateForDrawer}
        />
        
        <PayDrawer
            open={payDrawerOpen}
            onClose={() => setPayDrawerOpen(false)}
            shiftData={selectedShiftForPay}
            onConfirm={handlePayConfirm}
        />

        <ShiftDetailsModal
            open={detailsModalOpen}
            onClose={() => setDetailsModalOpen(false)}
            shift={selectedManagedShift}
            onToggleHire={handleToggleHire}
            onPayNow={openPayFromManagement}
        />

        {staffShiftModalOpen && selectedStaffShift && (
             <StaffShiftModal 
                shift={selectedStaffShift} 
                onClose={() => {
                    setStaffShiftModalOpen(false);
                    setSelectedStaffShift(null);
                }}
                onEdit={handleEditAvailability}
             />
        )}
        
        <AddAvailabilityDrawer 
            open={availDrawerOpen} 
            onClose={() => { 
                setAvailDrawerOpen(false); 
                setSelectedDateForDrawer(undefined);
                setSelectedAvailability(null);
            }} 
            onSave={handleAddAvailability} 
            initialDate={selectedDateForDrawer}
            initialData={selectedAvailability}
        />
    </div>
  );
};

export default Scheduler;