import { getFeaturedStudios } from "@/lib/api";
import StudioCard from "@/components/studios/StudioCard";

const FeaturedStudios = async () => {
  // 1. API থেকে Featured Studios আনবে
  const studios = await getFeaturedStudios();

  return (
    <section className="container mx-auto px-4 py-10">

      <h2 className="text-3xl font-bold mb-6">
        Featured Studios
      </h2>

      {/* 2. প্রতিটি Studio-এর Card দেখাবে */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {studios.map((studio) => (
          <StudioCard
            key={studio._id}
            studio={studio}
          />
        ))}

      </div>
    </section>
  );
};

export default FeaturedStudios;