const services = [
  {
    title: "Production Test & Fixtures",
    items: [
      "Design and development of bed-of-nails fixtures",
      "Creation of functional testers",
      "Automation scripts and diagnostic tooling",
      "Data capture and workflow design for high reliability",
    ],
  },
  {
    title: "Embedded Firmware & Electronics",
    items: [
      "Firmware for STM32, ESP32, and similar platforms",
      "Sensor and peripheral interface development",
      "Communications and diagnostic features",
      "Production test modes and hooks in firmware",
    ],
  },
  {
    title: "Gateways, LoRaWAN & Edge Systems",
    items: [
      "Gateway development and integration",
      "LoRaWAN connectivity and system design",
      "Embedded edge processing",
      "End-to-end data workflows for industrial systems",
    ],
  },
];

export default function Services() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
        INTenX Services
      </h1>
      <p className="text-base mb-12" style={{ color: "var(--muted)" }}>
        Focused, practical engineering solutions for real-world hardware teams.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-lg p-6"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <h3 className="font-semibold text-base mb-4" style={{ color: "var(--foreground)" }}>
              {service.title}
            </h3>
            <ul className="space-y-2">
              {service.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-snug" style={{ color: "var(--muted)" }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
