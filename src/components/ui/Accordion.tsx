import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AccordionContextType {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType>({
  openItems: new Set(),
  toggleItem: () => {},
});

interface AccordionProps {
  children: ReactNode;
  type?: 'single' | 'multiple';
  defaultValue?: string[];
  className?: string;
}

function Accordion({ children, type = 'single', defaultValue = [], className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultValue));

  const toggleItem = useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (type === 'single') {
            next.clear();
          }
          next.add(id);
        }
        return next;
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn('space-y-1', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  children: ReactNode;
  value: string;
  className?: string;
}

function AccordionItem({ children, value, className }: AccordionItemProps) {
  return (
    <div className={cn('border-b border-gray-200', className)} data-state={undefined}>
      {children}
    </div>
  );
}

interface AccordionTriggerProps {
  children: ReactNode;
  value: string;
  className?: string;
}

function AccordionTrigger({ children, value, className }: AccordionTriggerProps) {
  const { openItems, toggleItem } = useContext(AccordionContext);
  const isOpen = openItems.has(value);

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      className={cn(
        'flex w-full items-center justify-between py-4 text-sm font-medium transition-colors hover:text-primary',
        className
      )}
      aria-expanded={isOpen}
    >
      {children}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className={cn('shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

interface AccordionContentProps {
  children: ReactNode;
  value: string;
  className?: string;
}

function AccordionContent({ children, value, className }: AccordionContentProps) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.has(value);

  if (!isOpen) return null;

  return (
    <div
      className={cn('overflow-hidden pb-4 text-sm text-gray-600', className)}
    >
      {children}
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
