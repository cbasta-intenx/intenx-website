"use client";

import { useState } from "react";
import {
  calcModernize,
  fmtDollar,
  type ModernizeForm,
  type Intent,
  type FixtureKind,
  type MechanicalHealth,
  type Platform,
  type AccessQuality,
  type EstateSize,
  type EstimatorResult,
} from "@/lib/modernizeEstimator";

// ── Sub-components ───────────────────────────────────────────────────────────

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

// ── Capability options ───────────────────────────────────────────────────────

const CAPABILITY_OPTIONS = [
  { key: "yield",       label: "Yield dashboards (FPY, Cpk, fault frequency)" },
  { key: "remote",      label: "Remote support access" },
  { key: "ota",         label: "OTA / recipe deployment" },
  { key: "diagnostics", label: "Structured fault diagnostics" },
  { key: "integration", label: "MES / ERP / API integration" },
  { key: "ai",          label: "AI-assisted diagnostics" },
];

// ── Main component ───────────────────────────────────────────────────────────

const TOTAL_STEPS = 7;

const EMPTY_FORM: ModernizeForm = {
  intent: "",
  fixtureKind: "",
  mechanical: "",
  platform: "",
  access: "",
  capabilities: new Set(),
  estate: "",
};

export default function ModernizeEstimator() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ModernizeForm>(EMPTY_FORM);
  const [result, setResult] = useState<EstimatorResult | null>(null);

  function toggleCapability(key: string) {
    setForm((f) => {
      const next = new Set(f.capabilities);
      next.has(key) ? next.delete(key) : next.add(key);
      return { ...f, capabilities: next };
    });
  }

  function canAdvance(): boolean {
    if (step === 1) return form.intent !== "";
    if (step === 2) return form.fixtureKind !== "";
    if (step === 3) return form.mechanical !== "";
    if (step === 4) return form.platform !== "";
    if (step === 5) return form.access !== "";
    if (step === 6) return true; // capabilities optional
    if (step === 7) return form.estate !== "";
    return false;
  }

  function advance() {
    if (step === 3) {
      const { intent, mechanical } = form;
      if (intent === "migrate" || intent === "standardize" || mechanical === "no") {
        setResult(calcModernize(form));
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (form.platform === "proprietary") {
        setResult(calcModernize(form));
        return;
      }
      setStep(5);
    } else if (step === 5) {
      if (form.access === "none") {
        setResult(calcModernize(form));
        return;
      }
      setStep(6);
    } else if (step === 7) {
      setResult(calcModernize(form));
    } else {
      setStep((s) => s + 1);
    }
  }

  function reset() {
    setStep(1);
    setForm(EMPTY_FORM);
    setResult(null);
  }

  // ── Result view ────────────────────────────────────────────────────────────

  if (result) {
    return (
      <div className="max-w-xl">
        <StepIndicator current={step} total={TOTAL_STEPS} />

        {result.state === "A" && result.low !== undefined && result.high !== undefined && (
          <div>
            <div className="rounded-lg p-6 mb-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <p className="text-xs uppercase tracking-widest font-medium mb-3" style={{ color: "var(--muted)" }}>
                Estimated modernization investment
              </p>
              <p className="text-3xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
                {fmtDollar(result.low)}–{fmtDollar(result.high)}
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                This covers connected fixture coverage, managed deployment, and validated scenario
                testing for your fixture. Configuration and workflow adaptation are included in the
                managed service — no new PO every time a recipe or limit changes.
              </p>
              {result.monthlyLow !== undefined && result.monthlyHigh !== undefined && (
                <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
                  <strong style={{ color: "var(--foreground)" }}>
                    Ongoing: {fmtDollar(result.monthlyLow)}–{fmtDollar(result.monthlyHigh)}/month
                  </strong>{" "}
                  after onboarding
                  <br />
                  <span className="text-xs">
                    ({result.monthlyLabel} — covers remote monitoring, support access, and software updates)
                  </span>
                </p>
              )}
              {result.aiWithoutYield && (
                <p className="text-xs p-3 rounded mb-4" style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>
                  We recommend adding yield dashboards first — AI diagnostics works best with a
                  telemetry baseline already in place.
                </p>
              )}
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                This is a rough-order-of-magnitude range. Actual scope confirmed during a short
                scoping call — no cost, no obligation.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="/contact?inquiry=modernize" className="btn-primary">
                Get a firm quote
              </a>
              <button
                type="button"
                onClick={reset}
                className="text-sm"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}
              >
                Start over
              </button>
            </div>
          </div>
        )}

        {result.state === "B" && (
          <div>
            <div className="rounded-lg p-6 mb-6" style={{ background: "var(--surface)", border: "1px solid var(--accent)" }}>
              <p className="font-semibold mb-3" style={{ color: "var(--foreground)" }}>
                This project needs a short scoping conversation before we can give you a number.
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                We&apos;ll assess your fixture&apos;s platform, integration constraints, and modernization
                options. What you invest in scoping applies as a credit toward your project
                if you move forward within 60 days.
              </p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Scoping investment: $1,500–$7,500 depending on fixture count and whether
                on-site access is needed.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="/contact?inquiry=modernize" className="btn-primary">
                Start with a scoping conversation
              </a>
              <button
                type="button"
                onClick={reset}
                className="text-sm"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}
              >
                Start over
              </button>
            </div>
          </div>
        )}

        {result.state === "C" && (
          <div>
            <div className="rounded-lg p-6 mb-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <p className="font-semibold mb-3" style={{ color: "var(--foreground)" }}>
                Based on what you&apos;ve described, this fixture may be a stronger replacement
                candidate than a retrofit.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                Modernizing a fixture near end of mechanical life often costs more than a new
                build — and a new fixture ships connected and managed from day one.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="/fixtureops" className="btn-primary">
                See what a new fixture would cost
              </a>
              <a
                href="/contact?inquiry=modernize"
                className="text-sm"
                style={{ color: "var(--muted)" }}
              >
                Talk to us about your situation anyway
              </a>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={reset}
                className="text-sm"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Question steps ─────────────────────────────────────────────────────────

  return (
    <div className="max-w-xl">
      <StepIndicator current={step} total={TOTAL_STEPS} />

      {/* Step 1 — Intent */}
      {step === 1 && (
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>
            Step 1 of 7
          </p>
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--foreground)" }}>
            What do you want to improve?
          </h2>
          <div className="flex flex-col gap-2">
            {([
              { key: "visibility",    label: "Visibility — get yield data, alerts, and dashboards" },
              { key: "supportability", label: "Supportability — remote support, faster diagnosis, controlled updates" },
              { key: "migrate",       label: "Migrate the control layer — replace aging PC/HMI/PLC orchestration" },
              { key: "standardize",   label: "Standardize multiple fixtures — bring a mixed fleet onto one platform" },
            ] as { key: Intent; label: string }[]).map(({ key, label }) => (
              <OptionButton
                key={key}
                selected={form.intent === key}
                onClick={() => setForm((f) => ({ ...f, intent: key }))}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Fixture kind */}
      {step === 2 && (
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>
            Step 2 of 7
          </p>
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--foreground)" }}>
            What kind of fixture or station?
          </h2>
          <div className="flex flex-col gap-2">
            {([
              { key: "simple",   label: "Simple bench fixture / programming jig / bed-of-nails" },
              { key: "standard", label: "Standard production clamshell or pneumatic fixture" },
              { key: "rack",     label: "Rack-based or multi-station FCT cell" },
              { key: "complex",  label: "Complex: RF, HIL, environmental, or high-channel system" },
              { key: "notsure",  label: "Not sure" },
            ] as { key: FixtureKind; label: string }[]).map(({ key, label }) => (
              <OptionButton
                key={key}
                selected={form.fixtureKind === key}
                onClick={() => setForm((f) => ({ ...f, fixtureKind: key }))}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 — Mechanical health */}
      {step === 3 && (
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>
            Step 3 of 7
          </p>
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--foreground)" }}>
            Is the fixture mechanically sound?
          </h2>
          <div className="flex flex-col gap-2">
            {([
              { key: "solid",  label: "Yes, it\u2019s solid — just needs connectivity" },
              { key: "mostly", label: "Mostly — some wear but still production-viable" },
              { key: "no",     label: "No / not sure" },
            ] as { key: MechanicalHealth; label: string }[]).map(({ key, label }) => (
              <OptionButton
                key={key}
                selected={form.mechanical === key}
                onClick={() => setForm((f) => ({ ...f, mechanical: key }))}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 — Platform */}
      {step === 4 && (
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>
            Step 4 of 7
          </p>
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--foreground)" }}>
            What platform runs it today?
          </h2>
          <div className="flex flex-col gap-2">
            {([
              { key: "manual",      label: "No controller — mostly manual or simple relay logic" },
              { key: "plc",         label: "PLC + HMI with accessible comms" },
              { key: "pc",          label: "PC application with source code available" },
              { key: "labview",     label: "LabVIEW / TestStand (supported versions)" },
              { key: "legacy",      label: "Legacy NI / old OS / outdated runtime" },
              { key: "proprietary", label: "Proprietary / vendor-locked" },
            ] as { key: Platform; label: string }[]).map(({ key, label }) => (
              <OptionButton
                key={key}
                selected={form.platform === key}
                onClick={() => setForm((f) => ({ ...f, platform: key }))}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 5 — Access quality */}
      {step === 5 && (
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>
            Step 5 of 7
          </p>
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--foreground)" }}>
            What access do you have to the fixture?
          </h2>
          <div className="flex flex-col gap-2">
            {([
              { key: "full",    label: "Full — source code, documentation, and network access available" },
              { key: "partial", label: "Partial — some gaps in source, docs, or network access" },
              { key: "none",    label: "None / restricted — no source, no docs, or no network access" },
            ] as { key: AccessQuality; label: string }[]).map(({ key, label }) => (
              <OptionButton
                key={key}
                selected={form.access === key}
                onClick={() => setForm((f) => ({ ...f, access: key }))}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 6 — Capabilities */}
      {step === 6 && (
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>
            Step 6 of 7
          </p>
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
            What capabilities do you want to add?
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
            Select all that apply. Skip if none.
          </p>
          <div className="flex flex-col gap-2">
            {CAPABILITY_OPTIONS.map(({ key, label }) => (
              <OptionButton
                key={key}
                selected={form.capabilities.has(key)}
                onClick={() => toggleCapability(key)}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 7 — Estate */}
      {step === 7 && (
        <div>
          <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted)" }}>
            Step 7 of 7
          </p>
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--foreground)" }}>
            How many fixtures are in scope?
          </h2>
          <div className="flex flex-col gap-2">
            {([
              { key: "one",   label: "1 fixture" },
              { key: "small", label: "2–5 similar fixtures" },
              { key: "large", label: "6 or more fixtures" },
            ] as { key: EstateSize; label: string }[]).map(({ key, label }) => (
              <OptionButton
                key={key}
                selected={form.estate === key}
                onClick={() => setForm((f) => ({ ...f, estate: key }))}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
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
          {step === 7 ? "See estimate →" : "Continue →"}
        </button>
      </div>
    </div>
  );
}
