
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getMyStudios, deleteStudio } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export default function MyListingsPage() {
  const router = useRouter();

  // 1. User Session
  const { data: session, isPending } = authClient.useSession();

  // 2. All States
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState(null);

  // 3. Get My Studios
  const getMyListings = async () => {
    try {
      setLoading(true);

      const result = await getMyStudios(session.user.email);

      console.log("My Studios:", result);

      setStudios(result);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load studios");
    } finally {
      setLoading(false);
    }
  };

  // 4. Private Route
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }

    if (!isPending && session) {
      getMyListings();
    }
  }, [session, isPending]);

  // 5. Delete Studio
  const handleDelete = async () => {
    try {
      setDeleting(true);

      const result = await deleteStudio(
        selectedStudio._id,
        session.user.email
      );

      console.log("Delete Response:", result);

      if (result.deletedCount > 0) {
        toast.success("Studio deleted successfully!");

        // Remove Studio From UI
        const remainingStudios = studios.filter(
          (studio) => studio._id !== selectedStudio._id
        );

        setStudios(remainingStudios);

        setSelectedStudio(null);
      } else {
        toast.error("Studio not found!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed!");
    } finally {
      setDeleting(false);
    }
  };

  // 6. Session Loading
  if (isPending || !session) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 7. Data Loading
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-3">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p>Loading your studios...</p>
      </div>
    );
  }

  // 8. UI
  return (
    <main className="min-h-screen bg-base-200 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">

          <div>
            <p className="text-primary font-semibold text-sm">
              HOST DASHBOARD
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              My Studio Listings
            </h1>

            <p className="text-base-content/60 mt-2">
              Manage all your studio spaces in one place.
            </p>
          </div>

          <Link href="/add-studio" className="btn btn-primary">
            + Add New Studio
          </Link>

        </div>

        {/* Total Studios */}
        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 mb-8">

          <p className="text-base-content/60">
            Total Studios
          </p>

          <h2 className="text-3xl font-bold text-primary mt-2">
            {studios.length}
          </h2>

        </div>

        {/* Empty Data */}
        {studios.length === 0 && (

          <div className="bg-base-100 rounded-2xl p-10 text-center shadow-sm">

            <div className="text-6xl mb-4">
              🏢
            </div>

            <h2 className="text-2xl font-bold">
              No Studios Found
            </h2>

            <p className="text-base-content/60 mt-2 mb-6">
              You haven't added any studios yet.
            </p>

            <Link href="/add-studio" className="btn btn-primary">
              Add Your First Studio
            </Link>

          </div>

        )}

        {/* Studio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {studios.map((studio) => (

            <div
              key={studio._id}
              className="card bg-base-100 shadow-md border border-base-300 overflow-hidden"
            >

              {/* Image */}
              <figure className="h-52">
                <img
                  src={studio.image}
                  alt={studio.title}
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="card-body">

                {/* Category */}
                <div>
                  <span className="badge badge-primary badge-outline">
                    {studio.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="card-title text-xl mt-2">
                  {studio.title}
                </h2>

                {/* Location */}
                <p className="text-sm text-base-content/60">
                  📍 {studio.location}
                </p>

                {/* Price */}
                <div className="flex justify-between items-center border-y border-base-300 py-4 my-2">

                  <div>
                    <p className="text-xs text-base-content/50">
                      Hourly Rate
                    </p>

                    <h3 className="text-xl font-bold text-primary">
                      ${studio.hourlyRate}/hr
                    </h3>
                  </div>

                  <div>
                    <p className="text-xs text-base-content/50">
                      Capacity
                    </p>

                    <h3 className="font-bold">
                      {studio.maxCapacity} People
                    </h3>
                  </div>

                </div>

                {/* Overview */}
                <p className="text-sm text-base-content/70">
                  {studio.overview}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mt-3">

                  {studio.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="badge badge-ghost"
                    >
                      {amenity}
                    </span>
                  ))}

                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-5">

                  <Link
                    href={`/studios/edit/${studio._id}`}
                    className="btn btn-outline btn-primary flex-1"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => setSelectedStudio(studio)}
                    className="btn btn-outline btn-error flex-1"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Delete Modal */}
      {selectedStudio && (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50">

          <div className="bg-base-100 rounded-2xl p-7 max-w-md w-full shadow-xl text-center">

            <div className="text-5xl mb-4">
              🗑️
            </div>

            <h2 className="text-2xl font-bold">
              Delete Studio?
            </h2>

            <p className="text-base-content/60 mt-3">
              Are you sure you want to delete
              <strong> {selectedStudio.title} </strong>?
            </p>

            <p className="text-error text-sm mt-2">
              This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-7">

              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deleting}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="btn btn-error text-white flex-1"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}
