"use client";

import { useMemo } from "react";
import type { GHContributionWeek } from "@/types/github";

interface ContributionGraphProps {
  weeks: GHContributionWeek[];
}

const CELL_SIZE = 12;
const CELL_GAP = 3;
const MONTH_LABEL_HEIGHT = 16;

const LEVEL_COLORS = [
  "#1a2332", // empty
  "#1a3a2a", // level 1
  "#2d6a4f", // level 2
  "#40916c", // level 3
  "#5caf78", // level 4
];

function getColor(count: number): string {
  if (count === 0) return LEVEL_COLORS[0];
  if (count <= 3) return LEVEL_COLORS[1];
  if (count <= 7) return LEVEL_COLORS[2];
  if (count <= 15) return LEVEL_COLORS[3];
  return LEVEL_COLORS[4];
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function getMonthLabels(
  weeks: GHContributionWeek[]
): { label: string; x: number }[] {
  const labels: { label: string; x: number }[] = [];
  let lastMonth = -1;

  for (let w = 0; w < weeks.length; w++) {
    const firstDay = weeks[w].days[0];
    if (!firstDay) continue;
    const date = new Date(firstDay.date);
    const month = date.getMonth();
    if (month !== lastMonth) {
      const x = w * (CELL_SIZE + CELL_GAP);
      labels.push({ label: MONTH_NAMES[month], x });
      lastMonth = month;
    }
  }

  return labels;
}

export default function ContributionGraph({ weeks }: ContributionGraphProps) {
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);

  if (weeks.length === 0) {
    return (
      <p className="text-sm text-text-muted">
        No contribution data available.
      </p>
    );
  }

  const svgWidth = weeks.length * (CELL_SIZE + CELL_GAP);
  const svgHeight = MONTH_LABEL_HEIGHT + 7 * (CELL_SIZE + CELL_GAP);

  return (
    <div className="overflow-x-auto">
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        aria-label="Contribution graph"
        className="block font-mono"
      >
        {monthLabels.map((m, i) => (
          <text
            key={i}
            x={m.x}
            y={MONTH_LABEL_HEIGHT - 4}
            fill="var(--text-muted)"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
          >
            {m.label}
          </text>
        ))}

        {weeks.map((week, wi) =>
          week.days.map((day, di) => {
            const x = wi * (CELL_SIZE + CELL_GAP);
            const y = MONTH_LABEL_HEIGHT + di * (CELL_SIZE + CELL_GAP);
            return (
              <rect
                key={`${wi}-${di}`}
                x={x}
                y={y}
                width={CELL_SIZE}
                height={CELL_SIZE}
                rx={0}
                ry={0}
                fill={getColor(day.count)}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}
