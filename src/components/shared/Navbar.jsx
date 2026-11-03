
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const Navbar = () => {
  const pathname = usePathname();

  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get Logged In User
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // Navigation Links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Studios", path: "/studios" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "About Us", path: "/#about-us" },
  ];

  // Dashboard Links
  const userLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Add New Studio", path: "/add-studio" },
    { name: "My Studio Listings", path: "/my-studios" },
    { name: "My Bookings", path: "/my-bookings" },
  ];

  // Active Route
  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname === path;
  };

  // Dark / Light Theme
  const handleTheme = () => {
    const newTheme = !isDark;

    setIsDark(newTheme);

    document.documentElement.setAttribute(
      "data-theme",
      newTheme ? "dark" : "light"
    );
  };

  // Logout
  const handleLogout = async () => {
    try {
      setLoading(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message);
        return;
      }

      window.location.href = "/";
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-md px-4 lg:px-10">

      {/* Logo */}
      <div className="navbar-start">
        <Link
          href="/"
          className="text-xl font-bold text-primary flex items-center gap-2"
        >
          <span className="text-3xl">◉</span>
          StudioSpace
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">

          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={
                  isActive(link.path)
                    ? "font-bold text-primary"
                    : ""
                }
              >
                {link.name}
              </Link>
            </li>
          ))}

        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-2">

        {/* Theme Button */}
        <button
          onClick={handleTheme}
          className="btn btn-circle btn-ghost"
          aria-label="Toggle theme"
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        {/* Authentication Loading */}
        {isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : user ? (

          /* Logged In User */
          <div className="dropdown dropdown-end">

            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              aria-label="User menu"
            >
              <div className="w-10 rounded-full">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                  />
                ) : (
                  <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full font-bold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </button>

            {/* Profile Dropdown */}
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-60 p-3 shadow-xl"
            >

              <li className="menu-title">
                <span>{user.name}</span>
                <span className="text-xs font-normal">
                  {user.email}
                </span>
              </li>

              <div className="divider my-1"></div>

              {userLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={
                      isActive(link.path)
                        ? "active"
                        : ""
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              <div className="divider my-1"></div>

              <li>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="text-error"
                >
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </li>

            </ul>
          </div>

        ) : (

          /* Not Logged In */
          <div className="hidden sm:flex gap-2">

            <Link
              href={`/login?callbackURL=${encodeURIComponent(pathname)}`}
              className="btn btn-outline btn-sm"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="btn btn-primary btn-sm"
            >
              Register
            </Link>

          </div>
        )}

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">

          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            aria-label="Open menu"
          >
            ☰
          </button>

          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-60 p-3 shadow-xl"
          >

            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={isActive(link.path) ? "active" : ""}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <div className="divider my-1"></div>

            {!isPending && !user && (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>

                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            )}

            {!isPending && user && (
              <>
                {userLinks.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path}>
                      {link.name}
                    </Link>
                  </li>
                ))}

                <li>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="text-error"
                  >
                    {loading ? "Logging out..." : "Logout"}
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
