import { describe, it, expect } from "vitest";
import { syntheticData, getLatestRecord, generateSyntheticData } from "@/data/syntheticData";
import { inputsFromRecord, applyInputsToRecord, applyScenario } from "@/types";
import { generateForecast } from "@/engines/forecastEngine";
import { calculatePressure } from "@/engines/pressureEngine";
import { analyzeBottlenecks } from "@/engines/bottleneckEngine";
import { runWhatIfSimulation } from "@/engines/whatIfSimulator";
import { assessDataQuality, cleanData } from "@/engines/dataQualityEngine";
import { canAccess, roles } from "@/features/auth";
const record = getLatestRecord(syntheticData);
function pipeline(r = record) {
  const f = generateForecast(syntheticData, r, "normal");
  return { f, p: calculatePressure(r, f.forecasts), b: analyzeBottlenecks(r, f.forecasts) };
}
describe("Preserved AgraVeda engines", () => {
  it("has reproducible, synthetic records and original forecast horizons", () => {
    expect(generateSyntheticData()).toEqual(syntheticData);
    expect(syntheticData).toHaveLength(336);
    expect(pipeline().f.forecasts.map((f) => f.hoursAhead)).toEqual([1, 2, 3, 4, 6]);
  });
  it("recalculates forecasts when demand inputs change", () => {
    const changed = applyInputsToRecord(record, {
      ...inputsFromRecord(record),
      arrivalsPerHour: 40,
    });
    expect(pipeline(changed).f).not.toEqual(pipeline().f);
  });
  it("preserves original surge scenarios", () => {
    const inputs = applyScenario(inputsFromRecord(record), "accident_surge");
    expect(inputs.surgeMult).toBe(1.8);
    expect(inputs.waitingPatients).toBeGreaterThanOrEqual(12);
  });
  it("additional beds update a computed what-if result", () => {
    const { f, p, b } = pipeline();
    const baseline = runWhatIfSimulation(record, f.forecasts, p, b, {
      additionalBeds: 0,
      additionalNurses: 0,
      additionalDoctors: 0,
      patientSurgePercent: 0,
    });
    const result = runWhatIfSimulation(record, f.forecasts, p, b, {
      additionalBeds: 10,
      additionalNurses: 0,
      additionalDoctors: 0,
      patientSurgePercent: 0,
    });
    expect(result.simulated.occupancyPercent).toBeLessThan(baseline.simulated.occupancyPercent);
    expect(result.baseline).toEqual(baseline.baseline);
  });
  it("checks quality and handles empty data", () => {
    expect(assessDataQuality(syntheticData).canRunModel).toBe(true);
    expect(assessDataQuality([]).canRunModel).toBe(false);
    expect(cleanData([])).toEqual([]);
    expect(() => getLatestRecord([])).toThrow();
  });
  it("restricts demo navigation by role", () => {
    expect(canAccess("Doctor / Clinician", "resources")).toBe(false);
    expect(canAccess("Doctor / Clinician", "decisions")).toBe(true);
    expect(canAccess("Data Analyst", "data-quality")).toBe(true);
    expect(canAccess("Hospital Administrator", "resources")).toBe(true);
    expect(roles).toHaveLength(5);
  });
});
