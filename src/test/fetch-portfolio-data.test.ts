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

describe("getPortfolioData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.GITHUB_TOKEN;
  });

  it("should aggregate languages across all repos", async () => {
    vi.resetModules();
    const fetchMock = vi.fn();
    globalThis.fetch = fetchMock;

    // Mock repos response
    fetchMock.mockResolvedValueOnce(
      mockResponse([
        { id: 1, name: "repo-a", language: "TypeScript", stargazers_count: 5, fork: false, topics: [] },
        { id: 2, name: "repo-b", language: "Python", stargazers_count: 3, fork: false, topics: [] },
      ])
    );

    // Mock languages for repo-a
    fetchMock.mockResolvedValueOnce(
      mockResponse({ TypeScript: 10000, JavaScript: 5000 })
    );

    // Mock languages for repo-b
    fetchMock.mockResolvedValueOnce(
      mockResponse({ Python: 8000, HTML: 2000 })
    );

    const { getPortfolioData } = await import("@/lib/fetch-portfolio-data");
    const result = await getPortfolioData();

    expect(result.repos).toHaveLength(2);
    expect(result.totalLanguages).toEqual({
      TypeScript: 10000,
      JavaScript: 5000,
      Python: 8000,
      HTML: 2000,
    });
    expect(result.contributions).toEqual([]);
  });

  it("should handle when language fetch fails for a repo", async () => {
    vi.resetModules();
    const fetchMock = vi.fn();
    globalThis.fetch = fetchMock;

    fetchMock.mockResolvedValueOnce(
      mockResponse([
        { id: 1, name: "good-repo", language: "Go", stargazers_count: 1, fork: false, topics: [] },
        { id: 2, name: "bad-repo", language: "Rust", stargazers_count: 2, fork: false, topics: [] },
      ])
    );

    // good-repo succeeds
    fetchMock.mockResolvedValueOnce(mockResponse({ Go: 5000 }));

    // bad-repo fails (403)
    fetchMock.mockResolvedValueOnce(mockResponse(null, false, 403));

    const { getPortfolioData } = await import("@/lib/fetch-portfolio-data");
    const result = await getPortfolioData();

    expect(result.totalLanguages).toEqual({ Go: 5000 });
    // bad-repo's languages are silently skipped
  });

  it("should handle empty repo list", async () => {
    vi.resetModules();
    const fetchMock = vi.fn();
    globalThis.fetch = fetchMock;

    fetchMock.mockResolvedValueOnce(mockResponse([]));

    const { getPortfolioData } = await import("@/lib/fetch-portfolio-data");
    const result = await getPortfolioData();

    expect(result.repos).toEqual([]);
    expect(result.totalLanguages).toEqual({});
    expect(result.contributions).toEqual([]);
  });
});
