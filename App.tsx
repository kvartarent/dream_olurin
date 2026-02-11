
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { HomePage } from './screens/HomePage';
import { InputPage } from './screens/InputPage';
import { LoadingPage } from './screens/LoadingPage';
import { ResultPage } from './screens/ResultPage';
import { ErrorPage } from './screens/ErrorPage';
import { DiaryPage } from './screens/DiaryPage';
import { AboutPage } from './screens/AboutPage';
import { EntryDetailPage } from './screens/EntryDetailPage';
import { DreamEntry, InterpretationResult } from './types';
import { interpretDream, generateDreamImage } from './services/geminiService';

const AppContent: React.FC = () => {
  const [currentDreamText, setCurrentDreamText] = useState("");
  const [latestResult, setLatestResult] = useState<{ interpretation: InterpretationResult; imageUrl: string } | null>(null);
  const [diary, setDiary] = useState<DreamEntry[]>([]);
  const navigate = useNavigate();

  // Load diary from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('spin_diary_v1');
    if (saved) {
      setDiary(JSON.parse(saved));
    } else {
      // Migrate from old brand if exists
      const oldSaved = localStorage.getItem('void_diary_v2');
      if (oldSaved) {
        setDiary(JSON.parse(oldSaved));
        localStorage.setItem('spin_diary_v1', oldSaved);
      }
    }
  }, []);

  const saveDiary = (newDiary: DreamEntry[]) => {
    setDiary(newDiary);
    localStorage.setItem('spin_diary_v1', JSON.stringify(newDiary));
  };

  const handleStartAnalysis = async (text: string) => {
    setCurrentDreamText(text);
    navigate('/loading');
    
    try {
      const interpretation = await interpretDream(text);
      const imageUrl = await generateDreamImage(text, interpretation.mood);

      setLatestResult({ interpretation, imageUrl });

      const newEntry: DreamEntry = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toLocaleString('ru-RU', { 
            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
        }).toUpperCase(),
        rawText: text,
        title: interpretation.title,
        interpretation: interpretation.interpretation,
        advice: interpretation.advice,
        tags: interpretation.tags,
        imageUrl: imageUrl,
        mood: interpretation.mood
      };

      saveDiary([newEntry, ...diary]);
      navigate('/result');
    } catch (err) {
      console.error(err);
      navigate('/error');
    }
  };

  const handleDeleteEntry = (id: string) => {
    const updated = diary.filter(d => d.id !== id);
    saveDiary(updated);
  };

  const handleClearDiary = () => {
    saveDiary([]);
  };

  return (
    <div className="bg-background-dark min-h-screen flex justify-center overflow-x-hidden">
      <div className="w-full max-w-xl relative min-h-screen bg-background-dark shadow-2xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/input" element={<InputPage onInterpret={handleStartAnalysis} />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/result" element={<ResultPage result={latestResult} dreamText={currentDreamText} />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/diary" element={<DiaryPage dreams={diary} onClear={handleClearDiary} onDelete={handleDeleteEntry} />} />
          <Route path="/diary/:id" element={<EntryDetailPage dreams={diary} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
