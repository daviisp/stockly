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
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { toast } from "sonner";

type DeleteAlertDialogContentProps = {
  id: string;
};

export const DeleteSaleAlertDialogContent = ({
  id,
}: DeleteAlertDialogContentProps) => {
  const { execute: executeDeleteSale } = useAction(deleteSale, {
    onError: ({ error: { validationErrors } }) => {
      const flattenedValidationErrors =
        flattenValidationErrors(validationErrors);
      toast.error(flattenedValidationErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda deletada com sucesso!");
    },
  });

  const onDelete = () => {
    executeDeleteSale({ id });
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir esta venda. Esta ação não pode ser
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
