import React, { useState } from 'react';
import { Check, Star, Wifi, Zap, Activity, Headphones, Tv } from 'lucide-react';

const featuresList = [
  { icon: Zap, text: "Sofortige Freischaltung" },
  { icon: Wifi, text: "KI-optimierte Streaming-Routen" },
  { icon: Activity, text: "Blitzschnelles Umschalten" },
  { icon: Headphones, text: "24/7 Premium-Support" },
  { icon: Tv, text: "SD, HD, FHD & UHD" }
];

const packages = {
  1: {
    id: 1,
    title: "1 Verbindung",
    subtitle: "Starter",
    description: "Perfekt für Singles oder das Zweitgerät",
    icon: Tv,
    plans: [
      { 
        duration: "1 Monat", 
        price: "24.99€", 
        perMonth: "24.99€/Monat", 
        savings: null, 
        bestseller: false,
        popular: false 
      },
      { 
        duration: "3 Monate", 
        price: "56.99€", 
        perMonth: "19.00€/Monat", 
        savings: "Spare 24%", 
        bestseller: false,
        popular: false 
      },
      { 
        duration: "12 Monate", 
        price: "149.99€", 
        perMonth: "12.50€/Monat", 
        savings: "Spare 50%", 
        bestseller: true,
        popular: true 
      },
      { 
        duration: "24 Monate", 
        price: "249.99€", 
        perMonth: "10.42€/Monat", 
        savings: "Spare 58%", 
        bestseller: false,
        popular: false 
      }
    ]
  },
  2: {
    id: 2,
    title: "2 Verbindungen",
    subtitle: "Partner",
    description: "Ideal für Paare und kleine Haushalte",
    icon: Wifi,
    plans: [
      { 
        duration: "1 Monat", 
        price: "44.99€", 
        perMonth: "44.99€/Monat", 
        savings: null, 
        bestseller: false,
        popular: false 
      },
      { 
        duration: "3 Monate", 
        price: "99.99€", 
        perMonth: "33.33€/Monat", 
        savings: "Spare 26%", 
        bestseller: false,
        popular: false 
      },
      { 
        duration: "12 Monate", 
        price: "249.99€", 
        perMonth: "20.83€/Monat", 
        savings: "Spare 53%", 
        bestseller: true,
        popular: true 
      },
      { 
        duration: "24 Monate", 
        price: "411.99€", 
        perMonth: "17.17€/Monat", 
        savings: "Spare 61%", 
        bestseller: false,
        popular: false 
      }
    ]
  },
  3: {
    id: 3,
    title: "3 Verbindungen",
    subtitle: "Family",
    description: "Für die ganze Familie",
    icon: Activity,
    plans: [
      { 
        duration: "1 Monat", 
        price: "64.99€", 
        perMonth: "64.99€/Monat", 
        savings: null, 
        bestseller: false,
        popular: false 
      },
      { 
        duration: "3 Monate", 
        price: "142.99€", 
        perMonth: "47.66€/Monat", 
        savings: "Spare 27%", 
        bestseller: false,
        popular: false 
      },
      { 
        duration: "12 Monate", 
        price: "349.99€", 
        perMonth: "29.17€/Monat", 
        savings: "Spare 55%", 
        bestseller: true,
        popular: true 
      },
      { 
        duration: "24 Monate", 
        price: "566.99€", 
        perMonth: "23.62€/Monat", 
        savings: "Spare 63%", 
        bestseller: false,
        popular: false 
      }
    ]
  },
  5: {
    id: 5,
    title: "5 Verbindungen",
    subtitle: "Ultimate",
    description: "Maximum Power für WGs und Großfamilien",
    icon: Star,
    plans: [
      { 
        duration: "3 Monate", 
        price: "229.99€", 
        perMonth: "76.66€/Monat", 
        savings: null, 
        bestseller: false,
        popular: false 
      },
      { 
        duration: "12 Monate", 
        price: "549.99€", 
        perMonth: "45.83€/Monat", 
        savings: "Spare 40%", 
        bestseller: true,
        popular: true 
      },
      { 
        duration: "24 Monate", 
        price: "879.99€", 
        perMonth: "36.67€/Monat", 
        savings: "Spare 52%", 
        bestseller: false,
        popular: false 
      }
    ]
  }
};

export default function PricingTable() {
  const [connections, setConnections] = useState(1);

  return (
    <div className="w-full mx-auto">
      {/* Connection Tabs */}
      <div className="flex flex-col items-center mb-12">
        <div className="bg-white p-1.5 rounded-full shadow-sm border border-slate-200 inline-flex flex-wrap justify-center gap-1 mb-6">
          {Object.values(packages).map((pkg) => {
            const Icon = pkg.icon;
            const isActive = connections === pkg.id;
            return (
              <button
                key={pkg.id}
                onClick={() => setConnections(pkg.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md transform scale-[1.02]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-brand-300' : 'text-slate-400'}`} />
                <span className="hidden sm:inline">{pkg.title}</span>
                <span className="sm:hidden">{pkg.id} Verb.</span>
              </button>
            );
          })}
        </div>

        <div className="text-center max-w-2xl mx-auto animate-fade-in">
          <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">
            {packages[connections].title}
          </h3>
          <p className="text-slate-600">
            {packages[connections].description}
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        {packages[connections].plans.map((plan, index) => (
          <div 
            key={index}
            className={`relative flex flex-col bg-white rounded-[1.5rem] transition-all duration-300 ${
              plan.popular 
                ? 'border-2 border-blue-600 shadow-2xl scale-105 z-10 pb-2 overflow-hidden' 
                : 'border border-slate-200 shadow-lg hover:shadow-xl'
            }`}
          >
            {plan.popular && (
              <div className="bg-[#F97316] text-white text-center py-2 font-bold text-xs tracking-wider flex items-center justify-center gap-2 mb-2">
                <Star className="w-3 h-3 fill-current" />
                MEIST GEWÄHLT
                <Star className="w-3 h-3 fill-current" />
              </div>
            )}
            
            <div className={`p-6 ${!plan.popular ? 'pt-8' : ''}`}>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{plan.duration}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
                {plan.savings && (
                  <span className="bg-[#22C55E] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {plan.savings}
                  </span>
                )}
                {plan.bestseller && (
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-current" />
                    Bestseller
                  </span>
                )}
              </div>
              
              <div className="mb-1">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
              </div>
              <div className="text-slate-400 text-sm font-medium mb-4">
                 {plan.perMonth}
              </div>

              <div className="inline-block border border-[#22C55E] text-[#22C55E] text-[11px] font-bold px-3 py-1 rounded-full mb-8">
                Einmalzahlung • Kein Abo
              </div>

              <ul className="space-y-4 mb-8">
                {featuresList.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <div className={`mt-0.5 p-1 rounded-full ${plan.popular ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                        <feature.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={`/redirect?connections=${connections}`}
                className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  plan.popular
                    ? 'bg-[#2563EB] text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20'
                }`}
              >
                Jetzt bestellen
                <Zap className="w-5 h-5 fill-current" />
              </a>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-[#22C55E]">
                <Check className="w-3.5 h-3.5" />
                Sofortiger Zugang
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
