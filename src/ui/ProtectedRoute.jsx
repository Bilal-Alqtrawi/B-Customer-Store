import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../features/authentication/useUser";
import SpinnerFullPage from "./SpinnerFullPage";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/auth");
    },
    [isAuthenticated, isLoading, navigate],
  );

  if (isLoading) return <SpinnerFullPage />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
