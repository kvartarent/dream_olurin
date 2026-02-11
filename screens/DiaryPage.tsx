
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stars } from '../components/Stars';
import { Navigation } from '../components/Navigation';
import { DreamEntry } from '../types';

interface Props {
  dreams: DreamEntry[];
  onClear: () => void;
  onDelete?: (id: string) => void;
}

export const DiaryPage: React.FC<Props> = ({ dreams, onClear, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-dark font-display text-white min-h-screen antialiased overflow-x-hidden pb-32">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(140,43,238,0.15)_0%,rgba(10,10,12,0)_80%)] pointer-events-none"></div>
      <Stars count={10} />
      <header className="sticky top-0 z-50 bg-background-dark/40 backdrop-blur-md px-6 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Дневник</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">Архив ваших видений</p>
          </div>
          {dreams.length > 0 && (
            <button 
              onClick={() => { if(confirm('Очистить весь дневник?')) onClear(); }}
              className="text-[10px] uppercase tracking-widest text-primary font-bold opacity-60 hover:opacity-100"
            >
              Очистить
            </button>
          )}
        </div>
      </header>
      <main className="px-6 relative z-10">
        {dreams.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-32 text-center">
             <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl text-primary/60">bedtime_off</span>
             </div>
             <p className="text-xl font-light text-white/80">Пока здесь пусто</p>
             <p className="text-sm text-white/40 mt-2 max-w-[200px]">Ваши сны ждут, когда их расшифруют.</p>
             <button onClick={() => navigate('/input')} className="mt-8 bg-primary/20 text-primary border border-primary/40 px-8 py-3 rounded-full font-bold hover:bg-primary/30 transition-all">
                Записать первый сон
             </button>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em]">Последние записи ({dreams.length})</h3>
            </div>
            {dreams.map(dream => (
              <div 
                key={dream.id} 
                className="group relative bg-white/[0.03] rounded-2xl border border-white/5 p-5 transition-all active:scale-[0.99] hover:bg-white/[0.06] flex flex-col"
              >
                <div className="flex items-center justify-between mb-3" onClick={() => navigate(`/diary/${dream.id}`)}>
                  <span className="text-primary/70 text-[10px] font-bold tracking-wider uppercase">{dream.date}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white/90 font-bold text-sm line-clamp-1">{dream.title}</span>
                    {onDelete && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); if(confirm('Удалить эту запись?')) onDelete(dream.id); }}
                        className="text-white/20 hover:text-red-400 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    )}
                  </div>
                </div>
                <div onClick={() => navigate(`/diary/${dream.id}`)} className="cursor-pointer">
                  <div className="mb-4">
                    <p className="text-white/60 text-sm leading-relaxed italic line-clamp-2">{dream.rawText}</p>
                  </div>
                  <div className="pt-4 border-t border-white/[0.05] flex items-center gap-3 overflow-x-auto no-scrollbar">
                    {dream.tags.map(tag => (
                      <div key={tag} className="whitespace-nowrap flex items-center gap-1.5 text-white/40 text-[9px] font-bold uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <div className="fixed bottom-32 right-8 z-[60]">
        <button onClick={() => navigate('/input')} className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(140,43,238,0.5)] active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-3xl font-light">add</span>
        </button>
      </div>
      <Navigation />
    </div>
  );
};
