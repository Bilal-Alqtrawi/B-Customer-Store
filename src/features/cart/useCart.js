import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../services/apiCart";

export function useCart() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  return { isLoading, error, data };
}
