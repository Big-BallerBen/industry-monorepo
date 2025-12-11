import React, { useState } from 'react';
import { 
  Search, MapPin, Star, ShieldCheck, 
  ChevronRight, Check, X, DollarSign,
  Sparkles, Briefcase, ChevronDown, Users, Heart, Bot, Plus
} from 'lucide-react';
import { MY_STAFF_ROSTER, generateMockShifts, StaffProfile } from '../utils/mockData';
import AddAvailabilityDrawer from './AddAvailabilityDrawer';
import ShiftDetailsModal from './ShiftDetailsModal';

type FeedType = 'staff' | 'shift';

interface FeedItem {
  id: string;
  type: FeedType;
  image: string;
  title: string;
  subtitle: string;
  location: string;
  rate: string;
  rating: number;
  matchScore: number;
  tags: string[];
  verified?: boolean;
  urgent?: boolean;
  rawObj?: any;
}

const calculateMatchScore = (staff: StaffProfile): number => {
    const TARGET_REQUIREMENTS = {
        role: 'Bartender',
        tags: ['Mixology', 'High Volume', 'Craft Cocktails', 'Speed', 'VIP'],
        minRating: 4.5,
        maxDistance: 15
    };
    const matchingTags = staff.tags.filter(tag => TARGET_REQUIREMENTS.tags.includes(tag));
    const skillScore = (matchingTags.length / staff.tags.length) * 100;
    const availScore = 100; 
    const distScore = Math.max(0, 100 - (staff.locationDistance * 2));
    const expScore = (staff.rating / 5) * 100;
    const compScore = staff.verified ? 100 : 50;

    const totalScore = 
        (skillScore * 0.35) + 
        (availScore * 0.25) + 
        (distScore * 0.15) + 
        (expScore * 0.15) + 
        (compScore * 0.10);

    return Math.round(totalScore);
};

interface FeedCardProps {
  item: FeedItem;
  onClick: () => void;
  showMatch: boolean;
  variant: 'portrait' | 'compact';
}

