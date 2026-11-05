
"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { toast } from "react-toastify"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault()

    if (loading || googleLoading) return

    const formData = new FormData(e.target)
    const user = Object.fromEntries(formData.entries())

    try {
      setLoading(true)

      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      if (data) {
        toast.success("Login successful!")

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

  // Google Login
  const handleGoogleLogin = async () => {
    if (loading || googleLoading) return

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
            Welcome Back
          </h1>

          <p className="text-center text-base-content/60 mb-4">
            Login to StudioSpace
          </p>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin}>

            {/* Email */}
            <fieldset disabled={loading || googleLoading}>

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
                    disabled={loading || googleLoading}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

            </fieldset>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Logging In...
                </>
              ) : (
                "Login"
              )}
            </button>

          </form>

          <div className="divider">OR</div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="btn btn-outline w-full"
          >
            {googleLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Connecting to Google...
              </>
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

          {/* Register Link */}
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="link link-primary font-semibold"
            >
              Register
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}
