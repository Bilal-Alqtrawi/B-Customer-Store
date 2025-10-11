import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ProductModal from "../../ui/ProductModal";
import Button from "../../ui/Button";
import ProductDetailsContent from "./ProductDetailsContent";
import { useAddItem } from "../cart/useAddItem";
import { Link } from "react-router";
import { useCart } from "../cart/useCart";
import { useUpdateQuantity } from "../cart/useUpdateQunatity";

export default function ProductItem({ product }) {
  const { addProductInCart, isPending: isAdded } = useAddItem();
  const { updateItemQuantity, isUpdating } = useUpdateQuantity();
  const { data: cartItems } = useCart();

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // pre-load for image
  useEffect(() => {
    const img = new Image();
    img.src = product.image;
    img.onload = () => setIsImageLoaded(true);
  }, [product.image]);

  const isInCart = cartItems?.some((item) => item.product_id === product?.id);

  function handleAddToCart(product) {
    if (isInCart) {
      const item = cartItems.find((item) => item.product_id === product.id);
      const updatedQuantity = item.quantity + 1;
      updateItemQuantity({
        productId: product.id,
        quantity: updatedQuantity,
        stock: product.stock - 1 === 0 ? 0 : product.stock - 1,
        price: item.price * updatedQuantity,
      });
      return;
    }

    const cartItem = {
      product_id: product.id,
      quantity: 1,
      price: product.price,
    };

    addProductInCart({
      cartItem,
      stock: product.stock - 1 === 0 ? 0 : product.stock - 1,
    });
  }

  return (
    <ProductModal>
      <div
        key={product.id}
        className="group flex flex-col overflow-hidden rounded-xl bg-[var(--surface)] shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
      >
        <ProductModal.Open opens="product-details">
          <div className="relative h-48 w-full cursor-pointer overflow-hidden bg-gray-100 sm:h-64">
            {!isImageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
            )}
            {product.stock === 0 && (
              <span className="absolute bottom-3 left-3 rounded bg-[var(--highlight)] px-2 py-1 text-xs font-semibold text-white">
                Out of Stock
              </span>
            )}
            <img
              src={product.image}
              alt={product.title}
              className={`h-full w-full object-contain p-4 transition-all duration-500 group-hover:scale-110 sm:p-6 ${isImageLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
              loading="lazy"
              onLoad={() => setIsImageLoaded(true)}
            />
            <span className="absolute top-4 right-4 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold text-white">
              {product.category}
            </span>
          </div>
        </ProductModal.Open>

        <div className="flex flex-1 flex-col space-y-5 bg-white p-5">
          <Link
            to={`/products/${product.id}`}
            className="transtion duration-300 hover:underline"
          >
            <h3 className="line-clamp-1 text-lg leading-3.5 font-bold text-[var(--textPrimary)]">
              {product.title}
            </h3>
          </Link>

          <p className="line-clamp-2 text-sm text-[var(--textSecondary)]">
            {product.description}
          </p>

          <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xl font-extrabold text-green-700 sm:text-2xl">
              ${product.price}
            </span>
            <Button
              variant="primary"
              size="md"
              className={`hover:bg-orange-500 hover:shadow-orange-500/40 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 ${
                product.stock === 0
                  ? "cursor-not-allowed bg-gray-400 hover:cursor-not-allowed hover:bg-gray-400"
                  : ""
              }`}
              onClick={() => handleAddToCart(product)}
              disabled={isAdded || isUpdating || product.stock === 0}
            >
              {product.stock === 0 ? (
                <span>Out of Stock</span>
              ) : (
                <>
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>
                    {isAdded || isUpdating ? "Adding..." : "Add to Cart"}
                  </span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <ProductModal.Window name="product-details">
        <ProductDetailsContent product={product} />
      </ProductModal.Window>
    </ProductModal>
  );
}
