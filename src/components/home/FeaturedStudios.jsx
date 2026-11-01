
import React from "react";
import Link from "next/link";
import Image from "next/image";
import studios from "../../../public/studios.json";

function FeaturedStudios() {
  const featuredStudios = studios.slice(0, 6);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary mb-2">
            EXPLORE OUR SPACES
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Featured Studios
          </h2>

          <p className="text-gray-500 mt-3">
            Discover the perfect creative space for your next project.
          </p>
        </div>

        {/* Studio Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {featuredStudios.map((studio) => (
            <div
              key={studio.id}
              className="card bg-base-100 shadow-md border border-base-300 overflow-hidden h-full"
            >

              {/* Studio Image */}
              <figure className="relative h-56 w-full">
                <Image
                  src={studio.image}
                  alt={studio.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </figure>

              <div className="card-body flex flex-col">

                {/* Category and Rating */}
                <div className="flex items-center justify-between gap-2">
                  <span className="badge badge-primary badge-outline">
                    {studio.category}
                  </span>

                  <span className="badge badge-warning gap-1">
                    ★ {studio.rating}
                  </span>
                </div>

                {/* Title */}
                <h3 className="card-title text-lg min-h-14">
                  {studio.title}
                </h3>

                {/* Price */}
                <p className="text-primary font-bold text-xl">
                  ${studio.price}
                  <span className="text-sm font-normal text-gray-500">
                    {" "}/ hr
                  </span>
                </p>

                {/* Location */}
                <p className="text-sm text-gray-500">
                  📍 {studio.location}
                </p>

                {/* View Details */}
                <div className="card-actions mt-auto pt-4">
                  <Link
                    href={`/studios/${studio.id}`}
                    className="btn btn-primary w-full"
                  >
                    View Details
                  </Link>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Explore All Studios */}
        <div className="text-center mt-10">
          <Link href="/studios" className="btn btn-outline btn-primary">
            Explore All Studios
          </Link>
        </div>

      </div>
    </section>
  );
}

export default FeaturedStudios;
