import Hero from "../components/Hero";
import Stats from "../components/Stats";
import WhyChoose from "../components/WhyChoose";
import FeaturedEvents from "../components/FeaturedEvents";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">

      <Hero />

      <Stats />

      <WhyChoose />

      <FeaturedEvents />

      <Footer />

    </div>
  );
}

export default Home;