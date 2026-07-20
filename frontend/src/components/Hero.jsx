import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <p className="uppercase tracking-widest text-blue-200 font-semibold">
            Welcome to CampusConnect
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold mt-4 leading-tight">
            Discover Amazing
            <span className="block text-yellow-300">
              Campus Events
            </span>
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Register for hackathons, workshops, seminars,
            cultural fests and much more — all in one place.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/events"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Explore Events
            </Link>

            <Link
              to="/create-event"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
            >
              Create Event
            </Link>
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=700"
            alt="Campus Event"
            className="rounded-2xl shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;