
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { createBooking } from "@/lib/api";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "react-toastify";
import Link from "next/link";

export default function BookingButton({ studio }) {

  // Login করা User-এর তথ্য জানব
  const { data: session, isPending } = authClient.useSession();

  // Modal খোলা বা বন্ধ রাখব
  const [isOpen, setIsOpen] = useState(false);

  // Booking চলার সময় Loading দেখাব
  const [loading, setLoading] = useState(false);

  // User-এর কাছ থেকে Date ও Time নেব
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Booking কত ঘণ্টার হবে হিসাব করব
  let totalHours = 0;

  if (startTime && endTime) {
    const start = startTime.split(":");
    const end = endTime.split(":");

    // Start Time-কে ঘণ্টায় convert করব
    const startHour =
      Number(start[0]) + Number(start[1]) / 60;

    // End Time-কে ঘণ্টায় convert করব
    const endHour =
      Number(end[0]) + Number(end[1]) / 60;

    // End Time অবশ্যই Start Time-এর পরে হতে হবে
    if (endHour > startHour) {
      totalHours = endHour - startHour;
    }
  }

  // মোট Booking Price হিসাব করব
  const totalPrice = totalHours * Number(studio.hourlyRate);

  // আজকের তারিখ
  const today = new Date().toLocaleDateString("en-CA");

  // Booking Submit করলে এই function চলবে
  const handleBooking = async (e) => {
    e.preventDefault();

    // Login না থাকলে Booking করতে পারবে না
    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    // Date ও Time দেওয়া হয়েছে কি না দেখব
    if (!bookingDate || !startTime || !endTime) {
      toast.error("Date and time select করো");
      return;
    }

    // অতীতের তারিখে Booking করা যাবে না
    if (bookingDate < today) {
      toast.error("সঠিক তারিখ নির্বাচন করো");
      return;
    }

    // সঠিক সময় দেওয়া হয়েছে কি না দেখব
    if (totalHours <= 0) {
      toast.error("End Time অবশ্যই Start Time-এর পরে হতে হবে");
      return;
    }

    try {
      setLoading(true);

      // Booking-এর সব তথ্য এক জায়গায় রাখব
      const bookingData = {
        studioId: studio._id,
        studioTitle: studio.title,
        studioImage: studio.image,

        userName: session.user.name,
        userEmail: session.user.email,

        bookingDate: bookingDate,
        startTime: startTime,
        endTime: endTime,

        totalHours: totalHours,
        hourlyRate: Number(studio.hourlyRate),
        securityDeposit: Number(studio.securityDeposit),
        totalPrice: totalPrice,

        status: "Pending",
      };

      // Login করা User-এর JWT Token বের করব
      const token = await getTokenFromClient();

      if (!token) {
        toast.error("আবার Login করো");
        return;
      }

      // Booking Data এবং JWT Token Backend-এ পাঠাব
      const result = await createBooking(bookingData, token);

      console.log("Booking Response:", result);

      toast.success("Booking সফল হয়েছে!");

      // Booking শেষ হলে Modal বন্ধ করব
      setIsOpen(false);

      // Input খালি করব
      setBookingDate("");
      setStartTime("");
      setEndTime("");

    } catch (error) {
      console.log("Booking Error:", error);
      toast.error(error.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  // Session Check হওয়ার আগ পর্যন্ত অপেক্ষা
  if (isPending) {
    return <button disabled>Loading...</button>;
  }

  // Login না থাকলে Login Button দেখাব
  if (!session?.user) {
    return (
      <Link href="/login" className="btn btn-primary w-full mt-6">
        Login to Book
      </Link>
    );
  }

  return (
    <>
      {/* Booking Modal খোলার Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-primary w-full mt-6"
      >
        Book Workspace Now
      </button>

      {/* Button Click করলে Modal দেখাবে */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

          <div className="bg-white text-gray-900 w-full max-w-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Book Your Studio
            </h2>

            <form onSubmit={handleBooking}>

              {/* Studio Information */}
              <h3 className="font-bold">
                {studio.title}
              </h3>

              <p className="mb-4">
                Hourly Rate: ${studio.hourlyRate}
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

              {/* Booking হিসাব দেখাব */}
              <div className="bg-gray-100 p-4 rounded-lg mb-4">

                <p>
                  Booking Hours: {totalHours}
                </p>

                <p>
                  Total Price: ${totalPrice.toFixed(2)}
                </p>

                <p>
                  Security Deposit: ${studio.securityDeposit}
                </p>

              </div>

              {/* Booking Submit */}
              <button
                type="submit"
                disabled={loading || totalHours <= 0}
                className="btn btn-primary w-full"
              >
                {loading ? "Booking হচ্ছে..." : "Confirm Booking"}
              </button>

              {/* Modal বন্ধ করার Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
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
