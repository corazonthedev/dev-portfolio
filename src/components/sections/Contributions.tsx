import type { GHContributionWeek } from "@/types/github";
import ContributionGraph from "@/components/charts/ContributionGraph";

interface ContributionsProps {
  weeks: GHContributionWeek[];
}

export default function Contributions({ weeks }: ContributionsProps) {
  return (
    <section className="mb-8">
      <div className="section-prompt">$ cat contributions.log</div>
      <ContributionGraph weeks={weeks} />
    </section>
  );
}
