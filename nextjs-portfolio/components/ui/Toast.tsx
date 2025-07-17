'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  title: string;
  description: string;
  actionText?: string;
  actionUrl?: string;
  duration?: number;
  onClose?: () => void;
}

export default function Toast({
  title,
  description,
  actionText,
  actionUrl,
  duration = 0, // 0 means persistent
  onClose
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger show animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto-hide if duration is set
    let autoHideTimer: NodeJS.Timeout | null = null;
    if (duration > 0) {
      autoHideTimer = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      clearTimeout(timer);
      if (autoHideTimer) clearTimeout(autoHideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const handleActionClick = () => {
    if (actionUrl) {
      window.open(actionUrl, '_blank');
    }
  };

  return (
    <div
      className={`toast flex justify-between items-center min-w-[300px] max-w-[400px] p-4 bg-card rounded-xl shadow-2xl border border-gray-700 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="toast-content flex-1 pr-3">
        <div className="toast-title font-bold text-white text-base mb-1">
          {title}
        </div>
        <div className="toast-description text-text-secondary text-sm">
          {description}
        </div>
      </div>
      
      {actionText && actionUrl && (
        <button
          onClick={handleActionClick}
          className="toast-action inline-flex items-center justify-center flex-shrink-0 bg-primary text-white text-sm font-semibold rounded-md px-4 py-2 mr-4 hover:bg-primary/90 transition-colors shadow-md"
        >
          {actionText}
        </button>
      )}
      
      <button
        onClick={handleClose}
        className="toast-close flex items-center justify-center w-6 h-6 rounded-full text-text-secondary hover:bg-white/10 hover:text-white transition-all text-lg"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}