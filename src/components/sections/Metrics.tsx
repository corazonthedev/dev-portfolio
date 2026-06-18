interface MetricsProps {
  repos: number;
  languages: number;
  topStars: number;
  since: number;
}

export default function Metrics({ repos, languages, topStars, since }: MetricsProps) {
  const metrics = [
    { num: repos, label: "repositories", pct: 100, color: "var(--accent-green)" },
    { num: languages, label: "languages", pct: 78, color: "var(--accent-orange)" },
    { num: topStars + "\u2605", label: "top repo stars", pct: 62, color: "var(--accent-blue)" },
    { num: since, label: "since", pct: 45, color: "var(--accent-cyan)" },
  ];

  return (
    <div className="metrics-grid mb-8">
      {metrics.map((m, i) => (
        <div key={i} className="metric-card">
          <div className="metric-num">{m.num}</div>
          <div className="metric-label">{m.label}</div>
          <div className="metric-bar">
            <div
              className="metric-bar-fill"
              style={{ width: m.pct + "%", background: m.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
