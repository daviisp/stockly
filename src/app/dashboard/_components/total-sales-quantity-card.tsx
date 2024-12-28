import { DollarSignIcon } from "lucide-react";
import { getTotalSalesQuantity } from "../_data-access/get-total-sales-quantity";
import { formatPrice } from "@/services/format-price";

export const TotalSalesQuantityCard = async () => {
  const totalSalesQuantity = await getTotalSalesQuantity();

  return (
    <div className="bg-white rounded-xl text-emerald-500">
      <div className="pt-6 px-6 pb-2">
        <div className="w-fit rounded-xl bg-[#EBFAF7] p-1.5">
          <DollarSignIcon />
        </div>
      </div>
      <div className="px-6 pb-6">
        <p className="text-slate-500 font-semibold text-sm">Vendas totais</p>
        <p className="text-slate-900 font-semibold text-xl sm:text-2xl">
          {totalSalesQuantity}
        </p>
      </div>
    </div>
  );
};
