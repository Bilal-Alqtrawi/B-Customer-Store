import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function useLogin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password, remember }) =>
      loginApi({ email, password, remember }),
    onSuccess: (user) => {
      toast.success("Login successfully");
      queryClient.invalidateQueries({ queryKey: ["user", user.user] });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    },
  });

  return { login, isPending };
}
