import { Button } from "@/components";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { Calendar, Globe, Mail, MapPin } from "react-feather";

const Profile = () => {
  const router = useRouter();

  const [userData, setUserData] = React.useState<any>("");
  const [loading , setLoading] = React.useState<boolean>(false)

  // const user = JSON.parse(userData)

  useEffect(() => {
    // Check if localStorage is available

    setLoading(true)
    if (typeof localStorage !== "undefined") {

      // Get favorites from localStorage
      const userData = localStorage.getItem("user");

      if (userData) {
        setUserData(JSON.parse(userData));
        setLoading(false)
      }
    }
  }, []);

  // console.log(userData.data.data, "user");


  // if(loading) return <div>Loading...</div>

  function formatDate(isoDateString: string) {
    const date = new Date(isoDateString);
  
    const month = date.toLocaleString('default', { month: 'long' });
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
            <h3 className="text-mmsBlack2 font-semibold text-2xl">
            {userData && userData?.data.data.first_name }  
            { userData && userData?.data.data.last_name} 

            </h3>
            <p>{userData && userData?.data.data.role}</p>
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
            {userData && userData?.data.data?.about}
          </p>
        </div>

        <div className="user__info">

          <div className="mt-[50px]">
            <h2 className="text-mmsBlack2 font-semibold mb-3 text-xl">
              Location : <span className="text-mmsBlack5 text-base">
              {userData && userData?.data.data.contact.city } , 
              {userData && userData?.data.data.contact.country }

              </span>
            </h2>


            <h2 className="text-mmsBlack2 font-semibold mb-5 text-xl">
            Email : <span className="text-mmsBlack5 text-base">
              {userData && userData?.data.data.contact.email } 
      

              </span>
            </h2>


            <h2 className="text-mmsBlack2 font-semibold mb-5 text-xl">
            Website : <span className="text-mmsBlack5 text-base">
              {userData && userData?.data.data.contact.website } 
      

              </span>
            </h2>


            <h2 className="text-mmsBlack2 font-semibold mb-5 text-xl">
            Members Since  : <span className="text-mmsBlack5 text-base">
              {userData && formatDate(userData?.data.data.created_at) }

      

              </span>
            </h2>
            </div>
        </div>
    
        <div className="mt-[50px]">
          <h2 className="text-mmsBlack2 font-semibold mb-3 text-2xl">Social</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center  bg-mmsPry10 py-[5px] px-[11px] rouned-[5px] w-[50%]">
              <Image
                src="/images/svgs/githubIcon.svg"
                width={24}
                height={23}
                alt="github"
              />
              <span className="font-semibold text-xl text-mmsBlack3 ml-3">
              {userData && userData?.data.data.socials?.github_url.value
} 

              </span>
            </div>
            <div className="flex items-center bg-mmsPry10 py-[5px] px-[11px] rounded-[5px] w-[50%]">
              <Image
                src="/images/svgs/linkedinIcon.svg"
                width={24}
                height={23}
                alt="github"
              />
              <span className="font-semibold text-xl text-mmsBlack3 ml-3">
              {userData && userData?.data.data.socials?.linkedin_url
.value
} 

              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center rounded-[5px] mt-[33px] space-x-4">
          <div className="flex items-center bg-mmsPry10 py-[5px] px-[11px] w-[50%]">
            <Image
              src="/images/svgs/twitterIcon.svg"
              width={24}
              height={23}
              alt="github"
            />
            <span className="font-semibold text-xl text-mmsBlack3 ml-3">
            {userData && userData?.data.data.socials?.twitter_url.value}
            </span>
          </div>
          <div className="flex items-center rounded-[5px] bg-mmsPry10 py-[5px] px-[11px] w-[50%]">
            <Image
              src="/images/svgs/instagramIcon.svg"
              width={24}
              height={23}
              alt="github"
            />
            <span className="font-semibold text-xl text-mmsBlack3 ml-3">
            {userData && userData?.data.data.socials?.instagram_url.value}
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
