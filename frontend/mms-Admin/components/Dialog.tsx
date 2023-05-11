/* eslint-disable require-jsdoc */
import { useRef } from "react";
import clsx from "clsx";
import { Dialog as HeadlessDialog } from "@headlessui/react";

interface IDialogProps {
  open: boolean;
  onClose?: any;
  variant?: "scrollable" | "scroll" | "fullscreen";
  [x: string]: any;
}

export function Dialog(props: IDialogProps) {
  const overlayRef: any = useRef();
  const { variant, className, open, children, onClose } = props;

  return (
    <HeadlessDialog
      static
      open={open}
      onClose={onClose!}
      initialFocus={overlayRef}
      className={clsx(
        {
          ["bg-action-backdrop"]:
            variant === "scroll" || variant === "scrollable",
          ["overflow-y-hidden"]: variant === "scrollable"
        },
        "z-50 fixed block w-full h-full outline-none overflow-x-hidden overflow-y-auto top-0 left-0"
      )}
    >
      <div className={clsx(className, DialogVariant[variant!], "relative")}>
        <DialogContent
          className={clsx({
            ["max-h-[100%]"]: variant === "scrollable",
            ["rounded-lg"]: variant === "scroll" || variant === "scrollable"
          })}
        >
          {children}
        </DialogContent>
      </div>
    </HeadlessDialog>
  );
}

export default Dialog;

const DialogVariant = {
  fullscreen: "w-full",
  scroll:
    "w-[300px] mx-auto md:w-[500px] lg:w-full flex items-center justify-center h-full",
  scrollable:
    "max-h-[100%] mx-auto w-full flex items-center justify-center h-full"
};

export function DialogContent(props: any) {
  return (
    <div
      className={clsx(
        props.className,
        "relative bg-white shadow-xl flex flex-col w-full pointer-events-auto"
      )}
    >
      {props.children}
    </div>
  );
}
