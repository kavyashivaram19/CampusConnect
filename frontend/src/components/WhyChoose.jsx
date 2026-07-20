import { CalendarDays, Bell, Users, ChartColumn } from "lucide-react";

function WhyChoose() {
  const features = [
    {
      icon: <CalendarDays size={40} className="text-blue-600" />,
      title: "Easy Registration",
      description: "Register for campus events in just one click."
    },
    {
      icon: <Bell size={40} className="text-blue-600" />,
      title: "Instant Updates",
      description: "Get notified about upcoming events and announcements."
    },
    {
      icon: <Users size={40} className="text-blue-600" />,
      title: "Club Management",
      description: "Connect students with clubs and coordinators."
    },
    {
      icon: <ChartColumn size={40} className="text-blue-600" />,
      title: "Attendance Tracking",
      description: "Track attendance and participation effortlessly."
    }
  ];

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Why Choose CampusConnect?
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Everything you need to manage and participate in campus events.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >

              <div className="flex justify-center mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;