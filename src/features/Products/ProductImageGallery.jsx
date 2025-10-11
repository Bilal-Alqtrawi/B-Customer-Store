import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

function ProductImageGallery({ images = [] }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const displayImages =
    images.length > 0 ? images : ["https://placehold.co/600x600"];

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const nextImage = () =>
    setSelectedImageIndex((prev) => (prev + 1) % displayImages.length);
  const prevImage = () =>
    setSelectedImageIndex(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length,
    );

  // Touch Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextImage(); // swipe left
    if (distance < -50) prevImage(); // swipe right
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="group relative">
        <div
          className="aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl border border-gray-200 bg-white"
          onClick={() => setIsModalOpen(true)}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.img
            key={selectedImageIndex}
            src={displayImages[selectedImageIndex]}
            alt={`Product image ${selectedImageIndex + 1}`}
            className={`h-full w-full object-contain p-4 transition-transform duration-300 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            style={
              isZoomed
                ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                : {}
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4 rounded-full bg-white/90 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <MagnifyingGlassIcon className="size-5 text-gray-600" />
        </div>

        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white"
            >
              <ChevronLeftIcon className="size-5 text-gray-600" />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white"
            >
              <ChevronRightIcon className="size-5 text-gray-600" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-sm text-white">
            {selectedImageIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImageIndex === index
                  ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full bg-white object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="flex h-full items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="max-h-full max-w-full"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={displayImages[selectedImageIndex]}
                  alt={`Product image ${selectedImageIndex + 1}`}
                  className="mx-auto max-h-full max-w-full object-contain"
                />

                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 cursor-pointer rounded-full bg-white/90 p-2 backdrop-blur-sm transition-colors hover:bg-white"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-600" />
                </button>

                {/* Navigation in Modal */}
                {displayImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-3 backdrop-blur-sm transition-colors hover:bg-white"
                    >
                      <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-3 backdrop-blur-sm transition-colors hover:bg-white"
                    >
                      <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                    </button>
                  </>
                )}

                {/* Image Counter in Modal */}
                {displayImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-800 backdrop-blur-sm">
                    {selectedImageIndex + 1} / {displayImages.length}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductImageGallery;
