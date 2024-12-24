"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { UpsertProductDialogContent } from "./upsert-dialog-content";

export const CreateProduct = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Novo produto
        </Button>
      </DialogTrigger>
      <UpsertProductDialogContent closeModal={() => setModalIsOpen(false)} />
    </Dialog>
  );
};
