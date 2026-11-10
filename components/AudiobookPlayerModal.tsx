'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  ListMusic, 
  Headphones, 
  Sparkles,
  FastForward
} from 'lucide-react';
import { BookItem, AudioTrack } from '@/types/library';

interface AudiobookPlayerModalProps {
  book: BookItem | null;
  onClose: () => void;
}

export const AudiobookPlayerModal: React.FC<AudiobookPlayerModalProps> = ({ book, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const tracks: AudioTrack[] = book?.audioTracks && book.audioTracks.length > 0
    ? book.audioTracks
    : [
        {
          id: 't-default-1',
          title: `Bab 1: Pengantar Audio ${book?.title || ''}`,
          durationSeconds: 320,
          narrator: 'Narator Resmi Maktabah Ilmiah Hasbana'
        },
        {
          id: 't-default-2',
          title: `Bab 2: Pendalaman Gagasan Pokok`,
          durationSeconds: 480,
          narrator: 'Narator Resmi Maktabah Ilmiah Hasbana'
        }
      ];

  const currentTrack = tracks[activeTrackIndex] || tracks[0];
  const totalSeconds = currentTrack?.durationSeconds || 300;

  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Web Speech synthesis for genuine audio narration
  const startAudioNarration = (textToRead: string, startingTime: number = 0) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'id-ID';
    utterance.rate = speed;
    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
    };
    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const stopAudioNarration = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!book) return;
    if (isPlaying) {
      stopAudioNarration();
    } else {
      const chapterContent = book.chapters?.[0]?.content || book.synopsis;
      const textToSpeak = `${currentTrack?.title || ''}. ${book.title}, karya ${book.author}. Dinarasikan oleh ${currentTrack?.narrator || ''}. ${chapterContent}`;
      startAudioNarration(textToSpeak);
    }
  };

  // Progress timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / speed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, speed, totalSeconds]);

  // Clean up on unmount or track change
  useEffect(() => {
    return () => {
      stopAudioNarration();
    };
  }, [activeTrackIndex]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSec = Number(e.target.value);
    setCurrentTime(newSec);
  };

  const skipSeconds = (delta: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(totalSeconds, prev + delta)));
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    setSpeed(speeds[nextIdx]);
    if (isPlaying) {
      // Re-trigger speech with new speed
      togglePlay();
      togglePlay();
    }
  };

  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="bg-gradient-to-b from-[#111827] via-[#0f172a] to-[#030712] text-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-700/60 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-purple-500/20 text-purple-400">
              <Headphones className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Maktabah Hasbana Audio</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className={`p-1.5 rounded-lg transition-colors ${showPlaylist ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Daftar Bab Audio"
            >
              <ListMusic className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                stopAudioNarration();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col items-center">
          {/* Cover Art with Animated Soundwave */}
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-500/30 mb-6 group">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center gap-1">
                <span className="w-1.5 bg-emerald-400 rounded-full h-8 animate-pulse"></span>
                <span className="w-1.5 bg-teal-300 rounded-full h-12 animate-pulse delay-75"></span>
                <span className="w-1.5 bg-purple-400 rounded-full h-6 animate-pulse delay-150"></span>
                <span className="w-1.5 bg-pink-400 rounded-full h-10 animate-pulse delay-100"></span>
                <span className="w-1.5 bg-emerald-400 rounded-full h-7 animate-pulse delay-200"></span>
              </div>
            )}
          </div>

          {/* Track Details */}
          <div className="text-center w-full mb-6">
            <p className="text-xs uppercase font-semibold text-purple-400 tracking-wider">
              {currentTrack.title}
            </p>
            <h3 className="text-lg font-bold text-white mt-1 truncate px-2">
              {book.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Oleh: {book.author} • Narator: {currentTrack.narrator}
            </p>
          </div>

          {/* Timeline Scrubber */}
          <div className="w-full space-y-1 mb-6">
            <input
              type="range"
              min={0}
              max={totalSeconds}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalSeconds)}</span>
            </div>
          </div>

          {/* Main Controls: Rewind 15s, Play/Pause, Forward 15s */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <button
              onClick={() => skipSeconds(-15)}
              className="p-2 text-slate-300 hover:text-white transition-colors"
              title="Mundur 15 detik"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/40 hover:scale-105 active:scale-95 transition-transform"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
            </button>

            <button
              onClick={() => skipSeconds(15)}
              className="p-2 text-slate-300 hover:text-white transition-colors"
              title="Maju 15 detik"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Secondary Controls */}
          <div className="w-full flex items-center justify-between px-2 pt-2 border-t border-white/5 text-xs">
            <button
              onClick={cycleSpeed}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 font-mono font-bold transition-colors"
              title="Kecepatan putar"
            >
              {speed}x
            </button>

            <span className="text-[11px] text-slate-500">
              Audio didukung Web Audio & Narasi AI
            </span>
          </div>

          {/* Track playlist drawer */}
          {showPlaylist && (
            <div className="w-full mt-4 pt-3 border-t border-white/10 space-y-1.5">
              <p className="text-[11px] uppercase font-bold text-slate-400">Daftar Bab ({tracks.length})</p>
              {tracks.map((tr, idx) => (
                <button
                  key={tr.id}
                  onClick={() => {
                    setActiveTrackIndex(idx);
                    setCurrentTime(0);
                    setShowPlaylist(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    idx === activeTrackIndex ? 'bg-purple-900/50 text-purple-300 font-bold border border-purple-500/30' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{tr.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{formatTime(tr.durationSeconds)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
