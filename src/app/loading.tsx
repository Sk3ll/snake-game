import React from 'react';
import { PiSpinnerGapThin } from 'react-icons/pi';

const Loading: React.FC = () => (
  <div className="flex h-full justify-center">
    <PiSpinnerGapThin className="animate-spin text-4xl" />
  </div>
);

export default Loading;
