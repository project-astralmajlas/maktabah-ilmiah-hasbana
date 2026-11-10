'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  GraduationCap, 
  Bookmark, 
  ShieldCheck, 
  Trophy, 
  User, 
  ChevronDown, 
  Sparkles,
  Library,
  Layers,
  Menu,
  X
} from 'lucide-react';
import { Member } from '@/types/library';

interface HeaderProps {
  activeTab: 'catalog' | 'modules' | 'mylibrary' | 'challenges' | 'cms';
  setActiveTab: (tab: 'catalog' | 'modules' | 'mylibrary' | 'challenges' | 'cms') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeUser: Member;
  allMembers: Member[];
  onSwitchUser: (member: Member) => void;
  activeLoansCount: number;
  bookmarkedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  activeUser,
  allMembers,
  onSwitchUser,
  activeLoansCount,
  bookmarkedCount
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getRoleBadge = (role: Member['role']) => {
    switch (role) {
      case 'admin':
      case 'librarian':
        return <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-medium flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Pustakawan CMS</span>;
      case 'teacher':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-medium flex items-center gap-1"><GraduationCap className="w-3 h-3" /> Guru</span>;
      default:
        return <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded font-medium flex items-center gap-1"><User className="w-3 h-3" /> Siswa</span>;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c2f35] text-white shadow-md border-b border-[#144750]">
      {/* Top micro bar with school identity */}
      <div className="bg-[#082226] text-slate-300 text-xs py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span><strong>Maktabah Ilmiah Hasbana</strong> • Perpustakaan & Pusat Sumber Literasi Digital</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>Senin - Jumat: 07.30 - 16.00 WIB</span>
            <span>Akses Digital: 24/7</span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & School Name */}
          <div 
            onClick={() => setActiveTab('catalog')} 
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-teal-900/50 group-hover:scale-105 transition-transform">
              <Library className="w-6 h-6 text-[#082226]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white">Maktabah <span className="text-emerald-400">Hasbana</span></span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-1.5 py-0.2 rounded">ILMIAH</span>
              </div>
              <p className="text-[11px] text-teal-200/80 -mt-0.5 font-medium hidden sm:block">Perpustakaan Digital & CMS</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari judul buku, pengarang, ISBN, atau topik modul..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#144750] hover:bg-[#1a5560] focus:bg-[#1c5d69] text-white placeholder-teal-200/60 pl-10 pr-4 py-2 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <Search className="w-4 h-4 text-teal-300 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-teal-300 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'catalog'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-teal-100 hover:bg-[#144750] hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Katalog Pustaka
            </button>

            <button
              onClick={() => setActiveTab('modules')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'modules'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-teal-100 hover:bg-[#144750] hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              Modul Tematik
            </button>

            <button
              onClick={() => setActiveTab('mylibrary')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 relative ${
                activeTab === 'mylibrary'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-teal-100 hover:bg-[#144750] hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Pustaka Saya
              {(activeLoansCount > 0 || bookmarkedCount > 0) && (
                <span className="ml-1 px-1.5 py-0.5 text-[11px] rounded-full bg-amber-400 text-slate-950 font-bold leading-none">
                  {activeLoansCount + bookmarkedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'challenges'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-teal-100 hover:bg-[#144750] hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Tantangan Baca
            </button>

            <button
              onClick={() => setActiveTab('cms')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ml-2 border ${
                activeTab === 'cms'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-md'
                  : 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/20'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              CMS Admin
            </button>
          </nav>

          {/* User Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-lg bg-[#144750] hover:bg-[#1a5560] transition-colors border border-teal-600/40 text-left"
            >
              <img
                src={activeUser.avatar}
                alt={activeUser.name}
                className="w-8 h-8 rounded-full object-cover border border-emerald-400/50"
              />
              <div className="hidden xl:block">
                <div className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">{activeUser.name}</div>
                <div className="text-[10px] text-teal-200 capitalize">{activeUser.gradeClass}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-teal-300" />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl py-2 text-slate-800 border border-slate-200 z-50 animate-in fade-in slide-in-from-top-2"
                onClick={() => setUserDropdownOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Sedang Masuk Sebagai</p>
                  <p className="font-bold text-sm text-slate-900 mt-0.5">{activeUser.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    {getRoleBadge(activeUser.role)}
                    <span className="text-xs text-slate-500">{activeUser.memberNumber}</span>
                  </div>
                </div>

                <div className="px-3 py-2">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase px-2 mb-1">Ganti Profil / Akun Pengguna:</p>
                  {allMembers.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => onSwitchUser(member)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        member.id === activeUser.id 
                          ? 'bg-emerald-50 text-emerald-900 font-semibold' 
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <div>{member.name}</div>
                          <div className="text-[10px] text-slate-400">{member.gradeClass}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium capitalize px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">
                        {member.role === 'librarian' ? 'Admin CMS' : member.role}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-100 px-3 pt-2">
                  <button
                    onClick={() => setActiveTab('mylibrary')}
                    className="w-full text-left px-3 py-1.5 text-xs text-teal-700 font-medium hover:bg-teal-50 rounded-lg flex items-center gap-2"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    Lihat Kartu Anggota & Peminjaman Saya
                  </button>
                  <button
                    onClick={() => setActiveTab('cms')}
                    className="w-full text-left px-3 py-1.5 text-xs text-emerald-700 font-medium hover:bg-emerald-50 rounded-lg flex items-center gap-2 mt-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Buka Panel Manajemen Konten (CMS)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#144750] text-teal-200 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari buku, modul, penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#144750] text-white placeholder-teal-200/60 pl-9 pr-4 py-2 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <Search className="w-3.5 h-3.5 text-teal-300 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-3 pt-3 border-t border-[#1a5560] flex flex-col gap-1.5 pb-2 animate-in fade-in">
            <button
              onClick={() => { setActiveTab('catalog'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 ${
                activeTab === 'catalog' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-teal-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Katalog Pustaka Digital & Fisik
            </button>
            <button
              onClick={() => { setActiveTab('modules'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 ${
                activeTab === 'modules' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-teal-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              Modul Tematik & Kurikulum
            </button>
            <button
              onClick={() => { setActiveTab('mylibrary'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center justify-between ${
                activeTab === 'mylibrary' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-teal-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Pustaka Saya & Kartu Anggota
              </span>
              {(activeLoansCount > 0 || bookmarkedCount > 0) && (
                <span className="px-1.5 py-0.5 text-xs rounded-full bg-amber-400 text-slate-950 font-bold">
                  {activeLoansCount + bookmarkedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('challenges'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 ${
                activeTab === 'challenges' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-teal-100'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Tantangan Membaca & Leaderboard
            </button>
            <button
              onClick={() => { setActiveTab('cms'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 ${
                activeTab === 'cms' ? 'bg-amber-400 text-slate-950 font-bold' : ''
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Sistem Manajemen Konten (CMS Pustakawan)
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};
