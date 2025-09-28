import AboutUs from "../components/AboutUs";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import ProductList from "../features/Products/ProductList";

function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutUs />
      <ProductList />
      <Testimonials />
    </div>
  );
}

export default Home;
