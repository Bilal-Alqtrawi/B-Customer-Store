import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getProduct } from "../../services/apiProducts";

export function useProduct() {
  const { productId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    retry: false,
    refetchInterval: 1500,
  });

  return { data, isLoading, error };
}
