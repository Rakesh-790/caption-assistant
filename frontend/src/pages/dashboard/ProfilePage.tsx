import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../types/store/auth.store";


function ProfilePage() {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  const userInitial =
    user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="space-y-6">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your account settings and session.
        </p>
      </section>

      {/* User Card */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <div className="flex items-center gap-4">

          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold">
            {userInitial}
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-xl font-semibold">
              {user?.email || "User"}
            </h2>

            <p className="text-zinc-400 mt-1">
              AI Caption Assistant User
            </p>
          </div>

        </div>

      </section>

      {/* Account Information */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <h3 className="text-xl font-semibold">
          Account Information
        </h3>

        <div className="mt-6 space-y-4">

          <div>
            <p className="text-sm text-zinc-500">
              Email
            </p>

            <p className="mt-1 font-medium">
              {user?.email || "Not Available"}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              Authentication
            </p>

            <p className="mt-1 font-medium">
              Secure Cookie Session
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              Session Status
            </p>

            <p className="mt-1 font-medium text-green-400">
              Active
            </p>
          </div>

        </div>

      </section>

      {/* Security */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <h3 className="text-xl font-semibold">
          Security
        </h3>

        <p className="text-zinc-400 mt-2">
          Password management and advanced security
          settings will be available soon.
        </p>

      </section>

      {/* Logout */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <h3 className="text-xl font-semibold">
          Session
        </h3>

        <p className="text-zinc-400 mt-2">
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