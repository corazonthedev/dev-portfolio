export default function Header() {
  return (
    <header className="w-full">
      {/* Terminal chrome bar - fixed 28px */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-7 items-center justify-between bg-bg-header px-3 border-b border-border">
        {/* Left: three dots */}
        <div className="flex items-center gap-[6px]" aria-hidden="true">
          <span className="inline-block w-[10px] h-[10px] rounded-full" style={{ background: "#ff5f56" }} />
          <span className="inline-block w-[10px] h-[10px] rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="inline-block w-[10px] h-[10px] rounded-full" style={{ background: "#27c93f" }} />
        </div>
        {/* Center: title */}
        <span className="text-xs text-text-muted select-none">
          user@corazonthedev · terminal
        </span>
        {/* Right: window controls */}
        <span className="text-xs text-text-muted select-none leading-none">
          — □ ×
        </span>
      </div>
      {/* Status/prompt bar - below chrome */}
      <div className="mt-7 flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-primary w-full">
        <span className="text-accent-green text-sm">➜</span>
        <span className="text-text-body text-sm">~/profile</span>
        <span className="inline-block w-[8px] h-[14px] bg-accent-green animate-blink align-middle" />
      </div>
    </header>
  );
}
