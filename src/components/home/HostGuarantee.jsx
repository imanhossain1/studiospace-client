
import React from "react";

function HostGuarantee() {
  const features = [
    {
      id: 1,
      icon: "🛡️",
      title: "Liability Protection",
      description:
        "Enjoy extra peace of mind with protection designed for studio hosts and creators.",
    },
    {
      id: 2,
      icon: "✓",
      title: "Verified Profiles",
      description:
        "Connect with trusted hosts and creators through verified user profiles.",
    },
    {
      id: 3,
      icon: "🎥",
      title: "Equipment Safety",
      description:
        "Keep your creative sessions safe with responsible equipment handling.",
    },
    {
      id: 4,
      icon: "🎧",
      title: "24/7 Host Support",
      description:
        "Get helpful support whenever you need assistance with your workspace.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-base-200">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">

          <p className="text-primary font-semibold text-sm mb-2">
            YOUR SAFETY MATTERS
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Host Guarantee & Creator Support
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            We care about your creative journey.
            Enjoy a safer and more reliable studio booking experience.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature) => (

            <div
              key={feature.id}
              className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg transition-all duration-300"
            >

              <div className="card-body items-center text-center">

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="card-title text-lg mt-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-6">
                  {feature.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default HostGuarantee;
