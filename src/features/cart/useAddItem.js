import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCartItem } from "../../services/apiCart";
import { toast } from "react-toastify";

export function useAddItem() {
  const queryClient = useQueryClient();

  const { mutate: addProductInCart, isPending } = useMutation({
    mutationFn: (item) => addCartItem(item),
    onSuccess: () => {
      toast.success("New Item succesfully addedd");
      queryClient.invalidateQueries({ queryKey: ["products", "cart"] });
    },
    onError: (err) => {
      console.error("mutate: ERROR", err);
      toast.error(err.message);
    },
  });

  return { addProductInCart, isPending };
}
