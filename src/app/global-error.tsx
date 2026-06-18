"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "4rem 1rem",
            background: "#0a0e14",
            color: "#b3c4d4",
            fontFamily: "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace",
            fontSize: "13px",
          }}
        >
          <span style={{ fontSize: "11px", color: "#5caf78", textTransform: "uppercase", letterSpacing: ".08em" }}>
            $ fatal
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
            <div style={{ fontSize: "13px", color: "#d19a66", marginBottom: "8px" }}>
              ⚠ critical error
            </div>
            <p style={{ fontSize: "13px", color: "#7a8a9a" }}>
              bir şeyler ters gitti
            </p>
            <button
              onClick={() => reset()}
              style={{
                display: "inline-block",
                marginTop: "12px",
                fontSize: "12px",
                color: "#61afef",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
                fontFamily: "inherit",
              }}
            >
              $ try again ↗
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
