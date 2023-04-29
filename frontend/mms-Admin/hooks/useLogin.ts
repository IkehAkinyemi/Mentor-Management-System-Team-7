import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import axios from "axios";

// const token = ls.get('token');
let data = JSON.stringify({
  email: "evqpsb@email.com",
  password: "secretsz"
});
export const useLogin = () => {

  const router = useRouter();
  const LoginUser = async ({ email, password }: any) => {

    try {
      const response = await axios.post(
        `https://mms-team-7.onrender.com/api/v1/auth/login`,
        data,

        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json"
          }
        }
      );

      if (response.status === 200) {
        console.log(response.data);

        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));

        router.push("/admin/profile");
      }
      return response.data;
    } catch (error: any) {}
  };

  return useMutation(LoginUser);
};
