
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getSingleStudio } from "@/lib/api";
import BookingButton from "@/components/studios/BookingButton";

const StudioDetailsPage = async ({ params }) => {
  const { id } = await params;

  // Get logged in user
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  const user = session?.user || null;

  // Get studio details (Public API)
  const studio = await getSingleStudio(id);

  if (!studio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Studio Not Found</h1>
          <p className="text-base-content/60 mt-3">
            Sorry, this studio is no longer available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">

        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-6">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/studios">Explore Studios</a>
            </li>
            <li className="font-semibold">
              {studio.title}
            </li>
          </ul>
        </div>

        {/* Page Header */}
        <div className="mb-7">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="badge badge-primary badge-outline py-3">
              {studio.category}
            </span>

            <span className="badge badge-success badge-outline py-3">
              Available for Booking
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {studio.title}
          </h1>

          <p className="text-base-content/60 mt-3 flex items-center gap-2">
            <span>📍</span>
            {studio.location}
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Studio Image */}
            <div className="overflow-hidden rounded-2xl shadow-lg bg-base-100">
              <img
                src={studio.image}
                alt={studio.title}
                className="w-full h-[280px] md:h-[480px] object-cover"
              />
            </div>

            {/* Quick Information */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              <div className="bg-base-100 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-base-content/60">
                  Hourly Rate
                </p>
                <h3 className="text-xl font-bold text-primary mt-2">
                  ৳{studio.hourlyRate}
                </h3>
                <p className="text-xs text-base-content/50 mt-1">
                  Per hour
                </p>
              </div>

              <div className="bg-base-100 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-base-content/60">
                  Capacity
                </p>
                <h3 className="text-xl font-bold mt-2">
                  {studio.maxCapacity}
                </h3>
                <p className="text-xs text-base-content/50 mt-1">
                  Maximum people
                </p>
              </div>

              <div className="bg-base-100 rounded-xl p-5 shadow-sm col-span-2 md:col-span-1">
                <p className="text-sm text-base-content/60">
                  Rating
                </p>
                <h3 className="text-xl font-bold mt-2">
                  ⭐ {studio.rating || "New"}
                </h3>
                <p className="text-xs text-base-content/50 mt-1">
                  Studio rating
                </p>
              </div>

            </div>

            {/* About Studio */}
            <section className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">
                About This Studio
              </h2>

              <p className="text-base-content/70 leading-8 whitespace-pre-line">
                {studio.overview || "No description available for this studio."}
              </p>
            </section>

            {/* Amenities */}
            <section className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">
                What This Studio Offers
              </h2>

              {studio.amenities?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {studio.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl bg-base-200"
                    >
                      <span className="text-primary text-xl">
                        ✓
                      </span>

                      <span className="font-medium">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-base-content/60">
                  No amenities listed.
                </p>
              )}
            </section>

            {/* Additional Information */}
            <section className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-5">
                Important Information
              </h2>

              <div className="flex justify-between items-center border-b border-base-200 pb-4">
                <span className="text-base-content/60">
                  Security Deposit
                </span>
                <span className="font-bold">
                  ৳{studio.securityDeposit || 0}
                </span>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="text-base-content/60">
                  Maximum Capacity
                </span>
                <span className="font-bold">
                  {studio.maxCapacity} People
                </span>
              </div>
            </section>

          </div>

          {/* Right Booking Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg lg:sticky lg:top-8">

              <p className="text-sm text-base-content/60">
                Starting from
              </p>

              <div className="flex items-baseline gap-2 mt-2">
                <h2 className="text-3xl font-bold text-primary">
                  ৳{studio.hourlyRate}
                </h2>
                <span className="text-base-content/60">
                  / hour
                </span>
              </div>

              <div className="divider my-5"></div>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between gap-3">
                  <span className="text-base-content/60">
                    Category
                  </span>
                  <span className="font-semibold">
                    {studio.category}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-base-content/60">
                    Location
                  </span>
                  <span className="font-semibold text-right">
                    {studio.location}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-base-content/60">
                    Security Deposit
                  </span>
                  <span className="font-semibold">
                    ৳{studio.securityDeposit || 0}
                  </span>
                </div>

              </div>

              <div className="divider my-5"></div>

              {/* Booking Button */}
              <BookingButton studio={studio} />

              <div className="mt-5 p-4 rounded-xl bg-base-200">
                <p className="font-semibold text-sm">
                  🛡️ Secure Booking
                </p>
                <p className="text-xs text-base-content/60 mt-2 leading-5">
                  Your booking is submitted securely. You can track
                  your reservation status from My Bookings.
                </p>
              </div>

              <p className="text-xs text-center text-base-content/50 mt-5">
                Questions? Contact our support team.
              </p>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
};

export default StudioDetailsPage;
