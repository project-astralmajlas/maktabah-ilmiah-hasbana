'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ArrowUpDown, 
  SlidersHorizontal, 
  Layers, 
  Sparkles,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { BookItem, BookFormat, EducationLevel, BookCategory } from '@/types/library';
import { BookCard } from './BookCard';

interface CatalogGridProps {
  books: BookItem[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedFormat: BookFormat | 'all';
  setSelectedFormat: (f: BookFormat | 'all') => void;
  bookmarks: string[];
  onToggleBookmark: (bookId: string) => void;
  onSelectBook: (book: BookItem) => void;
  onOpenReader: (book: BookItem) => void;
  onOpenAudiobook: (book: BookItem) => void;
  onBorrowBook: (book: BookItem) => void;
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({
  books,
  searchQuery,
  setSearchQuery,
  selectedFormat,
  setSelectedFormat,
  bookmarks,
  onToggleBookmark,
  onSelectBook,
  onOpenReader,
  onOpenAudiobook,
  onBorrowBook
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'title'>('popular');

  const categories: BookCategory[] = [
    'Sains & Teknologi',
    'Sastra & Fiksi',
    'Sejarah & Budaya',
    'Pengembangan Diri',
    'Matematika',
    'Bahasa & Kamus',
    'Komik & Grafis'
  ];

  // Filtering
  const filteredBooks = books.filter(b => {
    // Format
    if (selectedFormat !== 'all' && b.format !== selectedFormat) return false;
    // Category
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
    // Level
    if (selectedLevel !== 'all' && b.level !== selectedLevel && b.level !== 'Semua') return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = b.title.toLowerCase().includes(q);
      const matchAuthor = b.author.toLowerCase().includes(q);
      const matchPublisher = b.publisher.toLowerCase().includes(q);
      const matchSynopsis = b.synopsis.toLowerCase().includes(q);
      const matchTags = b.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchAuthor && !matchPublisher && !matchSynopsis && !matchTags) {
        return false;
      }
    }
    return true;
  });

  // Sorting
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.year - a.year;
      case 'title':
        return a.title.localeCompare(b.title);
      default: // popular
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    }
  });

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedFormat('all');
    setSelectedCategory('all');
    setSelectedLevel('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedFormat !== 'all' || selectedCategory !== 'all' || selectedLevel !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Filters Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-sm space-y-4">
        {/* Row 1: Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari judul buku, penulis, penerbit, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-700 focus:outline-none focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-xs text-slate-400 hover:text-slate-700 font-bold"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Urutkan:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded-xl text-xs py-1.5 px-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-700"
            >
              <option value="popular">Paling Populer</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="newest">Tahun Terbaru</option>
              <option value="title">Judul (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Genre
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Row 3: Education Level & Filter Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Jenjang Sekolah:</span>
            {(['all', 'SD', 'SMP', 'SMA'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {lvl === 'all' ? 'Semua Jenjang' : lvl}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500">
              Menampilkan <strong>{sortedBooks.length}</strong> judul
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-teal-700 hover:text-teal-900 font-bold underline"
              >
                Reset Semua Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Book Grid */}
      {sortedBooks.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Tidak ada buku yang sesuai kriteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau bersihkan filter format dan kategori untuk menemukan koleksi lainnya.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 bg-teal-800 text-white rounded-xl text-xs font-semibold hover:bg-teal-900 transition-colors"
          >
            Tampilkan Semua Buku
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {sortedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isBookmarked={bookmarks.includes(book.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectBook={onSelectBook}
              onOpenReader={onOpenReader}
              onOpenAudiobook={onOpenAudiobook}
              onBorrowBook={onBorrowBook}
            />
          ))}
        </div>
      )}
    </div>
  );
};
