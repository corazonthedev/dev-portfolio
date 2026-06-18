import "server-only";

import { siteConfig } from "@/config";
import { fetchUserRepos, fetchRepoLanguages, fetchContributions } from "@/lib/github";
import type { GHRepo, PortfolioData } from "@/types/github";

/** Aggregate language stats across all repos */
async function aggregateLanguages(repos: GHRepo[]): Promise<Record<string, number>> {
  const totalLanguages: Record<string, number> = {};

  const languageResults = await Promise.allSettled(
    repos.map((repo) => fetchRepoLanguages(siteConfig.github.username, repo.name))
  );

  for (const result of languageResults) {
    if (result.status === "fulfilled") {
      for (const [lang, bytes] of Object.entries(result.value)) {
        totalLanguages[lang] = (totalLanguages[lang] ?? 0) + bytes;
      }
    }
  }

  return totalLanguages;
}

/**
 * Fetch all portfolio data from GitHub at build time.
 * Uses static generation; runs server-side only.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const repos = await fetchUserRepos();
  const [totalLanguages, contributions] = await Promise.all([
    aggregateLanguages(repos),
    fetchContributions(),
  ]);

  return {
    repos,
    totalLanguages,
    contributions,
  };
}
