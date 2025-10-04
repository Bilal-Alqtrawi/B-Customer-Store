import { AnimatePresence, motion } from "framer-motion";
import {
  XMarkIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Button from "./Button";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

const modalVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 250,
      staggerChildren: 0.05,
    },
  },
  exit: {
    y: "100%",
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

function FilterModal({
  isOpen,
  onClose,
  sortBy,
  onSelectSort,
  viewMode,
  setViewMode,
  allCategories,
  onCategoryClick,
  priceRange,
  setPriceRange,
  minPrice,
  maxPrice,
}) {
  const [searchParams] = useSearchParams();
  useEffect(
    function () {
      if (isOpen) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "visible";

      return () => (document.body.style.overflow = "visible");
    },
    [isOpen],
  );

  const sortByValue = searchParams.get("sortBy") || sortBy;
  const category = searchParams.get("category");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          {/* Filter Panale */}
          <motion.div
            variants={modalVariants}
            // initial={{ y: "100%" }}
            // animate={{ y: 0 }}
            // exit={{ y: "100%" }}
            initial="hidden"
            animate="visible"
            exit="exit"
            // transition={{ type: "tween", damping: 30, stiffness: 250 }}
            transition={{
              type: "keyframes",
              damping: 30,
            }}
            className="fixed right-0 bottom-0 left-0 z-50 flex h-[86vh] flex-col rounded-t-2xl bg-gray-50"
          >
            {/* Header */}
            <motion.div
            variants={itemVariants}
            className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-bold">Filter & Sort</h2>
              <button onClick={onClose}>
                <XMarkIcon className="size-6" />
              </button>
            </motion.div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-4">
              <div className="mb-6">
                <h3 className="mb-3 font-semibold">View As</h3>
                <div className="flex w-full rounded-lg bg-gray-200 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex-1 rounded-md p-2 text-sm font-semibold transition-colors ${viewMode === "grid" ? "bg-white text-gray-800 shadow-sm" : "bg-transparent text-gray-500"}`}
                  >
                    <Squares2X2Icon className="mx-auto h-5 w-5" />
                  </button>

                  <button
                    onClick={() => setViewMode("carousel")}
                    className={`flex-1 rounded-md p-2 text-sm font-semibold transition-colors ${viewMode === "carousel" ? "bg-white text-gray-800 shadow-sm" : "bg-transparent text-gray-500"}`}
                  >
                    <ViewColumnsIcon className="mx-auto h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <h3 className="mb-3 font-semibold">Sort by</h3>
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-100"
                    >
                      <span
                        className={
                          sortByValue === option.value
                            ? "font-bold text-amber-600"
                            : ""
                        }
                      >
                        {option.label}
                      </span>
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sortByValue === option.value}
                        onChange={() => onSelectSort(option.value)}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="mb-3 font-semibold">Category</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    key="all-categories"
                    onClick={() => onCategoryClick("all")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${category && category === "all" ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-800"}`}
                  >
                    All
                  </button>
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => onCategoryClick(cat)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${category === cat ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <h3 className="mb-3 font-semibold">Price Range</h3>
                <div className="px-2">
                  <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange}
                    onChange={(value) => setPriceRange(value)}
                    trackStyle={[{ backgroundColor: "var(--primary)" }]}
                    handleStyle={[
                      { borderColor: "var(--primary)" },
                      { borderColor: "var(--primary)" },
                    ]}
                  />
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <motion.div variants={itemVariants} className="border-t p-4">
              <Button onClick={onClose} size="lg" className="w-full">
                Apply Filters
              </Button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default FilterModal;
