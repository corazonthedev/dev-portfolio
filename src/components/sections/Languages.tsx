import LanguageChart from "@/components/charts/LanguageChart";

interface LanguagesProps {
  data: Record<string, number>;
}

export default function Languages({ data }: LanguagesProps) {
  return (
    <section className="mb-8">
      <div className="section-prompt">$ cat languages.txt</div>
      <LanguageChart data={data} />
    </section>
  );
}
