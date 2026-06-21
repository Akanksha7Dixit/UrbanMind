import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import { loginUser } from "../../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const login = useAuthStore(
    (state) => state.login
  );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await loginUser(
          email,
          password
        );

      login(
        data.user,
        data.token
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

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
          Welcome Back
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          UrbanMind
        </h1>

        <div className="mt-8 space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border border-white/10
              bg-slate-900
              px-4 py-3
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border border-white/10
              bg-slate-900
              px-4 py-3
            "
          />

        </div>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
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
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>

        <div
          className="
            mt-6
            flex
            justify-between
            text-sm
            text-slate-400
          "
        >
          <Link to="/auth/register">
            Register
          </Link>

          <Link to="/auth/forgot-password">
            Forgot Password
          </Link>
        </div>

      </div>
    </div>
  );
}