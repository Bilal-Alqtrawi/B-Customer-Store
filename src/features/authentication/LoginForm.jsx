import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { useForm } from "react-hook-form";
import { signInWithProvider } from "../../services/apiAuth";
import { useLogin } from "./useLogin";
import { toast } from "react-toastify";

function LoginForm({ onActiveTab }) {
  const { login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(data) {
    login(data, {
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  return (
    <div className="my-auto rounded-3xl border border-white/10 bg-white/10 px-10 py-12 shadow-2xl backdrop-blur-2xl">
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Email Address
          </label>
          <div className="relative">
            <HiOutlineMail
              className="absolute top-3.5 left-3 text-gray-400"
              size={20}
            />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pr-4 pl-10 placeholder-gray-400 transition outline-none focus:ring-2 focus:ring-orange-400"
              {...register("email", {
                required: "Email field is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors?.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">Password</label>
          <div className="relative">
            <HiOutlineLockClosed
              className="absolute top-3.5 left-3 text-gray-400"
              size={20}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pr-10 pl-10 placeholder-gray-400 transition outline-none focus:ring-2 focus:ring-orange-400"
              {...register("password", {
                required: "Password field is required",
                minLength: {
                  message: "Password must be at least 6 characters",
                  value: 6,
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3.5 right-3 text-gray-400 hover:text-orange-400"
            >
              {showPassword ? (
                <HiOutlineEyeOff size={20} />
              ) : (
                <HiOutlineEye size={20} />
              )}
            </button>
            {errors?.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm text-gray-300">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-400 bg-transparent text-orange-500 focus:ring-orange-400"
              {...register("remember")}
            />
            Remember Me
          </label>
          <a
            href="/forgot-password"
            className="text-orange-400 hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isPending}
          className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-orange-400 to-fuchsia-500 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-pink-400/40"
        >
          {isSubmitting || isPending ? "Signing in..." : "Log In"}
        </button>

        <div className="relative flex items-center justify-center py-2">
          <span className="absolute inset-x-0 top-1/2 border-t border-gray-700" />
          <span className="relative bg-[#0f172a] px-3 text-sm text-gray-400">
            Or continue with
          </span>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 transition hover:bg-white/15"
            onClick={() => signInWithProvider("google")}
          >
            <FcGoogle size={22} /> Google
          </button>
          <button
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 transition hover:bg-white/15"
            onClick={() => signInWithProvider("facebook")}
          >
            <FaFacebook className="text-blue-400" size={20} /> Facebook
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?
          <button
            onClick={() => onActiveTab("register")}
            className="ml-1 cursor-pointer text-orange-400 hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
