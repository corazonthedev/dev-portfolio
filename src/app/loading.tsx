export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1rem",
        gap: "8px",
      }}
    >
      <span style={{ fontSize: "11px", color: "#5caf78", fontFamily: "'JetBrains Mono', monospace" }}>
        loading
      </span>
      <span
        style={{
          display: "inline-block",
          width: "8px",
          height: "14px",
          background: "#5caf78",
          animation: "blink 1s step-end infinite",
        }}
      />
    </div>
  );
}
