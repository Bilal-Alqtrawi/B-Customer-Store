import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useProducts } from "./useProducts";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import Button from "../../ui/Button";
import ProductModal from "../../ui/ProductModal";

function FeaturedProducts() {
  const { isLoading, data: products, error } = useProducts();

  if (error) return <Error error="Error In Fetching Products Data" />;

  return (
    <section className="relative bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="section-intro mb-16 text-center">
          <h2 className="text-base font-semibold tracking-wider text-[var(--primary)] uppercase">
            Discover Our Collection
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-[var(--textPrimary)] sm:text-5xl">
            Featured Products
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--textSecondary)]">
            Handpicked for you. Explore our best-selling items that our
            customers love.
          </p>
        </div>

        {isLoading && !error && <Spinner />}
        {!isLoading && !error && (
          <>
            <ProductGrid products={products} />
            <div className="mt-20 text-center">
              <Button
                as="Link"
                to="/products"
                variant="primary"
                size="sm"
                className="group mx-auto space-x-2"
              >
                <span className="transition duration-300 group-hover:translate-x-1.5">
                  <ShoppingCartIcon className="size-5" />
                </span>
                <span>Explore More</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ProductGrid({ products }) {
  if (products?.length === 0)
    return (
      <p className="text-lg font-semibold">
        No Products Available in this current time
      </p>
    );
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.slice(0, 4).map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
}

function ProductItem({ product }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // pre-load for image
  useEffect(() => {
    const img = new Image();
    img.src = product.image;
    img.onload = () => setIsImageLoaded(true);
  }, [product.image]);

  return (
    <ProductModal>
      <ProductModal.Open opens="product-details">
        <div
          key={product.id}
          className="group flex cursor-pointer flex-col overflow-hidden rounded-xl bg-[var(--surface)] shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
        >
          <div className="relative h-48 w-full overflow-hidden bg-gray-100 sm:h-64">
            {!isImageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
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

          <div className="flex flex-1 flex-col space-y-5 bg-white p-5">
            <h3 className="mb-3 line-clamp-2 text-lg font-bold text-[var(--textPrimary)]">
              {product.title}
            </h3>

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
                className="hover:bg-orange-500 hover:shadow-orange-500/40 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-none"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Add</span>
              </Button>
            </div>
          </div>
        </div>
      </ProductModal.Open>

      <ProductModal.Window name="product-details">
        <ProductDetailsContent product={product} />
      </ProductModal.Window>
    </ProductModal>
  );
}

function ProductDetailsContent({ product }) {
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

export default FeaturedProducts;
