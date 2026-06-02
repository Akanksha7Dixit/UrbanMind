import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">

      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border border-white/10
          bg-white/[0.03]
          p-8
        "
      >
        <p className="text-cyan-400">
          Password Recovery
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Reset Password
        </h1>

        <p className="mt-4 text-slate-400">
          Enter your email address and we'll send a password reset link.
        </p>

        <div className="mt-8">

          <input
            type="email"
            placeholder="Email Address"
            className="
              w-full
              rounded-xl
              border border-white/10
              bg-slate-900
              px-4 py-3
            "
          />

        </div>

        <button
          className="
            mt-6
            w-full
            rounded-xl
            bg-cyan-500
            py-3
            font-semibold
            text-slate-950
          "
        >
          Send Reset Link
        </button>

        <Link
          to="/auth/login"
          className="
            mt-6
            block
            text-center
            text-slate-400
          "
        >
          Back to Login
        </Link>

      </div>

    </div>
  );
}