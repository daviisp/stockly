import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProductsSalesCount } from "./_data-access/get-products-sales-count";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { deleteUser } from "../_actions/user/account/delete";

const SettingsPage = async () => {
  const data = await getProductsSalesCount();

  return (
    <div className="h-full bg-gray-100 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Dashboard do usuário
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-center">
                  {data.productsQuantity}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-center">
                  {data.salesQuantity}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Deletar conta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja deletar sua conta? Esta ação não poderá
                  ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={deleteUser}>
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsPage;
