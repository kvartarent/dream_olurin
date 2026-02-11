import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InterpretationResult } from '../types';

interface Props {
  result: { interpretation: InterpretationResult; imageUrl: string } | null;
  dreamText: string;
}

export const ResultPage: React.FC<Props> = ({ result, dreamText }) => {
  const navigate = useNavigate();

  if (!result) return null;

  const { interpretation, imageUrl } = result;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Мой сон: ${interpretation.title}`,
          text: `ИИ расшифровал мой сон: ${interpretation.interpretation}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      alert('Функция "Поделиться" не поддерживается вашим браузером');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark pb-40">
      {/* Header */}
      <div className="fixed top-0 z-50 w-full flex items-center bg-background-dark/80 backdrop-blur-lg p-4 justify-between border-b border-white/5">
        <button onClick={() => navigate('/input')} className="text-white flex size-10 items-center justify-center">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-white text-[10px] font-bold tracking-[0.3em] uppercase flex-1 text-center">Анализ завершен</h2>
        <button onClick={() => navigate('/input')} className="flex size-10 items-center justify-center text-primary">
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </div>
      
      {/* Background Orbs */}
      <div className="fixed top-1/4 -left-20 size-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 -right-20 size-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <main className="flex flex-col flex-1 pt-24 px-6 relative z-10 max-w-xl mx-auto w-full">
        {/* Title Section */}
        <div className="text-center mb-10 animate-fadeIn">
          <h1 className="text-white tracking-tight text-3xl font-bold leading-tight mb-4">{interpretation.title}</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full shadow-[0_0_15px_rgba(140,43,238,0.8)]"></div>
        </div>
        
        {/* Central Illustration Area */}
        <div className="relative flex justify-center mb-14">
          <div className="relative size-64 md:size-80 shrink-0">
            {/* The main circular image */}
            <div className="w-full h-full rounded-full border-2 border-primary/40 p-1.5 shadow-[0_0_50px_rgba(140,43,238,0.3)] overflow-hidden bg-white/5">
              <img 
                src={imageUrl} 
                alt="Dream visualization" 
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop";
                }}
              />
            </div>
            
            {/* Improved Floating Tags Distribution */}
            {interpretation.tags.map((tag, idx) => {
              const positions = [
                  "-top-6 -left-4",     // Вверху слева
                  "top-12 -right-12",   // Справа посередине
                  "bottom-4 -left-12"   // Внизу слева
              ];
              return (
                  <div 
                    key={idx} 
                    className={`absolute ${positions[idx] || ""} glass-card rounded-full px-4 py-2 flex items-center gap-2 border-white/20 shadow-2xl z-20 animate-float`} 
                    style={{animationDelay: `${idx * 0.7}s`}}
                  >
                      <div className="magical-orb shrink-0"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/90 whitespace-nowrap max-w-[120px] overflow-hidden truncate">
                        {tag}
                      </span>
                  </div>
              );
            })}
          </div>
        </div>

        {/* Content Cards */}
        <div className="space-y-6 max-w-lg mx-auto w-full">
          <div className="glass-card rounded-[2rem] p-6 border-white/5 hover:bg-white/[0.05] transition-all duration-500">
            <div className="flex items-center gap-3 mb-4 opacity-60">
              <span className="material-symbols-outlined text-primary text-xl">description</span>
              <h3 className="text-white font-bold tracking-[0.2em] uppercase text-[9px]">Ваш сон</h3>
            </div>
            <p className="text-white/60 text-base leading-relaxed italic font-light">
              "{dreamText}"
            </p>
          </div>

          <div className="glass-card rounded-[2rem] p-6 border-primary/20 bg-primary/5 shadow-[inset_0_0_20px_rgba(140,43,238,0.05)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              <h3 className="text-white/40 font-bold tracking-[0.2em] uppercase text-[9px]">Толкование</h3>
            </div>
            <p className="text-white/95 text-lg font-light leading-relaxed">
              {interpretation.interpretation}
            </p>
          </div>
          
          <div className="glass-card rounded-[2rem] p-6 border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-xl">auto_fix_high</span>
              <h3 className="text-white/40 font-bold tracking-[0.2em] uppercase text-[9px]">Совет Вселенной</h3>
            </div>
            <p className="text-primary/90 text-base leading-relaxed italic border-l-2 border-primary/40 pl-4 font-medium">
              «{interpretation.advice}»
            </p>
          </div>
        </div>
      </main>

      {/* Fixed Footer Actions */}
      <div className="fixed bottom-0 left-0 w-full p-6 pb-10 bg-gradient-to-t from-background-dark via-background-dark/90 to-transparent z-[60]">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button 
            onClick={() => navigate('/diary')} 
            className="flex-[2] flex items-center justify-center gap-2 h-14 rounded-2xl bg-primary text-white font-bold shadow-[0_10px_30px_rgba(140,43,238,0.3)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">auto_stories</span>
            <span>В дневник</span>
          </button>
          <button 
            onClick={handleShare} 
            className="flex-1 flex items-center justify-center h-14 rounded-2xl glass-card text-white font-medium active:scale-95 transition-all hover:bg-white/10"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>
    </div>
  );
};