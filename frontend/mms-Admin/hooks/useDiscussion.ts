import React from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { GetServerSideProps, NextPageContext } from "next";

export const FetchDiscussion = async (id: any) => {
  return await axios.get(
    `https://mms-team-7.onrender.com/api/v1/discussions/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
};

export const useFetchDiscussion = (id: any) => {
  const queryKey = ["Discussions"];
  return useQuery(queryKey, () => FetchDiscussion(id), {
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 1000,
    cacheTime: 0
  });
};
