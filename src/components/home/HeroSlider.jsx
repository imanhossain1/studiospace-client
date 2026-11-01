
"use client";

import { useState } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Find Your Perfect Creative Space",
    description:
      "Discover professional studios for photography, filmmaking and creative projects.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  },
  {
    id: 2,
    title: "Create Something Amazing",
    description:
      "Book beautiful spaces and bring your creative ideas to life.",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb",
  },
  {
    id: 3,
    title: "Turn Your Space Into Income",
    description:
      "List your studio and connect with creators looking for the perfect workspace.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((previous) =>
      previous === slides.length - 1 ? 0 : previous + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((previous) =>
      previous === 0 ? slides.length - 1 : previous - 1
    );
  };

  const slide = slides[currentSlide];

  return (
    <section className="px-4 py-6 lg:px-10">
      <div
        className="relative flex min-h-[420px] items-center overflow-hidden rounded-2xl bg-cover bg-center md:min-h-[500px]"
        style={{
          backgroundImage: `url(${slide.image})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-6 py-12 text-white md:px-16">

          <p className="mb-4 font-semibold uppercase tracking-widest text-primary-content">
            Welcome to StudioSpace
          </p>

          <h1 className="mb-5 text-3xl font-bold md:text-5xl">
            {slide.title}
          </h1>

          <p className="mb-7 text-base text-gray-200 md:text-lg">
            {slide.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/studios" className="btn btn-primary">
              Explore Studios
            </Link>

            <Link href="/studios" className="btn btn-outline text-white">
              Host Your Space
            </Link>
          </div>
        </div>

        {/* Previous Button */}
        <button
          onClick={previousSlide}
          className="absolute left-3 top-1/2 z-20 btn btn-circle btn-sm md:left-5 md:btn-md"
          aria-label="Previous slide"
        >
          ❮
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 z-20 btn btn-circle btn-sm md:right-5 md:btn-md"
          aria-label="Next slide"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full ${
                currentSlide === index
                  ? "bg-primary"
                  : "bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
