'use client';

import React, { useState } from 'react';
import { 
  Bookmark, 
  Clock, 
  BookOpen, 
  RotateCcw, 
  CheckCircle2, 
  Heart, 
  Award, 
  Printer, 
  QrCode, 
  AlertTriangle, 
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { LoanRecord, BookItem, Member, ModuleItem } from '@/types/library';

interface MyLibraryViewProps {
  activeLoans: LoanRecord[];
  allLoans: LoanRecord[];
  bookmarkedBooks: BookItem[];
  completedModules: ModuleItem[];
  activeUser: Member;
  onReturnBook: (loanId: string) => void;
  onRenewLoan: (loanId: string) => void;
  onOpenReader: (book: BookItem) => void;
  onOpenAudiobook: (book: BookItem) => void;
  onSelectBook: (book: BookItem) => void;
  onRemoveBookmark: (bookId: string) => void;
}

export const MyLibraryView: React.FC<MyLibraryViewProps> = ({
  activeLoans,
  allLoans,
  bookmarkedBooks,
  completedModules,
  activeUser,
  onReturnBook,
  onRenewLoan,
  onOpenReader,
  onOpenAudiobook,
  onSelectBook,
  onRemoveBookmark
}) => {
  const [subTab, setSubTab] = useState<'loans' | 'history' | 'bookmarks' | 'badges'>('loans');
  const [showPrintCard, setShowPrintCard] = useState(false);

  const pastLoans = allLoans.filter(l => l.memberId === activeUser.id && l.status === 'returned');
  const userActiveLoans = activeLoans.filter(l => l.memberId === activeUser.id);

  const calculateDaysRemaining = (dueDateStr: string) => {
    const today = new Date();
    const due = new Date(dueDateStr);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Profile & Digital Card Banner */}
      <div className="bg-gradient-to-r from-[#0c2f35] to-[#16515b] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-6 text-center sm:text-left flex-col sm:flex-row">
          <img
            src={activeUser.avatar}
            alt={activeUser.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg"
          />
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="bg-emerald-400 text-slate-950 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                Anggota Aktif Maktabah Ilmiah Hasbana
              </span>
              <span className="text-teal-200 text-xs font-mono">{activeUser.memberNumber}</span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1">{activeUser.name}</h1>
            <p className="text-teal-200 text-xs mt-0.5">{activeUser.gradeClass} • {activeUser.email}</p>
            <p className="text-[11px] text-teal-300/80 mt-1">
              Bergabung sejak: {activeUser.joinedDate} • Total Buku Dipinjam: {activeUser.totalBorrowed}
            </p>
          </div>
        </div>

        {/* Digital Library Card Button */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => setShowPrintCard(true)}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <QrCode className="w-4 h-4" /> Kartu Anggota Digital
          </button>
        </div>
      </div>

      {/* Printable Digital Card Modal */}
      {showPrintCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-2xl border border-slate-200 relative animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                Kartu Anggota Maktabah Ilmiah Hasbana
              </span>
              <button
                onClick={() => setShowPrintCard(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                Tutup [X]
              </button>
            </div>

            {/* Visual Card */}
            <div className="bg-gradient-to-br from-[#0c2f35] to-[#124b54] p-5 rounded-2xl text-white shadow-xl relative overflow-hidden border border-teal-500/40">
              <div className="flex items-center justify-between pb-3 border-b border-white/20">
                <div>
                  <h3 className="font-black text-base tracking-tight">Maktabah <span className="text-emerald-400">Hasbana</span></h3>
                  <p className="text-[10px] text-teal-200">Pusat Kepustakaan Digital Ilmiah</p>
                </div>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded font-mono">
                  RESMI
                </span>
              </div>

              <div className="flex items-center gap-4 my-4">
                <img
                  src={activeUser.avatar}
                  alt={activeUser.name}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-emerald-400"
                />
                <div className="overflow-hidden">
                  <p className="font-bold text-sm text-white truncate">{activeUser.name}</p>
                  <p className="text-xs text-teal-200 capitalize">{activeUser.gradeClass}</p>
                  <p className="text-[11px] font-mono text-emerald-300 mt-1">{activeUser.memberNumber}</p>
                </div>
              </div>

              {/* Barcode Mock */}
              <div className="bg-white p-2.5 rounded-lg flex flex-col items-center justify-center">
                <div className="font-mono text-slate-950 font-bold tracking-widest text-sm">
                  ||| | |||| | |||||| | |||| |
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-0.5">
                  {activeUser.memberNumber}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Printer className="w-3.5 h-3.5" /> Cetak Kartu Anggota
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setSubTab('loans')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            subTab === 'loans'
              ? 'bg-teal-800 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          Sedang Dipinjam ({userActiveLoans.length})
        </button>

        <button
          onClick={() => setSubTab('bookmarks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            subTab === 'bookmarks'
              ? 'bg-teal-800 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          Koleksi Disimpan ({bookmarkedBooks.length})
        </button>

        <button
          onClick={() => setSubTab('badges')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            subTab === 'badges'
              ? 'bg-teal-800 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          Lencana & Modul Selesai ({completedModules.length})
        </button>

        <button
          onClick={() => setSubTab('history')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            subTab === 'history'
              ? 'bg-teal-800 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          Riwayat Pengembalian ({pastLoans.length})
        </button>
      </div>

      {/* Tab 1: Sedang Dipinjam */}
      {subTab === 'loans' && (
        <div className="space-y-4">
          {userActiveLoans.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-base">Tidak Ada Peminjaman Aktif</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Anda belum meminjam e-book atau buku fisik saat ini. Jelajahi katalog dan klik pinjam untuk mulai membaca!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userActiveLoans.map(loan => {
                const daysRemaining = calculateDaysRemaining(loan.dueDate);
                const isOverdue = daysRemaining < 0;

                return (
                  <div key={loan.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                          {loan.format}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isOverdue 
                            ? 'bg-rose-100 text-rose-800 animate-pulse' 
                            : daysRemaining <= 3 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {isOverdue ? `Terlambat ${Math.abs(daysRemaining)} Hari` : `Sisa ${daysRemaining} Hari`}
                        </span>
                      </div>

                      <div className="flex gap-3 mb-3">
                        <img
                          src={loan.bookCover}
                          alt={loan.bookTitle}
                          className="w-16 h-20 object-cover rounded-lg shadow-sm flex-shrink-0"
                        />
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-sm text-slate-900 line-clamp-2">{loan.bookTitle}</h4>
                          <p className="text-xs text-slate-500 mt-1">Tanggal Pinjam: {loan.loanDate}</p>
                          <p className="text-xs text-slate-700 font-medium mt-0.5">Jatuh Tempo: {loan.dueDate}</p>
                          {loan.renewCount > 0 && (
                            <span className="text-[10px] text-teal-600 block mt-1">
                              Telah diperpanjang {loan.renewCount}x
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onRenewLoan(loan.id)}
                          className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                        >
                          <RotateCcw className="w-3 h-3 text-teal-700" /> Perpanjang (+7 Hari)
                        </button>
                        <button
                          onClick={() => onReturnBook(loan.id)}
                          className="py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold transition-colors border border-emerald-200"
                        >
                          Kembalikan
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Koleksi Disimpan (Bookmarks) */}
      {subTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedBooks.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-base">Belum Ada Buku Disimpan</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Tandai buku favorit Anda dengan tombol hati pada kartu buku untuk membacanya nanti.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedBooks.map(book => (
                <div key={book.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => onSelectBook(book)}>
                    <img src={book.coverImage} alt={book.title} className="w-14 h-18 object-cover rounded-lg shadow-sm flex-shrink-0" />
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-sm text-slate-900 truncate hover:text-teal-700">{book.title}</h4>
                      <p className="text-xs text-slate-500 truncate">{book.author}</p>
                      <span className="text-[10px] text-teal-700 font-semibold">{book.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveBookmark(book.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0"
                    title="Hapus dari simpanan"
                  >
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Lencana & Modul Selesai */}
      {subTab === 'badges' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {completedModules.map(mod => (
              <div key={mod.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shadow flex-shrink-0">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Lencana Literasi
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{mod.badgeName}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{mod.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Riwayat Pengembalian */}
      {subTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase">
            Riwayat Sirkulasi Perpustakaan Siswa
          </div>
          {pastLoans.length === 0 ? (
            <p className="text-xs text-slate-400 p-6 text-center">Belum ada riwayat pengembalian buku.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {pastLoans.map(p => (
                <div key={p.id} className="p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">{p.bookTitle}</p>
                      <p className="text-[11px] text-slate-500">Dipinjam: {p.loanDate} • Dikembalikan: {p.returnDate || 'Selesai'}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 rounded-full font-semibold text-[11px]">
                    Selesai Tepat Waktu
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
