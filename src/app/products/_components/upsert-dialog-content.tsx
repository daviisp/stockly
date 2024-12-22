"use client";

import { upsertProduct } from "@/app/_actions/product/upsert";
import {
  upsertProductSchema,
  UpsertProductSchema,
} from "@/app/_actions/product/upsert/schema";
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
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

type UpsertProductDialogContentProps = {
  defaultValues?: {
    id: string;
    name: string;
    price: number;
    stock: number;
  };
  onSuccess: () => void;
};

export const UpsertProductDialogContent = ({
  defaultValues,
  onSuccess,
}: UpsertProductDialogContentProps) => {
  const form = useForm<UpsertProductSchema>({
    resolver: zodResolver(upsertProductSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          name: "",
          price: 0,
          stock: 0,
        },
  });

  const isEdditing = !!defaultValues;

  const onSubmit = async (data: UpsertProductSchema) => {
    try {
      await upsertProduct(data);
      onSuccess();
      toast.success(
        `Produto ${isEdditing ? "editado" : "criado"} com sucesso!`
      );
    } catch (err) {
      toast.error("Algum erro aconteceu. Tente novamente");
    }
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{isEdditing ? "Editar" : "Criar"} produto</DialogTitle>
        <DialogDescription>Insira as informações abaixo</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Nome
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite o nome do produto"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5">
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale
                    decimalScale={2}
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    {...field}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue)
                    }
                    onChange={() => {}}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Estoque
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite o estoque do produto"
                    className="w-full"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" variant="secondary">
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
