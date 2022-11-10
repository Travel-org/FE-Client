import baseApi from "@src/app/api/baseApi";
import { USER_BASE_URL } from "@utils/type";

const friendApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendEmail: builder.mutation<void, string>({
      query: (targetEmail) => ({
        url: `${USER_BASE_URL}/friends/${targetEmail}`,
        method: "POST",
      }),
    }),
    getFriends: builder.query<any, void>({
      query: () => ({
        url: `${USER_BASE_URL}/friends`,
        method: "GET",
      }),
    }),
    showFriendsProfile: builder.query<any, string>({
      query: (targetId) => ({
        url: USER_BASE_URL + `/friend/${targetId}`,
        method: "GET",
      }),
    }),
    getGivenRequests: builder.query<any, void>({
      query: () => ({
        url: `${USER_BASE_URL}/friends/given-requests`,
        method: "GET",
      }),
    }),
    getGivingRequests: builder.query<any, void>({
      query: () => ({
        url: `${USER_BASE_URL}/friends/giving-requests`,
        method: "GET",
      }),
    }),
    deleteFriends: builder.mutation<void, number>({
      query: (targetId) => ({
        url: `${USER_BASE_URL}/friends/${targetId}`,
        method: "DELETE",
      }),
    }),
    acceptFriendsRequest: builder.mutation<void, number>({
      query: (targetId) => ({
        url: `${USER_BASE_URL}/friends/request/${targetId}`,
        method: "POST",
      }),
    }),
    rejectFriendsRequest: builder.mutation<void, number>({
      query: (targetId) => ({
        url: `${USER_BASE_URL}/friends/request/${targetId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default friendApi;