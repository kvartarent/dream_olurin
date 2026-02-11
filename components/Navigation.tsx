
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/5 pb-8 pt-3 px-6">
      <div className="flex justify-around items-center max-w-xl mx-auto relative">
        <Link to="/" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-primary' : 'text-white/40'}`}>
          <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: isActive('/') ? "'FILL' 1" : "" }}>home</span>
          <span className="text-[10px] font-medium uppercase tracking-wider">Главная</span>
        </Link>
        <Link to="/input" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/input') || isActive('/loading') || isActive('/result') || isActive('/error') ? 'text-primary' : 'text-white/40'}`}>
          <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: isActive('/input') ? "'FILL' 1" : "" }}>auto_awesome</span>
          <span className="text-[10px] font-medium uppercase tracking-wider">Толковать</span>
        </Link>
        <Link to="/diary" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/diary') ? 'text-primary' : 'text-white/40'}`}>
          <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: isActive('/diary') ? "'FILL' 1" : "" }}>menu_book</span>
          <span className="text-[10px] font-medium uppercase tracking-wider">Журнал</span>
        </Link>
        <Link to="/about" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/about') ? 'text-primary' : 'text-white/40'}`}>
          <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: isActive('/about') ? "'FILL' 1" : "" }}>info</span>
          <span className="text-[10px] font-medium uppercase tracking-wider">Инфо</span>
        </Link>
      </div>
    </nav>
  );
};
