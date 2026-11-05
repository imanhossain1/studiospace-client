
import Link from "next/link";
import { getStudios } from "@/lib/api";
import StudioCard from "@/components/studios/StudioCard";
import StudioCategoryNav from "@/components/studios/StudioCategoryNav";

const StudiosPage = async ({ searchParams }) => {
  const params = await searchParams;
  const category = params?.category || "";

  const studios = await getStudios(category);

  return (
    <main className="min-h-screen bg-base-200">

      {/* Compact Hero Banner */}
      <section className="bg-base-100 border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-11">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="max-w-2xl">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                Discover Your Space
              </span>

              <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
                Explore Creative Studios
              </h1>

              <p className="text-base-content/60 mt-3 leading-7">
                Find the perfect space for photography, music,
                podcasting and your next creative project.
              </p>
            </div>

            <Link
              href="/add-studio"
              className="btn btn-primary px-7"
            >
              + List Your Studio
            </Link>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-12">

        {/* Heading and Count */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">

          <div>
            <p className="text-sm font-semibold text-primary mb-2">
              FIND YOUR PERFECT SPACE
            </p>

            <h2 className="text-2xl md:text-3xl font-bold">
              {category ? `${category} Studios` : "All Studios"}
            </h2>

            <p className="text-base-content/60 mt-2">
              Explore spaces designed for your creativity.
            </p>
          </div>

          <div className="bg-base-100 border border-base-300 rounded-xl px-5 py-3">
            <p className="text-2xl font-bold text-primary">
              {studios.length}
            </p>
            <p className="text-xs text-base-content/60">
              Studios Found
            </p>
          </div>

        </div>

        {/* Category Filter */}
        <div className="bg-base-100 rounded-2xl border border-base-300 p-4 md:p-5 mb-8">
          <h3 className="font-bold mb-4">
            Browse Categories
          </h3>

          <StudioCategoryNav selectedCategory={category} />
        </div>

        {/* Studio Cards */}
        {studios.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg md:text-xl font-bold">
                Creative Spaces
              </h3>

              <span className="text-sm text-base-content/50">
                {studios.length} results
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {studios.map((studio) => (
                <StudioCard
                  key={studio._id}
                  studio={studio}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-base-100 rounded-2xl border border-base-300 p-10 md:p-16 text-center">
            <div className="text-5xl mb-4">🎨</div>

            <h3 className="text-2xl font-bold">
              No Studios Found
            </h3>

            <p className="text-base-content/60 mt-3 max-w-md mx-auto">
              No studios are available in this category right now.
              Try another category or explore all studios.
            </p>

            <Link
              href="/studios"
              className="btn btn-primary mt-6"
            >
              View All Studios
            </Link>
          </div>
        )}

      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-primary text-primary-content rounded-2xl px-6 py-8 md:px-10 md:py-9 flex flex-col md:flex-row items-center justify-between gap-5">

          <div>
            <h2 className="text-xl md:text-2xl font-bold">
              Have a Studio to Share?
            </h2>

            <p className="text-primary-content/80 mt-2">
              List your creative space and connect with creators.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="btn bg-white text-primary border-white hover:bg-base-200"
          >
            List Your Studio →
          </Link>

        </div>
      </section>

    </main>
  );
};

export default StudiosPage;
