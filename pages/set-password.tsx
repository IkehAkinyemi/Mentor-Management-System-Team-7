import { useState } from "react";
import AuthLayout from "../components/layouts/auth-layout";
import Image from "next/image";
import { eyePasswordHideIcon, eyePasswordShowIcon } from "@/public";
import { Button, InputField } from "@/components";
import { useFormik } from "formik";
import * as yup from "yup";
import { httpClient } from "@/lib/httpClient";
import { DefaultApi, ResetPasswordPatchRequest } from "@/lib/httpGen";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Dialog from "@/components/Dialog";

const SetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const reset_token = router.query.reset_token;

  const resetPasswordMutation = useMutation(
    async (data: ResetPasswordPatchRequest) => {
      try {
        const response = await httpClient.post(
          `https://mms-team-7.onrender.com/api/v1/reset_password`,
          {
            data,
            reset_token
          }
        );

        if (response.status === 200) {
          console.log(response.data);
        }
        return response.data;
      } catch (error: any) {}
    },
    {
      onSuccess: () => {
        router.push("/set-password/?reset_success=true");
        console.log("success");
      },
      onError: () => {
        router.push("/set-password/?reset_fail=true");
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
      <div className="w-full mb-4  border border-gray-400 rounded-lg px-4">
        <InputField
          id="password"
          label=""
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          className="w-full bg-transparent outline-none focus:outline-none"
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
          className=" w-full bg-transparent outline-none focus:outline-none"
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
      <button
        className="btn bg-mmsPry3 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded w-full normal-case"
        type="submit"
        onClick={() => formik.handleSubmit()}
      >
        Reset Password
      </button>
      {router.query.reset_success && (
        <Dialog variant="scroll" open={false} onClose={() => router.back()}>
          <div className="py-8 flex flex-col justify-center items-center px-12">
            <h2 className="text-2xl font-semibold text-mmsPry3 my-2">
              Password reset Successfully
            </h2>
            <Image
              src="/images/password-success.png"
              width={220}
              height={165}
              alt="task_success"
            />
            <div className="mt-4">
              <Button
                variant="primary"
                className="py-[10px] bg-mmsPry3 px-[40px] text-lg"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </div>
          </div>
        </Dialog>
      )}
      {router.query.reset_fail && (
        <Dialog variant="scroll" open={false} onClose={() => router.back()}>
          <div className="py-8 flex flex-col justify-center items-center px-12">
            <h2 className="text-2xl font-semibold text-red-500 my-2">
              Password Reset Failed
            </h2>
            <Image
              src="/images/password-success.png"
              width={220}
              height={165}
              alt="task_success"
            />
            <div className="mt-4">
              <Button
                variant="primary"
                className="py-[10px] bg-red px-[40px] text-lg"
                onClick={() => router.push("/forgot-password")}
              >
                Try Again
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </AuthLayout>
  );
};

export default SetPassword;
