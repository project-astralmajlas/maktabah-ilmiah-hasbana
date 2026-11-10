'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  BookItem, 
  ModuleItem, 
  Member, 
  Announcement, 
  LoanRecord, 
  UserReview, 
  BookFormat 
} from '@/types/library';
import { 
  getBooks, 
  saveBooks, 
  getModules, 
  saveModules, 
  getMembers, 
  saveMembers, 
  getAnnouncements, 
  saveAnnouncements, 
  getLoans, 
  saveLoans, 
  getReviews, 
  saveReviews, 
  getBookmarks, 
  toggleBookmark as storageToggleBookmark, 
  getActiveUser, 
  setActiveUser as storageSetActiveUser, 
  getCompletedModules, 
  markModuleCompleted, 
  resetAllDataToDefault, 
  exportDatabaseBackup, 
  importDatabaseBackup 
} from '@/lib/storage';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { CatalogGrid } from '@/components/CatalogGrid';
import { ThematicModulesView } from '@/components/ThematicModulesView';
import { MyLibraryView } from '@/components/MyLibraryView';
import { ReadingChallengesView } from '@/components/ReadingChallengesView';
import { AdminCMSView } from '@/components/AdminCMSView';
import { BookDetailModal } from '@/components/BookDetailModal';
import { EBookReaderModal } from '@/components/EBookReaderModal';
import { AudiobookPlayerModal } from '@/components/AudiobookPlayerModal';
import { Footer } from '@/components/Footer';
import { ToastContainer, ToastMessage } from '@/components/Toast';

