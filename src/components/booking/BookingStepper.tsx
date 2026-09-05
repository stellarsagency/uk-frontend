import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingStepperProps {
  currentStep: number;
  steps: string[];
}

export function BookingStepper({ currentStep, steps }: BookingStepperProps) {
  return (
    <nav className="w-full rounded-lg border border-[#e9e3da] bg-white px-6 py-5 shadow-sm">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <li key={step} className={cn('flex items-center', !isLast && 'flex-1')}>
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={cn(
                    'relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300',
                    isCompleted
                      ? 'bg-[#ff467c] text-white shadow-md'
                      : isActive
                        ? 'bg-[#ff467c] text-white shadow-md ring-4 ring-[#ff467c]/15'
                        : 'bg-[#faf5ed] text-[#818085] border border-[#e9e3da]'
                  )}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <Check className="h-5 w-5" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </motion.div>
                <span
                  className={cn(
                    'mt-2.5 text-xs font-semibold tracking-wide transition-colors duration-300 hidden md:block',
                    isCompleted ? 'text-[#ff467c]' : isActive ? 'text-[#ff467c]' : 'text-[#818085]'
                  )}
                >
                  {step}
                </span>
              </div>
              {!isLast && (
                <div className="mx-3 h-[3px] flex-1 overflow-hidden rounded-full bg-[#e9e3da]">
                  <motion.div
                    initial={false}
                    animate={{
                      width: isCompleted ? '100%' : isActive ? '50%' : '0%',
                    }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="h-full rounded-full bg-[#ff467c]"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-3 flex justify-between md:hidden">
        <span className="text-xs font-bold text-[#ff467c] tracking-wider uppercase">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </span>
      </div>
    </nav>
  );
}
