import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../types/store/auth.store";

function ProfilePage() {

  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const handleLogout = async () => {

    logout();

    navigate("/login");
  };

  const userInitial =
    user?.email?.substring(0, 2).toUpperCase() || "U";

  return (
    <div className="space-y-6">

      {/* Header */}
      <section>

        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Manage your account settings and session.
        </p>

      </section>

      {/* User Card */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 
        transition-colors duration-300"
      >

        <div className="flex items-center gap-4">

          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white flex 
            items-center justify-center text-2xl font-bold"
          >

            {userInitial}

          </div>

          {/* User Info */}
          <div>

            <h2 className="text-xl font-semibold">
              {user?.email || "User"}
            </h2>

          </div>

        </div>

      </section>

      {/* Account Information */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 
        transition-colors duration-300"
      >

        <h3 className="text-xl font-semibold">
          Account Information
        </h3>

        <div className="mt-6 space-y-4">

          {/* Email */}
          <div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Email
            </p>

            <p className="mt-1 font-medium">
              {user?.email || "Not Available"}
            </p>

          </div>

          {/* Authentication */}
          <div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Authentication
            </p>

            <p className="mt-1 font-medium">
              JWT Cookie Authentication
            </p>

          </div>

          {/* Session Status */}
          <div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Session Status
            </p>

            <p
              className={`mt-1 font-medium ${user
                ? "text-green-400"
                : "text-red-400"
                }`}
            >
              {user ? "Active" : "Inactive"}
            </p>

          </div>

        </div>

      </section>

      {/* Security */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 
        transition-colors duration-300"
      >

        <h3 className="text-xl font-semibold">
          Security
        </h3>

        <p className="text-zinc-400 mt-2">
          Password management and advanced security
          settings will be available soon.
        </p>

      </section>

      {/* Logout */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 
        transition-colors duration-300"
      >

        <h3 className="text-xl font-semibold">
          Session
        </h3>

        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Logout from your current session securely.
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
        >
          Logout
        </button>

      </section>

    </div>
  );
}

export default ProfilePage;