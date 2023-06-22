import React from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const FetchDiscussions = async () => {

  


  return await axios.get('https://mms-team-7.onrender.com/api/v1/discussions', {

  params: {

    page_id : 1,
    page_size : 10,

  },
  
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",

      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};

export const useFetchDiscussions = () => {
  const queryKey = ["fetchDiscussions"];
  return useQuery(queryKey, () => FetchDiscussions(), {
    refetchOnWindowFocus: false,
    retry: 1,

    
  
  });
};
