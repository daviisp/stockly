import { DataTable } from "@/components/ui/data-table";
import { TitleWithSubtitle } from "../_components/title-with-subtitle";
import { getProducts } from "./_data-access/get-products";
import { productTableColumns } from "./_components/table-columns";
import { CreateProduct } from "./_components/create-product";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div>
      <div className="flex justify-between items-center pb-8 sm:pb-4">
        <TitleWithSubtitle title="Produtos" subtitle="Gestão de Produtos" />
        <CreateProduct />
      </div>
      <DataTable data={products} columns={productTableColumns} />
    </div>
  );
};

export default ProductsPage;
