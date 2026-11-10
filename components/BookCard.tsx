'use client';

import React from 'react';
import { 
  BookOpen, 
  Headphones, 
  Bookmark, 
  Star, 
  MapPin, 
  Check, 
  Heart,
  Volume2,
  Clock,
  Layers
} from 'lucide-react';
import { BookItem } from '@/types/library';

interface BookCardProps {
  book: BookItem;
  isBookmarked: boolean;
  onToggleBookmark: (bookId: string) => void;
  onSelectBook: (book: BookItem) => void;
  onOpenReader: (book: BookItem) => void;
  onOpenAudiobook: (book: BookItem) => void;
  onBorrowBook: (book: BookItem) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  isBookmarked,
  onToggleBookmark,
  onSelectBook,
  onOpenReader,
  onOpenAudiobook,
  onBorrowBook
}) => {
  const getFormatBadge = () => {
    switch (book.format) {
      case 'ebook':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            <BookOpen className="w-2.5 h-2.5" /> E-Book
          </span>
        );
      case 'audiobook':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            <Headphones className="w-2.5 h-2.5" /> Audio
          </span>
        );
      case 'physical':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            <Bookmark className="w-2.5 h-2.5" /> Buku Fisik
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group hover:-translate-y-1">
      {/* Cover image & Floating Badges */}
      <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onSelectBook(book)}>
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Dark overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
          <span className="text-white text-xs font-semibold underline underline-offset-2">
            Klik untuk detail & sinopsis →
          </span>
        </div>

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
          {getFormatBadge()}
          {book.level !== 'Semua' && (
            <span className="bg-slate-900/80 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
              {book.level}
            </span>
          )}
        </div>

        {/* Bookmark heart button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(book.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow ${
            isBookmarked 
              ? 'bg-rose-500 text-white' 
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
          }`}
          title={isBookmarked ? 'Hapus dari favorit' : 'Simpan ke favorit'}
        >
          <Heart className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
        </button>

        {/* Bottom shelf location or digital badge */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          {book.format === 'physical' ? (
            <span className="bg-slate-900/85 text-amber-300 text-[10px] px-2 py-0.5 rounded-md font-medium flex items-center gap-1 backdrop-blur-sm truncate max-w-full">
              <MapPin className="w-2.5 h-2.5 flex-shrink-0" /> {book.shelfLocation}
            </span>
          ) : (
            <span className="bg-emerald-950/85 text-emerald-300 text-[10px] px-2 py-0.5 rounded-md font-medium flex items-center gap-1 backdrop-blur-sm">
              <Check className="w-2.5 h-2.5" /> Akses Instan
            </span>
          )}
        </div>
      </div>

      {/* Book Information */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
              {book.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{book.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[10px]">({book.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectBook(book)}
            className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-teal-700 cursor-pointer transition-colors leading-snug"
            title={book.title}
          >
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-xs text-slate-600 mt-1 truncate">
            {book.author}
          </p>

          {/* Additional details */}
          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-2">
            {book.pages && <span>{book.pages} hlm</span>}
            {book.durationMinutes && <span>{book.durationMinutes} mnt audio</span>}
            <span>•</span>
            <span>{book.year}</span>
          </div>
        </div>

        {/* Action button based on format */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5">
          {book.format === 'ebook' && (
            <button
              onClick={() => onOpenReader(book)}
              className="flex-1 py-1.5 px-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Baca E-Book
            </button>
          )}

          {book.format === 'audiobook' && (
            <button
              onClick={() => onOpenAudiobook(book)}
              className="flex-1 py-1.5 px-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Dengar Audio
            </button>
          )}

          {book.format === 'physical' && (
            <button
              onClick={() => onBorrowBook(book)}
              className="flex-1 py-1.5 px-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Bookmark className="w-3.5 h-3.5" />
              Pinjam / Reservasi
            </button>
          )}

          <button
            onClick={() => onSelectBook(book)}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            title="Lihat detail lengkap"
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};
