// ── Types ────────────────────────────────────────────────────────────────────

export type Intent =
  | "visibility"    // Read-Only Connectivity
  | "supportability" // Supportability Retrofit
  | "migrate"       // Control-Layer → State B after step 3
  | "standardize"   // Estate Standardization → State B after step 3
  | "";

export type FixtureKind =
  | "simple"    // Simple bench / jig / bed-of-nails
  | "standard"  // Standard production clamshell
  | "rack"      // Rack-based / multi-station FCT cell
  | "complex"   // Complex: RF, HIL, environmental
  | "notsure"   // Not sure → State B
  | "";

export type MechanicalHealth =
  | "solid"   // Yes, solid
  | "mostly"  // Mostly — some wear
  | "no"      // No / not sure → State C
  | "";

export type Platform =
  | "manual"       // No controller / relay logic
  | "plc"          // PLC + HMI with accessible comms
  | "pc"           // PC app with source code
  | "labview"      // LabVIEW / TestStand (supported)
  | "legacy"       // Legacy NI / old OS / outdated runtime
  | "proprietary"  // Proprietary / vendor-locked → State B
  | "";

export type AccessQuality =
  | "full"     // Source + docs + network
  | "partial"  // Partial → widen 20%
  | "none"     // None / restricted → State B
  | "";

export type EstateSize =
  | "one"    // 1 fixture
  | "small"  // 2–5 similar
  | "large"  // 6+ → State B
  | "";

export type OutputState = "A" | "B" | "C";

export interface ModernizeForm {
  intent: Intent;
  fixtureKind: FixtureKind;
  mechanical: MechanicalHealth;
  platform: Platform;
  access: AccessQuality;
  capabilities: Set<string>;
  estate: EstateSize;
}

export interface EstimatorResult {
  state: OutputState;
  low?: number;
  high?: number;
  monthlyLow?: number;
  monthlyHigh?: number;
  monthlyLabel?: string;
  aiWithoutYield?: boolean;
}

// ── Pricing tables ───────────────────────────────────────────────────────────

const BASE_RANGES: Record<string, Record<string, [number, number]>> = {
  visibility: {
    simple:   [3000,  7000],
    standard: [6000,  14000],
    rack:     [16000, 34000],
    complex:  [25000, 60000],
  },
  supportability: {
    simple:   [6000,  14000],
    standard: [14000, 30000],
    rack:     [35000, 90000],
    complex:  [65000, 150000],
  },
};

const PLATFORM_ADDERS: Record<string, [number, number]> = {
  manual:  [0,     4000],
  plc:     [4000,  14000],
  pc:      [5000,  15000],
  labview: [7000,  18000],
  legacy:  [15000, 40000],
};

const CAPABILITY_ADDERS: Record<string, [number, number]> = {
  yield:       [3000, 8000],
  remote:      [2000, 4000],
  ota:         [3000, 8000],
  diagnostics: [2000, 6000],
  integration: [5000, 14000],
  ai:          [4000, 12000],
};

const MONTHLY_RATES = {
  visibility:     { label: "Connected monitoring", low: 200,  high: 450 },
  supportability: { label: "Connected support",    low: 500,  high: 1000 },
};

// ── Calc ─────────────────────────────────────────────────────────────────────

export function calcModernize(form: ModernizeForm): EstimatorResult {
  const { intent, fixtureKind, mechanical, platform, access, capabilities, estate } = form;

  // Migrate / standardize → always State B (too wide to quote without scoping)
  if (intent === "migrate" || intent === "standardize") return { state: "B" };

  // Mechanically unsound → State C (replacement candidate, not retrofit)
  if (mechanical === "no") return { state: "C" };

  // Not sure on fixture kind → State B (can't produce a useful ROM)
  if (fixtureKind === "notsure") return { state: "B" };

  // Proprietary platform → State B
  if (platform === "proprietary") return { state: "B" };

  // No/restricted access → State B
  if (access === "none") return { state: "B" };

  // 6+ fixtures → State B (site/program engagement)
  if (estate === "large") return { state: "B" };

  const archetype = intent === "visibility" ? "visibility" : "supportability";
  const kindKey = fixtureKind || "standard";
  const [baseLow, baseHigh] = BASE_RANGES[archetype][kindKey] ?? BASE_RANGES[archetype].standard;

  let low = baseLow;
  let high = baseHigh;

  // Platform adder
  if (platform && PLATFORM_ADDERS[platform]) {
    const [pLow, pHigh] = PLATFORM_ADDERS[platform];
    low += pLow;
    high += pHigh;
  }

  // Partial access: widen both ends 20%
  if (access === "partial") {
    low = Math.round(low * 0.8);
    high = Math.round(high * 1.2);
  }

  // Capability adders (cumulative)
  for (const cap of capabilities) {
    const adder = CAPABILITY_ADDERS[cap];
    if (adder) {
      low += adder[0];
      high += adder[1];
    }
  }

  // Estate factor: 2–5 similar fixtures
  if (estate === "small") {
    low = 6000 + Math.round(low * 0.8);
    high = 15000 + Math.round(high * 0.8);
  }

  // Hard cap: high > $75K → State B
  if (high > 75000) return { state: "B" };

  const monthly = MONTHLY_RATES[archetype];

  return {
    state: "A",
    low,
    high,
    monthlyLow: monthly.low,
    monthlyHigh: monthly.high,
    monthlyLabel: monthly.label,
    aiWithoutYield: capabilities.has("ai") && !capabilities.has("yield"),
  };
}

export function fmtDollar(n: number): string {
  return "$" + n.toLocaleString("en-US");
}
