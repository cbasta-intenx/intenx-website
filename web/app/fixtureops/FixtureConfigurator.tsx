"use client";

import { useState, FormEvent } from "react";
import { sendFixtureEmail } from "../actions/sendEmail";

// ── Types ──────────────────────────────────────────────────────────────────

type FixtureType =
  | "fct"
  | "ict"
  | "programming"
  | "assembly"
  | "multiup"
  | "notsure"
  | "";

type ScopeConfidence = "ready" | "prototype" | "concept" | "";
type Volume = "<1k" | "1k-10k" | "10k-50k" | "50k+" | "";
type Timeline = "asap" | "1-3mo" | "3-6mo" | "flexible" | "";

interface FormState {
  fixtureType: FixtureType;
  description: string;
  complexity: Set<string>;
  volume: Volume;
  scope: ScopeConfidence;
  timeline: Timeline;
  name: string;
  company: string;
  email: string;
  marketingOptIn: boolean;
}

// ── Pricing logic ───────────────────────────────────────────────────────────

const BASE_RANGES: Record<string, [number, number][]> = {
  // [simple, medium, complex]
  programming:  [[1500, 4000],  [4000, 8000],   [8000, 15000]],
  fct:          [[2000, 6000],  [6000, 12000],  [12000, 20000]],
  assembly:     [[6000, 12000], [12000, 20000], [20000, 35000]],
  ict:          [[10000, 20000],[20000, 35000], [35000, 65000]],
  multiup:      [[10000, 20000],[20000, 35000], [35000, 65000]], // same base as ICT, +60% applied
};

const COMPLEXITY_SIGNALS = [
  { key: "rf",         label: "RF / High-frequency",           modifier: 0.25 },
  { key: "hv",         label: "High voltage / Safety-critical", modifier: 0.40 },
  { key: "panel",      label: "Multi-board panel",              modifier: 0.60 },
  { key: "tolerances", label: "Tight tolerances",               modifier: 0.15 },
  { key: "regulatory", label: "Regulatory compliance required", modifier: 0.30 },
];

function getComplexityTier(signals: Set<string>): 0 | 1 | 2 {
  const count = signals.size;
  if (count === 0) return 0;
  if (count <= 2) return 1;
  return 2;
}

function calcRange(form: FormState): { low: number; high: number; talkInstead: boolean; conceptNote: boolean } {
  const { fixtureType, complexity, scope } = form;

  // "Let's talk" triggers
  const allThree = complexity.has("rf") && complexity.has("hv") && complexity.has("regulatory");
  if (fixtureType === "notsure" || allThree) return { low: 0, high: 0, talkInstead: true, conceptNote: false };

  const baseKey = fixtureType || "fct";
  const tier = getComplexityTier(complexity);
  const baseRow = BASE_RANGES[baseKey] ?? BASE_RANGES.fct;
  let [low, high] = baseRow[tier] ?? baseRow[0];

  // Apply per-signal modifiers
  for (const sig of COMPLEXITY_SIGNALS) {
    if (complexity.has(sig.key)) {
      low = Math.round(low * (1 + sig.modifier));
      high = Math.round(high * (1 + sig.modifier));
    }
  }

  // Multi-up panel adds 60% on top of base
  if (fixtureType === "multiup") {
    low = Math.round(low * 1.6);
    high = Math.round(high * 1.6);
  }

  // Concept scope: widen ±35%
  const conceptNote = scope === "concept";
  if (conceptNote) {
    low = Math.round(low * 0.65);
    high = Math.round(high * 1.35);
  }

  // Over $50K → let's talk
  if (high > 50000) return { low, high, talkInstead: true, conceptNote };

  return { low, high, talkInstead: false, conceptNote };
}

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}

