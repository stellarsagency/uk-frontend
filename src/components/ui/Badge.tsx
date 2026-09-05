import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive' | 'board';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        {
          'bg-gray-100 text-gray-800': variant === 'default',
          'bg-primary/10 text-primary': variant === 'primary',
          'bg-secondary/10 text-secondary': variant === 'secondary',
          'border border-gray-300 text-gray-700': variant === 'outline',
          'bg-green-100 text-green-800': variant === 'success',
          'bg-yellow-100 text-yellow-800': variant === 'warning',
          'bg-red-100 text-red-800': variant === 'destructive',
          'bg-accent text-secondary': variant === 'board',
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge, type BadgeProps };
