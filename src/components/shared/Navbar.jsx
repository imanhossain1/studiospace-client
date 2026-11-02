"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  // Dark / Light Theme
  const handleTheme = () => {
    const newTheme = !isDark;

    setIsDark(newTheme);

    document.documentElement.setAttribute(
      "data-theme",
      newTheme ? "dark" : "light"
    );
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Studios", path: "/studios" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "About Us", path: "/#about-us" },
    
  ];

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-md px-4 lg:px-10">

      {/* Logo */}
      <div className="navbar-start">
        <Link href="/" className="text-xl font-bold text-primary">
          ◉ StudioSpace
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={
                  pathname === link.path
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

        {/* Theme Toggle */}
        <button
          onClick={handleTheme}
          className="btn btn-circle btn-ghost"
          aria-label="Toggle theme"
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end md:hidden">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            aria-label="Open menu"
          >
            ☰
          </button>

          <ul className="menu dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;