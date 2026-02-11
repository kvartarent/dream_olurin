
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-background-dark font-display text-white min-h-screen flex flex-col">
      <nav className="flex items-center px-4 py-3 justify-between sticky top-0 z-10 bg-background-dark/80 backdrop-blur-md">
        <button onClick={() => navigate('/input')} className="flex size-10 items-center justify-center cursor-pointer">
          <span className="material-symbols-outlined text-white/70">arrow_back_ios</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Доступ ограничен</h2>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-8 py-12 deep-space-gradient">
        <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <span className="material-symbols-outlined text-8xl text-primary/40">vpn_lock</span>
        </div>

        <div className="flex max-w-[400px] flex-col items-center gap-6 text-center">
          <h1 className="text-white text-2xl font-bold tracking-tight">Нужен мост в облака</h1>
          
          <div className="space-y-4">
            <p className="text-white/70 text-base leading-relaxed">
              Google API временно ограничил доступ для вашего региона. Сны не могут быть расшифрованы напрямую.
            </p>
            
            <div className="glass-card p-4 rounded-2xl border-white/10 bg-white/5">
              <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-3">Варианты решения:</p>
              <div className="text-left space-y-4">
                <div className="flex gap-3">
                  <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-primary text-xs font-bold">1</span>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed">Включите <b>VPN</b> и попробуйте снова — это самый простой путь.</p>
                </div>
                <div className="flex gap-3">
                  <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-primary text-xs font-bold">2</span>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed">Настройте <b>Proxy-сервер</b> в коде приложения для стабильной работы 24/7 без ВПН.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-10 w-full max-w-xs">
          <button 
            onClick={() => navigate('/input')} 
            className="w-full cursor-pointer items-center justify-center rounded-xl h-14 px-6 bg-primary text-white font-bold text-lg shadow-lg active:scale-95 transition-all flex gap-2"
          >
            <span className="material-symbols-outlined">refresh</span>
            <span>Я включил VPN</span>
          </button>
        </div>
      </main>
      <Navigation />
    </div>
  );
};
