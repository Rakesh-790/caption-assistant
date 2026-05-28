import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Welcome Section */}
      <section>
        <h1 className="text-3xl font-bold">
          Welcome back 👋
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Create engaging AI-powered captions in seconds.
        </p>
      </section>

      {/* Hero Card */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 
        md:p-8 transition-colors duration-300"
      >

        <div className="max-w-2xl">

          <h2 className="text-2xl md:text-3xl font-bold leading-tight">
            Generate social media captions with AI
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
            Create captions tailored for Instagram, FaceBook,
            Twitter, and more using AI-powered generation.
          </p>

          <Link
            to="/generate-caption"
            className="inline-flex mt-6 bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl 
              font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors duration-200"
          >
            Generate Caption
          </Link>

        </div>

      </section>

      {/* Future Placeholder */}
      <section className="bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 
        rounded-2xl p-6 transition-colors duration-300"
      >

        <h3 className="text-lg font-semibold">
          More AI tools coming soon
        </h3>

        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          We are working on more AI-powered social media tools.
        </p>

      </section>

    </div>
  );
}

export default DashboardPage;