import React from 'react';

const VenueDashboard: React.FC = () => {
  return (
    <div className="p-4 pt-8">
      <h1 className="text-2xl font-display font-bold mb-4">Venue Dashboard</h1>
      <div className="glass-panel p-6 rounded-2xl border-l-2 border-neon-rose">
        <p className="text-gray-400">Overview of active rosters and tonight's staffing status.</p>
      </div>
    </div>
  );
};

export default VenueDashboard;