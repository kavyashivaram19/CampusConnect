import { Link } from "react-router-dom";

function Hero() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <section className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 text-white min-h-[90vh] flex items-center">

      {/* Decorative Background */}
      <div className="absolute -top-32 -left-24 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-300 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-white rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-14 items-center relative z-10">

        {/* LEFT */}

        <div>

          <span className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold border border-white/20">

            🎓 Join 1000+ Students

          </span>

          <p className="uppercase tracking-[4px] text-pink-100 font-semibold mt-6">

            Welcome to CampusConnect

          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold mt-5 leading-tight">

            Discover Amazing

            <span className="block text-yellow-300">

              Campus Events

            </span>

          </h1>

          <p className="mt-6 text-lg text-pink-100 leading-8 max-w-xl">

            Register for hackathons, workshops, seminars,
            cultural festivals, sports events and much more —
            all from one smart platform.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/events"
              className="bg-white text-pink-600 px-8 py-3 rounded-xl font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300"
            >
              🎉 Explore Events
            </Link>

            {(user?.role === "admin" ||
              user?.role === "coordinator") && (

              <Link
                to="/create-event"
                className="border-2 border-white px-8 py-3 rounded-xl hover:bg-white hover:text-pink-600 transition duration-300"
              >
                ➕ Create Event
              </Link>

            )}

          </div>

        </div>

        {/* RIGHT */}

        <div className="hidden md:flex justify-center">

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-white/20">

            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=700"
              alt="Campus Event"
              className="rounded-2xl w-[520px] hover:scale-105 transition duration-500"
            />

          </div>

        </div>

      </div>

    </section>

  );

}

export default Hero;