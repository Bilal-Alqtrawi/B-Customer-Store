import {
  WrenchScrewdriverIcon,
  SparklesIcon,
  CogIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

function CategoryList({ onCategorySelect, selectedCategory }) {
  const categories = [
    {
      id: "car-interior",
      name: "Car Interior",
      icon: WrenchScrewdriverIcon,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "car-care",
      name: "Car Care",
      icon: SparklesIcon,
      color: "bg-red-100 text-red-600",
    },
    {
      id: "maintenance",
      name: "Maintenance",
      icon: CogIcon,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "body-parts",
      name: "Body Parts",
      icon: TruckIcon,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`flex flex-col items-center rounded-xl border-2 p-4 transition-all ${
                isSelected
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className={`mb-2 rounded-full p-3 ${category.color}`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <span className="text-center text-sm font-medium text-gray-900">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryList;
