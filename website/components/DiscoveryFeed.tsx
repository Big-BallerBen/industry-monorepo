import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, Star, ShieldCheck, 
  Zap, ChevronRight, Check, X, Clock, DollarSign,
  Sparkles, Briefcase, Users, Calendar
} from 'lucide-react';

// --- Types ---
type FeedType = 'staff' | 'shift';

interface FeedItem {
  id: string;
  type: FeedType;
  image: string;
  title: string;     // Name or Venue
  subtitle: string;  // Role or Shift Time
  location: string;
  rate: string;      // Hourly or Flat
  rating: number;    // Trust Score
  matchScore: number;// AI Match %
  tags: string[];
  verified?: boolean;
  urgent?: boolean;
}

// --- Mock Data ---
const MOCK_STAFF: FeedItem[] = [
  {
    id: 's1', type: 'staff',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    title: 'Elena Rodriguez',
    subtitle: 'Lead Mixologist',
    location: 'Downtown Core',
    rate: '$45/hr',
    rating: 98,
    matchScore: 99,
    tags: ['Mixology', 'Flair'],
    verified: true
  },
  {
    id: 's2', type: 'staff',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    title: 'Marcus Chen',
    subtitle: 'Security Specialist',
    location: 'West End',
    rate: '$35/hr',
    rating: 94,
    matchScore: 85,
    tags: ['Crowd Control', 'VIP'],
    verified: true
  },
  {
    id: 's3', type: 'staff',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    title: 'Sarah Jenkins',
    subtitle: 'Bottle Service',
    location: 'Financial Dist',
    rate: '$40/hr + Tips',
    rating: 96,
    matchScore: 92,
    tags: ['Upscale', 'Tables'],
    verified: true
  },
  {
    id: 's4', type: 'staff',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    title: 'David Miller',
    subtitle: 'Barback / Support',
    location: 'Metro Area',
    rate: '$22/hr',
    rating: 89,
    matchScore: 78,
    tags: ['Inventory', 'Heavy'],
    verified: false
  },
  {
    id: 's5', type: 'staff',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop',
    title: 'Priya Patel',
    subtitle: 'Event Manager',
    location: 'City Center',
    rate: '$55/hr',
    rating: 99,
    matchScore: 97,
    tags: ['Ops', 'Logistics'],
    verified: true
  },
  {
    id: 's6', type: 'staff',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop',
    title: 'Sophie Al-Fayed',
    subtitle: 'DJ / Sound Tech',
    location: 'Arts District',
    rate: '$150/hr',
    rating: 95,
    matchScore: 88,
    tags: ['House', 'Techno'],
    verified: true
  },
   {
    id: 's7', type: 'staff',
    image: 'https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?q=80&w=1000&auto=format&fit=crop',
    title: 'James Wilson',
    subtitle: 'Bartender',
    location: 'Uptown',
    rate: '$30/hr',
    rating: 91,
    matchScore: 82,
    tags: ['Craft Beer', 'Speed'],
    verified: true
  },
  {
    id: 's8', type: 'staff',
    image: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=1000&auto=format&fit=crop',
    title: 'Kira Tanaka',
    subtitle: 'Hostess',
    location: 'Downtown',
    rate: '$25/hr',
    rating: 93,
    matchScore: 89,
    tags: ['Reception', 'Reservations'],
    verified: true
  }
];

const MOCK_SHIFTS: FeedItem[] = [
  {
    id: 'sh1', type: 'shift',
    image: 'https://images.unsplash.com/photo-1572116469696-9a58ba6c8ff3?q=80&w=1000&auto=format&fit=crop',
    title: 'Club Onyx',
    subtitle: 'Fri Night Barback • 9PM - 3AM',
    location: 'SoHo District',
    rate: '$250 Flat',
    rating: 92, // Venue Rating
    matchScore: 95,
    tags: ['High Volume', 'Uniform'],
    urgent: true
  },
  {
    id: 'sh2', type: 'shift',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop',
    title: 'The Alchemist',
    subtitle: 'Mixologist Needed • 6PM - 12AM',
    location: 'Downtown',
    rate: '$50/hr + Tips',
    rating: 98,
    matchScore: 99,
    tags: ['Craft Cocktails', 'Intimate'],
    verified: true
  },
  {
    id: 'sh3', type: 'shift',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop',
    title: 'Rooftop 99',
    subtitle: 'VIP Server • 10PM - 4AM',
    location: 'Skyline Plaza',
    rate: '$40/hr + Grat',
    rating: 90,
    matchScore: 82,
    tags: ['Outdoor', 'Upscale'],
    urgent: false
  },
  {
    id: 'sh4', type: 'shift',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
    title: 'Warehouse Project',
    subtitle: 'Event Security • 8PM - 4AM',
    location: 'Industrial Park',
    rate: '$30/hr',
    rating: 88,
    matchScore: 75,
    tags: ['Concert', 'Crowd'],
    urgent: true
  },
    {
    id: 'sh5', type: 'shift',
    image: 'https://images.unsplash.com/photo-1570572127365-b75c83f6d735?q=80&w=1000&auto=format&fit=crop',
    title: 'Gatsby Lounge',
    subtitle: 'Door Host • 7PM - 2AM',
    location: 'Historic District',
    rate: '$28/hr',
    rating: 94,
    matchScore: 88,
    tags: ['Suit Req', 'Guest List'],
    urgent: false
  }
];

