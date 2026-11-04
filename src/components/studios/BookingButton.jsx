
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { createBooking } from "@/lib/api";
import { toast } from "react-toastify";
import Link from "next/link";

export default function BookingButton({ studio }) {
  const { data: session, isPending } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const start = startTime
    ? new Date(`2000-01-01T${startTime}`)
    : null;

  const end = endTime
    ? new Date(`2000-01-01T${endTime}`)
    : null;

  const totalHours =
    start && end && end > start
      ? (end - start) / (1000 * 60 * 60)
      : 0;

  const totalPrice = totalHours * Number(studio.hourlyRate);

  const today = new Date().toLocaleDateString("en-CA");

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    if (!bookingDate || !startTime || !endTime) {
      toast.error("Please select date and time");
      return;
    }

    if (bookingDate < today) {
      toast.error("Please select a valid booking date");
      return;
    }

    if (totalHours <= 0) {
      toast.error("End time must be after start time");
      return;
    }

    const bookingData = {
      studioId: studio._id,
      studioTitle: studio.title,
      studioImage: studio.image,
      userName: session.user.name,
      userEmail: session.user.email,
      bookingDate,
      startTime,
      endTime,
      totalHours,
      hourlyRate: Number(studio.hourlyRate),
      securityDeposit: Number(studio.securityDeposit),
      totalPrice,
      status: "Pending",
    };

    try {
      setLoading(true);

      await createBooking(bookingData);

      toast.success("Booking request submitted successfully");

      setIsOpen(false);
      setBookingDate("");
      setStartTime("");
      setEndTime("");

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <button disabled className="btn">Loading...</button>;
  }

  if (!session?.user) {
    return (
      <Link href="/login" className="btn btn-primary w-full mt-6">
        Login to Book
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-primary w-full mt-6"
      >
        Book Workspace Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

          <div className="bg-white text-gray-900 w-full max-w-lg rounded-xl p-6">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">
                Book Your Studio
              </h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleBooking}>

              <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <h3 className="font-bold">{studio.title}</h3>
                <p>${studio.hourlyRate} / hour</p>
              </div>

              <label className="block font-medium mb-2">
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

              <label className="block font-medium mb-2">
                Start Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="input input-bordered w-full mb-4"
                required
              />

              <label className="block font-medium mb-2">
                End Time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="input input-bordered w-full mb-4"
                required
              />

              <div className="bg-gray-100 rounded-lg p-4 mb-5">
                <p>Booking Hours: {totalHours}</p>

                <p>Hourly Rate: ${studio.hourlyRate}</p>

                <h3 className="text-xl font-bold mt-2">
                  Total Price: ${totalPrice}
                </h3>

                <p className="text-sm text-gray-500">
                  Security Deposit: ${studio.securityDeposit}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !totalHours}
                className="btn btn-primary w-full"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
}
