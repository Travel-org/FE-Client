import baseApi from "@src/app/api/baseApi";
import { USER_BASE_URL } from "@utils/type";

const friendApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["Friends"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      sendEmail: builder.mutation<void, string>({
        query: (targetEmail) => ({
          url: `${USER_BASE_URL}/friends/${targetEmail}`,
          method: "POST",
        }),
        invalidatesTags: (result, error, travelId) => [
          { type: "Friends", id: "GIVING" },
        ],
      }),
      getFriends: builder.query<any, void>({
        query: () => ({
          url: `${USER_BASE_URL}/friends`,
          method: "GET",
        }),
        providesTags: (result, error, travelId) => [
          { type: "Friends", id: "LIST" },
        ],
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
        providesTags: (result, error, travelId) => [
          { type: "Friends", id: "GIVEN" },
        ],
      }),
      getGivingRequests: builder.query<any, void>({
        query: () => ({
          url: `${USER_BASE_URL}/friends/giving-requests`,
          method: "GET",
        }),
        providesTags: (result, error, travelId) => [
          { type: "Friends", id: "GIVING" },
        ],
      }),
      deleteFriends: builder.mutation<void, number>({
        query: (targetId) => ({
          url: `${USER_BASE_URL}/friends/${targetId}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, travelId) => [
          { type: "Friends", id: "LIST" },
        ],
      }),
      acceptFriendsRequest: builder.mutation<void, number>({
        query: (targetId) => ({
          url: `${USER_BASE_URL}/friends/given-requests/${targetId}`,
          method: "POST",
        }),
        invalidatesTags: (result, error, travelId) => [
          { type: "Friends", id: "GIVEN" },
        ],
      }),
      rejectFriendsRequest: builder.mutation<void, number>({
        query: (targetId) => ({
          url: `${USER_BASE_URL}/friends/given-requests/${targetId}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, travelId) => [
          { type: "Friends", id: "GIVEN" },
        ],
      }),
      cancelFriendsRequest: builder.mutation<void, number>({
        query: (targetId) => ({
          url: `${USER_BASE_URL}/friends/giving-requests/${targetId}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, travelId) => [
          { type: "Friends", id: "GIVING" },
        ],
      }),
    }),
  });

export default friendApi;