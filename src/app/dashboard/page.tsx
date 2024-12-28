import { TitleWithSubtitle } from "../_components/title-with-subtitle";
import { getPopularProducts } from "./_data-access/get-popular-products";
import { TotalRevenueCard } from "./_components/total-revenue-card";
import { SummarySkeletonCard } from "./_components/summary-skeleton-card";
import { TotalRevenueTodayCard } from "./_components/total-revenue-today-card";
import { TotalSalesQuantityCard } from "./_components/total-sales-quantity-card";
import { TotalInStockCard } from "./_components/total-in-stock-card";
import { TotalProductsQuantityCard } from "./_components/total-products-quantity-card";
import { Last14DaysRevenueCard } from "./_components/last-14-days-revenue-card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PopularProducts } from "./_components/popular-products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stockly - Dashboard",
};

const DashboardPage = async () => {
  return (
    <div>
      <div>
        <TitleWithSubtitle subtitle="Dashbord" title="Dashboard" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
        <Suspense fallback={<SummarySkeletonCard />}>
          <TotalRevenueCard />
        </Suspense>
        <Suspense fallback={<SummarySkeletonCard />}>
          <TotalRevenueTodayCard />
        </Suspense>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <Suspense fallback={<SummarySkeletonCard />}>
          <TotalSalesQuantityCard />
        </Suspense>
        <Suspense fallback={<SummarySkeletonCard />}>
          <TotalInStockCard />
        </Suspense>
        <Suspense fallback={<SummarySkeletonCard />}>
          <TotalProductsQuantityCard />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-4 mt-4 mb-5 max-h-fit">
        <Suspense
          fallback={
            <Skeleton className="bg-white w-full rounded-xl p-6">
              <Skeleton className="bg-gray-200 rounded-xl w-[58.93px] h-7" />
              <Skeleton className="bg-gray-200 rounded-xl w-[94.81px] h-6 mt-1" />
              <Skeleton className="bg-gray-200 rounded-xl w-full h-full mt-3" />
            </Skeleton>
          }
        >
          <Last14DaysRevenueCard />
        </Suspense>
        <Suspense
          fallback={
            <Skeleton className="w-full bg-white rounded-xl p-8">
              <Skeleton className="bg-gray-200 rounded-xl w-[195.7px] h-7 mb-8" />
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-3">
                  <Skeleton className="bg-gray-200 rounded-xl p-1.5 w-[80.79px] h-5" />
                  <div>
                    <Skeleton className="bg-gray-200 rounded-xl w-[75px] h-6" />
                    <Skeleton className="bg-gray-200 rounded-xl w-[70px] h-6 mt-1" />
                  </div>
                </div>
                <Skeleton className="bg-gray-200 rounded-xl w-5 h-6" />
              </div>
            </Skeleton>
          }
        >
          <PopularProducts />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
