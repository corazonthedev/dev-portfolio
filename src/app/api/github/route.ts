import { NextRequest, NextResponse } from "next/server";

// Static export compatibility — this route runs at build time only
export const dynamic = "force-static";

const GITHUB_API = "https://api.github.com";

/**
 * GET /api/github
 *
 * Proxies requests to the GitHub REST API using the server's GITHUB_TOKEN.
 * Query params:
 *   - path: the API path, e.g. "users/corazonthedev/repos"
 *   - Any additional query params are forwarded.
 *
 * Example: GET /api/github?path=users/corazonthedev/repos&per_page=10
 *
 * NOTE: In `output: "export"` mode this runs at build time and generates a
 * static JSON file. Query params are not available at build time, so without
 * a `path` param it returns an info message. This route exists for future
 * use when the project moves to a server-rendered deployment.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      {
        message:
          "GET /api/github — proxy endpoint for GitHub API. Pass ?path=<api-path> to use.",
        note: "This route runs at build time in static export mode.",
      },
      { status: 200 }
    );
  }

  // Security: only allow requests to the GitHub API
  const sanitisedPath = path.replace(/^\/+/, "");
  const url = `${GITHUB_API}/${sanitisedPath}`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "dev-portfolio",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Forward any extra query params
  const extraParams: string[] = [];
  searchParams.forEach((value, key) => {
    if (key !== "path") {
      extraParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });
  const fullUrl = extraParams.length > 0 ? `${url}?${extraParams.join("&")}` : url;

  try {
    const response = await fetch(fullUrl, { headers });
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("[api/github] Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from GitHub API" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/github
 *
 * Placeholder for on-demand revalidation or other future use.
 */
export async function POST() {
  return NextResponse.json(
    { message: "POST /api/github — not implemented yet" },
    { status: 501 }
  );
}
