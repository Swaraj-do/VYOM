import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'warning' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  const iconColors = {
    success: 'text-green-500',
    warning: 'text-amber-500',
    error: 'text-red-500'
  };

  const Icon = icons[type];

  return (
    <div className={`fixed top-4 right-4 max-w-sm w-full border rounded-lg p-4 shadow-lg z-50 ${colors[type]}`}>
      <div className="flex items-start">
        <Icon className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${iconColors[type]}`} />
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`ml-3 flex-shrink-0 ${iconColors[type]} hover:opacity-75`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};