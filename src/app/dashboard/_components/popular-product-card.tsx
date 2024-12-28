import { formatPrice } from "@/services/format-price";
import { CircleIcon } from "lucide-react";

type PopularProductCardProps = {
  productName: string;
  productQuantity: number;
  productPrice: number;
  productStock: number;
};

export const PopularProductCard = ({
  productName,
  productQuantity,
  productPrice,
  productStock,
}: PopularProductCardProps) => {
  return (
    <div className="flex flex-col gap-3">
      {productStock > 0 ? (
        <div className="flex items-center gap-1.5 bg-[#EBFAF7] w-fit rounded-xl text-xs text-emerald-500 font-semibold py-0.5 px-2">
          <CircleIcon fill="#00A180" size={8} className="stroke-none" />
          Em estoque
        </div>
      ) : (
        <div className="flex items-center gap-1.5 bg-[#fb8484] w-fit rounded-xl text-xs text-red-700 font-semibold py-0.5 px-2">
          <CircleIcon fill="#fd0000" size={8} className="stroke-none" />
          Esgotado
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-slate-800 font-semibold">{productName}</p>
          <p className="text-slate-500">{formatPrice(productPrice)}</p>
        </div>
        <p className="text-slate-900 font-semibold">{productQuantity}</p>
      </div>
    </div>
  );
};
