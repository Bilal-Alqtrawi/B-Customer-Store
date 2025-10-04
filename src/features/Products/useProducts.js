import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, getFilteredProducts } from "../../services/apiProducts";

// For get data we use useQuery
export const useProducts = (category = "all") => {
  const { isLoading, data, error } = useQuery({
    // each category have cache
    queryKey: ["products", category],
    queryFn: () =>
      category && category !== "all"
        ? getFilteredProducts(category)
        : getProducts(),
  });

  return { isLoading, data, error };
};
