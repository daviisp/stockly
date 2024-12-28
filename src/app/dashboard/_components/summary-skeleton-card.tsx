import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const SummarySkeletonCard = () => {
  return (
    <Skeleton className="bg-white rounded-xl px-6">
      <Skeleton className="bg-gray-200 w-9 h-9 rounded-xl p-1.5 mt-6 mb-2" />
      <div className="mb-6 space-y-1.5">
        <Skeleton className="bg-gray-200 w-[79px] h-5 rounded-xl" />
        <Skeleton className="bg-gray-200 w-[105px] h-8 rounded-xl" />
      </div>
    </Skeleton>
  );
};
