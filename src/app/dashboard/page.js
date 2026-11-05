
"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // Session Loading
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Login Required
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">
          Please Login First
        </h2>

        <Link href="/login" className="btn btn-primary">
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Dashboard Header */}
        <div className="mb-8">
          <p className="text-primary font-semibold mb-2">
            STUDIOSPACE DASHBOARD
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back, {user.name || "User"}! 👋
          </h1>

          <p className="text-base-content/60 mt-2">
            Manage your workspace, listings and bookings from here.
          </p>
        </div>

        {/* Profile Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 md:p-10 text-white shadow-xl">

          <div className="absolute -right-10 -top-20 w-64 h-64 bg-white/10 rounded-full"></div>

          <div className="absolute right-40 -bottom-28 w-72 h-72 bg-white/10 rounded-full"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">

            {/* Profile Image */}
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring-4 ring-white/70">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                  />
                ) : (
                  <div className="w-full h-full bg-white text-purple-600 flex items-center justify-center text-4xl font-bold">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </div>

            {/* User Information */}
            <div className="text-center md:text-left flex-1">
              <p className="text-white/80 text-sm mb-1">
                Welcome to your personal space
              </p>

              <h2 className="text-2xl md:text-3xl font-bold">
                {user.name || "StudioSpace User"}
              </h2>

              <p className="text-white/80 mt-2">
                {user.email}
              </p>

              <div className="mt-4">
                <span className="badge badge-lg bg-white/20 border-white/30 text-white">
                  ✨ Active Member
                </span>
              </div>
            </div>

            {/* Profile Button */}
            <Link
              href="/profile"
              className="btn bg-white text-purple-700 border-none hover:bg-gray-100"
            >
              View Profile →
            </Link>

          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="mt-10 mb-5">
          <h2 className="text-2xl font-bold">
            Dashboard Overview
          </h2>

          <p className="text-base-content/60 mt-1">
            Everything you need to manage your activity.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* My Listings */}
          <Link
            href="/my-listings"
            className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="card-body">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                🏢
              </div>

              <h3 className="text-xl font-bold mt-3">
                My Listings
              </h3>

              <p className="text-base-content/60">
                Manage your studio listings and update information.
              </p>

              <div className="text-primary font-semibold mt-3">
                Manage Listings →
              </div>
            </div>
          </Link>

          {/* My Bookings */}
          <Link
            href="/my-bookings"
            className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="card-body">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl">
                📅
              </div>

              <h3 className="text-xl font-bold mt-3">
                My Bookings
              </h3>

              <p className="text-base-content/60">
                View your reservations and booking status.
              </p>

              <div className="text-primary font-semibold mt-3">
                View Bookings →
              </div>
            </div>
          </Link>

          {/* Add Studio */}
          <Link
            href="/add-studio"
            className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="card-body">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-2xl">
                ➕
              </div>

              <h3 className="text-xl font-bold mt-3">
                Add New Studio
              </h3>

              <p className="text-base-content/60">
                Share your creative workspace with others.
              </p>

              <div className="text-primary font-semibold mt-3">
                Add Studio →
              </div>
            </div>
          </Link>

        </div>

        {/* Quick Actions */}
        <div className="mt-10 bg-base-100 rounded-2xl p-6 md:p-8 shadow-md">

          <h2 className="text-2xl font-bold">
            Quick Actions
          </h2>

          <p className="text-base-content/60 mt-1 mb-6">
            What would you like to do today?
          </p>

          <div className="flex flex-wrap gap-3">

            <Link
              href="/studios"
              className="btn btn-primary"
            >
              🔍 Explore Studios
            </Link>

            <Link
              href="/add-studio"
              className="btn btn-outline btn-primary"
            >
              ➕ Add Studio
            </Link>

            <Link
              href="/my-bookings"
              className="btn btn-outline"
            >
              📅 My Bookings
            </Link>

            <Link
              href="/my-listings"
              className="btn btn-outline"
            >
              🏢 My Listings
            </Link>

          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-10 pb-5">
          <p className="text-base-content/50 text-sm">
            Make your creative space more productive with StudioSpace. ✨
          </p>
        </div>

      </div>
    </div>
  );
}

export default DashboardPage;
