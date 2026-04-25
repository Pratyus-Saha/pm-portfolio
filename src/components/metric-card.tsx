import type { Metric } from "@/types/content";

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={`${metric.value}-${metric.label}`}
          className="rounded-[24px] border border-[var(--line)] bg-paper/70 p-6"
        >
          <p className="text-4xl font-semibold md:text-5xl">{metric.value}</p>
          <p className="mt-3 text-base font-medium">{metric.label}</p>
          {metric.context && <p className="mt-2 text-sm leading-6 text-foreground/65">{metric.context}</p>}
        </div>
      ))}
    </div>
  );
}
