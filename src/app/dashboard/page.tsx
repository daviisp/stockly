import {
  CircleDollarSign,
  DollarSignIcon,
  PackageIcon,
  ShoppingBasket,
} from "lucide-react";
import { TitleWithSubtitle } from "../_components/title-with-subtitle";
import { StatsSummaryCard } from "./_components/stats-summary-card.tsx";
import { RevenueSummaryCard } from "./_components/revenue-summary-card";
import { PopularProducts } from "./_components/popular-products";
import { getDashboard } from "./_data-access/get-dashboard";

const DashboardPage = async () => {
  const {
    totalSales,
    totalSalesToday,
    totalSalesQuantity,
    totalStock,
    totalProducts,
  } = await getDashboard();

  return (
    <div>
      <div>
        <TitleWithSubtitle subtitle="Dashbord" title="Dashboard" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
        <RevenueSummaryCard
          icon={<DollarSignIcon />}
          text="Receita total"
          value={totalSales}
        />
        <RevenueSummaryCard
          icon={<DollarSignIcon />}
          text="Receita hoje"
          value={totalSalesToday}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <StatsSummaryCard
          icon={<CircleDollarSign />}
          text="Vendas totais"
          value={totalSalesQuantity}
        />
        <StatsSummaryCard
          icon={<PackageIcon />}
          text="Total em estoque"
          value={totalStock}
        />
        <StatsSummaryCard
          icon={<ShoppingBasket />}
          text="Produtos"
          value={totalProducts}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>Gráfico</div>
        <div className="p-8 rounded-lg bg-white">
          <p className="text-slate-900 text-lg font-semibold pb-8">
            Produtos mais vendidos
          </p>
          <div className="flex flex-col gap-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <PopularProducts key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
