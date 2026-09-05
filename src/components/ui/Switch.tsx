import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id, ...props }, ref) => {
    const switchId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-center gap-2">
        <label
          htmlFor={switchId}
          className="relative inline-flex cursor-pointer items-center"
        >
          <input
            type="checkbox"
            id={switchId}
            className="peer sr-only"
            ref={ref}
            {...props}
          />
          <div className="h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-md after:transition-all peer-checked:after:translate-x-full" />
        </label>
        {label && (
          <label
            htmlFor={switchId}
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Switch.displayName = 'Switch';

export { Switch, type SwitchProps };
