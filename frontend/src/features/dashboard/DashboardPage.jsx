import PageHeader from "../../components/shared/PageHeader";
import KpiCard from "../../components/shared/KpiCard";
import UrbanHealthHero from "../../components/shared/UrbanHealthHero";

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-8">
      <PageHeader
        title="Good Morning, Planner"
        description="Urban Intelligence Overview"
      />

      <UrbanHealthHero />

      <div className="grid grid-cols-4 gap-6">
        <KpiCard
          title="Population"
          value="1.2M"
          change="+5.4%"
        />

        <KpiCard
          title="Traffic Score"
          value="82"
          change="+2%"
        />

        <KpiCard
          title="AQI"
          value="67"
          change="-4%"
        />

        <KpiCard
          title="Budget"
          value="$420M"
          change="+8%"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/3 p-6 h-80">
          Active Simulations
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/3 p-6 h-80">
          AI Recommendations
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/3 p-6 h-96">
        City Operations Map Preview
      </div>
    </div>
  );
}