import { DataTable } from "@/components/ui/data-table";
import { TitleWithSubtitle } from "../_components/title-with-subtitle";
import { getProducts } from "./_data-access/get-products";
import { productTableColumns } from "./_components/table-columns";
import { CreateProduct } from "./_components/create-product";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="bg-white h-full p-5 rounded-md">
      <div className="flex justify-between items-center pb-8 sm:pb-0">
        <TitleWithSubtitle title="Gestão de Produtos" subtitle="Produtos" />
        <CreateProduct />
      </div>
      <DataTable data={products} columns={productTableColumns} />
    </div>
  );
};

export default ProductsPage;
