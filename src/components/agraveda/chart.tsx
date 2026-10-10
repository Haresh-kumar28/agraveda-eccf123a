import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ClientOnly } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useOperations } from "@/features/operations";
export function ForecastChart({ compact = false }: { compact?: boolean }) {
  const { forecast, current } = useOperations();
  const [mode, setMode] = useState<"occupancy" | "arrivals">("occupancy");
  const data = [
    { label: "Now", occupancy: current.currentOccupancy, arrivals: current.arrivals },
    ...forecast.forecasts.map((p) => ({
      label: `+${p.hoursAhead}h`,
      occupancy: p.predictedOccupancy,
      arrivals: p.predictedArrivals,
    })),
  ];
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium">
            {mode === "occupancy" ? "Projected occupancy" : "Forecast arrivals"}
          </h3>
          <p className="small-note">Next 6 hours · synthetic data</p>
        </div>
        {!compact && (
          <div className="flex gap-1">
            <Button
              variant={mode === "occupancy" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setMode("occupancy")}
            >
              Occupancy
            </Button>
            <Button
              variant={mode === "arrivals" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setMode("arrivals")}
            >
              Arrivals
            </Button>
          </div>
        )}
      </div>
      <div className="chart-wrap">
        <ClientOnly
          fallback={
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Loading forecast…
            </div>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 15, right: 10, left: -22, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--smoke)" strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--graphite)", fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--graphite)", fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--background)",
                  border: "1px solid var(--smoke)",
                  borderRadius: 4,
                  fontSize: 12,
                }}
                formatter={(value: number) => [
                  value,
                  mode === "occupancy" ? "Occupied beds" : "Arrivals / hour",
                ]}
              />
              <Area
                type="monotone"
                dataKey={mode}
                stroke="var(--chart-blue)"
                fill="var(--blue-wash)"
                strokeWidth={2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ClientOnly>
      </div>
      <div className="chart-legend">
        <span>
          <i className="legend-dot" />
          Model projection
        </span>
        <span>Confidence: {forecast.forecasts.at(-1)?.confidence ?? "unavailable"}</span>
      </div>
    </>
  );
}
