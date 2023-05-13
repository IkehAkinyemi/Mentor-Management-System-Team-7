import { useState } from "react";
import AuthLayout from "../components/layouts/auth-layout";
import Image from "next/image";
import { eyePasswordHideIcon, eyePasswordShowIcon } from "@/public";
import { InputField } from "@/components";
import { useFormik } from "formik";
import * as yup from "yup";
import { API_URL, RESET_PASSWORD_KEY } from "@/lib/constant";
import { httpClient } from "@/lib/httpClient";
import { DefaultApi, ResetPasswordPatchRequest } from "@/lib/httpGen";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const reset_token = Cookies.get(RESET_PASSWORD_KEY);
  const router = useRouter();
  const passwordApi = new DefaultApi(undefined, API_URL, httpClient);
  const resetPasswordMutation = useMutation(
    async (data: ResetPasswordPatchRequest) =>
      await passwordApi.resetPasswordPatch(data, reset_token),
    {
      onSuccess: () => {
        Cookies.remove(RESET_PASSWORD_KEY);
        console.log("success");
      },
      onError: () => {
        console.log("Error");
      }
    }
  );
  // formik for form submission
  const formik = useFormik({
    initialValues: {
      new_password: "",
      confirm_new_password: ""
    },
    validationSchema: yup.object({
      new_password: yup.string().label("New Password").required(),
      confirm_new_password: yup
        .string()
        .label("Confrim new password")
        .required()
    }),
    onSubmit: values => {
      resetPasswordMutation.mutate(values);
    }
  });
  return (
    <AuthLayout title="Set Password">
      <h2 className="text-black font-bold mb-4">Set new password</h2>
      <div className="w-full flex justify-center items-center relative  mb-4  border border-gray-400 rounded-lg px-4 h-12">
        <InputField
          id="password"
          label=""
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          className="md:w-[426px] w-full bg-transparent outline-none focus:outline-none"
          inputProps={{
            value: formik.values.new_password,
            onChange: formik.handleChange("new_password"),
            onBlur: formik.handleBlur("new_password")
          }}
          error={!!formik.touched.new_password && !!formik.errors.new_password}
          helperText={formik.errors.new_password}
        />
        <InputField
          id="password"
          label=""
          placeholder="confirm Password"
          type={showPassword ? "text" : "password"}
          className="md:w-[426px] w-full bg-transparent outline-none focus:outline-none"
          inputProps={{
            value: formik.values.confirm_new_password,
            onChange: formik.handleChange("confirm_new_password"),
            onBlur: formik.handleBlur("confirm_new_password")
          }}
          error={
            !!formik.touched.confirm_new_password &&
            !!formik.errors.confirm_new_password
          }
          helperText={formik.errors.confirm_new_password}
        />
        {/* <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full bg-transparent outline-none focus:outline-none"
        /> */}
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Image
              src={eyePasswordShowIcon}
              alt="Google"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src={eyePasswordHideIcon}
              alt="Google"
              width={20}
              height={20}
            />
          )}
        </button>
      </div>

      <p className="mb-4 mt-2">
        *Your new password must be different from previously used password.
      </p>
      <button className="btn bg-mmsPry3 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded w-full normal-case">
        Reset Password
      </button>
    </AuthLayout>
  );
};

export default SetPassword;
