import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HotelGalleryProps {
  images: string[];
  mainImage?: string;
}

export function HotelGallery({ images, mainImage }: HotelGalleryProps) {
  const allImages = mainImage ? [mainImage, ...images.filter((img) => img !== mainImage)] : images;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % allImages.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <>
      <div className="space-y-3">
        <div className="relative group overflow-hidden rounded-lg bg-[#e9e3da]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={allImages[currentIndex]}
              alt={`Hotel image ${currentIndex + 1}`}
              className="aspect-[16/9] w-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <button
            onClick={() => setFullscreen(true)}
            className="absolute right-4 top-4 flex items-center gap-2 rounded bg-black/60 px-4 py-2.5 text-sm font-semibold text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-black/80"
          >
            <Maximize2 className="h-4 w-4" />
            View all photos
          </button>

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded bg-black/50 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-md">
            <Camera className="h-4 w-4" />
            {allImages.length} photos
          </div>

          {allImages.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#002f17] opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#002f17] opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:scale-110"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-4 rounded bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
            {currentIndex + 1} / {allImages.length}
          </div>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                'relative h-18 w-24 flex-shrink-0 overflow-hidden rounded transition-all duration-200 md:h-20 md:w-28',
                idx === currentIndex
                  ? 'ring-3 ring-[#ff467c] ring-offset-2 shadow-lg'
                  : 'opacity-50 hover:opacity-90'
              )}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
              {idx === currentIndex && (
                <div className="absolute inset-0 ring-2 ring-inset ring-white/40 rounded" />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={() => setFullscreen(false)}
          >
            <button
              onClick={() => setFullscreen(false)}
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-110 z-10"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={allImages[currentIndex]}
                  alt={`Fullscreen image ${currentIndex + 1}`}
                  className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); goPrev(); }}
                    className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#002f17] shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); goNext(); }}
                    className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#002f17] shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-black/60 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md">
                {currentIndex + 1} / {allImages.length}
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={cn(
                    'h-2.5 w-2.5 rounded-full transition-all duration-200',
                    idx === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
                  )}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
