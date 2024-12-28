import { PackageIcon } from "lucide-react";
import { getTotalInStock } from "../_data-access/get-total-in-stock";

export const TotalInStockCard = async () => {
  const totalInStock = await getTotalInStock();

  return (
    <div className="bg-white rounded-xl text-emerald-500">
      <div className="pt-6 px-6 pb-2">
        <div className="w-fit rounded-xl bg-[#EBFAF7] p-1.5">
          <PackageIcon />
        </div>
      </div>
      <div className="px-6 pb-6">
        <p className="text-slate-500 font-semibold text-sm">Total em estoque</p>
        <p className="text-slate-900 font-semibold text-xl sm:text-2xl">
          {totalInStock}
        </p>
      </div>
    </div>
  );
};
