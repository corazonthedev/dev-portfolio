import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/config", () => ({
  siteConfig: {
    github: { username: "testuser", pinnedRepos: [] },
    personal: { name: "Test", title: "Dev", bio: "", location: "", email: "" },
    social: { github: "", linkedin: "", twitter: "" },
    signature: "test",
    since: 2024,
  },
}));

function mockResponse(data: unknown, ok = true, status = 200) {
  return {
    ok,
    status,
    statusText: ok ? "OK" : "Not Found",
    json: () => Promise.resolve(data),
  } as Response;
}

describe("GitHub API client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.GITHUB_TOKEN;
  });

  describe("fetchUserRepos", () => {
    it("should fetch and return user repos from GitHub API", async () => {
      vi.resetModules();
      const fetchMock = vi.fn();
      globalThis.fetch = fetchMock;
      const { fetchUserRepos } = await import("@/lib/github");
      const mockRepos = [
        { id: 1, name: "repo1", description: "Test repo" },
        { id: 2, name: "repo2", description: null },
      ];
      fetchMock.mockResolvedValueOnce(mockResponse(mockRepos));

      const repos = await fetchUserRepos("testuser");

      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.github.com/users/testuser/repos?per_page=100&sort=updated&type=public",
        expect.objectContaining({
          headers: expect.objectContaining({
            Accept: "application/vnd.github.v3+json",
          }),
        })
      );
      expect(repos).toEqual(mockRepos);
    });

    it("should throw on non-ok response", async () => {
      vi.resetModules();
      const fetchMock = vi.fn();
      globalThis.fetch = fetchMock;
      const { fetchUserRepos } = await import("@/lib/github");
      fetchMock.mockResolvedValueOnce(mockResponse(null, false, 403));

      await expect(fetchUserRepos("testuser")).rejects.toThrow("GitHub API error: 403");
    });
  });

  describe("fetchRepoLanguages", () => {
    it("should fetch language breakdown for a repo", async () => {
      vi.resetModules();
      const fetchMock = vi.fn();
      globalThis.fetch = fetchMock;
      const { fetchRepoLanguages } = await import("@/lib/github");
      const mockLangs = { TypeScript: 5000, JavaScript: 3000 };
      fetchMock.mockResolvedValueOnce(mockResponse(mockLangs));

      const langs = await fetchRepoLanguages("testuser", "repo1");

      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.github.com/repos/testuser/repo1/languages",
        expect.any(Object)
      );
      expect(langs).toEqual(mockLangs);
    });
  });

  describe("fetchContributions", () => {
    it("should return empty array when no token is set", async () => {
      vi.resetModules();
      const fetchMock = vi.fn();
      globalThis.fetch = fetchMock;
      const { fetchContributions } = await import("@/lib/github");
      const result = await fetchContributions("testuser");

      expect(result).toEqual([]);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("should parse GraphQL response into contribution weeks", async () => {
      vi.resetModules();
      const fetchMock = vi.fn();
      globalThis.fetch = fetchMock;
      process.env.GITHUB_TOKEN="test...";      const { fetchContributions } = await import("@/lib/github");

      const graphqlResponse = {
        data: {
          user: {
            contributionsCollection: {
              contributionCalendar: {
                weeks: [
                  {
                    contributionDays: [
                      { date: "2024-01-01", contributionCount: 3, color: "#216e39" },
                      { date: "2024-01-02", contributionCount: 0, color: "#ebedf0" },
                    ],
                  },
                ],
              },
            },
          },
        },
      };
      fetchMock.mockResolvedValueOnce(mockResponse(graphqlResponse));

      const result = await fetchContributions("testuser");

      expect(result).toHaveLength(1);
      expect(result[0].days).toHaveLength(2);
      expect(result[0].days[0]).toEqual({
        date: "2024-01-01",
        count: 3,
        level: "#216e39",
      });
    });

    it("should throw on GraphQL errors", async () => {
      vi.resetModules();
      const fetchMock = vi.fn();
      globalThis.fetch = fetchMock;
      process.env.GITHUB_TOKEN="test...";      const { fetchContributions } = await import("@/lib/github");

      const errorResponse = { errors: [{ message: "Not found" }] };
      fetchMock.mockResolvedValueOnce(mockResponse(errorResponse));

      await expect(fetchContributions("testuser")).rejects.toThrow(
        "GitHub GraphQL errors: Not found"
      );
    });

    it("should throw on non-ok HTTP response", async () => {
      vi.resetModules();
      const fetchMock = vi.fn();
      globalThis.fetch = fetchMock;
      process.env.GITHUB_TOKEN="test...";      const { fetchContributions } = await import("@/lib/github");

      fetchMock.mockResolvedValueOnce(mockResponse(null, false, 401));

      await expect(fetchContributions("testuser")).rejects.toThrow(
        "GitHub GraphQL error: 401"
      );
    });
  });
});
