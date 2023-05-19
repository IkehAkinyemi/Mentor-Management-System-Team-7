import { Button } from "@/components";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { Calendar, Globe, Mail, MapPin } from "react-feather";

const Profile = () => {
  const router = useRouter();

  const [userData, setUserData] = React.useState<any>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  // const user = JSON.parse(userData)

  useEffect(() => {
    // Check if localStorage is available

    setLoading(true);
    if (typeof localStorage !== "undefined") {
      // Get favorites from localStorage
      const userData = localStorage.getItem("user");

      if (userData) {
        setUserData(JSON.parse(userData));
        setLoading(false);
      }
    }
  }, []);

  // console.log(userData.data.data, "user");

  // if(loading) return <div>Loading...</div>

  console.log(userData.data, "user");

  function formatDate(isoDateString: string) {
    const date = new Date(isoDateString);

    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
  }

  return (
    <div>
      <div className="mb-[60px] flex items-center justify-between">
        <div className="flex items-center">
          <div className="rounded-full cursor-pointer ">
            {
              // userData && !userData?.data.data.profile_image_url === 'string' ?
              //   <Image
              //   src={userData && userData?.data.data.profile_image_url}
              //   alt="avatar"
              //   width={90}
              //   height={90}
              // />
              // :
              <Image
                src="/images/personImg.png"
                alt="avatar"
                width={90}
                height={90}
              />
            }
          </div>
          <div className="mx-5">
            <h3 className="text-mmsBlack2 font-semibold text-2xl flex space-x-2">
              {userData && userData?.data.user.first_name} ,
              {userData && userData?.data.user.last_name}
            </h3>
            <p>{userData && userData?.data.user.role}</p>
          </div>
        </div>
        <div>
          <Button
            variant="primary"
            className="text-base px-[40px] py-[10px]"
            onClick={() => router.push("/admin/settings/general")}
          >
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="border border-gray-200 rounded-md p-5">
        <div>
          <h2 className="text-mmsBlack2 font-semibold mb-3 text-2xl">About</h2>
          <p className="p-5 bg-green11 border border-mmsPry10 text-mmsBlack3 text-base">
            {userData && userData?.data.user?.about}
          </p>
        </div>

        <div className="user__info">
          <div className="mt-[50px]">
            <h2 className="text-mmsBlack2 font-semibold mb-3 text-xl">
              Location :{" "}
              <span className="text-mmsBlack5 text-base">
                {userData && userData?.data.user.contact.city} ,
                {userData && userData?.data.user.contact.country}
              </span>
            </h2>

            <h2 className="text-mmsBlack2 font-semibold mb-5 text-xl">
              Email :{" "}
              <span className="text-mmsBlack5 text-base">
                {userData && userData?.data.user.contact.email}
              </span>
            </h2>

            <h2 className="text-mmsBlack2 font-semibold mb-5 text-xl">
              Website :{" "}
              <span className="text-mmsBlack5 text-base">
                {userData && userData?.data.user.contact.website}
              </span>
            </h2>

            <h2 className="text-mmsBlack2 font-semibold mb-5 text-xl">
              Members Since :{" "}
              <span className="text-mmsBlack5 text-base">
                {userData && formatDate(userData?.data.user.created_at)}
              </span>
            </h2>
          </div>
        </div>

        <div className="mt-[50px]">
          <h2 className="text-mmsBlack2 font-semibold mb-3 text-2xl">Social</h2>
          <div className="flex items-center lg:space-x-4 space-y-2 lg:space-y-0 space-x-0  lg:flex-row flex-col  ">
            <div className="flex items-center flex-nowrap  bg-mmsPry10 py-[5px] px-[11px] rouned-[5px] lg:w-[50%] w-full">
              <Image
                src="/images/svgs/githubIcon.svg"
                width={24}
                height={23}
                alt="github"
              />
              <span className="font-semibold text-base lg:text-xl text-mmsBlack3 ml-3">
                <a
                  href={
                    userData && userData?.data.user.socials?.github_url.value
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {userData && userData?.data.user.socials?.github_url.value}
                </a>
              </span>
            </div>
            <div className="flex items-center flex-nowrap bg-mmsPry10 py-[5px] px-[11px] rounded-[5px] lg:w-[50%] w-full">
              <Image
                src="/images/svgs/linkedinIcon.svg"
                width={24}
                height={23}
                alt="github"
              />
              <span className="font-semibold text-base lg:text-xl text-mmsBlack3 ml-3">
                <a
                  href={
                    userData && userData?.data.user.socials?.linkedin_url.value
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {userData && userData?.data.user.socials?.linkedin_url.value}
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center lg:flex-row flex-col rounded-[5px] mt-[33px] lg:space-x-4 space-y-2 lg:space-y-0 space-x-0">
          <div className="flex items-center flex-nowrap bg-mmsPry10 py-[5px] px-[11px] lg:w-[50%] w-full">
            <Image
              src="/images/svgs/twitterIcon.svg"
              width={24}
              height={23}
              alt="github"
            />
            <span className="font-semibold text-base lg:text-xl text-mmsBlack3 ml-3">
              <a
                href={
                  userData && userData?.data.user.socials?.twitter_url.value
                }
                target="_blank"
                rel="noreferrer"
              >
                {userData && userData?.data.user.socials?.twitter_url.value}
              </a>
            </span>
          </div>
          <div className="flex items-center flex-nowrap rounded-[5px] bg-mmsPry10 py-[5px] px-[11px] lg:w-[50%] w-full">
            <Image
              src="/images/svgs/instagramIcon.svg"
              width={24}
              height={23}
              alt="github"
            />
            <span className="font-semibold text-base lg:text-xl text-mmsBlack3 ml-3">
              <a
                href={
                  userData && userData?.data.user.socials?.instagram_url.value
                }
                target="_blank"
                rel="noreferrer"
              >
                {userData && userData?.data.user.socials?.instagram_url.value}
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

Profile.requireAuth = true;

Profile.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout title="Profile">{page}</DashboardLayout>;
};
