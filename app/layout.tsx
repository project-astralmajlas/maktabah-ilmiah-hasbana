import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Maktabah Ilmiah Hasbana - Perpustakaan Digital & CMS',
  description: 'Platform perpustakaan digital dan sistem manajemen konten (CMS) Maktabah Ilmiah Hasbana: modul tematik, katalog e-book & buku fisik, audiobook player, peminjaman, serta panel admin.',
  openGraph: {
    title: 'Maktabah Ilmiah Hasbana - Perpustakaan Digital & CMS',
    description: 'Platform perpustakaan digital sekolah modern dengan katalog dinamis, modul literasi, e-book reader, dan sirkulasi peminjaman.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maktabah Ilmiah Hasbana - Perpustakaan Digital & CMS',
    description: 'Platform perpustakaan digital dan sistem manajemen konten (CMS) modern Maktabah Ilmiah Hasbana.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
