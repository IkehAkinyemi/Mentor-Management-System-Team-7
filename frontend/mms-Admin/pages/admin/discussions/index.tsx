import { NewPostModal } from "@/components";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import React, { ReactElement, useState } from "react";
import { commentIcon, bookmark, shareIcon, moreIcon } from "@/public";
import Image from "next/image";

let dummy = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget aliquam quam. Sed euismod, nisl quis aliquet lacinia, nisl nisl aliquam nisl, quis aliquam nisl nisl quis nisl. Nulla eget aliquam quam. Sed euismod, nisl quis aliquet lacinia, nisl nisl aliquam nisl, quis aliquam nisl nisl quis nisl.",
    date: "2021-08-12"
  },
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget aliquam quam. Sed euismod, nisl quis aliquet lacinia, nisl nisl aliquam nisl, quis aliquam nisl nisl quis nisl. Nulla eget aliquam quam. Sed euismod, nisl quis aliquet lacinia, nisl nisl aliquam nisl, quis aliquam nisl nisl quis nisl.",
    date: "2021-08-12"
  }
];

function Index() {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <NewPostModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="add__discussion my-[27px]">
        <div className="flex justify-between items-center border rounded-md border-[#E6E6E6] p-2">
          <h1 className="text-xl font-normal text-mmsBlack5">Add new topic</h1>

          <div
            className="open__modal cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 7V17V7ZM7 12H17H7Z" fill="#058B94" />
              <path
                d="M12 7V17M7 12H17"
                stroke="#058B94"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#058B94"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="discussion">
        {dummy.map(item => (
          <div className="discussion__card border my-2 border-[#E6E6E6] rounded-[10px] px-[20px] py-[24px]">
            <div className="card__header mb-[15px] flex justify-between">
              <div className="post__author">
                <h1 className="text-mmsBlack2 font-semibold text-xl">
                  Evergreen x
                </h1>

                <h5 className="text-mmsBlack5 font-normal text-sm">
                  Mentor Manager
                </h5>
              </div>

              <div className="more">
                <Image src={moreIcon} alt="more" />
              </div>
            </div>

            <h3 className="text-xl font-normal text-mmsBlack2 ">
              {item.title}
            </h3>

            <p className="text-mmsBlack5 text-base font-normal">
              {item.description.length > 100
                ? item.description.substring(0, 100) + "..."
                : item.description}
            </p>

            <div className="discussion__card___actions pt-[24px] flex items-center justify-between">
              <div className="first">
                <div className="flex items-center space-x-[29px]">
                  <div className="comment cursor-pointer">
                    <Image src={commentIcon} alt="comment" />
                  </div>
                  <div className="bookmark cursor-pointer">
                    <Image src={bookmark} alt="bookmark" />
                  </div>
                  <div className="share cursor-pointer">
                    <Image src={shareIcon} alt="share" />
                  </div>
                </div>
              </div>

              <div className="second flex items-center text-xs text-mmsBlack5 font-normal">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#058B94"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 6V12L16 16"
                    stroke="#058B94"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                {item.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;

Index.requireAuth = true;

Index.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout title="Discussion Forum">{page}</DashboardLayout>;
};
