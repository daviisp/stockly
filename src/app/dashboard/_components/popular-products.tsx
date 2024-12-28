import { getPopularProducts } from "../_data-access/get-popular-products";
import { PopularProductCard } from "./popular-product-card";

export const PopularProducts = async () => {
  const popularProducts = await getPopularProducts();

  return (
    <div className="p-8 rounded-xl bg-white overflow-y-hidden">
      <p className="text-slate-900 text-lg font-semibold pb-8">
        Produtos mais vendidos
      </p>
      <div className="flex flex-col gap-8 overflow-y-auto max-h-[50vh] custom-scrollbar">
        {popularProducts.map((prod) => (
          <PopularProductCard key={prod.productId} {...prod} />
        ))}
      </div>
    </div>
  );
};
