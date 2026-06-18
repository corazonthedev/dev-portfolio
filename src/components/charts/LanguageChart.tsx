"use client";

import { useEffect, useState } from "react";
import { getLangColor } from "@/lib/lang-colors";

interface LanguageChartProps {
  data: Record<string, number>;
}

export default function LanguageChart({ data }: LanguageChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const entries = Object.entries(data);
  if (entries.length === 0) {
    return (
      <p className="text-sm text-text-muted">No language data available.</p>
    );
  }

  const totalBytes = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (totalBytes === 0) {
    return (
      <p className="text-sm text-text-muted">No language data available.</p>
    );
  }

  const sorted = [...entries].sort((a, b) => b[1] - a[1]);

  return (
    <div className="lang-bar-group">
      {sorted.map(([lang, bytes]) => {
        const percentage = (bytes / totalBytes) * 100;
        const widthPercent = Math.max(percentage, 0.5);
        return (
          <div key={lang} className="lang-bar">
            <span className="lang-name">{lang}</span>
            <div className="lang-track">
              <div
                className="lang-fill"
                style={{
                  width: mounted ? `${widthPercent}%` : "0%",
                  background: getLangColor(lang),
                }}
              />
            </div>
            <span className="lang-pct">{percentage.toFixed(1)}%</span>
          </div>
        );
      })}
    </div>
  );
}
