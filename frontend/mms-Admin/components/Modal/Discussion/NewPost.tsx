import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { InputField, TextareaField } from "@/components/InputFields";
import Button from "@/components/Button";
import { useCreateDscussions } from "@/hooks/useCreateDscussions";
import { useFormik } from "formik";
import * as yup from "yup";
import { ClipLoader } from "react-spinners";

interface NewTopicModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const newpost = yup.object({
  title: yup.string().label("title").required(),
  content: yup.string().label("content").required()
});
export function NewPostModal({ isOpen, setIsOpen }: NewTopicModalProps) {
  const { data, mutate  , isLoading } = useCreateDscussions();

  const handleCreateDiscussion = (e: any) => {
    e.preventDefault();

    // mutate({
    //   title: e.target[0].value,
    //   content: e.target[1].value
    // });

    mutate({
      title: formik.values.title,
      content: formik.values.content,
      setIsOpen : setIsOpen
    });

  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: ""
    },
    validationSchema: newpost,
    onSubmit: values => {
      // mutate(values, userId);
 


    }
  });

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        // open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 bg-black"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
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
                  <InputField
                    placeholder="title"
                    type="text"
                    inputProps={{
                      value: formik.values.title,
                      onChange: formik.handleChange("title"),
                      onBlur: formik.handleBlur("title")
                    }}
                    value={data?.title}
                  />
                </div>

                <div className="title__details">
                  <TextareaField
                  rows={5}
                    inputProps={{
                      value: formik.values.content,
                      onChange: formik.handleChange("content"),
                      onBlur: formik.handleBlur("content")
                    }}
                    className="w-full h-[150px] border border-[#E5E5E5] rounded-[10px] mt-[10px] p-[10px] text-[#828282] placeholder-[#828282] focus:outline-none focus:ring-2 focus:ring-[#058B94] focus:border-transparent"
                    placeholder="start typing..."
                  ></TextareaField>
                </div>
              </div>

              <div className="post flex justify-end">
                <Button 
                  // type="submit"
                  // onClick={handleCreateDiscussion}



            onClick={handleCreateDiscussion}

                  className="mt-[20px]
            
            px-[40px]
            py-[10px]
             h-[50px]
            bg-mmsPry3 text-white rou "
                >

                  {
                    isLoading ?  <ClipLoader color="#36d7b7" />: "Post to forum"
                  }
            
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
