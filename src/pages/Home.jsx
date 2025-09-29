import AboutUs from "../components/AboutUs";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import FeaturedProducts from "../features/Products/FeaturedProducts";

function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <FeaturedProducts />
      <Testimonials />
    </>
  );
}

export default Home;
