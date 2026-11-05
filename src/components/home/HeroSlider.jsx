
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    subtitle: "PHOTOGRAPHY & CREATIVE SPACES",
    title: "Create Something Extraordinary",
    description:
      "Discover inspiring photography studios and creative spaces for your next project.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 2,
    subtitle: "MUSIC & RECORDING STUDIOS",
    title: "Where Your Ideas Become Reality",
    description:
      "Find professional recording studios and sound spaces to bring your music to life.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 3,
    subtitle: "PODCAST & PRODUCTION SPACES",
    title: "Your Space. Your Creativity.",
    description:
      "Book unique creative workspaces and turn your vision into something amazing.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85",
  },
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto Slide
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setActiveSlide((previousSlide) => {
        return (previousSlide + 1) % slides.length;
      });
    }, 4000);

    return () => clearInterval(sliderInterval);
  }, []);

  // Next Slide
  const nextSlide = () => {
    setActiveSlide((activeSlide + 1) % slides.length);
  };

  // Previous Slide
  const previousSlide = () => {
    setActiveSlide(
      (activeSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pt-6">

      <div className="relative overflow-hidden rounded-2xl h-[340px] md:h-[430px]">

        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              activeSlide === index
                ? "opacity-100 z-10"
                : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url("${slide.image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center px-6 md:px-14">

              <div className="max-w-2xl text-white">

                <p className="text-sm font-bold tracking-[3px] text-primary-content mb-4">
                  {slide.subtitle}
                </p>

                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                  {slide.title}
                </h1>

                <p className="mt-5 text-sm md:text-lg text-white/80 leading-7 max-w-xl">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-7">

                  <Link
                    href="/studios"
                    className="btn btn-primary"
                  >
                    Explore Studios →
                  </Link>

                  <Link
                    href="/add-studio"
                    className="btn btn-outline border-white text-white hover:bg-white hover:text-black"
                  >
                    Host Your Space
                  </Link>

                </div>

              </div>
            </div>
          </div>
        ))}

        {/* Previous Button */}
        <button
          onClick={previousSlide}
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-sm md:btn-md bg-black/40 text-white border-none hover:bg-black/70"
          aria-label="Previous slide"
        >
          ❮
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-sm md:btn-md bg-black/40 text-white border-none hover:bg-black/70"
          aria-label="Next slide"
        >
          ❯
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
