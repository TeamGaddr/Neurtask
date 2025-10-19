import React from 'react';

type CardToggleProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

const CardToggle: React.FC<CardToggleProps> = ({ icon, title, description, enabled, onToggle }) => {
  return (
    <div className="relative p-10 rounded-2xl border border-gray-200 shadow-sm w-full max-w-xs bg-white">
      {/* Toggle in top-right corner */}
      <div className="absolute top-4 right-4">
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={enabled} onChange={onToggle} className="sr-only" />
          <div
            className={`w-10 h-6 rounded-full flex items-center transition-colors  duration-300 ${
              enabled ? 'bg-black' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full  shadow-md transform transition-transform duration-300 ${
                enabled ? 'translate-x-4' : 'translate-x-1'
              }`}
            />
          </div>
        </label>
      </div>

      {/* Icon + Text Stack */}
      <div className="flex flex-col gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="font-medium text-sm text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 leading-tight">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardToggle;
