
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { addStudio } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddStudioPage() {
  const router = useRouter();

  // Logged in user session
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  // Private Route
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Amenities
  const amenitiesList = [
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
  ];

  // Form Submit
  const handleAddStudio = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData(e.target);

      // Selected Amenities
      const amenities = formData.getAll("amenities");

      // Studio Data
      const studioData = {
        title: formData.get("title"),
        category: formData.get("category"),
        hourlyRate: Number(formData.get("hourlyRate")),
        securityDeposit: Number(formData.get("securityDeposit")),
        maxCapacity: Number(formData.get("maxCapacity")),
        location: formData.get("location"),
        image: formData.get("image"),
        amenities: amenities,
        overview: formData.get("overview"),

        // Logged-in User Information
        userName: session.user.name,
        userEmail: session.user.email,
      };

      console.log("New Studio Data:", studioData);

      // Send Data To Server
      const save = await addStudio(studioData);

      console.log("Save Studio Response:", save);

      if (save.insertedId || save.acknowledged) {
        toast.success("Studio added successfully!");

        e.target.reset();

        router.push("/my-listings");
      } else {
        toast.error("Studio could not be added!");
      }
    } catch (error) {
      console.log("Add Studio Error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Session Loading
  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Prevent showing form without login
  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Add New Studio
          </h1>

          <p className="text-base-content/60 mt-2">
            Share your creative workspace with others
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <form onSubmit={handleAddStudio}>

              {/* Studio Information */}
              <h2 className="text-xl font-bold mb-4">
                Studio Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Title */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Studio Title *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="title"
                    placeholder="Enter studio title"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Category */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Category *
                    </span>
                  </label>

                  <select
                    name="category"
                    className="select select-bordered w-full"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select Category
                    </option>

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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Hourly Rate ($) *
                    </span>
                  </label>

                  <input
                    type="number"
                    name="hourlyRate"
                    placeholder="Example: 50"
                    min="1"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Security Deposit */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Security Deposit ($) *
                    </span>
                  </label>

                  <input
                    type="number"
                    name="securityDeposit"
                    placeholder="Example: 100"
                    min="0"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Capacity */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Maximum Capacity *
                    </span>
                  </label>

                  <input
                    type="number"
                    name="maxCapacity"
                    placeholder="How many people?"
                    min="1"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Location */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Location / Address *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="Enter full address"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

              </div>

              {/* Image URL */}
              <div className="form-control mt-5">
                <label className="label">
                  <span className="label-text font-semibold">
                    Studio Image URL *
                  </span>
                </label>

                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/studio.jpg"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Amenities */}
              <div className="form-control mt-6">
                <label className="label">
                  <span className="label-text font-semibold">
                    Amenities *
                  </span>
                </label>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border border-base-300 rounded-lg">

                  {amenitiesList.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name="amenities"
                        value={amenity}
                        className="checkbox checkbox-primary checkbox-sm"
                      />

                      <span className="text-sm">
                        {amenity}
                      </span>
                    </label>
                  ))}

                </div>
              </div>

              {/* Overview */}
              <div className="form-control mt-5">
                <label className="label">
                  <span className="label-text font-semibold">
                    Detailed Overview *
                  </span>
                </label>

                <textarea
                  name="overview"
                  placeholder="Describe your studio..."
                  className="textarea textarea-bordered w-full h-32"
                  required
                />
              </div>

              {/* Owner Information */}
              <div className="divider mt-8">
                Owner Information
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* User Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Owner Name
                    </span>
                  </label>

                  <input
                    type="text"
                    value={session.user.name || ""}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>

                {/* User Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Owner Email
                    </span>
                  </label>

                  <input
                    type="email"
                    value={session.user.email || ""}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>

              </div>

              {/* Submit Button */}
              <div className="mt-8">

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full text-lg"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Adding Studio...
                    </>
                  ) : (
                    "Add Studio"
                  )}
                </button>

              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
