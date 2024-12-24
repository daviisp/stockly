"use client";

import { createSale } from "@/app/_actions/sale/create";
import { ProductsDto } from "@/app/products/_data-access/get-products";
import { Button } from "@/components/ui/button";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/services/format-price";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckIcon,
  ClipboardCopyIcon,
  MoreHorizontal,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type CreateSaleProps = {
  productOptions: ComboboxOption[];
  products: ProductsDto[];
};

type SelectedProducts = {
  id: string;
  name: string;
  stock: number;
  price: number;
  quantity: number;
};

const formSchema = z.object({
  productId: z.string().uuid(),
  productQuantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

export const CreateSale = ({ productOptions, products }: CreateSaleProps) => {
  const { execute: executeCreateSale } = useAction(createSale, {
    onError: ({ error: { validationErrors } }) => {
      const flattenedValidationErrors =
        flattenValidationErrors(validationErrors);
      toast.error(flattenedValidationErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda criada com sucesso!");
    },
  });

  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>(
    []
  );

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      productQuantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const product = products.find((prod) => prod.id === data.productId);

    if (!product) {
      return;
    }

    setSelectedProducts((currentState) => {
      const productAlreadyInState = currentState.findIndex(
        (prod) => prod.id === product.id
      );

      if (productAlreadyInState !== -1) {
        if (
          currentState[productAlreadyInState].quantity + data.productQuantity >
          product.stock
        ) {
          form.setError("productQuantity", {
            message: "Quantidade maior da que disponível em estoque",
          });
          return currentState;
        }

        const updatedList = [...currentState];
        updatedList[productAlreadyInState] = {
          ...updatedList[productAlreadyInState],
          quantity:
            updatedList[productAlreadyInState].quantity + data.productQuantity,
        };

        return updatedList;
      }
      if (product.stock < data.productQuantity) {
        form.setError("productQuantity", {
          message: "Quantidade maior da que disponível em estoque",
        });
        return currentState;
      }

      return [
        ...currentState,
        {
          ...product,
          price: Number(product.price),
          quantity: data.productQuantity,
        },
      ];
    });
  };

  const onDelete = (productId: string) => {
    setSelectedProducts((currentState) => {
      return currentState.filter((prod) => prod.id !== productId);
    });
  };

  const onSubmitSale = () => {
    executeCreateSale({ products: selectedProducts });
  };

  const totalPrice = useMemo(() => {
    return selectedProducts.reduce((acc, prod) => {
      return acc + prod.quantity * prod.price;
    }, 0);
  }, [selectedProducts]);

  return (
    <DropdownMenu>
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            <PlusIcon />
            Nova venda
          </Button>
        </SheetTrigger>
        <SheetContent className="!max-w-[600px]">
          <SheetHeader>
            <SheetTitle>Nova venda</SheetTitle>
            <SheetDescription>Insira as informações abaixo</SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 py-6"
            >
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Nome
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        {...field}
                        placeholder="Selecione o produto"
                        options={productOptions}
                      />
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
                        placeholder="Digite a quantidade de venda do produto"
                        className="w-full"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button type="submit" variant="secondary" className="w-full">
                  <PlusIcon />
                  Adicionar produto à venda
                </Button>
              </div>
            </form>
          </Form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Preço unitário</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedProducts.map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>{formatPrice(prod.price)}</TableCell>
                  <TableCell>{prod.quantity}</TableCell>
                  <TableCell>{prod.name}</TableCell>
                  <DropdownMenuTrigger asChild>
                    <TableCell>
                      <MoreHorizontal />
                    </TableCell>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(prod.id)}
                    >
                      <ClipboardCopyIcon />
                      Copiar ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(prod.id)}>
                      <TrashIcon />
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-[#00A180] font-semibold my-6">
            Total: {formatPrice(totalPrice)}
          </p>
          <Button
            className="w-full"
            variant="secondary"
            disabled={selectedProducts.length === 0}
            onClick={onSubmitSale}
          >
            <CheckIcon />
            Finalizar venda
          </Button>
        </SheetContent>
      </Sheet>
    </DropdownMenu>
  );
};
