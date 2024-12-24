import { deleteProduct } from "@/app/_actions/product/delete";

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
import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";

type DeleteAlertDialogContentProps = {
  id: string;
};

export const DeleteProductAlertDialogContent = ({
  id,
}: DeleteAlertDialogContentProps) => {
  const { execute: executeDeleteProductAction } = useAction(deleteProduct, {
    onError: ({ error: { validationErrors } }) => {
      const flattenedValitationErrors =
        flattenValidationErrors(validationErrors);
      toast.error(flattenedValitationErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Produto deletado com sucesso!");
    },
  });

  const onDelete = () => {
    executeDeleteProductAction({ id });
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
        <AlertDialogAction onClick={onDelete}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
