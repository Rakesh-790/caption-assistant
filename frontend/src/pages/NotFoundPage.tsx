import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

function NotFoundPage() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

            <div className="max-w-xl w-full text-center">

                {/* 404 */}
                <h1 className="text-8xl md:text-9xl font-extrabold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    404
                </h1>

                {/* Title */}
                <h2 className="mt-6 text-3xl md:text-4xl font-bold">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-4 text-zinc-400 text-base md:text-lg leading-relaxed">
                    The page you are looking for does not exist,
                    may have been removed, or the URL might be incorrect.
                </p>

                {/* Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                    <Link
                        to="/"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-zinc-200 transition"
                    >
                        <Home size={18} />
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-900 transition"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>

                </div>

            </div>

        </div>
    );
}

export default NotFoundPage;