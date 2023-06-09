import { useRouter } from "next/router";
import AuthLayout from "../components/layouts/auth-layout";
import { Button, InputField } from "@/components";
import * as yup from "yup";
import { useFormik } from "formik";
import { API_URL, RESET_PASSWORD_KEY } from "@/lib/constant";
import { httpClient } from "@/lib/httpClient";
import { DefaultApi, ForgotPasswordPostRequest } from "@/lib/httpGen";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";
import Dialog from "@/components/Dialog";

const ForgotPassword = () => {
  const router = useRouter();
  const forgotPasswordMutation = useMutation(
    async (email: ForgotPasswordPostRequest) => {
      try {
        const response = await httpClient.post(
          `https://mms-team-7.onrender.com/api/v1/forgot_password`,
          {
            email
          }
        );

        if (response.status === 200) {
          console.log(response.data, "FORGOT PASSWORD");
        }
        return response.data;
      } catch (error: any) {}
    },
    {
      onSuccess: res => {
        router.push("/forgot-password/?email_sent=true");
      },
      onError: () => {
        console.log("Error");
      }
    }
  );
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: yup.object({
      email: yup.string().label("Email").required()
    }),
    onSubmit: values => {
      forgotPasswordMutation.mutate(values);
    }
  });
  return (
    <AuthLayout title="Forgot Password">
      <h1 className="text-black font-bold">Forgot Password?</h1>
      <p>An email has been sent to your registered email.</p>
      <p>Follow the link to reset your password.</p>
      <div>
        <InputField
          id="email"
          label=""
          placeholder="enter your email"
          type="email"
          className="w-full"
          inputProps={{
            value: formik.values.email,
            onChange: formik.handleChange("email"),
            onBlur: formik.handleBlur("email")
          }}
          error={!!formik.touched.email && !!formik.errors.email}
          helperText={formik.errors.email}
        />
      </div>
      <button
        className="btn bg-mmsPry3 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded w-full normal-case mt-4"
        onClick={() => formik.handleSubmit()}
      >
        Done
      </button>
      {router.query.email_sent && (
        <Dialog variant="scroll" open={false} onClose={() => router.back()}>
          <div className="py-8 flex flex-col justify-center items-center px-12">
            <h2 className="text-2xl text-center font-semibold text-mmsPry3 my-2">
              A reset Email has been sent
            </h2>
            <Image
              src="/images/task-success.png"
              width={220}
              height={165}
              alt="task_success"
            />
            <div className="mt-4">
              <Button
                variant="primary"
                className="bg-mmsPry3 py-[10px] px-[40px] text-lg"
                onClick={() => router.push("/set-password")}
              >
                Set Password
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
