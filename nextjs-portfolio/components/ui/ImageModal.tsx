'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ImageModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrevious,
  onNext,
}: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        onNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onPrevious, onNext]);

  if (!isOpen) return null;

  const showArrows = images.length > 1;

  return (
    <div 
      className="image-modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {showArrows && currentIndex > 0 && (
        <button
          className="modal-prev"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          aria-label="Previous image"
        >
          ←
        </button>
      )}
      
      <Image
        src={images[currentIndex]}
        alt={`Preview ${currentIndex + 1}`}
        width={800}
        height={600}
        className="modal-img"
        style={{ objectFit: 'contain' }}
      />
      
      {showArrows && currentIndex < images.length - 1 && (
        <button
          className="modal-next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          →
        </button>
      )}
      
      <button
        className="modal-close"
        onClick={onClose}
        aria-label="Close modal"
      >
        ×
      </button>
    </div>
  );
} 