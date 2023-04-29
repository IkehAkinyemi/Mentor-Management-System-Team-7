import { Button, InputField } from "@/components";
import SettingsLayout from "@/components/Settings/SettingsLayout";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { CHANGE_PASSWORD_SCHEMA } from "@/lib/schemas/authSchema";
import { useFormik } from "formik";
import Link from "next/link";
import React, { ReactElement } from "react";
import { API_URL } from "@/lib/constant";
import { httpClient } from "@/lib/httpClient";
import { ChangePasswordRequest, DefaultApi } from "@/lib/httpGen";
import { useMutation } from "react-query";

const Password = () => {
  const passwordApi = new DefaultApi(undefined, API_URL, httpClient);
  const changePasswordMutation = useMutation(
    async (data: ChangePasswordRequest) =>
      await passwordApi.usersIdChangePasswordPatch(data),
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
      current_password: "",
      new_password: "",
      confirm_password: ""
    },
    validationSchema: CHANGE_PASSWORD_SCHEMA,
    onSubmit: (values) => {
      changePasswordMutation.mutate(values, userId)
    }
  });
  return (
    <div className="border border-[#E6E6E6] rounded-md p-3">
      <div className="mt-5">
        <div className="form-group flex items-center justify-between">
          <span className="font-semibold text-base text-mmsBlack2">
            Current Password
          </span>
          <div className="ml-6 flex items-center">
            <InputField
              label=""
              placeholder="your current password"
              id="currentPassword"
              type="password"
              className="w-full md:w-[593px] bg-white"
              inputProps={{
                value: formik.values.current_password,
                onChange: formik.handleChange("current_password"),
                onBlur: formik.handleBlur("current_password")
              }}
              error={
                !!formik.touched.current_password &&
                !!formik.errors.current_password
              }
              helperText={formik.errors.current_password}
            />
          </div>
        </div>
        <div className="form-group flex items-center justify-between">
          <span className="font-semibold text-base text-mmsBlack2">
            New Password
          </span>
          <div className="ml-6 flex items-center">
            <InputField
              label=""
              placeholder="Must be at least 8 characters"
              id="newPassword"
              type="password"
              className="w-full md:w-[593px] bg-white"
              inputProps={{
                value: formik.values.new_password,
                onChange: formik.handleChange("new_password"),
                onBlur: formik.handleBlur("new_password")
              }}
              error={
                !!formik.touched.new_password && !!formik.errors.new_password
              }
              helperText={formik.errors.new_password}
            />
          </div>
        </div>
        <div className="form-group flex items-center justify-between">
          <span className="font-semibold text-base text-mmsBlack2">
            Confirm New Password
          </span>
          <div className="ml-6 flex items-center">
            <InputField
              label=""
              placeholder="Must match your new password"
              id="confirmNewPassword"
              type="password"
              className="w-full md:w-[593px] bg-white"
              inputProps={{
                value: formik.values.confirm_password,
                onChange: formik.handleChange("confirm_password"),
                onBlur: formik.handleBlur("confirm_password")
              }}
              error={
                !!formik.touched.confirm_password && !!formik.errors.confirm_password
              }
              helperText={formik.errors.confirm_password}
            />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button variant="primary" className="text-base px-4 py-2">
            Save New Password
          </Button>
        </div>
        <div className="text-center mt-8">
          <Link href="/#" passHref>
            <span className="font-semibold text-[#023C40]">
              Forgot Password ?
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Password;

Password.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <SettingsLayout title="Password">{page}</SettingsLayout>
    </DashboardLayout>
  );
};

Password.requireAuth = true;