import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] py-16">
      <h1 className="text-5xl font-bold text-blue-700 dark:text-blue-300 mb-4">INTenX</h1>
      <h2 className="text-xl font-medium text-zinc-700 dark:text-zinc-200 mb-2">Engineering &bull; Embedded Systems &bull; Production Test</h2>
      <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-300 mb-8 text-center">
        INTenX supports hardware teams in building robust products by combining embedded development, firmware expertise, and production test systems.
      </p>
      <a href="/services" className="inline-block px-6 py-3 bg-blue-700 text-white rounded-full font-semibold shadow hover:bg-blue-800 transition">Learn more</a>
    </section>
  );
}
