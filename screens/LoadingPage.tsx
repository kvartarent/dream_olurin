
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 95 ? prev + 1 : prev));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-dark">
      <div className="flex items-center p-6 justify-between z-20">
        <button onClick={() => navigate('/input')} className="text-[#ad92c9] hover:text-white transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="text-[#ad92c9] text-xs font-medium tracking-widest uppercase">Глубокий анализ</div>
        <div className="w-6"></div>
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 mist-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
      </div>
      <div className="relative flex-grow flex flex-col items-center justify-center z-10 px-8">
        <div className="relative w-64 h-64 flex items-center justify-center mb-12">
          <div className="absolute inset-0 rounded-full moon-path"></div>
          <div className="absolute inset-0 flex items-start justify-center animate-orbit">
            <div className="bg-white rounded-full w-4 h-4 shadow-[0_0_20px_rgba(255,255,255,0.8)] -mt-2"></div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary text-5xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <div className="h-1 w-12 bg-primary/30 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
        <div className="text-center space-y-4 max-w-xs">
          <h1 className="text-white text-xl font-medium leading-tight">Проясняем ваш сон...</h1>
          <div className="flex flex-col gap-3">
            <p className="text-[#ad92c9] text-base font-normal leading-relaxed opacity-80">
              Соединяю символы, эмоции и подсознание...
            </p>
            <div className="flex flex-col gap-2 mt-4 px-4">
              <div className="rounded-full bg-[#362348] h-1 w-full overflow-hidden">
                <div className="h-1 rounded-full bg-primary glow-effect transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-[#ad92c9] uppercase tracking-widest">Обработка образов</span>
                <span className="text-[10px] text-[#ad92c9] uppercase tracking-widest">{progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-20 p-8 flex flex-col items-center mb-12">
        <div className="flex items-center gap-2 text-[#ad92c9]/60 text-xs">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          <span>Ваши данные подсознания зашифрованы</span>
        </div>
        <div className="mt-8 h-1 w-32 rounded-full bg-white/10"></div>
      </div>
    </div>
  );
};
