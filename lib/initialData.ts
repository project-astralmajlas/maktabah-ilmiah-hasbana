import { BookItem, ModuleItem, Member, Announcement, LoanRecord, UserReview } from '@/types/library';

export const INITIAL_BOOKS: BookItem[] = [
  {
    id: 'book-1',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    publisher: 'Bentang Pustaka',
    year: 2005,
    isbn: '978-979-3062-79-2',
    ddc: '899.221 Hir l',
    category: 'Sastra & Fiksi',
    format: 'ebook',
    level: 'SMP',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Kisah perjuangan sepuluh anak di Belitung dari keluarga miskin yang bersekolah di sebuah sekolah Muhammadiyah yang penuh keterbatasan. Penuh dengan inspirasi keteguhan hati, persahabatan sejati, dan kecintaan mendalam pada ilmu pengetahuan.',
    shelfLocation: 'Rak Sastra A-03',
    stockTotal: 10,
    stockAvailable: 6,
    rating: 4.9,
    reviewsCount: 142,
    pages: 529,
    language: 'Bahasa Indonesia',
    tags: ['Inspiratif', 'Persahabatan', 'Pendidikan', 'Novel Klasik'],
    isFeatured: true,
    isPopular: true,
    createdAt: '2025-01-10',
    chapters: [
      {
        id: 'c1',
        title: 'Bab 1: Sepuluh Murid Baru',
        content: `Pagi itu, waktu aku masih kecil, aku duduk di bangku panjang di depan sebuah kelas. Sebatang pohon filicium tua yang rindang meneduhiku. Ayahku duduk di sampingku, memeluk pundakku dengan kedua lengannya dan tersenyum mengangguk-angguk pada setiap orangtua dan anak-anaknya yang duduk berderet-deret di bangku panjang lain di depan kami.

Hari itu adalah hari yang agak penting: hari pertama masuk sekolah bagi anak-anak di Belitong timur. Di ujung bangku-bangku panjang tadi ada sebuah pintu terbuka. Kusen pintu itu miring karena salah satu pasaknya terlepas. Di dalam kelas seorang bapak tua berwajah sabar, Pak Harfan, dan seorang guru muda berjilbab, Bu Muslimah, sedang cemas menghitung jumlah anak yang mendaftar.

Syarat berdirinya sekolah Muhammadiyah di desa Gantong itu minimal harus ada sepuluh murid. Kalau kurang dari sepuluh, sekolah terpaksa ditutup oleh pengawas sekolah daerah. Dan saat jarum jam hampir menunjuk pukul sebelas, anak kesepuluh akhirnya tiba berlari terengah-engah... Harun, anak laki-laki istimewa yang menyelamatkan nasib sekolah kami!`
      },
      {
        id: 'c2',
        title: 'Bab 2: Antara Menara Babel dan Pohon Filicium',
        content: `Sekolah kami bukan sekolah biasa. Gedungnya reyot, atapnya bocor di kala hujan lebat, dan papannya rapuh dimakan rayap. Namun di ruangan berdebu itulah Bu Muslimah menyalakan lilin peradaban dalam kalbu kami.

"Hiduplah untuk memberi sebanyak-banyaknya, bukan untuk menerima sebanyak-banyaknya," nasihat Bu Mus yang membekas seumur hidupku. Kami belajar mencintai rumus matematika dari Lintang si jenius pesisir, mengagumi keindahan puisi dari Mahar, dan memahami arti ketabahan dari Sahara.`
      },
      {
        id: 'c3',
        title: 'Bab 3: Jenius dari Pesisir Pantai',
        content: `Setiap pagi, sebelum kokok ayam jantan mereda, Lintang sudah mengayuh sepeda ontel tuanya sejauh empat puluh kilometer melintasi rawa buaya hanya demi secuil ilmu. Kakinya sering lecet dan rantai sepedanya kerap putus, namun matanya selalu berbinar ketika membuka lembaran buku sains di perpustakaan kecil kami.`
      }
    ]
  },
  {
    id: 'book-2',
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    publisher: 'Hasta Mitra / Lentera Dipantara',
    year: 1980,
    isbn: '978-979-97312-3-4',
    ddc: '899.221 Pra b',
    category: 'Sastra & Fiksi',
    format: 'ebook',
    level: 'SMA',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Karya agung Tetralogi Buru yang mengisahkan pergulatan Minke, seorang priyayi muda pribumi terpelajar di era kolonial Hindia Belanda, serta kekagumannya pada sosok Nyai Ontosoroh, perempuan mandiri yang mendobrak feodalisme dan ketidakadilan.',
    shelfLocation: 'Rak Sastra B-01',
    stockTotal: 8,
    stockAvailable: 3,
    rating: 4.95,
    reviewsCount: 188,
    pages: 535,
    language: 'Bahasa Indonesia',
    tags: ['Sejarah', 'Perjuangan', 'Emansipasi', 'Klasik'],
    isFeatured: true,
    isPopular: true,
    createdAt: '2025-01-15',
    chapters: [
      {
        id: 'c1',
        title: 'Bab 1: Suara dari Masa Silam',
        content: `Orang memanggilku Minke. Namaku sendiri... sementara ini tak perlu kusebutkan. Bukan karena gila misteri, melainkan karena aku tahu belum saatnya dunia tahu seluruh lembaranku.

Aku seorang pribumi yang beruntung bisa mengecap pendidikan di HBS Surabaya, sekolah untuk anak-anak Belanda dan Eropa. Di sana aku belajar ilmu pengetahuan modern bangsa Eropa, mengagumi revolusi industri dan sastra dunia. Tetapi di sanalah pula aku mulai menyadari jurang pemisah antara penguasa dan rakyat bangsaku.`
      },
      {
        id: 'c2',
        title: 'Bab 2: Pertemuan di Wonokromo',
        content: `Suatu sore temanku Robert Suurhof mengajakku ke sebuah perkebunan tebu luas di Wonokromo milik Tuan Mellema. Di sanalah aku pertama kali berjumpa dengan Annelies, gadis Indo yang cantik luar biasa, dan ibunya, Nyai Ontosoroh.

Wanita itu bukan nyai biasa yang tunduk tanpa suara. Tutur katanya tajam, penguasaan administrasi perusahaannya melebihi para pria Eropa, dan pandangan hidupnya begitu merdeka. Beliau mengajariku arti martabat manusia sejati.`
      }
    ]
  },
  {
    id: 'book-3',
    title: 'Kosmos & Misteri Alam Semesta',
    author: 'Dr. Carl Sagan (Terjemahan Tim Sains Nusantara)',
    publisher: 'Gramedia Pustaka Utama',
    year: 2021,
    isbn: '978-602-06-4412-1',
    ddc: '523.1 Sag k',
    category: 'Sains & Teknologi',
    format: 'ebook',
    level: 'SMP',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Eksplorasi memukau tentang 15 miliar tahun evolusi kosmik, asal-usul materi, tata surya, lubang hitam, dan perjalanan peradaban manusia dalam memahami alam semesta dengan bahasa puitis dan akurat secara ilmiah.',
    shelfLocation: 'Rak Sains C-02',
    stockTotal: 12,
    stockAvailable: 8,
    rating: 4.88,
    reviewsCount: 95,
    pages: 412,
    language: 'Bahasa Indonesia',
    tags: ['Astronomi', 'Fisika', 'Sains Populer', 'Kosmologi'],
    isFeatured: true,
    isPopular: true,
    createdAt: '2025-02-01',
    chapters: [
      {
        id: 'c1',
        title: 'Bab 1: Tepi Laut Kosmik',
        content: `Kosmos adalah segalanya yang pernah ada, yang sedang ada, atau yang akan pernah ada. Saat kita merenungkan kosmos, kita merasakan getaran keagungan: rasa dingin di sepanjang punggung, suara yang tercekat, perasaan samar seolah ingatan tentang jatuh dari tempat yang sangat tinggi.

Kita tahu kita mendekati misteri terbesar. Ukuran dan umur kosmos melampaui pemahaman manusia biasa. Bumi kita hanyalah sebutir debu kecil yang melayang dalam kegelapan luas di tepian sebuah galaksi spiral biasa di antara ratusan miliar galaksi lainnya.`
      },
      {
        id: 'c2',
        title: 'Bab 2: Dari Partikel Menjadi Kehidupan',
        content: `Kita terbuat dari materi bintang. Setiap atom karbon di kulit kita, kalsium di tulang kita, dan zat besi di darah kita ditempa di jantung bintang-bintang raksasa miliaran tahun lalu sebelum mereka meledak sebagai supernova. Kita adalah cara kosmos untuk mengenal dirinya sendiri.`
      }
    ]
  },
  {
    id: 'book-4',
    title: 'Filosofi Teras: Stoisisme untuk Generasi Muda',
    author: 'Henry Manampiring',
    publisher: 'Penerbit Buku Kompas',
    year: 2019,
    isbn: '978-602-412-518-9',
    ddc: '188 Man f',
    category: 'Pengembangan Diri',
    format: 'audiobook',
    level: 'SMA',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Panduan praktis filsafat Stoisisme Yunani Kuno yang disesuaikan untuk pelajar dan generasi muda Indonesia. Mengajarkan cara mengelola overthinking, kecemasan masa depan, relasi sosial, serta fokus pada hal-hal yang berada di bawah kendali kita.',
    shelfLocation: 'Rak Psikologi D-01',
    stockTotal: 15,
    stockAvailable: 9,
    rating: 4.92,
    reviewsCount: 230,
    durationMinutes: 340,
    language: 'Bahasa Indonesia',
    tags: ['Mental Health', 'Stoicism', 'Resiliensi', 'Mindfulness'],
    isFeatured: true,
    isPopular: true,
    createdAt: '2025-01-20',
    audioTracks: [
      {
        id: 'track-1',
        title: 'Pengantar: Mengapa Anak Muda Butuh Stoisisme?',
        durationSeconds: 420,
        narrator: 'Henry Manampiring & Tim Audio Maktabah Hasbana'
      },
      {
        id: 'track-2',
        title: 'Dikotomi Kendali: Memilah Hal yang Bisa dan Tidak Bisa Kita Atur',
        durationSeconds: 580,
        narrator: 'Henry Manampiring'
      },
      {
        id: 'track-3',
        title: 'Mengatasi Overthinking, FOMO, dan Tekanan Medsos',
        durationSeconds: 610,
        narrator: 'Henry Manampiring'
      }
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Bab 1: Survei Khawatir Nasional',
        content: `Lebih dari separuh anak muda mengaku sering cemas memikirkan hal-hal yang belum tentu terjadi: ujian sekolah, masa depan karier, komentar orang lain di media sosial, hingga status pertemanan.

Filsafat Stoa yang dicetuskan oleh Zeno dari Citium lebih dari 2000 tahun lalu memiliki jawaban yang sangat segar: Dikotomi Kendali (The Dichotomy of Control). Hidup ini terbagi dua: hal yang ada di bawah kendali kita, dan hal yang berada di luar kendali kita.`
      }
    ]
  },
  {
    id: 'book-5',
    title: 'Sejarah Maritim Nusantara: Dari Sriwijaya Hingga VOC',
    author: 'Prof. Adrian B. Lapian',
    publisher: 'Komunitas Bambu',
    year: 2018,
    isbn: '978-602-9402-45-7',
    ddc: '959.8 Lap s',
    category: 'Sejarah & Budaya',
    format: 'physical',
    level: 'SMA',
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Kajian mendalam tentang identitas sejati bangsa Indonesia sebagai bangsa pelaut tangguh. Melacak jalur rempah purba, teknologi perahu pinisi dan cadik, hingga jaringan pelabuhan internasional dari Selat Malaka sampai Banda.',
    shelfLocation: 'Rak Sejarah E-05 (Lantai 2)',
    stockTotal: 5,
    stockAvailable: 2,
    rating: 4.85,
    reviewsCount: 64,
    pages: 380,
    language: 'Bahasa Indonesia',
    tags: ['Maritim', 'Jalur Rempah', 'Sejarah Indonesia', 'Budaya'],
    isFeatured: false,
    isPopular: false,
    createdAt: '2025-01-25'
  },
  {
    id: 'book-6',
    title: 'Petualangan Matematika & Logika Seru',
    author: 'Dra. Sri Wahyuni & Tim Edukasi Cerdas',
    publisher: 'Erlangga Edukasi',
    year: 2023,
    isbn: '978-602-298-901-2',
    ddc: '510 Wah p',
    category: 'Matematika',
    format: 'ebook',
    level: 'SD',
    coverImage: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Buku komik dan teka-teki visual matematika yang mengubah angka dan geometri menjadi petualangan detektif menyenangkan. Cocok untuk mengasah logika berpikir komputasional anak sejak dini.',
    shelfLocation: 'Rak Edukasi Anak F-01',
    stockTotal: 14,
    stockAvailable: 11,
    rating: 4.79,
    reviewsCount: 78,
    pages: 184,
    language: 'Bahasa Indonesia',
    tags: ['Matematika Menyenangkan', 'Logika', 'Komik Edukasi', 'SD'],
    isFeatured: false,
    isPopular: true,
    createdAt: '2025-02-05',
    chapters: [
      {
        id: 'c1',
        title: 'Misteri Sandi Jam Raksasa',
        content: `Detektif Alif dan Maya menemukan secarik kertas dengan pola angka unik: 2, 4, 8, 16, ... Angka berapakah yang harus diputar pada roda jam raksasa agar pintu ruang harta karun terbuka?

"Aha! Ini adalah pola perkalian dua atau eksponen bilangan dua!" seru Maya gembira.`
      }
    ]
  },
  {
    id: 'book-7',
    title: 'Kecerdasan Buatan (AI) & Etika Masa Depan',
    author: 'Ir. Budi Rahardjo, Ph.D.',
    publisher: 'ITB Press & Media Literasi',
    year: 2024,
    isbn: '978-623-297-302-1',
    ddc: '006.3 Rah k',
    category: 'Sains & Teknologi',
    format: 'ebook',
    level: 'SMA',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Panduan komprehensif memahami revolusi Artificial Intelligence, Large Language Models, Generative AI, dan tantangan etika sosial bagi pelajar dan pendidik di abad ke-21.',
    shelfLocation: 'Rak Teknologi Digital C-08',
    stockTotal: 12,
    stockAvailable: 7,
    rating: 4.93,
    reviewsCount: 112,
    pages: 290,
    language: 'Bahasa Indonesia',
    tags: ['Artificial Intelligence', 'Informatika', 'Etika Digital', 'STEM'],
    isFeatured: true,
    isPopular: true,
    createdAt: '2025-02-10',
    chapters: [
      {
        id: 'c1',
        title: 'Bab 1: Mesin yang Belajar Berpikir',
        content: `Ketika kita mengetik pertanyaan ke mesin pencari atau asisten AI, apa sebenarnya yang terjadi di balik layar? AI modern bukan sihir, melainkan gabungan luar biasa dari aljabar linier, kalkulus probabilitas, dan miliaran data teks yang diolah oleh jaringan saraf tiruan (neural networks).`
      },
      {
        id: 'c2',
        title: 'Bab 2: Keterampilan Abad 21 yang Tak Tergantikan',
        content: `AI dapat menulis puisi dan menyusun kode program dalam hitungan detik. Namun hal yang membuat manusia tetap unik adalah empati, integritas etis, rasa ingin tahu yang mendalam, dan keberanian mengambil keputusan moral demi kesejahteraan bersama.`
      }
    ]
  },
  {
    id: 'book-8',
    title: 'Audiobook: Dongeng & Fabel Nusantara Berkarakter',
    author: 'Murti Bunanta (Disuarakan Sanggar Cerita Nusantara)',
    publisher: 'Kelompok Pencinta Bacaan Anak',
    year: 2022,
    isbn: '978-979-8802-12-8',
    ddc: '398.2 Bun d',
    category: 'Sastra & Fiksi',
    format: 'audiobook',
    level: 'SD',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Kumpulan cerita rakyat dan fabel tradisional dari Sabang sampai Merauke yang sarat pesan moral luhur: kejujuran, tolong-menolong, dan keberanian membela kebenaran dengan tata suara teater audio imersif.',
    shelfLocation: 'Rak Media Audio SD-02',
    stockTotal: 20,
    stockAvailable: 17,
    rating: 4.88,
    reviewsCount: 86,
    durationMinutes: 180,
    language: 'Bahasa Indonesia',
    tags: ['Cerita Rakyat', 'Karakter', 'Audio Imersif', 'SD'],
    isFeatured: false,
    isPopular: false,
    createdAt: '2025-01-18',
    audioTracks: [
      {
        id: 'ab-t1',
        title: 'Legenda Danau Toba & Pesan Menjaga Janji',
        durationSeconds: 380,
        narrator: 'Kak Didit & Teater Bunanta'
      },
      {
        id: 'ab-t2',
        title: 'Kancil dan Buaya: Kecerdikan yang Bertanggung Jawab',
        durationSeconds: 310,
        narrator: 'Bunda Rini'
      }
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Pengantar Nilai Budi Pekerti',
        content: `Cerita lisan adalah urat nadi kebudayaan Indonesia. Melalui fabel binatang dan legenda alam, leluhur kita menitipkan kearifan hidup agar senantiasa selaras dengan sesama dan alam ciptaan-Nya.`
      }
    ]
  },
  {
    id: 'book-9',
    title: 'Biologi Sel & Konservasi Hutan Tropis Indonesia',
    author: 'Dr. Jatna Supriatna',
    publisher: 'Yayasan Obor Indonesia',
    year: 2020,
    isbn: '978-602-433-789-0',
    ddc: '570 Sup b',
    category: 'Sains & Teknologi',
    format: 'physical',
    level: 'SMA',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Referensi ilmiah berstandar tinggi yang mengupas keanekaragaman hayati (biodiversitas) hutan hujan tropis Sumatra, Kalimantan, hingga Papua, serta solusi konservasi berbasis sains genetik dan ekologi.',
    shelfLocation: 'Rak Biologi C-14',
    stockTotal: 6,
    stockAvailable: 4,
    rating: 4.81,
    reviewsCount: 42,
    pages: 456,
    language: 'Bahasa Indonesia',
    tags: ['Biodiversitas', 'Biologi', 'Lingkungan', 'SMA'],
    isFeatured: false,
    isPopular: false,
    createdAt: '2025-02-12'
  },
  {
    id: 'book-10',
    title: 'Atomic Habits (Edisi Pelajar): Perubahan Kecil Hasil Luar Biasa',
    author: 'James Clear (Adaptasi Tim Literasi Sekolah)',
    publisher: 'Gramedia Pustaka Utama',
    year: 2021,
    isbn: '978-602-06-3317-0',
    ddc: '158.1 Cle a',
    category: 'Pengembangan Diri',
    format: 'ebook',
    level: 'Umum',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Buku best-seller dunia tentang bagaimana kebiasaan mikro 1% setiap hari dapat menghasilkan transformasi akademis, kesehatan, dan kepribadian yang eksponensial dalam jangka panjang.',
    shelfLocation: 'Rak Pengembangan Diri D-03',
    stockTotal: 15,
    stockAvailable: 10,
    rating: 4.96,
    reviewsCount: 310,
    pages: 350,
    language: 'Bahasa Indonesia',
    tags: ['Produktivitas', 'Kebiasaan', 'Disiplin', 'Belajar Efektif'],
    isFeatured: true,
    isPopular: true,
    createdAt: '2025-01-05',
    chapters: [
      {
        id: 'c1',
        title: 'Bab 1: Kekuatan Mengejutkan dari Kebiasaan Kecil',
        content: `Sangat mudah melebih-lebihkan arti penting satu momen penentu dan meremehkan nilai membuat perbaikan kecil sehari-hari. Jika Anda bisa menjadi 1% lebih baik setiap hari selama satu tahun, Anda akan berakhir 37 kali lebih baik pada akhir tahun!`
      },
      {
        id: 'c2',
        title: 'Bab 2: Empat Hukum Perubahan Perilaku',
        content: `Bagaimana membangun kebiasaan baik: 1. Buat menjadi terlihat (Make it obvious), 2. Buat menjadi menarik (Make it attractive), 3. Buat menjadi mudah (Make it easy), 4. Buat menjadi memuaskan (Make it satisfying).`
      }
    ]
  },
  {
    id: 'book-11',
    title: 'Tenggelamnya Kapal Van der Wijck',
    author: 'Hamka (Haji Abdul Malik Karim Amrullah)',
    publisher: 'Bulan Bintang',
    year: 1938,
    isbn: '978-979-418-055-6',
    ddc: '899.221 Ham t',
    category: 'Sastra & Fiksi',
    format: 'ebook',
    level: 'SMA',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Kisah cinta pilu antara Zainuddin dan Hayati yang terbentur dinding adat Minangkabau yang kaku. Menghadirkan refleksi mendalam mengenai kesetiaan, keteguhan hati seniman, dan kemanusiaan universal.',
    shelfLocation: 'Rak Sastra Klasik A-01',
    stockTotal: 8,
    stockAvailable: 5,
    rating: 4.87,
    reviewsCount: 155,
    pages: 280,
    language: 'Bahasa Indonesia',
    tags: ['Sastra Klasik', 'Hamka', 'Romansa Historis', 'Pujangga Baru'],
    isFeatured: false,
    isPopular: true,
    createdAt: '2025-01-22',
    chapters: [
      {
        id: 'c1',
        title: 'Bab 1: Anak Pisang di Batipuh',
        content: `Zainuddin adalah pemuda yatim piatu berdarah campuran Minang dan Bugis. Ketika ia menginjakkan kaki di Batipuh, tanah asal ayahnya, ia berharap menemukan kehangatan keluarga. Namun masyarakat setempat masih memandangnya sebagai orang luar karena garis keturunan matrilineal yang ketat.`
      }
    ]
  },
  {
    id: 'book-12',
    title: 'Kamus Besar Bahasa Indonesia & Ejaan Mutakhir',
    author: 'Badan Pengembangan dan Pembinaan Bahasa Kemendikbudristek',
    publisher: 'Balai Pustaka',
    year: 2023,
    isbn: '978-979-407-182-3',
    ddc: '499.221 Bad k',
    category: 'Bahasa & Kamus',
    format: 'physical',
    level: 'Umum',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Edisi terlengkap memuat lebih dari 120.000 lema kosakata bahasa Indonesia, istilah serapan sains-teknologi, tata bahasa baku, dan pedoman penulisan karya ilmiah.',
    shelfLocation: 'Meja Referensi Utama R-01',
    stockTotal: 4,
    stockAvailable: 3,
    rating: 4.9,
    reviewsCount: 38,
    pages: 1420,
    language: 'Bahasa Indonesia',
    tags: ['KBBI', 'Referensi', 'Pedoman Bahasa', 'Kamus'],
    isFeatured: false,
    isPopular: false,
    createdAt: '2025-01-08'
  }
];

