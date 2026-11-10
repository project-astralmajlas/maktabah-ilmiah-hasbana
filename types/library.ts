export type BookFormat = 'ebook' | 'physical' | 'audiobook' | 'video';
export type EducationLevel = 'Semua' | 'SD' | 'SMP' | 'SMA' | 'Umum';
export type BookCategory = 
  | 'Sains & Teknologi'
  | 'Sastra & Fiksi'
  | 'Sejarah & Budaya'
  | 'Pengembangan Diri'
  | 'Komik & Grafis'
  | 'Matematika'
  | 'Bahasa & Kamus'
  | 'Sosial & Humaniora'
  | 'Ensiklopedia';

export interface BookChapter {
  id: string;
  title: string;
  content: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  durationSeconds: number;
  narrator: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  isbn: string;
  ddc: string; // Dewey Decimal Classification, e.g. 813.54
  category: BookCategory;
  format: BookFormat;
  level: EducationLevel;
  coverImage: string;
  synopsis: string;
  shelfLocation: string; // e.g. Rak B-04 / Lantai 2
  stockTotal: number;
  stockAvailable: number;
  rating: number;
  reviewsCount: number;
  pages?: number;
  durationMinutes?: number;
  language: string;
  tags: string[];
  chapters?: BookChapter[];
  audioTracks?: AudioTrack[];
  isFeatured?: boolean;
  isPopular?: boolean;
  createdAt: string;
}

export interface ModuleTask {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'reflection' | 'reading';
  quizQuestions?: {
    id: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation?: string;
  }[];
}

export interface ModuleItem {
  id: string;
  title: string;
  subtitle: string;
  targetLevel: EducationLevel;
  subject: string;
  estimatedHours: number;
  bannerImage: string;
  description: string;
  learningObjectives: string[];
  bookIds: string[]; // references to BookItem
  tasks: ModuleTask[];
  badgeName: string;
  badgeIcon: string;
  authorName: string;
  createdAt: string;
}

export interface LoanRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  bookCover: string;
  format: BookFormat;
  memberId: string;
  memberName: string;
  memberClass: string;
  loanDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'overdue';
  renewCount: number;
}

export interface Member {
  id: string;
  memberNumber: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'librarian' | 'admin';
  gradeClass: string;
  avatar: string;
  totalBorrowed: number;
  activeLoans: number;
  joinedDate: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'info' | 'event' | 'new_books' | 'maintenance';
  pinned: boolean;
}

export interface UserReview {
  id: string;
  bookId: string;
  memberName: string;
  memberRole: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ReadingGoal {
  targetBooks: number;
  currentCompleted: number;
  semester: string;
}
