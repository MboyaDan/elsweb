import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-4">That address does not match a page on this site.</p>
      <Link href="/" className="mt-8 inline-block rounded bg-electric px-5 py-3 font-medium text-white">
        Go to the homepage
      </Link>
    </section>
  );
}
