import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useNavigate, useSearchParams } from "react-router";
import { useProducts } from "../features/products/useProducts";

function SearchBar() {
  const { data: products } = useProducts();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchOpen, setSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const close = () => {
    setSearchOpen(false);
    setSuggestions([]);
  };
  const ref = useOutsideClick(close);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    // Simulate dynamic search
    const results = products
      ?.filter((product) =>
        product?.title?.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 6);

    setSuggestions(results);
  }, [query, products]);

  // 📦 Keep query synced with URL param
  useEffect(
    function () {
      const queryFromUrl = searchParams.get("search") || "";

      setQuery(queryFromUrl);
    },
    [searchParams],
  );

  // 🧭 Hide search bar when scrolling
  useEffect(function () {
    const handleScroll = () => setSearchOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSelect(suggestion) {
    navigate(`/products?search=${suggestion}`);
    close();
  }

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      navigate(`/products?search=${query}`);
      close();
    }
  }

  return (
    <motion.div
      className="relative flex items-center rounded-full border border-gray-300 bg-white shadow-sm"
      animate={{
        width: searchOpen ? "250px" : "44px",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      ref={ref}
    >
      <motion.button
        onClick={() => setSearchOpen((open) => !open)}
        className={`z-10 flex size-11 items-center justify-center text-gray-500`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MagnifyingGlassIcon className="size-5" />
      </motion.button>

      <AnimatePresence>
        {searchOpen && (
          <motion.input
            key="search"
            type="text"
            value={query}
            onChange={handleChange}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="absolute right-4 left-11 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            placeholder="Search products..."
            autoFocus
            onKeyDown={handleKeyDown}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-0 left-0 z-50 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            {suggestions.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item.title)}
                className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
              >
                <MagnifyingGlassIcon className="size-4 shrink-0 text-gray-400" />
                <span className="line-clamp-1">{item.title}</span>
              </li>
            ))}
          </motion.ul>
        )}

        {searchOpen && query && suggestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-12 right-0 left-0 rounded-lg border border-gray-200 bg-white p-3 text-center text-sm text-gray-500 shadow-lg"
          >
            No results found
          </motion.div>
        )}
      </AnimatePresence>

      {searchOpen && (
        <div
          onClick={close}
          className="fixed inset-0 top-20 h-screen w-full bg-black/80"
        ></div>
      )}
    </motion.div>
  );
}

export default SearchBar;
