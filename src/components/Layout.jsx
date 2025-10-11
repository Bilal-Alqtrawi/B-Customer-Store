import Navbar from "./Navbar";
import Main from "./Main";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

function Layout() {
  return (
    <>
      <Navbar />
      <Main />
      <Footer />
      <ToastContainer pauseOnHover={false} />
    </>
  );
}

export default Layout;
