import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Button from "../../ui/Button";
import { useEffect } from "react";
import { useAddItem } from "../cart/useAddItem";
import { useUpdateQuantity } from "../cart/useUpdateQunatity";
import { useCart } from "../cart/useCart";

export default function ProductDetailsContent({ product }) {
  const { addProductInCart, isPending: isAdded } = useAddItem();
  const { updateItemQuantity, isUpdating } = useUpdateQuantity();
  const { data: cartItems } = useCart();

  const isInCart = cartItems?.some((item) => item.product_id === product?.id);

  function handleAddToCart() {
    if (isInCart) {
      const item = cartItems.find((item) => item.product_id === product.id);
      updateItemQuantity({
        productId: product.id,
        quantity: item.quantity + 1,
        stock: product.stock - 1 === 0 ? 0 : product.stock - 1,
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
  useEffect(
    function () {
      if (product) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
      return () => (document.body.style.overflow = "visible");
    },
    [product],
  );
  return (
    <div className="relative pt-8">
      <img
        src={product.image}
        alt={product.title}
        className="mx-auto h-60 object-contain"
      />
      <span className="absolute top-1 right-7 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold text-white md:top-4 md:right-7">
        {product.category}
      </span>
      <h3 className="mt-6 text-2xl font-bold text-[var(--textPrimary)]">
        {product.title}
      </h3>
      <p className="mt-2 text-base leading-relaxed text-[var(--textSecondary)]">
        {product.description}
      </p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-3xl font-extrabold text-[var(--textPrimary)]">
          ${product.price}
        </span>
        <Button
          size="lg"
          disabled={isAdded || isUpdating || product.stock === 0}
          onClick={handleAddToCart}
          className={
            product.stock === 0
              ? "cursor-not-allowed bg-gray-400 hover:cursor-not-allowed hover:bg-gray-400"
              : ""
          }
        >
          {product.stock === 0 ? (
            <span>Out of Stock</span>
          ) : (
            <>
              <ShoppingCartIcon className="size-5" />
              <span>{isAdded || isUpdating ? "Adding..." : "Add to Cart"}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
