import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  HeartIcon,
  ShoppingCartIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useProducts } from "./useProducts";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useCart } from "../cart/useCart";
import { useAddItem } from "../cart/useAddItem";
import { useUpdateQuantity } from "../cart/useUpdateQunatity";
import { motion } from "motion/react";

function RelatedProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  isAdding,
  isUpdating,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { isLoading: isAddingToCart, data: cart } = useCart();

  const finalPrice =
    product?.price - (product?.price * product?.discount) / 100;

  const isInCart = cart.some((item) => item.product_id === product.id);

  const quantity =
    cart?.find((item) => item.product_id === product.id)?.quantity ?? 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-[var(--primary)] px-2 py-1 text-xs font-semibold text-white">
            {product.category}
          </span>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-3 right-3 flex flex-col gap-2"
        >
          <button
            onClick={() => onToggleWishlist(product.id)}
            className="rounded-full bg-white/90 p-2 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
          >
            {isWishlisted ? (
              <HeartSolidIcon className="size-4 text-red-500" />
            ) : (
              <HeartIcon className="size-4 text-gray-600" />
            )}
          </button>
          <Link
            to={`/products/${product.id}`}
            className="rounded-full bg-white/90 p-2 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
          >
            <EyeIcon className="size-4 text-gray-600" />
          </Link>
        </motion.div>

        {/* Quick Add Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="absolute right-3 bottom-3 left-3"
        >
          <Button
            onClick={() => onAddToCart(product, finalPrice, isInCart, quantity)}
            size="sm"
            className="flex w-full items-center justify-center gap-2 hover:bg-amber-600 disabled:bg-amber-700 disabled:opacity-80"
            disabled={isAddingToCart || isAdding || isUpdating}
          >
            <ShoppingCartIcon className="size-4" />
            {isAddingToCart || isAdding || isUpdating
              ? "Loading..."
              : "Quick Add"}
          </Button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="mb-2 line-clamp-1 font-semibold text-gray-800 transition-colors hover:text-[var(--primary)]">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-green-600">
              ${finalPrice}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">4.5</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RelatedProducts({ currentProductId, category }) {
  const [wishlistedItems, setWishlistedItems] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);

  const { addProductInCart, isAdding } = useAddItem();
  const { updateItemQuantity, isUpdating } = useUpdateQuantity();

  // Fetch related products (excluding current product)
  const { data: products, isLoading } = useProducts(category);

  const relatedProducts =
    products
      ?.filter((product) => product.id !== parseInt(currentProductId))
      .slice(0, 8) || [];

  const itemsPerPage = useMemo(function () {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1280) return 3;
    return 4;
  }, []);

  const maxIndex = Math.max(0, relatedProducts?.length - itemsPerPage);

  const handleToggleWishlist = (productId) => {
    setWishlistedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleAddToCart = (product, finalPrice, isInCart, quantity) => {
    if (isInCart) {
      const updatedQuantity = quantity + 1;
      updateItemQuantity({
        productId: product.id,
        quantity: updatedQuantity,
        stock:
          product.stock - updatedQuantity <= 0
            ? 0
            : product.stock - updatedQuantity,
        price: finalPrice * updatedQuantity,
      });
      return;
    }

    let cartItem = {
      product_id: product.id,
      quantity: 1,
      price: finalPrice,
    };

    if (category.includes("clothing")) {
      cartItem = { ...cartItem, size: "M", color: "Black" };
    }

    addProductInCart({
      cartItem,
      stock: product.stock - 1 === 0 ? 0 : product.stock - 1,
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (products?.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex-1 text-center md:text-start">
          <h2 className="text-2xl font-bold text-gray-800">
            You Might Also Like
          </h2>
          <p className="mt-1 text-gray-600">Similar products in {category}</p>
        </div>

        {/* Navigation Buttons */}
        {relatedProducts.length > itemsPerPage && (
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="rounded-full border border-gray-300 p-2 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="rounded-full border border-gray-300 p-2 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="relative overflow-hidden">
        <motion.div
          animate={{ x: -currentIndex * (100 / itemsPerPage) + "%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex w-full flex-wrap items-stretch justify-center gap-6 md:justify-normal"
        >
          {relatedProducts?.map((product) => (
            <div
              key={product.id}
              className="w-full flex-shrink-0 sm:w-[48%] md:w-[31%] lg:w-[23%]"
            >
              <RelatedProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlistedItems.has(product.id)}
                isAdding={isAdding}
                isUpdating={isUpdating}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots Indicator */}
      {relatedProducts?.length > itemsPerPage && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentIndex === index ? "bg-[var(--primary)]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* View All Button */}
      <div className="mt-8 text-center">
        <Link to={`/products?category=${category}`}>
          <Button variant="secondary">View All {category} Products</Button>
        </Link>
      </div>
    </section>
  );
}

export default RelatedProducts;
