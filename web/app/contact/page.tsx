export default function Contact() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">Contact INTenX</h1>
      <p className="text-lg text-zinc-700 mb-4">To reach out about a project or availability, please provide:</p>
      <ul className="list-disc ml-5 text-zinc-700 dark:text-zinc-300 mb-4">
        <li>A short overview of your product</li>
        <li>A description of what you need help with</li>
        <li>An approximate project timeline</li>
      </ul>
      <p className="text-zinc-700 dark:text-zinc-300">Email: <a href="mailto:info@intenx.io" className="underline">info@intenx.io</a></p>
    </section>
  );
}