// --- Components ---

interface FeedCardProps {
  item: FeedItem;
  onClick: () => void;
  showMatch: boolean;
  variant: 'portrait' | 'compact';
}

const FeedCard = ({ item, onClick, showMatch, variant }: FeedCardProps) => (
  <div 
    onClick={onClick}
    className={`group relative w-full rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-electric-blue/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,224,255,0.15)] hover:-translate-y-1 ${
      variant === 'portrait' ? 'aspect-[3/4]' : 'h-64'
    }`}
  >
    {/* Image */}
    <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    
    {/* Readability Gradient */}
    <div className={`absolute inset-0 bg-gradient-to-t from-pure-black/95 ${variant === 'compact' ? 'via-pure-black/60' : 'via-pure-black/40'} to-transparent opacity-90`} />

    {/* Badges */}
    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-10">
      {item.urgent && (
        <div className="px-2 py-1 rounded bg-neon-rose/20 border border-neon-rose/50 backdrop-blur-md text-[10px] font-bold text-neon-rose uppercase tracking-wider animate-pulse">
          URGENT
        </div>
      )}
      <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/60 border border-white/10 backdrop-blur-md text-white">
        {item.type === 'staff' ? <ShieldCheck className="w-3 h-3 text-uv-teal" /> : <Star className="w-3 h-3 text-electric-blue" />}
        <span className="text-xs font-bold">{item.rating}%</span>
      </div>
      {showMatch && (
         <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-electric-blue/20 border border-electric-blue/50 backdrop-blur-md text-white animate-fade-up">
            <Sparkles className="w-3 h-3 text-electric-blue" />
            <span className="text-xs font-bold text-electric-blue">{item.matchScore}% Match</span>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 z-10">
      <div className="flex flex-wrap gap-2 mb-2 md:mb-3">
        {item.tags.slice(0, variant === 'compact' ? 3 : 2).map((tag, i) => (
           <span key={i} className="text-[10px] font-mono text-gray-300 bg-white/10 px-2 py-0.5 rounded border border-white/5">{tag}</span>
        ))}
      </div>
      
      <h3 className={`${variant === 'compact' ? 'text-2xl' : 'text-lg md:text-xl'} font-display font-black text-white leading-tight mb-1 flex items-center gap-2`}>
        {item.title}
        {item.verified && <div className="w-4 h-4 rounded-full bg-electric-blue flex items-center justify-center flex-shrink-0"><Check className="w-2.5 h-2.5 text-black stroke-[3]" /></div>}
      </h3>
      
      <p className="text-sm text-gray-400 font-body mb-3">{item.subtitle}</p>
      
      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <div className="flex items-center gap-2 text-white font-bold font-mono">
           {item.type === 'staff' ? <Briefcase className="w-3 h-3 text-gray-500" /> : <DollarSign className="w-3 h-3 text-neon-rose" />}
           <span className={item.type === 'shift' ? 'text-neon-rose text-lg' : 'text-electric-blue'}>{item.rate}</span>
        </div>
        <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-electric-blue hover:text-black text-white flex items-center justify-center transition-all">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

const BookingModal = ({ item, onClose }: { item: FeedItem | null, onClose: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'booking' | 'success'>('idle');

  if (!item) return null;

  const handleBooking = () => {
    setStatus('booking');
    setTimeout(() => {
        setStatus('success');
        setTimeout(() => {
            onClose();
            setStatus('idle');
        }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-fade-up">
        {/* Header Image */}
        <div className="h-48 w-full relative">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors z-20">
                <X className="w-4 h-4" />
            </button>
        </div>

        <div className="p-6 -mt-12 relative z-10">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h2 className="text-3xl font-display font-black text-white mb-1 flex items-center gap-2">
                        {item.title}
                        {item.verified && <Check className="w-5 h-5 text-electric-blue" />}
                    </h2>
                    <p className="text-gray-400">{item.subtitle} • {item.location}</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-electric-blue">{item.rate}</div>
                    <div className="text-xs text-gray-500">ESTIMATED</div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4 py-4 border-y border-white/5">
                    <div className="text-center px-4 border-r border-white/5">
                        <div className="text-xl font-bold text-white">{item.rating}%</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Trust</div>
                    </div>
                    <div className="text-center px-4 border-r border-white/5">
                        <div className="text-xl font-bold text-white">4.9</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Rating</div>
                    </div>
                    <div className="text-center px-4">
                        <div className="text-xl font-bold text-white">24</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Jobs</div>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Expertise / Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded bg-white/5 border border-white/10 text-sm text-gray-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleBooking}
                    disabled={status !== 'idle'}
                    className={`w-full py-4 rounded-xl font-display font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden ${
                        status === 'success' ? 'bg-uv-teal text-black' : 
                        status === 'booking' ? 'bg-zinc-800 text-gray-400' :
                        'bg-electric-blue text-black hover:shadow-[0_0_20px_rgba(0,224,255,0.4)]'
                    }`}
                >
                    {status === 'idle' && (item.type === 'staff' ? 'Book Talent' : 'Apply for Shift')}
                    {status === 'booking' && 'Processing...'}
                    {status === 'success' && 'Confirmed!'}
                    
                    {/* Progress Bar for Booking */}
                    {status === 'booking' && (
                        <div className="absolute bottom-0 left-0 h-1 bg-electric-blue animate-[loadWidth_1.5s_ease-out_forwards]" />
                    )}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Container ---
interface DiscoveryFeedProps {
  initialType?: FeedType;
  fixedViewMode?: FeedType;
}

const DiscoveryFeed = ({ initialType = 'staff', fixedViewMode }: DiscoveryFeedProps) => {
  const [internalViewMode, setInternalViewMode] = useState<FeedType>(initialType);
  const viewMode = fixedViewMode || internalViewMode;
  const [copilotEnabled, setCopilotEnabled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);
  
  // Determine Data
  const rawData = viewMode === 'staff' ? MOCK_STAFF : MOCK_SHIFTS;
  
  // Sort Logic
  const sortedData = [...rawData].sort((a, b) => {
    if (copilotEnabled) return b.matchScore - a.matchScore;
    return 0; // Default order
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-up">
      
      {/* 1. Header (No KPIs) */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-end">
         <div className="w-full md:w-auto space-y-2">
            <h1 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
                {viewMode === 'staff' ? 'FIND ' : 'FIND '}
                <span className={viewMode === 'staff' ? 'text-electric-blue' : 'text-neon-rose'}>
                    {viewMode === 'staff' ? 'TALENT' : 'SHIFTS'}
                </span>
            </h1>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                {viewMode === 'staff' 
                    ? 'Access the top 1% of vetted nightlife professionals. Ranked by reliability and vibe fit.'
                    : 'Browse high-paying shifts at top-tier venues. Instant booking, same-day pay.'}
            </p>
         </div>
      </div>

      {/* 2. Controls Toolbar */}
      <div className="sticky top-24 z-30 p-4 rounded-xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 flex flex-col md:flex-row gap-6 items-center justify-between shadow-2xl">
        
        {/* Toggle (Only if not fixed) & Filters */}
        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
            
            {/* View Switcher - Only show if not in fixed mode */}
            {!fixedViewMode && (
                <>
                    <div className="flex p-1 bg-black/50 rounded-lg border border-white/5 flex-shrink-0">
                        <button 
                            onClick={() => setInternalViewMode('staff')}
                            className={`px-4 py-2 rounded text-xs font-bold font-display uppercase transition-all ${viewMode === 'staff' ? 'bg-electric-blue text-black shadow-[0_0_10px_rgba(0,224,255,0.4)]' : 'text-gray-500 hover:text-white'}`}
                        >
                            Find Staff
                        </button>
                        <button 
                            onClick={() => setInternalViewMode('shift')}
                            className={`px-4 py-2 rounded text-xs font-bold font-display uppercase transition-all ${viewMode === 'shift' ? 'bg-neon-rose text-black shadow-[0_0_10px_rgba(255,126,179,0.4)]' : 'text-gray-500 hover:text-white'}`}
                        >
                            Find Shifts
                        </button>
                    </div>
                    <div className="w-px h-8 bg-white/10 flex-shrink-0" />
                </>
            )}

            {/* Filter Chips */}
            <div className="flex gap-2">
                {(viewMode === 'staff' ? ['Bartenders', 'Security', 'DJs', 'Servers'] : ['Urgent', 'Weekend', 'High Pay', 'Private']).map(filter => (
                    <button key={filter} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-gray-300 whitespace-nowrap transition-colors">
                        {filter}
                    </button>
                ))}
            </div>
        </div>

        {/* AI Toggle */}
        <div className="flex items-center gap-3 pl-4 md:border-l border-white/10 w-full md:w-auto justify-end">
            <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${copilotEnabled ? 'text-electric-blue' : 'text-gray-500'}`}>
                {copilotEnabled ? '✨ Ranked by Copilot' : 'Rank by Copilot'}
            </span>
            <button 
                onClick={() => setCopilotEnabled(!copilotEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${copilotEnabled ? 'bg-electric-blue' : 'bg-gray-700'}`}
            >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${copilotEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
        </div>

      </div>

      {/* 3. Feed Grid */}
      <div className={
        viewMode === 'staff' 
        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20" // Staff: 2 cols on mobile
        : "grid grid-cols-1 md:grid-cols-2 gap-4 pb-20" // Shifts: Compact stack (1 col mobile, 2 col desktop)
      }>
        {sortedData.map((item) => (
            <FeedCard 
                key={item.id} 
                item={item} 
                variant={viewMode === 'staff' ? 'portrait' : 'compact'}
                onClick={() => setSelectedItem(item)} 
                showMatch={copilotEnabled}
            />
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedItem && (
        <BookingModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

    </div>
  );
};

export default DiscoveryFeed;
