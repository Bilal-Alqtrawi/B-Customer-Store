import { useState, useMemo, useEffect } from "react";
import { useProducts } from "../features/products/useProducts";
import Error from "../ui/Error";
import ProductItem from "../features/products/ProductItem";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import FilterModal from "../ui/FilterModal";
import ProductCarousel from "../features/products/ProductCarousel";
import { useSearchParams } from "react-router";
import NoResult from "../ui/NoResult";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: allProducts } = useProducts();

  const {
    isLoading,
    error,
    data: products,
  } = useProducts(searchParams.get("category"));

  const [query, setQuery] = useState(function () {
    const searchBarQuery = searchParams.get("search");
    return searchBarQuery ? searchBarQuery : "";
  });
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { minPrice, maxPrice } = useMemo(
    function () {
      if (!products) return { minPrice: 0, maxPrice: 1000 };
      const prices = products.map((p) => p.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      return { minPrice: min, maxPrice: max };
    },
    [products],
  );

  useEffect(() => {
    if (maxPrice && !priceRange) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [maxPrice, minPrice, priceRange]);

  useEffect(
    function () {
      const query = searchParams.get("search");
      if (query) {
        setQuery(searchParams.get("search"));
      } else if (query === "") setQuery("");
    },
    [searchParams],
  );

  const filteredAndSortedProducts = useMemo(() => {
    if (!products || !priceRange) return [];
    const category = searchParams.get("category") || "all";
    const sortByValue = searchParams.get("sortBy") || sortBy;

    let result = products
      ?.filter((p) =>
        category !== "all" ? p.category === category : p.category,
      )
      .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (query.length >= 3) {
      console.log(query);
      result = result.filter((p) => {
        return p.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    switch (sortByValue) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [products, sortBy, searchParams, priceRange, query]);

  const handleCategoryClick = (category) => {
    searchParams.set("category", category);
    setSearchParams(searchParams);
  };

  const handleSortClick = (value) => {
    setSortBy(value);
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  };

  function clearFilters() {
    setQuery("");
    setSortBy("relevance");
    setPriceRange([minPrice, maxPrice]);
    searchParams.delete("category");
    searchParams.delete("sortBy");
    setSearchParams(searchParams);
  }

  if (error) return <Error message={error.message} />;
  const allCategories = [...new Set(allProducts?.map((p) => p.category))];

  return (
    <div className="bg-gray-50 py-32">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <span className="text-base font-semibold tracking-wider text-[var(--primary)] uppercase">
            Discover Our Collection
          </span>{" "}
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[var(--textPrimary)] sm:text-5xl">
            Products
          </h1>
          <p className="text-md mx-auto mt-4 max-w-2xl text-[var(--textSecondary)] sm:text-lg">
            Find the perfect item from our curated collection of high-quality
            goods.
          </p>
        </div>

        {/* Tools */}
        <div className="mb-8 flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Product"
              className="w-full rounded-full border-gray-300 bg-white py-2.5 pr-4 pl-10 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          {/* Filter */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex-shrink-0 rounded-full bg-white p-3 shadow-sm"
          >
            <FunnelIcon className="size-5" />
          </button>
        </div>

        <div className="min-h-[60vh]">
          {/*  trace state of display/hidden elements */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <div
                    key={i}
                    className="flex animate-pulse flex-col overflow-hidden rounded-xl bg-[var(--surface)] shadow-md"
                  >
                    <div className="h-48 bg-gray-200 sm:h-64" />
                    <div className="flex flex-col space-y-3 p-5">
                      <div className="h-4 w-3/4 rounded bg-gray-200" />
                      <div className="h-3 w-full rounded bg-gray-200" />
                      <div className="h-3 w-5/6 rounded bg-gray-200" />
                      <div className="mt-4 h-10 w-full rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <motion.div key="products-view">
                {viewMode === "grid" ? (
                  <motion.div
                    layout // save layout of Grid
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                  >
                    {filteredAndSortedProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout="position" // display element in new position smoothly
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <ProductItem product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <ProductCarousel products={filteredAndSortedProducts} />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="no-results-view"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <NoResult
                  actions={[
                    {
                      label: "Clear All Filters",
                      onClick: clearFilters,
                      variant: "primary",
                    },
                  ]}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Filter */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        sortBy={sortBy}
        onSelectSort={handleSortClick}
        viewMode={viewMode}
        setViewMode={setViewMode}
        allCategories={allCategories}
        onCategoryClick={handleCategoryClick}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
}

export default Products;
