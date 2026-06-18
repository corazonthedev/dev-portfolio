import { siteConfig } from "@/config";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2 text-xs">
          {siteConfig.social.github ? (
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue no-underline hover:underline"
            >
              github ↗
            </a>
          ) : (
            <span className="text-text-muted">github ↗</span>
          )}
          <span className="text-[#252e3a]">/</span>
          <span className="text-text-muted">email</span>
        </div>
        <span className="text-xs text-text-muted uppercase tracking-wider">
          &copy; {siteConfig.since} &middot; {siteConfig.personal.name}
        </span>
      </div>
    </footer>
  );
}
