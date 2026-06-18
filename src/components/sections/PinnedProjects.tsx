import { siteConfig } from "@/config";
import type { GHRepo } from "@/types/github";
import { LANG_COLORS } from "@/lib/lang-colors";

interface PinnedProjectsProps {
  repos: GHRepo[];
}

function langColor(lang: string | null): string {
  if (!lang) return "#5caf78";
  return LANG_COLORS[lang] || "#5caf78";
}

export default function PinnedProjects({ repos }: PinnedProjectsProps) {
  const pinnedNames: string[] = [...siteConfig.github.pinnedRepos];
  const pinned = repos.filter((r) => pinnedNames.includes(r.name));

  if (pinned.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <div className="section-prompt">$ ls -la projects/</div>
      <table className="projects-table">
        <thead>
          <tr>
            <th scope="col" className="px-4 py-2.5 text-left text-xs text-text-muted uppercase tracking-wider border-b border-border bg-bg-header font-normal">
              name
            </th>
            <th scope="col" className="px-4 py-2.5 text-left text-xs text-text-muted uppercase tracking-wider border-b border-border bg-bg-header font-normal">
              language
            </th>
            <th scope="col" className="px-4 py-2.5 text-left text-xs text-text-muted uppercase tracking-wider border-b border-border bg-bg-header font-normal">
              stars
            </th>
            <th scope="col" className="px-4 py-2.5 text-left text-xs text-text-muted uppercase tracking-wider border-b border-border bg-bg-header font-normal">
              description
            </th>
          </tr>
        </thead>
        <tbody>
          {pinned.map((repo) => (
            <tr key={repo.id} className="group hover:bg-[#141c26]">
              <td className="px-4 py-2.5 text-sm border-b border-[#1a2332] text-text-body group-last:border-b-0">
                <a
                  href={repo.html_url}
                  className="text-accent-blue no-underline hover:underline font-mono"
                >
                  {repo.name}
                </a>
              </td>
              <td className="px-4 py-2.5 text-sm border-b border-[#1a2332] text-text-body group-last:border-b-0">
                <span
                  className="inline-block w-2 h-2 mr-1.5 align-middle"
                  style={{ background: langColor(repo.language) }}
                />
                {repo.language || "\u2014"}
              </td>
              <td className="px-4 py-2.5 text-sm border-b border-[#1a2332] text-accent-orange group-last:border-b-0">
                {repo.stargazers_count}★
              </td>
              <td className="px-4 py-2.5 text-sm border-b border-[#1a2332] text-text-dim group-last:border-b-0">
                {repo.description || ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
