import React, { useState } from 'react';
import { Play, X, Star, Calendar } from 'lucide-react';

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

export default function TrendingModal({ trends, imageBaseUrl }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {trends.map((item) => (
          <div 
            key={item.id}
            onClick={() => handleMovieClick(item)}
            className="group relative aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/20 hover:-translate-y-2"
          >
            <img 
              src={`${imageBaseUrl}${item.poster_path}`} 
              alt={item.title || item.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Content Overlay */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-brand-600 text-white text-xs font-bold flex items-center gap-1">
                    <Play className="w-3 h-3 fill-current" />
                    Verfügbar
                  </span>
                  <span className="text-yellow-400 text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {item.vote_average.toFixed(1)}
                  </span>
                </div>
                <h3 className="text-white font-bold leading-tight mb-2 line-clamp-2">
                  {item.title || item.name}
                </h3>
                <button className="w-full py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white hover:text-slate-900 transition-colors">
                  Mehr Infos
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          />
          
          <div className="relative w-full max-w-5xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col md:flex-row animate-fade-in-up max-h-[90vh] overflow-y-auto md:overflow-hidden">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Backdrop / Trailer Area */}
            <div className="relative w-full md:w-7/12 h-64 md:h-auto">
              <img 
                src={`${BACKDROP_BASE_URL}${selectedMovie.backdrop_path}`} 
                alt={selectedMovie.title || selectedMovie.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent" />
            </div>

            {/* Content Area */}
            <div className="w-full md:w-5/12 p-8 md:p-10 flex flex-col justify-center bg-slate-900">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-bold tracking-wide uppercase">
                    {selectedMovie.media_type === 'tv' ? 'Serie' : 'Film'}
                  </span>
                  {selectedMovie.release_date && (
                    <span className="flex items-center gap-1 text-slate-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {selectedMovie.release_date.split('-')[0]}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    {selectedMovie.vote_average.toFixed(1)}
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                  {selectedMovie.title || selectedMovie.name}
                </h3>
                
                <p className="text-slate-300 leading-relaxed mb-8 line-clamp-6">
                  {selectedMovie.overview}
                </p>
                
                <div className="flex flex-col gap-3">
                  <a 
                    href="#pricing" 
                    onClick={closeModal}
                    className="w-full py-4 px-6 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-center transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    Jetzt Ansehen
                  </a>
                  <button 
                    onClick={closeModal}
                    className="w-full py-4 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-center transition-colors"
                  >
                    Schließen
                  </button>
                </div>
                
                <p className="mt-6 text-center text-xs text-slate-500">
                  Sofort verfügbar im Premium Paket
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
