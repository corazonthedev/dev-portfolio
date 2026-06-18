import { siteConfig } from "@/config";
import type { GHRepo, GHLanguageBreakdown, GHContributionWeek } from "@/types/github";

const GITHUB_API = "https://api.github.com";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";

/** Get auth headers, using token if available */
function authHeaders(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

/** Generic fetch wrapper for GitHub REST API */
async function githubFetch<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "dev-portfolio",
      ...authHeaders(),
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText} for ${url}`);
  }

  return response.json() as Promise<T>;
}

/** Fetch all public repos for a user, sorted by last updated */
export async function fetchUserRepos(username: string = siteConfig.github.username): Promise<GHRepo[]> {
  return githubFetch<GHRepo[]>(
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated&type=public`
  );
}

/** Fetch language breakdown for a single repo */
export async function fetchRepoLanguages(
  username: string,
  repo: string
): Promise<GHLanguageBreakdown> {
  return githubFetch<GHLanguageBreakdown>(
    `${GITHUB_API}/repos/${username}/${repo}/languages`
  );
}

/** Fetch contribution calendar via GraphQL */
export async function fetchContributions(
  username: string = siteConfig.github.username
): Promise<GHContributionWeek[]> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("[github] No GITHUB_TOKEN set — returning empty contributions");
    return [];
  }

  const response = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "dev-portfolio",
    },
    body: JSON.stringify({ query, variables: { username } }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(
      `GitHub GraphQL errors: ${json.errors.map((e: { message: string }) => e.message).join(", ")}`
    );
  }

  interface RawContributionDay {
    date: string;
    contributionCount: number;
    color: string;
  }

  interface RawContributionWeek {
    contributionDays: RawContributionDay[];
  }

  const rawWeeks: RawContributionWeek[] =
    json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  // Normalise GraphQL field names to our interface
  return rawWeeks.map((week) => ({
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: day.color,
    })),
  }));
}
