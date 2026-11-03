
"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { toast } from "react-toastify"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEmailLogin = async (e) => {
    e.preventDefault()

    if (loading) return

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

        // Previous Route
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
        } else if (document.referrer) {
          const previousPage = new URL(document.referrer)

          if (
            previousPage.origin === window.location.origin &&
            previousPage.pathname !== "/login"
          ) {
            redirectURL =
              previousPage.pathname +
              previousPage.search +
              previousPage.hash
          }
        }

        window.location.href = redirectURL
      }

    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
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

          <form onSubmit={handleEmailLogin}>

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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <div className="divider">OR</div>

          <p className="text-center text-sm">
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
