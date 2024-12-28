import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authWithGoogle } from "@/app/_actions/auth";
import { GoogleIcon } from "./_components/google-icon";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stockly - Login",
};

const AuthPage = () => {
  return (
    <>
      <Image src="/logo.svg" width={116} height={34} alt="Logo da Stockly" />
      <form
        action={authWithGoogle}
        className="h-full flex flex-col items-center justify-center"
      >
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" className="w-full">
              <GoogleIcon className="mr-2 h-4 w-4" />
              Login com o Google
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-center text-gray-600 mt-4 w-full">
              Ao fazer login, você concorda com os nossos termos de privacidade.
            </p>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default AuthPage;
