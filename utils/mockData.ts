
export const getRelativeDate = (offsetDays: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
};

export const getRelativeTime = (offsetHours: number): Date => {
    const date = new Date();
    date.setHours(date.getHours() + offsetHours);
    return date;
}

export const VENUE_IMAGES = {
  'Club Onyx': 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop',
  'The Alchemist': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop',
  'Rooftop 99': 'https://images.unsplash.com/photo-1570554806857-45814cc58f2c?q=80&w=1000&auto=format&fit=crop', 
  'Warehouse Project': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
  'Gatsby Lounge': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop',
  'Main Bar': 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1000&auto=format&fit=crop',
  'VIP Lounge': 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=1000&auto=format&fit=crop',
  'Availability': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=500&auto=format&fit=crop'
};

export interface StaffProfile {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number; // 0-5
  yearsExperience: number;
  locationDistance: number; // in miles
  tags: string[];
  verified: boolean;
  availableDates: string[]; // ISO Date strings
}

export const MY_STAFF_ROSTER: StaffProfile[] = [
  {
    id: 's1', name: 'Elena Rodriguez', role: 'Mixologist',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9, yearsExperience: 8, locationDistance: 2,
    tags: ['Mixology', 'Flair', 'Craft Cocktails'], verified: true,
    availableDates: [getRelativeDate(0), getRelativeDate(1), getRelativeDate(2)]
  },
  {
    id: 's2', name: 'Marcus Chen', role: 'Security',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    rating: 4.7, yearsExperience: 5, locationDistance: 5,
    tags: ['Crowd Control', 'VIP', 'De-escalation'], verified: true,
    availableDates: [getRelativeDate(1), getRelativeDate(3)]
  },
  {
    id: 's3', name: 'Sarah Jenkins', role: 'Server',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8, yearsExperience: 4, locationDistance: 1,
    tags: ['Bottle Service', 'Tables', 'Upscale'], verified: true,
    availableDates: [getRelativeDate(0), getRelativeDate(2)]
  },
  {
    id: 's4', name: 'David Miller', role: 'Barback',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    rating: 4.5, yearsExperience: 2, locationDistance: 12,
    tags: ['Inventory', 'Heavy Lifting', 'Speed'], verified: false,
    availableDates: [getRelativeDate(0), getRelativeDate(1), getRelativeDate(2), getRelativeDate(3)]
  },
  {
    id: 's5', name: 'Sophie Al-Fayed', role: 'DJ',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9, yearsExperience: 10, locationDistance: 20,
    tags: ['House', 'Techno', 'Open Format'], verified: true,
    availableDates: [getRelativeDate(2), getRelativeDate(3)]
  },
  {
    id: 's6', name: 'James Wilson', role: 'Bartender',
    image: 'https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?q=80&w=1000&auto=format&fit=crop',
    rating: 4.6, yearsExperience: 6, locationDistance: 4,
    tags: ['High Volume', 'Craft Beer', 'Speed'], verified: true,
    availableDates: [getRelativeDate(0)]
  },
  {
    id: 's7', name: 'Kira Tanaka', role: 'Hostess',
    image: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8, yearsExperience: 3, locationDistance: 3,
    tags: ['Reception', 'Reservations', 'VIP'], verified: true,
    availableDates: [getRelativeDate(0), getRelativeDate(1)]
  },
  {
    id: 's8', name: 'Leo Vasquez', role: 'Barback',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop',
    rating: 4.4, yearsExperience: 1, locationDistance: 8,
    tags: ['Stocking', 'Cleaning'], verified: true,
    availableDates: [getRelativeDate(1), getRelativeDate(2)]
  },
  {
    id: 's9', name: 'Priya Patel', role: 'Event Manager',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop',
    rating: 4.95, yearsExperience: 12, locationDistance: 15,
    tags: ['Logistics', 'Ops', 'Staffing'], verified: true,
    availableDates: [getRelativeDate(5)]
  },
  {
    id: 's10', name: 'Alex Thorne', role: 'Security',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    rating: 4.6, yearsExperience: 7, locationDistance: 6,
    tags: ['ID Check', 'Crowd Control'], verified: true,
    availableDates: [getRelativeDate(0), getRelativeDate(1)]
  }
];

