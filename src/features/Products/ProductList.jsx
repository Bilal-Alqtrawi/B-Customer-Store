import { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useProducts } from "./useProducts";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router";

function ProductList() {
  const [isExpended, setIsExpended] = useState(false);
  const { isLoading, data: products, error } = useProducts();
  const [currentProduct, setCurrentProduct] = useState(null);

  function handleClick(id) {
    setCurrentProduct((currentProduct) => (id === currentProduct ? null : id));
    console.log(currentProduct);
    setIsExpended((ex) => !ex);
  }

  console.log(currentProduct);

  if (isLoading) return <Spinner />;
  if (error) return <Error error="Error In Fetching Products Data" />;

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="section-intor mb-16 space-y-2 text-center">
          <h2 className="text-4xl font-extrabold tracking-wide">
            List Of Products
          </h2>
          <p className="text-sm font-medium text-[var(--textSecondary)]">
            There is Some of Featured Products
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductItem product={product} currentProduct={currentProduct} />
          ))}
        </div>
        <div className="mt-20 text-center">
          <Link
            to="/products"
            className="group transtion mx-auto inline-flex items-center space-x-2 rounded-md bg-[var(--background-btn)] px-4 py-2 text-sm text-white shadow-lg hover:bg-amber-600 hover:shadow-xl"
          >
            <span className="transition duration-300 group-hover:translate-x-1.5">
              <ShoppingCartIcon className="size-5" />
            </span>
            <span>Explore More</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductItem({ product, currentProduct }) {
  const isActive = product.id === currentProduct;

  return (
    <div
      key={product.id}
      className="group flex flex-col overflow-hidden rounded-xl bg-[var(--surface)] shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-white p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute top-4 right-4 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold text-white">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col bg-white p-5">
        <h3 className="mb-3 line-clamp-2 text-lg font-bold text-[var(--textPrimary)]">
          {product.title}
        </h3>

        <AnimatePresence initial={false}>
          {isActive && (
            <motion.p
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "linear" }}
              className="line-clamp-none text-sm leading-relaxed text-[var(--textSecondary)]"
            >
              {product.description}
            </motion.p>
          )}

          {!isActive && (
            <motion.p
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "linear" }}
              className="line-clamp-2 text-sm text-[var(--textSecondary)]"
            >
              {product.description}
            </motion.p>
          )}

          <button
            className="mb-4 self-start text-sm font-semibold text-amber-400 underline transition-colors hover:text-amber-500"
            onClick={() => handleClick(product.id)}
          >
            {isActive ? "Read Less" : "Read More"}
          </button>
        </AnimatePresence>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-extrabold text-green-700">
            ${product.price}
          </span>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-[var(--background-btn)] px-4 py-2 font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-500 hover:shadow-orange-500/40 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-none">
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
