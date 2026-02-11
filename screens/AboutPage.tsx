
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stars } from '../components/Stars';
import { Navigation } from '../components/Navigation';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background-dark font-display text-white min-h-screen flex flex-col pb-24 overflow-x-hidden relative">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between max-w-xl mx-auto">
          <button onClick={() => navigate(-1)} className="text-white flex size-12 shrink-0 items-center justify-center cursor-pointer">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">О приложении</h2>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto pt-20 pb-10 relative overflow-x-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(140,43,238,0.15)_0%,transparent_40%)] pointer-events-none"></div>
        <Stars count={8} />
        <div className="max-w-xl mx-auto px-6 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-6 flex items-center justify-center filter drop-shadow-[0_0_12px_rgba(140,43,238,0.8)]">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="relative text-white flex items-center justify-center">
              <span className="material-symbols-outlined !text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>bedtime_off</span>
              <span className="material-symbols-outlined absolute !text-[32px] text-white/90" style={{ top: '35%', fontVariationSettings: "'FILL' 1" }}>visibility</span>
            </div>
          </div>
          <div className="glass-card w-full rounded-xl p-6 mb-8 text-center bg-white/5 backdrop-blur-xl border border-white/10">
            <h2 className="text-white tracking-light text-[28px] font-bold leading-tight pb-4">О проекте</h2>
            <p className="text-white/80 text-base md:text-lg font-normal leading-relaxed pb-6 text-center">
              Наше приложение — это уникальный сплав передовых технологий искусственного интеллекта и глубинной психологии. Мы создали этот инструмент, чтобы помочь вам приоткрыть завесу тайны вашего подсознания и найти истинный смысл в мире ночных видений.
            </p>
            <div className="w-full h-[1px] bg-white/10 mb-6"></div>
            <div className="text-left space-y-5 max-w-md mx-auto">
              <h3 className="text-white text-lg font-bold leading-tight tracking-tight mb-4">Наша миссия</h3>
              <div className="flex items-center gap-4 group">
                <div className="bg-primary size-10 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(140,43,238,0.5)]">
                  <span className="material-symbols-outlined text-white text-xl">self_improvement</span>
                </div>
                <p className="text-white/90 font-medium">Помочь вам лучше понять себя</p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="bg-primary size-10 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(140,43,238,0.5)]">
                  <span className="material-symbols-outlined text-white text-xl">auto_awesome</span>
                </div>
                <p className="text-white/90 font-medium">Исследовать магический мир снов</p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="bg-primary size-10 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(140,43,238,0.5)]">
                  <span className="material-symbols-outlined text-white text-xl">psychology</span>
                </div>
                <p className="text-white/90 font-medium">Трансформировать страхи в силу</p>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-white/5">
              <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Версия 1.0.0</p>
            </div>
          </div>
        </div>
      </main>
      <Navigation />
    </div>
  );
};
