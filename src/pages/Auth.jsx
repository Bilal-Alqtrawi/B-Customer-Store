import { motion } from "motion/react";
import { useState } from "react";
import LoginForm from "../features/authentication/LoginForm";
import RegisterForm from "../features/authentication/RegisterForm";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#0f172a] text-white">
      {/* Gradient Animated Background */}
      <motion.div
        animate={{
          background: [
            "linear-gradient(120deg, #8b5cf6, #ec4899, #f97316)",
            "linear-gradient(120deg, #f97316, #22d3ee, #8b5cf6)",
            "linear-gradient(120deg, #22d3ee, #8b5cf6, #ec4899)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 opacity-20 blur-3xl"
      />

      {/* Left Section */}
      <div className="relative z-10 hidden w-1/2 flex-col items-start justify-center px-20 lg:flex">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-400 to-fuchsia-500 bg-clip-text text-6xl font-extrabold text-transparent"
        >
          Welcome Back 👋
        </motion.h1>

        <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-300">
          Manage your shopping experience, track your orders, and explore new
          arrivals designed just for you ✨
        </p>

        <motion.img
          src="/shopping.png"
          alt="Shopping illustration"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 w-[65%] drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]"
        />
      </div>

      {/* Right Section (Form) */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex w-full flex-col justify-center px-8 sm:px-14 lg:w-1/2"
      >
        <div className="relative">
          <div className="tabs absolute top-2 left-1/2 z-1 flex -translate-x-1/2 items-center justify-between gap-5">
            <button
              className={`cursor-pointer rounded-xl bg-amber-500 px-4 py-2 font-semibold text-white shadow-lg transition hover:shadow-pink-400/40 ${activeTab === "register" ? "bg-transparent" : ""} hover:bg-amber-00`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("login");
              }}
            >
              Login
            </button>
            <button
              className={`cursor-pointer rounded-xl bg-amber-500 px-4 py-2 font-semibold text-white shadow-lg transition hover:shadow-pink-400/40 ${activeTab === "login" ? "bg-transparent" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("register");
              }}
            >
              Register
            </button>
          </div>
          {activeTab === "login" && (
            <LoginForm key="login" onActiveTab={setActiveTab} />
          )}
          {activeTab === "register" && (
            <RegisterForm key="register" onActiveTab={setActiveTab} />
          )}
        </div>
      </motion.div>
    </div>
  );
}
