import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-7xl font-bold text-primary-500">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl">Page Not Found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-glow"
      >
        Back to Home
      </Link>
    </div>
  );
}
