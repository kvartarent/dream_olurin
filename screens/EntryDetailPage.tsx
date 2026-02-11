import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DreamEntry } from '../types';

interface Props {
  dreams: DreamEntry[];
}

export const EntryDetailPage: React.FC<Props> = ({ dreams }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const dream = dreams.find(d => d.id === id);

  if (!dream) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background-dark p-6 text-center">
        <h1 className="text-white text-xl mb-4 font-light">Сновидение растворилось...</h1>
        <button onClick={() => navigate('/diary')} className="text-primary border border-primary/40 px-8 py-3 rounded-full font-bold">Назад к истокам</button>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark pb-40">
      {/* Header */}
      <div className="fixed top-0 z-50 w-full flex items-center bg-background-dark/80 backdrop-blur-lg p-4 justify-between border-b border-white/5">
        <button onClick={() => navigate('/diary')} className="text-white flex size-10 items-center justify-center">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-white text-[10px] font-bold tracking-[0.3em] uppercase flex-1 text-center">Архивная запись</h2>
        <div className="w-10"></div>
      </div>
      
      {/* Background Orbs */}
      <div className="fixed top-1/4 -left-20 size-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 -right-20 size-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <main className="flex flex-col flex-1 pt-24 px-6 relative z-10 max-w-xl mx-auto w-full">
        <div className="text-center mb-8 animate-fadeIn">
          <p className="text-primary/70 text-[10px] font-bold tracking-[0.3em] uppercase mb-3">{dream.date}</p>
          <h1 className="text-white tracking-tight text-3xl font-bold leading-tight mb-4 px-2">{dream.title}</h1>
          <div className="h-1 w-12 bg-primary/40 mx-auto rounded-full"></div>
        </div>
        
        {/* Central Image Container with Improved Tag Positions */}
        <div className="relative flex justify-center mb-14">
          <div className="relative size-64 md:size-80 shrink-0">
            <div className="w-full h-full rounded-full border-2 border-primary/20 p-1.5 shadow-[0_0_40px_rgba(140,43,238,0.15)] overflow-hidden bg-white/5">
              <img 
                src={dream.imageUrl || "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop"} 
                alt="Dream visualization" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            
            {dream.tags.map((tag, idx) => {
              const positions = [
                  "-top-6 -left-4",     // Вверху слева
                  "top-12 -right-12",   // Справа посередине
                  "bottom-4 -right-4"   // Внизу справа
              ];
              return (
                  <div key={idx} className={`absolute ${positions[idx] || ""} glass-card rounded-full px-4 py-2 flex items-center gap-2 border-white/10 shadow-2xl z-20 animate-float`} style={{animationDelay: `${idx * 0.5}s`}}>
                      <div className="magical-orb shrink-0"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 whitespace-nowrap max-w-[110px] overflow-hidden truncate">
                        {tag}
                      </span>
                  </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6 max-w-lg mx-auto w-full">
          <div className="glass-card rounded-[2rem] p-6 border-white/5">
            <div className="flex items-center gap-3 mb-4 opacity-40">
              <span className="material-symbols-outlined text-primary text-xl">description</span>
              <h3 className="text-white font-bold tracking-[0.2em] uppercase text-[9px]">Описание</h3>
            </div>
            <p className="text-white/60 text-base leading-relaxed italic">
              "{dream.rawText}"
            </p>
          </div>

          <div className="glass-card rounded-[2rem] p-6 border-primary/10 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-xl">psychology</span>
              <h3 className="text-white/40 font-bold tracking-[0.2em] uppercase text-[9px]">Толкование</h3>
            </div>
            <p className="text-white/90 text-lg font-light leading-relaxed">
              {dream.interpretation}
            </p>
          </div>
          
          <div className="glass-card rounded-[2rem] p-6 border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-xl">auto_fix_high</span>
              <h3 className="text-white/40 font-bold tracking-[0.2em] uppercase text-[9px]">Совет</h3>
            </div>
            <p className="text-white/70 text-base leading-relaxed italic border-l-2 border-primary/20 pl-4 font-light">
              «{dream.advice}»
            </p>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-6 pb-10 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-[60]">
        <button 
          onClick={() => navigate('/diary')} 
          className="w-full max-w-lg mx-auto flex items-center justify-center gap-3 h-14 rounded-2xl glass-card text-white/80 border-white/10 font-bold active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span>К списку снов</span>
        </button>
      </div>
    </div>
  );
};