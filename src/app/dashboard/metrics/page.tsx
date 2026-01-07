import { StatCard } from "@/components/stat-card";
import { getMatchDistribution } from "@/app/actions/metrics";
import { calculatePercentage, formatList } from "@/lib/utils";
import { MapDistributionChart } from "@/components/map-distribution-chart";
import { PercentStatCard } from "@/components/percent-stats-card";
export const dynamic = 'force-dynamic';

export default async function Metrics() {
  const { success, data: metrics, error } = await getMatchDistribution();

  if (!success) {
    return <div>Failed to get metrics</div>;
  }

  if (error) {
    return <div>Error getting metrics</div>;
  }

  if (!metrics) {
    return <div>Metrics is Empty</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* First row - Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Matches"
          value={metrics?.total_matches}
          description={`Matches across ${formatList("Steam", "Event")}`}
        />
        <StatCard
          title="Ranked"
          value={metrics?.type_distribution.ranked}
          description={`${calculatePercentage(metrics?.type_distribution.ranked, metrics?.total_matches, 1)}% of Matches`}
        />
        <StatCard
          title="Scrim"
          value={metrics?.type_distribution.scrim}
          description={`${calculatePercentage(metrics?.type_distribution.scrim, metrics?.total_matches, 1)}% of Matches`}
        />
        <StatCard
          title="Event"
          value={metrics?.type_distribution.event}
          description={`${calculatePercentage(metrics?.type_distribution.event, metrics?.total_matches, 1)}% of Matches`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Players Tracked"
          value={metrics.total_players}
          description={"Number of players used to find steam matches"}
        />
        <StatCard
          title="Tournaments Tracked"
          value={metrics.total_tournaments}
          description={"Nuber of tournaments use to find event matches"}
        />
        <StatCard
          title="Processed Matches"
          value={`${calculatePercentage(metrics?.processed_distribution.true, metrics?.total_matches, 0)}%`}
          description={"Nuber of matches with processed telemetry data"}
        />
      </div>

      {/* Map distribution section - Chart and Stat Cards */}
      <div className="grid lg:grid-cols-12 gap-6 mb-6">
        {/* Chart takes up 6/12 columns */}
        <div className="col-span-12 lg:col-span-6 flex">
          <div className="w-full h-full flex items-stretch">
            <MapDistributionChart distribution={metrics.map_distribution} />
          </div>
        </div>

        {/* Map stat cards in a 2x3 grid, taking up 6/12 columns */}
        <div className="col-span-12 lg:col-span-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
            <PercentStatCard
              title="Erangel"
              subtitle="Baltic_Main"
              value={metrics.map_distribution.Baltic_Main}
              total={metrics.total_matches}
              color="green"
            />
            <PercentStatCard
              title="Miramar"
              subtitle="Desert_Main"
              value={metrics.map_distribution.Desert_Main}
              total={metrics.total_matches}
              color="orange"
            />
            <PercentStatCard
              title="Rondo"
              subtitle="Neon_Main"
              value={metrics.map_distribution.Neon_Main}
              total={metrics.total_matches}
              color="purple"
            />
            <PercentStatCard
              title="Taego"
              subtitle="Tiger_Main"
              value={metrics.map_distribution.Tiger_Main}
              total={metrics.total_matches}
              color="lime"
            />
            <PercentStatCard
              title="Vikendi"
              subtitle="DihorOtok_Main"
              value={metrics.map_distribution.DihorOtok_Main}
              total={metrics.total_matches}
              color="blue"
            />
            <PercentStatCard
              title="Deston"
              subtitle="Kiki_Main"
              value={metrics.map_distribution.Kiki_Main}
              total={metrics.total_matches}
              color="red"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

