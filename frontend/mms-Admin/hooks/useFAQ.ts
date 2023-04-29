import React from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const FetchFAQ = async () => {
  return await axios.get('https://mms-team-7.onrender.com/api/v1/faqs', {
  
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",

      Authorization: `Bearer${localStorage.getItem("token")}`
    }
  });
};

export const useFetchFAQ = () => {
  const queryKey = ["FAQ"];
  return useQuery(queryKey, () => FetchFAQ(), {
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 1000
  });
};
