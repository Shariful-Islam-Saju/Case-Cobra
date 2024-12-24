import type { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import Image from "next/image";

interface propsType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginModel = ({ isOpen, setIsOpen }: propsType) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="absolute z-[99999]">
        <DialogHeader>
          <div
            className="relative mx-auto w-24 h-24 mb-2"
          >
            <Image
              src="/snake-1.png"
              fill
              className="object-contain"
              alt="snake image"
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModel;
