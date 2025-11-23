export default function Services() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">INTenX Services</h1>
      <h2 className="text-lg text-zinc-700 mb-6">Focused, practical engineering solutions for real-world hardware teams.</h2>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded shadow">
          <h3 className="font-semibold text-xl mb-2">Production Test & Fixtures</h3>
          <ul className="list-disc ml-5 text-zinc-700 dark:text-zinc-300">
            <li>Design and development of bed-of-nails fixtures</li>
            <li>Creation of functional testers</li>
            <li>Automation scripts and diagnostic tooling</li>
            <li>Data capture and workflow design for high reliability</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded shadow">
          <h3 className="font-semibold text-xl mb-2">Embedded Firmware & Electronics</h3>
          <ul className="list-disc ml-5 text-zinc-700 dark:text-zinc-300">
            <li>Firmware for STM32, ESP32, and similar platforms</li>
            <li>Sensor and peripheral interface development</li>
            <li>Communications and diagnostic features</li>
            <li>Production test modes and hooks in firmware</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded shadow">
          <h3 className="font-semibold text-xl mb-2">Gateways, LoRaWAN & Edge Systems</h3>
          <ul className="list-disc ml-5 text-zinc-700 dark:text-zinc-300">
            <li>Gateway development and integration</li>
            <li>LoRaWAN connectivity and system design</li>
            <li>Embedded edge processing</li>
            <li>End-to-end data workflows for industrial systems</li>
          </ul>
        </div>
      </div>
    </section>
  );
}