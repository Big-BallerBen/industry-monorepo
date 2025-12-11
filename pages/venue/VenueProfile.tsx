import React from 'react';

const VenueProfile: React.FC = () => {
  return (
    <div className="p-4 pt-8">
      <h1 className="text-2xl font-display font-bold mb-4">Venue Profile</h1>
      <div className="glass-panel p-6 rounded-2xl">
        <p className="text-gray-400">Update venue details, location, and photos.</p>
      </div>
    </div>
  );
};

export default VenueProfile;