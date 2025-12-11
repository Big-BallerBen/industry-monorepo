import React from 'react';
import DiscoveryFeed from '../../components/DiscoveryFeed';

const StaffDiscovery: React.FC = () => {
  return (
    <div className="pt-24 pb-24">
      <DiscoveryFeed fixedViewMode="shift" />
    </div>
  );
};

export default StaffDiscovery;