
import React from 'react';

interface Props {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<Props> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full px-6 pt-4 sticky top-0 z-50 bg-transparent">
      <div className="h-6 w-full bg-white rounded-full border-4 border-yellow-200 overflow-hidden cartoon-shadow p-1">
        <div 
          className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all duration-700 ease-out relative"
          style={{ width: `${progress}%` }}
        >
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
