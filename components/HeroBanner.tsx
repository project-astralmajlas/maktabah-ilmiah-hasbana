'use client';

import React from 'react';
import { 
  BookOpen, 
  Headphones, 
  Bookmark, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  TrendingUp, 
  BellRing,
  ArrowRight
} from 'lucide-react';
import { Announcement, BookFormat } from '@/types/library';

interface HeroBannerProps {
  announcements: Announcement[];
  selectedFormat: BookFormat | 'all';
  setSelectedFormat: (f: BookFormat | 'all') => void;
  totalBooksCount: number;
  totalModulesCount: number;
  onExploreModules: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  announcements,
  selectedFormat,
  setSelectedFormat,
  totalBooksCount,
  totalModulesCount,
  onExploreModules
}) => {
  const pinnedAnnouncement = announcements.find(a => a.pinned) || announcements[0];

  return (
    <div className="bg-gradient-to-b from-[#0c2f35] to-[#123e46] text-white pt-6 pb-10 px-4 sm:px-6 relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Pinned announcement strip */}
        {pinnedAnnouncement && (
          <div className="mb-6 inline-flex items-center gap-2.5 bg-[#092429]/90 border border-teal-500/30 text-teal-200 text-xs px-3.5 py-1.5 rounded-full shadow-sm hover:border-teal-400/50 transition-colors">
            <span className="flex items-center gap-1 text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
              <BellRing className="w-3 h-3 animate-bounce" /> Warta Perpustakaan
            </span>
            <span className="hidden sm:inline text-teal-400">•</span>
            <span className="truncate max-w-md text-slate-200">{pinnedAnnouncement.title}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5" />
              Sistem Otomasi Perpustakaan Sekolah Masa Depan
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Buka Jendela Dunia dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Pustaka Digital Terpadu</span>
            </h1>

            <p className="text-teal-100/80 text-sm sm:text-base max-w-2xl leading-relaxed">
              Selamat datang di portal Maktabah Ilmiah Hasbana. Nikmati ribuan koleksi e-book interaktif, pemutar audiobook, modul kurikulum tematik berbasis buku, serta kemudahan sirkulasi peminjaman buku fisik secara mandiri.
            </p>

            {/* Quick format selector pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-teal-300/80 font-medium mr-1">Filter Media Cepat:</span>
              <button
                onClick={() => setSelectedFormat('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedFormat === 'all'
                    ? 'bg-emerald-400 text-slate-950 shadow-md font-bold'
                    : 'bg-[#154b54] text-teal-100 hover:bg-[#1a5a65]'
                }`}
              >
                Semua Koleksi ({totalBooksCount})
              </button>
              <button
                onClick={() => setSelectedFormat('ebook')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedFormat === 'ebook'
                    ? 'bg-blue-400 text-slate-950 shadow-md font-bold'
                    : 'bg-[#154b54] text-teal-100 hover:bg-[#1a5a65]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-300" />
                E-Book Interaktif
              </button>
              <button
                onClick={() => setSelectedFormat('audiobook')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedFormat === 'audiobook'
                    ? 'bg-purple-400 text-slate-950 shadow-md font-bold'
                    : 'bg-[#154b54] text-teal-100 hover:bg-[#1a5a65]'
                }`}
              >
                <Headphones className="w-3.5 h-3.5 text-purple-300" />
                Audiobook
              </button>
              <button
                onClick={() => setSelectedFormat('physical')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedFormat === 'physical'
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'bg-[#154b54] text-teal-100 hover:bg-[#1a5a65]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-300" />
                Buku Fisik & Rak
              </button>
            </div>
          </div>

          {/* Quick Info & Stats Box */}
          <div className="lg:col-span-4 bg-[#0a272c]/90 border border-teal-500/30 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between pb-3 border-b border-teal-800/60 mb-4">
              <span className="text-xs uppercase font-bold text-teal-300 tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Statistik Pustaka
              </span>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                Aktif & Tersinkron
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#123e46]/60 p-3 rounded-xl border border-teal-700/40">
                <p className="text-xs text-teal-300">Total Koleksi Judul</p>
                <p className="text-2xl font-black text-white mt-1">{totalBooksCount}</p>
                <p className="text-[10px] text-teal-400/80 mt-0.5">E-book, audio & fisik</p>
              </div>

              <div className="bg-[#123e46]/60 p-3 rounded-xl border border-teal-700/40">
                <p className="text-xs text-teal-300">Modul Kurikulum</p>
                <p className="text-2xl font-black text-white mt-1">{totalModulesCount}</p>
                <p className="text-[10px] text-teal-400/80 mt-0.5">Paket literasi tematik</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-teal-800/60">
              <div className="flex items-center justify-between">
                <div className="text-xs text-teal-200">
                  <span className="font-semibold text-white">Modul Unggulan:</span>
                  <p className="text-[11px] text-teal-300/80">Literasi Sains & Krisis Iklim</p>
                </div>
                <button
                  onClick={onExploreModules}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1 transition-all"
                >
                  Buka Modul <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
