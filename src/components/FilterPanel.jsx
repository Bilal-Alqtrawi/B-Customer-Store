// src/ui/FilterPanel.jsx

import { XMarkIcon } from "@heroicons/react/24/outline";
import Slider from "rc-slider"; // استيراد المنزلق
import "rc-slider/assets/index.css"; // استيراد أنماط المنزلق

function FilterPanel({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  setPriceRange,
  onClose, // دالة لإغلاق اللوحة على الموبايل
}) {
  return (
    <aside className="flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
        <h3 className="text-xl font-bold text-[var(--textPrimary)]">Filters</h3>
        {/* زر الإغلاق (يظهر فقط عند تمرير دالة onClose) */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden"
            aria-label="Close filters"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* فلتر الفئة */}
      <div className="mb-8">
        <h4 className="mb-4 font-semibold text-gray-800">Category</h4>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="h-4 w-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <label
                htmlFor={category}
                className="ml-3 text-sm text-gray-600 capitalize"
              >
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* فلتر السعر */}
      <div>
        <h4 className="mb-4 font-semibold text-gray-800">Price Range</h4>
        <div className="px-2">
          <Slider
            range
            min={0}
            max={1000} // يمكنك جعل هذا الرقم ديناميكيًا بناءً على أعلى سعر
            defaultValue={priceRange}
            onAfterChange={(value) => setPriceRange(value)}
            trackStyle={[{ backgroundColor: "var(--primary)" }]}
            handleStyle={[
              {
                borderColor: "var(--primary)",
                backgroundColor: "white",
                borderWidth: 2,
              },
              {
                borderColor: "var(--primary)",
                backgroundColor: "white",
                borderWidth: 2,
              },
            ]}
            railStyle={{ backgroundColor: "#E5E7EB" }}
          />
        </div>
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </aside>
  );
}

export default FilterPanel;
