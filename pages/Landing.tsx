import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Star } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8 z-10 relative">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-display font-bold tracking-widest">
          INDUSTRY<span className="text-electric-blue">.IO</span>
        </h1>
        <p className="text-gray-400">Nightlife Staffing Protocol</p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        <p className="text-xs text-center uppercase tracking-widest text-gray-500 mb-2">Select User Role (Dev Mode)</p>
        
        <Link to="/staff/dashboard" className="glass-panel p-4 rounded-xl flex items-center space-x-4 hover:border-electric-blue/50 transition-colors">
          <div className="p-2 bg-electric-blue/10 rounded-lg">
            <Star className="w-6 h-6 text-electric-blue" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Staff</h3>
            <p className="text-xs text-gray-400">Bartenders, Servers, Security</p>
          </div>
        </Link>

        <Link to="/venue/dashboard" className="glass-panel p-4 rounded-xl flex items-center space-x-4 hover:border-neon-rose/50 transition-colors">
          <div className="p-2 bg-neon-rose/10 rounded-lg">
            <MapPin className="w-6 h-6 text-neon-rose" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Venue</h3>
            <p className="text-xs text-gray-400">Managers, Owners</p>
          </div>
        </Link>

        <Link to="/promoter/dashboard" className="glass-panel p-4 rounded-xl flex items-center space-x-4 hover:border-uv-teal/50 transition-colors">
          <div className="p-2 bg-uv-teal/10 rounded-lg">
            <Shield className="w-6 h-6 text-uv-teal" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Promoter</h3>
            <p className="text-xs text-gray-400">Event Organizers</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Landing;