import React from 'react';
import { Shield, Zap, Monitor, CheckCircle2, Star } from 'lucide-react';

export default function HeroStats() {
  return (
    <div className="relative">
      {/* Main Stats Card */}
      <div className="relative bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 max-w-lg mx-auto transform hover:scale-[1.02] transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-medium mb-0.5">Verfügbare Sender</div>
              <div className="text-2xl font-bold text-slate-900">15.000+</div>
            </div>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-100 flex flex-col items-end">
            <span className="text-xs text-green-600 font-bold uppercase tracking-wider mb-0.5">Aktive Nutzer</span>
            <span className="text-lg font-bold text-green-700">10.000+</span>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-700">HD Qualität</span>
              <span className="text-brand-600">100%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-full bg-brand-600 rounded-full animate-[width_1.5s_ease-out]"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-700">Uptime Garantie</span>
              <span className="text-green-500">99,9%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-[99.9%] bg-green-500 rounded-full animate-[width_1.5s_ease-out_0.2s_both]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Rating Card */}
      <div className="absolute -bottom-6 -left-12 bg-white p-6 rounded-[1.5rem] shadow-xl border border-slate-100 animate-[float_4s_ease-in-out_infinite] hidden md:block">
        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
          ))}
        </div>
        <div className="text-3xl font-bold text-slate-900 mb-1">5.0</div>
        <div className="text-xs text-slate-500 font-medium">Durchschnittliche Bewertung</div>
      </div>

      {/* Floating Status Card */}
      <div className="absolute -top-8 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-[float_5s_ease-in-out_infinite_1s] hidden md:flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900">System Online</div>
          <div className="text-xs text-green-600 font-medium">Alle Server aktiv</div>
        </div>
      </div>
    </div>
  );
}
