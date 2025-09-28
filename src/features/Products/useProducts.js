import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

// For get data we use useQuery
export const useProducts = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { isLoading, data, error };
};
