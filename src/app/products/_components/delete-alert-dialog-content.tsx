import { deleteProduct } from "@/app/_actions/product/delete";
import { DeleteProductSchema } from "@/app/_actions/product/delete/schema";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type DeleteAlertDialogContentProps = {
  id: string;
};

export const DeleteProductAlertDialogContent = ({
  id,
}: DeleteAlertDialogContentProps) => {
  const onDelete = async (id: string) => {
    try {
      await deleteProduct({ id });
      toast.success("Produto deletado com sucesso!");
    } catch (err) {
      toast.error("Algum erro aconteceu. Tente novamente");
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir este produto. Esta ação não pode ser
          desfeita. Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={() => onDelete(id)}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
