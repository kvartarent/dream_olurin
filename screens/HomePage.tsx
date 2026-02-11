
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stars } from '../components/Stars';
import { Navigation } from '../components/Navigation';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col h-screen w-full max-w-xl mx-auto overflow-hidden bg-gradient-to-b from-deep-purple to-background-dark">
      {/* Dynamic Background Container */}
      <div className="relative h-[65%] w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Mystical crescent moon and nebula" 
            className="absolute inset-0 w-full h-full object-cover opacity-90 animate-slowZoom" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3_XEOtCZ50GGvXxR8yIEkNyMfG8eDIu8wIeL7IMsFH4gwOAy7QJObjBNkpV8a9BkiZMziU_UsVrMfN_fSJXg2xBR4-XALOxMKzDS7yVrZ0wtnGsPJ_283ppgRBeonhJvwsKOkAM3imOtthJ4jrXhikIATO5j9mUsj8qFyaawZOk4weSXMMUVTgHF-kvhGUol7NcQ-pOkBKz3dtkFr3bDIbg1Qeh25_HEb3saJKWTTt4xNplVUD_eBvDNUOi4QaLLQ_hvskyeKrMs"
          />
        </div>

        {/* Abstract Floating Energy Orbs */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
           <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-primary/20 rounded-full blur-[60px] animate-wander opacity-60" style={{ animationDelay: '-2s' }}></div>
           <div className="absolute bottom-[30%] right-[15%] w-48 h-48 bg-lavender-glow/10 rounded-full blur-[80px] animate-wander opacity-40" style={{ animationDuration: '30s', animationDelay: '-5s' }}></div>
           <div className="absolute top-[40%] right-[5%] w-24 h-24 bg-primary/30 rounded-full blur-[50px] animate-wander opacity-50" style={{ animationDuration: '20s', animationDelay: '-10s' }}></div>
        </div>

        <div className="absolute inset-0 mystical-gradient-overlay z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-primary/5 animate-shimmer z-25 pointer-events-none"></div>
        
        <Stars count={25} />
      </div>
      
      {/* Content Area */}
      <div className="relative z-30 flex flex-col items-center px-8 -mt-20 flex-grow">
        <h1 className="font-serif text-4xl md:text-5xl font-normal italic tracking-tight text-white mb-4 text-center leading-tight">Мир твоих снов</h1>
        <p className="text-[#ad92c9] text-center text-[15px] md:text-lg leading-relaxed max-w-[320px] font-light opacity-90 mb-10">
          Открой тайны своего подсознания через мудрость поколений и мощь интеллекта.
        </p>
        
        <div className="w-full flex justify-center mb-12">
          <button onClick={() => navigate('/input')} className="capsule-action-button active:scale-[0.98] group">
            <span className="text-xl mr-3 filter drop-shadow-[0_0_8px_rgba(183,148,244,0.6)]">✨</span>
            <span className="text-[14px] font-semibold tracking-[0.1em] uppercase text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">Толковать сон</span>
          </button>
        </div>
      </div>
      <Navigation />
    </div>
  );
};
