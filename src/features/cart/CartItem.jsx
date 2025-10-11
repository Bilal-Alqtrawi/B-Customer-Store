import { Link } from "react-router";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { useRemoveItem } from "./useRemoveItem";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

function CartItem({ item, onUpdateQuantity, isLoading }) {
  const {
    quantity,
    price,
    products: { image, title, price: productPrice, stock },
  } = item;

  const { removeItem, isPending } = useRemoveItem();

  function handleRemoveItem() {
    const returendStock = stock + quantity;

    removeItem({ item, returendStock });
  }

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex items-start gap-4 border-b border-gray-200 py-6"
    >
      <Link
        to={`/products/${item.product_id}`}
        className="w-24 flex-shrink-0 sm:w-32"
      >
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain p-2"
          />
        </div>
      </Link>

      <div className="flex flex-grow flex-col">
        <div className="flex justify-between">
          <div>
            <Link
              to={`/products/${item.product_id}`}
              className="text-base font-bold text-gray-800 hover:underline sm:text-lg"
            >
              {title}
            </Link>
            <p className="mt-1 text-sm text-gray-500">
              ${productPrice?.toFixed(2)}
            </p>
          </div>
          <p className="text-lg font-bold text-[var(--textPrimary)]">
            ${price.toFixed(2)}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-gray-300 p-1">
            <button
              onClick={() => {
                const quantity = item.quantity - 1;
                const price = item.products.price * quantity;

                onUpdateQuantity(
                  item.product_id,
                  quantity,
                  item.products.stock + 1,
                  price,
                );
              }}
              className="p-1.5 text-gray-500 hover:cursor-pointer hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading || item.quantity <= 1}
            >
              <MinusIcon className="size-4" />
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => {
                const quantity = item.quantity + 1;
                const price = item.products.price * quantity;

                onUpdateQuantity(
                  item.product_id,
                  quantity,
                  item.products.stock - 1,
                  price,
                );
              }}
              className="p-1.5 text-gray-500 hover:cursor-pointer hover:text-black disabled:cursor-not-allowed"
              disabled={isLoading || isPending || item.products.stock === 0}
            >
              <PlusIcon className="size-4" />
            </button>
          </div>

          <button
            onClick={handleRemoveItem}
            className="flex items-center gap-1 text-sm text-red-500 hover:cursor-pointer hover:text-red-700"
            disabled={isPending}
          >
            <TrashIcon className="size-4" />
            <span>{isPending ? "Removing..." : "Remove"}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default CartItem;