export const generateMockShifts = () => {
    const now = new Date();
    
    return [
        {
            id: 'sh1', type: 'shift',
            image: VENUE_IMAGES['Club Onyx'],
            title: 'Club Onyx', subtitle: 'Barback Needed • Tonight 9PM',
            location: 'SoHo District', rate: '$250 Flat', rating: 92,
            matchScore: 0, 
            tags: ['High Volume', 'Uniform'],
            startTime: new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString(),
            verified: true
        },
        {
            id: 'sh2', type: 'shift',
            image: VENUE_IMAGES['The Alchemist'],
            title: 'The Alchemist', subtitle: 'Mixologist • Tomorrow 6PM',
            location: 'Downtown', rate: '$50/hr + Tips', rating: 98,
            matchScore: 0,
            tags: ['Craft Cocktails', 'Intimate'],
            startTime: new Date(now.getTime() + 26 * 60 * 60 * 1000).toISOString(),
            verified: true
        },
        {
            id: 'sh3', type: 'shift',
            image: VENUE_IMAGES['Rooftop 99'],
            title: 'Rooftop 99', subtitle: 'VIP Server • in 2 Days',
            location: 'Skyline Plaza', rate: '$40/hr + Grat', rating: 90,
            matchScore: 0,
            tags: ['Outdoor', 'Upscale'],
            startTime: new Date(now.getTime() + 50 * 60 * 60 * 1000).toISOString(),
            verified: true
        },
        {
            id: 'sh4', type: 'shift',
            image: VENUE_IMAGES['Warehouse Project'],
            title: 'Warehouse Project', subtitle: 'Event Security • Tonight 10PM',
            location: 'Industrial Park', rate: '$30/hr', rating: 88,
            matchScore: 0,
            tags: ['Concert', 'Crowd'],
            startTime: new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString(),
            verified: true
        },
         {
            id: 'sh5', type: 'shift',
            image: VENUE_IMAGES['Gatsby Lounge'],
            title: 'Gatsby Lounge', subtitle: 'Door Host • Tomorrow 7PM',
            location: 'Historic District', rate: '$28/hr', rating: 94,
            matchScore: 0,
            tags: ['Suit Req', 'Guest List'],
            startTime: new Date(now.getTime() + 27 * 60 * 60 * 1000).toISOString(),
            verified: true
        }
    ];
};

// Past Shifts with Review States
export const PAST_STAFF_SHIFTS = [
  {
    id: 101,
    day: 'SATURDAY', 
    date: getRelativeDate(-5),
    venue: 'Gatsby Lounge',
    role: 'Door Host',
    time: '7:00 PM - 2:00 AM',
    pay: '$200 Flat',
    status: 'completed',
    image: VENUE_IMAGES['Gatsby Lounge'],
    // Scenario: User hasn't reviewed yet
    userReviewed: false,
    venueRated: false,
    ratingReceived: null
  },
  {
    id: 102,
    day: 'FRIDAY',
    date: getRelativeDate(-6),
    venue: 'Warehouse Project',
    role: 'Security',
    time: '10:00 PM - 4:00 AM',
    pay: '$30/hr',
    status: 'completed',
    image: VENUE_IMAGES['Warehouse Project'],
    // Scenario: Both reviewed, showing rating
    userReviewed: true,
    venueRated: true,
    ratingReceived: 4.9
  },
   {
    id: 103,
    day: 'THURSDAY',
    date: getRelativeDate(-7),
    venue: 'Main Bar',
    role: 'Bartender',
    time: '8:00 PM - 3:00 AM',
    pay: '$300 Flat',
    status: 'completed',
    image: VENUE_IMAGES['Main Bar'],
    // Scenario: User reviewed, Venue pending
    userReviewed: true,
    venueRated: false,
    ratingReceived: null
  }
];

export interface ChatThread {
  id: string;
  type: 'venue' | 'copilot' | 'system' | 'alert';
  shiftId?: string | number; // Links this chat to a specific job
  title: string;
  subtitle: string;
  avatar?: string;
  lastMessage?: string;
  timestamp: string;
  unreadCount?: number;
  unread?: boolean;
  isLocked?: boolean; // For completed shifts
  status?: 'active' | 'upcoming' | 'completed';
  activeShift?: boolean;
  data?: any; // For review objects or other meta
}

export const MOCK_THREADS: ChatThread[] = [
  // 1. ACTIVE SHIFT CHAT (Club Onyx / Next Shift in Dashboard)
  {
    id: 't1',
    type: 'venue',
    shiftId: 99, // Matches Dashboard "nextShift" ID
    title: 'Club Onyx',
    subtitle: 'Manager: Alex',
    avatar: VENUE_IMAGES['Club Onyx'],
    lastMessage: 'Parking is in the back lot, code 4092.',
    timestamp: '10m ago',
    unreadCount: 1,
    isLocked: false,
    status: 'active',
    activeShift: true
  },
  // 2. COPILOT INTEL (Club Onyx)
  {
    id: 't2',
    type: 'copilot',
    shiftId: 99,
    title: 'Shift Intel',
    subtitle: 'Club Onyx',
    avatar: '', // Handled in UI
    lastMessage: 'Uniform: All black. Menu PDF attached.',
    timestamp: '1h ago',
    unreadCount: 0,
    isLocked: false,
    status: 'active'
  },
  // 3. COMPLETED SHIFT (Main Bar / ID 103)
  {
    id: 't3',
    type: 'venue',
    shiftId: 103,
    title: 'Main Bar',
    subtitle: 'Shift #4092',
    avatar: VENUE_IMAGES['Main Bar'],
    lastMessage: 'Shift ended. Chat closed.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isLocked: true,
    status: 'completed'
  },
  // 4. URGENT SYSTEM ALERT
  {
    id: 't4',
    type: 'system',
    title: 'URGENT: No-Show Alert',
    subtitle: 'Security needed tonight',
    avatar: '',
    lastMessage: 'Tap to claim +$50 bonus.',
    timestamp: '2m ago',
    unreadCount: 1,
    isLocked: false,
    status: 'active'
  }
];
