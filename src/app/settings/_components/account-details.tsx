"use client";

import { deleteUser } from "@/app/_actions/user/account/delete";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export const AccountDetails = () => {
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
                <p className="text-3xl font-bold text-center">120</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-center">1,543</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button variant="destructive" className="w-full" onClick={deleteUser}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Deletar conta
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
