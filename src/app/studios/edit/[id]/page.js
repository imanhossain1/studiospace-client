
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import { getSingleStudio, updateStudio } from "@/lib/api";

import { toast } from "react-toastify";

export default function UpdateStudioPage() {
  const router = useRouter();
  const params = useParams();

  const { data: session, isPending } = authClient.useSession();

  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 1. Get Single Studio Data
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push("/login");
      return;
    }

    const getStudioData = async () => {
      try {
        const result = await getSingleStudio(params.id);

        setStudio(result);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getStudioData();
  }, [session, isPending, params.id, router]);


  // 2. Update Studio
  const handleUpdateStudio = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updatedStudio = {
      title: formData.get("title"),
      category: formData.get("category"),
      hourlyRate: Number(formData.get("hourlyRate")),
      securityDeposit: Number(formData.get("securityDeposit")),
      maxCapacity: Number(formData.get("maxCapacity")),
      location: formData.get("location"),
      image: formData.get("image"),
      amenities: formData.getAll("amenities"),
      overview: formData.get("overview"),
    };

    try {
      setUpdating(true);

      const result = await updateStudio(params.id, updatedStudio);

      if (result.matchedCount > 0) {
        toast.success("Studio Updated Successfully!");

        router.push("/my-listings");
      } else {
        toast.error("Studio not found!");
      }

    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };


  // 3. Loading
  if (isPending || loading) {
    return (
      <div className="text-center py-20">
        Loading Studio...
      </div>
    );
  }


  // 4. Studio Not Found
  if (!studio) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">
          Studio Not Found!
        </h2>

        <Link href="/my-listings" className="text-blue-600">
          Back to My Listings
        </Link>
      </div>
    );
  }


  // 5. Update Form UI
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <Link
            href="/my-listings"
            className="text-blue-600 font-medium"
          >
            ← Back to My Listings
          </Link>

          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            Update Studio
          </h1>

          <p className="text-gray-500 mt-2">
            Update your studio information.
          </p>

        </div>


        {/* Form */}
        <form
          onSubmit={handleUpdateStudio}
          className="bg-white p-6 md:p-8 rounded-2xl shadow space-y-5"
        >

          {/* Title */}
          <div>
            <label className="block font-medium mb-2">
              Studio Title
            </label>

            <input
              type="text"
              name="title"
              defaultValue={studio.title}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>


          {/* Category */}
          <div>
            <label className="block font-medium mb-2">
              Category
            </label>

            <select
              name="category"
              defaultValue={studio.category}
              required
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Category</option>
              <option value="Photo Studio">Photo Studio</option>
              <option value="Film Stage">Film Stage</option>
              <option value="Podcast Lounge">Podcast Lounge</option>
              <option value="Music Suite">Music Suite</option>
              <option value="Workshop">Workshop</option>
              <option value="Creative Workspace">Creative Workspace</option>
              <option value="Dance Studio">Dance Studio</option>
              <option value="Other">Other</option>
            </select>
          </div>


          {/* Hourly Rate */}
          <div>
            <label className="block font-medium mb-2">
              Hourly Rate
            </label>

            <input
              type="number"
              name="hourlyRate"
              defaultValue={studio.hourlyRate}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>


          {/* Security Deposit */}
          <div>
            <label className="block font-medium mb-2">
              Security Deposit
            </label>

            <input
              type="number"
              name="securityDeposit"
              defaultValue={studio.securityDeposit}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>


          {/* Max Capacity */}
          <div>
            <label className="block font-medium mb-2">
              Max Capacity
            </label>

            <input
              type="number"
              name="maxCapacity"
              defaultValue={studio.maxCapacity}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>


          {/* Location */}
          <div>
            <label className="block font-medium mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              defaultValue={studio.location}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>


          {/* Image */}
          <div>
            <label className="block font-medium mb-2">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              defaultValue={studio.image}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>


          {/* Amenities */}
          <div>
            <label className="block font-medium mb-3">
              Amenities
            </label>

            {[
              "AC",
              "WiFi",
              "Parking",
              "Lighting",
              "Sound System",
              "Projector",
              "Cameras",
              "Furniture",
              "Microphone",
              "Green Screen",
            ].map((amenity) => (

              <label
                key={amenity}
                className="flex items-center gap-3 mb-3"
              >
                <input
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  defaultChecked={studio.amenities?.includes(amenity)}
                  className="w-4 h-4"
                />

                <span>{amenity}</span>

              </label>

            ))}

          </div>


          {/* Overview */}
          <div>
            <label className="block font-medium mb-2">
              Overview
            </label>

            <textarea
              name="overview"
              defaultValue={studio.overview}
              rows="5"
              required
              className="w-full border rounded-lg p-3"
            />
          </div>


          {/* Save Changes */}
          <button
            type="submit"
            disabled={updating}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>

        </form>

      </div>

    </div>
  );
}
