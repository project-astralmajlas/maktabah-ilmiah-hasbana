'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  Users, 
  RotateCcw, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Check, 
  X, 
  Save, 
  Download, 
  Upload, 
  BellRing, 
  AlertCircle, 
  Sparkles,
  BarChart3,
  Calendar,
  Clock,
  CheckCircle2,
  HelpCircle,
  FileText,
  Globe,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_BOOKS } from '@/lib/initialData';
import { 
  BookItem, 
  ModuleItem, 
  Member, 
  Announcement, 
  LoanRecord, 
  BookFormat, 
  EducationLevel, 
  BookCategory 
} from '@/types/library';

interface AdminCMSViewProps {
  books: BookItem[];
  modules: ModuleItem[];
  members: Member[];
  announcements: Announcement[];
  loans: LoanRecord[];
  activeUser: Member;
  onSaveBooks: (books: BookItem[]) => void;
  onSaveModules: (modules: ModuleItem[]) => void;
  onSaveMembers: (members: Member[]) => void;
  onSaveAnnouncements: (announcements: Announcement[]) => void;
  onSaveLoans: (loans: LoanRecord[]) => void;
  onExportData: () => void;
  onImportData: (jsonStr: string) => void;
  onResetData: () => void;
}

export const AdminCMSView: React.FC<AdminCMSViewProps> = ({
  books,
  modules,
  members,
  announcements,
  loans,
  activeUser,
  onSaveBooks,
  onSaveModules,
  onSaveMembers,
  onSaveAnnouncements,
  onSaveLoans,
  onExportData,
  onImportData,
  onResetData
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'books' | 'modules' | 'loans' | 'members' | 'announcements' | 'welib_sync' | 'backup'>('dashboard');

  const handleSyncWeLibAll = () => {
    const currentIds = new Set(books.map(b => b.id));
    const newToAdd = INITIAL_BOOKS.filter(b => !currentIds.has(b.id));
    if (newToAdd.length === 0) {
      alert('Seluruh buku dari repositori id.welib.st sudah ada dalam katalog Anda.');
      return;
    }
    const updated = [...books, ...newToAdd];
    onSaveBooks(updated);
    if (typeof window !== 'undefined') {
      confetti({ particleCount: 70, spread: 60 });
    }
  };

  const handleImportSingleBook = (bookToAdd: BookItem) => {
    if (books.some(b => b.id === bookToAdd.id)) return;
    onSaveBooks([bookToAdd, ...books]);
    if (typeof window !== 'undefined') {
      confetti({ particleCount: 40, spread: 50 });
    }
  };

  // Book Modal state
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [bookForm, setBookForm] = useState<Partial<BookItem>>({
    title: '',
    author: '',
    publisher: '',
    year: 2024,
    isbn: '',
    ddc: '800',
    category: 'Sastra & Fiksi',
    format: 'ebook',
    level: 'SMP',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    synopsis: '',
    shelfLocation: 'Rak A-01',
    stockTotal: 10,
    stockAvailable: 10,
    rating: 4.8,
    reviewsCount: 0,
    pages: 240,
    language: 'Bahasa Indonesia',
    tags: ['Edukasi']
  });

  // Module Modal state
  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [moduleForm, setModuleForm] = useState<Partial<ModuleItem>>({
    title: '',
    subtitle: '',
    targetLevel: 'SMP',
    subject: 'Literasi & Karakter',
    estimatedHours: 4,
    bannerImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    description: '',
    learningObjectives: ['Memahami konsep dasar bacaan', 'Menganalisis keterkaitan tema'],
    bookIds: [],
    badgeName: 'Penjelajah Pengetahuan',
    badgeIcon: 'Award',
    authorName: activeUser.name,
    tasks: [
      {
        id: 't-sample-1',
        title: 'Lembar Refleksi Bacaan',
        description: 'Tuliskan hikmah dan analisis dari bacaan terpilih dalam modul ini.',
        type: 'reflection'
      },
      {
        id: 't-sample-2',
        title: 'Kuis Pemahaman Modul',
        description: 'Uji pemahaman siswa atas modul.',
        type: 'quiz',
        quizQuestions: [
          {
            id: 'q1',
            question: 'Apakah tujuan utama membaca kritis pada modul ini?',
            options: ['Meningkatkan pemahaman mendalam', 'Membaca cepat tanpa paham', 'Menghafal nomor halaman', 'Menyalin tanpa analisis'],
            correctAnswerIndex: 0,
            explanation: 'Literasi kritis melatih peserta didik menggali makna tersirat dalam bacaan.'
          }
        ]
      }
    ]
  });

  // Filter & Search states
  const [bookSearch, setBookSearch] = useState('');
  const [loanFilter, setLoanFilter] = useState<'all' | 'active' | 'returned'>('all');
  const [newObjectiveText, setNewObjectiveText] = useState('');

  // Manual Loan Modal state
  const [manualLoanModalOpen, setManualLoanModalOpen] = useState(false);
  const [manualLoanMemberId, setManualLoanMemberId] = useState(members[0]?.id || '');
  const [manualLoanBookId, setManualLoanBookId] = useState(books[0]?.id || '');

  // Announcement form
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    category: 'info',
    pinned: false
  });

  // Calculations for dashboard
  const totalPhysical = books.filter(b => b.format === 'physical').length;
  const totalEbooks = books.filter(b => b.format === 'ebook').length;
  const totalAudiobooks = books.filter(b => b.format === 'audiobook').length;
  const activeLoansList = loans.filter(l => l.status === 'active');

  // Book Handlers
  const handleOpenAddBook = () => {
    setEditingBookId(null);
    setBookForm({
      title: '',
      author: '',
      publisher: 'Pustaka Hasbana',
      year: new Date().getFullYear(),
      isbn: `978-602-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(1 + Math.random() * 9)}`,
      ddc: '500',
      category: 'Sains & Teknologi',
      format: 'ebook',
      level: 'SMP',
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      synopsis: '',
      shelfLocation: 'Rak A-02',
      stockTotal: 10,
      stockAvailable: 10,
      rating: 5.0,
      reviewsCount: 1,
      pages: 200,
      language: 'Bahasa Indonesia',
      tags: ['BukuBaru', 'LiterasiSekolah'],
      chapters: [
        {
          id: 'ch-1',
          title: 'Bab 1: Pengantar Bacaan',
          content: 'Tuliskan teks bab pertama e-book di sini. Teks ini akan langsung dapat dibaca oleh siswa di e-book reader interaktif Maktabah Ilmiah Hasbana.'
        }
      ]
    });
    setBookModalOpen(true);
  };

  const handleOpenEditBook = (book: BookItem) => {
    setEditingBookId(book.id);
    setBookForm({ ...book });
    setBookModalOpen(true);
  };

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookForm.title || !bookForm.author) return;

    if (editingBookId) {
      // Update existing
      const updated = books.map(b => b.id === editingBookId ? { ...b, ...bookForm } as BookItem : b);
      onSaveBooks(updated);
    } else {
      // Add new
      const newBook: BookItem = {
        ...bookForm,
        id: `book-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0]
      } as BookItem;
      onSaveBooks([newBook, ...books]);
    }
    setBookModalOpen(false);
  };

  const handleDeleteBook = (id: string) => {
    if (confirm('Yakin ingin menghapus buku ini dari katalog perpustakaan?')) {
      const updated = books.filter(b => b.id !== id);
      onSaveBooks(updated);
    }
  };

  // Module Handlers
  const handleOpenAddModule = () => {
    setEditingModuleId(null);
    setModuleForm({
      title: '',
      subtitle: '',
      targetLevel: 'SMP',
      subject: 'Kurikulum Merdeka',
      estimatedHours: 5,
      bannerImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
      description: '',
      learningObjectives: ['Memahami konsep bacaan secara komprehensif'],
      bookIds: [books[0]?.id || ''],
      badgeName: 'Penjelajah Literasi Baru',
      badgeIcon: 'Award',
      authorName: activeUser.name,
      tasks: [
        {
          id: 't-1',
          title: 'Lembar Refleksi Diri',
          description: 'Tuliskan 1 paragraf pelajaran moral yang dipetik dari buku bacaan.',
          type: 'reflection'
        },
        {
          id: 't-2',
          title: 'Kuis Evaluasi Pemahaman',
          description: 'Jawab pertanyaan berikut dengan tepat.',
          type: 'quiz',
          quizQuestions: [
            {
              id: 'q1',
              question: 'Apakah pesan moral utama yang ingin disampaikan dalam modul ini?',
              options: ['Integritas dan kerja keras', 'Ketidakteraturan', 'Menyerah tanpa usaha', 'Mengabaikan fakta'],
              correctAnswerIndex: 0,
              explanation: 'Modul ini menekankan nilai ketabahan dan karakter mandiri.'
            }
          ]
        }
      ]
    });
    setModuleModalOpen(true);
  };

  const handleOpenEditModule = (mod: ModuleItem) => {
    setEditingModuleId(mod.id);
    setModuleForm({ ...mod });
    setModuleModalOpen(true);
  };

  const handleSaveModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleForm.title) return;

    if (editingModuleId) {
      const updated = modules.map(m => m.id === editingModuleId ? { ...m, ...moduleForm } as ModuleItem : m);
      onSaveModules(updated);
    } else {
      const newMod: ModuleItem = {
        ...moduleForm,
        id: `mod-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0]
      } as ModuleItem;
      onSaveModules([newMod, ...modules]);
    }
    setModuleModalOpen(false);
  };

  const handleDeleteModule = (id: string) => {
    if (confirm('Hapus modul tematik ini?')) {
      onSaveModules(modules.filter(m => m.id !== id));
    }
  };

  // Circulation Handlers
  const handleConfirmReturn = (loanId: string) => {
    const updated = loans.map(l => {
      if (l.id === loanId) {
        return {
          ...l,
          status: 'returned' as const,
          returnDate: new Date().toISOString().split('T')[0]
        };
      }
      return l;
    });
    onSaveLoans(updated);

    // Increase available stock
    const loan = loans.find(l => l.id === loanId);
    if (loan) {
      const updatedBooks = books.map(b => {
        if (b.id === loan.bookId) {
          return { ...b, stockAvailable: Math.min(b.stockTotal, b.stockAvailable + 1) };
        }
        return b;
      });
      onSaveBooks(updatedBooks);
    }
  };

  const handleExtendLoan = (loanId: string) => {
    const updated = loans.map(l => {
      if (l.id === loanId) {
        const currentDue = new Date(l.dueDate);
        currentDue.setDate(currentDue.getDate() + 7);
        return {
          ...l,
          dueDate: currentDue.toISOString().split('T')[0],
          renewCount: l.renewCount + 1
        };
      }
      return l;
    });
    onSaveLoans(updated);
  };

  const handleCreateManualLoan = () => {
    const member = members.find(m => m.id === manualLoanMemberId);
    const book = books.find(b => b.id === manualLoanBookId);
    if (!member || !book) return;

    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + 14);

    const newLoan: LoanRecord = {
      id: `loan-${Date.now()}`,
      bookId: book.id,
      bookTitle: book.title,
      bookCover: book.coverImage,
      format: book.format,
      memberId: member.id,
      memberName: member.name,
      memberClass: member.gradeClass,
      loanDate: today.toISOString().split('T')[0],
      dueDate: due.toISOString().split('T')[0],
      status: 'active',
      renewCount: 0
    };

    onSaveLoans([newLoan, ...loans]);

    // Decrease available stock if physical
    if (book.format === 'physical') {
      const updatedBooks = books.map(b => {
        if (b.id === book.id) {
          return { ...b, stockAvailable: Math.max(0, b.stockAvailable - 1) };
        }
        return b;
      });
      onSaveBooks(updatedBooks);
    }

    setManualLoanModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-[#0c2f35] to-[#124b54] p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-400 text-slate-950 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Content Management System (CMS) Maktabah Ilmiah Hasbana
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Panel Pengelolaan Modul & Pustaka Digital
          </h1>
          <p className="text-teal-200 text-xs sm:text-sm mt-1 max-w-2xl">
            Kelola katalog buku, modul kurikulum merdeka, sirkulasi peminjaman, data anggota, dan publikasikan warta secara dinamis.
          </p>
        </div>

        {/* Quick Action Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleOpenAddBook}
            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" /> Tambah Koleksi Baru
          </button>
          <button
            onClick={handleOpenAddModule}
            className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md"
          >
            <Layers className="w-4 h-4" /> Buat Modul Tematik
          </button>
        </div>
      </div>

      {/* CMS Navigation Tabs */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'dashboard' ? 'bg-white text-teal-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Ikhtisar & Statistik
        </button>

        <button
          onClick={() => setActiveTab('books')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'books' ? 'bg-white text-teal-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Kelola Buku ({books.length})
        </button>

        <button
          onClick={() => setActiveTab('modules')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'modules' ? 'bg-white text-teal-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" /> Kelola Modul ({modules.length})
        </button>

        <button
          onClick={() => setActiveTab('loans')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'loans' ? 'bg-white text-teal-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <RotateCcw className="w-4 h-4" /> Sirkulasi Pinjam ({activeLoansList.length})
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'members' ? 'bg-white text-teal-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" /> Data Anggota ({members.length})
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'announcements' ? 'bg-white text-teal-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BellRing className="w-4 h-4" /> Warta & Berita ({announcements.length})
        </button>

        <button
          onClick={() => setActiveTab('welib_sync')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'welib_sync' ? 'bg-white text-emerald-800 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Globe className="w-4 h-4 text-emerald-600" /> Repositori id.welib.st
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'backup' ? 'bg-white text-teal-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Download className="w-4 h-4" /> Backup & Sinkron
        </button>
      </div>

      {/* TAB 1: DASHBOARD STATS */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold uppercase">Total Koleksi Judul</span>
              <p className="text-3xl font-black text-slate-900 mt-1">{books.length}</p>
              <div className="flex gap-2 text-[10px] text-slate-400 mt-2">
                <span>{totalEbooks} E-Book</span> • <span>{totalAudiobooks} Audio</span> • <span>{totalPhysical} Fisik</span>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold uppercase">Modul Kurikulum</span>
              <p className="text-3xl font-black text-teal-800 mt-1">{modules.length}</p>
              <p className="text-[10px] text-teal-600 mt-2">Paket literasi terstruktur</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold uppercase">Sirkulasi Pinjam Aktif</span>
              <p className="text-3xl font-black text-amber-600 mt-1">{activeLoansList.length}</p>
              <p className="text-[10px] text-amber-700 mt-2">Dipinjam siswa & guru</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold uppercase">Anggota Terdaftar</span>
              <p className="text-3xl font-black text-emerald-700 mt-1">{members.length}</p>
              <p className="text-[10px] text-emerald-600 mt-2">Siswa, guru & pustakawan</p>
            </div>
          </div>

          {/* Recent Circulation Activity */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Aktivitas Peminjaman Terkini</h3>
              <button 
                onClick={() => setActiveTab('loans')} 
                className="text-xs text-teal-700 font-bold hover:underline"
              >
                Lihat Semua Sirkulasi →
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {loans.slice(0, 5).map(l => (
                <div key={l.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={l.bookCover} alt="" className="w-9 h-12 object-cover rounded shadow-xs" />
                    <div>
                      <p className="font-bold text-slate-800">{l.bookTitle}</p>
                      <p className="text-[11px] text-slate-500">Peminjam: {l.memberName} ({l.memberClass})</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                      l.status === 'active' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {l.status === 'active' ? `Jatuh Tempo: ${l.dueDate}` : 'Telah Dikembalikan'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE BOOKS (KATALOG BUKU) */}
      {activeTab === 'books' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Cari judul, penulis, atau ISBN..."
                value={bookSearch}
                onChange={(e) => setBookSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-700 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={handleOpenAddBook}
              className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm self-end sm:self-auto"
            >
              <Plus className="w-4 h-4" /> Tambah Koleksi Pustaka
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="p-3.5">Buku & Pengarang</th>
                    <th className="p-3.5">Format & Jenjang</th>
                    <th className="p-3.5">Kategori</th>
                    <th className="p-3.5">Rak / DDC</th>
                    <th className="p-3.5">Stok</th>
                    <th className="p-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {books
                    .filter(b => b.title.toLowerCase().includes(bookSearch.toLowerCase()) || b.author.toLowerCase().includes(bookSearch.toLowerCase()))
                    .map(b => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 flex items-center gap-3">
                          <img src={b.coverImage} alt="" className="w-10 h-14 object-cover rounded shadow-xs flex-shrink-0" />
                          <div>
                            <p className="font-bold text-slate-900 line-clamp-1">{b.title}</p>
                            <p className="text-slate-500 text-[11px]">{b.author} • {b.year}</p>
                            <p className="text-[10px] font-mono text-slate-400">{b.isbn}</p>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="capitalize font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded text-[10px]">
                            {b.format}
                          </span>
                          <span className="ml-1 text-slate-500 text-[10px]">({b.level})</span>
                        </td>
                        <td className="p-3.5 font-medium">{b.category}</td>
                        <td className="p-3.5 font-mono text-[11px]">
                          <div>{b.shelfLocation}</div>
                          <span className="text-slate-400">{b.ddc}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold">{b.stockAvailable}</span> / {b.stockTotal}
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditBook(b)}
                              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                              title="Edit Buku"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteBook(b.id)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                              title="Hapus Buku"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MANAGE THEMATIC MODULES */}
      {activeTab === 'modules' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Modul tematik mengelompokkan buku ke dalam kurikulum pembelajaran, tugas refleksi, dan kuis pemahaman.
            </p>
            <button
              onClick={handleOpenAddModule}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Buat Modul Tematik Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map(mod => (
              <div key={mod.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-teal-50 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {mod.targetLevel} • {mod.subject}
                    </span>
                    <span className="text-xs text-slate-400">{mod.estimatedHours} Jam Belajar</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{mod.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{mod.subtitle}</p>

                  <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                    <p className="font-semibold text-slate-700">Buku Terkait ({mod.bookIds.length} judul):</p>
                    <div className="flex flex-wrap gap-1">
                      {mod.bookIds.map(bid => {
                        const bk = books.find(b => b.id === bid);
                        return (
                          <span key={bid} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] text-slate-700">
                            {bk ? bk.title : bid}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-amber-800 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Lencana: {mod.badgeName}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModule(mod)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteModule(mod.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                      title="Hapus Modul"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MANAGE LOANS & CIRCULATION */}
      {activeTab === 'loans' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setLoanFilter('all')}
                className={`px-3 py-1.5 rounded-lg ${loanFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
              >
                Semua ({loans.length})
              </button>
              <button
                onClick={() => setLoanFilter('active')}
                className={`px-3 py-1.5 rounded-lg ${loanFilter === 'active' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
              >
                Sedang Dipinjam ({activeLoansList.length})
              </button>
              <button
                onClick={() => setLoanFilter('returned')}
                className={`px-3 py-1.5 rounded-lg ${loanFilter === 'returned' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
              >
                Selesai Dikembalikan
              </button>
            </div>

            <button
              onClick={() => setManualLoanModalOpen(true)}
              className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Catat Peminjaman di Meja Sirkulasi
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="p-3.5">Peminjam</th>
                    <th className="p-3.5">Buku</th>
                    <th className="p-3.5">Format</th>
                    <th className="p-3.5">Tgl Pinjam</th>
                    <th className="p-3.5">Jatuh Tempo</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Aksi Pustakawan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loans
                    .filter(l => loanFilter === 'all' ? true : l.status === loanFilter)
                    .map(l => (
                      <tr key={l.id} className="hover:bg-slate-50/80">
                        <td className="p-3.5">
                          <p className="font-bold text-slate-900">{l.memberName}</p>
                          <p className="text-[11px] text-slate-400">{l.memberClass}</p>
                        </td>
                        <td className="p-3.5">
                          <p className="font-semibold text-slate-800 line-clamp-1">{l.bookTitle}</p>
                        </td>
                        <td className="p-3.5 uppercase font-bold text-[10px] text-teal-800">{l.format}</td>
                        <td className="p-3.5">{l.loanDate}</td>
                        <td className="p-3.5 font-semibold text-slate-900">{l.dueDate}</td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            l.status === 'active' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {l.status === 'active' ? 'Dipinjam' : 'Dikembalikan'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          {l.status === 'active' ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleConfirmReturn(l.id)}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold"
                              >
                                Selesai Kembali
                              </button>
                              <button
                                onClick={() => handleExtendLoan(l.id)}
                                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold"
                                title="Perpanjang 7 hari"
                              >
                                +7 Hari
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Selesai</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DATA ANGGOTA */}
      {activeTab === 'members' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {members.map(m => (
              <div key={m.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <img src={m.avatar} alt={m.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200" />
                <div className="overflow-hidden">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-teal-50 text-teal-800">
                    {m.role}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 truncate mt-1">{m.name}</h4>
                  <p className="text-xs text-slate-500">{m.gradeClass}</p>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">{m.memberNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: WARTA & PENGUMUMAN */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">Warta ini tampil di strip beranda dan pemberitahuan pembaca Maktabah Ilmiah Hasbana.</p>
            <button
              onClick={() => setAnnouncementModalOpen(true)}
              className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Buat Pengumuman Baru
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map(ann => (
              <div key={ann.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {ann.pinned && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Sematkan di Beranda
                      </span>
                    )}
                    <span className="text-xs text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{ann.title}</h4>
                  <p className="text-xs text-slate-600 max-w-2xl">{ann.content}</p>
                </div>

                <button
                  onClick={() => {
                    const updated = announcements.filter(a => a.id !== ann.id);
                    onSaveAnnouncements(updated);
                  }}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: SINKRONISASI REPOSITORI ID.WELIB.ST */}
      {activeTab === 'welib_sync' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#092c32] via-[#0c3942] to-[#134e5a] p-6 sm:p-7 rounded-3xl text-white border border-teal-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-3 py-0.5 rounded-full text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Repositori Digital Terpadu: id.welib.st
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                Sinkronisasi Database Koleksi Buku id.welib.st
              </h2>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
                Database ini memuat kurasi koleksi buku digital, novel sastra Indonesia terpopuler, karya klasik, sains modern, psikologi best-seller, serta khazanah keilmuan yang terindeks di jaringan WeLib Indonesia.
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              <button
                onClick={handleSyncWeLibAll}
                className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-900/50 hover:scale-105"
              >
                <RefreshCw className="w-4 h-4" /> Impor & Sinkron Semua ({INITIAL_BOOKS.length} Buku)
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Tersedia di Repositori WeLib</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{INITIAL_BOOKS.length} Judul</p>
              </div>
              <span className="p-3 bg-teal-50 text-teal-800 rounded-xl">
                <Globe className="w-6 h-6" />
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Telah Masuk ke Maktabah</p>
                <p className="text-2xl font-black text-emerald-700 mt-1">
                  {books.filter(b => INITIAL_BOOKS.some(ib => ib.id === b.id)).length} Judul
                </p>
              </div>
              <span className="p-3 bg-emerald-50 text-emerald-800 rounded-xl">
                <CheckCircle2 className="w-6 h-6" />
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Siap Diimpor Baru</p>
                <p className="text-2xl font-black text-amber-600 mt-1">
                  {INITIAL_BOOKS.filter(ib => !books.some(b => b.id === ib.id)).length} Judul
                </p>
              </div>
              <span className="p-3 bg-amber-50 text-amber-700 rounded-xl">
                <Download className="w-6 h-6" />
              </span>
            </div>
          </div>

          {/* Book Repository Grid */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Daftar Koleksi Buku Repositori id.welib.st</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Klik &quot;Impor ke Katalog&quot; pada judul mana pun untuk menambahkannya langsung ke katalog aktif Maktabah Ilmiah Hasbana.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {INITIAL_BOOKS.map(ib => {
                const isAlreadyImported = books.some(b => b.id === ib.id);

                return (
                  <div 
                    key={ib.id} 
                    className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex gap-3.5 items-start justify-between"
                  >
                    <img
                      src={ib.coverImage}
                      alt={ib.title}
                      className="w-16 h-22 object-cover rounded-xl shadow-sm flex-shrink-0"
                    />

                    <div className="flex-1 overflow-hidden space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                          {ib.format}
                        </span>
                        <span className="text-[10px] text-slate-500 bg-slate-200/70 px-1.5 py-0.5 rounded">
                          {ib.level}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 leading-snug line-clamp-1" title={ib.title}>
                        {ib.title}
                      </h4>
                      <p className="text-xs text-slate-600 truncate">{ib.author}</p>
                      <p className="text-[11px] text-slate-400 font-mono">DDC: {ib.ddc}</p>

                      <div className="pt-2">
                        {isAlreadyImported ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                            <Check className="w-3 h-3" /> Sudah Ada di Katalog
                          </span>
                        ) : (
                          <button
                            onClick={() => handleImportSingleBook(ib)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-teal-800 hover:bg-teal-900 px-3 py-1 rounded-lg transition-colors shadow-xs"
                          >
                            <Download className="w-3 h-3" /> Impor ke Katalog
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: BACKUP & SINKRONISASI DATABASE */}
      {activeTab === 'backup' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Pusat Backup & Pemulihan Data Maktabah Ilmiah Hasbana</h3>
            <p className="text-xs text-slate-500 mt-1">
              Simpan seluruh data buku, kurikulum modul, transaksi sirkulasi, dan anggota ke dalam file JSON cadangan atau pulihkan data kapan saja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Export */}
            <div className="p-5 rounded-2xl border border-teal-200 bg-teal-50/50 space-y-3">
              <span className="p-2 rounded-xl bg-teal-100 text-teal-800 inline-block">
                <Download className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-sm text-slate-900">Unduh Cadangan (Export JSON)</h4>
              <p className="text-xs text-slate-600">
                Ekspor seluruh database ke format file .json untuk arsip lokal perpustakaan sekolah.
              </p>
              <button
                onClick={onExportData}
                className="w-full py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold"
              >
                Unduh File Cadangan
              </button>
            </div>

            {/* Import */}
            <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-3">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800 inline-block">
                <Upload className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-sm text-slate-900">Pulihkan Data (Import JSON)</h4>
              <p className="text-xs text-slate-600">
                Unggah file cadangan JSON yang telah disimpan sebelumnya untuk mengembalikan database.
              </p>
              <label className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold block text-center cursor-pointer">
                Pilih File Cadangan
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const content = event.target?.result as string;
                        if (content) onImportData(content);
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
              </label>
            </div>

            {/* Reset */}
            <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-3">
              <span className="p-2 rounded-xl bg-rose-100 text-rose-800 inline-block">
                <RotateCcw className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-sm text-slate-900">Reset ke Koleksi Standar</h4>
              <p className="text-xs text-slate-600">
                Kembalikan seluruh isi pustaka dan modul tematik ke contoh data kurikulum awal Maktabah Ilmiah Hasbana.
              </p>
              <button
                onClick={() => {
                  if (confirm('Yakin ingin mereset seluruh data perpustakaan ke data awal?')) {
                    onResetData();
                  }
                }}
                className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
              >
                Reset Database Standar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT BOOK */}
      {bookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 text-slate-900 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-bold text-base text-slate-900">
                {editingBookId ? 'Edit Koleksi Pustaka' : 'Tambah Buku / Koleksi Baru'}
              </h3>
              <button onClick={() => setBookModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBook} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Judul Buku *</label>
                  <input
                    type="text"
                    required
                    value={bookForm.title || ''}
                    onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700"
                    placeholder="Contoh: Laskar Pelangi"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Pengarang / Penulis *</label>
                  <input
                    type="text"
                    required
                    value={bookForm.author || ''}
                    onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700"
                    placeholder="Contoh: Andrea Hirata"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Format Koleksi</label>
                  <select
                    value={bookForm.format || 'ebook'}
                    onChange={(e) => setBookForm({ ...bookForm, format: e.target.value as BookFormat })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="ebook">E-Book (Digital)</option>
                    <option value="audiobook">Audiobook</option>
                    <option value="physical">Buku Fisik (Rak)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kategori</label>
                  <select
                    value={bookForm.category || 'Sains & Teknologi'}
                    onChange={(e) => setBookForm({ ...bookForm, category: e.target.value as BookCategory })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Sains & Teknologi">Sains & Teknologi</option>
                    <option value="Sastra & Fiksi">Sastra & Fiksi</option>
                    <option value="Sejarah & Budaya">Sejarah & Budaya</option>
                    <option value="Pengembangan Diri">Pengembangan Diri</option>
                    <option value="Matematika">Matematika</option>
                    <option value="Bahasa & Kamus">Bahasa & Kamus</option>
                    <option value="Komik & Grafis">Komik & Grafis</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tingkat Sekolah</label>
                  <select
                    value={bookForm.level || 'SMP'}
                    onChange={(e) => setBookForm({ ...bookForm, level: e.target.value as EducationLevel })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Semua">Semua Jenjang</option>
                    <option value="SD">SD</option>
                    <option value="SMP">SMP</option>
                    <option value="SMA">SMA/SMK</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Penerbit</label>
                  <input
                    type="text"
                    value={bookForm.publisher || ''}
                    onChange={(e) => setBookForm({ ...bookForm, publisher: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tahun Terbit</label>
                  <input
                    type="number"
                    value={bookForm.year || 2024}
                    onChange={(e) => setBookForm({ ...bookForm, year: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nomor ISBN</label>
                  <input
                    type="text"
                    value={bookForm.isbn || ''}
                    onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nomor DDC</label>
                  <input
                    type="text"
                    value={bookForm.ddc || ''}
                    onChange={(e) => setBookForm({ ...bookForm, ddc: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Lokasi Rak Fisik</label>
                  <input
                    type="text"
                    value={bookForm.shelfLocation || ''}
                    onChange={(e) => setBookForm({ ...bookForm, shelfLocation: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jumlah Stok</label>
                  <input
                    type="number"
                    value={bookForm.stockTotal || 10}
                    onChange={(e) => setBookForm({ ...bookForm, stockTotal: Number(e.target.value), stockAvailable: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">URL Cover Buku</label>
                <input
                  type="url"
                  value={bookForm.coverImage || ''}
                  onChange={(e) => setBookForm({ ...bookForm, coverImage: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Sinopsis & Ringkasan Buku</label>
                <textarea
                  rows={3}
                  value={bookForm.synopsis || ''}
                  onChange={(e) => setBookForm({ ...bookForm, synopsis: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                  placeholder="Ketik sinopsis buku di sini..."
                />
              </div>

              {/* Sample Chapter text for e-book reader */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Isi Teks Bacaan Bab 1 (Untuk Pembaca E-Book Interaktif)
                </label>
                <textarea
                  rows={4}
                  value={bookForm.chapters?.[0]?.content || ''}
                  onChange={(e) => {
                    const existing = bookForm.chapters || [{ id: 'ch-1', title: 'Bab 1: Awal Kisah', content: '' }];
                    const updatedFirst = { ...existing[0], content: e.target.value };
                    setBookForm({ ...bookForm, chapters: [updatedFirst, ...existing.slice(1)] });
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono text-[11px]"
                  placeholder="Teks bacaan lengkap bab ini..."
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBookModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Simpan Koleksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT THEMATIC MODULE */}
      {moduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 text-slate-900 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-bold text-base text-slate-900">
                {editingModuleId ? 'Edit Modul Tematik' : 'Buat Modul Tematik Kurikulum Baru'}
              </h3>
              <button onClick={() => setModuleModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModule} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Judul Modul *</label>
                <input
                  type="text"
                  required
                  value={moduleForm.title || ''}
                  onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                  placeholder="Contoh: Modul Literasi Sains: Krisis Iklim & Transisi Energi"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Subjudul / Deskripsi Singkat</label>
                <input
                  type="text"
                  value={moduleForm.subtitle || ''}
                  onChange={(e) => setModuleForm({ ...moduleForm, subtitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                  placeholder="Ringkasan 1 kalimat tema modul..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jenjang Target</label>
                  <select
                    value={moduleForm.targetLevel || 'SMP'}
                    onChange={(e) => setModuleForm({ ...moduleForm, targetLevel: e.target.value as EducationLevel })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Semua">Semua Jenjang</option>
                    <option value="SD">SD</option>
                    <option value="SMP">SMP</option>
                    <option value="SMA">SMA/SMK</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    value={moduleForm.subject || ''}
                    onChange={(e) => setModuleForm({ ...moduleForm, subject: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estimasi Jam Belajar</label>
                  <input
                    type="number"
                    value={moduleForm.estimatedHours || 4}
                    onChange={(e) => setModuleForm({ ...moduleForm, estimatedHours: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Pilih Buku Wajib Modul (Centang):</label>
                <div className="max-h-36 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {books.map(bk => {
                    const isChecked = moduleForm.bookIds?.includes(bk.id);
                    return (
                      <label key={bk.id} className="flex items-center gap-2 text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            const current = moduleForm.bookIds || [];
                            if (e.target.checked) {
                              setModuleForm({ ...moduleForm, bookIds: [...current, bk.id] });
                            } else {
                              setModuleForm({ ...moduleForm, bookIds: current.filter(id => id !== bk.id) });
                            }
                          }}
                          className="rounded text-teal-700"
                        />
                        <span className="truncate">{bk.title}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Lencana Kelulusan</label>
                  <input
                    type="text"
                    value={moduleForm.badgeName || ''}
                    onChange={(e) => setModuleForm({ ...moduleForm, badgeName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                    placeholder="Contoh: Pahlawan Bumi Hijau"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Penyusun / Guru</label>
                  <input
                    type="text"
                    value={moduleForm.authorName || ''}
                    onChange={(e) => setModuleForm({ ...moduleForm, authorName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deskripsi Lengkap Silabus Modul</label>
                <textarea
                  rows={3}
                  value={moduleForm.description || ''}
                  onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModuleModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Simpan Modul Tematik
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MANUAL LOAN AT DESK */}
      {manualLoanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-bold text-sm text-slate-900">Catat Sirkulasi di Meja Layanan</h3>
              <button onClick={() => setManualLoanModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Pilih Anggota Peminjam:</label>
                <select
                  value={manualLoanMemberId}
                  onChange={(e) => setManualLoanMemberId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  {members.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.memberNumber} - {m.gradeClass})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Pilih Buku yang Dipinjam:</label>
                <select
                  value={manualLoanBookId}
                  onChange={(e) => setManualLoanBookId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  {books.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.title} ({b.format} - Sisa Stok: {b.stockAvailable})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-800">
                <p className="font-semibold">Masa Peminjaman Standar:</p>
                <p className="text-[11px] mt-0.5">14 hari kalender terhitung sejak hari ini.</p>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setManualLoanModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleCreateManualLoan}
                  className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Proses Peminjaman
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD ANNOUNCEMENT */}
      {announcementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-bold text-sm text-slate-900">Buat Warta / Pengumuman Baru</h3>
              <button onClick={() => setAnnouncementModalOpen(false)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Judul Pengumuman</label>
                <input
                  type="text"
                  value={announcementForm.title || ''}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300"
                  placeholder="Contoh: Jadwal Bedah Buku Bulan Ini"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Isi Berita</label>
                <textarea
                  rows={3}
                  value={announcementForm.content || ''}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={announcementForm.pinned || false}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, pinned: e.target.checked })}
                  className="rounded text-teal-700"
                />
                <span className="font-semibold text-slate-700">Sematkan sebagai Banner Utama Beranda</span>
              </label>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  onClick={() => setAnnouncementModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    if (!announcementForm.title) return;
                    const newAnn: Announcement = {
                      id: `ann-${Date.now()}`,
                      title: announcementForm.title,
                      content: announcementForm.content || '',
                      date: new Date().toISOString().split('T')[0],
                      category: 'info',
                      pinned: announcementForm.pinned || false
                    };
                    onSaveAnnouncements([newAnn, ...announcements]);
                    setAnnouncementModalOpen(false);
                  }}
                  className="px-4 py-1.5 bg-teal-800 text-white rounded-lg font-bold"
                >
                  Publikasikan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
