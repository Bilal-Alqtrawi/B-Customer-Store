import { Link } from "react-router";
import CartItem from "../features/cart/CartItem";
import { useCart } from "../features/cart/useCart";
import Spinner from "../ui/Spinner";
import OrderSummary from "../features/order/OrderSummry";
import { ShoppingBagIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useUpdateQuantity } from "../features/cart/useUpdateQunatity";

function Cart() {
  const { data: cartItems, isLoading } = useCart();
  const { isUpdating, updateItemQuantity } = useUpdateQuantity();

  function handleUpdateQuantity(productId, quantity, stock, price) {
    updateItemQuantity({
      productId,
      quantity,
      stock,
      price,
    });
  }

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  if (!cartItems || cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-32 text-center"
      >
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-100">
          <ShoppingBagIcon className="h-16 w-16 text-gray-400" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-800">
          Your Cart is Empty
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-3 font-semibold text-white transition-transform hover:scale-105"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Start Shopping</span>
        </Link>
      </motion.div>
    );
  }

  const subtotal =
    cartItems?.map((item) => item?.price)?.reduce((acc, curr) => acc + curr) ||
    0;

  return (
    <div className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Link
            to="/products"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[var(--primary)]"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--textPrimary)]">
            Shopping Cart
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    // onRemoveItem={removeItem}
                    isLoading={isUpdating}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {subtotal && (
            <div className="lg:col-span-1">
              <OrderSummary subtotal={subtotal} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
