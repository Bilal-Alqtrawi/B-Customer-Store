import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlinePhone,
} from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignup";
import { useNavigate } from "react-router";

export default function RegisterForm({ onActiveTab }) {
  const { signUp, isPending } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signUp(data, {
      onSuccess: () => {
        setTimeout(() => {
          navigate(`/email-confirm?email=${data.email}`);
        }, 1000);
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
      }}
      className="rounded-3xl border border-white/10 bg-white/10 px-10 py-12 shadow-2xl backdrop-blur-2xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">Email</label>
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

        {/* repeate-Password */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Repeated-Password
          </label>
          <div className="relative">
            <HiOutlineLockClosed
              className="absolute top-3.5 left-3 text-gray-400"
              size={20}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pr-10 pl-10 placeholder-gray-400 transition outline-none focus:ring-2 focus:ring-orange-400"
              {...register("repeatePassword", {
                required: "Repeated password is required",
                validate: (value) => {
                  if (value !== getValues().password) {
                    return "Password should be at matched";
                  }
                  if (value.length < 6) {
                    return "Password should be at least 6 characters";
                  }
                  return true;
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
            {errors?.repeatePassword && (
              <p className="mt-1 text-sm text-red-400">
                {errors.repeatePassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Phone Number
          </label>
          <div className="relative">
            <HiOutlinePhone
              className="absolute top-3.5 left-3 text-gray-400"
              size={20}
            />
            <input
              type="tel"
              placeholder="+972 59 000 0000"
              className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pr-4 pl-10 placeholder-gray-400 transition outline-none focus:ring-2 focus:ring-orange-400"
              {...register("phoneNumber", {
                required: "Phone number field is required",
                pattern: {
                  value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors?.phoneNumber && (
              <p className="mt-1 text-sm text-red-400">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isPending}
          className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-orange-400 to-fuchsia-500 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-pink-400/40"
        >
          {isSubmitting || isPending ? "Signing up..." : "Sign Up"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Do you have an account?
          <button
            className="ml-1 cursor-pointer text-orange-400 hover:underline"
            onClick={() => onActiveTab("login")}
          >
            Sign in
          </button>
        </p>
      </form>
    </motion.div>
  );
}
