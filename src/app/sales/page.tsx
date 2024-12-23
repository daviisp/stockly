import { DataTable } from "@/components/ui/data-table";
import { TitleWithSubtitle } from "../_components/title-with-subtitle";
import { getProducts } from "../products/_data-access/get-products";
import { CreateSale } from "./_components/create-sale";
import { getSales } from "./_data-access/get-sales";
import { saleTableColumns } from "./_components/table-columns";

const SalesPage = async () => {
  const products = await getProducts();
  const sales = await getSales();

  const productOptions = products.map((prod) => ({
    label: prod.name,
    value: prod.id,
  }));

  return (
    <div>
      <div className="flex justify-between items-center">
        <TitleWithSubtitle subtitle="Gestão de Vendas" title="Vendas" />
        <CreateSale products={products} productOptions={productOptions} />
      </div>
      <DataTable data={sales} columns={saleTableColumns} />
    </div>
  );
};

export default SalesPage;
