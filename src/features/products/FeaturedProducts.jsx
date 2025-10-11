import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useProducts } from "./useProducts";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import Button from "../../ui/Button";
import ProductItem from "./ProductItem";

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

export default FeaturedProducts;
