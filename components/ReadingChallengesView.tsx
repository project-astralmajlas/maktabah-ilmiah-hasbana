'use client';

import React from 'react';
import { 
  Trophy, 
  Target, 
  Star, 
  Flame, 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Member, BookItem } from '@/types/library';

interface ReadingChallengesViewProps {
  members: Member[];
  books: BookItem[];
  activeUser: Member;
  onSelectBook: (book: BookItem) => void;
}

export const ReadingChallengesView: React.FC<ReadingChallengesViewProps> = ({
  members,
  books,
  activeUser,
  onSelectBook
}) => {
  // Sort members by totalBorrowed descending
  const sortedMembers = [...members].sort((a, b) => b.totalBorrowed - a.totalBorrowed);
  const featuredPick = books.find(b => b.isFeatured) || books[0];

  const targetSemester = 15;
  const currentCompleted = activeUser.totalBorrowed || 8;
  const progressPercent = Math.min(100, Math.round((currentCompleted / targetSemester) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#0c2f35] via-[#16515b] to-[#123e46] rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
              <Trophy className="w-4 h-4 text-amber-400" />
              Tantangan Membaca Semester Genap 2025
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Tingkatkan Literasi, Raih Peringkat Tertinggi di Maktabah Ilmiah Hasbana
            </h1>
            <p className="text-teal-100/90 text-sm leading-relaxed">
              Bergabunglah bersama ratusan siswa lainnya dalam tantangan 15 buku satu semester. Kumpulkan lencana, pinjam buku secara aktif, dan ukir namamu di Papan Juara Literasi Sekolah!
            </p>
          </div>

          {/* Goal Progress Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-full md:w-80 shadow-lg text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold text-teal-200 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-400" /> Target Baca Pribadi
              </span>
              <span className="text-xs font-bold text-amber-300">{progressPercent}%</span>
            </div>
            <p className="text-2xl font-black">{currentCompleted} <span className="text-xs font-normal text-teal-200">/ {targetSemester} Buku</span></p>

            <div className="w-full bg-black/30 h-2.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-amber-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-teal-200 mt-2 text-center">
              Tersisa {Math.max(0, targetSemester - currentCompleted)} buku lagi untuk klaim Piagam Literasi!
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Leaderboard Siswa Teraktif */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              Papan Peringkat Pembaca Teraktif (Leaderboard)
            </h3>
            <span className="text-xs text-slate-400">Pembaruan otomatis tiap hari</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            {sortedMembers.map((member, index) => {
              const isTop3 = index < 3;
              const medalColor = index === 0 ? 'bg-amber-400 text-slate-950 font-black' : index === 1 ? 'bg-slate-300 text-slate-800 font-bold' : index === 2 ? 'bg-amber-600 text-white font-bold' : 'bg-slate-100 text-slate-600';

              return (
                <div key={member.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${medalColor}`}>
                      {index + 1}
                    </span>

                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />

                    <div>
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        {member.name}
                        {member.id === activeUser.id && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-semibold">
                            Anda
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-slate-500">{member.gradeClass}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-teal-800">{member.totalBorrowed}</span>
                    <span className="text-xs text-slate-500 block">Buku Dibaca</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Weekly Librarian Recommendation & Class Competition */}
        <div className="lg:col-span-5 space-y-6">
          {/* Featured Book Pick */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-teal-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> Rekomendasi Pustakawan Minggu Ini
              </span>
            </div>

            <div 
              onClick={() => onSelectBook(featuredPick)}
              className="flex gap-4 cursor-pointer group pt-1"
            >
              <img
                src={featuredPick.coverImage}
                alt={featuredPick.title}
                className="w-24 h-32 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform flex-shrink-0"
              />
              <div className="space-y-1">
                <span className="bg-teal-50 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  {featuredPick.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                  {featuredPick.title}
                </h4>
                <p className="text-xs text-slate-500">{featuredPick.author}</p>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                  {featuredPick.synopsis}
                </p>
              </div>
            </div>
          </div>

          {/* Class League */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-200/80 space-y-3">
            <h4 className="font-bold text-teal-950 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-700" />
              Liga Literasi Antar Kelas
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-teal-100 flex items-center justify-between">
                <span className="font-semibold text-slate-800">1. Kelas XI MIPA 1</span>
                <span className="font-bold text-teal-800">142 Peminjaman</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-teal-100 flex items-center justify-between">
                <span className="font-semibold text-slate-800">2. Kelas X IPS 2</span>
                <span className="font-bold text-teal-800">118 Peminjaman</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-teal-100 flex items-center justify-between">
                <span className="font-semibold text-slate-800">3. Kelas XII MIPA 3</span>
                <span className="font-bold text-teal-800">95 Peminjaman</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
