import type { Dispatch, SetStateAction } from "react";
import { Dialog } from "./ui/dialog";

interface propsType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginModel = ({ isOpen, setIsOpen }: propsType) => {
  return <Dialog onOpenChange={setIsOpen} open={isOpen}></Dialog>;
};

export default LoginModel;
