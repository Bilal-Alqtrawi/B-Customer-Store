import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import Logo from "../ui/Logo";
import { Link } from "react-router";

function LinkList({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wider text-gray-100 uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.href}
              className="relative text-gray-300 transition-colors duration-300 before:absolute before:-bottom-1 before:left-0 before:h-0.5 before:w-0 before:bg-[var(--primary)] before:transition-all before:duration-300 hover:text-white hover:before:w-full"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--textPrimary)] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-8">
          <div className="md:col-span-12 lg:col-span-5">
            <Logo />
            <p className="mt-4 max-w-md text-sm text-gray-300">
              Your premier destination for unique, high-quality products.
              Discover our curated collection designed just for you.
            </p>
            <div className="mt-6 flex space-x-3">
              <Link
                to="."
                aria-label="Facebook"
                className="rounded-full bg-gray-700/50 p-2 text-white transition-colors duration-300 hover:bg-[var(--primary)]"
              >
                <FaFacebookF />
              </Link>
              <Link
                to="."
                aria-label="Twitter"
                className="rounded-full bg-gray-700/50 p-2 text-white transition-colors duration-300 hover:bg-[var(--primary)]"
              >
                <FaTwitter />
              </Link>
              <Link
                to="."
                aria-label="Instagram"
                className="rounded-full bg-gray-700/50 p-2 text-white transition-colors duration-300 hover:bg-[var(--primary)]"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>

          <div className="col-span-full grid grid-cols-2 gap-8 md:col-span-12 lg:col-span-7 lg:grid-cols-3">
            <LinkList
              key="shop"
              title="Shop"
              links={[
                { name: "Home", href: "/" },
                { name: "All Products", href: "/products" },
                { name: "Shopping Cart", href: "/cart" },
                { name: "Login / Register", href: "/login" },
              ]}
            />
            <LinkList
              key="support"
              title="Support"
              links={[
                { name: "Contact Us", href: "/contact" },
                { name: "FAQ", href: "/faq" },
                { name: "Shipping Policy", href: "/shipping" },
                { name: "Track Order", href: "/track-order" },
              ]}
            />
            <LinkList
              key="legal"
              title="Legal"
              links={[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Refund Policy", href: "/refunds" },
              ]}
            />
          </div>
        </div>

        <div className="mt-16 border-t border-gray-700/50 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <h3 className="text-sm font-semibold text-gray-100">
                Subscribe to our newsletter
              </h3>
              <p className="mt-1 text-xs text-gray-300">
                Get the latest updates and exclusive offers.
              </p>
              <form className="mt-4 flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-l-lg border-0 bg-[#4A5568] px-4 py-2 text-white placeholder-gray-400 transition-shadow duration-300 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none focus:ring-inset"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="rounded-r-lg bg-[var(--primary)] p-2.5 text-white transition-colors hover:bg-blue-700"
                >
                  <FiSend />
                </button>
              </form>
            </div>

            <p className="text-center text-sm text-gray-300 md:text-right">
              &copy; {new Date().getFullYear()} Customer Store. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
