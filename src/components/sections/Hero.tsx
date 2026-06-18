import { siteConfig } from "@/config";

export default function Hero() {
  const { personal, social } = siteConfig;

  return (
    <section className="w-full mb-8">
        {/* Terminal card */}
        <div className="border border-border bg-bg-surface">
          {/* Card header */}
          <div className="flex items-center justify-between bg-bg-header px-4 py-[10px] border-b border-border">
            <span className="text-[11px] text-text-muted uppercase tracking-[.08em]">
              user@corazonthedev · profile.json
            </span>
            <span className="text-[11px] text-text-muted select-none">— □ ×</span>
          </div>
          {/* Card body */}
          <div className="p-6">
            <div className="profile-grid">
              <div className="profile-label">name</div>
              <div className="profile-value name">{personal.name}</div>

              <div className="profile-label">role</div>
              <div className="profile-value">
                {personal.title}
                <span className="tag ml-2">ML</span>
              </div>

              <div className="profile-label">location</div>
              <div className="profile-value">{personal.location}</div>

              <div className="profile-label">bio</div>
              <div className="profile-value bio">{personal.bio}</div>

              <div className="profile-label">links</div>
              <div className="profile-value flex gap-4">
                {social.github ? (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent-blue no-underline hover:underline"
                  >
                    github ↗
                  </a>
                ) : (
                  <span className="text-xs text-text-muted">github —</span>
                )}
                <span className="text-xs text-text-muted">linkedin —</span>
                <span className="text-xs text-text-muted">twitter —</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
