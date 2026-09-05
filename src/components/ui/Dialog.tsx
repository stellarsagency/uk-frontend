import { useEffect, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

function Dialog({ open, onClose, children, className }: DialogProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-50 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl animate-in fade-in-0 zoom-in-95',
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
}

function DialogHeader({ children, className }: DialogHeaderProps) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <h2 className={cn('text-lg font-semibold text-gray-900', className)}>{children}</h2>
  );
}

interface DialogDescriptionProps {
  children: ReactNode;
  className?: string;
}

function DialogDescription({ children, className }: DialogDescriptionProps) {
  return <p className={cn('mt-1 text-sm text-gray-500', className)}>{children}</p>;
}

interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={cn('mt-6 flex justify-end gap-3', className)}>{children}</div>
  );
}

function DialogClose({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'absolute right-4 top-4 rounded-md p-1 text-gray-400 transition-colors hover:text-gray-600',
        className
      )}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose };
