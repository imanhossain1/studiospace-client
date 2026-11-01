
import React from "react";
import Link from "next/link";
import Image from "next/image";

function StudioCategories() {
  const categories = [
    {
      id: 1,
      name: "Photo Studios",
      slug: "photo-studio",
      description: "Professional spaces for photography and creative shoots.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
    },
    {
      id: 2,
      name: "Sound Stages",
      slug: "sound-stage",
      description: "Perfect spaces for filmmaking and video production.",
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
    },
    {
      id: 3,
      name: "Podcast Rooms",
      slug: "podcast-room",
      description: "Create professional podcasts with quality equipment.",
      image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    },
    {
      id: 4,
      name: "Music Suites",
      slug: "music-suite",
      description: "Explore recording studios for music and audio production.",
      image:
        "https://images.unsplash.com/photo-1593078166030-9c9e9c7c9b8a?w=800",
    },
    {
      id: 5,
      name: "Art Workshops",
      slug: "art-workshop",
      description: "Creative spaces for artists and handmade projects.",
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    },
  ];

  return (
    <section className="py-16 px-4 bg-base-200">

      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-10">

          <p className="text-primary font-semibold text-sm mb-2">
            FIND YOUR CREATIVE SPACE
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Browse by Studio Categories
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Explore different creative spaces and find the perfect studio
            for your next project.
          </p>

        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {categories.map((category) => (

            <Link
              key={category.id}
              href={`/studios?category=${category.slug}`}
              className="group"
            >

              <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">

                {/* Category Image */}
                <figure className="relative h-56 w-full overflow-hidden">

                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                </figure>

                {/* Category Content */}
                <div className="card-body">

                  <h3 className="card-title text-xl">
                    {category.name}
                  </h3>

                  <p className="text-gray-500 text-sm leading-6">
                    {category.description}
                  </p>

                  <div className="mt-3">

                    <span className="text-primary font-semibold text-sm group-hover:underline">
                      Explore Studios →
                    </span>

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

        {/* Bottom Button */}
        <div className="text-center mt-10">

          <Link
            href="/studios"
            className="btn btn-primary"
          >
            Explore All Studios
          </Link>

        </div>

      </div>

    </section>
  );
}

export default StudioCategories;
