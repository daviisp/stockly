import { DataTable } from "@/components/ui/data-table";
import { TitleWithSubtitle } from "../_components/title-with-subtitle";
import { getProducts } from "./_data-access/get-products";
import { productTableColumns } from "./_components/table-columns";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div>
      <TitleWithSubtitle title="Gestão de Produtos" subtitle="Produtos" />
      <DataTable data={products} columns={productTableColumns} />
    </div>
  );
};

export default ProductsPage;
