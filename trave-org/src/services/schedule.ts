import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: API_URL }),

//   tagTypes: ["schedule"],

//   endpoints: (build) => ({
//     createSchedule: build.mutation({
//       query: (arg: string) => ({
//         url: `/v1/travels/${arg}/schedules`,
//         method: "POST",
//       }),

//       onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
//         const updateResponse = await queryFulfilled;

//         dispatch(
//           api.util.updateQueryData("getSchedule", arg, (draft) => {
//             draft.push(updateResponse);
//           })
//         );
//       },
//     }),
//     getSchedule: build.query<any[], string>({
//       query: (arg) => ({ url: `/v1/travels/${arg}/schedules`, method: "GET" }),
//       providesTags: ["schedule"],
//     }),
//   }),
// });