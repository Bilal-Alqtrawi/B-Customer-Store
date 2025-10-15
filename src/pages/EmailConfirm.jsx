import { motion } from "motion/react";
import { useState } from "react";
import { useResendEmail } from "../features/authentication/useResendEmail";
import { useSearchParams } from "react-router";

export default function EmailConfirm() {
  const [searchParams] = useSearchParams();
  const userEmail = searchParams.get("email");

  const { resendEmail } = useResendEmail();
  const [resendLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    setResendLoading(true);
    try {
      resendEmail();
      setMessage("Verification email sent again. Please check your inbox.");
    } catch (err) {
      console.error(err.message);
      setMessage("Failed to resend. Try later.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f172a] text-white">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-2xl"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-4 h-16 w-16 text-orange-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12l-4 4m0 0l-4-4m4 4V8"
            />
          </svg>
          <h2 className="mb-2 text-2xl font-bold">Verify Your Email</h2>
          <p className="mb-6 text-gray-300">
            We sent a confirmation link to <br />
            <span className="font-medium text-white">{userEmail}</span>
          </p>
        </motion.div>

        <button
          onClick={handleResend}
          disabled={resendLoading}
          className="mb-4 w-full rounded-xl bg-gradient-to-r from-orange-400 to-fuchsia-500 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {resendLoading ? "Resending..." : "Resend Email"}
        </button>

        {message && <p className="mb-4 text-sm text-gray-200">{message}</p>}

        <p className="text-gray-300">
          Didn’t receive the email? Check your spam or wait a few minutes.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/login"
            className="font-medium text-orange-400 hover:underline"
          >
            Go to Login
          </a>
          <a href="/" className="text-gray-300 hover:underline">
            Back to Home
          </a>
        </div>
      </motion.div>

      <motion.div
        animate={{
          background: [
            "linear-gradient(120deg, #8b5cf6, #ec4899, #f97316)",
            "linear-gradient(120deg, #f97316, #22d3ee, #8b5cf6)",
            "linear-gradient(120deg, #22d3ee, #8b5cf6, #ec4899)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 opacity-10 blur-3xl"
      />
    </div>
  );
}
