
const steps = [
  {
    number: "01",
    title: "Explore Studios",
    description:
      "Browse a wide range of creative studios, including photography studios, film stages, podcast lounges, music suites, and workshops.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Choose Your Space",
    description:
      "Explore studio details, view photos, check available amenities, location, hourly rates, and capacity.",
    icon: "🏢",
  },
  {
    number: "03",
    title: "Book Your Studio",
    description:
      "Select your preferred date and time, review the booking details, and confirm your reservation securely.",
    icon: "📅",
  },
  {
    number: "04",
    title: "Create Something Amazing",
    description:
      "Visit your booked studio and bring your creative ideas to life. Enjoy a smooth and hassle-free experience.",
    icon: "🎬",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-16 md:py-20 bg-base-200 scroll-mt-20"
    >
      <div className="container mx-auto px-4">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold mb-2">
            SIMPLE PROCESS
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            How It Works
          </h2>

          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            Find your perfect creative space in four simple steps.
            Explore, choose, book, and create something amazing.
          </p>
        </div>

        {/* Steps Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-300 text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">
                {step.icon}
              </div>

              <p className="text-primary font-bold text-lg mb-2">
                STEP {step.number}
              </p>

              <h3 className="text-xl font-bold mb-3">
                {step.title}
              </h3>

              <p className="text-base-content/70 text-sm leading-6">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
