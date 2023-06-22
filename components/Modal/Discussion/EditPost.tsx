import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { InputField } from "@/components/InputFields";
import Button from "@/components/Button";

interface NewTopicModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EditPostModal({ isOpen, setIsOpen }: NewTopicModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 bg-black"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl  bg-white px-[56px] py-[63px] rounded-[20px] ">
          <div className="flex header items-center justify-between">
            <Dialog.Title className={"text-mmsBlack1 text-2xl font-semibold"}>
              New Topic
            </Dialog.Title>

            <div
              className="close cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 1.05L10.95 0L6 4.95L1.05 0L0 1.05L4.95 6L0 10.95L1.05 12L6 7.05L10.95 12L12 10.95L7.05 6L12 1.05Z"
                  fill="#058B94"
                />
              </svg>
            </div>
          </div>

          <form>
            <div className="mt-4">
              <div className="title__input">
                <InputField placeholder="title" type="text" />
              </div>

              <div className="title__details">
                <textarea
                  className="w-full h-[150px] border border-[#E5E5E5] rounded-[10px] mt-[10px] p-[10px] text-[#828282] placeholder-[#828282] focus:outline-none focus:ring-2 focus:ring-[#058B94] focus:border-transparent"
                  placeholder="start typing..."
                ></textarea>
              </div>
            </div>

            <div className="post flex justify-end">
              <Button
                className="mt-[20px]
            
            px-[40px]
            py-[10px]
             h-[50px]
            bg-mmsPry3 text-white "
              >
              Save changes 
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
