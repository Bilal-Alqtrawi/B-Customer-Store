import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Button from "../../ui/Button";

export default function ProductDetailsContent({ product }) {
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
        <Button size="lg">
          <ShoppingCartIcon className="h-5 w-5" />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
}
