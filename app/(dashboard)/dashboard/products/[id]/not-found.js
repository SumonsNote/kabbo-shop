import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
      <p className="mb-4">Could not find the requested product.</p>
      <Link
        href="/dashboard/products"
        className="text-blue-500 hover:underline"
      >
        Return to Products
      </Link>
    </div>
  );
}
