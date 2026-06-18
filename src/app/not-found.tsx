export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "4rem 1rem",
      }}
    >
      <span style={{ fontSize: "11px", color: "#5caf78", textTransform: "uppercase", letterSpacing: ".08em" }}>
        $ cat /dev/404
      </span>
      <div
        style={{
          background: "#10161c",
          border: "1px solid #252e3a",
          padding: "24px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#d4e6f5",
            letterSpacing: "-.03em",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: "8px",
          }}
        >
          404
        </div>
        <p style={{ fontSize: "13px", color: "#7a8a9a", fontFamily: "'JetBrains Mono', monospace" }}>
          sayfa bulunamadı
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: "12px",
            fontSize: "12px",
            color: "#61afef",
            fontFamily: "'JetBrains Mono', monospace",
            textDecoration: "none",
          }}
        >
          cd ~ &nbsp;↗
        </a>
      </div>
    </div>
  );
}
