
import { getStudios } from "@/lib/api";
import StudioCard from "@/components/studios/StudioCard";
import StudioCategoryNav from "@/components/studios/StudioCategoryNav";

const StudiosPage = async ({ searchParams }) => {
  const params = await searchParams;
  const category = params.category;

  const studios = await getStudios(category);

  return (
    <div className="container mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-6">
        Explore Studios
      </h1>

      <StudioCategoryNav selectedCategory={category} />

      <p className="mb-5">
        {studios.length} Studios Found
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studios.map((studio) => (
          <StudioCard key={studio._id} studio={studio} />
        ))}
      </div>

    </div>
  );
};

export default StudiosPage;
