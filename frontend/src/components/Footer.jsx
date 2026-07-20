import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-blue-400">
            CampusConnect
          </h2>

          <p className="mt-4 text-gray-300 leading-7">
            CampusConnect helps students discover,
            register and participate in college events
            from a single platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Events</li>
            <li className="hover:text-white cursor-pointer">Create Event</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact Us
          </h3>

          <div className="flex items-center gap-2 text-gray-300">
            <MdEmail size={22} />
            <span>support@campusconnect.com</span>
          </div>

          <div className="flex gap-5 mt-6 text-2xl">

            <FaFacebook className="hover:text-blue-500 cursor-pointer transition" />

            <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />

            <FaLinkedin className="hover:text-blue-400 cursor-pointer transition" />

          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 py-5 text-center text-gray-400">
        © 2026 CampusConnect. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;