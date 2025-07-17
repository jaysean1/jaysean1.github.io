'use client';

import { useEffect, useState } from 'react';
import Toast from './Toast';

interface ToastData {
  id: string;
  title: string;
  description: string;
  actionText?: string;
  actionUrl?: string;
  duration?: number;
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    // Show portfolio toast after 3 seconds
    const timer = setTimeout(() => {
      setToasts([{
        id: 'portfolio-toast',
        title: 'Looking for more?',
        description: 'Explore my portfolio and see more projects',
        actionText: 'See',
        actionUrl: 'https://www.notion.so/qiansui/Sui-Qian-Portfolio-c6be6c3fe60c420faf915f35f73bb408'
      }]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          title={toast.title}
          description={toast.description}
          actionText={toast.actionText}
          actionUrl={toast.actionUrl}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}