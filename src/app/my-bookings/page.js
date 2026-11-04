
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getMyBookings, cancelBooking } from "@/lib/api";
import { toast } from "react-toastify";

export default function MyBookingsPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState("");

  const userEmail = session?.user?.email;

  // Load User Bookings
  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      router.push("/login");
      return;
    }

    const loadBookings = async () => {
      try {
        setLoading(true);

        const data = await getMyBookings(userEmail);

        setBookings(data);
      } catch (error) {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [userEmail, isPending, router]);

  // Cancel Pending Booking
  const handleCancelBooking = async (id) => {
    try {
      setCancelId(id);

      await cancelBooking(id, userEmail);

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === id
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );

      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error(error.message || "Failed to cancel booking");
    } finally {
      setCancelId("");
    }
  };

  // Format Booking Date
  const formatDate = (date) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format Time
  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Status Badge Style
  const getStatusStyle = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-700",
      Confirmed: "bg-green-100 text-green-700",
      Completed: "bg-blue-100 text-blue-700",
      Cancelled: "bg-red-100 text-red-700",
    };

    return styles[status] || "bg-gray-100 text-gray-700";
  };

  if (isPending || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!userEmail) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Bookings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your studio reservations.
          </p>
        </div>

        {/* Booking Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Total Bookings:{" "}
            <span className="font-bold text-gray-800">
              {bookings.length}
            </span>
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">📅</div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Bookings Found
            </h2>

            <p className="text-gray-500 mt-2">
              You have not booked any studio yet.
            </p>

            <Link
              href="/studios"
              className="btn btn-primary mt-6"
            >
              Explore Studios
            </Link>
          </div>
        ) : (

          /* Booking Cards */
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">

                  {/* Studio Image */}
                  <div className="md:w-64 h-52 md:h-auto">
                    <img
                      src={booking.studioImage}
                      alt={booking.studioTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Booking Information */}
                  <div className="flex-1 p-5">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                      <h2 className="text-xl font-bold text-gray-800">
                        {booking.studioTitle}
                      </h2>

                      <span
                        className={`badge border-0 px-4 py-3 font-semibold ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>

                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">

                      <div>
                        <p className="text-sm text-gray-500">
                          Booking Date
                        </p>
                        <p className="font-semibold text-gray-800">
                          {formatDate(booking.bookingDate)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Booking Time
                        </p>
                        <p className="font-semibold text-gray-800">
                          {formatTime(booking.startTime)} -{" "}
                          {formatTime(booking.endTime)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Total Hours
                        </p>
                        <p className="font-semibold text-gray-800">
                          {booking.totalHours} Hours
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Hourly Rate
                        </p>
                        <p className="font-semibold text-gray-800">
                          ${booking.hourlyRate} / hour
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Total Price
                        </p>
                        <p className="font-bold text-lg text-primary">
                          ${booking.totalPrice}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Security Deposit
                        </p>
                        <p className="font-semibold text-gray-800">
                          ${booking.securityDeposit}
                        </p>
                      </div>

                    </div>

                    {/* Cancel Button */}
                    {booking.status === "Pending" && (
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() =>
                            handleCancelBooking(booking._id)
                          }
                          disabled={cancelId === booking._id}
                          className="btn btn-outline btn-error"
                        >
                          {cancelId === booking._id ? (
                            <>
                              <span className="loading loading-spinner loading-sm"></span>
                              Cancelling...
                            </>
                          ) : (
                            "Cancel Booking"
                          )}
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
