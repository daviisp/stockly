import { CircleIcon } from "lucide-react";

export const PopularProducts = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5 bg-[#EBFAF7] w-fit rounded-xl text-xs text-emerald-500 font-semibold py-0.5 px-2">
        <CircleIcon fill="#00A180" size={8} className="stroke-none" />
        Em estoque
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-slate-800 font-semibold">Camisa</p>
          <p className="text-slate-500">R$1900</p>
        </div>
        <p className="text-slate-900 font-semibold">3000 vendidos</p>
      </div>
    </div>
  );
};
