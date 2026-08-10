import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Enter your full name");
    }

    if (!form.email.trim()) {
      return toast.error("Enter your email");
    }

    if (!form.password.trim()) {
      return toast.error("Enter your password");
    }

    if (form.password.length < 6) {
      return toast.error(
        "Password should be at least 6 characters"
      );
    }

    try {
      setLoading(true);

      const { data } = await axiosInstance.post(
        "/auth/register",
        form
      );

      toast.success(data.message);

      setTimeout(() => {
        navigate("/auth/login");
      }, 1200);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8">

        <h1 className="text-5xl font-bold text-white">
          Create Account
        </h1>

        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password (minimum 6 characters)"
              value={form.password}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-slate-900 px-4 py-3 pr-12 text-white outline-none focus:border-cyan-500 ${form.password.length > 0 && form.password.length < 6
                  ? "border-red-500"
                  : "border-white/10"
                }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

            {form.password.length > 0 &&
              form.password.length < 6 && (
                <p className="mt-2 text-sm text-red-400">
                  Password must be at least 6 characters.
                </p>
              )}

            {form.password.length >= 6 && (
              <p className="mt-2 text-sm text-green-400">
                ✓ Password length is valid
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <Link
          to="/auth/login"
          className="mt-6 block text-center text-slate-400 hover:text-cyan-400"
        >
          Back to Login
        </Link>

      </div>
    </div>
  );
}