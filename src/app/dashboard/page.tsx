import AlertsTable from "@/components/dashboard/alerts-table";
import DashboardHeader from "@/components/dashboard/header";
import KpiCard from "@/components/dashboard/kpi-card";
import Sidebar from "@/components/dashboard/sidebar";
import EnergieAreaChart from "@/components/charts/energie-area-chart";
import MachinesRingChart from "@/components/charts/machines-ring-chart";
import ProductionLineChart from "@/components/charts/production-line-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { alertes, kpis } from "@/lib/indubot";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-navy">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />

        <main className="flex flex-1 flex-col gap-6 px-6 py-8 md:px-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi, index) => (
              <KpiCard index={index} key={kpi.label} kpi={kpi} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Production — 7 derniers jours</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductionLineChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utilisation des machines</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <MachinesRingChart size={200} />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Consommation énergétique</CardTitle>
              </CardHeader>
              <CardContent>
                <EnergieAreaChart />
              </CardContent>
            </Card>

            <AlertsTable alertes={alertes} />
          </div>
        </main>
      </div>
    </div>
  );
}
