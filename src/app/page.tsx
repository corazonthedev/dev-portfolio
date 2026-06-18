import Hero from "@/components/sections/Hero";
import Metrics from "@/components/sections/Metrics";
import PinnedProjects from "@/components/sections/PinnedProjects";
import Languages from "@/components/sections/Languages";
import Contributions from "@/components/sections/Contributions";
import { getPortfolioData } from "@/lib/fetch-portfolio-data";

export default async function Home() {
  const portfolioData = await getPortfolioData();

  const starCounts = portfolioData.repos.map((r) => r.stargazers_count);
  const topStars = starCounts.length > 0 ? Math.max(...starCounts) : 0;

  return (
    <div className="container">
      <Hero />
      <Metrics
        repos={portfolioData.repos.length}
        languages={Object.keys(portfolioData.totalLanguages).length}
        topStars={topStars}
        since={2024}
      />
      <PinnedProjects repos={portfolioData.repos} />
      <Languages data={portfolioData.totalLanguages} />
      <Contributions weeks={portfolioData.contributions} />
    </div>
  );
}
