'use client';

import React, { useState } from 'react';
import { 
  X, 
  Star, 
  BookOpen, 
  Headphones, 
  Bookmark, 
  MapPin, 
  Layers, 
  Heart, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Send,
  MessageSquare,
  Share2,
  Printer
} from 'lucide-react';
import { BookItem, UserReview, Member } from '@/types/library';

interface BookDetailModalProps {
  book: BookItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (bookId: string) => void;
  onOpenReader: (book: BookItem) => void;
  onOpenAudiobook: (book: BookItem) => void;
  onBorrowBook: (book: BookItem) => void;
  reviews: UserReview[];
  onAddReview: (bookId: string, rating: number, comment: string) => void;
  activeUser: Member;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenReader,
  onOpenAudiobook,
  onBorrowBook,
  reviews,
  onAddReview,
  activeUser
}) => {
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reservationSlipOpen, setReservationSlipOpen] = useState(false);

  if (!book) return null;

  const bookReviews = reviews.filter(r => r.bookId === book.id);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddReview(book.id, newRating, newComment);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-100 my-8 relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0c2f35] text-white">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">Detail Koleksi Maktabah Ilmiah Hasbana</span>
            <span className="text-slate-400">•</span>
            <span className="text-xs text-teal-200">ID: {book.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-teal-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Column: Cover & Quick Actions */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-48 sm:w-56 aspect-[3/4] rounded-xl overflow-hidden shadow-xl border border-slate-200 relative group">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => onToggleBookmark(book.id)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all ${
                    isBookmarked ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-700 hover:text-rose-500'
                  }`}
                  title={isBookmarked ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                >
                  <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-2.5 mt-5">
                {book.format === 'ebook' && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenReader(book);
                    }}
                    className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <BookOpen className="w-4 h-4" /> Buka E-Book Reader
                  </button>
                )}

                {book.format === 'audiobook' && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAudiobook(book);
                    }}
                    className="w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <Headphones className="w-4 h-4" /> Putar Audiobook Sekarang
                  </button>
                )}

                <button
                  onClick={() => onBorrowBook(book)}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Bookmark className="w-4 h-4" />
                  {book.format === 'physical' ? 'Ajukan Peminjaman Fisik' : 'Pinjam ke Akun Digital (14 Hari)'}
                </button>

                {book.format === 'physical' && (
                  <button
                    onClick={() => setReservationSlipOpen(true)}
                    className="w-full py-2 px-3 border border-amber-600/40 text-amber-800 hover:bg-amber-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-600" />
                    Cetak Resi Pengambilan Rak
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Information & Metadata */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-teal-50 text-teal-800 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-teal-200">
                    {book.category}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                    Tingkat: {book.level}
                  </span>
                  <span className="capitalize text-xs px-2.5 py-0.5 rounded-full font-medium bg-indigo-50 text-indigo-700">
                    Format: {book.format === 'ebook' ? 'E-Book Digital' : book.format === 'audiobook' ? 'Buku Audio' : 'Buku Fisik'}
                  </span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                  {book.title}
                </h2>
                <p className="text-sm text-slate-600 mt-1 font-medium">
                  Karya: <span className="text-teal-800 font-bold">{book.author}</span>
                </p>

                {/* Rating summary */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= Math.round(book.rating) ? 'fill-amber-400' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-slate-800 text-sm">{book.rating.toFixed(1)}</span>
                  <span className="text-xs text-slate-500">({book.reviewsCount + bookReviews.length} ulasan pembaca)</span>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Penerbit</span>
                  <span className="font-semibold text-slate-800">{book.publisher}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Tahun Terbit</span>
                  <span className="font-semibold text-slate-800">{book.year}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">No. ISBN</span>
                  <span className="font-semibold text-slate-800 font-mono text-[11px]">{book.isbn}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Klasifikasi DDC</span>
                  <span className="font-semibold text-teal-800 font-mono">{book.ddc}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Lokasi Rak</span>
                  <span className="font-semibold text-amber-800 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-600" /> {book.shelfLocation}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Ketersediaan Stok</span>
                  <span className={`font-semibold ${book.stockAvailable > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {book.stockAvailable} dari {book.stockTotal} eksemplar
                  </span>
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1.5">Sinopsis & Ringkasan</h4>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-white p-3 rounded-xl border border-slate-100">
                  {book.synopsis}
                </p>
              </div>

              {/* Tags */}
              {book.tags && book.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs text-slate-400 font-medium">Kata Kunci:</span>
                  {book.tags.map((tag, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 text-[11px] px-2 py-0.5 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Reservation Slip Modal Preview */}
          {reservationSlipOpen && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Printer className="w-4 h-4 text-amber-700" /> RESI PENGAMBILAN BUKU FISIK - MAKTABAH ILMIAH HASBANA
                </span>
                <button
                  onClick={() => setReservationSlipOpen(false)}
                  className="text-amber-800 hover:text-black font-semibold"
                >
                  Tutup
                </button>
              </div>
              <p className="text-slate-700">
                Tunjukkan resi ini kepada pustakawan piket di meja sirkulasi atau ambil langsung pada rak berikut:
              </p>
              <div className="bg-white p-3 rounded-lg border border-amber-200 font-mono text-slate-900 space-y-1">
                <div><strong>Judul:</strong> {book.title}</div>
                <div><strong>No Panggil DDC:</strong> {book.ddc}</div>
                <div><strong>Lokasi Rak:</strong> {book.shelfLocation}</div>
                <div><strong>Nama Pemesan:</strong> {activeUser.name} ({activeUser.memberNumber})</div>
                <div><strong>Kode Barcode:</strong> *HASBANA-{book.id.toUpperCase()}-RES*</div>
              </div>
              <p className="text-[11px] text-amber-700 italic">
                *Buku akan disisihkan selama 2 x 24 jam sebelum reservasi dialihkan.
              </p>
            </div>
          )}

          {/* Reviews & Student Discussion Section */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-teal-700" />
              Ulasan & Resensi Siswa / Guru ({bookReviews.length})
            </h3>

            {/* Submit new review form */}
            <form onSubmit={handleSubmitReview} className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
              <p className="text-xs font-semibold text-slate-700 mb-2">
                Tulis Ulasan sebagai: <span className="text-teal-800">{activeUser.name}</span>
              </p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-slate-500">Beri Bintang:</span>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setNewRating(s)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-4 h-4 ${s <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Bagikan kesan, hikmah, atau pelajaran yang Anda petik dari buku ini..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3 h-3" /> Kirim
                </button>
              </div>
            </form>

            {/* List of reviews */}
            <div className="space-y-2.5">
              {bookReviews.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-4">
                  Belum ada ulasan untuk buku ini. Jadilah pembaca pertama yang menulis resensi!
                </p>
              ) : (
                bookReviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{rev.memberName}</span>
                        <span className="text-[10px] text-slate-400">({rev.memberRole})</span>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {[1, 2, 3, 4, 5].map((st) => (
                          <Star
                            key={st}
                            className={`w-3 h-3 ${st <= rev.rating ? 'fill-amber-400' : 'text-slate-200'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{rev.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
