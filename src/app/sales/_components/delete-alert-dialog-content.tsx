import { deleteSale } from "@/app/_actions/sale/delete";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";
import { toast } from "sonner";

type DeleteAlertDialogContentProps = {
  id: string;
};

export const DeleteSaleAlertDialogContent = ({
  id,
}: DeleteAlertDialogContentProps) => {
  const onDelete = async () => {
    try {
      await deleteSale({ id });
      toast.success("Venda deletada com sucesso!");
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
        <AlertDialogAction onClick={onDelete}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
