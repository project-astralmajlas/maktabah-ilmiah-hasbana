'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`pointer-events-auto p-3.5 rounded-xl shadow-2xl border flex items-center justify-between gap-3 text-xs font-semibold animate-in slide-in-from-bottom-2 duration-300 ${
            t.type === 'success'
              ? 'bg-emerald-900/95 text-white border-emerald-500/50 backdrop-blur-md'
              : t.type === 'error'
              ? 'bg-rose-900/95 text-white border-rose-500/50 backdrop-blur-md'
              : 'bg-slate-900/95 text-white border-slate-700/50 backdrop-blur-md'
          }`}
        >
          <div className="flex items-center gap-2">
            {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
            {t.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
            {t.type === 'info' && <Info className="w-4 h-4 text-teal-400 flex-shrink-0" />}
            <span>{t.message}</span>
          </div>

          <button
            onClick={() => onDismiss(t.id)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5 text-slate-300" />
          </button>
        </div>
      ))}
    </div>
  );
};