const FeedCard: React.FC<FeedCardProps> = ({ item, onClick, showMatch, variant }) => (
  <div 
    onClick={onClick}
    className={`group relative w-full rounded-2xl overflow-hidden cursor-pointer border border-white/5 transition-all duration-300 hover:-translate-y-1 ${
      variant === 'portrait' ? 'aspect-[3/4]' : 'h-64'
    } ${item.type === 'staff' ? 'hover:border-electric-blue/50 hover:shadow-[0_0_20px_rgba(0,224,255,0.15)]' : 'hover:border-neon-rose/50 hover:shadow-[0_0_20px_rgba(255,126,179,0.15)]'}`}
  >
    <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    
    <div className={`absolute inset-0 bg-gradient-to-t from-pure-black/95 ${variant === 'compact' ? 'via-pure-black/60' : 'via-pure-black/40'} to-transparent opacity-90`} />

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
         <div className={`flex items-center gap-1.5 px-2 py-1 rounded backdrop-blur-md text-white animate-fade-up ${item.type === 'staff' ? 'bg-electric-blue/20 border border-electric-blue/50' : 'bg-neon-rose/20 border border-neon-rose/50'}`}>
            <Sparkles className={`w-3 h-3 ${item.type === 'staff' ? 'text-electric-blue' : 'text-neon-rose'}`} />
            <span className={`text-xs font-bold ${item.type === 'staff' ? 'text-electric-blue' : 'text-neon-rose'}`}>{item.matchScore}% Match</span>
        </div>
      )}
    </div>

    <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 z-10">
      <div className="flex flex-wrap gap-2 mb-2 md:mb-3">
        {item.tags.slice(0, variant === 'compact' ? 3 : 2).map((tag, i) => (
           <span key={i} className="text-[10px] font-mono text-gray-300 bg-white/10 px-2 py-0.5 rounded border border-white/5">{tag}</span>
        ))}
      </div>
      
      <h3 className={`${variant === 'compact' ? 'text-2xl' : 'text-lg md:text-xl'} font-display font-black text-white leading-tight mb-1 flex items-center gap-2`}>
        {item.title}
        {item.verified && <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.type === 'staff' ? 'bg-electric-blue' : 'bg-neon-rose'}`}><Check className="w-2.5 h-2.5 text-black stroke-[3]" /></div>}
      </h3>
      
      <p className="text-sm text-gray-400 font-body mb-3">{item.subtitle}</p>
      
      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <div className="flex items-center gap-2 text-white font-bold font-mono">
           {item.type === 'staff' ? <Briefcase className="w-3 h-3 text-gray-500" /> : <DollarSign className="w-3 h-3 text-neon-rose" />}
           <span className={item.type === 'shift' ? 'text-neon-rose text-lg' : 'text-electric-blue'}>{item.rate}</span>
        </div>
        <button className={`w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center transition-all ${item.type === 'staff' ? 'hover:bg-electric-blue hover:text-black' : 'hover:bg-neon-rose hover:text-black'}`}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

interface DiscoveryFeedProps {
  initialType?: FeedType;
  fixedViewMode?: FeedType;
}

const DiscoveryFeed = ({ initialType = 'staff', fixedViewMode }: DiscoveryFeedProps) => {
  const [internalViewMode, setInternalViewMode] = useState<FeedType>(initialType);
  const viewMode = fixedViewMode || internalViewMode;
  const [copilotEnabled, setCopilotEnabled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'Everyone' | 'Favorites'>('Everyone');
  const [availDrawerOpen, setAvailDrawerOpen] = useState(false);
  
  const isVenueMode = viewMode === 'staff';
  const themeColor = isVenueMode ? 'electric-blue' : 'neon-rose';

  const handleOpenAi = () => {
    window.dispatchEvent(new CustomEvent('open-ai-modal'));
  };

  const handleAddAvailability = (avail: any) => {
      console.log("Availability added:", avail);
      setAvailDrawerOpen(false);
  };
  
  const staffFeed: FeedItem[] = MY_STAFF_ROSTER.map(s => ({
      id: s.id,
      type: 'staff',
      image: s.image,
      title: s.name,
      subtitle: s.role,
      location: `${s.locationDistance} mi`,
      rate: '$35/hr', 
      rating: Math.round(s.rating * 20),
      matchScore: calculateMatchScore(s),
      tags: s.tags,
      verified: s.verified
  }));

  const shiftFeed: FeedItem[] = generateMockShifts().map(s => {
      const now = new Date();
      const shiftStart = new Date(s.startTime as string);
      const diffHours = (shiftStart.getTime() - now.getTime()) / (1000 * 60 * 60);
      const isUrgent = diffHours < 24 && diffHours > 0;

      return {
          ...s,
          type: s.type as FeedType,
          matchScore: 85 + Math.floor(Math.random() * 14),
          urgent: isUrgent
      };
  });

  const displayData = viewMode === 'staff' ? staffFeed : shiftFeed;
  
  const filteredData = displayData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (copilotEnabled) return b.matchScore - a.matchScore;
    return 0;
  });

  const titlePrefix = viewMode === 'staff' ? 'FIND' : 'FIND';
  const titleSuffix = viewMode === 'staff' ? 'TALENT' : 'SHIFTS';

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fade-up">
      
      {/* Header matching Global Header Structure */}
      <div className="fixed top-0 inset-x-0 z-40 px-6 py-4 grid grid-cols-3 items-center bg-panel/90 backdrop-blur-xl border-b border-glass-border transition-colors duration-300">
         {/* Left spacer or Action Button */}
         <div className="justify-self-start">
             {viewMode === 'shift' && (
                 <button
                    onClick={() => setAvailDrawerOpen(true)}
                    className="w-10 h-10 rounded-full bg-transparent border border-glass flex items-center justify-center text-txt-primary hover:bg-white/10 transition-colors"
                 >
                    <Plus className="w-5 h-5" />
                 </button>
             )}
         </div>

         {/* Center Title */}
         <div className="justify-self-center relative">
            <button 
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="flex items-center gap-2"
            >
                <h1 className="text-xl font-display font-black tracking-widest text-txt-primary uppercase flex gap-2">
                    <span>{titlePrefix}</span>
                    <span className="text-neon-rose">{titleSuffix}</span>
                </h1>
                <ChevronDown className={`w-4 h-4 text-txt-tertiary transition-transform ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isFilterDropdownOpen && (
                <div className="absolute top-full mt-2 w-48 bg-panel backdrop-blur-xl border border-glass rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in text-left">
                    <button 
                        onClick={() => { setActiveFilter('Everyone'); setIsFilterDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors"
                    >
                        <Users className={`w-5 h-5 ${activeFilter === 'Everyone' ? 'text-txt-primary' : 'text-txt-tertiary'}`} />
                        <span className={`font-bold text-sm ${activeFilter === 'Everyone' ? 'text-txt-primary' : 'text-txt-tertiary'}`}>Everyone</span>
                        {activeFilter === 'Everyone' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-rose shadow-[0_0_8px_rgba(255,126,179,0.8)]"></div>}
                    </button>
                    <div className="h-px bg-white/5 mx-4"></div>
                    <button 
                        onClick={() => { setActiveFilter('Favorites'); setIsFilterDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors"
                    >
                        <Heart className={`w-5 h-5 ${activeFilter === 'Favorites' ? 'text-neon-rose' : 'text-txt-tertiary'}`} />
                        <span className={`font-bold text-sm ${activeFilter === 'Favorites' ? 'text-txt-primary' : 'text-txt-tertiary'}`}>Favorites</span>
                        {activeFilter === 'Favorites' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-rose shadow-[0_0_8px_rgba(255,126,179,0.8)]"></div>}
                    </button>
                </div>
            )}
         </div>

         {/* Right Bot Icon */}
         <div className="justify-self-end">
            <button 
                onClick={handleOpenAi}
                className="p-2 rounded-full hover:bg-white/10 transition-colors group"
            >
                <Bot className="w-6 h-6 text-brand group-hover:text-txt-primary transition-colors" />
            </button>
         </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Search Bar - LIGHTENED BACKGROUND (bg-black/5 dark:bg-white/10) */}
        <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-txt-tertiary" />
            </div>
            <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={viewMode === 'staff' ? "Search bartenders, security, DJs..." : "Search venues, roles, or rates..."}
            className="w-full bg-black/5 dark:bg-white/10 border border-glass rounded-2xl py-4 pl-12 pr-4 text-txt-primary placeholder-txt-tertiary focus:outline-none focus:ring-1 focus:ring-brand/50 transition-all font-body text-sm shadow-sm"
            />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
                {!fixedViewMode && (
                    <>
                        <div className="flex p-1 bg-input rounded-lg border border-glass flex-shrink-0">
                            <button 
                                onClick={() => setInternalViewMode('staff')}
                                className={`px-4 py-2 rounded text-xs font-bold font-display uppercase transition-all ${viewMode === 'staff' ? 'bg-electric-blue text-black shadow-[0_0_10px_rgba(0,224,255,0.4)]' : 'text-txt-tertiary hover:text-txt-primary'}`}
                            >
                                Staff
                            </button>
                            <button 
                                onClick={() => setInternalViewMode('shift')}
                                className={`px-4 py-2 rounded text-xs font-bold font-display uppercase transition-all ${viewMode === 'shift' ? 'bg-neon-rose text-black shadow-[0_0_10px_rgba(255,126,179,0.4)]' : 'text-txt-tertiary hover:text-txt-primary'}`}
                            >
                                Shifts
                            </button>
                        </div>
                        <div className="w-px h-8 bg-glass flex-shrink-0" />
                    </>
                )}

                <div className="flex gap-2">
                    {(viewMode === 'staff' ? ['Bartenders', 'Security', 'DJs', 'Servers'] : ['Urgent', 'Weekend', 'High Pay', 'Private']).map(filter => (
                        <button key={filter} className="px-3 py-1.5 rounded-full border border-glass bg-card hover:bg-white/10 text-xs text-txt-secondary whitespace-nowrap transition-colors">
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${copilotEnabled ? `text-${themeColor}` : 'text-txt-tertiary'}`}>
                    {copilotEnabled ? '✨ Ranked by Copilot' : 'Rank by Copilot'}
                </span>
                <button 
                    onClick={() => setCopilotEnabled(!copilotEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${copilotEnabled ? `bg-${themeColor}` : 'bg-gray-700'}`}
                >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${copilotEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
            </div>
        </div>

        {/* Grid */}
        <div className={
            viewMode === 'staff' 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20"
            : "grid grid-cols-1 md:grid-cols-2 gap-4 pb-20"
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
            {sortedData.length === 0 && (
                <div className="col-span-full py-20 text-center text-txt-tertiary">
                    No results found matching "{searchQuery}"
                </div>
            )}
        </div>
      </div>

      {selectedItem && (
        <ShiftDetailsModal 
            open={true}
            onClose={() => setSelectedItem(null)} 
            shift={{
                id: Math.random(),
                role: selectedItem.subtitle,
                venue: selectedItem.title,
                date: 'Tonight',
                time: '9PM - 3AM',
                rate: parseInt(selectedItem.rate.replace(/\D/g, '')) || 50,
                hiredCount: 0,
                neededCount: 3,
                staff: [],
                status: 'open'
            }}
            onToggleHire={() => {}}
            onPayNow={() => {}}
        />
      )}
      
      {/* Availability Drawer */}
      <AddAvailabilityDrawer
        open={availDrawerOpen}
        onClose={() => setAvailDrawerOpen(false)}
        onSave={handleAddAvailability}
      />
    </div>
  );
};

export default DiscoveryFeed;