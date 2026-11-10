'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  BookOpen, 
  CheckCircle, 
  Award, 
  Clock, 
  GraduationCap, 
  HelpCircle, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  AlertCircle,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ModuleItem, BookItem, Member } from '@/types/library';

interface ThematicModulesViewProps {
  modules: ModuleItem[];
  books: BookItem[];
  completedModuleIds: string[];
  onCompleteModule: (moduleId: string) => void;
  onOpenBook: (book: BookItem) => void;
  activeUser: Member;
  onGoToCMS: () => void;
}

export const ThematicModulesView: React.FC<ThematicModulesViewProps> = ({
  modules,
  books,
  completedModuleIds,
  onCompleteModule,
  onOpenBook,
  activeUser,
  onGoToCMS
}) => {
  const [selectedModule, setSelectedModule] = useState<ModuleItem | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('Semua');

  // Quiz state for active module
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [reflectionText, setReflectionText] = useState<string>('');
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const filteredModules = modules.filter(m => {
    if (filterLevel === 'Semua') return true;
    return m.targetLevel === filterLevel || m.targetLevel === 'Semua';
  });

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleFinishQuiz = (module: ModuleItem) => {
    const quizTask = module.tasks.find(t => t.type === 'quiz');
    if (!quizTask || !quizTask.quizQuestions) return;

    let correctCount = 0;
    quizTask.quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / quizTask.quizQuestions.length) * 100);
    setQuizScore(calculatedScore);
    setQuizSubmitted(true);

    if (calculatedScore >= 70) {
      onCompleteModule(module.id);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const resetModuleTaskState = () => {
    setQuizAnswers({});
    setReflectionText('');
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {!selectedModule ? (
        // Module List View
        <div className="space-y-6">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
                  <Layers className="w-5 h-5" />
                </span>
                <h1 className="text-2xl font-black text-slate-900">
                  Modul Literasi & Paket Bacaan Tematik
                </h1>
              </div>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Paket bacaan kurikulum sekolah yang dikurasi oleh para guru dan pustakawan. Dilengkapi target bacaan terarah, lembar refleksi, serta kuis pemahaman konsep berhadiah lencana digital.
              </p>
            </div>

            {/* Level filter */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
              {['Semua', 'SD', 'SMP', 'SMA'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setFilterLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filterLevel === lvl
                      ? 'bg-white text-teal-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredModules.map(mod => {
              const isCompleted = completedModuleIds.includes(mod.id);
              const relatedBooks = books.filter(b => mod.bookIds.includes(b.id));

              return (
                <div
                  key={mod.id}
                  onClick={() => {
                    resetModuleTaskState();
                    setSelectedModule(mod);
                  }}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group hover:-translate-y-1"
                >
                  {/* Banner */}
                  <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={mod.bannerImage}
                      alt={mod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                    {/* Level & Completed Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-emerald-500/90 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded-full shadow">
                        {mod.targetLevel}
                      </span>
                      <span className="bg-black/60 backdrop-blur-sm text-teal-200 text-xs px-2.5 py-0.5 rounded-full">
                        {mod.subject}
                      </span>
                    </div>

                    {isCompleted && (
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <CheckCircle className="w-3.5 h-3.5" /> Selesai
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-lg leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors">
                        {mod.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {mod.subtitle}
                      </p>

                      {/* Info strip */}
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1 text-slate-700">
                          <Clock className="w-3.5 h-3.5 text-teal-700" /> {mod.estimatedHours} Jam Belajar
                        </span>
                        <span className="flex items-center gap-1 text-slate-700">
                          <BookOpen className="w-3.5 h-3.5 text-teal-700" /> {mod.bookIds.length} Buku Wajib
                        </span>
                        <span className="flex items-center gap-1 text-amber-700 font-medium">
                          <Award className="w-3.5 h-3.5 text-amber-500" /> Lencana: {mod.badgeName}
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 truncate max-w-[200px]">
                        Kurator: {mod.authorName.split(',')[0]}
                      </span>
                      <span className="text-teal-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Buka Modul & Kerjakan <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Module Detail / Study View
        <div className="space-y-8 animate-in fade-in">
          {/* Back button */}
          <button
            onClick={() => setSelectedModule(null)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Modul
          </button>

          {/* Module Banner Hero */}
          <div className="bg-gradient-to-r from-[#0c2f35] to-[#144750] rounded-3xl overflow-hidden text-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-emerald-400 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Tingkat {selectedModule.targetLevel}
                  </span>
                  <span className="bg-teal-700/60 text-teal-100 text-xs px-2.5 py-0.5 rounded-full">
                    {selectedModule.subject}
                  </span>
                  <span className="text-xs text-teal-200">
                    Estimasi {selectedModule.estimatedHours} Jam
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {selectedModule.title}
                </h1>
                <p className="text-teal-100/90 text-sm leading-relaxed max-w-2xl">
                  {selectedModule.description}
                </p>

                <div className="pt-2 text-xs text-teal-300 font-medium">
                  Disusun oleh: {selectedModule.authorName}
                </div>
              </div>

              <div className="lg:col-span-4 bg-teal-950/40 p-6 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-teal-700/30">
                <div className="w-20 h-20 rounded-2xl bg-amber-400/20 border-2 border-amber-400/50 flex items-center justify-center text-amber-300 mb-3 shadow-lg">
                  <Award className="w-10 h-10" />
                </div>
                <span className="text-xs text-teal-300 uppercase tracking-wider font-semibold">Lencana Kelulusan</span>
                <p className="font-bold text-base text-amber-300 text-center mt-0.5">{selectedModule.badgeName}</p>
                {completedModuleIds.includes(selectedModule.id) ? (
                  <span className="mt-3 px-3 py-1 bg-emerald-500 text-slate-950 rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Sudah Anda Dapatkan!
                  </span>
                ) : (
                  <span className="mt-3 text-xs text-teal-200/80 text-center">
                    Selesaikan bacaan & kuis untuk mengklaim lencana ini
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Section 1: Learning Objectives */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-teal-700" />
              Capaian & Tujuan Pembelajaran (Learning Objectives)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {selectedModule.learningObjectives.map((obj, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    {i + 1}
                  </span>
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Required Reading Materials */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-700" />
              Bahan Bacaan Pokok Modul ({selectedModule.bookIds.length} Judul)
            </h3>
            <p className="text-xs text-slate-500 -mt-2">
              Klik salah satu buku untuk langsung membaca e-book, mendengarkan audiobook, atau meminjam:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {books
                .filter(b => selectedModule.bookIds.includes(b.id))
                .map(book => (
                  <div 
                    key={book.id} 
                    onClick={() => onOpenBook(book)}
                    className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex gap-3.5 items-center group"
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded-lg shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                        {book.format}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 truncate mt-1 group-hover:text-teal-700 transition-colors">
                        {book.title}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">{book.author}</p>
                      <span className="text-[11px] text-teal-700 font-semibold mt-1 inline-block">
                        Buka Bacaan →
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Section 3: Tasks, Reflection & Interactive Quiz */}
          <div className="space-y-6 pt-4 border-t border-slate-200">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Uji Pemahaman & Lembar Kerja Modul
            </h3>

            {selectedModule.tasks.map(task => {
              if (task.type === 'reflection') {
                return (
                  <div key={task.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                      <FileText className="w-4 h-4 text-teal-700" />
                      <h4>{task.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600">{task.description}</p>
                    <textarea
                      rows={3}
                      placeholder="Ketik catatan refleksi Anda di sini..."
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50"
                    />
                  </div>
                );
              }

              if (task.type === 'quiz' && task.quizQuestions) {
                return (
                  <div key={task.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-teal-700" />
                          {task.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">{task.description}</p>
                      </div>
                      {quizScore !== null && (
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${quizScore >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          Skor Kuis: {quizScore} / 100
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      {task.quizQuestions.map((q, qIndex) => {
                        const selectedAnswer = quizAnswers[q.id];
                        const isCorrect = selectedAnswer === q.correctAnswerIndex;

                        return (
                          <div key={q.id} className="space-y-3">
                            <p className="font-semibold text-xs sm:text-sm text-slate-800">
                              {qIndex + 1}. {q.question}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {q.options.map((opt, optIndex) => {
                                const isOptionSelected = selectedAnswer === optIndex;
                                const isOptionCorrect = optIndex === q.correctAnswerIndex;

                                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                                if (isOptionSelected) {
                                  btnStyle = 'bg-teal-50 border-teal-600 text-teal-900 font-semibold';
                                }
                                if (quizSubmitted) {
                                  if (isOptionCorrect) {
                                    btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                                  } else if (isOptionSelected && !isOptionCorrect) {
                                    btnStyle = 'bg-rose-100 border-rose-400 text-rose-900 font-semibold';
                                  }
                                }

                                return (
                                  <button
                                    key={optIndex}
                                    type="button"
                                    onClick={() => handleSelectAnswer(q.id, optIndex)}
                                    className={`p-3 rounded-xl border text-xs text-left transition-all flex items-start gap-2 ${btnStyle}`}
                                  >
                                    <span className="font-mono uppercase font-bold text-[11px] opacity-75">
                                      {String.fromCharCode(65 + optIndex)}.
                                    </span>
                                    <span>{opt}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {quizSubmitted && q.explanation && (
                              <div className="text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-600">
                                <strong>Penjelasan:</strong> {q.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Quiz Action Buttons */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      {!quizSubmitted ? (
                        <button
                          onClick={() => handleFinishQuiz(selectedModule)}
                          className="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
                        >
                          <Check className="w-4 h-4" /> Kumpulkan Jawaban Kuis
                        </button>
                      ) : (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={resetModuleTaskState}
                            className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold"
                          >
                            Ulangi Kuis
                          </button>
                          {quizScore !== null && quizScore >= 70 && (
                            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                              <Sparkles className="w-4 h-4 text-emerald-500" />
                              Lencana Berhasil Diklaim ke Akun Anda!
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
