import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  StarIcon,
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowsRightLeftIcon,
  InformationCircleIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Button from "../ui/Button";
import SpinnerFullPage from "../ui/SpinnerFullPage";
import Error from "../ui/Error";
import { useProduct } from "../features/products/useProduct";
import { useCart } from "../features/cart/useCart";
import { useAddItem } from "../features/cart/useAddItem";
import ProductImageGallery from "../features/Products/ProductImageGallery";
import ProductReviews from "../features/products/ProductReviews";
import ProductSpecifications from "../features/products/ProductSpecifications";
import RelatedProducts from "../features/products/RelatedProducts";
import { useUpdateQuantity } from "../features/cart/useUpdateQunatity";

// Mock data for demonstration
const mockSizes = ["XS", "S", "M", "L", "XL"];
const mockColors = ["Black", "White", "Navy", "Gray"];

const tabs = [
  { id: "description", label: "Description", icon: InformationCircleIcon },
  {
    id: "specifications",
    label: "Specifications",
    icon: InformationCircleIcon,
  },
  { id: "reviews", label: "Reviews", icon: ChatBubbleLeftRightIcon },
];

function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct();
  const { isLoading: isAddingToCart, data: cart } = useCart();
  const { addProductInCart, isPending } = useAddItem();
  const { updateItemQuantity, isUpdating } = useUpdateQuantity();

  const isInCart = cart?.some((item) => item.product_id === product?.id);

  // Local state for product interactions
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const mockImages = product
    ? [product.image, product.image, product.image]
    : [];

  const finalPrice =
    product?.price - (product?.price * product?.discount) / 100;
  useEffect(() => {
    if (product && product.category.includes("clothing")) {
      setSelectedSize(mockSizes[2]);
      setSelectedColor(mockColors[0]);
    }
  }, [product]);

  useEffect(
    function () {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    },
    [location.pathname],
  );

  const handleAddToCart = () => {
    if (isInCart) {
      const quan = cart.find(
        (item) => item.product_id === product.id,
      )?.quantity;

      const updatedQuantity = quan + selectedQuantity;
      updateItemQuantity(
        {
          productId: product.id,
          quantity: updatedQuantity,
          stock:
            product.stock - selectedQuantity <= 0
              ? 0
              : product.stock - selectedQuantity,
          price: finalPrice * updatedQuantity,
        },
        {
          onSuccess: () => {
            setSelectedQuantity(1);
          },
        },
      );
      return;
    }

    let cartItem = {
      product_id: product.id,
      quantity: selectedQuantity,
      price: finalPrice,
    };

    if (product.category.includes("clothing")) {
      cartItem = { ...cartItem, size: selectedSize, color: selectedColor };
    }

    addProductInCart(
      {
        cartItem,
        stock:
          product.stock - selectedQuantity === 0
            ? 0
            : product.stock - selectedQuantity,
      },
      {
        onSuccess: () => {
          setSelectedQuantity(1);
        },
      },
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) return <SpinnerFullPage />;
  if (error || !product)
    return (
      <div className="container mx-auto flex h-screen items-center justify-center px-4 py-32">
        <div className="flex-1">
          <Error error="Product not found" />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-b-[#ccc]">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link
              to="/"
              className="transition-colors hover:text-[var(--primary)]"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              to="/products"
              className="transition-colors hover:text-[var(--primary)]"
            >
              Products
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-800">
              {product.category}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 transition-colors hover:text-[var(--primary)]"
        >
          <ArrowLeftIcon className="size-5" />
          <span>Back to Products</span>
        </motion.button>

        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductImageGallery images={mockImages} />
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category Badge & Actions */}
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full bg-[var(--primary)] px-3 py-1 text-sm font-semibold text-white">
                {product.category}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="rounded-full p-2 transition-colors hover:bg-gray-100"
                >
                  {isWishlisted ? (
                    <HeartSolidIcon className="size-6 text-red-500" />
                  ) : (
                    <HeartIcon className="size-6 text-gray-400" />
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="rounded-full p-2 transition-colors hover:bg-gray-100"
                >
                  <ShareIcon className="size-6 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl leading-tight font-bold text-[var(--textPrimary)]">
              {product.title}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon
                    key={i}
                    className={`size-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-current text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {product.rating}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-green-600">
                ${finalPrice.toFixed(2)}
              </span>
              {product.discount && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ${((product.price * product.discount) / 100).toFixed(2)}
                  </span>
                  <span className="rounded bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Product Description */}
            <div className="prose prose-gray max-w-none">
              <p className="leading-relaxed text-gray-700">
                {product.description}
              </p>
            </div>

            {product.category.includes("clothing") && (
              <>
                {/* Size Selection */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-lg border px-4 py-2 font-medium transition-all ${
                          selectedSize === size
                            ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Color Selection */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-lg border px-4 py-2 font-medium transition-all ${
                          selectedColor === color
                            ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {product.stock > 0 ? (
              <>
                {/* Quantity Selection */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-gray-300">
                      <button
                        onClick={() =>
                          setSelectedQuantity(Math.max(1, selectedQuantity - 1))
                        }
                        className={`p-2 transition-colors hover:bg-gray-100 ${
                          selectedQuantity <= 1
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                        disabled={selectedQuantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-2 font-semibold">
                        {selectedQuantity}
                      </span>
                      <button
                        onClick={() =>
                          setSelectedQuantity(
                            selectedQuantity + 1 <= product.stock
                              ? selectedQuantity + 1
                              : product.stock,
                          )
                        }
                        className={`p-2 transition-colors hover:bg-gray-100 ${
                          selectedQuantity >= product.stock
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      ✓ In Stock ({product.stock} items left)
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 pt-6 sm:flex-row">
                  <Button
                    onClick={handleAddToCart}
                    disabled={isUpdating || isPending}
                    size="lg"
                    className="flex flex-1 items-center justify-center gap-2"
                  >
                    <ShoppingCartIcon className="size-5" />
                    {isPending || isUpdating ? "Updating..." : "Add to Cart"}
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                  >
                    Buy Now
                  </Button>
                </div>
              </>
            ) : (
              <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
                <h3 className="mb-2 text-xl font-bold text-red-600">
                  Out of Stock
                </h3>
                <p className="mb-4 text-gray-700">
                  Unfortunately, this product is currently unavailable.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button
                    disabled
                    className="flex cursor-not-allowed items-center justify-center gap-2 opacity-60"
                  >
                    <ShoppingCartIcon className="size-5" />
                    Add to Cart
                  </Button>
                  <Button
                    disabled
                    variant="secondary"
                    className="cursor-not-allowed opacity-60"
                  >
                    Buy Now
                  </Button>
                </div>

                <p className="mt-4 text-sm text-gray-500">
                  Try similar products below or check back later for restock
                  updates.
                </p>
              </div>
            )}

            {/* Product Features */}
            <div className="grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-3 text-sm">
                <TruckIcon className="size-5 text-green-600" />
                <span className="text-gray-700">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheckIcon className="size-5 text-blue-600" />
                <span className="text-gray-700">2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ArrowsRightLeftIcon className="size-5 text-purple-600" />
                <span className="text-gray-700">30 Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>

        <ProductTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          product={product}
        />

        {/* Related Products Section */}
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
        />
      </div>
    </div>
  );
}

function ProductTabs({ activeTab, setActiveTab, product }) {
  return (
    <div className="mb-16">
      {/* Tab Navigation */}
      <div className="container mx-auto mb-8 border-b border-gray-200 px-4">
        <nav className="flex flex-wrap space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              <tab.icon className="size-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "description" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Product Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="mb-4 leading-relaxed text-[var(--textPrimary)]">
                  {product.description}
                </p>
                <p className="leading-relaxed text-[var(--textPrimary)]">
                  This premium product is crafted with attention to detail and
                  quality materials. Perfect for everyday use, it combines style
                  and functionality in a way that meets the highest standards.
                  Whether you're looking for durability, comfort, or aesthetic
                  appeal, this product delivers on all fronts.
                </p>
              </div>
            </div>
          )}

          {activeTab === "specifications" && (
            <ProductSpecifications product={product} />
          )}

          {activeTab === "reviews" && (
            <ProductReviews
              productId={product.id}
              averageRating={product.rating}
              totalReviews={product.reviews}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Product;
