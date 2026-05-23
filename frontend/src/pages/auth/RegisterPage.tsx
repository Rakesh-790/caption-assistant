import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";

const registerSchema = z
  .object({
    email: z
      .string("Invalid email address"),

      password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /[0-9]/,
        "Password must contain at least one number"
      )
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z
      .string()
      .min(8, "Confirm password is required"),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterPage() {
    const navigate = useNavigate();
    const { register : registerUser } = useAuth();

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setLoading(true);
            setServerError("");

            const{confirmPassword, ...payload} = data;

            await registerUser(payload);

            navigate("/login");
        } catch (err: any) {
            setServerError(
                err.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="w-full sm:w-[460px] bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
      
            <h1 className="text-3xl font-bold text-white text-center mb-2">
              Create Account
            </h1>
      
            <p className="text-zinc-400 text-center mb-8">
              Register to start generating captions
            </p>
      
            {serverError && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-lg mb-4">
                {serverError}
              </div>
            )}
      
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      
              {/* NAME */}
              {/* <div>
                <label className="block text-sm text-zinc-300 mb-2">
                  Full Name
                </label>
      
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-blue-500 transition"
                />
      
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div> */}
      
              {/* EMAIL */}
              <div>
                <label className="block text-sm text-zinc-300 mb-2">
                  Email
                </label>
      
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-blue-500 transition"
                />
      
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
      
              {/* PASSWORD */}
              <div>
                <label className="block text-sm text-zinc-300 mb-2">
                  Password
                </label>
      
                <input
                  type="password"
                  placeholder="Create password"
                  {...register("password")}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-blue-500 transition"
                />
      
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
      
              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-sm text-zinc-300 mb-2">
                  Confirm Password
                </label>
      
                <input
                  type="password"
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-blue-500 transition"
                />
      
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
      
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>
      
            <p className="text-zinc-400 text-sm text-center mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-400 transition"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      );
}

export default RegisterPage;