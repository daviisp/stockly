import { ShoppingBasket } from "lucide-react";
import { getTotalProductsQuantity } from "../_data-access/get-total-products-quantity";

export const TotalProductsQuantityCard = async () => {
  const totalProductsQuantity = await getTotalProductsQuantity();

  return (
    <div className="bg-white rounded-xl text-emerald-500">
      <div className="pt-6 px-6 pb-2">
        <div className="w-fit rounded-xl bg-[#EBFAF7] p-1.5">
          {" "}
          <ShoppingBasket />
        </div>
      </div>
      <div className="px-6 pb-6">
        <p className="text-slate-500 font-semibold text-sm">Produtos</p>
        <p className="text-slate-900 font-semibold text-xl sm:text-2xl">
          {totalProductsQuantity}
        </p>
      </div>
    </div>
  );
};
