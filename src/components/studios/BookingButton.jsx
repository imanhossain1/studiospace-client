
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { createBooking } from "@/lib/api";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "react-toastify";
import Link from "next/link";

export default function BookingButton({ studio }) {
  // Check logged in user
  const { data: session, isPending } = authClient.useSession();

  // Modal and loading
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Booking form
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Today's date
  const now = new Date();

  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  // Calculate booking hours
  let totalHours = 0;

  if (startTime && endTime) {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    if (end > start) {
      totalHours = Number(((end - start) / 60).toFixed(2));
    }
  }

  // Calculate price
  const totalPrice = totalHours * Number(studio.hourlyRate);

  // Submit Booking
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    if (!bookingDate || !startTime || !endTime) {
      toast.error("Date and time select করো");
      return;
    }

    if (bookingDate < today) {
      toast.error("Past date-এ booking করা যাবে না");
      return;
    }

    if (totalHours <= 0) {
      toast.error("End Time অবশ্যই Start Time-এর পরে হতে হবে");
      return;
    }

    // Check past time for today's booking
    const currentTime = new Date();

    const currentHour = String(currentTime.getHours()).padStart(2, "0");
    const currentMinute = String(currentTime.getMinutes()).padStart(2, "0");

    const currentTimeString = `${currentHour}:${currentMinute}`;

    if (bookingDate === today && startTime <= currentTimeString) {
      toast.error("বর্তমান সময়ের পরের সময় নির্বাচন করো");
      return;
    }

    try {
      setLoading(true);

      // Get JWT Token
      const token = await getTokenFromClient();

      if (!token) {
        toast.error("আবার Login করো");
        return;
      }

      // Booking Data
      const bookingData = {
        studioId: studio._id,
        bookingDate,
        startTime,
        endTime,
      };

      // Send Booking Request
      const result = await createBooking(bookingData, token);

      console.log("Booking Response:", result);

      toast.success("Booking সফল হয়েছে!");

      // Close Modal
      setIsOpen(false);

      // Reset Form
      setBookingDate("");
      setStartTime("");
      setEndTime("");

    } catch (error) {
      console.error("Booking Error:", error);
      toast.error(error.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  // Session Loading
  if (isPending) {
    return (
      <button disabled className="btn w-full mt-6">
        Loading...
      </button>
    );
  }

  // Login না থাকলে আগের Details Page-এ ফেরার URL পাঠাব
  if (!session?.user) {
    const loginUrl = `/login?callbackURL=${encodeURIComponent(
      `/studios/${studio._id}`
    )}`;

    return (
      <Link href={loginUrl} className="btn btn-primary w-full mt-6">
        Login to Book
      </Link>
    );
  }

  return (
    <>
      {/* Open Booking Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-primary w-full mt-6"
      >
        Book Workspace Now
      </button>

      {/* Booking Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

          <div className="bg-white text-gray-900 w-full max-w-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Book Your Studio
            </h2>

            <form onSubmit={handleBooking}>

              {/* Studio Information */}
              <h3 className="font-bold text-lg">
                {studio.title}
              </h3>

              <p className="mb-4">
                Hourly Rate: ৳{studio.hourlyRate}
              </p>

              {/* Booking Date */}
              <label className="block mb-1">
                Booking Date
              </label>

              <input
                type="date"
                min={today}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="input input-bordered w-full mb-4"
                required
              />

              {/* Start Time */}
              <label className="block mb-1">
                Start Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="input input-bordered w-full mb-4"
                required
              />

              {/* End Time */}
              <label className="block mb-1">
                End Time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="input input-bordered w-full mb-4"
                required
              />

              {/* Price Summary */}
              <div className="bg-gray-100 p-4 rounded-lg mb-4">

                <p>Booking Hours: {totalHours}</p>

                <p>
                  Hourly Rate: ৳{studio.hourlyRate}
                </p>

                <p className="font-semibold">
                  Estimated Total Price: ৳{totalPrice.toFixed(2)}
                </p>

                <p>
                  Security Deposit: ৳{studio.securityDeposit}
                </p>

              </div>

              {/* Confirm Booking */}
              <button
                type="submit"
                disabled={loading || totalHours <= 0}
                className="btn btn-primary w-full"
              >
                {loading ? "Booking হচ্ছে..." : "Confirm Booking"}
              </button>

              {/* Close Modal */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="btn btn-ghost w-full mt-2"
              >
                Close
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
}
