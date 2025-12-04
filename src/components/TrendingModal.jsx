import React, { useState, useEffect } from 'react';
import { Play, X, Star, Calendar } from 'lucide-react';

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

export default function TrendingModal({ trends, imageBaseUrl }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedMovie(null);
      setIsClosing(false);
      document.body.style.overflow = 'unset';
    }, 200);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedMovie) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedMovie]);

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
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
          <div 
            className={`absolute inset-0 bg-black/85 backdrop-blur-md transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            onClick={closeModal}
          />
          
          <div className={`relative w-full max-w-5xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100 animate-scale-in'}`}>
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/60 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/80 hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl group"
              aria-label="Schließen"
            >
              <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
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
                    className="group w-full py-4 px-6 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-center transition-all duration-200 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
                    Jetzt Ansehen
                  </a>
                  <button 
                    onClick={closeModal}
                    className="group w-full py-4 px-6 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-center transition-all duration-200 border border-slate-700/50 hover:border-slate-600 hover:shadow-lg"
                  >
                    <span className="inline-flex items-center gap-2">
                      Schließen
                      <X className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
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
