'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Settings, 
  BookOpen, 
  Menu, 
  Bookmark, 
  Maximize2, 
  Minimize2,
  Type,
  Sun,
  Moon,
  Coffee
} from 'lucide-react';
import { BookItem, BookChapter } from '@/types/library';

interface EBookReaderModalProps {
  book: BookItem | null;
  onClose: () => void;
}

export const EBookReaderModal: React.FC<EBookReaderModalProps> = ({ book, onClose }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('sepia');
  const [fontSize, setFontSize] = useState<number>(18);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fallback if book has no chapters
  const chapters: BookChapter[] = book?.chapters && book.chapters.length > 0
    ? book.chapters
    : [
        {
          id: 'ch-default',
          title: 'Bab Pembuka: Pengantar Bacaan',
          content: `${book?.synopsis || ''}\n\nSelamat membaca koleksi e-book digital ${book?.title || ''}. Diterbitkan oleh ${book?.publisher || ''} (${book?.year || ''}).\n\nBuku ini telah didigitalisasi secara resmi untuk platform Maktabah Ilmiah Hasbana. Setiap bab dirancang untuk memperkaya literasi dan memperluas cakrawala pemikiran keilmuan kritis.`
        }
      ];

  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  // Stop speech when closing or changing chapter
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeChapterIndex]);

  if (!book) return null;

  const toggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Fitur pembaca suara tidak didukung pada peramban ini.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentChapter.content);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return {
          wrapper: 'bg-zinc-950 text-zinc-100',
          header: 'bg-zinc-900 border-zinc-800 text-zinc-200',
          sidebar: 'bg-zinc-900 border-zinc-800 text-zinc-200',
          content: 'text-zinc-200',
          activeItem: 'bg-zinc-800 text-emerald-400 font-bold'
        };
      case 'sepia':
        return {
          wrapper: 'bg-[#f8f1e5] text-[#433422]',
          header: 'bg-[#ebdcc7] border-[#dfceb6] text-[#433422]',
          sidebar: 'bg-[#ebdcc7] border-[#dfceb6] text-[#433422]',
          content: 'text-[#382b1c]',
          activeItem: 'bg-[#dfceb6] text-[#2c2216] font-bold'
        };
      default:
        return {
          wrapper: 'bg-white text-slate-900',
          header: 'bg-slate-100 border-slate-200 text-slate-800',
          sidebar: 'bg-slate-50 border-slate-200 text-slate-800',
          content: 'text-slate-800',
          activeItem: 'bg-teal-50 text-teal-800 font-bold'
        };
    }
  };

  const themeClasses = getThemeClasses();
  const progressPercent = Math.round(((activeChapterIndex + 1) / chapters.length) * 100);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${themeClasses.wrapper} transition-colors duration-200`}>
      {/* Top Header Bar */}
      <header className={`px-4 py-2.5 border-b flex items-center justify-between ${themeClasses.header} select-none`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-black/10 transition-colors"
            title="Daftar Isi Bab"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-bold text-sm truncate max-w-xs sm:max-w-md">{book.title}</h1>
            <p className="text-[11px] opacity-75">{book.author} • {currentChapter.title}</p>
          </div>
        </div>

        {/* Reader Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Read Aloud Text to Speech */}
          <button
            onClick={toggleSpeech}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isSpeaking ? 'bg-emerald-600 text-white animate-pulse' : 'hover:bg-black/10'
            }`}
            title={isSpeaking ? 'Hentikan Pembacaan Suara' : 'Bacakan Teks Nyaring (Text to Speech)'}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden md:inline">{isSpeaking ? 'Berhenti' : 'Baca Nyaring'}</span>
          </button>

          {/* Theme Switcher */}
          <div className="flex items-center bg-black/10 rounded-lg p-0.5">
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded ${theme === 'light' ? 'bg-white text-black shadow-sm' : 'opacity-70'}`}
              title="Tema Terang"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`p-1.5 rounded ${theme === 'sepia' ? 'bg-[#ebdcc7] text-[#433422] shadow-sm font-bold' : 'opacity-70'}`}
              title="Tema Sepia / Hangat"
            >
              <Coffee className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded ${theme === 'dark' ? 'bg-zinc-800 text-white shadow-sm' : 'opacity-70'}`}
              title="Tema Malam"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Font Size controls */}
          <div className="hidden sm:flex items-center bg-black/10 rounded-lg px-2 py-1 gap-2 text-xs">
            <button
              onClick={() => setFontSize(Math.max(14, fontSize - 2))}
              className="font-bold px-1 hover:text-emerald-500"
              title="Perkecil Teks"
            >
              A-
            </button>
            <span className="text-[11px] font-mono">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(28, fontSize + 2))}
              className="font-bold px-1 hover:text-emerald-500"
              title="Perbesar Teks"
            >
              A+
            </button>
          </div>

          {/* Close Reader */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="p-1.5 rounded-lg hover:bg-rose-500 hover:text-white transition-colors ml-1"
            title="Tutup Reader"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Reading Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Table of Contents Drawer */}
        {sidebarOpen && (
          <aside className={`w-72 sm:w-80 border-r flex flex-col ${themeClasses.sidebar} z-20 absolute inset-y-0 left-0 shadow-2xl`}>
            <div className="p-4 border-b flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" /> Daftar Isi Bab ({chapters.length})
              </span>
              <button onClick={() => setSidebarOpen(false)} className="p-1 hover:opacity-75">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChapterIndex(idx);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg text-xs transition-colors ${
                    idx === activeChapterIndex ? themeClasses.activeItem : 'hover:bg-black/5 opacity-80'
                  }`}
                >
                  <p className="font-semibold">{ch.title}</p>
                  <p className="text-[10px] opacity-60 mt-0.5">Bab {idx + 1} dari {chapters.length}</p>
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Reader Book Content Canvas */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-10 flex justify-center">
          <div 
            className="max-w-2xl w-full mx-auto"
            style={{ 
              fontSize: `${fontSize}px`, 
              fontFamily: fontFamily === 'serif' ? 'Georgia, serif' : fontFamily === 'mono' ? 'monospace' : 'system-ui, sans-serif'
            }}
          >
            {/* Chapter Header */}
            <div className="mb-8 text-center pb-6 border-b border-black/10">
              <span className="text-xs uppercase tracking-widest opacity-60 block mb-1">
                Bab {activeChapterIndex + 1} dari {chapters.length}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                {currentChapter.title}
              </h2>
              <div className="w-12 h-0.5 bg-emerald-500 mx-auto rounded"></div>
            </div>

            {/* Chapter Body */}
            <div className={`leading-relaxed space-y-5 text-justify ${themeClasses.content}`}>
              {currentChapter.content.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="indent-6 sm:indent-8 first-of-type:indent-0">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Chapter Bottom Navigation */}
            <div className="mt-12 pt-8 border-t border-black/10 flex items-center justify-between">
              <button
                disabled={activeChapterIndex === 0}
                onClick={() => setActiveChapterIndex(Math.max(0, activeChapterIndex - 1))}
                className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 bg-black/5 hover:bg-black/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Bab Sebelumnya
              </button>

              <span className="text-xs opacity-60 font-mono">
                {activeChapterIndex + 1} / {chapters.length}
              </span>

              <button
                disabled={activeChapterIndex === chapters.length - 1}
                onClick={() => setActiveChapterIndex(Math.min(chapters.length - 1, activeChapterIndex + 1))}
                className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 bg-black/5 hover:bg-black/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                Bab Selanjutnya <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Reading Progress Bar */}
      <footer className={`px-4 py-1.5 border-t text-[11px] flex items-center justify-between ${themeClasses.header} select-none`}>
        <div className="flex items-center gap-2">
          <span>Progres: {progressPercent}%</span>
          <div className="w-32 bg-black/20 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        <div className="text-[10px] opacity-75">
          Gunakan panah atau tombol daftar isi untuk berpindah bab
        </div>
      </footer>
    </div>
  );
};
