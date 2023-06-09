import {
  useMutation,
  QueryClient,
  useQueryClient
} from "@tanstack/react-query";

import axios from "axios";

interface CreateOrder {
  first_name: "string";
  last_name: "string";
  content: string;
  id: "string";
  setValues: any;
}

export const useComment = () => {
  const queryClient = useQueryClient();
  const createDiscussions = async ({
    first_name,
    last_name,
    content,
    id,
    setValues
  }: CreateOrder) => {
    try {
      const response = await axios.post(
        `https://mms-team-7.onrender.com/api/v1/discussions/${id}/add_comment`,

        {
          first_name,
          last_name,
          content
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (response.status === 201) {

      setValues("");

        queryClient.invalidateQueries();

        // navigate(0);
      }

      //   queryClient.invalidateQueries(["Discussions"]);

      // navigate(0);

      return response.data;
    } catch (error: any) {}
  };

  return useMutation(createDiscussions, {
    onSuccess: () => queryClient.invalidateQueries()
  });
};
