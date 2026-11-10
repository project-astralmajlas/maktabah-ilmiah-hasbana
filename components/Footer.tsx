'use client';

import React from 'react';
import { Library, ShieldCheck, Mail, Phone, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onGoToCMS: () => void;
  onGoToModules: () => void;
  onGoToCatalog: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGoToCMS, onGoToModules, onGoToCatalog }) => {
  return (
    <footer className="bg-[#082226] text-slate-300 border-t border-[#144750] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-400 flex items-center justify-center text-[#082226]">
                <Library className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">Maktabah <span className="text-emerald-400">Hasbana</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Portal perpustakaan digital dan sistem manajemen konten (CMS) Maktabah Ilmiah Hasbana: pusat literasi, modul keilmuan, e-book, audiobook, dan sirkulasi peminjaman buku sekolah modern.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] text-teal-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Sistem Terakreditasi Standar Nasional Perpustakaan (SNP)
            </div>
          </div>

          {/* Col 2: Akses Cepat */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Navigasi Layanan</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={onGoToCatalog} className="hover:text-emerald-400 transition-colors">
                  Katalog Koleksi & E-Book
                </button>
              </li>
              <li>
                <button onClick={onGoToModules} className="hover:text-emerald-400 transition-colors">
                  Modul Pembelajaran & Paket Buku Tematik
                </button>
              </li>
              <li>
                <button onClick={onGoToCMS} className="hover:text-emerald-400 transition-colors">
                  Panel Pustakawan & CMS Dinamis
                </button>
              </li>
              <li>
                <span className="text-slate-500">Peminjaman Buku Fisik & Mandiri</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Jam Layanan Perpustakaan */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Jam Sirkulasi Fisik</h4>
            <p className="text-slate-400">Senin - Kamis: 07.30 - 15.30 WIB</p>
            <p className="text-slate-400">Jumat: 07.30 - 11.30 & 13.00 - 15.30 WIB</p>
            <p className="text-emerald-400 font-semibold mt-2">Layanan E-Book & Audiobook Digital: 24 Jam Nonstop</p>
          </div>

          {/* Col 4: Kontak & Bantuan Pustaka */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Pusat Bantuan</h4>
            <div className="space-y-1.5 text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                Gedung Maktabah Ilmiah Hasbana Lt. 1 & 2
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                maktabah@hasbana.sch.id
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                (021) 789-2341 (Ext. 104)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Maktabah Ilmiah Hasbana. Hak cipta dilindungi undang-undang.</p>
          <p className="flex items-center gap-1">
            Mencerdaskan Generasi Melalui Pustaka Keilmuan & Adab
          </p>
        </div>
      </div>
    </footer>
  );
};
