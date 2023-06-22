import { Button, InputField, SelectField, TextareaField } from "@/components";
import Input from "@/components/InputFields";
import SettingsLayout from "@/components/Settings/SettingsLayout";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { API_URL, country_list } from "@/lib/constant";
import { httpClient } from "@/lib/httpClient";
import { DefaultApi, UpdateUserResquest } from "@/lib/httpGen";

import { avatarIcon } from "@/public";
import Image from "next/image";
import React, { ReactElement } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { UPDATE_PROFILE_SCHEMA } from "@/lib/schemas/authSchema";

const General = () => {
  // const user = JSON.parse(localStorage?.getItem("user")!);
  // const userId = user.data.data.id;
  const profileApi = new DefaultApi(undefined, API_URL, httpClient);
  const updateProfileMutation = useMutation(
    async (data: UpdateUserResquest) =>
      await profileApi.usersPatch(data),
    {
      onSuccess: () => {
        console.log("success");
      },
      onError: () => {
        console.log("Error");
      }
    }
  );
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      about: "",
      website: "",
      profile_image_url: "",
      country: "",
      city: "",
      github_url: "",
      linkedin_url: "",
      twitter_url: "",
      instagram_url: ""
    },
    validationSchema: UPDATE_PROFILE_SCHEMA,
    onSubmit: values => {
      updateProfileMutation.mutate(values);
    }
  });
  return (
    <div className="border border-[#E6E6E6] rounded-md p-3">
      <div className="flex items-center">
        <div className="w-[42px] h-[42px] rounded-full cursor-pointer ">
          <Image src={avatarIcon} alt="avatar" />
        </div>
        <div className="mx-9">
          <h3 className="text-mmsBlack2 font-semibold text-xl">
            Set Profile Picture
          </h3>
          <Button variant="primary" className="py-2 px-[18px] text-sm">
            Upload Picture
          </Button>
        </div>
      </div>
      <div className="mt-5">
        <div className="form-group flex items-center justify-between">
          <span className="font-semibold text-base text-mmsBlack2">
            Full Name
          </span>
          <div className="ml-6 flex items-center">
            <InputField
              label=""
              placeholder="First Name"
              id="first_name"
              type="text"
              className="w-[326px]"
              inputProps={{
                value: formik.values.first_name,
                onChange: formik.handleChange("first_name"),
                onBlur: formik.handleBlur("first_name")
              }}
              error={!!formik.touched.first_name && !!formik.errors.first_name}
              helperText={formik.errors.first_name}
            />
            <InputField
              label=""
              placeholder="Last Name"
              id="last_name"
              type="text"
              className="md:w-[326px] ml-6"
              inputProps={{
                value: formik.values.last_name,
                onChange: formik.handleChange("last_name"),
                onBlur: formik.handleBlur("last_name")
              }}
              error={!!formik.touched.last_name && !!formik.errors.last_name}
              helperText={formik.errors.last_name}
            />
          </div>
        </div>
        <div className="form-group flex items-center justify-between">
          <span className="font-semibold text-base text-mmsBlack2">About</span>
          <div className="ml-6 flex items-center">
            <TextareaField
              label=""
              placeholder="Your Bio"
              id="about"
              className="md:w-[679px]"
              type="text"
              inputProps={{
                value: formik.values.about,
                onChange: formik.handleChange("about"),
                onBlur: formik.handleBlur("about")
              }}
              error={!!formik.touched.about && !!formik.errors.about}
              helperText={formik.errors.about}
            />
          </div>
        </div>
        <div className="form-group flex items-center justify-between">
          <span className="font-semibold text-base text-mmsBlack2">
            Full Website
          </span>
          <div className="ml-6 flex items-center">
            <InputField
              label=""
              placeholder="www.example.com"
              id="website"
              type="text"
              className="md:w-[679px]"
              inputProps={{
                value: formik.values.website,
                onChange: formik.handleChange("website"),
                onBlur: formik.handleBlur("website")
              }}
              error={!!formik.touched.website && !!formik.errors.website}
              helperText={formik.errors.website}
            />
          </div>
        </div>
        <div className="form-group flex items-center">
          <div className="flex items-center">
            <span className="font-semibold mr-[23%] text-base text-mmsBlack2">
              Country
            </span>
            <SelectField
              label=""
              id="country"
              type="text"
              className="w-[294px]"
              inputProps={{
                value: formik.values.country,
                onChange: formik.handleChange("country"),
                onBlur: formik.handleBlur("country")
              }}
              error={!!formik.touched.country && !!formik.errors.country}
              helperText={formik.errors.country}
            >
              <option value="">Select Country</option>
              {country_list.map((country: string, index: number) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </SelectField>
          </div>
          <div className="ml-[13%] flex items-center">
            <span className="font-semibold text-base text-mmsBlack2 mr-9">
              City{" "}
            </span>
            <InputField
              label=""
              placeholder="input city"
              id="city"
              type="text"
              className="md:w-[294px]"
              inputProps={{
                value: formik.values.city,
                onChange: formik.handleChange("city"),
                onBlur: formik.handleBlur("city")
              }}
              error={!!formik.touched.city && !!formik.errors.city}
              helperText={formik.errors.city}
            />
          </div>
        </div>
        <div className="form-group flex items-start">
          <span className="font-semibold text-base text-mmsBlack2">Social</span>
          <div className="ml-[11%] grid grid-cols-2 gap-x-8 gap-y-4 items-center">
            <Input
              prefix={
                <div className="flex items-center">
                  {" "}
                  <Image
                    src="/images/svgs/githubIcon.svg"
                    height={24}
                    width={24}
                    alt="github"
                  />{" "}
                  <span className="ml-2"> Github</span>
                </div>
              }
              label=""
              placeholder="@githubuser"
              id="github_url"
              type="text"
              className="w-[294px]"
              inputProps={{
                value: formik.values.github_url,
                onChange: formik.handleChange("github_url"),
                onBlur: formik.handleBlur("github_url")
              }}
              error={!!formik.touched.github_url && !!formik.errors.github_url}
              helperText={formik.errors.github_url}
            />
            <Input
              prefix={
                <div className="flex items-center">
                  {" "}
                  <Image
                    src="/images/svgs/instagramIcon.svg"
                    height={24}
                    width={24}
                    alt="instagram"
                  />{" "}
                  <span className="ml-2"> Instagram</span>
                </div>
              }
              label=""
              placeholder="@instagramuser"
              id="instagram_url"
              type="text"
              className="w-[294px] ml-8"
              inputProps={{
                value: formik.values.instagram_url,
                onChange: formik.handleChange("instagram_url"),
                onBlur: formik.handleBlur("instagram_url")
              }}
              error={
                !!formik.touched.instagram_url && !!formik.errors.instagram_url
              }
              helperText={formik.errors.instagram_url}
            />
            <Input
              prefix={
                <div className="flex items-center">
                  {" "}
                  <Image
                    src="/images/svgs/linkedinIcon.svg"
                    height={24}
                    width={24}
                    alt="github"
                  />{" "}
                  <span className="ml-2"> LinkedIn</span>
                </div>
              }
              label=""
              placeholder="@linkedin"
              id="linkedin_url"
              type="text"
              className="w-[294px]"
              inputProps={{
                value: formik.values.linkedin_url,
                onChange: formik.handleChange("linkedin_url"),
                onBlur: formik.handleBlur("linkedin_url")
              }}
              error={
                !!formik.touched.linkedin_url && !!formik.errors.linkedin_url
              }
              helperText={formik.errors.linkedin_url}
            />
            <Input
              prefix={
                <div className="flex items-center">
                  <Image
                    src="/images/svgs/twitterIcon.svg"
                    height={24}
                    width={24}
                    alt="github"
                  />{" "}
                  <span className="ml-2"> Twitter</span>
                </div>
              }
              label=""
              placeholder="@twitteruser"
              id="twitter_url"
              type="text"
              className="w-[294px] ml-8"
              inputProps={{
                value: formik.values.twitter_url,
                onChange: formik.handleChange("twitter_url"),
                onBlur: formik.handleBlur("twitter_url")
              }}
              error={
                !!formik.touched.twitter_url && !!formik.errors.twitter_url
              }
              helperText={formik.errors.twitter_url}
            />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button
            variant="primary"
            className="text-base px-4 py-2"
            onClick={formik.handleSubmit}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default General;

General.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <SettingsLayout title="General">{page}</SettingsLayout>
    </DashboardLayout>
  );
};

General.requireAuth = true;
