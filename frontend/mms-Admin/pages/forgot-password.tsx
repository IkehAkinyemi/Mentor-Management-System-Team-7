import { useRouter } from "next/router";
import AuthLayout from "../components/layouts/auth-layout";
import { InputField } from "@/components";
import * as yup from "yup";
import { useFormik } from "formik";
import { API_URL, RESET_PASSWORD_KEY } from "@/lib/constant";
import { httpClient } from "@/lib/httpClient";
import { DefaultApi, ForgotPasswordPostRequest } from "@/lib/httpGen";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

const ForgotPassword = () => {
  const router = useRouter();
  const passwordApi = new DefaultApi(undefined, API_URL, httpClient);
  const forgotPasswordMutation = useMutation(
    async (data: ForgotPasswordPostRequest) =>
      await passwordApi.forgotPasswordPost(data).then(res => res.data.result),
    {
      onSuccess: res => {
        Cookies.set(RESET_PASSWORD_KEY, res!);
        console.log("success");
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
          className="w-[426px]"
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
        onClick={() => router.push("/set-password")}
      >
        Done
      </button>
    </AuthLayout>
  );
};

export default ForgotPassword;
