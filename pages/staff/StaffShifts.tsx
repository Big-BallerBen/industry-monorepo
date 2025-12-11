import React from 'react';
import Scheduler from '../../components/Scheduler';

const StaffShifts: React.FC = () => {
  return (
    <div className="pt-24 pb-24">
      <Scheduler mode="staff" />
    </div>
  );
};

export default StaffShifts;