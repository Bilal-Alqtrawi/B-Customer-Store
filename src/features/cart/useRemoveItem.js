import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../../services/apiCart";
import { toast } from "react-toastify";

export function useRemoveItem() {
  const queryClient = useQueryClient();

  const { mutate: removeItem, isPending } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      toast.success("Successfuly Remove Item from Cart");
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (err) => {
      console.error("Error:" + err);
      toast.error("Error on Remove Item from Cart");
    },
  });

  return { removeItem, isPending };
}
