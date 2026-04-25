import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen px-6 pt-36">
      <div className="mx-auto max-w-[760px] rounded-[28px] border border-[var(--line)] bg-paper p-8">
        <p className="text-sm font-medium uppercase">Not found</p>
        <h1 className="mt-6 text-5xl font-semibold">This page is not in the portfolio.</h1>
        <p className="mt-6 text-lg leading-8 text-foreground/68">
          The content may still be a draft, or the route may have changed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
