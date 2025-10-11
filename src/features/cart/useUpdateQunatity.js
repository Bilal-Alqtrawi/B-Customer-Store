import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuantity } from "../../services/apiCart";
import { toast } from "react-toastify";

export function useUpdateQuantity() {
  const queryClient = useQueryClient();
  const { mutate: updateItemQuantity, isPending } = useMutation({
    mutationFn: ({ productId, quantity, stock, price }) =>
      updateQuantity(productId, quantity, stock, price),

    onSuccess: (_, { productId }) => {
      toast.success("Product in Cart successfully updated");

      // Update product data
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Faild in Update quantity of item");
    },
  });

  return { updateItemQuantity, isUpdating: isPending };
}
