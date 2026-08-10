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

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // =====================================
  // LOGIN
  // =====================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(
        email.trim(),
        password
      );

      login(
        data.user,
        data.token
      );

      // =================================
      // ROLE BASED REDIRECT
      // =================================

      switch (data.user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;

        case "planner":
          navigate("/planner/dashboard");
          break;

        case "analyst":
          navigate("/analyst/dashboard");
          break;

        case "citizen":
        default:
          navigate("/citizen/dashboard");
          break;
      }

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // DEMO
  // =====================================

  const handleExploreDemo = () => {
    navigate("/demo");
  };

  return (
    <div
      className="
        min-h-screen
        w-full
        flex
        items-center
        justify-center
        bg-[#020617]
        px-4
        py-8
      "
    >

      {/* =================================
          LOGIN + DEMO CONTAINER
      ================================== */}

      <div
        className="
          w-full
          max-w-md
        "
      >

        {/* =================================
            LOGIN CARD
        ================================== */}

        <div
          className="
            w-full
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            p-8
            shadow-2xl
            shadow-black/20
          "
        >

          {/* ===============================
              HEADER
          ================================ */}

          <p className="text-cyan-400">
            Welcome Back
          </p>

          <h1
            className="
              mt-3
              text-4xl
              font-bold
              text-white
            "
          >
            UrbanMind
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-slate-400
            "
          >
            Smart City Decision Intelligence
          </p>


          {/* ===============================
              LOGIN FORM
          ================================ */}

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-4"
          >

            {/* EMAIL */}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-slate-900
                px-4
                py-3
                text-white
                outline-none
                placeholder:text-slate-500
                focus:border-cyan-500
                focus:ring-1
                focus:ring-cyan-500/30
              "
            />


            {/* PASSWORD */}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-slate-900
                px-4
                py-3
                text-white
                outline-none
                placeholder:text-slate-500
                focus:border-cyan-500
                focus:ring-1
                focus:ring-cyan-500/30
              "
            />


            {/* ERROR */}

            {error && (
              <div
                className="
                  rounded-lg
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-3
                  py-2
                  text-sm
                  text-red-400
                "
              >
                {error}
              </div>
            )}


            {/* SIGN IN */}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-2
                w-full
                rounded-xl
                bg-cyan-500
                py-3
                font-semibold
                text-slate-950
                transition
                duration-200
                hover:bg-cyan-400
                hover:shadow-lg
                hover:shadow-cyan-500/20
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

          </form>


          {/* ===============================
              AUTH LINKS
          ================================ */}

          <div
            className="
              mt-6
              flex
              justify-between
              text-sm
            "
          >

            <Link
              to="/auth/register"
              className="
                text-slate-400
                transition
                hover:text-cyan-400
              "
            >
              Register
            </Link>

            <Link
              to="/auth/forgot-password"
              className="
                text-slate-400
                transition
                hover:text-cyan-400
              "
            >
              Forgot Password
            </Link>

          </div>

        </div>


        {/* =================================
            DEMO CARD
        ================================== */}

        <div
          className="
            mt-5
            w-full
            rounded-3xl
            border
            border-cyan-500/20
            bg-cyan-500/[0.04]
            p-5
          "
        >

          <div
            className="
              flex
              items-start
              gap-4
            "
          >

            {/* ICON */}

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-500/20
                bg-cyan-500/10
                text-xl
              "
            >
              🚀
            </div>


            {/* CONTENT */}

            <div className="flex-1">

              <h2
                className="
                  font-semibold
                  text-white
                "
              >
                Explore UrbanMind
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  leading-relaxed
                  text-slate-400
                "
              >
                Explore the public demo
                without creating an account.
              </p>

            </div>

          </div>


          {/* DEMO BUTTON */}

          <button
            type="button"
            onClick={handleExploreDemo}
            className="
              mt-4
              w-full
              rounded-xl
              border
              border-cyan-500/30
              bg-cyan-500/10
              py-3
              font-semibold
              text-cyan-400
              transition
              duration-200
              hover:border-cyan-400/50
              hover:bg-cyan-500/20
              hover:text-cyan-300
            "
          >
            🚀 Explore Demo
          </button>


          <p
            className="
              mt-2
              text-center
              text-xs
              text-slate-500
            "
          >
            No login required • Demo Mode
          </p>

        </div>

      </div>

    </div>
  );
}