/** GitHub API repository response */
export interface GHRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  topics: string[];
  updated_at: string;
}

/** Language breakdown: language name → bytes */
export type GHLanguageBreakdown = Record<string, number>;

/** A single day's contribution data */
export interface GHContributionDay {
  date: string;
  count: number;
  level: string;
}

/** A week of contribution days */
export interface GHContributionWeek {
  days: GHContributionDay[];
}

/** Complete aggregated portfolio data */
export interface PortfolioData {
  repos: GHRepo[];
  totalLanguages: Record<string, number>;
  contributions: GHContributionWeek[];
}
