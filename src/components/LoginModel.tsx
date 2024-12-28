import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Image from "next/image";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { buttonVariants } from "./ui/button";

interface propsType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginModel = ({ isOpen, setIsOpen }: propsType) => {
  return (
    <div  className="absolute flex justify-center items-center">
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent className="  z-[99999]">
          <DialogHeader>
            <div className="relative mx-auto w-24 h-24 mb-2">
              <Image
                src="/snake-1.png"
                fill
                className="object-contain"
                alt="snake image"
              />
            </div>
            
            <DialogTitle className="text-center">Log in to continue</DialogTitle>
            <DialogDescription className="text-base text-center py-2 ">
              <span className="font-medium text-zinc-900">
                Your configuration was saved!
              </span>{" "}
              Please login or create an account to complete your purchase.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
            <LoginLink className={buttonVariants({ variant: "outline" })}>
              Login
            </LoginLink>{" "}
            <RegisterLink className={buttonVariants({ variant: "default" })}>
              Register
            </RegisterLink>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginModel;
