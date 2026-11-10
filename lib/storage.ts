'use client';

import { BookItem, ModuleItem, Member, Announcement, LoanRecord, UserReview } from '@/types/library';
import { INITIAL_BOOKS, INITIAL_MODULES, INITIAL_MEMBERS, INITIAL_ANNOUNCEMENTS, INITIAL_LOANS, INITIAL_REVIEWS } from './initialData';

const STORAGE_KEYS = {
  BOOKS: 'welib_books_v1',
  MODULES: 'welib_modules_v1',
  MEMBERS: 'welib_members_v1',
  ANNOUNCEMENTS: 'welib_announcements_v1',
  LOANS: 'welib_loans_v1',
  REVIEWS: 'welib_reviews_v1',
  BOOKMARKS: 'welib_bookmarks_v1',
  ACTIVE_USER: 'welib_active_user_v1',
  COMPLETED_MODULES: 'welib_completed_modules_v1'
};

export function getStoredData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event for cross-component sync
    window.dispatchEvent(new CustomEvent('welib_storage_change', { detail: { key } }));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

export function getBooks(): BookItem[] {
  return getStoredData<BookItem[]>(STORAGE_KEYS.BOOKS, INITIAL_BOOKS);
}

export function saveBooks(books: BookItem[]) {
  setStoredData(STORAGE_KEYS.BOOKS, books);
}

export function getModules(): ModuleItem[] {
  return getStoredData<ModuleItem[]>(STORAGE_KEYS.MODULES, INITIAL_MODULES);
}

export function saveModules(modules: ModuleItem[]) {
  setStoredData(STORAGE_KEYS.MODULES, modules);
}

export function getMembers(): Member[] {
  return getStoredData<Member[]>(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
}

export function saveMembers(members: Member[]) {
  setStoredData(STORAGE_KEYS.MEMBERS, members);
}

export function getAnnouncements(): Announcement[] {
  return getStoredData<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
}

export function saveAnnouncements(announcements: Announcement[]) {
  setStoredData(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
}

export function getLoans(): LoanRecord[] {
  return getStoredData<LoanRecord[]>(STORAGE_KEYS.LOANS, INITIAL_LOANS);
}

export function saveLoans(loans: LoanRecord[]) {
  setStoredData(STORAGE_KEYS.LOANS, loans);
}

export function getReviews(): UserReview[] {
  return getStoredData<UserReview[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
}

export function saveReviews(reviews: UserReview[]) {
  setStoredData(STORAGE_KEYS.REVIEWS, reviews);
}

export function getBookmarks(): string[] {
  return getStoredData<string[]>(STORAGE_KEYS.BOOKMARKS, ['book-1', 'book-4']);
}

export function toggleBookmark(bookId: string): string[] {
  const current = getBookmarks();
  const exists = current.includes(bookId);
  const updated = exists ? current.filter(id => id !== bookId) : [...current, bookId];
  setStoredData(STORAGE_KEYS.BOOKMARKS, updated);
  return updated;
}

export function getActiveUser(): Member {
  const members = getMembers();
  return getStoredData<Member>(STORAGE_KEYS.ACTIVE_USER, members[0] || INITIAL_MEMBERS[0]);
}

export function setActiveUser(member: Member) {
  setStoredData(STORAGE_KEYS.ACTIVE_USER, member);
}

export function getCompletedModules(): string[] {
  return getStoredData<string[]>(STORAGE_KEYS.COMPLETED_MODULES, ['mod-4']);
}

export function markModuleCompleted(moduleId: string): string[] {
  const current = getCompletedModules();
  if (!current.includes(moduleId)) {
    const updated = [...current, moduleId];
    setStoredData(STORAGE_KEYS.COMPLETED_MODULES, updated);
    return updated;
  }
  return current;
}

export function resetAllDataToDefault() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(INITIAL_BOOKS));
  localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(INITIAL_MODULES));
  localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(INITIAL_MEMBERS));
  localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
  localStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(INITIAL_LOANS));
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(['book-1', 'book-4']));
  localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(INITIAL_MEMBERS[0]));
  localStorage.setItem(STORAGE_KEYS.COMPLETED_MODULES, JSON.stringify(['mod-4']));
  window.dispatchEvent(new CustomEvent('welib_storage_change', { detail: { key: 'ALL' } }));
}

export function exportDatabaseBackup(): string {
  const data = {
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
    platform: 'Maktabah Ilmiah Hasbana Digital Library CMS',
    books: getBooks(),
    modules: getModules(),
    members: getMembers(),
    announcements: getAnnouncements(),
    loans: getLoans(),
    reviews: getReviews()
  };
  return JSON.stringify(data, null, 2);
}

export function importDatabaseBackup(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.books && Array.isArray(parsed.books)) saveBooks(parsed.books);
    if (parsed.modules && Array.isArray(parsed.modules)) saveModules(parsed.modules);
    if (parsed.members && Array.isArray(parsed.members)) saveMembers(parsed.members);
    if (parsed.announcements && Array.isArray(parsed.announcements)) saveAnnouncements(parsed.announcements);
    if (parsed.loans && Array.isArray(parsed.loans)) saveLoans(parsed.loans);
    if (parsed.reviews && Array.isArray(parsed.reviews)) saveReviews(parsed.reviews);
    window.dispatchEvent(new CustomEvent('welib_storage_change', { detail: { key: 'ALL' } }));
    return true;
  } catch (err) {
    console.error('Failed to parse import backup JSON', err);
    return false;
  }
}
