import React from 'react';
import { MY_STAFF_ROSTER } from '../../utils/mockData';
import { Star, MapPin, ShieldCheck, Award } from 'lucide-react';

const StaffProfile: React.FC = () => {
  const user = MY_STAFF_ROSTER[0];

  return (
    <div className="p-4 pt-24 pb-20 max-w-lg mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full p-1 border-2 border-neon-rose mb-4 relative">
            <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
            <div className="absolute bottom-0 right-0 bg-neon-rose text-black p-2 rounded-full border-4 border-app">
                <ShieldCheck className="w-5 h-5" />
            </div>
        </div>
        <h1 className="text-2xl font-display font-black text-txt-primary">{user.name}</h1>
        <p className="text-neon-rose font-medium mb-1">{user.role}</p>
        <div className="flex items-center gap-2 text-txt-tertiary text-sm">
            <MapPin className="w-3 h-3" /> Downtown • {user.yearsExperience} Years Exp
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6 mb-6">
        <div className="flex justify-between text-center divide-x divide-gray-200 dark:divide-white/10">
            <div className="flex-1 px-2">
                <div className="text-2xl font-bold text-txt-primary flex justify-center items-center gap-1">
                    {user.rating} <Star className="w-4 h-4 text-electric-blue fill-current" />
                </div>
                <div className="text-[10px] text-txt-tertiary uppercase tracking-widest mt-1">Rating</div>
            </div>
            <div className="flex-1 px-2">
                <div className="text-2xl font-bold text-txt-primary">142</div>
                <div className="text-[10px] text-txt-tertiary uppercase tracking-widest mt-1">Shifts</div>
            </div>
            <div className="flex-1 px-2">
                <div className="text-2xl font-bold text-txt-primary">100%</div>
                <div className="text-[10px] text-txt-tertiary uppercase tracking-widest mt-1">Reliability</div>
            </div>
        </div>
      </div>

      <h3 className="text-xs font-bold text-txt-tertiary uppercase tracking-widest mb-4">Specialties & Tags</h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {user.tags.map(tag => (
            <span key={tag} className="px-4 py-2 rounded-xl content-card text-sm text-txt-secondary">
                {tag}
            </span>
        ))}
      </div>

      <h3 className="text-xs font-bold text-txt-tertiary uppercase tracking-widest mb-4">Achievements</h3>
      <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl content-card relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-50 pointer-events-none" />
               <div className="relative p-3 rounded-full bg-purple-500/20 text-purple-500">
                   <Award className="w-6 h-6" />
               </div>
               <div className="relative">
                   <div className="font-bold text-txt-primary">Top Rated Talent</div>
                   <div className="text-xs text-txt-secondary">Maintained 4.9+ rating for 3 months</div>
               </div>
          </div>
      </div>
    </div>
  );
};

export default StaffProfile;