export const INITIAL_MODULES: ModuleItem[] = [
  {
    id: 'mod-1',
    title: 'Modul Literasi Sains: Krisis Iklim & Transisi Energi Hijau',
    subtitle: 'Menjelajahi sains perubahan iklim, energi terbarukan, dan aksi nyata pelestarian ekosistem bumi.',
    targetLevel: 'SMP',
    subject: 'Ilmu Pengetahuan Alam & Geografi',
    estimatedHours: 6,
    bannerImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    description: 'Modul pembelajaran tematik berbasis bacaan terpilih Maktabah Ilmiah Hasbana untuk membantu siswa memahami fenomena efek rumah kaca, transisi energi surya dan angin, serta langkah praktis konservasi di lingkungan sekolah.',
    learningObjectives: [
      'Menganalisis mekanisme terjadinya pemanasan global melalui data ilmiah terkini.',
      'Membandingkan efisiensi sumber energi fosil dengan energi terbarukan (solar, angin, hidro).',
      'Merancang rencana aksi nyata pengurangan jejak karbon di kelas dan rumah.'
    ],
    bookIds: ['book-3', 'book-9'],
    badgeName: 'Pahlawan Bumi Hijau',
    badgeIcon: 'Leaf',
    authorName: 'Ibu Ratna Kumalasari, M.Pd (Guru IPA & Pegiat Adiwiyata)',
    createdAt: '2025-01-14',
    tasks: [
      {
        id: 't-1',
        title: 'Refleksi Bacaan Buku Sains Kosmos & Ekosistem',
        description: 'Tuliskan rangkuman 1 paragraf mengenai bagaimana keterkaitan antara atmosfer bumi dengan keberlangsungan makhluk hidup berdasarkan bacaan.',
        type: 'reflection'
      },
      {
        id: 't-2',
        title: 'Kuis Pemahaman Iklim & Energi Terbarukan',
        description: 'Jawab 3 pertanyaan berikut untuk menguji pemahaman konsep.',
        type: 'quiz',
        quizQuestions: [
          {
            id: 'q1',
            question: 'Gas manakah yang memiliki kontribusi terbesar terhadap efek rumah kaca antropogenik akibat pembakaran bahan bakar fosil?',
            options: ['Oksigen (O2)', 'Karbon Dioksida (CO2)', 'Helium (He)', 'Nitrogen (N2)'],
            correctAnswerIndex: 1,
            explanation: 'CO2 yang dihasilkan dari pembakaran batubara, minyak bumi, dan deforestasi merupakan penyumbang utama pemanasan global.'
          },
          {
            id: 'q2',
            question: 'Manakah di bawah ini yang merupakan sumber energi bersih dan terbarukan yang melimpah di Indonesia?',
            options: ['Tenaga Surya & Panas Bumi (Geothermal)', 'Minyak Mentah Bumi', 'Gas Elpiji', 'Batubara Kualitas Rendah'],
            correctAnswerIndex: 0,
            explanation: 'Sebagai negara tropis di cincin api, Indonesia memiliki potensi surya dan panas bumi terbesar di dunia.'
          },
          {
            id: 'q3',
            question: 'Apa peran utama hutan hujan tropis bagi kestabilan iklim global?',
            options: ['Menghabiskan sumber air tanah', 'Menyerap karbon dan memproduksi oksigen sebagai paru-paru dunia', 'Mencegah terjadinya hujan', 'Menghilangkan lapisan ozon'],
            correctAnswerIndex: 1,
            explanation: 'Hutan hujan tropis bertindak sebagai penyerap karbon raksasa (carbon sink) yang menstabilkan cuaca global.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-2',
    title: 'Eksplorasi Sastra Klasik Nusantara & Profil Pelajar Pancasila',
    subtitle: 'Mendedah nilai ketabahan, kesetaraan sosial, dan integritas dalam karya sastrawan terkemuka Indonesia.',
    targetLevel: 'SMA',
    subject: 'Bahasa & Sastra Indonesia',
    estimatedHours: 8,
    bannerImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    description: 'Modul kurikulum literasi kritis yang membedah mahakarya Pramoedya Ananta Toer, Andrea Hirata, dan Hamka. Memupuk empati kemanusiaan, pemikiran merdeka, dan cinta tanah air.',
    learningObjectives: [
      'Mengidentifikasi kritik sosial terhadap feodalisme dan kolonialisme dalam novel klasik.',
      'Menghubungkan nilai integritas Nyai Ontosoroh dan Bu Muslimah dengan tantangan generasi muda saat ini.',
      'Menulis esai argumentatif reflektif tentang peran pendidikan dalam mengangkat harkat kemanusiaan.'
    ],
    bookIds: ['book-1', 'book-2', 'book-11'],
    badgeName: 'Penjelajah Sastra Luhur',
    badgeIcon: 'BookOpen',
    authorName: 'Bapak Ahmad Fauzi, S.S (Pustakawan & Guru Bahasa)',
    createdAt: '2025-01-20',
    tasks: [
      {
        id: 't-21',
        title: 'Analisis Karakter Nyai Ontosoroh',
        description: 'Kemukakan alasan mengapa sosok Nyai Ontosoroh dianggap sebagai pelopor kemandirian perempuan pribumi di zamannya.',
        type: 'reflection'
      },
      {
        id: 't-22',
        title: 'Kuis Apresiasi Sastra Indonesia',
        description: 'Uji wawasan Anda mengenai karya sastra legendaris.',
        type: 'quiz',
        quizQuestions: [
          {
            id: 'q21',
            question: 'Siapakah nama tokoh guru berdedikasi tinggi yang mengajar di SD Muhammadiyah Gantong dalam Laskar Pelangi?',
            options: ['Bu Muslimah', 'Nyai Ontosoroh', 'Hayati', 'Sahara'],
            correctAnswerIndex: 0,
            explanation: 'Ibu Muslimah Hafsari adalah guru teladan yang dengan penuh ketulusan mengajar sepuluh anak Laskar Pelangi.'
          },
          {
            id: 'q22',
            question: 'Novel "Bumi Manusia" karya Pramoedya Ananta Toer berlatar belakang pada masa...',
            options: ['Penjajahan Jepang 1942', 'Akhir abad ke-19 era Kolonial Hindia Belanda', 'Zaman Kemerdekaan 1945', 'Kerajaan Majapahit'],
            correctAnswerIndex: 1,
            explanation: 'Bumi Manusia berlatar akhir abad ke-19 dan awal abad ke-20 di masa kebangkitan kesadaran nasional.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-3',
    title: 'Literasi Digital & Kecerdasan Buatan (AI) Beretika',
    subtitle: 'Navigasi aman di era algoritma, berpikir kritis melawan hoaks, dan memanfaatkan generative AI untuk belajar cerdas.',
    targetLevel: 'SMA',
    subject: 'Informatika & Bimbingan Konseling',
    estimatedHours: 5,
    bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    description: 'Membekali peserta didik dengan pemahaman mendalam tentang cara kerja AI, perlindungan privasi data pribadi, pencegahan cyberbullying, dan etika sitasi akademis.',
    learningObjectives: [
      'Memahami batasan dan cara kerja model kecerdasan buatan.',
      'Menerapkan teknik cek fakta (fact-checking) independen pada berita daring.',
      'Memanfaatkan AI sebagai akselerator riset dengan tetap menjaga integritas karya sendiri.'
    ],
    bookIds: ['book-7', 'book-10'],
    badgeName: 'Warga Digital Bijak',
    badgeIcon: 'Cpu',
    authorName: 'Ir. Hendra Wijaya, M.Kom (Koordinator Lab Komputer)',
    createdAt: '2025-02-02',
    tasks: [
      {
        id: 't-31',
        title: 'Studi Kasus Deepfake & Verifikasi Berita',
        description: 'Tuliskan 3 langkah yang akan Anda lakukan bila menemukan video atau artikel viral yang mencurigakan.',
        type: 'reflection'
      },
      {
        id: 't-32',
        title: 'Kuis Integritas & Etika AI',
        description: 'Evaluasi kesadaran etika digital Anda.',
        type: 'quiz',
        quizQuestions: [
          {
            id: 'q31',
            question: 'Apakah etis menyalin bulat-bulat jawaban AI dan mengumpulkannya sebagai tugas sekolah tanpa pemahaman dan atribusi?',
            options: ['Ya, sangat dianjurkan', 'Tidak, itu pelanggaran integritas akademik dan plagiarisme', 'Boleh jika guru tidak tahu', 'Tergantung nilai'],
            correctAnswerIndex: 1,
            explanation: 'AI harus digunakan sebagai alat bantu belajar dan brainstorming, bukan untuk menggantikan proses berpikir mandiri.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-4',
    title: 'Membangun Kebiasaan Belajar Efektif & Resiliensi Diri',
    subtitle: 'Seni mengelola waktu, membedah dikotomi kendali mental, dan mengukir kebiasaan produktif berkelanjutan.',
    targetLevel: 'Semua',
    subject: 'Pengembangan Diri & Karakter',
    estimatedHours: 4,
    bannerImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    description: 'Modul praktis untuk siswa yang sering menunda tugas (prokrastinasi), merasa cemas menghadapi ujian, atau kesulitan mempertahankan fokus belajar.',
    learningObjectives: [
      'Menerapkan metode "Atomic Habits" 2 menit untuk memulai tugas yang sulit.',
      'Mengurangi distorsi kognitif saat menghadapi kegagalan nilai atau ujian.',
      'Menyusun jadwal belajar personal yang seimbang antara akademik dan hobi.'
    ],
    bookIds: ['book-4', 'book-10'],
    badgeName: 'Master Disiplin Diri',
    badgeIcon: 'Sparkles',
    authorName: 'Dra. Nurul Hidayati, Psikolog Sekolah',
    createdAt: '2025-02-08',
    tasks: [
      {
        id: 't-41',
        title: 'Rencana Perbaikan Kebiasaan 1% Harian',
        description: 'Tentukan 1 kebiasaan mikro yang akan Anda lakukan setiap hari selama 14 hari ke depan (misal: membaca 5 halaman buku sebelum tidur).',
        type: 'reflection'
      }
    ]
  }
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'mem-1',
    memberNumber: 'WLIB-2025-001',
    name: 'Najwa Azzahra',
    email: 'najwa.azzahra@cendekia.sch.id',
    role: 'student',
    gradeClass: 'Kelas XI MIPA 1',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    totalBorrowed: 18,
    activeLoans: 2,
    joinedDate: '2024-07-15'
  },
  {
    id: 'mem-2',
    memberNumber: 'WLIB-2025-002',
    name: 'Rian Pratama',
    email: 'rian.pratama@cendekia.sch.id',
    role: 'student',
    gradeClass: 'Kelas X IPS 2',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    totalBorrowed: 12,
    activeLoans: 1,
    joinedDate: '2024-07-18'
  },
  {
    id: 'mem-3',
    memberNumber: 'WLIB-GURU-08',
    name: 'Bapak Ahmad Fauzi, S.S',
    email: 'ahmad.fauzi@cendekia.sch.id',
    role: 'teacher',
    gradeClass: 'Guru Bahasa & Sastra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    totalBorrowed: 34,
    activeLoans: 3,
    joinedDate: '2023-01-10'
  },
  {
    id: 'mem-4',
    memberNumber: 'WLIB-ADM-01',
    name: 'Siti Rahmawati, S.I.Pust (Admin & Pustakawan Utama)',
    email: 'perpustakaan@cendekia.sch.id',
    role: 'librarian',
    gradeClass: 'Kepala Perpustakaan Digital',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    totalBorrowed: 56,
    activeLoans: 0,
    joinedDate: '2022-08-01'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Peluncuran Koleksi Audio & E-Book Interaktif Maktabah Ilmiah Hasbana 2025',
    content: 'Kini seluruh civitas akademika dapat meminjam dan mendengarkan audiobook berlisensi resmi serta membaca e-book interaktif langsung dari perangkat gawai masing-masing 24/7.',
    date: '2025-02-15',
    category: 'new_books',
    pinned: true
  },
  {
    id: 'ann-2',
    title: 'Festival Bulan Bahasa & Lomba Resensi Buku Tingkat Sekolah',
    content: 'Kumpulkan resensi buku terbaikmu melalui menu ulasan di platform Maktabah Ilmiah Hasbana sebelum akhir bulan. Pemenang akan mendapatkan sertifikat nasional dan voucher buku!',
    date: '2025-02-10',
    category: 'event',
    pinned: true
  },
  {
    id: 'ann-3',
    title: 'Jam Layanan Sirkulasi Fisik Perpustakaan',
    content: 'Layanan peminjaman dan pengembalian buku fisik di ruang perpustakaan buka setiap Senin - Jumat pukul 07.30 - 16.00 WIB.',
    date: '2025-01-05',
    category: 'info',
    pinned: false
  }
];

export const INITIAL_LOANS: LoanRecord[] = [
  {
    id: 'loan-1',
    bookId: 'book-1',
    bookTitle: 'Laskar Pelangi',
    bookCover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    format: 'ebook',
    memberId: 'mem-1',
    memberName: 'Najwa Azzahra',
    memberClass: 'Kelas XI MIPA 1',
    loanDate: '2025-02-10',
    dueDate: '2025-02-24',
    status: 'active',
    renewCount: 0
  },
  {
    id: 'loan-2',
    bookId: 'book-4',
    bookTitle: 'Filosofi Teras: Stoisisme untuk Generasi Muda',
    bookCover: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    format: 'audiobook',
    memberId: 'mem-1',
    memberName: 'Najwa Azzahra',
    memberClass: 'Kelas XI MIPA 1',
    loanDate: '2025-02-08',
    dueDate: '2025-02-22',
    status: 'active',
    renewCount: 1
  },
  {
    id: 'loan-3',
    bookId: 'book-5',
    bookTitle: 'Sejarah Maritim Nusantara: Dari Sriwijaya Hingga VOC',
    bookCover: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    format: 'physical',
    memberId: 'mem-2',
    memberName: 'Rian Pratama',
    memberClass: 'Kelas X IPS 2',
    loanDate: '2025-02-01',
    dueDate: '2025-02-15',
    status: 'active',
    renewCount: 0
  }
];

export const INITIAL_REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    bookId: 'book-1',
    memberName: 'Najwa Azzahra',
    memberRole: 'Siswa Kelas XI',
    rating: 5,
    comment: 'Buku yang sangat menggetarkan hati! Perjuangan Lintang menginspirasi saya untuk tidak pernah mengeluh saat belajar fisika dan matematika.',
    date: '2025-02-02'
  },
  {
    id: 'rev-2',
    bookId: 'book-4',
    memberName: 'Budi Santoso',
    memberRole: 'Siswa Kelas XII',
    rating: 5,
    comment: 'Sangat menenangkan dibaca saat overthinking menghadapi ujian masuk perguruan tinggi. Dikotomi kendali konsep yang sangat aplikatif.',
    date: '2025-02-05'
  },
  {
    id: 'rev-3',
    bookId: 'book-7',
    memberName: 'Ahmad Fauzi, S.S',
    memberRole: 'Guru Bahasa & Sastra',
    rating: 5,
    comment: 'Wajib dibaca oleh seluruh pendidik dan pelajar untuk memahami batasan etika AI di ruang kelas.',
    date: '2025-02-11'
  }
];
