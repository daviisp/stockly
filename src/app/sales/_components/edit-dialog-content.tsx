import { updateSale } from "@/app/_actions/sale/update";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type EditSaleDialogContent = {
  defaultValues: {
    id: string;
    productId: string;
    productName: string;
    productQuantity: number;
  };
  onSuccess: () => void;
};

const formSchema = z.object({
  productName: z.string(),
  productQuantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

export const EditSaleDialogContent = ({
  defaultValues,
  onSuccess,
}: EditSaleDialogContent) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: defaultValues.productName,
      productQuantity: defaultValues.productQuantity,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await updateSale({
        id: defaultValues.id,
        productId: defaultValues.productId,
        productQuantity: data.productQuantity,
      });
      onSuccess();
      toast.success("Venda atualizada com sucesso!");
    } catch (err) {
      toast.error("Algum erro aconteceu. Tente novamente");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar</DialogTitle>
        <DialogDescription>Insira as informações abaixo</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Nome
                </FormLabel>
                <FormControl>
                  <Input {...field} value={defaultValues.productName} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Quantidade
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite a quantidade que você deseja alterar"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" variant="secondary">
              Atualizar
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
