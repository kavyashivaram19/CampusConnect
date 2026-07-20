import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        <h1 className="text-2xl font-bold text-blue-600">
          CampusConnect
        </h1>

        <div className="flex gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/events" className="hover:text-blue-600">Events</Link>
          <Link to="/create-event" className="hover:text-blue-600">Create Event</Link>
        </div>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;