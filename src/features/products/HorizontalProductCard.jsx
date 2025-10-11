import { Link } from "react-router";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Button from "../../ui/Button";

function HorizontalProductCard({ product }) {
  return (
    <div className="group flex h-full w-full items-center gap-4 rounded-xl bg-white p-4 shadow-md transition-all duration-300 hover:shadow-xl">
      {/* الصورة */}
      <Link to={`/products/${product.id}`} className="w-1/3 flex-shrink-0">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </Link>

      {/* التفاصيل */}
      <div className="flex w-2/3 flex-col">
        <span className="mb-1 text-xs font-semibold text-gray-500 capitalize">
          {product.category}
        </span>
        <Link to={`/products/${product.id}`}>
          <h3 className="mb-2 line-clamp-2 font-bold text-gray-800">
            {product.title}
          </h3>
        </Link>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-extrabold text-[var(--textPrimary)]">
            ${product.price}
          </span>
          <Button size="md">
            <ShoppingCartIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HorizontalProductCard;
