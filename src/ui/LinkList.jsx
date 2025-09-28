import { Link } from "react-router";

export default function LinkList({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wider text-gray-200 uppercase">
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
