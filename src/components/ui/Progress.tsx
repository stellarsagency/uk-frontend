import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
  barClassName?: string;
}

function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  className,
  barClassName,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showValue && (
            <span className="text-sm text-gray-500">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={cn(
            'h-full rounded-full bg-primary transition-all duration-500 ease-out',
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface StepProgressProps {
  currentStep: number;
  steps: { label: string; description?: string }[];
  className?: string;
}

function StepProgress({ currentStep, steps, className }: StepProgressProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
                  index < currentStep
                    ? 'bg-primary text-white'
                    : index === currentStep
                      ? 'bg-primary text-white ring-2 ring-primary ring-offset-2'
                      : 'bg-gray-200 text-gray-500'
                )}
              >
                {index < currentStep ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className="mt-2 text-xs font-medium text-gray-600">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'mx-2 h-0.5 flex-1',
                  index < currentStep ? 'bg-primary' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export { Progress, StepProgress };