export default function Home() {
  // Navigation & Filter state
  const [activeTab, setActiveTab] = useState<'catalog' | 'modules' | 'mylibrary' | 'challenges' | 'cms'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<BookFormat | 'all'>('all');

  // Core Data state
  const [books, setBooks] = useState<BookItem[]>(() => getBooks());
  const [modules, setModules] = useState<ModuleItem[]>(() => getModules());
  const [members, setMembers] = useState<Member[]>(() => getMembers());
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => getAnnouncements());
  const [loans, setLoans] = useState<LoanRecord[]>(() => getLoans());
  const [reviews, setReviews] = useState<UserReview[]>(() => getReviews());
  const [bookmarks, setBookmarks] = useState<string[]>(() => getBookmarks());
  const [activeUser, setActiveUser] = useState<Member | null>(() => getActiveUser());
  const [completedModules, setCompletedModules] = useState<string[]>(() => getCompletedModules());

  // Modals state
  const [selectedBookForDetail, setSelectedBookForDetail] = useState<BookItem | null>(null);
  const [readingBook, setReadingBook] = useState<BookItem | null>(null);
  const [listeningAudiobook, setListeningAudiobook] = useState<BookItem | null>(null);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setBooks(getBooks());
      setModules(getModules());
      setMembers(getMembers());
      setAnnouncements(getAnnouncements());
      setLoans(getLoans());
      setReviews(getReviews());
      setBookmarks(getBookmarks());
      setActiveUser(getActiveUser());
      setCompletedModules(getCompletedModules());
    };

    window.addEventListener('welib_storage_change', handleStorageChange);
    return () => {
      window.removeEventListener('welib_storage_change', handleStorageChange);
    };
  }, []);

  // Save handlers that update state and persistent storage
  const handleSaveBooks = (updatedBooks: BookItem[]) => {
    setBooks(updatedBooks);
    saveBooks(updatedBooks);
    addToast('Katalog buku berhasil diperbarui!', 'success');
  };

  const handleSaveModules = (updatedModules: ModuleItem[]) => {
    setModules(updatedModules);
    saveModules(updatedModules);
    addToast('Modul tematik kurikulum berhasil disimpan!', 'success');
  };

  const handleSaveMembers = (updatedMembers: Member[]) => {
    setMembers(updatedMembers);
    saveMembers(updatedMembers);
    addToast('Data anggota perpustakaan diperbarui.', 'success');
  };

  const handleSaveAnnouncements = (updatedAnnouncements: Announcement[]) => {
    setAnnouncements(updatedAnnouncements);
    saveAnnouncements(updatedAnnouncements);
    addToast('Warta perpustakaan diperbarui.', 'success');
  };

  const handleSaveLoans = (updatedLoans: LoanRecord[]) => {
    setLoans(updatedLoans);
    saveLoans(updatedLoans);
    addToast('Status sirkulasi peminjaman tersimpan.', 'success');
  };

  const handleSwitchUser = (member: Member) => {
    setActiveUser(member);
    storageSetActiveUser(member);
    addToast(`Beralih profil ke ${member.name} (${member.role === 'librarian' ? 'Pustakawan CMS' : member.role})`, 'info');
  };

  const handleToggleBookmark = (bookId: string) => {
    const updated = storageToggleBookmark(bookId);
    setBookmarks(updated);
    const isNowBookmarked = updated.includes(bookId);
    addToast(isNowBookmarked ? 'Buku ditambahkan ke koleksi disimpan' : 'Buku dihapus dari koleksi disimpan', 'info');
  };

  // Borrowing / Loan Handler
  const handleBorrowBook = (book: BookItem) => {
    if (!activeUser) return;

    // Check if already actively borrowed
    const existingLoan = loans.find(
      (l) => l.bookId === book.id && l.memberId === activeUser.id && l.status === 'active'
    );
    if (existingLoan) {
      addToast(`Buku "${book.title}" sudah ada di daftar peminjaman aktif Anda.`, 'info');
      setActiveTab('mylibrary');
      return;
    }

    if (book.format === 'physical' && book.stockAvailable <= 0) {
      addToast(`Maaf, seluruh stok fisik buku "${book.title}" sedang dipinjam. Silakan lakukan reservasi antrean.`, 'error');
      return;
    }

    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + 14);

    const newLoan: LoanRecord = {
      id: `loan-${Date.now()}`,
      bookId: book.id,
      bookTitle: book.title,
      bookCover: book.coverImage,
      format: book.format,
      memberId: activeUser.id,
      memberName: activeUser.name,
      memberClass: activeUser.gradeClass,
      loanDate: today.toISOString().split('T')[0],
      dueDate: due.toISOString().split('T')[0],
      status: 'active',
      renewCount: 0
    };

    const updatedLoans = [newLoan, ...loans];
    handleSaveLoans(updatedLoans);

    // Update available stock for physical book
    if (book.format === 'physical') {
      const updatedBooks = books.map((b) => {
        if (b.id === book.id) {
          return { ...b, stockAvailable: Math.max(0, b.stockAvailable - 1) };
        }
        return b;
      });
      handleSaveBooks(updatedBooks);
    }

    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    addToast(`Berhasil meminjam "${book.title}"! Masa pinjam: 14 hari.`, 'success');
  };

  // Return book handler
  const handleReturnBook = (loanId: string) => {
    const loan = loans.find((l) => l.id === loanId);
    if (!loan) return;

    const updatedLoans = loans.map((l) => {
      if (l.id === loanId) {
        return {
          ...l,
          status: 'returned' as const,
          returnDate: new Date().toISOString().split('T')[0]
        };
      }
      return l;
    });
    handleSaveLoans(updatedLoans);

    // Restore stock
    if (loan.format === 'physical') {
      const updatedBooks = books.map((b) => {
        if (b.id === loan.bookId) {
          return { ...b, stockAvailable: Math.min(b.stockTotal, b.stockAvailable + 1) };
        }
        return b;
      });
      handleSaveBooks(updatedBooks);
    }

    addToast(`Buku "${loan.bookTitle}" telah dikembalikan. Terima kasih!`, 'success');
  };

  // Renew loan handler
  const handleRenewLoan = (loanId: string) => {
    const updatedLoans = loans.map((l) => {
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
    handleSaveLoans(updatedLoans);
    addToast('Masa peminjaman berhasil diperpanjang +7 hari.', 'success');
  };

  // Add review handler
  const handleAddReview = (bookId: string, rating: number, comment: string) => {
    if (!activeUser) return;
    const newRev: UserReview = {
      id: `rev-${Date.now()}`,
      bookId,
      memberName: activeUser.name,
      memberRole: activeUser.gradeClass,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    const updatedReviews = [newRev, ...reviews];
    setReviews(updatedReviews);
    saveReviews(updatedReviews);

    // Update book rating count
    const bookReviews = updatedReviews.filter((r) => r.bookId === bookId);
    const avgRating = bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length;
    const updatedBooks = books.map((b) => {
      if (b.id === bookId) {
        return {
          ...b,
          rating: Number(avgRating.toFixed(2)),
          reviewsCount: bookReviews.length
        };
      }
      return b;
    });
    handleSaveBooks(updatedBooks);
    addToast('Ulasan dan rating buku Anda berhasil dipublikasikan!', 'success');
  };

  // Complete module handler
  const handleCompleteModule = (moduleId: string) => {
    const updated = markModuleCompleted(moduleId);
    setCompletedModules(updated);
    addToast('Selamat! Anda telah menyelesaikan modul dan meraih Lencana Literasi!', 'success');
  };

  // Database Backup handlers
  const handleExportData = () => {
    const jsonStr = exportDatabaseBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `welib-database-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('File cadangan database berhasil diunduh.', 'success');
  };

  const handleImportData = (jsonStr: string) => {
    const success = importDatabaseBackup(jsonStr);
    if (success) {
      setBooks(getBooks());
      setModules(getModules());
      setMembers(getMembers());
      setAnnouncements(getAnnouncements());
      setLoans(getLoans());
      setReviews(getReviews());
      addToast('Data database berhasil dipulihkan!', 'success');
    } else {
      addToast('Format file JSON tidak valid. Gagal memulihkan.', 'error');
    }
  };

  const handleResetData = () => {
    resetAllDataToDefault();
    setBooks(getBooks());
    setModules(getModules());
    setMembers(getMembers());
    setAnnouncements(getAnnouncements());
    setLoans(getLoans());
    setReviews(getReviews());
    addToast('Database berhasil direset ke standar Maktabah Ilmiah Hasbana.', 'info');
  };

  if (!activeUser) {
    return (
      <div className="min-h-screen bg-[#0c2f35] flex items-center justify-center text-white p-4">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-bold text-sm">Memuat Portal Maktabah Ilmiah Hasbana...</p>
        </div>
      </div>
    );
  }

  const bookmarkedBooksList = books.filter((b) => bookmarks.includes(b.id));
  const completedModulesList = modules.filter((m) => completedModules.includes(m.id));
  const activeLoansCount = loans.filter((l) => l.memberId === activeUser.id && l.status === 'active').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-400 selection:text-slate-950">
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (activeTab !== 'catalog') setActiveTab('catalog');
        }}
        activeUser={activeUser}
        allMembers={members}
        onSwitchUser={handleSwitchUser}
        activeLoansCount={activeLoansCount}
        bookmarkedCount={bookmarks.length}
      />

      {/* Top Hero Banner (Only on Catalog view for clean focus) */}
      {activeTab === 'catalog' && (
        <HeroBanner
          announcements={announcements}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
          totalBooksCount={books.length}
          totalModulesCount={modules.length}
          onExploreModules={() => setActiveTab('modules')}
        />
      )}

      {/* Main App Content Router */}
      <main className="flex-1">
        {activeTab === 'catalog' && (
          <CatalogGrid
            books={books}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFormat={selectedFormat}
            setSelectedFormat={setSelectedFormat}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectBook={(book) => setSelectedBookForDetail(book)}
            onOpenReader={(book) => setReadingBook(book)}
            onOpenAudiobook={(book) => setListeningAudiobook(book)}
            onBorrowBook={handleBorrowBook}
          />
        )}

        {activeTab === 'modules' && (
          <ThematicModulesView
            modules={modules}
            books={books}
            completedModuleIds={completedModules}
            onCompleteModule={handleCompleteModule}
            onOpenBook={(book) => setSelectedBookForDetail(book)}
            activeUser={activeUser}
            onGoToCMS={() => setActiveTab('cms')}
          />
        )}

        {activeTab === 'mylibrary' && (
          <MyLibraryView
            activeLoans={loans}
            allLoans={loans}
            bookmarkedBooks={bookmarkedBooksList}
            completedModules={completedModulesList}
            activeUser={activeUser}
            onReturnBook={handleReturnBook}
            onRenewLoan={handleRenewLoan}
            onOpenReader={(book) => setReadingBook(book)}
            onOpenAudiobook={(book) => setListeningAudiobook(book)}
            onSelectBook={(book) => setSelectedBookForDetail(book)}
            onRemoveBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'challenges' && (
          <ReadingChallengesView
            members={members}
            books={books}
            activeUser={activeUser}
            onSelectBook={(book) => setSelectedBookForDetail(book)}
          />
        )}

        {activeTab === 'cms' && (
          <AdminCMSView
            books={books}
            modules={modules}
            members={members}
            announcements={announcements}
            loans={loans}
            activeUser={activeUser}
            onSaveBooks={handleSaveBooks}
            onSaveModules={handleSaveModules}
            onSaveMembers={handleSaveMembers}
            onSaveAnnouncements={handleSaveAnnouncements}
            onSaveLoans={handleSaveLoans}
            onExportData={handleExportData}
            onImportData={handleImportData}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Book Detail Modal */}
      {selectedBookForDetail && (
        <BookDetailModal
          book={selectedBookForDetail}
          onClose={() => setSelectedBookForDetail(null)}
          isBookmarked={bookmarks.includes(selectedBookForDetail.id)}
          onToggleBookmark={handleToggleBookmark}
          onOpenReader={(book) => setReadingBook(book)}
          onOpenAudiobook={(book) => setListeningAudiobook(book)}
          onBorrowBook={handleBorrowBook}
          reviews={reviews}
          onAddReview={handleAddReview}
          activeUser={activeUser}
        />
      )}

      {/* Interactive E-Book Reader */}
      {readingBook && (
        <EBookReaderModal
          book={readingBook}
          onClose={() => setReadingBook(null)}
        />
      )}

      {/* Interactive Audiobook Player */}
      {listeningAudiobook && (
        <AudiobookPlayerModal
          book={listeningAudiobook}
          onClose={() => setListeningAudiobook(null)}
        />
      )}

      {/* Footer */}
      <Footer
        onGoToCatalog={() => setActiveTab('catalog')}
        onGoToModules={() => setActiveTab('modules')}
        onGoToCMS={() => setActiveTab('cms')}
      />
    </div>
  );
}
