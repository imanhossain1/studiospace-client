import { getSingleStudio } from "@/lib/api";

const StudioDetailsPage = async ({ params }) => {
  const { id } = await params;

  const studio = await getSingleStudio(id);

  if (!studio) {
    return <h1>Studio Not Found</h1>;
  }

  return (
    <div className="container mx-auto px-4 py-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Studio Image */}
        <div>
          <img
            src={studio.image}
            alt={studio.title}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        {/* Studio Information */}
        <div>
          <h1 className="text-3xl font-bold">
            {studio.title}
          </h1>

          <p className="text-gray-500 mt-2">
            {studio.category}
          </p>

          <p className="mt-4">
            📍 {studio.location}
          </p>

          <h2 className="text-2xl font-bold mt-5">
            ৳ {studio.hourlyRate} / hour
          </h2>

          <p className="mt-4">
            {studio.overview}
          </p>

          <p className="mt-4">
            ⭐ {studio.rating}
          </p>

          <p className="mt-2">
            Maximum Capacity: {studio.maxCapacity}
          </p>

          <p className="mt-2">
            Security Deposit: ৳ {studio.securityDeposit}
          </p>

          <h3 className="font-bold mt-5">Amenities</h3>

          <div className="flex flex-wrap gap-2 mt-2">
            {studio.amenities?.map((amenity, index) => (
              <span
                key={index}
                className="badge badge-outline p-3"
              >
                {amenity}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudioDetailsPage;