import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCurrentUser } from "../../service/authService";
import { useAuthStore } from "../../types/store/auth.store";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const setAuth = useAuthStore((state) => state.setAuth);


  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setServerError("");

      await login(data);
      const userData = await getCurrentUser();

      setAuth(userData);

      navigate("/");
    } catch (err: any) {
      setServerError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full sm:w-[420px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-2xl transition-colors duration-300">

        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 text-center mb-8">
          Login to your account
        </p>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-lg mb-4">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white outline-none focus:border-blue-500 transition-colors duration-200"
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white outline-none focus:border-blue-500 transition-colors duration-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff size={15} />
                ) : (
                  <Eye size={15} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-400 transition"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;