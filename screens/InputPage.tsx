
import React, { useState } from 'react';
import { Stars } from '../components/Stars';
import { Navigation } from '../components/Navigation';

interface Props {
  onInterpret: (text: string) => void;
}

export const InputPage: React.FC<Props> = ({ onInterpret }) => {
  const [text, setText] = useState("");

  const handleInterpret = () => {
    if (text.trim()) {
      onInterpret(text);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col deep-space-gradient overflow-hidden">
      <Stars count={15} />
      
      {/* Header Area */}
      <div className="flex items-center p-6 justify-between z-10 shrink-0">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full glass-morphism">
          <span className="material-symbols-outlined text-white/70">auto_awesome</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col px-6 relative z-10 overflow-hidden">
        <div className="text-center space-y-2 mb-6 shrink-0">
          <h1 className="text-white text-2xl font-light tracking-tight">Что вам приснилось?</h1>
          <p className="text-white/40 text-xs uppercase tracking-widest">Опишите ваше путешествие</p>
        </div>

        {/* Textarea Container - Ограничено по высоте (40% экрана) */}
        <div className="h-[40vh] min-h-[200px] flex flex-col group mb-6 shrink-0">
          <div className="glass-input rounded-[2rem] flex-1 p-6 transition-all duration-500 group-focus-within:border-primary/30 group-focus-within:bg-white/5 flex flex-col overflow-hidden">
            <textarea 
              className="w-full h-full bg-transparent border-none focus:ring-0 text-base leading-relaxed placeholder:text-white/30 text-white/90 resize-none p-0 no-scrollbar font-sans" 
              placeholder="Расскажи о своем сне как можно подробнее..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
        </div>
        
        {/* Action Button Area */}
        <div className="flex flex-col items-center shrink-0 mb-32">
          <button 
            disabled={!text.trim()}
            onClick={handleInterpret}
            className={`px-10 py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 group w-full max-w-[280px] h-14 ${
              text.trim() ? 'bg-primary shadow-[0_10px_30px_rgba(140,43,238,0.4)]' : 'bg-white/10 opacity-50 cursor-not-allowed'
            }`}
          >
            <span className="text-base font-bold tracking-widest uppercase text-white">✨ Толковать</span>
          </button>
          <p className="text-[10px] text-white/20 mt-4 uppercase tracking-[0.2em]">Мистический анализ через ИИ</p>
        </div>
      </div>

      <Navigation />
    </div>
  );
};
