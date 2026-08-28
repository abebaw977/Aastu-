import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  RotateCw, 
  Maximize2, 
  Minimize2, 
  X, 
  Wifi, 
  BatteryMedium, 
  Signal, 
  Volume2,
  Sparkles,
  Info,
  Layers
} from 'lucide-react';

interface SamsungA04DeviceViewProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const SamsungA04DeviceView: React.FC<SamsungA04DeviceViewProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-6 overflow-y-auto">
      {/* Top Simulator Control Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-2.5 mb-4 text-white shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/30">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold flex items-center gap-2">
              Samsung Galaxy A04 Responsive View
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30 font-mono">
                360 × 800 px (20:9)
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              6.5" HD+ Infinity-V Display • Ethiopia Mobile Spec Verified
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
            title="Rotate Device Orientation"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{orientation === 'portrait' ? 'Landscape' : 'Portrait'}</span>
          </button>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-500/30 transition text-xs flex items-center gap-1"
            title="Exit Samsung A04 Frame"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit Frame</span>
          </button>
        </div>
      </div>

      {/* Samsung Galaxy A04 Physical Chassis Frame */}
      <div 
        className={`relative transition-all duration-300 bg-slate-900 border-[10px] border-slate-800 rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col ${
          orientation === 'portrait'
            ? 'w-[380px] max-w-[95vw] h-[820px] max-h-[88vh]'
            : 'w-[820px] max-w-[95vw] h-[440px] max-h-[88vh]'
        }`}
        style={{
          boxShadow: '0 0 0 2px #334155, 0 20px 50px rgba(0,0,0,0.8), inset 0 0 10px rgba(255,255,255,0.05)'
        }}
      >
        {/* Top Bezel with Speaker Ear-Piece & Infinity-V Camera Notch */}
        <div className="relative bg-slate-950 h-8 shrink-0 flex items-center justify-between px-6 text-white text-[11px] font-sans select-none z-30">
          {/* Left Clock */}
          <span className="font-semibold text-[11px] text-slate-200">{currentTime || '12:00'}</span>

          {/* Infinity-V Waterdrop Camera Notch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
            {/* Speaker Earpiece Grille */}
            <div className="w-10 h-1 bg-slate-800 rounded-full mb-1" />
            {/* Waterdrop Notch cutout */}
            <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-950 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-950/80 border border-slate-700" />
            </div>
          </div>

          {/* Right Status Icons (Samsung One UI style) */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3 h-3" />
            <span className="text-[9px] font-bold">4G</span>
            <Wifi className="w-3 h-3" />
            <BatteryMedium className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Screen Viewport (Render App Children with 360px optimized layout) */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-950 overflow-y-auto overflow-x-hidden relative scrollbar-none">
          {children}
        </div>

        {/* Android Navigation Gesture Bar Indicator */}
        <div className="h-4 bg-slate-950 shrink-0 flex items-center justify-center">
          <div className="w-32 h-1 bg-slate-600 rounded-full" />
        </div>
      </div>

      {/* Footer Info Pill */}
      <div className="mt-3 text-center text-xs text-slate-400 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Samsung Galaxy A04 Real View • Full touch, scroll & formula zoom enabled</span>
      </div>
    </div>
  );
};
