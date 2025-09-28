import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-gray-300 via-blue-50 to-amber-200 py-24 text-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="mb-3 text-4xl font-extrabold text-[var(--textPrimary)]">
          404 - Page Not Found
        </h1>
        <p className="mb-6 font-medium text-[var(--textPrimary)]">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="rounded-md bg-amber-500 px-6 py-3 text-white shadow-lg transition hover:bg-amber-600 hover:shadow-2xl"
        >
          HomePage
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
