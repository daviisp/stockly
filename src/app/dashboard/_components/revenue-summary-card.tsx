import { formatPrice } from "@/services/format-price";
import { ReactElement } from "react";

type RevenueSummaryCardProps = {
  icon: ReactElement;
  text: string;
  value: number;
};

export const RevenueSummaryCard = ({
  icon,
  text,
  value,
}: RevenueSummaryCardProps) => {
  return (
    <div className="bg-white rounded-xl text-emerald-500">
      <div className="pt-6 px-6 pb-2">
        <div className="w-fit rounded-xl bg-[#EBFAF7] p-1.5">{icon}</div>
      </div>
      <div className="px-6 pb-6">
        <p className="text-slate-500 font-semibold text-sm">{text}</p>
        <p className="text-slate-900 font-semibold text-xl sm:text-2xl">
          {formatPrice(value)}
        </p>
      </div>
    </div>
  );
};
