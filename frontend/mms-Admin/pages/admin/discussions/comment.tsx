import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import React, { ReactElement } from "react";
import {
  commentIcon,
  bookmark,
  shareIcon,
  moreIcon,
  clockIcon
} from "@/public";
import Image from "next/image";
import { Link } from "react-feather";

let dummy = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget aliquam quam. Sed euismod, nisl quis aliquet lacinia, nisl nisl aliquam nisl, quis aliquam nisl nisl quis nisl. Nulla eget aliquam quam. Sed euismod, nisl quis aliquet lacinia, nisl nisl aliquam nisl, quis aliquam nisl nisl quis nisl.",
    date: "2021-08-12"
  }
];
function Comment() {
  return (
    <div>
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
                  {/* <div className="comment cursor-pointer">
                    <Link href={`/admin/discussions/comment`}>
                      <Image src={commentIcon} alt="comment" />
                    </Link>
                  </div> */}
                  <div className="bookmark cursor-pointer">
                    <Image src={bookmark} alt="bookmark" />
                  </div>
                  <div className="share cursor-pointer">
                    <Image src={shareIcon} alt="share" />
                  </div>
                </div>
              </div>

              <div className="second flex items-center text-xs text-mmsBlack5 font-normal space-x-1">
                <Image src={clockIcon} alt="clock" />

                <p>{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="add__comment bg-green11 border border-mmsPry10 rounded-[5px] py-3 px-[22px] mt-[41px] mb-[23px]">
        <textarea
          className="w-full h-[100px]  bg-green11 rounded-[5px]  outline-none py-[24px] text-mmsBlack5 text-base font-normal"
          placeholder="Write a comment"
        ></textarea>

        <div className="actions flex justify-between items-center">
          <div className="file flex space-x-4">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.875 9.48569L11.3797 18.0925C9.03386 20.4692 5.23035 20.4692 2.88443 18.0925C0.538523 15.7158 0.538523 11.8624 2.88443 9.48569L9.96386 2.31335C11.5278 0.728883 14.0634 0.728883 15.6274 2.31335C17.1913 3.89782 17.1913 6.46675 15.6274 8.05122L8.54792 15.2235C7.76599 16.0158 6.49817 16.0158 5.71619 15.2235C4.93422 14.4313 4.93422 13.1468 5.71619 12.3546L12.7956 5.18229"
                stroke="#808080"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6424 9.43311L14.6257 9.41634M8.39243 9.43311L8.37565 9.41634M7.33398 14.6247C7.33398 14.6247 7.46434 14.8854 7.77117 15.2224C8.33169 15.8379 9.48117 16.708 11.5007 16.708C13.5201 16.708 14.6696 15.8379 15.2301 15.2224C15.537 14.8854 15.6673 14.6247 15.6673 14.6247M11.5007 21.9163C5.74768 21.9163 1.08398 17.2526 1.08398 11.4997C1.08398 5.74671 5.74768 1.08301 11.5007 1.08301C17.2536 1.08301 21.9173 5.74671 21.9173 11.4997C21.9173 17.2526 17.2536 21.9163 11.5007 21.9163Z"
                stroke="#808080"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="post__comment">
            <button className="bg-mmsPry3 text-white rounded-[5px] px-[15px] py-[2px]  h-[24px] text-sm font-normal">
              Post Comment
            </button>
          </div>
        </div>
      </div>

      <div className="comments h-full w-full border rounded-[10px]  border-[#E6E6E6] p-[23px] ">
        {comment.map(item => (
          <div className="comment__item flex justify-between bg-green11 border border-mmsPry10 rounded-[5px] my-[15px] p-[20px]">
            <div className="comment__details">
              <h2 className="name text-mmsBlack2 font-semibold text-base">
                {item.name}
              </h2>

              <div className="comment text-mmsBlack5 text-xs font-normal">
                {item.comment}
              </div>
            </div>

            <div className="date text-mmsBlack5 text-sm font-normal">
              <Image src={moreIcon} alt="see more" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;

let comment = [
  {
    id: 1,
    name: "John Doe",
    date: "2 days ago",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, interdum tortor. Sed eget risus porta, tincidunt turpis at, interdum tortor."
  },
  {
    id: 2,
    name: "Sam Johnson",
    date: "2 days ago",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, interdum tortor. Sed eget risus porta, tincidunt turpis at, interdum tortor."
  },

  {
    id: 2,
    name: "Sam Johnson",
    date: "2 days ago",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, interdum tortor. Sed eget risus porta, tincidunt turpis at, interdum tortor."
  },
  {
    id: 2,
    name: "Sam Johnson",
    date: "2 days ago",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, interdum tortor. Sed eget risus porta, tincidunt turpis at, interdum tortor."
  },
  {
    id: 2,
    name: "Sam Johnson",
    date: "2 days ago",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, interdum tortor. Sed eget risus porta, tincidunt turpis at, interdum tortor."
  }
];

Comment.requireAuth = true;

Comment.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout title="Comments">{page}</DashboardLayout>;
};
