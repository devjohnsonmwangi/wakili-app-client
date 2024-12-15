import Navbar from "../../components/navbar/Navbar";
import About from "./About";
import Footer from "./Footer";
import Hero from './Hero';
import Services from "./Services";

const Home = () => {
  return (
    <div>
      {/* Navbar with Links to Sections */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Services Section */}
      <section id="services">
        <Services />
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
