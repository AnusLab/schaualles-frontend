import React from 'react';
import { Shield, Zap, Monitor, CheckCircle2, Star, Activity, TrendingUp } from 'lucide-react';

export default function HeroStats() {
  return (
    <div className="relative">
      {/* Main Stats Card with Glassmorphism */}
      <div className="relative bg-gradient-to-br from-white to-slate-50/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/60 max-w-lg mx-auto transform hover:scale-[1.02] transition-all duration-500 hover:shadow-brand-500/20">
        
        {/* Gradient Accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-blue-500/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Header with Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
          {/* Verfügbare Sender */}
          <div className="bg-gradient-to-br from-brand-600 to-brand-500 rounded-2xl p-5 shadow-lg shadow-brand-500/30 transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="w-5 h-5 text-white/90" />
              <div className="text-xs text-white/80 font-semibold uppercase tracking-wide">Sender</div>
            </div>
            <div className="text-3xl font-black text-white mb-1">15.000+</div>
            <div className="text-xs text-white/70 font-medium">Verfügbar</div>
          </div>

          {/* Aktive Nutzer */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 shadow-lg shadow-green-500/30 transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-white/90" />
              <div className="text-xs text-white/80 font-semibold uppercase tracking-wide">Nutzer</div>
            </div>
            <div className="text-3xl font-black text-white mb-1">10.000+</div>
            <div className="text-xs text-white/70 font-medium">Aktiv</div>
          </div>
        </div>

        {/* Enhanced Progress Bars */}
        <div className="space-y-5 relative z-10">
          {/* HD Qualität */}
          <div className="group">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-brand-600" />
                </div>
                <span className="text-sm font-bold text-slate-700">HD Qualität</span>
              </div>
              <span className="text-lg font-black text-brand-600">100%</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div className="h-full w-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full relative overflow-hidden animate-[width_1.5s_ease-out]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
          
          {/* Uptime Garantie */}
          <div className="group">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-slate-700">Uptime Garantie</span>
              </div>
              <span className="text-lg font-black text-green-600">99,9%</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div className="h-full w-[99.9%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full relative overflow-hidden animate-[width_1.5s_ease-out_0.2s_both]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer animation-delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Rating Card - Enhanced */}
      <div className="absolute -bottom-6 -left-12 bg-white/95 backdrop-blur-md p-6 rounded-[1.5rem] shadow-2xl border border-white/60 animate-[float_4s_ease-in-out_infinite] hidden md:block hover:scale-110 transition-transform">
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B] drop-shadow-sm" />
          ))}
        </div>
        <div className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-1">5.0</div>
        <div className="text-xs text-slate-600 font-semibold">Kundenbewertung</div>
      </div>

      {/* Floating Status Card - Enhanced */}
      <div className="absolute -top-8 -right-8 bg-gradient-to-br from-green-500 to-emerald-600 p-5 rounded-2xl shadow-2xl border border-green-400/50 animate-[float_5s_ease-in-out_infinite_1s] hidden md:flex items-center gap-3 hover:scale-110 transition-transform">
        <div className="relative">
          <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-300 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-300 rounded-full"></div>
        </div>
        <div>
          <div className="text-sm font-black text-white">System Online</div>
          <div className="text-xs text-white/90 font-semibold">Alle Server aktiv</div>
        </div>
      </div>
    </div>
  );
}
