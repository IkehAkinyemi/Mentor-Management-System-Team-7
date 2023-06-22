// import { useMutation, QueryClient } from "@tanstack/react-query";

// import axios from "axios";

// const queryClient = new QueryClient();
// export const useCreateDiscussions = (title:any , content:any) => {
//   const createDiscussions = async (title:any , content:any) => {
//     try {
//       const response = await axios.post(
//         `https://mms-team-7.onrender.com/api/v1/discussions` ,

//         {
//           headers: {
//             "Content-Type": "application/json",
//             accept: "application/json",

//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           }
//         }
//       );

//       if (response.status === 200) {
//         // queryClient.invalidateQueries('userBanks');
//         // setTimeout(() => {
//         //   navigate(0);
//         // }, 3000);
//       }

//       // navigate(0);

//       return response.data;
//     } catch (error: any) {}
//   };

//   return useMutation(createDiscussions);
// };
