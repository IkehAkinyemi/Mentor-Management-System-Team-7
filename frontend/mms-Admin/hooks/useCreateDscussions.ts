import {
  useMutation,
  QueryClient,
  useQueryClient
} from "@tanstack/react-query";

import axios from "axios";

interface CreateOrder {
  title: string;
  content: string;
  setIsOpen: any;
}

export const useCreateDscussions = () => {
  const queryClient = useQueryClient();
  const createDiscussions = async ({
    title,
    content,
    setIsOpen
  }: CreateOrder) => {
    try {
      const response = await axios.post(
        `https://mms-team-7.onrender.com/api/v1/discussions`,

        {
          title,
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
        queryClient.invalidateQueries();

        setIsOpen(false);

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
