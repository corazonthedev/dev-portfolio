export const siteConfig = {
  github: {
    username: "corazonthedev",
    pinnedRepos: ["Google-form-parser", "WiseLib"],
  },
  personal: {
    name: "corazonthedev",
    title: "Full-Stack Developer",
    bio: "I build things. Some of them work.",
    location: "Turkey",
    email: "",
  },
  social: {
    github: "https://github.com/corazonthedev",
    linkedin: "",
    twitter: "",
  },
  signature: "corazonthedev",
  since: 2024,
} as const;

export type SiteConfig = typeof siteConfig;
