
import React from "react";
import Link from "next/link";

function HowItWorks() {
  const steps = [
    {
      id: 1,
      number: "01",
      icon: "🔍",
      title: "Discover Spaces",
      description: "Find the perfect creative studio for your next project.",
    },
    {
      id: 2,
      number: "02",
      icon: "📅",
      title: "Select Shoot Hours",
      description: "Choose your preferred booking date and available time.",
    },
    {
      id: 3,
      number: "03",
      icon: "✅",
      title: "Book Instantly",
      description: "Complete your booking request with just a few clicks.",
    },
    {
      id: 4,
      number: "04",
      icon: "🎬",
      title: "Create & Produce",
      description: "Visit your studio and start creating amazing projects.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-base-100">

      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-12">

          <p className="text-primary font-semibold text-sm mb-2">
            SIMPLE BOOKING PROCESS
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            How Booking Works
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Booking your perfect creative workspace is simple.
            Follow these four easy steps.
          </p>

        </div>

        {/* Booking Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {steps.map((step) => (

            <div
              key={step.id}
              className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-lg transition-all duration-300"
            >

              <div className="card-body items-center text-center">

                {/* Step Number */}
                <span className="text-primary font-bold text-sm">
                  STEP {step.number}
                </span>

                {/* Icon */}
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl my-3">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="card-title text-lg">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-6">
                  {step.description}
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">

          <Link href="/studios" className="btn btn-primary">
            Find Your Studio
          </Link>

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;
