import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function useLogout() {
  const navigate = useNavigate();
  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Success Logout");
      setTimeout(() => {
        navigate("/auth", { replace: true });
      }, 1500);
    },
    onError: (err) => {
      console.error(err.message);
      toast.error(err.message);
    },
  });

  return { logout };
}
