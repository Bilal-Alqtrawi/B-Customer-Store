import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./ui/SpinnerFullPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import EmailConfirm from "./pages/EmailConfirm";
import { ToastContainer } from "react-toastify";

const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const Auth = lazy(() => import("./pages/Auth"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Layout = lazy(() => import("./components/Layout"));

const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => "./pages/Login");
const Register = lazy(() => import("./pages/Register"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Layout = lazy(() => "./components/Layout");

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/email-confirm" element={<EmailConfirm />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer pauseOnHover={false} autoClose={1500} />
    </>
  );
}
