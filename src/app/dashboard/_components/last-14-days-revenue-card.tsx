import { getLast14DaysRevenue } from "../_data-access/get-last-14-days-revenue";
import { Graph } from "./graph";

export const Last14DaysRevenueCard = async () => {
  const last14DaysRevenue = await getLast14DaysRevenue();

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-slate-900 font-semibold text-lg">Receita</p>
      <p className="pt-1 text-slate-400 text-sm mb-3">Últimos 14 dias</p>
      <Graph data={last14DaysRevenue} />
    </div>
  );
};
