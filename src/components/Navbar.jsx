import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import Logo from "../ui/Logo";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import SearchBar from "./SearchBar";

const LINKS = [
  { to: "/home", label: "Home" },
  { to: "/home#aboutUs", label: "AboutUs" },
  { to: "/home#testimonials", label: "Testimonials" },
  { to: "/products", label: "Products" },
  { to: "/cart", label: "Cart" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Custome know link is Active or Not from Location in URL
  const getNavLinkClass = (path) => {
    const currentPath = location.pathname + location.hash;
    const isActive = currentPath === path;

    return `inline-flex items-center justify-center rounded-lg border-0 px-4 py-2 text-center text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-amber-50 text-amber-600 shadow-md"
        : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
    }`;
  };
  const getNavLinkMobileClass = (path) => {
    const currentPath = location.pathname + location.hash;
    const isActive = currentPath === path;

    return `rounded-md px-4 py-3 ${
      isActive
        ? "bg-amber-100/70 text-amber-600 shadow-md"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`;
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(
    function () {
      window.scrollTo({ behavior: "smooth", top: 0 });
    },
    [location.pathname],
  );

  useEffect(function () {
    const handleScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", handleScroll);
    return window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(
    function () {
      if (location.pathname === "/home") {
        window.scrollTo({
          behavior: "smooth",
          top: 0,
        });
      }
      if (location.hash === "#aboutUs") {
        document.getElementById("aboutUs")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      if (location.hash === "#testimonials") {
        document.getElementById("testimonials")?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    },
    [location],
  );

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 z-50 w-full bg-[var(--background)] shadow-md backdrop-blur-lg"
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2 transition">
          <Logo />
          <span className="hidden text-lg font-bold text-gray-800 md:inline">
            B-Customer
          </span>
        </Link>

        <ul className="hidden items-center space-x-2 lg:flex">
          {LINKS.map((link, idx) => (
            <li key={idx}>
              <NavLink to={link.to} className={getNavLinkClass(link.to)}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <SearchBar />

          <NavLink
            to="/login"
            className="hidden rounded-full bg-amber-500 px-6 py-2.5 font-medium text-white shadow-md transition hover:bg-amber-600 hover:shadow-lg lg:inline-block"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </NavLink>
        </div>

        <div className="block lg:hidden">
          <motion.button
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3BottomRightIcon className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 top-20 z-[-1] min-h-screen bg-black"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="absolute top-20 left-0 w-full rounded-b-lg bg-[var(--background)] shadow-lg"
            >
              <div className="flex flex-col space-y-1 p-4">
                {LINKS.map((link, idx) => (
                  <NavLink
                    key={idx}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={getNavLinkMobileClass(link.to)}
                  >
                    {link.label}
                  </NavLink>
                ))}
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 rounded-md bg-amber-500 px-4 py-3 text-center font-medium text-white hover:bg-amber-600"
                >
                  {isAuthenticated ? "Logout" : "Login"}
                </NavLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
