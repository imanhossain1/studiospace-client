
"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { toast } from "react-toastify"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // Email Registration
  const handleEmailRegister = async (e) => {
    e.preventDefault()

    if (loading || googleLoading) return

    const formData = new FormData(e.target)
    const user = Object.fromEntries(formData.entries())

    if (user.password !== user.confirmPassword) {
      toast.error("Password does not match")
      return
    }

    if (
      !/[A-Z]/.test(user.password) ||
      !/[a-z]/.test(user.password) ||
      user.password.length < 6
    ) {
      toast.error(
        "Password must contain uppercase, lowercase and minimum 6 characters"
      )
      return
    }

    try {
      setLoading(true)

      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.photoURL,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      if (data) {
        toast.success("Registration successful!")

        let redirectURL = "/"

        const callbackURL = new URLSearchParams(
          window.location.search
        ).get("callbackURL")

        if (
          callbackURL &&
          callbackURL.startsWith("/") &&
          !callbackURL.startsWith("//")
        ) {
          redirectURL = callbackURL
        }

        window.location.href = redirectURL
      }

    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  // Google Registration / Login
  const handleGoogleLogin = async () => {
    if (googleLoading || loading) return

    try {
      setGoogleLoading(true)

      let redirectURL = "/"

      const callbackURL = new URLSearchParams(
        window.location.search
      ).get("callbackURL")

      if (
        callbackURL &&
        callbackURL.startsWith("/") &&
        !callbackURL.startsWith("//")
      ) {
        redirectURL = callbackURL
      }

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectURL,
      })

      if (error) {
        toast.error(error.message)
        setGoogleLoading(false)
      }

    } catch (error) {
      toast.error("Google login failed!")
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">

          <h1 className="text-3xl font-bold text-center">
            Create Account
          </h1>

          <p className="text-center text-base-content/60 mb-4">
            Register to StudioSpace
          </p>

          <form onSubmit={handleEmailRegister}>

            {/* Name */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Photo URL */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>

              <input
                type="url"
                name="photoURL"
                placeholder="https://example.com/my-photo.jpg"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  className="input input-bordered w-full pr-12"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="input input-bordered w-full pr-12"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Email Register Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn btn-primary w-full"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

          </form>

          <div className="divider">OR</div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="btn btn-outline w-full"
          >
            {googleLoading ? (
              "Connecting to Google..."
            ) : (
              <>
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </>
            )}
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="link link-primary font-semibold"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