// ── Step components ─────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1 rounded-full flex-1 transition-colors"
          style={{ background: i < current ? "var(--accent)" : "var(--border)" }}
        />
      ))}
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-4 py-3 text-sm text-left transition-colors"
      style={{
        background: selected ? "var(--accent)" : "var(--surface)",
        border: `1px solid ${selected ? "var(--accent)" : "var(--border)"}`,
        color: selected ? "#fff" : "var(--muted)",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

const TOTAL_STEPS = 7;

export default function FixtureConfigurator() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    fixtureType: "",
    description: "",
    complexity: new Set(),
    volume: "",
    scope: "",
    timeline: "",
    name: "",
    company: "",
    email: "",
    marketingOptIn: false,
  });
  const [result, setResult] = useState<ReturnType<typeof calcRange> | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  function toggleComplexity(key: string) {
    setForm((f) => {
      const next = new Set(f.complexity);
      next.has(key) ? next.delete(key) : next.add(key);
      return { ...f, complexity: next };
    });
  }

  function canAdvance(): boolean {
    if (step === 1) return form.fixtureType !== "";
    if (step === 3) return true; // optional checkboxes
    if (step === 4) return form.volume !== "";
    if (step === 5) return form.scope !== "";
    if (step === 6) return form.timeline !== "";
    return true;
  }

  function advance() {
    if (step === 6) {
      setResult(calcRange(form));
      setStep(7);
    } else {
      setStep((s) => s + 1);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitStatus("submitting");

    const r = result ?? calcRange(form);
    const res = await sendFixtureEmail({
      name: form.name,
      company: form.company,
      email: form.email,
      fixtureType: form.fixtureType,
      description: form.description,
      complexity: Array.from(form.complexity).join(", ") || "none",
      volume: form.volume,
      scope: form.scope,
      timeline: form.timeline,
      estimate: r.talkInstead
        ? "Let's talk (complex / high-value program)"
        : `${fmt(r.low)} – ${fmt(r.high)}`,
      marketingOptIn: form.marketingOptIn,
    });

    setSubmitStatus(res.ok ? "sent" : "error");
  }

  // ── Render ────────────────────────────────────────────────────────────────

  if (submitStatus === "sent") {
    return (
      <div className="rounded-lg p-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <p className="font-semibold text-lg mb-2" style={{ color: "var(--foreground)" }}>Request received.</p>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          We&apos;ll follow up within 1 business day to confirm your estimate and next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <StepIndicator current={step} total={TOTAL_STEPS} />

      {/* Step 1 — Fixture type */}
      {step === 1 && (
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>Step 1 of 6</p>
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--foreground)" }}>What type of fixture do you need?</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { key: "fct",         label: "Functional test (FCT)" },
              { key: "ict",         label: "Bed of nails (ICT)" },
              { key: "programming", label: "Programming jig" },
              { key: "assembly",    label: "Assembly tester" },
              { key: "multiup",     label: "Multi-up panel" },
              { key: "notsure",     label: "Not sure" },
            ].map(({ key, label }) => (
              <OptionButton
                key={key}
                selected={form.fixtureType === key}
                onClick={() => setForm((f) => ({ ...f, fixtureType: key as FixtureType }))}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Description */}
      {step === 2 && (
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>Step 2 of 6</p>
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>What does it test?</h2>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            Brief description — board type, key interfaces, what pass/fail looks like.
          </p>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="e.g. IoT sensor board with BLE 5.0, 3 analog inputs, UART — test power rails, comms, and analog accuracy"
            className="w-full rounded px-3 py-2 text-sm resize-none outline-none"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>
      )}

      {/* Step 3 — Complexity signals */}
      {step === 3 && (
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>Step 3 of 6</p>
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>Any complexity factors?</h2>
          <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Select all that apply. Skip if none.</p>
          <div className="flex flex-col gap-2">
            {COMPLEXITY_SIGNALS.map(({ key, label }) => (
              <OptionButton
                key={key}
                selected={form.complexity.has(key)}
                onClick={() => toggleComplexity(key)}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 — Volume */}
      {step === 4 && (
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>Step 4 of 6</p>
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--foreground)" }}>How many units per year?</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {(["<1k", "1k-10k", "10k-50k", "50k+"] as Volume[]).map((v) => (
              <OptionButton
                key={v}
                selected={form.volume === v}
                onClick={() => setForm((f) => ({ ...f, volume: v }))}
              >
                {v === "<1k" ? "Under 1,000" : v === "1k-10k" ? "1,000 – 10,000" : v === "10k-50k" ? "10,000 – 50,000" : "50,000+"}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 5 — Scope confidence */}
      {step === 5 && (
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>Step 5 of 6</p>
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--foreground)" }}>How defined is your scope?</h2>
          <div className="flex flex-col gap-2">
            {[
              { key: "ready",     label: "Schematic + BOM ready" },
              { key: "prototype", label: "Working prototype" },
              { key: "concept",   label: "Early concept" },
            ].map(({ key, label }) => (
              <OptionButton
                key={key}
                selected={form.scope === key}
                onClick={() => setForm((f) => ({ ...f, scope: key as ScopeConfidence }))}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 6 — Timeline */}
      {step === 6 && (
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>Step 6 of 6</p>
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--foreground)" }}>When do you need this?</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { key: "asap",     label: "ASAP" },
              { key: "1-3mo",    label: "1 – 3 months" },
              { key: "3-6mo",    label: "3 – 6 months" },
              { key: "flexible", label: "Flexible" },
            ].map(({ key, label }) => (
              <OptionButton
                key={key}
                selected={form.timeline === key}
                onClick={() => setForm((f) => ({ ...f, timeline: key as Timeline }))}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 7 — Result + contact */}
      {step === 7 && result && (
        <div>
          {result.talkInstead ? (
            <div className="mb-8 rounded-lg p-6" style={{ background: "var(--surface)", border: "1px solid var(--accent)" }}>
              <p className="font-semibold text-lg mb-2" style={{ color: "var(--foreground)" }}>
                Let&apos;s talk through this one.
              </p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Your program has characteristics that warrant a direct conversation before we put a
                number on it. Fill in your contact info and we&apos;ll reach out within 1 business day.
              </p>
            </div>
          ) : (
            <div className="mb-8 rounded-lg p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>
                Fixture estimate
              </p>
              <p className="text-3xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
                {fmt(result.low)} – {fmt(result.high)}
              </p>
              {result.conceptNote && (
                <p className="text-xs mt-2" style={{ color: "var(--muted)" }}>
                  Range is wider due to early-concept scope — tightens once schematic/BOM is available.
                </p>
              )}
              <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
                Estimate excludes specialty test equipment (precision references, high-speed
                oscilloscopes, RF analyzers). If required, quoted separately. Final price confirmed
                after scope review.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="rounded px-3 py-2 text-sm outline-none"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  className="rounded px-3 py-2 text-sm outline-none"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="rounded px-3 py-2 text-sm outline-none"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }}
              />
            </div>

            <div className="flex gap-3 items-start">
              <input
                id="fixture_marketing_opt_in"
                type="checkbox"
                checked={form.marketingOptIn}
                onChange={(e) => setForm((f) => ({ ...f, marketingOptIn: e.target.checked }))}
                className="mt-0.5 shrink-0"
              />
              <label htmlFor="fixture_marketing_opt_in" className="text-xs" style={{ color: "var(--muted)" }}>
                I agree to receive occasional product updates and news from INTenX. Unsubscribe at any time.{" "}
                <a href="/privacy" style={{ color: "var(--accent)" }}>Privacy policy</a>.
              </label>
            </div>

            {submitStatus === "error" && (
              <p className="text-sm" style={{ color: "#f87171" }}>
                Something went wrong. Email us at{" "}
                <a href="mailto:info@intenx.io" style={{ color: "var(--accent)" }}>info@intenx.io</a>.
              </p>
            )}

            <button
              type="submit"
              disabled={submitStatus === "submitting"}
              className="btn-primary self-start"
              style={{ opacity: submitStatus === "submitting" ? 0.6 : 1 }}
            >
              {submitStatus === "submitting" ? "Sending…" : "Send my estimate request"}
            </button>
          </form>
        </div>
      )}

      {/* Navigation */}
      {step < 7 && (
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="text-sm transition-colors hover:text-white"
              style={{ color: "var(--muted)", background: "none", border: "none", cursor: "pointer" }}
            >
              ← Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={advance}
            disabled={!canAdvance()}
            className="btn-primary"
            style={{ opacity: canAdvance() ? 1 : 0.4, cursor: canAdvance() ? "pointer" : "not-allowed" }}
          >
            {step === 6 ? "See estimate →" : "Continue →"}
          </button>
        </div>
      )}
    </div>
  );
}
