import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8">

        <h1 className="text-4xl font-bold">
          Create Account
        </h1>

        <div className="mt-8 space-y-4">

          <input
            placeholder="Full Name"
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3"
          />

          <input
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3"
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
          Create Account
        </button>

        <Link
          to="/auth/login"
          className="mt-4 block text-center text-slate-400"
        >
          Back to Login
        </Link>

      </div>
    </div>
  );
}