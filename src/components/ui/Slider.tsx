import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
  formatValue?: (value: number) => string;
}

function Slider({
  min = 0,
  max = 1000,
  step = 10,
  value: controlledValue,
  onChange,
  minLabel = 'Min',
  maxLabel = 'Max',
  className,
  formatValue,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState<[number, number]>([min, max]);
  const value = controlledValue || internalValue;

  const format = formatValue || ((v: number) => `£${v}`);

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Math.min(Number(e.target.value), value[1] - step);
      const newValue: [number, number] = [newMin, value[1]];
      setInternalValue(newValue);
      onChange?.(newValue);
    },
    [value[1], step, onChange]
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Math.max(Number(e.target.value), value[0] + step);
      const newValue: [number, number] = [value[0], newMax];
      setInternalValue(newValue);
      onChange?.(newValue);
    },
    [value[0], step, onChange]
  );

  const minPercent = ((value[0] - min) / (max - min)) * 100;
  const maxPercent = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{minLabel}: {format(value[0])}</span>
        <span className="text-sm text-gray-600">{maxLabel}: {format(value[1])}</span>
      </div>
      <div className="relative h-2">
        <div className="absolute h-2 w-full rounded-full bg-gray-200" />
        <div
          className="absolute h-2 rounded-full bg-primary"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleMinChange}
          className="absolute h-2 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={handleMaxChange}
          className="absolute h-2 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
        />
      </div>
    </div>
  );
}

export { Slider, type SliderProps };
