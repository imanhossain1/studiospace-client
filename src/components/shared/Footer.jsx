"use client";
import React from "react";
import Link from "next/link";

function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Studios", path: "/studios" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact" },
  ];

  const categories = [
    { name: "Photo Studios", slug: "photo-studio" },
    { name: "Sound Stages", slug: "sound-stage" },
    { name: "Podcast Rooms", slug: "podcast-room" },
    { name: "Music Suites", slug: "music-suite" },
    { name: "Art Workshops", slug: "art-workshop" },
  ];

  const handleSubscribe = (event) => {
    event.preventDefault();

    const email = event.target.email.value;

    console.log("Newsletter Email:", email);

    event.target.reset();
  };

  return (
    <footer className="bg-neutral text-neutral-content">

      <div className="max-w-7xl mx-auto px-4 pt-14 pb-8">

        {/* Footer Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand and Mission */}
          <div>

            <Link href="/" className="text-2xl font-bold">
              🎬 StudioSpace
            </Link>

            <p className="text-sm opacity-70 leading-7 mt-4">
              StudioSpace connects creators with inspiring creative
              spaces. Discover, book and create amazing projects
              with the perfect studio for your needs.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-lg font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm opacity-80">

              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* Popular Categories */}
          <div>

            <h3 className="text-lg font-bold mb-5">
              Popular Categories
            </h3>

            <ul className="space-y-3 text-sm opacity-80">

              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/studios?category=${category.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* Newsletter */}
          <div>

            <h3 className="text-lg font-bold mb-5">
              Subscribe to Newsletter
            </h3>

            <p className="text-sm opacity-70 mb-4 leading-6">
              Get updates about new studios, offers and creative spaces.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-3"
            >

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="input input-bordered w-full bg-base-100 text-base-content"
              />

              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Subscribe
              </button>

            </form>

          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          {/* Copyright */}
          <p className="text-sm opacity-70 text-center">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-5">

            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-primary"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.6v8h3.4z"/>
              </svg>
            </Link>

            {/* New X Logo */}
            <Link
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="hover:text-primary"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="currentColor"
              >
                <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.4L5.4 22H2.2l7.3-8.4L1.7 2h6.5l4.5 6.8L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/>
              </svg>
            </Link>

            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-primary"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="18" cy="6" r="1" fill="currentColor"/>
              </svg>
            </Link>

          </div>

          {/* Terms */}
          <div className="flex gap-4 text-sm opacity-70">

            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>

            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
