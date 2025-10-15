import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmail } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";

export function useResendEmail() {
  const { mutate: resendEmail } = useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: () => {
      toast.success("We send email verification again");
    },
  });

  return { resendEmail };
}
